import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  Download, 
  Trash2, 
  Search, 
  HardDrive 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminFilesList: React.FC = () => {
  const [files, setFiles] = useState(() => apiService.getFiles());
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredFiles = files.filter(f => {
    const matchesSearch = 
      f.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.teamId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || f.fileType.includes(typeFilter.toLowerCase());

    return matchesSearch && matchesType;
  });

  const handleDelete = (fileId: string, filename: string) => {
    if (window.confirm(`Are you sure you want to delete file "${filename}" from GridFS storage?`)) {
      apiService.deleteFile(fileId);
      setFiles(apiService.getFiles());
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('video') || fileType.includes('mp4')) {
      return <Video className="w-4 h-4 text-purple-600" />;
    }
    if (fileType.includes('presentation') || fileType.includes('ppt')) {
      return <FileText className="w-4 h-4 text-amber-600" />;
    }
    return <FileText className="w-4 h-4 text-blue-600" />;
  };

  return (
    <AdminLayout
      title="FILE MANAGEMENT (MONGODB GRIDFS)"
      subtitle="Dedicated storage manager for hackathon pitch decks, PDFs, DOCX, and video artifacts stored in GridFS"
    >
      
      {/* STORAGE OVERVIEW & FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Files Stat */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">GRIDFS FILES STORED</div>
            <div className="font-space font-extrabold text-2xl text-[#0B192C]">{files.length} Files</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>

        {/* Search */}
        <div className="md:col-span-2 bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex items-center">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search file name, team ID, or team name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
          >
            <option value="ALL">All File Types</option>
            <option value="PDF">PDF Documents</option>
            <option value="PPT">PowerPoint Decks</option>
            <option value="MP4">MP4 Video Demos</option>
          </select>
        </div>

      </div>

      {/* FILES DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase">
                <th className="py-3.5 px-4 font-bold">File Name</th>
                <th className="py-3.5 px-4 font-bold">Team</th>
                <th className="py-3.5 px-4 font-bold">File Type</th>
                <th className="py-3.5 px-4 font-bold">File Size</th>
                <th className="py-3.5 px-4 font-bold">Upload Date</th>
                <th className="py-3.5 px-4 font-bold">Storage ID</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono">
                    No GridFS binary files stored yet.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50 transition">
                    
                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-[#0B192C] flex items-center gap-2">
                      {getFileIcon(file.fileType)}
                      <span className="truncate max-w-[240px] font-mono text-xs">{file.filename}</span>
                    </td>

                    {/* Team */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B192C]">{file.teamName}</div>
                      <div className="text-[10px] font-mono text-blue-600 font-bold">{file.teamId}</div>
                    </td>

                    {/* File Type */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] truncate max-w-[150px]">
                      {file.fileType}
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">
                      {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </td>

                    {/* Storage ID */}
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                      gridfs_{file.id}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert(`Downloading GridFS object: ${file.filename}`)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id, file.filename)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
};

