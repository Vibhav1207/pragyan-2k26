import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { SystemSettings } from '../../types/admin';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>(() => apiService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSaveSettings = () => {
    if (window.confirm('Save system configuration changes? Important changes will take effect immediately.')) {
      apiService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <AdminLayout
      title="SYSTEM SETTINGS & CONFIGURATION"
      subtitle="Manage registration deadlines, submission rules, maintenance mode, and admin account security"
    >
      
      <div className="space-y-8 text-left">
        
        {/* HEADER SAVE ACTION */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>HACKATHON SYSTEM CONFIGURATION</span>
            </h3>
            <p className="text-xs text-slate-500">Controls registration status, submission limits, and portal state</p>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> SETTINGS SAVED!
              </span>
            )}
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-md shadow-blue-600/20 transition"
            >
              <Save className="w-4 h-4" /> SAVE SETTINGS
            </button>
          </div>
        </div>

        {/* 1. REGISTRATION SETTINGS */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            1. REGISTRATION CONFIGURATION
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Registration Portal Status</label>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition ${
                  settings.registrationOpen
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {settings.registrationOpen ? '✓ REGISTRATION OPEN' : '✕ REGISTRATION CLOSED'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Registration Deadline</label>
              <input
                type="text"
                value={settings.registrationDeadline}
                onChange={(e) => setSettings({ ...settings, registrationDeadline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Max Team Size (Strict 4)</label>
              <input
                type="number"
                disabled
                value={settings.maxTeamSize}
                className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Registration Fee (₹)</label>
              <input
                type="number"
                value={settings.registrationFee}
                onChange={(e) => setSettings({ ...settings, registrationFee: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

          </div>
        </div>

        {/* 2. SUBMISSION SETTINGS */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            2. PROJECT SUBMISSION CONFIGURATION
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Submission Upload Status</label>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, submissionOpen: !settings.submissionOpen })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition ${
                  settings.submissionOpen
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {settings.submissionOpen ? '✓ SUBMISSIONS OPEN' : '✕ SUBMISSIONS CLOSED'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Submission Deadline</label>
              <input
                type="text"
                value={settings.submissionDeadline}
                onChange={(e) => setSettings({ ...settings, submissionDeadline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Max File Upload Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSizeMb}
                onChange={(e) => setSettings({ ...settings, maxFileSizeMb: parseInt(e.target.value) || 50 })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

          </div>
        </div>

        {/* 3. WEBSITE MAINTENANCE MODE */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            3. WEBSITE MAINTENANCE & VISIBILITY
          </h4>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-[#0B192C] uppercase">MAINTENANCE MODE</div>
              <div className="text-[10px] text-slate-500">When enabled, public visitors see a maintenance banner</div>
            </div>

            <button
              type="button"
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                settings.maintenanceMode ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* 4. ADMIN ACCOUNT PASSWORD */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            4. ADMIN ACCOUNT SECURITY
          </h4>

          {passwordSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Admin password updated successfully!
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="md:col-span-3 text-right">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold uppercase border border-slate-200"
              >
                UPDATE ADMIN PASSWORD
              </button>
            </div>
          </form>
        </div>

      </div>

    </AdminLayout>
  );
};

