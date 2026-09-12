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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#162E28]/85 backdrop-blur-md overflow-y-auto animate-modal-backdrop">
      <div className="relative w-full max-w-4xl bg-[#E9E1D2] rounded-3xl border border-[#A77A1C]/40 shadow-2xl my-8 p-6 sm:p-10 text-left space-y-6 animate-modal-card">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F9F4EA] text-[#7B8379] hover:bg-[#162E28] hover:text-[#E5BE61] transition-colors border border-[#D2CAB6]"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#D2CAB6] pb-4 space-y-1 pr-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E5BE61] uppercase tracking-wider bg-[#162E28] px-3.5 py-1 rounded-full border border-[#A77A1C]/40">
            <Users className="w-4 h-4 text-[#E5BE61]" />
            <span>DELEGATE TEAM REGISTRATION</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#162E28] uppercase tracking-tight">
            PRAGYAN 2K26 REGISTRATION
          </h2>
          <p className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
            SANJIVANI UNIVERSITY // {EVENT_DATA.teamSize}
          </p>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="py-12 text-center space-y-6 bg-[#F9F4EA] rounded-2xl p-8 border border-[#D2CAB6]">
            <div className="w-16 h-16 bg-[#162E28] rounded-full flex items-center justify-center mx-auto text-[#E5BE61] shadow-lg border border-[#A77A1C]/40">
              <CheckCircle2 className="w-10 h-10 text-[#E5BE61]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-3xl text-[#162E28] uppercase">
                REGISTRATION SUBMITTED!
              </h3>
              <p className="font-mono text-sm font-bold text-[#A77A1C] uppercase tracking-wider">
                TEAM "{formData.teamName || 'PRAGYAN TEAM'}" REGISTERED
              </p>
              <p className="text-sm font-sans text-[#7B8379] max-w-xl mx-auto leading-relaxed">
                Confirmation details and Phase 1 submission instructions have been sent to your team leader email ({formData.leaderEmail || 'team leader'}).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] max-w-md mx-auto font-mono text-xs font-bold text-[#162E28] uppercase space-y-1">
              <div>FIRST ROUND FEE: ₹500 (PER TEAM)</div>
              <div className="text-[#A77A1C]">{EVENT_DATA.secondRoundFeeNotice}</div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold uppercase transition shadow-md"
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
              <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                01. TEAM DETAILS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    required
                    placeholder="e.g. Innovators Kopargaon"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    name="teamLeaderName"
                    required
                    placeholder="Full Name of Team Leader"
                    value={formData.teamLeaderName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>
              </div>
            </div>

            {/* 2. MEMBER DETAILS & CONTACTS */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                02. MEMBER DETAILS & CONTACTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Leader Email *
                  </label>
                  <input
                    type="email"
                    name="leaderEmail"
                    required
                    placeholder="leader@gmail.com"
                    value={formData.leaderEmail}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Leader Phone *
                  </label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.leaderPhone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Member 2 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member2Name"
                    required
                    placeholder="Member 2 Name & Email"
                    value={formData.member2Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Member 3 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member3Name"
                    required
                    placeholder="Member 3 Name & Email"
                    value={formData.member3Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Member 4 Name & Email *
                  </label>
                  <input
                    type="text"
                    name="member4Name"
                    required
                    placeholder="Member 4 Name & Email"
                    value={formData.member4Name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>
              </div>
            </div>

            {/* 3. COLLEGE DETAILS */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                03. ACADEMIC DETAILS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    College / University *
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    required
                    placeholder="Institution Name"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Course Level *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  >
                    <option value="UG">UG (Undergraduate)</option>
                    <option value="PG">PG (Postgraduate)</option>
                    <option value="PhD">PhD (Research)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                    Year of Study *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-sans text-sm text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
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
              <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                04. HACKATHON TRACK SELECTION
              </div>
              <select
                name="trackId"
                value={formData.trackId}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] font-serif font-bold text-sm text-[#162E28] uppercase focus:outline-none focus:border-[#A77A1C]"
              >
                {HACKATHON_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.number} — {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. PAYMENT NOTICE */}
            <div className="p-4 rounded-2xl bg-[#162E28] border border-[#A77A1C]/40 flex items-center gap-3 text-[#F9F4EA]">
              <CreditCard className="w-6 h-6 text-[#E5BE61] shrink-0" />
              <div className="font-mono text-xs font-bold space-y-0.5">
                <div className="text-[#E5BE61]">FIRST ROUND FEE: ₹500 (PER TEAM)</div>
                <div className="text-[#F3EDE0]/80 font-medium">{EVENT_DATA.secondRoundFeeNotice}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6] hover:bg-[#F3EDE0] font-mono text-xs font-bold uppercase transition"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold uppercase transition shadow-md"
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

