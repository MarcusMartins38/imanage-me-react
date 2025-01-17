import { useState } from "react";
import { TaskT } from "../lib/type";

type CreateTaskModalProps = {
  handleSaveTask: (task: Omit<TaskT, "id">) => void;
};

export default function CreateTaskModal({
  handleSaveTask,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const closeModal = () => {
    const modal = document.getElementById("create_task_modal");
    if (modal) {
      modal.close();
    }
  };

  const handleClickSave = () => {
    handleSaveTask({ title, description });
    closeModal();
  };

  const handleClickClose = () => {
    setTitle("");
    setDescription("");
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
              name="title"
              id="title"
              className="input input-bordered h-8"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            <span className="text-[14px] font-bold">Description</span>
            <textarea
              name="description"
              id="description"
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <section className="w-full flex items-center justify-end mt-2">
          <button
            onClick={handleClickSave}
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
