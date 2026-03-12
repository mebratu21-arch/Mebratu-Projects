export interface User {
  id: string;
  email: string;
  created_at: string;
}

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
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface TodosResponse {
  success: boolean;
  data: {
    todos: Todo[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface SingleTodoResponse {
  success: boolean;
  data: {
    todo: Todo;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: string;
  category?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  due_date?: string | null;
  category?: string | null;
}

export type FilterType = 'all' | 'active' | 'completed';
