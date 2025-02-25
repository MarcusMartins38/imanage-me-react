export type TaskT = {
    id?: string;
    title: string;
    description?: string;
    category?: string;
    priority: number;
    status?: string;
    subTasks?: TaskT[];
    parentTaskId?: string;
    createdAt: string;
};

export type UserT = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
};
