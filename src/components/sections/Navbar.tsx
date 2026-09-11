import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, User, LayoutDashboard, LogIn } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AnnouncementTicker } from './AnnouncementTicker';

interface NavbarProps {
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { participant } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: isHomepage ? '#home' : '/#home' },
    { name: 'About', href: isHomepage ? '#about' : '/#about' },
    { name: 'Tracks', href: isHomepage ? '#tracks' : '/#tracks' },
    { name: 'Timeline', href: isHomepage ? '#timeline' : '/#timeline' },
    { name: 'Prizes', href: isHomepage ? '#prizes' : '/#prizes' },
    { name: 'Registration', href: isHomepage ? '#registration' : '/#registration' },
    { name: 'FAQ', href: isHomepage ? '#faq' : '/#faq' },
    { name: 'Contact', href: isHomepage ? '#contact' : '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterCta = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else if (participant) {
      if (participant.teamId) {
        navigate('/dashboard');
      } else {
        navigate('/register');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomepage
          ? 'bg-[#0B192C]/95 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-[#0B192C]/90 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className={`max-w-[1500px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
        
        <div className="flex items-center gap-3 text-left">
          <Link to="/" className="flex items-center group">
            <img
              src="/pragyan-logo.png"
              alt="PRAGYAN 2K26 Logo"
              className="h-9 sm:h-11 w-auto object-contain p-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
          </Link>
          <div className="flex flex-col">
            <a
              href="https://sanjivani.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space font-extrabold text-xs sm:text-sm text-white uppercase tracking-tight leading-none hover:text-[#FACC15] transition-colors"
            >
              SANJIVANI UNIVERSITY
            </a>
            <Link to="/" className="font-mono text-[10px] text-[#FACC15] font-bold tracking-wider uppercase hover:underline">
              PRAGYAN 2K26
            </Link>
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
          {participant ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-space font-extrabold flex items-center gap-1.5 transition border ${
                  location.pathname === '/dashboard'
                    ? 'bg-[#1D4ED8] text-white border-blue-400'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#FACC15]" />
                <span>DASHBOARD</span>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-space font-extrabold flex items-center gap-1.5 transition border ${
                  location.pathname === '/profile'
                    ? 'bg-[#1D4ED8] text-white border-blue-400'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <User className="w-4 h-4 text-[#FACC15]" />
                <span>PROFILE</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-2 rounded-xl text-xs font-space font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 transition"
              >
                <LogIn className="w-4 h-4 text-[#FACC15]" />
                <span>LOGIN</span>
              </button>

              <button
                onClick={handleRegisterCta}
                className="btn-primary-blue text-xs uppercase"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
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
            {participant ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#1D4ED8] text-white font-space font-extrabold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#FACC15]" />
                  <span>MY DASHBOARD</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-space font-extrabold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#FACC15]" />
                  <span>MY PROFILE</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-space font-extrabold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#FACC15]" />
                  <span>LOGIN</span>
                </button>
                <button
                  onClick={() => {
                    handleRegisterCta();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary-blue w-full justify-center text-xs"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* LIVE ANNOUNCEMENT MARQUEE TICKER (RIGHT BELOW NAVBAR) */}
      <AnnouncementTicker />
    </header>
  );
};

