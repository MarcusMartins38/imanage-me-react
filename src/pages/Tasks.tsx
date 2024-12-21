import { useState } from "react";
import Task from "../components/Task";
import { TaskT } from "../lib/type";
import Sidebar from "../components/Sidebar";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <main>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`p-4 transition-all duration-300`}
        style={{
          width: isCollapsed ? `calc(100% - 64px)` : `calc(100% - 256px)`,
          marginLeft: isCollapsed ? "64px" : "256px",
        }}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleRemoveTask={handleRemoveTask}
            handleSaveEditTask={handleSaveEditTask}
          />
        ))}
      </div>
    </main>
  );
}

export default Tasks;
