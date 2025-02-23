import { useEffect, useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import Task from "../components/Task";
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

    return (
        <>
            <div className={`p-4 transition-all duration-300`}>
                <header className="flex items-center justify-end w-full">
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
