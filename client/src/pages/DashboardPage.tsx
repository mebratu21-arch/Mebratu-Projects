import { useState, type FC } from 'react';
import { Todo, FilterType, Priority, CreateTodoInput } from '../types';
import { useTodos } from '../hooks/useTodos';
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import EditTodoForm from '../components/EditTodoForm';
import { FiSearch, FiChevronLeft, FiChevronRight, FiList, FiCheckCircle, FiCircle, FiFlag } from 'react-icons/fi';

const DashboardPage: FC = () => {
  const {
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
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const filterOptions: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <FiList /> },
    { value: 'active', label: 'Active', icon: <FiCircle /> },
    { value: 'completed', label: 'Done', icon: <FiCheckCircle /> },
  ];

  const priorityOptions: { value: Priority | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Med' },
    { value: 'low', label: 'Low' },
  ];

  const handleCreate = async (input: CreateTodoInput) => {
    await createTodo(input);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl"></div>
      </div>

      <main className="relative container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">My Todos</h1>
          <p className="text-dark-400 text-sm">
            {total} {total === 1 ? 'task' : 'tasks'} total
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                id="search-input"
                className="w-full bg-dark-800/60 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                placeholder="Search todos..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex bg-dark-800/60 border border-dark-700/50 rounded-xl p-1 gap-0.5">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setFilter(opt.value);
                    setPage(1);
                  }}
                  id={`filter-${opt.value}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === opt.value
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2">
            <FiFlag className="text-dark-500 text-xs" />
            <div className="flex bg-dark-800/60 border border-dark-700/50 rounded-xl p-0.5 gap-0.5">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setPriorityFilter(opt.value);
                    setPage(1);
                  }}
                  id={`priority-filter-${opt.value}`}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    priorityFilter === opt.value
                      ? opt.value === 'high'
                        ? 'bg-rose-500/20 text-rose-400'
                        : opt.value === 'medium'
                          ? 'bg-amber-500/20 text-amber-400'
                          : opt.value === 'low'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="mb-4">
          <AddTodoForm onAdd={handleCreate} />
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={toggleComplete}
          onEdit={(todo) => setEditingTodo(todo)}
          onDelete={deleteTodo}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 text-dark-400 hover:text-white bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-dark-700"
              id="prev-page"
            >
              <FiChevronLeft />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    page === p
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 text-dark-400 hover:text-white bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-dark-700"
              id="next-page"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingTodo && (
        <EditTodoForm
          todo={editingTodo}
          onSave={updateTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
