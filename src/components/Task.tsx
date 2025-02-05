import React, { useState } from "react";
import { TaskT } from "../lib/type";
import { PRIORITIES } from "../lib/constants";
import { useCookies } from "react-cookie";
import { useFieldArray, useForm } from "react-hook-form";
import SubTask from "./SubTask";

type TaskProps = {
  task: TaskT;
  handleRemoveTask: (id: string) => void;
  handleSaveEditTask: (task: TaskT) => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  handleSaveEditTask,
  handleRemoveTask,
  ...rest
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [cookies] = useCookies(["userAuth"]);

  const { register, control, getValues, setValue } = useForm({
    defaultValues: {
      subTasks: task.subTasks,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
    keyName: "_id",
  });

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setValue("description", task.description); // Reset the form values
    setValue("title", task.title); // Reset the form title
    setValue("subTasks", task.subTasks);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    task: TaskT,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleClickSaveEdit(task);
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancelEdit();
    }
  };

  const handleSubtaskStatusChange = async (
    subTaskId: string,
    completed: boolean,
  ) => {
    await fetch(`http://localhost:3333/api/task/${subTaskId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: completed ? "COMPLETED" : "PENDING" }),
    });

    const updatedSubTasks = fields.map((subTask) =>
      subTask.id === subTaskId
        ? { ...subTask, status: completed ? "COMPLETED" : "PENDING" }
        : subTask,
    );
    setValue("subTasks", updatedSubTasks);
  };

  const handleClickSaveEdit = (task: TaskT) => {
    const subTasks = getValues("subTasks").map((subTask: any) => ({
      id: subTask?.id || null,
      title: subTask.title,
      parentTaskId: task.id,
    }));

    setValue("subTasks", subTasks);

    const updatedTask = {
      ...task,
      title: getValues("title"),
      description: getValues("description"),
      subTasks: subTasks,
    };

    handleSaveEditTask(updatedTask);
    setIsEditOpen(false);
  };

  return (
    <div
      className="card bg-red-950 rounded-box h-min-20 h-auto place-items-center my-4 pt-2"
      style={{ backgroundColor: PRIORITIES[task?.priority || 1].color }}
      {...rest}
    >
      <div className="w-full h-full px-4 py-2 flex flex-row bg-base-200 rounded-box">
        <div className="flex flex-col items-center justify-start w-full">
          {isEditOpen ? (
            <input
              type="text"
              id="title"
              className="input input-bordered h-8 w-full mb-2"
              onKeyDown={(e) => handleKeyDown(e, task)}
              {...register("title")}
              defaultValue={task.title}
            />
          ) : (
            <h5 className="w-full text-[20px] font-bold">{task.title}</h5>
          )}

          {isEditOpen ? (
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              onKeyDown={(e) => handleKeyDown(e, task)}
              {...register("description")}
              defaultValue={task.description}
            />
          ) : (
            <p className="w-full text-[14px]">{task.description}</p>
          )}

          <section className="w-full mt-2">
            {(fields?.length >= 1 || isEditOpen) && (
              <div className="flex items-center">
                <h6 className="font-bold text-[16px] mr-2">Sub Tasks</h6>
                {isEditOpen && (
                  <button
                    onClick={() => append({ parentTaskId: task.id, title: "" })}
                    className="btn bg-green-500 text-white hover:bg-green-600 min-h-0 min-w-0 p-0 h-6 w-6"
                  >
                    +
                  </button>
                )}
              </div>
            )}

            {fields.map((subTask, index) => (
              <SubTask
                key={subTask.id}
                checked={subTask.status === "COMPLETED"}
                register={register}
                fieldName={`subTasks.${index}.title`}
                isEdit={isEditOpen}
                defaultValue={subTask.title}
                className="mt-2"
                onChangeChecked={(e) =>
                  handleSubtaskStatusChange(subTask.id, e.target.checked)
                }
              />
            ))}
          </section>
        </div>

        <section className="flex flex-row items-center gap-x-2 ml-4">
          <button
            onClick={() => setIsEditOpen((prev) => !prev)}
            className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-blue-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
          <button
            onClick={() => handleRemoveTask(task.id)}
            className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-red-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Task;
