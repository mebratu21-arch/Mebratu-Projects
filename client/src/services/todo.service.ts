import api from './api';
import { TodosResponse, SingleTodoResponse, CreateTodoInput, UpdateTodoInput } from '../types';

export const todoApi = {
  getAll: async (params?: {
    search?: string;
    completed?: string;
    priority?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<TodosResponse> => {
    const { data } = await api.get<TodosResponse>('/todos', { params });
    return data;
  },

  create: async (input: CreateTodoInput): Promise<SingleTodoResponse> => {
    const { data } = await api.post<SingleTodoResponse>('/todos', input);
    return data;
  },

  update: async (id: string, input: UpdateTodoInput): Promise<SingleTodoResponse> => {
    const { data } = await api.put<SingleTodoResponse>(`/todos/${id}`, input);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  toggleComplete: async (id: string): Promise<SingleTodoResponse> => {
    const { data } = await api.patch<SingleTodoResponse>(`/todos/${id}/complete`);
    return data;
  },
};
