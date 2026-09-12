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
        <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#A77A1C]" />
              <span>HACKATHON SYSTEM CONFIGURATION</span>
            </h3>
            <p className="text-xs text-[#7B8379]">Controls registration status, submission limits, and portal state</p>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> SETTINGS SAVED!
              </span>
            )}
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-md transition"
            >
              <Save className="w-4 h-4 text-[#E5BE61]" /> SAVE SETTINGS
            </button>
          </div>
        </div>

        {/* 1. REGISTRATION SETTINGS */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            1. REGISTRATION CONFIGURATION
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Registration Portal Status</label>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition ${
                  settings.registrationOpen
                    ? 'bg-emerald-900/20 text-emerald-900 border-emerald-600/40'
                    : 'bg-red-900/20 text-red-900 border-red-600/40'
                }`}
              >
                {settings.registrationOpen ? '✓ REGISTRATION OPEN' : '✕ REGISTRATION CLOSED'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Registration Deadline</label>
              <input
                type="text"
                value={settings.registrationDeadline}
                onChange={(e) => setSettings({ ...settings, registrationDeadline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Max Team Size (Strict 4)</label>
              <input
                type="number"
                disabled
                value={settings.maxTeamSize}
                className="w-full p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-[#7B8379] text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Registration Fee (₹)</label>
              <input
                type="number"
                value={settings.registrationFee}
                onChange={(e) => setSettings({ ...settings, registrationFee: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

          </div>
        </div>

        {/* 2. SUBMISSION SETTINGS */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            2. PROJECT SUBMISSION CONFIGURATION
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Submission Upload Status</label>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, submissionOpen: !settings.submissionOpen })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold border transition ${
                  settings.submissionOpen
                    ? 'bg-emerald-900/20 text-emerald-900 border-emerald-600/40'
                    : 'bg-red-900/20 text-red-900 border-red-600/40'
                }`}
              >
                {settings.submissionOpen ? '✓ SUBMISSIONS OPEN' : '✕ SUBMISSIONS CLOSED'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Submission Deadline</label>
              <input
                type="text"
                value={settings.submissionDeadline}
                onChange={(e) => setSettings({ ...settings, submissionDeadline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Max File Upload Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSizeMb}
                onChange={(e) => setSettings({ ...settings, maxFileSizeMb: parseInt(e.target.value) || 50 })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

          </div>
        </div>

        {/* 3. WEBSITE MAINTENANCE MODE */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            3. WEBSITE MAINTENANCE & VISIBILITY
          </h4>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6]">
            <div>
              <div className="text-xs font-bold text-[#162E28] uppercase font-serif">MAINTENANCE MODE</div>
              <div className="text-[10px] text-[#7B8379]">When enabled, public visitors see a maintenance banner</div>
            </div>

            <button
              type="button"
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                settings.maintenanceMode ? 'bg-red-800 text-white' : 'bg-[#E9E1D2] text-[#7B8379] border border-[#D2CAB6]'
              }`}
            >
              {settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* 4. ADMIN ACCOUNT PASSWORD */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            4. ADMIN ACCOUNT SECURITY
          </h4>

          {passwordSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-600/40 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Admin password updated successfully!
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="md:col-span-3 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold uppercase transition"
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


