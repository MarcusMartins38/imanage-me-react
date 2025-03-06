import React from "react";
import { TaskT } from "../../lib/type";
import { PRIORITIES } from "../../lib/constants";
import { useTaskForm } from "./useTaskForm";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import SubTaskList from "./SubTaskList";
import TaskActions from "./TaskActions";

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
    const {
        isEditOpen,
        setIsEditOpen,
        fields,
        register,
        append,
        handleClickSaveEdit,
        handleCancelEdit,
        handleRemoveSubTask,
        handleSubtaskStatusChange,
    } = useTaskForm(task, handleSaveEditTask);

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

    const taskPriorityColor = PRIORITIES[task?.priority || 1].color;

    return (
        <div
            className="card bg-red-950 rounded-box h-min-20 h-auto place-items-center my-4 pt-2 pb-[0.1rem]"
            style={{ backgroundColor: taskPriorityColor }}
            {...rest}
        >
            <div className="w-full h-full px-4 py-2 flex flex-row bg-base-200 rounded-box">
                <div className="flex flex-col items-center justify-start w-full">
                    <TaskHeader
                        task={task}
                        isEditOpen={isEditOpen}
                        register={register}
                        handleKeyDown={handleKeyDown}
                    />

                    <TaskDescription
                        task={task}
                        isEditOpen={isEditOpen}
                        register={register}
                        handleKeyDown={handleKeyDown}
                    />

                    <SubTaskList
                        task={task}
                        isEditOpen={isEditOpen}
                        register={register}
                        fields={fields}
                        append={append}
                        handleRemoveSubTask={handleRemoveSubTask}
                        handleSubtaskStatusChange={handleSubtaskStatusChange}
                    />
                </div>

                <TaskActions
                    task={task}
                    setIsEditOpen={setIsEditOpen}
                    handleRemoveTask={handleRemoveTask}
                />
            </div>
        </div>
    );
};

export default Task;
