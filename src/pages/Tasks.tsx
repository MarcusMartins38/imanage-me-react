import { RootState } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import CreateTaskModal from "../components/CreateTaskModal";
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import { TaskT } from "../lib/type";
import { api } from "../lib/api";

function Tasks() {
  const [tasks, setTasks] = useState<TaskT | []>([]);
  const [cookies] = useCookies(["userAuth"]);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const res = await api.get("/task/");

      setTasks(res.data.data);
    };

    fetchUserTasks();
  }, []);

  const handleRemoveTask = async (id: string) => {
    await api
      .delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
        },
      })
      .then(() => {
        setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
      });
  };

  const handleSaveEditTask = async (task: TaskT) => {
    const res = await api.patch(
      `/task/${task.id}`,
      JSON.stringify({
        ...task,
      })
    );

    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? { ...res.data.data } : prevTask,
      ),
    );
  };

  const handleSaveClick = async (newTask: Omit<TaskT, "id">) => {
    const res = await api.post("/task/", JSON.stringify(newTask), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { id, title, description, priority, category, subTasks } =
      res.data.data;
    const resNewTask = { id, title, description, priority, category, subTasks };

    setTasks((prev) => [resNewTask, ...prev]);
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
