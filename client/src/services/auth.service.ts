import api from './api';
import { AuthResponse } from '../types';

export const authApi = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', { email, password });
    return data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  getMe: async (): Promise<AuthResponse> => {
    const { data } = await api.get<AuthResponse>('/auth/me');
    return data;
  },
};
