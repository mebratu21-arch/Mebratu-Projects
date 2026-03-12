import type { FC } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, isLoading, onToggle, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-dark-800/40 border border-dark-700/30 rounded-xl p-4 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-dark-700"></div>
              <div className="flex-1">
                <div className="h-4 bg-dark-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-dark-700/60 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-dark-300 mb-1">No todos yet</h3>
        <p className="text-dark-500 text-sm">Create your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
