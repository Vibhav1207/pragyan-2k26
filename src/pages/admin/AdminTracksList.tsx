import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Track } from '../../types/admin';

export const AdminTracksList: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>(() => apiService.getTracks());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Innovation',
    iconName: 'Building2',
    isActive: true,
    order: 1
  });

  const handleOpenCreate = () => {
    setEditingTrack(null);
    setFormData({
      title: '',
      description: '',
      category: 'General',
      iconName: 'Building2',
      isActive: true,
      order: tracks.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tr: Track) => {
    setEditingTrack(tr);
    setFormData({
      title: tr.title,
      description: tr.description,
      category: tr.category,
      iconName: tr.iconName,
      isActive: tr.isActive,
      order: tr.order
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = (tr: Track) => {
    apiService.updateTrack(tr.id, { isActive: !tr.isActive });
    setTracks(apiService.getTracks());
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete track "${title}"? This change will reflect on the registration form.`)) {
      apiService.deleteTrack(id);
      setTracks(apiService.getTracks());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrack) {
      apiService.updateTrack(editingTrack.id, formData);
    } else {
      apiService.createTrack(formData);
    }
    setTracks(apiService.getTracks());
    setIsModalOpen(false);
  };

  return (
    <AdminLayout
      title="TRACK MANAGEMENT"
      subtitle="Configure, enable/disable, reorder, and create hackathon innovation tracks"
    >
      
      {/* HEADER & CREATE ACTION */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase">HACKATHON TRACKS</h3>
          <p className="text-xs text-slate-500">All track updates dynamically sync with the public website & team registration forms</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition"
        >
          <Plus className="w-4 h-4" /> CREATE NEW TRACK
        </button>
      </div>

      {/* TRACKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((tr) => (
          <div
            key={tr.id}
            className={`bg-white border rounded-3xl p-6 space-y-4 relative shadow-sm transition ${
              tr.isActive ? 'border-slate-200' : 'border-slate-200/60 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {tr.id}
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-md font-bold">
                  Order #{tr.order}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(tr)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    tr.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {tr.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase">{tr.title}</h4>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">{tr.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-mono">
              <span className="text-slate-500">Category: <strong className="text-[#0B192C]">{tr.category}</strong></span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(tr)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center gap-1 font-bold"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(tr.id, tr.title)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* CREATE / EDIT TRACK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl text-[#0B192C]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C]">
                {editingTrack ? 'EDIT TRACK' : 'CREATE NEW TRACK'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 font-mono hover:text-[#0B192C]">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Track Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI & SUSTAINABILITY"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter track problem domain summary..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="text-xs font-mono text-[#0B192C] font-bold">Enable / Active Track</label>
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
                  className="px-5 py-2 rounded-xl bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase shadow-md shadow-blue-600/20"
                >
                  SAVE TRACK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

