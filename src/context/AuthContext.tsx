import React, { createContext, useContext, useState } from 'react';
import type { UserProfile } from '../types/admin';

interface AuthContextType {
  // Participant State
  participant: UserProfile | null;
  loginParticipantGoogle: (googleUser: { name: string; email: string; avatar?: string; uid?: string; googleId?: string }) => Promise<void>;
  updateParticipantTeam: (teamId: string) => void;
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
  const loginParticipantGoogle = async (googleUser: { name: string; email: string; avatar?: string; uid?: string; googleId?: string; role?: 'PARTICIPANT' | 'ADMIN' }) => {
    let user: UserProfile = {
      id: googleUser.uid || googleUser.googleId || `USR-${Date.now()}`,
      name: googleUser.name,
      email: googleUser.email,
      avatar: googleUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: googleUser.role || 'PARTICIPANT',
      teamId: participant?.email === googleUser.email ? participant.teamId : undefined
    };

    // Persist Google User Data to MongoDB Backend & fetch team details
    try {
      const payload = {
        email: googleUser.email,
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
        if (data.user && data.user.teamId) {
          user.teamId = data.user.teamId;
        }
      }
    } catch (err) {
      console.warn('MongoDB API connection note (User persisted in local state):', err);
    }

    setParticipant(user);
    localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(user));
  };

  const updateParticipantTeam = (teamId: string) => {
    if (!participant) return;
    const updated: UserProfile = { ...participant, teamId };
    setParticipant(updated);
    localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(updated));

    // Send team update to MongoDB backend
    fetch('/api/users/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: participant.email, teamId })
    }).catch(() => {
      fetch('http://localhost:5000/api/users/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: participant.email, teamId })
      }).catch(err => console.warn('Failed to update team in MongoDB:', err));
    });
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
        updateParticipantTeam,
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
