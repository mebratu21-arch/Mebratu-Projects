import { createContext, useContext, useState, useEffect, useCallback, type FC, type ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await authApi.getMe();
          setUser(response.data.user);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const { user: userData, token: newToken } = response.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const response = await authApi.register(email, password);
    const { user: userData, token: newToken } = response.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
