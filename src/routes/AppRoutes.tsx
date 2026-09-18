import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App as PublicHomepage } from '../App';
import { useAuth } from '../context/AuthContext';

const ParticipantLogin = lazy(() => import('../pages/participant/ParticipantLogin').then(m => ({ default: m.ParticipantLogin })));
const ParticipantSignup = lazy(() => import('../pages/participant/ParticipantSignup').then(m => ({ default: m.ParticipantSignup })));
const ParticipantProfile = lazy(() => import('../pages/participant/ParticipantProfile').then(m => ({ default: m.ParticipantProfile })));

const AdminLogin = lazy(() => import('../pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboardOverview = lazy(() => import('../pages/admin/AdminDashboardOverview').then(m => ({ default: m.AdminDashboardOverview })));
const AdminParticipantsList = lazy(() => import('../pages/admin/AdminParticipantsList').then(m => ({ default: m.AdminParticipantsList })));
const AdminSubmissionsList = lazy(() => import('../pages/admin/AdminSubmissionsList').then(m => ({ default: m.AdminSubmissionsList })));
const AdminFilesList = lazy(() => import('../pages/admin/AdminFilesList').then(m => ({ default: m.AdminFilesList })));
const AdminTracksList = lazy(() => import('../pages/admin/AdminTracksList').then(m => ({ default: m.AdminTracksList })));
const AdminHomepageCMS = lazy(() => import('../pages/admin/AdminHomepageCMS').then(m => ({ default: m.AdminHomepageCMS })));
const AdminAnnouncements = lazy(() => import('../pages/admin/AdminAnnouncements').then(m => ({ default: m.AdminAnnouncements })));
const AdminExportCenter = lazy(() => import('../pages/admin/AdminExportCenter').then(m => ({ default: m.AdminExportCenter })));
const AdminActivityLogs = lazy(() => import('../pages/admin/AdminActivityLogs').then(m => ({ default: m.AdminActivityLogs })));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#F9F4EA]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-[#162E28] border-t-[#E5BE61] rounded-full animate-spin" />
      <span className="font-mono text-xs uppercase tracking-widest text-[#162E28]">Loading</span>
    </div>
  </div>
);

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin, participant } = useAuth();
  if (admin || (participant && participant.role === 'ADMIN')) {
    return <>{children}</>;
  }
  return <Navigate to="/admin/login" replace />;
};

const ParticipantProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { participant } = useAuth();
  if (!participant) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const ExternalRegisterRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.href = 'https://ums.sanjivani.edu.in//EventRegistration/4DE84D28-1D8';
  }, []);
  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<PublicHomepage />} />

        <Route path="/login" element={<ParticipantLogin />} />
        <Route path="/signup" element={<ParticipantSignup />} />
        <Route path="/register" element={<ExternalRegisterRedirect />} />
        <Route
          path="/dashboard"
          element={
            <ParticipantProtectedRoute>
              <Navigate to="/profile" replace />
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

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardOverview />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
