import { useState } from "react";
import Task from "../components/Task";
import { TaskT } from "../lib/type";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import CreateTaskModal from "../components/CreateTaskModal";

const mockTasks = [
  {
    id: 1,
    title: "Study Time",
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
              officia unde accusamus voluptatum magnam consequuntur enim,
              officiis minima perferendis? Dolore nostrum in architecto
              repellendus? Maxime ipsum ipsam distinctio eligendi suscipit!`,
  },
  {
    id: 2,
    title: "Study Time 2",
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
              officia unde accusamus voluptatum magnam consequuntur enim,
              officiis minima perferendis? Dolore nostrum in architecto
              repellendus? Maxime ipsum ipsam distinctio eligendi suscipit!`,
  },
  {
    id: 3,
    title: "Study Time 3",
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
              officia unde accusamus voluptatum magnam consequuntur enim,
              officiis minima perferendis? Dolore nostrum in architecto
              repellendus? Maxime ipsum ipsam distinctio eligendi suscipit!`,
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleRemoveTask = (id: number) => {
    setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
  };

  const handleSaveEditTask = (task: TaskT) => {
    setTasks((prev) =>
      prev.map((prevTask) =>
        prevTask.id === task.id ? { ...task } : prevTask,
      ),
    );
  };

  const handleSaveClick = (newTask: TaskT) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <main>
      <Sidebar />

      <div
        className={`p-4 transition-all duration-300`}
        style={{
          width: isOpen ? `calc(100% - 256px)` : `calc(100% - 64px)`,
          marginLeft: isOpen ? "256px" : "64px",
        }}
      >
        <header className="flex items-center justify-end w-full">
          <button
            className="btn bg-zinc-800 text-white hover:bg-zinc-600"
            onClick={() =>
              document.getElementById("create_task_modal").showModal()
            }
          >
            Create Task
          </button>
        </header>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleRemoveTask={handleRemoveTask}
            handleSaveEditTask={handleSaveEditTask}
          />
        ))}
      </div>

      <CreateTaskModal handleSaveTask={handleSaveClick} />
    </main>
  );
}

export default Tasks;
