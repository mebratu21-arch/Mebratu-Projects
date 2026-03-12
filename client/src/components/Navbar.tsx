import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiCheckSquare } from 'react-icons/fi';

const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <FiCheckSquare className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Secure<span className="text-primary-400">Todo</span>
            </span>
          </Link>

          {/* User Info & Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm uppercase">
                  {user.email[0]}
                </div>
                <span className="text-dark-300 text-sm">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-dark-400 hover:text-white bg-dark-800 hover:bg-dark-700 rounded-lg transition-all duration-200 border border-dark-700"
                id="logout-button"
              >
                <FiLogOut className="text-base" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
