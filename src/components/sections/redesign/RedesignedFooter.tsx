import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { EVENT_DATA } from '../../../data/event';
import { InstagramIcon } from '../../ui/SocialIcons';
import { ScrollReveal } from '../../transitions/ScrollReveal';

export const RedesignedContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

        {/* Developer Credit Section */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-blue-500/30 bg-[#070A10] shadow-[0_0_40px_rgba(37,99,235,0.2)] overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute inset-0 z-0">
            <img
              src="/dev-banner.jpg"
              alt="Anime Cyberpunk Artwork"
              className="w-full h-full object-cover object-right sm:object-center opacity-40 md:opacity-60 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A10] via-[#070A10]/85 md:via-[#070A10]/70 to-transparent z-1" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A10]/90 via-transparent to-[#070A10]/60 z-1" />
          </div>

          <div className="absolute top-3 right-4 sm:top-4 sm:right-6 z-10 hidden sm:flex items-center gap-2">
            <span className="text-white/40 font-mono text-[11px] tracking-widest uppercase">進み続ける</span>
          </div>

          <div className="relative z-10 p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5 text-left">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0C121D] border border-blue-500/40 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                <span className="font-mono font-black text-lg sm:text-xl tracking-tighter select-none">&lt;/&gt;</span>
              </div>

              <div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-blue-300/70 uppercase font-semibold">
                  PLATFORM ARCHITECTURE &amp; ENGINEERING
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="font-normal text-white/90">Developed By</span>
                  <a
                    href="https://vibhavpatel.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1 font-extrabold hover:underline drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  >
                    Vibhav Patel
                    <ExternalLink className="w-4 h-4 inline" />
                  </a>
                </div>

                <div className="w-12 h-0.5 bg-blue-500/40 rounded-full my-1.5" />

                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                  BUILD / LEARN / COMPETE / REPEAT
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2.5 w-full lg:w-auto">
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <a
                  href="mailto:vibhav07patel@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-blue-500/30 text-xs font-mono text-white/90 hover:border-[#38BDF8] hover:text-white transition-all shadow-md group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                  <span>vibhav07patel@gmail.com</span>
                </a>

                <a
                  href="https://vibhavpatel.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white font-mono font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(59,130,246,0.65)] transition-all group"
                >
                  <span>View Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="flex items-center gap-2 self-start lg:self-end text-[9px] font-mono tracking-widest text-blue-400/60 uppercase">
                <span className="w-10 h-px bg-blue-500/30 inline-block" />
                <span>JUJUTSU KAISEN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F3EDE0]/70 gap-4 pt-4 border-t border-[#D2CAB6]/10">
          <div>
            © 2026 PRAGYAN 2K26. SANJIVANI UNIVERSITY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[#E5BE61] font-bold">SDG GOAL 2030 // NATIONAL HACKATHON</span>
            <span className="text-[#F3EDE0]/40 hidden sm:inline">•</span>
            <span>Developed by <a href="https://vibhavpatel.site" target="_blank" rel="noopener noreferrer" className="text-[#E5BE61] hover:underline font-bold">Vibhav Patel</a></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
