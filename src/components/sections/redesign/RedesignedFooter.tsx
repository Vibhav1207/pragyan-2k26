import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { EVENT_DATA } from '../../../data/event';
import { InstagramIcon } from '../../ui/SocialIcons';
import { ScrollReveal } from '../../transitions/ScrollReveal';

export const RedesignedContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                GET IN TOUCH
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#162E28] uppercase tracking-tight">
                CONTACT <span className="italic font-normal text-[#A77A1C]">ORGANIZERS</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
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
              className="p-8 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-4 hover:border-[#A77A1C] hover:shadow-lg transition-all duration-300 group block h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] flex items-center justify-center font-bold group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                  OFFICIAL EMAIL
                </span>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#162E28] lowercase break-all">
                  {EVENT_DATA.email}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#A77A1C] font-mono font-bold pt-2">
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
              className="p-8 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-4 hover:border-[#A77A1C] hover:shadow-lg transition-all duration-300 group block h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] flex items-center justify-center font-bold group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                  INSTAGRAM HANDLE
                </span>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#162E28]">
                  {EVENT_DATA.instagram}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#A77A1C] font-mono font-bold pt-2">
                <span>Follow official updates</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </ScrollReveal>

          {/* Venue Card */}
          <ScrollReveal delay={320}>
            <div className="p-8 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-4 h-full">
              <div className="w-12 h-12 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                  EVENT VENUE
                </span>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#162E28] uppercase">
                  SANJIVANI UNIVERSITY
                </h3>
              </div>
              <p className="text-xs text-[#7B8379] font-sans leading-relaxed">
                Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};

export const RedesignedFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#162E28] text-[#F9F4EA] pt-16 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-[#A77A1C]/40 text-left">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#D2CAB6]/20">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/pragyan-logo.png"
                alt="PRAGYAN 2K26 Logo"
                className="h-10 w-auto object-contain bg-[#F9F4EA] px-2.5 py-1 rounded-lg shadow-sm border border-[#A77A1C]/50"
              />
              <div>
                <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="font-serif font-extrabold text-lg text-[#F9F4EA] uppercase block leading-none hover:text-[#E5BE61] transition-colors">
                  SANJIVANI UNIVERSITY
                </a>
                <span className="font-mono text-xs text-[#E5BE61] font-bold">
                  PRAGYAN 2K26 • BBA HACKATHON
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs font-bold text-[#E5BE61] uppercase tracking-wider">
                NATIONAL LEVEL HACKATHON
              </div>
              <p className="text-xs text-[#F3EDE0]/80 font-sans max-w-md leading-relaxed">
                Theme: Innovation & Entrepreneurship on SDG Goal 2030. 24-Hour Innovation Sprint for India's brightest commerce & management minds hosted at <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#E5BE61] hover:underline font-semibold">Sanjivani University, Kopargaon</a>.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-3">
              <div className="font-bold text-[#E5BE61] uppercase tracking-wider">NAVIGATION</div>
              <ul className="space-y-2 text-[#F3EDE0]/80">
                <li><a href="#home" className="hover:text-[#E5BE61] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#E5BE61] transition-colors">About</a></li>
                <li><a href="#tracks" className="hover:text-[#E5BE61] transition-colors">Tracks</a></li>
                <li><a href="#timeline" className="hover:text-[#E5BE61] transition-colors">Timeline</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-[#E5BE61] uppercase tracking-wider">RESOURCES</div>
              <ul className="space-y-2 text-[#F3EDE0]/80">
                <li><a href="#registration" className="hover:text-[#E5BE61] transition-colors">Registration</a></li>
                <li><a href="#prizes" className="hover:text-[#E5BE61] transition-colors">Prizes</a></li>
                <li><a href="#organizers" className="hover:text-[#E5BE61] transition-colors">Organizers</a></li>
                <li><a href="#faq" className="hover:text-[#E5BE61] transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-3">
              <div className="font-bold text-[#E5BE61] uppercase tracking-wider">CONTACT</div>
              <div className="text-[#F3EDE0]/80 space-y-1">
                <p className="break-all">{EVENT_DATA.email}</p>
                <p>{EVENT_DATA.instagram}</p>
                <p className="text-[#F3EDE0]/60 pt-1">Kopargaon, Maharashtra</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F3EDE0]/70 gap-4">
          <div>
            © 2026 PRAGYAN 2K26. SANJIVANI UNIVERSITY. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[#E5BE61] font-bold">
            SDG GOAL 2030 // NATIONAL HACKATHON
          </div>
        </div>

      </div>
    </footer>
  );
};
