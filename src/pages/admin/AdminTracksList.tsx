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
      <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase">HACKATHON TRACKS</h3>
          <p className="text-xs text-[#7B8379]">All track updates dynamically sync with the public website & team registration forms</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4 text-[#E5BE61]" /> CREATE NEW TRACK
        </button>
      </div>

      {/* TRACKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((tr) => (
          <div
            key={tr.id}
            className={`bg-[#E9E1D2] border rounded-3xl p-6 space-y-4 relative shadow-sm transition ${
              tr.isActive ? 'border-[#D2CAB6]' : 'border-[#D2CAB6]/60 opacity-60 bg-[#F3EDE0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#E5BE61] bg-[#162E28] px-2.5 py-1 rounded-full border border-[#A77A1C]/40">
                  {tr.id}
                </span>
                <span className="font-mono text-[10px] text-[#7B8379] uppercase bg-[#F9F4EA] px-2 py-0.5 rounded-md font-bold border border-[#D2CAB6]">
                  Order #{tr.order}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(tr)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    tr.isActive ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/30' : 'bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6]'
                  }`}
                >
                  {tr.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase">{tr.title}</h4>
              <p className="text-xs text-[#7B8379] font-sans leading-relaxed">{tr.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-[#D2CAB6]/60 pt-4 text-xs font-mono">
              <span className="text-[#7B8379]">Category: <strong className="text-[#162E28]">{tr.category}</strong></span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(tr)}
                  className="px-3 py-1.5 rounded-lg bg-[#F9F4EA] text-[#162E28] border border-[#D2CAB6] hover:bg-[#F3EDE0] transition flex items-center gap-1 font-bold"
                >
                  <Edit className="w-3.5 h-3.5 text-[#A77A1C]" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(tr.id, tr.title)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-900/20 text-red-900 border border-red-600/30 hover:bg-red-900/30 transition"
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
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl text-[#162E28]">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <h3 className="font-serif font-bold text-lg uppercase text-[#162E28]">
                {editingTrack ? 'EDIT TRACK' : 'CREATE NEW TRACK'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs">✕ CLOSE</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Track Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI & SUSTAINABILITY"
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter track problem domain summary..."
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
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
                <label htmlFor="isActive" className="text-xs font-mono text-[#162E28] font-bold">Enable / Active Track</label>
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
                  className="px-5 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold uppercase shadow-md"
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


