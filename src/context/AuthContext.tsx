import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types/admin';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  participant: UserProfile | null;
  loginParticipantGoogle: (googleUser: { name: string; email: string; avatar?: string; uid?: string; googleId?: string }) => Promise<void>;
  logoutParticipant: () => void;

  admin: UserProfile | null;
  adminToken: string | null;
  loginAdmin: (email: string, token: string, name?: string) => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PARTICIPANT_KEY = 'pragyan_participant_user';
const ADMIN_KEY = 'pragyan_admin_user';
const ADMIN_TOKEN_KEY = 'pragyan_admin_token';

const ALLOWED_ADMIN_EMAILS = [
  'vibhav07patel@gmail.com',
  'dhirajpatil7170@gmail.com',
  'shriparthwakte@gmail.com'
];

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

  const loginParticipantGoogle = async (googleUser: { name: string; email: string; avatar?: string; uid?: string; googleId?: string; role?: 'PARTICIPANT' | 'ADMIN' }) => {
    const cleanEmail = (googleUser.email || '').toLowerCase().trim();
    const isAdminEmail = ALLOWED_ADMIN_EMAILS.includes(cleanEmail);
    const resolvedRole = isAdminEmail ? 'ADMIN' : (googleUser.role || 'PARTICIPANT');

    let user: UserProfile = {
      id: googleUser.uid || googleUser.googleId || `USR-${Date.now()}`,
      name: googleUser.name,
      email: cleanEmail,
      avatar: googleUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: resolvedRole
    };

    if (isAdminEmail) {
      loginAdmin(cleanEmail, 'authorized-admin-token', googleUser.name || 'PRAGYAN Admin');
    }

    try {
      const payload = {
        email: cleanEmail,
        name: googleUser.name,
        avatar: user.avatar,
        googleId: googleUser.googleId || googleUser.uid || user.id,
        uid: googleUser.uid
      };

      let res = await fetch('/api/auth/participant/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/auth/participant/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          user.token = data.token;
          localStorage.setItem('pragyan_participant_token', data.token);
        }
        if (data.user) {
          if (data.user.role) {
            user.role = data.user.role;
          }
          if (data.user.role === 'ADMIN' || isAdminEmail) {
            loginAdmin(user.email, data.token || 'google-admin-token', user.name);
          }
        }
      }
    } catch (err) {
      console.warn('MongoDB API connection note (User persisted in local state):', err);
    }

    setParticipant(user);
    localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(user));
  };

  const logoutParticipant = () => {
    setParticipant(null);
    localStorage.removeItem(PARTICIPANT_KEY);
  };

  // Sync any active Firebase user automatically to MongoDB backend on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const email = firebaseUser.email.toLowerCase().trim();
        const payload = {
          name: firebaseUser.displayName || 'Participant Delegate',
          email,
          avatar: firebaseUser.photoURL || undefined,
          uid: firebaseUser.uid,
          googleId: firebaseUser.uid
        };
        // Background sync to ensure user is in MongoDB
        try {
          fetch('/api/auth/participant/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => { });
        } catch { }

        if (ALLOWED_ADMIN_EMAILS.includes(email)) {
          loginAdmin(email, 'authorized-admin-token', firebaseUser.displayName || 'PRAGYAN Super Admin');
        }
      }
    });

    return () => unsubscribe();
  }, []);

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
