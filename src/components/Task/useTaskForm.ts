import { useState } from "react";
import { TaskT } from "../../lib/type";
import { useFieldArray, useForm } from "react-hook-form";
import { api } from "../../lib/api";

export const useTaskForm = (task: TaskT, handleSaveEditTask: Function) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { register, control, getValues, setValue } = useForm({
        defaultValues: {
            subTasks: task.subTasks,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subTasks",
        keyName: "_id",
    });

    const handleCancelEdit = () => {
        setIsEditOpen(false);
        setValue("description", task.description); // Reset the form values
        setValue("title", task.title); // Reset the form title
        setValue("priority", task.priority); // Reset the form title
        setValue("subTasks", task.subTasks);
    };

    const handleClickSaveEdit = (task: TaskT) => {
        const subTasks = getValues("subTasks").map((subTask: any) => ({
            id: subTask?.id || null,
            title: subTask.title,
            parentTaskId: task.id,
        }));

        setValue("subTasks", subTasks);

        const updatedTask = {
            ...task,
            title: getValues("title"),
            description: getValues("description"),
            priority: getValues("priority"),
            subTasks: subTasks,
        };

        handleSaveEditTask(updatedTask);
        setIsEditOpen(false);
    };

    const handleSubtaskStatusChange = async (
        subTaskId: string,
        completed: boolean,
    ) => {
        await api.patch(
            `/task/${subTaskId}/status`,
            JSON.stringify({ status: completed ? "COMPLETED" : "PENDING" }),
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const updatedSubTasks = fields.map((subTask) =>
            subTask.id === subTaskId
                ? { ...subTask, status: completed ? "COMPLETED" : "PENDING" }
                : subTask,
        );
        setValue("subTasks", updatedSubTasks);
    };

    const handleRemoveSubTask = async (
        subTaskIndex: number,
        subTaskId?: string,
    ) => {
        if (!subTaskId) {
            return remove(subTaskIndex);
        }

        const res = await api.delete(`/task/${subTaskId}`, {
            withCredentials: true,
        });

        if (!res.ok) throw new Error("Can't delete task");

        remove(subTaskIndex);
    };

    return {
        isEditOpen,
        setIsEditOpen,
        fields,
        register,
        append,
        handleClickSaveEdit,
        handleCancelEdit,
        handleRemoveSubTask,
        handleSubtaskStatusChange,
    };
};
