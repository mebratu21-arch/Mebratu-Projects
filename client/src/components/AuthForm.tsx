import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight, FiCheckSquare } from 'react-icons/fi';
import axios from 'axios';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register' && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        await register(email, password);
        toast.success('Account created successfully!');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg shadow-primary-500/25 mb-4">
            <FiCheckSquare className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-dark-400 mt-1">
            {mode === 'login'
              ? 'Sign in to manage your todos'
              : 'Sign up to get started with SecureTodo'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-dark-900/60 backdrop-blur-xl border border-dark-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} id="auth-form">
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="email"
                  id="email-input"
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-10 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="password"
                  id="password-input"
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-10 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {mode === 'register' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                  <input
                    type="password"
                    id="confirm-password-input"
                    className="w-full bg-dark-800 border border-dark-600 rounded-xl px-10 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="submit-button"
              disabled={isSubmitting}
              className="w-full mt-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-dark-400">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
