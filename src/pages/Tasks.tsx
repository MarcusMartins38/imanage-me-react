import { RootState } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import CreateTaskModal from "../components/CreateTaskModal";
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import { TaskT } from "../lib/type";

function Tasks() {
  const [tasks, setTasks] = useState<TaskT | []>([]);
  const [cookies] = useCookies(["userAuth"]);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const res = await fetch("http://localhost:3333/api/task/", {
        headers: {
          Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Get Tasks error");

      const resJson = await res.json();
      setTasks(resJson.data);
    };

    fetchUserTasks();
  }, []);

  const handleRemoveTask = async (id: string) => {
    const res = await fetch(`http://localhost:3333/api/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Can't delete task");
    setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
  };

  const handleSaveEditTask = async (task: TaskT) => {
    const res = await fetch(`http://localhost:3333/api/task/${task.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
      }),
    });

    if (!res.ok) throw new Error("Error while editing task");

    const resJson = await res.json();

    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...resJson.data, uniqueKey: Date.now() }
          : prevTask,
      ),
    );
  };

  const handleSaveClick = async (newTask: Omit<TaskT, "id">) => {
    const res = await fetch("http://localhost:3333/api/task/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.userAuth?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!res.ok) throw new Error("Can't create new task");

    const resJson = await res.json();
    const { id, title, description, priority, category, subTasks } =
      resJson.data;
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
            key={`${task.id}-${task.uniqueKey || task.id}`}
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
