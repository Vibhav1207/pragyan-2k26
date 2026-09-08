import React, { useState } from 'react';
import { Globe, Save, Eye, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { HomepageCMS } from '../../types/admin';

export const AdminHomepageCMS: React.FC = () => {
  const [cms, setCms] = useState<HomepageCMS>(() => apiService.getCMS());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSave = () => {
    apiService.updateCMS(cms);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AdminLayout
      title="HOMEPAGE CMS EDITOR"
      subtitle="Edit public PRAGYAN 2K26 website copy, hero headers, event details, prize pools & contact info without touching code"
    >
      
      {/* CMS HEADER ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>LIVE CMS MANAGEMENT</span>
          </h3>
          <p className="text-xs text-slate-500">Content updates save to MongoDB and immediately update the public landing page</p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> SAVED TO MONGODB!
            </span>
          )}

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition border border-slate-200"
          >
            <Eye className="w-4 h-4 text-blue-600" /> PREVIEW CHANGES
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-md shadow-blue-600/20 transition"
          >
            <Save className="w-4 h-4" /> SAVE CHANGES
          </button>
        </div>
      </div>

      {/* CMS EDITABLE SECTIONS */}
      <div className="space-y-8 text-left">
        
        {/* 1. HERO SECTION */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            1. HERO SECTION
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Event Title</label>
              <input
                type="text"
                value={cms.hero.eventTitle}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, eventTitle: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Main Heading</label>
              <input
                type="text"
                value={cms.hero.mainHeading}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, mainHeading: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Theme & Sub-Heading</label>
              <input
                type="text"
                value={cms.hero.subHeading}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, subHeading: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Dates Display Text</label>
              <input
                type="text"
                value={cms.hero.datesText}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, datesText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Venue Location Text</label>
              <input
                type="text"
                value={cms.hero.venueText}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, venueText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* 2. EVENT DETAILS SECTION */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            2. EVENT KEY PARAMETERS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Team Size Rule</label>
              <input
                type="text"
                value={cms.eventDetails.teamSizeText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, teamSizeText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Registration Fee</label>
              <input
                type="text"
                value={cms.eventDetails.feeText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, feeText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Registration Dates</label>
              <input
                type="text"
                value={cms.eventDetails.regDatesText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, regDatesText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* 3. PRIZES SECTION */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            3. PRIZE POOL & REWARDS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Total Cash Prize Pool</label>
              <input
                type="text"
                value={cms.prizes.totalPool}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, totalPool: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">1st Place Winner Prize</label>
              <input
                type="text"
                value={cms.prizes.firstPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, firstPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">2nd Place Runner-Up</label>
              <input
                type="text"
                value={cms.prizes.secondPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, secondPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">3rd Place 2nd Runner-Up</label>
              <input
                type="text"
                value={cms.prizes.thirdPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, thirdPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* 4. CONTACT INFORMATION */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-space font-extrabold text-lg text-[#0B192C] uppercase border-b border-slate-100 pb-2">
            4. CONTACT & HOST ADDRESS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Contact Email</label>
              <input
                type="email"
                value={cms.contact.email}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, email: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Phone Helplines</label>
              <input
                type="text"
                value={cms.contact.phone}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, phone: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Campus Location Address</label>
              <input
                type="text"
                value={cms.contact.location}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, location: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

      </div>

      {/* LIVE PREVIEW MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full space-y-6 text-left shadow-2xl text-[#0B192C]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="font-space font-extrabold text-lg text-[#0B192C] uppercase">
                LIVE PUBLIC LANDING PAGE PREVIEW
              </div>
              <button onClick={() => setPreviewOpen(false)} className="text-slate-400 font-mono hover:text-[#0B192C]">✕ CLOSE</button>
            </div>

            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-[#0B192C]">
              <div className="text-xs font-mono text-blue-600 font-bold uppercase">{cms.hero.eventTitle}</div>
              <h2 className="font-space font-extrabold text-3xl">{cms.hero.mainHeading}</h2>
              <p className="text-xs text-slate-600">{cms.hero.subHeading}</p>
              <div className="text-xs font-mono text-amber-700 font-bold">{cms.hero.datesText} | {cms.hero.venueText}</div>
              <div className="pt-2 font-space font-bold text-emerald-700 text-lg">Total Prize Pool: {cms.prizes.totalPool}</div>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

