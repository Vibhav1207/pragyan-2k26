import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AnnouncementTicker } from './AnnouncementTicker';

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { participant, admin } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Registration', href: '#registration' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = (admin && admin.role === 'ADMIN') || (participant && participant.role === 'ADMIN');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B192C]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#0B192C]/90 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        <div className="flex items-center gap-3 text-left">
          <a href="#home" className="flex items-center group">
            <img
              src="/pragyan-logo.png"
              alt="PRAGYAN 2K26 Logo"
              className="h-9 sm:h-11 w-auto object-contain p-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
          </a>
          <div className="flex flex-col">
            <a
              href="https://sanjivani.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space font-extrabold text-xs sm:text-sm text-white uppercase tracking-tight leading-none hover:text-[#FACC15] transition-colors"
            >
              SANJIVANI UNIVERSITY
            </a>
            <a href="#home" className="font-mono text-[10px] text-[#FACC15] font-bold tracking-wider uppercase hover:underline">
              PRAGYAN 2K26
            </a>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-space font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors nav-link-indicator"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-white/10 border border-slate-700/60 transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>ADMIN</span>
            </Link>
          )}

          {participant ? (
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-space font-extrabold text-xs uppercase flex items-center gap-2 shadow-lg shadow-blue-600/30 transition border border-blue-400/40"
            >
              <User className="w-4 h-4 text-[#FACC15]" />
              <span>MY PROFILE</span>
            </button>
          ) : (
            <button
              onClick={onRegisterClick}
              className="btn-primary-blue text-xs uppercase"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0B192C] border-b border-white/10 p-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-white/5 text-slate-200 font-space font-medium text-xs hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#FACC15]" /> ADMIN PORTAL
              </Link>
            )}

            {participant ? (
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#1D4ED8] text-white font-space font-extrabold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <User className="w-4 h-4 text-[#FACC15]" />
                <span>MY PROFILE</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onRegisterClick();
                  setMobileMenuOpen(false);
                }}
                className="btn-primary-blue w-full justify-center text-xs"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* LIVE ANNOUNCEMENT MARQUEE TICKER (RIGHT BELOW NAVBAR) */}
      <AnnouncementTicker />
    </header>
  );
};

