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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2CAB6] pb-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#A77A1C]" />
            <span>LIVE CMS MANAGEMENT</span>
          </h3>
          <p className="text-xs text-[#7B8379]">Content updates save and immediately update the public landing page</p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> SAVED SUCCESSFULLY!
            </span>
          )}

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#E9E1D2] text-[#162E28] hover:bg-[#F3EDE0] text-xs font-mono font-bold flex items-center gap-1.5 transition border border-[#D2CAB6]"
          >
            <Eye className="w-4 h-4 text-[#A77A1C]" /> PREVIEW CHANGES
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-md transition"
          >
            <Save className="w-4 h-4 text-[#E5BE61]" /> SAVE CHANGES
          </button>
        </div>
      </div>

      {/* CMS EDITABLE SECTIONS */}
      <div className="space-y-8 text-left">
        
        {/* 1. HERO SECTION */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            1. HERO SECTION
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Event Title</label>
              <input
                type="text"
                value={cms.hero.eventTitle}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, eventTitle: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Main Heading</label>
              <input
                type="text"
                value={cms.hero.mainHeading}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, mainHeading: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Theme & Sub-Heading</label>
              <input
                type="text"
                value={cms.hero.subHeading}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, subHeading: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Dates Display Text</label>
              <input
                type="text"
                value={cms.hero.datesText}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, datesText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Venue Location Text</label>
              <input
                type="text"
                value={cms.hero.venueText}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, venueText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>
          </div>
        </div>

        {/* 2. EVENT DETAILS SECTION */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            2. EVENT KEY PARAMETERS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Team Size Rule</label>
              <input
                type="text"
                value={cms.eventDetails.teamSizeText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, teamSizeText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Registration Fee</label>
              <input
                type="text"
                value={cms.eventDetails.feeText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, feeText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Registration Dates</label>
              <input
                type="text"
                value={cms.eventDetails.regDatesText}
                onChange={(e) => setCms({ ...cms, eventDetails: { ...cms.eventDetails, regDatesText: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>
          </div>
        </div>

        {/* 3. PRIZES SECTION */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            3. PRIZE POOL & REWARDS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Total Cash Prize Pool</label>
              <input
                type="text"
                value={cms.prizes.totalPool}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, totalPool: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">1st Place Winner Prize</label>
              <input
                type="text"
                value={cms.prizes.firstPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, firstPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">2nd Place Runner-Up</label>
              <input
                type="text"
                value={cms.prizes.secondPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, secondPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">3rd Place 2nd Runner-Up</label>
              <input
                type="text"
                value={cms.prizes.thirdPrize}
                onChange={(e) => setCms({ ...cms, prizes: { ...cms.prizes, thirdPrize: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>
          </div>
        </div>

        {/* 4. CONTACT INFORMATION */}
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-lg text-[#162E28] uppercase border-b border-[#D2CAB6]/60 pb-2">
            4. CONTACT & HOST ADDRESS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Contact Email</label>
              <input
                type="email"
                value={cms.contact.email}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, email: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Phone Helplines</label>
              <input
                type="text"
                value={cms.contact.phone}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, phone: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Campus Location Address</label>
              <input
                type="text"
                value={cms.contact.location}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, location: e.target.value } })}
                className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:outline-none focus:border-[#A77A1C] transition"
              />
            </div>
          </div>
        </div>

      </div>

      {/* LIVE PREVIEW MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-8 max-w-2xl w-full space-y-6 text-left shadow-2xl text-[#162E28]">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <div className="font-serif font-bold text-lg text-[#162E28] uppercase">
                LIVE PUBLIC LANDING PAGE PREVIEW
              </div>
              <button onClick={() => setPreviewOpen(false)} className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs">✕ CLOSE</button>
            </div>

            <div className="space-y-4 p-6 bg-[#162E28] text-[#F9F4EA] rounded-2xl border border-[#A77A1C]/40 shadow-inner">
              <div className="text-xs font-mono text-[#E5BE61] font-bold uppercase tracking-wider">{cms.hero.eventTitle}</div>
              <h2 className="font-serif font-bold text-3xl text-[#F9F4EA]">{cms.hero.mainHeading}</h2>
              <p className="text-xs text-[#F3EDE0]/80 leading-relaxed font-sans">{cms.hero.subHeading}</p>
              <div className="text-xs font-mono text-[#E5BE61] font-bold">{cms.hero.datesText} | {cms.hero.venueText}</div>
              <div className="pt-2 font-serif font-bold text-[#E5BE61] text-lg">Total Prize Pool: {cms.prizes.totalPool}</div>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};


