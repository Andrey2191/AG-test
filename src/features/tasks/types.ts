export interface Task {
  userId: number;
  id: number;
  todo: string;
  completed: boolean;
  isNew?: boolean;
}