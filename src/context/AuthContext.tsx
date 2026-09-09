import React, { createContext, useContext, useState } from 'react';
import type { UserProfile } from '../types/admin';

interface AuthContextType {
  // Participant State
  participant: UserProfile | null;
  loginParticipantGoogle: (googleUser: { name: string; email: string; avatar?: string }) => void;
  logoutParticipant: () => void;

  // Admin State
  admin: UserProfile | null;
  adminToken: string | null;
  loginAdmin: (email: string, token: string, name?: string) => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PARTICIPANT_KEY = 'pragyan_participant_user';
const ADMIN_KEY = 'pragyan_admin_user';
const ADMIN_TOKEN_KEY = 'pragyan_admin_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [participant, setParticipant] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(PARTICIPANT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [admin, setAdmin] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ADMIN_TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  // Participant Google Login
  const loginParticipantGoogle = (googleUser: { name: string; email: string; avatar?: string; role?: 'PARTICIPANT' | 'ADMIN' }) => {
    const user: UserProfile = {
      id: `USR-${Date.now()}`,
      name: googleUser.name,
      email: googleUser.email,
      avatar: googleUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: googleUser.role || 'PARTICIPANT'
    };
    setParticipant(user);
    localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(user));
  };

  const logoutParticipant = () => {
    setParticipant(null);
    localStorage.removeItem(PARTICIPANT_KEY);
  };

  // Admin Login
  const loginAdmin = (email: string, token: string, name: string = 'PRAGYAN Super Admin') => {
    const adminUser: UserProfile = {
      id: 'ADM-001',
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'ADMIN'
    };
    setAdmin(adminUser);
    setAdminToken(token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminUser));
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        participant,
        loginParticipantGoogle,
        logoutParticipant,
        admin,
        adminToken,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
