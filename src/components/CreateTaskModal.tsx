import { TaskT } from "../lib/type";
import { useForm } from "react-hook-form";

type CreateTaskModalProps = {
  handleSaveTask: (task: Omit<TaskT, "id">) => void;
};

export default function CreateTaskModal({
  handleSaveTask,
}: CreateTaskModalProps) {
  const { register, handleSubmit } = useForm();

  const closeModal = () => {
    const modal = document.getElementById("create_task_modal");
    if (modal) {
      modal.close();
    }
  };

  const handleClickSave = (data: Omit<TaskT, "id">) => {
    handleSaveTask(data);
    closeModal();
  };

  const handleClickClose = () => {
    closeModal();
  };

  return (
    <dialog id="create_task_modal" className="modal">
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
            <span className="text-[14px] font-bold">Description</span>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              {...register("description")}
            />
          </label>

          <div className="w-full flex items-center justify-between my-2">
            <label className="w-[45%]" htmlFor="priority">
              <span className="text-[14px] font-bold">Priority</span>
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
              <span className="text-[14px] font-bold">Category</span>
              <input
                type="text"
                id="category"
                className="input input-bordered h-8"
                {...register("category")}
              />
            </label>
          </div>
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
