export type TaskT = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  status?: string;
  subTasks: TaskT[];
};

export type UserT = {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
};
