'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import API from '@/lib/api';

interface User {
  id: number;
  phone_number: string;
  is_staff: boolean;
  is_manager: boolean;
  is_superuser: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setLoading(true);
      API.get('user-profile/')
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
