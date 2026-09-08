import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Send, 
  Calendar 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Announcement, AnnouncementStatus } from '../../types/admin';

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => apiService.getAnnouncements());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'PUBLISHED' as AnnouncementStatus,
    publishDate: new Date().toISOString().slice(0, 16),
    author: 'PRAGYAN Admin Committee'
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete announcement "${title}"?`)) {
      apiService.deleteAnnouncement(id);
      setAnnouncements(apiService.getAnnouncements());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.createAnnouncement(formData);
    setAnnouncements(apiService.getAnnouncements());
    setIsModalOpen(false);
    setFormData({
      title: '',
      content: '',
      status: 'PUBLISHED',
      publishDate: new Date().toISOString().slice(0, 16),
      author: 'PRAGYAN Admin Committee'
    });
  };

  return (
    <AdminLayout
      title="ANNOUNCEMENT MANAGEMENT"
      subtitle="Broadcast notifications, deadline updates & schedule alerts to participants and public visitors"
    >
      
      {/* HEADER ACTION */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-blue-600" />
            <span>GLOBAL BROADCASTS</span>
          </h3>
          <p className="text-xs text-slate-500">Published announcements render on the public site and participant dashboard</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition"
        >
          <Plus className="w-4 h-4" /> CREATE ANNOUNCEMENT
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="space-y-4 text-left">
        {announcements.length === 0 ? (
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center text-slate-400 font-mono text-xs">
            No announcements created yet. Click Create Announcement to broadcast to participants.
          </div>
        ) : (
          announcements.map((ann) => (
            <div key={ann.id} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 relative shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {ann.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    ann.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    ann.status === 'SCHEDULED' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {ann.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(ann.publishDate).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(ann.id, ann.title)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-space font-bold text-lg text-[#0B192C]">{ann.title}</h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{ann.content}</p>
              </div>

              <div className="text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2">
                Author: <strong className="text-slate-700">{ann.author}</strong>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl text-[#0B192C]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C]">NEW ANNOUNCEMENT</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 font-mono hover:text-[#0B192C]">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 🚀 Mentorship Room Links Updated"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Announcement Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter full notification body..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  >
                    <option value="PUBLISHED">Published Immediately</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase">Publish Date</label>
                  <input
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Send className="w-3.5 h-3.5" /> PUBLISH ANNOUNCEMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

