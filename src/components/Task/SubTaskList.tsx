import SubTask from "../SubTask";
import { TaskT } from "../../lib/type";
import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFormRegister,
} from "react-hook-form";

type SubTaskListProps = {
    task: TaskT;
    isEditOpen: boolean;
    fields: FieldArrayWithId<
        { subTasks: TaskT[] | undefined },
        "subTasks",
        "_id"
    >[];
    append: UseFieldArrayAppend<{ subTasks: TaskT[] | undefined }, "subTasks">;
    register: UseFormRegister<TaskT>;
    // handleKeyDown: (e: React.KeyboardEvent<any>, task: TaskT) => void;
    handleRemoveSubTask: (index: number, id: string) => void;
    handleSubtaskStatusChange: (id: string, checked: boolean) => void;
};

export default function SubTaskList({
    task,
    isEditOpen,
    fields,
    append,
    register,
    handleRemoveSubTask,
    handleSubtaskStatusChange,
}: SubTaskListProps) {
    return (
        <section className="w-full mt-2">
            {(fields?.length >= 1 || isEditOpen) && (
                <div className="flex items-center">
                    <h6 className="font-bold text-[16px] mr-2">Sub Tasks</h6>
                    {isEditOpen && (
                        <button
                            onClick={() =>
                                append({
                                    parentTaskId: task.id,
                                    title: "",
                                    priority: 3,
                                    createdAt: "",
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
                        handleRemoveSubTask(index, subTask.id as string)
                    }
                    onChangeChecked={(e) =>
                        handleSubtaskStatusChange(
                            subTask.id as string,
                            e.target.checked,
                        )
                    }
                />
            ))}
        </section>
    );
}
