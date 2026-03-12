export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  due_date: string | null;
  category: string | null;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: string;
  category?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  due_date?: string | null;
  category?: string | null;
}
