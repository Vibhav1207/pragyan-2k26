import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Users } from 'lucide-react';
import { HACKATHON_TRACKS } from '../../data/challenges';
import { EVENT_DATA } from '../../data/event';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    collegeName: '',
    course: 'UG',
    year: '3rd Year',
    trackId: HACKATHON_TRACKS[0].id,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/80 backdrop-blur-md overflow-y-auto animate-modal-backdrop">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl my-8 p-6 sm:p-10 text-left space-y-6 animate-modal-card">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-[#1D4ED8] hover:text-white transition-colors"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-200 pb-4 space-y-1 pr-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-[#1D4ED8]/10 px-3 py-1 rounded-full">
            <Users className="w-4 h-4 text-[#1D4ED8]" />
            <span>DELEGATE TEAM REGISTRATION</span>
          </div>
          <h2 className="font-space font-black text-3xl sm:text-4xl text-[#0B192C] uppercase">
            PRAGYAN 2K26 REGISTRATION
          </h2>
          <p className="font-mono text-xs font-bold text-[#D97706] uppercase">
            SANJIVANI UNIVERSITY // {EVENT_DATA.teamSize}
          </p>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="py-12 text-center space-y-6 bg-[#F0F4FA] rounded-xl p-8 border border-slate-200">
            <div className="w-16 h-16 bg-[#1D4ED8] rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-[#FACC15]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-space font-black text-3xl text-[#0B192C] uppercase">
                REGISTRATION SUBMITTED!
              </h3>
              <p className="font-mono text-sm font-bold text-[#1D4ED8] uppercase">
                TEAM "{formData.teamName || 'PRAGYAN TEAM'}" REGISTERED
              </p>
              <p className="text-sm font-sans text-slate-600 max-w-xl mx-auto leading-relaxed">
                Confirmation details and Phase 1 submission instructions have been sent to your team leader email ({formData.leaderEmail || 'team leader'}).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 max-w-md mx-auto font-mono text-xs font-bold text-[#0B192C] uppercase space-y-1">
              <div>FIRST ROUND FEE: ₹500 (PER TEAM)</div>
              <div className="text-[#D97706]">{EVENT_DATA.secondRoundFeeNotice}</div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-primary-blue text-xs uppercase"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. TEAM DETAILS */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                01. TEAM DETAILS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    required
                    placeholder="e.g. Innovators Kopargaon"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    name="teamLeaderName"
                    required
                    placeholder="Full Name of Team Leader"
                    value={formData.teamLeaderName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>
            </div>

            {/* 2. MEMBER DETAILS & CONTACTS */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                02. MEMBER DETAILS & CONTACTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Leader Email *
                  </label>
                  <input
                    type="email"
                    name="leaderEmail"
                    required
                    placeholder="leader@gmail.com"
                    value={formData.leaderEmail}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Leader Phone *
                  </label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.leaderPhone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Member 2 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member2Name"
                    required
                    placeholder="Member 2 Name & Email"
                    value={formData.member2Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Member 3 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member3Name"
                    required
                    placeholder="Member 3 Name & Email"
                    value={formData.member3Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Member 4 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member4Name"
                    required
                    placeholder="Member 4 Name & Email"
                    value={formData.member4Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>
            </div>

            {/* 3. COLLEGE DETAILS */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                03. ACADEMIC DETAILS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    College / University *
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    required
                    placeholder="Institution Name"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Course Level *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="UG">UG (Undergraduate)</option>
                    <option value="PG">PG (Postgraduate)</option>
                    <option value="PhD">PhD (Research)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-semibold text-slate-700 uppercase">
                    Year of Study *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#F0F4FA] border border-slate-300 font-sans text-sm focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Research">Research / PG</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. TRACK SELECTION */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                04. HACKATHON TRACK SELECTION
              </div>
              <select
                name="trackId"
                value={formData.trackId}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-[#F0F4FA] border border-slate-300 font-space font-bold text-sm uppercase focus:outline-none focus:border-[#1D4ED8]"
              >
                {HACKATHON_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.number} — {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. PAYMENT NOTICE */}
            <div className="p-4 rounded-xl bg-[#FACC15]/20 border border-[#FACC15]/50 flex items-center gap-3 text-[#0B192C]">
              <CreditCard className="w-6 h-6 text-[#D97706] shrink-0" />
              <div className="font-mono text-xs font-bold space-y-0.5">
                <div>FIRST ROUND FEE: ₹500 (PER TEAM)</div>
                <div className="text-slate-600 font-medium">{EVENT_DATA.secondRoundFeeNotice}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline-navy text-xs px-6 py-3"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="btn-primary-blue text-xs px-8 py-3 uppercase"
              >
                REGISTER NOW
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
