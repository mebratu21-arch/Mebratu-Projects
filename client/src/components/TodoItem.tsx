import type { FC } from 'react';
import { Todo } from '../types';
import { FiEdit2, FiTrash2, FiCheck, FiCircle, FiClock, FiCalendar, FiTag, FiFlag } from 'react-icons/fi';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { label: 'Low', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  medium: { label: 'Med', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  high: { label: 'High', color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
};

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const formattedDate = new Date(todo.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const isOverdue = todo.due_date && !todo.completed && new Date(todo.due_date) < new Date(new Date().toDateString());
  const formattedDueDate = todo.due_date
    ? new Date(todo.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  const prio = priorityConfig[todo.priority || 'medium'];

  return (
    <div
      className={`group bg-dark-800/60 border rounded-xl p-4 transition-all duration-200 hover:bg-dark-800 hover:shadow-lg animate-slide-up ${
        todo.completed
          ? 'border-green-500/20 bg-green-500/5'
          : isOverdue
            ? 'border-rose-500/30 bg-rose-500/5'
            : 'border-dark-700/50 hover:border-primary-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Toggle Button */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-dark-500 hover:border-primary-400 text-transparent hover:text-primary-400'
          }`}
          id={`toggle-todo-${todo.id}`}
        >
          {todo.completed ? <FiCheck className="text-xs" /> : <FiCircle className="text-xs" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-sm leading-snug transition-all ${
              todo.completed ? 'text-dark-500 line-through' : 'text-white'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-xs leading-relaxed ${
                todo.completed ? 'text-dark-600' : 'text-dark-400'
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* Meta row: badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {/* Priority badge */}
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded-md border ${prio.color}`}>
              <FiFlag className="text-[9px]" />
              {prio.label}
            </span>

            {/* Category tag */}
            {todo.category && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded-md text-primary-300 bg-primary-400/10 border border-primary-400/20">
                <FiTag className="text-[9px]" />
                {todo.category}
              </span>
            )}

            {/* Due date */}
            {formattedDueDate && (
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded-md border ${
                isOverdue
                  ? 'text-rose-400 bg-rose-400/10 border-rose-400/20'
                  : 'text-dark-400 bg-dark-700/50 border-dark-600'
              }`}>
                <FiCalendar className="text-[9px]" />
                {formattedDueDate}
              </span>
            )}

            {/* Created date */}
            <span className="inline-flex items-center gap-1 text-dark-600">
              <FiClock className="text-[9px]" />
              <span className="text-[10px]">{formattedDate}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 text-dark-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-all"
            id={`edit-todo-${todo.id}`}
            title="Edit"
          >
            <FiEdit2 className="text-sm" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            id={`delete-todo-${todo.id}`}
            title="Delete"
          >
            <FiTrash2 className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
