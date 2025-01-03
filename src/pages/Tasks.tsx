import { useEffect, useState } from "react";
import Task from "../components/Task";
import { TaskT } from "../lib/type";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import CreateTaskModal from "../components/CreateTaskModal";
import { useCookies } from "react-cookie";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [cookies] = useCookies(["userAuth"]);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const res = await fetch("http://localhost:3333/api/task/", {
        headers: {
          Authorization: `Bearer ${cookies.userAuth}`,
        },
      });

      if (!res.ok) throw new Error("Get Tasks error");

      const resJson = await res.json();
      console.log(resJson);
      setTasks(resJson.data);
    };

    fetchUserTasks();
  }, []);

  const handleRemoveTask = async (id: number) => {
    const res = await fetch(`http://localhost:3333/api/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.userAuth}`,
      },
    });

    if (!res.ok) throw new Error("Can't delete task");
    setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
  };

  const handleSaveEditTask = async (task: TaskT) => {
    const res = await fetch(
      "http://localhost:3333/api/task/57df540d-acd4-40d4-84b2-b075987a1c95",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${cookies.userAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
        }),
      },
    );

    if (!res.ok) throw new Error("Error while editing task");

    setTasks((prev) =>
      prev.map((prevTask) =>
        prevTask.id === task.id ? { ...task } : prevTask,
      ),
    );
  };

  const handleSaveClick = async (newTask: TaskT) => {
    const res = await fetch("http://localhost:3333/api/task/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.userAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
      }),
    });

    if (!res.ok) throw new Error("Can't create new task");
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
