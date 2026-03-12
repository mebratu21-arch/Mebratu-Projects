import { useState, useEffect, type FC } from 'react';
import { Todo, Priority } from '../types';
import { FiX, FiFlag, FiCalendar, FiTag } from 'react-icons/fi';

interface EditTodoFormProps {
  todo: Todo;
  onSave: (id: string, title: string, description?: string, priority?: Priority, due_date?: string | null, category?: string | null) => Promise<void>;
  onClose: () => void;
}

const priorityColors = {
  low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  high: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
};

const EditTodoForm: FC<EditTodoFormProps> = ({ todo, onSave, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState<Priority>(todo.priority || 'medium');
  const [dueDate, setDueDate] = useState(todo.due_date || '');
  const [category, setCategory] = useState(todo.category || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onSave(
      todo.id,
      title.trim(),
      description.trim() || undefined,
      priority,
      dueDate || null,
      category.trim() || null,
    );
    onClose();
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">Edit Todo</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} id="edit-todo-form">
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Title</label>
            <input
              type="text"
              id="edit-title-input"
              className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              maxLength={255}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Description</label>
            <textarea
              id="edit-description-input"
              className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Add a description..."
            />
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label className="flex items-center gap-1.5 text-sm font-medium text-dark-300 mb-1.5">
              <FiFlag className="text-xs" /> Priority
            </label>
            <div className="flex gap-1 bg-dark-800 rounded-xl p-1 border border-dark-600">
              {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize border ${
                    priority === p ? priorityColors[p] : 'text-dark-500 border-transparent hover:text-dark-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date & Category row */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-dark-300 mb-1.5">
                <FiCalendar className="text-xs" /> Due Date
              </label>
              <input
                type="date"
                id="edit-due-date"
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all [color-scheme:dark]"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-dark-300 mb-1.5">
                <FiTag className="text-xs" /> Category
              </label>
              <input
                type="text"
                id="edit-category-input"
                className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-white placeholder-dark-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Work, Personal"
                maxLength={100}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-dark-400 hover:text-white text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm;
