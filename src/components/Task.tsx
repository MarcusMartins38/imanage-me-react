import React, { useRef, useState } from "react";
import { TaskT } from "../lib/type";

type TaskProps = {
  task: TaskT;
  handleRemoveTask: (id: number) => void;
  handleSaveEditTask: (task: TaskT) => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  handleSaveEditTask,
  handleRemoveTask,
  ...rest
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [description, setDescription] = useState(task.description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClickSaveEdit = (task: TaskT) => {
    if (textareaRef?.current) {
      const updatedDescription = textareaRef.current.value;
      setDescription(updatedDescription);
      handleSaveEditTask({
        id: task.id,
        description: updatedDescription,
        title: task.title,
      });
    }
    setIsEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setDescription(task.description);
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

  return (
    <div
      className="card bg-base-200 rounded-box flex flex-row h-min-20 h-auto place-items-center px-4 py-2 my-4"
      {...rest}
    >
      <div className="flex flex-col items-center justify-start w-full">
        <h5 className="w-full text-[20px] font-bold">{task.title}</h5>
        {isEditOpen ? (
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            ref={textareaRef}
            onKeyDown={(e) => handleKeyDown(e, task)}
            defaultValue={description}
          />
        ) : (
          <p className="w-full text-[14px]">{task.description}</p>
        )}
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
  );
};

export default Task;
