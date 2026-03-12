import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType, Priority, CreateTodoInput } from '../types';
import { todoApi } from '../services/todo.service';
import { toast } from 'react-toastify';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit: 8 };
      if (search) params.search = search;
      if (filter === 'active') params.completed = 'false';
      if (filter === 'completed') params.completed = 'true';
      if (priorityFilter !== 'all') params.priority = priorityFilter;

      const response = await todoApi.getAll(params);
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch {
      toast.error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, [search, filter, priorityFilter, page]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (input: CreateTodoInput) => {
    try {
      await todoApi.create(input);
      toast.success('Todo created!');
      fetchTodos();
    } catch {
      toast.error('Failed to create todo');
    }
  };

  const updateTodo = async (id: string, title: string, description?: string, priority?: Priority, due_date?: string | null, category?: string | null) => {
    try {
      await todoApi.update(id, { title, description, priority, due_date, category });
      toast.success('Todo updated!');
      fetchTodos();
    } catch {
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id);
      toast.success('Todo deleted!');
      fetchTodos();
    } catch {
      toast.error('Failed to delete todo');
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const response = await todoApi.toggleComplete(id);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? response.data.todo : t))
      );
    } catch {
      toast.error('Failed to update todo');
    }
  };

  return {
    todos,
    isLoading,
    search,
    setSearch,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    page,
    setPage,
    totalPages,
    total,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refetch: fetchTodos,
  };
};
