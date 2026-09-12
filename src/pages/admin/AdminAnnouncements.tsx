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
      <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#A77A1C]" />
            <span>GLOBAL BROADCASTS</span>
          </h3>
          <p className="text-xs text-[#7B8379]">Published announcements render on the public site and participant dashboard</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4 text-[#E5BE61]" /> CREATE ANNOUNCEMENT
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="space-y-4 text-left">
        {announcements.length === 0 ? (
          <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-8 rounded-3xl text-center text-[#7B8379] font-mono text-xs">
            No announcements created yet. Click Create Announcement to broadcast to participants.
          </div>
        ) : (
          announcements.map((ann) => (
            <div key={ann.id} className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-3 relative shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#E5BE61] bg-[#162E28] px-2.5 py-0.5 rounded-full border border-[#A77A1C]/40">
                    {ann.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    ann.status === 'PUBLISHED' ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/30' :
                    ann.status === 'SCHEDULED' ? 'bg-amber-900/20 text-[#A77A1C] border border-[#A77A1C]/30' :
                    'bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6]'
                  }`}>
                    {ann.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#7B8379]">
                  <Calendar className="w-3.5 h-3.5 text-[#A77A1C]" />
                  <span>{new Date(ann.publishDate).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(ann.id, ann.title)}
                    className="p-1.5 rounded-lg bg-red-900/20 text-red-900 border border-red-600/30 hover:bg-red-900/30 transition ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-[#162E28]">{ann.title}</h4>
                <p className="text-xs text-[#7B8379] font-sans leading-relaxed">{ann.content}</p>
              </div>

              <div className="text-[10px] font-mono text-[#7B8379] border-t border-[#D2CAB6]/60 pt-2">
                Author: <strong className="text-[#162E28]">{ann.author}</strong>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl text-[#162E28]">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <h3 className="font-serif font-bold text-lg uppercase text-[#162E28]">NEW ANNOUNCEMENT</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs">✕ CLOSE</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 🚀 Mentorship Room Links Updated"
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Announcement Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter full notification body..."
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
                  >
                    <option value="PUBLISHED">Published Immediately</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Publish Date</label>
                  <input
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D2CAB6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6] hover:bg-[#F3EDE0] text-xs font-bold font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#E5BE61]" /> PUBLISH ANNOUNCEMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};


