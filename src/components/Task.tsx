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
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  const handleCancelEdit = () => {
    setIsOpen(false);
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
      className="card bg-base-200 rounded-box flex flex-row h-min-20 h-auto place-items-center p-4 my-4"
      {...rest}
    >
      <div className="flex flex-col items-center justify-start w-full">
        <h5 className="w-full text-[20px] font-bold">{task.title}</h5>
        {isOpen ? (
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            ref={textareaRef}
            onKeyDown={(e) => handleKeyDown(e, task)}
          >
            {description}
          </textarea>
        ) : (
          <p className="w-full text-[14px]">{task.description}</p>
        )}
      </div>
      <section className="flex flex-row items-center gap-x-2 ml-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-blue-500 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button
          onClick={() => handleRemoveTask(task.id)}
          className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-red-500 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </section>
    </div>
  );
};

export default Task;