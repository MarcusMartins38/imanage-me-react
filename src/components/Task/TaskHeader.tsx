import { TaskT } from "../../lib/type";
import { UseFormRegister } from "react-hook-form";

type TaskHeaderProps = {
    task: TaskT;
    isEditOpen: boolean;
    register: UseFormRegister<TaskT>;
    handleKeyDown: (e: React.KeyboardEvent<any>, task: TaskT) => void;
};

export default function TaskHeader({
    task,
    isEditOpen,
    register,
    handleKeyDown,
}: TaskHeaderProps) {
    return (
        <>
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
                <h5 className="w-full text-[20px] font-bold">{task.title}</h5>
            )}
        </>
    );
}
