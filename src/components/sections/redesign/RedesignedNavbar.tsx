import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, User, LayoutDashboard, LogIn } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AnnouncementTicker } from '../AnnouncementTicker';

interface RedesignedNavbarProps {
  onRegisterClick?: () => void;
}

export const RedesignedNavbar: React.FC<RedesignedNavbarProps> = ({ onRegisterClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { participant } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomepage = location.pathname === '/' || location.pathname === '/v2' || location.pathname === '/redesign';

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
          ? 'bg-[#162E28]/95 backdrop-blur-md border-b border-[#A77A1C]/30 shadow-2xl'
          : 'bg-[#162E28]/90 backdrop-blur-sm border-b border-[#D2CAB6]/15'
      }`}
    >
      <div className={`max-w-[1500px] mx-auto w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
        
        {/* Brand Logo & Institution Info */}
        <div className="flex items-center gap-3 text-left">
          <Link to="/" className="flex items-center group">
            <img
              src="/pragyan-logo.png"
              alt="PRAGYAN 2K26 Logo"
              className="h-9 sm:h-11 w-auto object-contain p-1 bg-[#F9F4EA] border border-[#A77A1C]/50 rounded-lg shadow-sm group-hover:scale-105 transition-transform"
            />
          </Link>
          <div className="flex flex-col">
            <a
              href="https://sanjivani.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-bold text-xs sm:text-sm text-[#F9F4EA] uppercase tracking-wider leading-none hover:text-[#E5BE61] transition-colors"
            >
              SANJIVANI UNIVERSITY
            </a>
            <Link to="/" className="font-mono text-[10px] text-[#E5BE61] font-extrabold tracking-widest uppercase hover:underline">
              PRAGYAN 2K26 • BBA HACKATHON
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-xs xl:text-sm font-sans font-medium text-[#F3EDE0] hover:text-[#E5BE61] hover:bg-[#2B3E35]/60 transition-all border border-transparent hover:border-[#A77A1C]/20"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {participant ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1.5 transition border ${
                  location.pathname === '/dashboard'
                    ? 'bg-[#A77A1C] text-[#F9F4EA] border-[#E5BE61]'
                    : 'bg-[#2B3E35] hover:bg-[#344B41] text-[#F9F4EA] border-[#D2CAB6]/30'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#E5BE61]" />
                <span>DASHBOARD</span>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1.5 transition border ${
                  location.pathname === '/profile'
                    ? 'bg-[#A77A1C] text-[#F9F4EA] border-[#E5BE61]'
                    : 'bg-[#2B3E35] hover:bg-[#344B41] text-[#F9F4EA] border-[#D2CAB6]/30'
                }`}
              >
                <User className="w-4 h-4 text-[#E5BE61]" />
                <span>PROFILE</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#F9F4EA] bg-[#2B3E35] hover:bg-[#344B41] border border-[#D2CAB6]/30 flex items-center gap-1.5 transition shadow-sm"
              >
                <LogIn className="w-4 h-4 text-[#E5BE61]" />
                <span>LOGIN</span>
              </button>

              <button
                onClick={handleRegisterCta}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase text-[#F9F4EA] bg-[#A77A1C] hover:bg-[#8F6716] border border-[#E5BE61]/60 flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-4 h-4 text-[#F9F4EA]" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/30 hover:bg-[#344B41] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#E5BE61]" /> : <Menu className="w-6 h-6 text-[#E5BE61]" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#162E28] border-b border-[#A77A1C]/30 p-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-lg bg-[#2B3E35]/60 border border-[#D2CAB6]/20 text-[#F9F4EA] font-sans font-medium text-xs hover:bg-[#2B3E35] hover:text-[#E5BE61]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#D2CAB6]/20 flex flex-col gap-2">
            {participant ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#A77A1C] text-[#F9F4EA] font-mono font-extrabold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#E5BE61]" />
                  <span>MY DASHBOARD</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#2B3E35] text-[#F9F4EA] font-mono font-extrabold text-xs uppercase flex items-center justify-center gap-2 border border-[#D2CAB6]/30"
                >
                  <User className="w-4 h-4 text-[#E5BE61]" />
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
                  className="w-full py-3 rounded-xl bg-[#2B3E35] text-[#F9F4EA] font-mono font-extrabold text-xs uppercase flex items-center justify-center gap-2 border border-[#D2CAB6]/30"
                >
                  <LogIn className="w-4 h-4 text-[#E5BE61]" />
                  <span>LOGIN</span>
                </button>
                <button
                  onClick={() => {
                    handleRegisterCta();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-[#A77A1C] text-[#F9F4EA] font-mono font-black text-xs uppercase flex items-center justify-center gap-2 border border-[#E5BE61]/60"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Announcement Marquee Ticker */}
      <AnnouncementTicker />
    </header>
  );
};
