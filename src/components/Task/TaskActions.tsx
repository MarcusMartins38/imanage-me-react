import React from "react";
import EditIcon from "../../assets/icons/EditIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import { TaskT } from "../../lib/type";

type TaskActionsProps = {
    task: TaskT;
    setIsEditOpen: (value: React.SetStateAction<boolean>) => void;
    handleRemoveTask: (id: string) => void;
};

export default function TaskActions({
    task,
    handleRemoveTask,
    setIsEditOpen,
}: TaskActionsProps) {
    return (
        <section className="flex flex-row items-center gap-x-2 ml-4">
            <button
                onClick={() => setIsEditOpen((prev) => !prev)}
                className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-blue-500 hover:text-white"
            >
                <EditIcon />
            </button>
            <button
                onClick={() => handleRemoveTask(task.id as string)}
                className="btn bg-base-300 border-base-300 min-h-0 h-10 w-10 p-0 hover:bg-red-500 hover:text-white"
            >
                <TrashIcon />
            </button>
        </section>
    );
}
