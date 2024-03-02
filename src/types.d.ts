export type Uuid = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: Uuid;
  name: string;
}

export interface Board {
  id: Uuid;
  title: string;
  tasks: Task[];
}
