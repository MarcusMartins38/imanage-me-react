import React from "react";
import { TaskT } from "../../lib/type";
import { UseFormRegister } from "react-hook-form";

type TaskDescriptionProps = {
    task: TaskT;
    isEditOpen: boolean;
    register: UseFormRegister<TaskT>;
    handleKeyDown: (e: React.KeyboardEvent<any>, task: TaskT) => void;
};

export default function TaskDescription({
    task,
    isEditOpen,
    register,
    handleKeyDown,
}: TaskDescriptionProps) {
    return (
        <>
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
        </>
    );
}
