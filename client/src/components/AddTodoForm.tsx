import { useState, type FC } from 'react';
import { Priority, CreateTodoInput } from '../types';
import { FiPlus, FiCalendar, FiTag, FiFlag } from 'react-icons/fi';

interface AddTodoFormProps {
  onAdd: (input: CreateTodoInput) => Promise<void>;
}

const priorityColors = {
  low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  high: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
};

const AddTodoForm: FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      due_date: dueDate || undefined,
      category: category.trim() || undefined,
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setIsOpen(false);
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        id="add-todo-button"
        className="relative z-20 w-full flex items-center gap-3 p-4 bg-dark-800/40 hover:bg-dark-800/70 border border-dashed border-dark-600 hover:border-primary-500/50 rounded-xl text-dark-400 hover:text-primary-400 transition-all duration-200 group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-dark-700 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors">
          <FiPlus className="text-lg" />
        </div>
        <span className="font-medium text-sm">Add a new todo</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="add-todo-form"
      className="relative z-20 bg-dark-800/60 border border-dark-700/50 rounded-xl p-4 animate-slide-down"
    >
      <input
        type="text"
        id="todo-title-input"
        className="w-full bg-transparent text-white placeholder-dark-500 text-sm font-medium focus:outline-none mb-2"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        maxLength={255}
      />
      <textarea
        id="todo-description-input"
        className="w-full bg-dark-900/50 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-300 placeholder-dark-600 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
        placeholder="Add a description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        maxLength={1000}
      />

      {/* Extra fields row */}
      <div className="flex flex-wrap gap-2 mt-3">
        {/* Priority selector */}
        <div className="flex items-center gap-1">
          <FiFlag className="text-xs text-dark-500" />
          <div className="flex gap-0.5 bg-dark-900/50 rounded-lg p-0.5 border border-dark-600">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all capitalize border ${
                  priority === p ? priorityColors[p] : 'text-dark-500 border-transparent hover:text-dark-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div className="flex items-center gap-1.5">
          <FiCalendar className="text-xs text-dark-500" />
          <input
            type="date"
            id="todo-due-date"
            className="bg-dark-900/50 border border-dark-600 rounded-lg px-2.5 py-1 text-[11px] text-dark-300 focus:outline-none focus:ring-1 focus:ring-primary-500 [color-scheme:dark]"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-1.5">
          <FiTag className="text-xs text-dark-500" />
          <input
            type="text"
            id="todo-category-input"
            className="bg-dark-900/50 border border-dark-600 rounded-lg px-2.5 py-1 text-[11px] text-dark-300 placeholder-dark-600 focus:outline-none focus:ring-1 focus:ring-primary-500 w-24"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxLength={100}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="px-4 py-1.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-30"
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
            setCategory('');
          }}
          className="px-4 py-1.5 text-dark-400 hover:text-white text-sm font-medium rounded-lg transition-colors cursor-pointer relative z-30"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
