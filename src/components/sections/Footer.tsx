import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';
import { InstagramIcon } from '../ui/SocialIcons';
import { ScrollReveal } from '../transitions/ScrollReveal';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="space-y-2">
              <div className="inline-block bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-md">
                GET IN TOUCH
              </div>
              <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-tight">
                CONTACT ORGANIZERS
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-widest">
              SANJIVANI UNIVERSITY SECRETARIAT
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Card */}
          <ScrollReveal delay={120}>
            <a
              href={`mailto:${EVENT_DATA.email}`}
              className="card-premium p-8 rounded-2xl border border-slate-200 space-y-4 hover:border-[#1D4ED8] transition-all duration-300 group block h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                  OFFICIAL EMAIL
                </span>
                <h3 className="font-space font-extrabold text-lg sm:text-xl text-[#0B192C] lowercase break-all">
                  {EVENT_DATA.email}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1D4ED8] font-mono font-bold pt-2">
                <span>Click to email organizers</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </ScrollReveal>

          {/* Instagram Card */}
          <ScrollReveal delay={220}>
            <a
              href={EVENT_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium p-8 rounded-2xl border border-slate-200 space-y-4 hover:border-[#1D4ED8] transition-all duration-300 group block h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                  INSTAGRAM HANDLE
                </span>
                <h3 className="font-space font-extrabold text-lg sm:text-xl text-[#0B192C]">
                  {EVENT_DATA.instagram}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1D4ED8] font-mono font-bold pt-2">
                <span>Follow official updates</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </ScrollReveal>

          {/* Venue Card */}
          <ScrollReveal delay={320}>
            <div className="card-premium p-8 rounded-2xl border border-slate-200 space-y-4 h-full">
              <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                  EVENT VENUE
                </span>
                <h3 className="font-space font-extrabold text-lg sm:text-xl text-[#0B192C] uppercase">
                  SANJIVANI UNIVERSITY
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B192C] text-white pt-16 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-white/10 text-left">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/pragyan-logo.png"
                alt="PRAGYAN 2K26 Logo"
                className="h-10 w-auto object-contain bg-white/95 px-2 py-0.5 rounded-lg shadow-md"
              />
              <div>
                <span className="font-space font-extrabold text-lg text-white uppercase block leading-none">
                  SANJIVANI UNIVERSITY
                </span>
                <span className="font-mono text-xs text-[#FACC15] font-bold">
                  PRAGYAN 2K26
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs font-bold text-[#FACC15] uppercase tracking-wider">
                NATIONAL LEVEL HACKATHON
              </div>
              <p className="text-xs text-slate-300 font-sans max-w-md leading-relaxed">
                Theme: Innovation & Entrepreneurship on SDG Goal 2030. 24-Hour Innovation Sprint for India's brightest commerce & management minds hosted at Sanjivani University, Kopargaon.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-3">
              <div className="font-bold text-[#FACC15] uppercase tracking-wider">NAVIGATION</div>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#tracks" className="hover:text-white transition-colors">Tracks</a></li>
                <li><a href="#timeline" className="hover:text-white transition-colors">Timeline</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-[#FACC15] uppercase tracking-wider">RESOURCES</div>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#registration" className="hover:text-white transition-colors">Registration</a></li>
                <li><a href="#prizes" className="hover:text-white transition-colors">Prizes</a></li>
                <li><a href="#organizers" className="hover:text-white transition-colors">Organizers</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-3">
              <div className="font-bold text-[#FACC15] uppercase tracking-wider">CONTACT</div>
              <div className="text-slate-300 space-y-1">
                <p className="break-all">{EVENT_DATA.email}</p>
                <p>{EVENT_DATA.instagram}</p>
                <p className="text-slate-400 pt-1">Kopargaon, Maharashtra</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div>
            © 2026 PRAGYAN 2K26. SANJIVANI UNIVERSITY. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[#FACC15] font-bold">
            SDG GOAL 2030 // NATIONAL HACKATHON
          </div>
        </div>

      </div>
    </footer>
  );
};
