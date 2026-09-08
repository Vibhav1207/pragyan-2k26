import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Homepage
import { App as PublicHomepage } from '../App';

// Participant Routes
import { ParticipantLogin } from '../pages/participant/ParticipantLogin';
import { ParticipantSignup } from '../pages/participant/ParticipantSignup';
import { TeamRegistration } from '../pages/participant/TeamRegistration';
import { ParticipantDashboard } from '../pages/participant/ParticipantDashboard';
import { ParticipantProfile } from '../pages/participant/ParticipantProfile';

// Admin Routes
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboardOverview } from '../pages/admin/AdminDashboardOverview';
import { AdminTeamsList } from '../pages/admin/AdminTeamsList';
import { AdminTeamDetail } from '../pages/admin/AdminTeamDetail';
import { AdminRegistrationsList } from '../pages/admin/AdminRegistrationsList';
import { AdminParticipantsList } from '../pages/admin/AdminParticipantsList';
import { AdminSubmissionsList } from '../pages/admin/AdminSubmissionsList';
import { AdminFilesList } from '../pages/admin/AdminFilesList';
import { AdminTracksList } from '../pages/admin/AdminTracksList';
import { AdminHomepageCMS } from '../pages/admin/AdminHomepageCMS';
import { AdminAnnouncements } from '../pages/admin/AdminAnnouncements';
import { AdminExportCenter } from '../pages/admin/AdminExportCenter';
import { AdminActivityLogs } from '../pages/admin/AdminActivityLogs';
import { AdminSettings } from '../pages/admin/AdminSettings';

import { useAuth } from '../context/AuthContext';

// Protected Route Helpers
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin } = useAuth();
  if (!admin || admin.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const ParticipantProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { participant } = useAuth();
  if (!participant) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. PUBLIC WEBSITE */}
      <Route path="/" element={<PublicHomepage />} />

      {/* 2. PARTICIPANT AUTH & REGISTRATION */}
      <Route path="/login" element={<ParticipantLogin />} />
      <Route path="/signup" element={<ParticipantSignup />} />
      
      <Route
        path="/register"
        element={
          <ParticipantProtectedRoute>
            <TeamRegistration />
          </ParticipantProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ParticipantProtectedRoute>
            <ParticipantDashboard />
          </ParticipantProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ParticipantProtectedRoute>
            <ParticipantProfile />
          </ParticipantProtectedRoute>
        }
      />

      {/* 3. SEPARATE ADMIN AUTHENTICATION */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 4. ADMIN MANAGEMENT SUITE */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardOverview />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/teams"
        element={
          <AdminProtectedRoute>
            <AdminTeamsList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/teams/:teamId"
        element={
          <AdminProtectedRoute>
            <AdminTeamDetail />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/registrations"
        element={
          <AdminProtectedRoute>
            <AdminRegistrationsList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/participants"
        element={
          <AdminProtectedRoute>
            <AdminParticipantsList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/submissions"
        element={
          <AdminProtectedRoute>
            <AdminSubmissionsList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/files"
        element={
          <AdminProtectedRoute>
            <AdminFilesList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/tracks"
        element={
          <AdminProtectedRoute>
            <AdminTracksList />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/homepage"
        element={
          <AdminProtectedRoute>
            <AdminHomepageCMS />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <AdminProtectedRoute>
            <AdminAnnouncements />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/exports"
        element={
          <AdminProtectedRoute>
            <AdminExportCenter />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/activity"
        element={
          <AdminProtectedRoute>
            <AdminActivityLogs />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminProtectedRoute>
            <AdminSettings />
          </AdminProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
