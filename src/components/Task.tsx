import React, { useState } from "react";
import { TaskT } from "../lib/type";
import { PRIORITIES } from "../lib/constants";
import { useFieldArray, useForm } from "react-hook-form";
import SubTask from "./SubTask";
import EditIcon from "../assets/icons/EditIcon";
import TrashIcon from "../assets/icons/TrashIcon";
import { api } from "../lib/api";

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
        setValue("priority", task.priority); // Reset the form title
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
        await api.patch(
            `/task/${subTaskId}/status`,
            JSON.stringify({ status: completed ? "COMPLETED" : "PENDING" }),
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

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
            priority: getValues("priority"),
            subTasks: subTasks,
        };

        handleSaveEditTask(updatedTask);
        setIsEditOpen(false);
    };

    const handleRemoveSubTask = async (
        subTaskIndex: number,
        subTaskId?: string,
    ) => {
        if (!subTaskId) {
            return remove(subTaskIndex);
        }

        const res = await api.delete(`/task/${subTaskId}`, {
            withCredentials: true,
        });

        if (!res.ok) throw new Error("Can't delete task");

        remove(subTaskIndex);
    };

    return (
        <div
            className="card bg-red-950 rounded-box h-min-20 h-auto place-items-center my-4 pt-2 pb-[0.1rem]"
            style={{ backgroundColor: PRIORITIES[task?.priority || 1].color }}
            {...rest}
        >
            <div className="w-full h-full px-4 py-2 flex flex-row bg-base-200 rounded-box">
                <div className="flex flex-col items-center justify-start w-full">
                    {isEditOpen ? (
                        <div className="flex flex-row w-full">
                            <input
                                type="text"
                                id="title"
                                className="input input-bordered h-8 w-full mb-2"
                                onKeyDown={(e) => handleKeyDown(e, task)}
                                {...register("title")}
                                defaultValue={task.title}
                            />

                            <select
                                className="select select-bordered select-sm w-full max-w-40 ml-4"
                                defaultValue={task.priority}
                                {...register("priority")}
                            >
                                <option value={1}>Very Low</option>
                                <option value={2}>Low</option>
                                <option value={3}>Medium</option>
                                <option value={4}>High</option>
                                <option value={5}>VeryHigh</option>
                            </select>
                        </div>
                    ) : (
                        <h5 className="w-full text-[20px] font-bold">
                            {task.title}
                        </h5>
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
                                <h6 className="font-bold text-[16px] mr-2">
                                    Sub Tasks
                                </h6>
                                {isEditOpen && (
                                    <button
                                        onClick={() =>
                                            append({
                                                parentTaskId: task.id,
                                                title: "",
                                            })
                                        }
                                        className="btn bg-green-500 text-white hover:bg-green-600 min-h-0 min-w-0 p-0 h-6 w-6"
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        )}

                        {fields.map((subTask, index) => (
                            <SubTask
                                key={subTask.id || `temp-${index}`}
                                checked={subTask.status === "COMPLETED"}
                                register={register}
                                fieldName={`subTasks.${index}.title`}
                                isEdit={isEditOpen}
                                defaultValue={subTask.title}
                                className="mt-2"
                                onRemoveClick={() =>
                                    handleRemoveSubTask(index, subTask.id)
                                }
                                onChangeChecked={(e) =>
                                    handleSubtaskStatusChange(
                                        subTask.id,
                                        e.target.checked,
                                    )
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
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => handleRemoveTask(task.id)}
                        className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-red-500 hover:text-white"
                    >
                        <TrashIcon />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Task;
