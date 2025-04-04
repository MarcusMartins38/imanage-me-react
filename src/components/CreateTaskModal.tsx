import { TaskT } from "../lib/type";
import { useFieldArray, useForm } from "react-hook-form";
import SubTask from "./SubTask";

type CreateTaskModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleSaveTask: (task: Omit<TaskT, "id">) => void;
};

export default function CreateTaskModal({
    isOpen = false,
    setIsOpen,
    handleSaveTask,
}: CreateTaskModalProps) {
    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "subTasks", // Field name in the form state
    });

    const handleClickSave = (data: Omit<TaskT, "id">) => {
        handleSaveTask(data);
        setIsOpen(false);
    };

    const handleClickClose = () => {
        setIsOpen(false);
    };

    const handleAddSubtaskClick = () => {
        append({ title: "" }); // Add a new empty subtask
    };

    const handleRemoveSubtaskClick = (index: number) => {
        remove(index);
    };

    return (
        <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create Task</h3>
                <div>
                    <label htmlFor="title" className=" flex flex-col my-2">
                        <span className="text-[14px] font-bold">Title</span>
                        <input
                            type="text"
                            id="title"
                            className="input input-bordered h-8"
                            {...register("title")}
                        />
                    </label>

                    <label className="my-2" htmlFor="description">
                        <span className="text-[14px] font-bold">
                            Description
                        </span>
                        <textarea
                            id="description"
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                            {...register("description")}
                        />
                    </label>

                    <div className="w-full flex items-center justify-between my-2">
                        <label className="w-[45%]" htmlFor="priority">
                            <span className="text-[14px] font-bold">
                                Priority
                            </span>
                            <select
                                className="select select-bordered select-sm w-full max-w-xs"
                                defaultValue={3}
                                {...register("priority")}
                            >
                                <option value={1}>Very Low</option>
                                <option value={2}>Low</option>
                                <option value={3}>Medium</option>
                                <option value={4}>High</option>
                                <option value={5}>VeryHigh</option>
                            </select>
                        </label>

                        <label className="w-[45%]" htmlFor="category">
                            <span className="text-[14px] font-bold">
                                Category
                            </span>
                            <input
                                type="text"
                                id="category"
                                className="input input-bordered h-8"
                                {...register("category")}
                            />
                        </label>
                    </div>

                    <section className="mt-4">
                        <div className="flex items-center mb-2">
                            <h4 className="text-base font-bold mr-2">
                                Sub Tasks
                            </h4>
                            <button
                                onClick={handleAddSubtaskClick}
                                className="btn bg-green-500 text-white hover:bg-green-600 min-h-0 min-w-0 p-0 h-6 w-6"
                            >
                                +
                            </button>
                        </div>

                        {fields.map((subTask, index) => (
                            <SubTask
                                key={subTask.id}
                                fieldName={`subTasks.${index}.title`}
                                className="mt-2"
                                checked={true}
                                onRemoveClick={() =>
                                    handleRemoveSubtaskClick(index)
                                }
                                register={register}
                            />
                        ))}
                    </section>
                </div>

                <section className="w-full flex items-center justify-end mt-4">
                    <button
                        onClick={handleSubmit(handleClickSave)}
                        className="btn bg-green-500 text-white hover:bg-green-600 mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => handleClickClose()}
                        className="btn bg-red-500 text-white hover:bg-red-600"
                    >
                        Close
                    </button>
                </section>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClickClose}>Close</button>
            </form>
        </dialog>
    );
}
