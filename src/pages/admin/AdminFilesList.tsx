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
import { triggerFileDownload } from '../../utils/downloadHelper';

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
    if (window.confirm(`Are you sure you want to delete file "${filename}"?`)) {
      apiService.deleteFile(fileId);
      setFiles(apiService.getFiles());
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('video') || fileType.includes('mp4')) {
      return <Video className="w-4 h-4 text-[#A77A1C]" />;
    }
    if (fileType.includes('presentation') || fileType.includes('ppt')) {
      return <FileText className="w-4 h-4 text-[#A77A1C]" />;
    }
    return <FileText className="w-4 h-4 text-[#A77A1C]" />;
  };

  return (
    <AdminLayout
      title="FILE MANAGEMENT"
      subtitle="Dedicated storage manager for hackathon pitch decks, PDFs, DOCX, and video artifacts"
    >
      
      {/* STORAGE OVERVIEW & FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Files Stat */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#7B8379] uppercase tracking-wider">FILES STORED</div>
            <div className="font-serif font-bold text-2xl text-[#162E28]">{files.length} Files</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>

        {/* Search */}
        <div className="md:col-span-2 bg-[#E9E1D2] border border-[#D2CAB6] p-4 rounded-3xl shadow-sm flex items-center">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search file name, team ID, or team name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C] transition"
            />
          </div>
        </div>

        {/* Filter */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-4 rounded-3xl shadow-sm flex items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
          >
            <option value="ALL">All File Types</option>
            <option value="PDF">PDF Documents</option>
            <option value="PPT">PowerPoint Decks</option>
            <option value="MP4">MP4 Video Demos</option>
          </select>
        </div>

      </div>

      {/* FILES DATA TABLE */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 font-bold">File Name</th>
                <th className="py-3.5 px-4 font-bold">Team</th>
                <th className="py-3.5 px-4 font-bold">File Type</th>
                <th className="py-3.5 px-4 font-bold">File Size</th>
                <th className="py-3.5 px-4 font-bold">Upload Date</th>
                <th className="py-3.5 px-4 font-bold">Storage ID</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7B8379] font-mono">
                    No binary files stored yet.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-[#F9F4EA]/60 transition">
                    
                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-[#162E28] flex items-center gap-2">
                      {getFileIcon(file.fileType)}
                      <span className="truncate max-w-[240px] font-mono text-xs">{file.filename}</span>
                    </td>

                    {/* Team */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#162E28] font-serif">{file.teamName}</div>
                      <div className="text-[10px] font-mono text-[#A77A1C] font-bold">{file.teamId}</div>
                    </td>

                    {/* File Type */}
                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px] truncate max-w-[150px]">
                      {file.fileType}
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 font-mono text-[#162E28] font-bold">
                      {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px]">
                      {new Date(file.uploadDate).toLocaleDateString()}
                    </td>

                    {/* Storage ID */}
                    <td className="py-3.5 px-4 font-mono text-[10px] text-[#7B8379]">
                      file_{file.id}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => triggerFileDownload(file)}
                          className="p-1.5 rounded-lg bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/30 hover:bg-[#2B3E35] transition"
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id, file.filename)}
                          className="p-1.5 rounded-lg bg-red-900/20 text-red-900 border border-red-600/30 hover:bg-red-900/30 transition"
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


