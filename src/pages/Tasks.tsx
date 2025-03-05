import { useEffect, useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import Task from "../components/Task/Task";
import { TaskT } from "../lib/type";
import { api } from "../lib/api";

function Tasks() {
    const [tasks, setTasks] = useState<TaskT[] | []>([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserTasks = async () => {
            const res = await api.get("/task/");
            setTasks(res.data.data);
        };

        fetchUserTasks();
    }, []);

    const handleRemoveTask = async (id: string) => {
        await api.delete(`/task/${id}`).then(() => {
            setTasks((prev) => [...prev.filter((task) => task.id !== id)]);
        });
    };

    const handleSaveEditTask = async (task: TaskT) => {
        const { data: responseData } = await api.patch(
            `/task/${task.id}`,
            JSON.stringify({
                ...task,
            }),
        );

        setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
                prevTask.id === task.id ? { ...responseData.data } : prevTask,
            ),
        );
    };

    const handleSaveClick = async (newTask: Omit<TaskT, "id">) => {
        const { data: res } = await api.post("/task/", JSON.stringify(newTask));
        setTasks((prev) => [{ ...res.data }, ...prev]);
    };

    const handleOrderByPriority = () => {
        if (tasks.length === 0) return;

        const tasksToOrder = [...tasks];
        tasksToOrder.sort((taskA, taskB) => taskB.priority - taskA.priority);
        setTasks(tasksToOrder);
    };

    const handleOrderByCreatedBy = () => {
        if (tasks.length === 0) return;
        const tasksToOrder = [...tasks];
        tasksToOrder.sort(
            (taskA, taskB) =>
                new Date(taskB.createdAt).getTime() -
                new Date(taskA.createdAt).getTime(),
        );
        setTasks(tasksToOrder);
    };

    return (
        <>
            <div
                className={`max-w-[1440px] m-auto p-4 transition-all duration-300`}
            >
                <header className="flex items-center justify-between w-full">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-zinc-800 text-white hover:bg-zinc-600 relative z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-sort"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M3 9l4 -4l4 4m-4 -4v14" />
                                <path d="M21 15l-4 4l-4 -4m4 4v-14" />
                            </svg>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow top-2 left-16 border border-solid border-[#e5e7eb]"
                            >
                                <h2 className="mb-2">Order By</h2>
                                <li onClick={handleOrderByPriority}>
                                    <a>Priority</a>
                                </li>
                                <li onClick={handleOrderByCreatedBy}>
                                    <a>Created At</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button
                        className="btn bg-zinc-800 text-white hover:bg-zinc-600"
                        onClick={() => setIsTaskModalOpen(true)}
                    >
                        Create Task
                    </button>
                </header>
                {tasks.map((task: TaskT) => (
                    <Task
                        key={task.id}
                        task={task}
                        handleRemoveTask={handleRemoveTask}
                        handleSaveEditTask={handleSaveEditTask}
                    />
                ))}
            </div>

            <CreateTaskModal
                isOpen={isTaskModalOpen}
                setIsOpen={setIsTaskModalOpen}
                handleSaveTask={handleSaveClick}
            />
        </>
    );
}

export default Tasks;
