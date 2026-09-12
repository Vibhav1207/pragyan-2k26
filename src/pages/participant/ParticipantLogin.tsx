import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  AlertTriangle,
  Loader2, 
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  signInWithGoogle, 
  checkRedirectResult 
} from '../../config/firebase';

import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';

export const ParticipantLogin: React.FC = () => {
  const { loginParticipantGoogle, participant } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<boolean>(false);
  const [currentDomain, setCurrentDomain] = useState<string>('');

  // If already authenticated, redirect straight to register or dashboard
  useEffect(() => {
    if (participant) {
      if (participant.teamId) {
        navigate('/dashboard');
      } else {
        navigate('/register');
      }
    }
  }, [participant, navigate]);

  // Check if returning from Google OAuth Redirect flow
  useEffect(() => {
    const domain = window.location.hostname;
    setCurrentDomain(domain);

    const verifyRedirect = async () => {
      try {
        setLoading(true);
        const user = await checkRedirectResult();
        if (user) {
          loginParticipantGoogle(user);
          navigate('/register');
        }
      } catch (err: any) {
        console.error('Redirect result error:', err);
        handleAuthError(err);
      } finally {
        setLoading(false);
      }
    };
    verifyRedirect();
  }, []);

  const handleAuthError = (err: any) => {
    const code = err?.code || '';
    const msg = err?.message || '';
    console.error('Firebase Auth Error details:', code, msg);

    if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
      setUnauthorizedDomain(true);
      setError(`Domain "${window.location.hostname}" is not authorized for Google Sign-In.`);
    } else if (code === 'auth/popup-blocked' || code === 'auth/cancelled-popup-request') {
      setError('Popup was blocked by your browser. Please try "Continue with Google (Redirect)" below.');
    } else if (code === 'auth/popup-closed-by-user') {
      setError('Sign-in popup was closed before completing. Please try again.');
    } else {
      setError(err?.message || 'Google Sign-In failed. Please check your setup.');
    }
  };

  const handleGooglePopupAuth = async () => {
    setLoading(true);
    setError(null);
    setUnauthorizedDomain(false);
    try {
      const googleUser = await signInWithGoogle();
      await loginParticipantGoogle(googleUser);
      
      const saved = localStorage.getItem('pragyan_participant_user');
      const updatedUser = saved ? JSON.parse(saved) : null;
      if (updatedUser && updatedUser.teamId) {
        navigate('/dashboard');
      } else {
        navigate('/register');
      }
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#162E28] selection:text-[#E5BE61] pt-32 pb-16">
      <RedesignedNavbar />
      
      {/* Background Watermark Visuals */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] font-serif font-black text-[18rem] text-[#162E28] select-none leading-none">
        BBA
      </div>

      <div className="w-full max-w-lg relative z-10 space-y-8 text-center">
        
        {/* Logo Branding */}
        <div className="space-y-3">
          <Link to="/" className="inline-block p-3.5 bg-[#F9F4EA] rounded-2xl shadow-sm border border-[#A77A1C]/40 hover:scale-105 transition">
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-12 w-auto object-contain" />
          </Link>
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9E1D2] border border-[#A77A1C]/40 text-[#A77A1C] font-mono text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" />
              <span>AUTHENTICATION PORTAL</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#162E28] uppercase tracking-tight">
              JOIN PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span>
            </h1>
            <p className="text-xs text-[#7B8379] font-sans">
              Sign in with your Google account to proceed to Team Registration
            </p>
          </div>
        </div>

        {/* Google Authentication Card */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-9 rounded-3xl shadow-xl space-y-6 text-center">
          
          {/* Unauthorized Domain Warning */}
          {unauthorizedDomain && (
            <div className="p-4 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C] text-[#162E28] text-xs space-y-3 text-left shadow-sm">
              <div className="flex items-start gap-2.5 font-bold text-[#162E28]">
                <AlertTriangle className="w-5 h-5 text-[#A77A1C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-serif font-bold">Domain Not Authorized</div>
                  <div className="text-[11px] text-[#7B8379] font-normal mt-0.5">
                    Authentication requests blocked from <code className="bg-[#F9F4EA] px-1 py-0.5 rounded font-mono font-bold text-[#162E28] border border-[#D2CAB6]">{currentDomain}</code>.
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F4EA] p-3 rounded-xl border border-[#D2CAB6] text-[11px] text-[#050C0C] space-y-1.5">
                <div className="font-bold text-[#162E28] flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#A77A1C]" /> How to authorize domain (1 min):
                </div>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-[#7B8379]">
                  <li>Go to <strong>Authentication Console</strong> → <strong>Settings</strong></li>
                  <li>Click <strong>Authorized domains</strong> tab</li>
                  <li>Click <strong>Add Domain</strong> and add <code className="bg-[#E9E1D2] px-1 py-0.5 rounded text-[#162E28] font-bold">{currentDomain}</code></li>
                </ol>
              </div>
            </div>
          )}

          {error && !unauthorizedDomain && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            onClick={handleGooglePopupAuth}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#E5BE61]" />
                <span>SIGNING IN WITH GOOGLE...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0 bg-[#F9F4EA] rounded-full p-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
                <ArrowRight className="w-4 h-4 text-[#E5BE61] group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Return Link */}
          <div className="pt-3 border-t border-[#D2CAB6] text-center">
            <Link to="/" className="text-xs text-[#7B8379] hover:text-[#162E28] font-mono font-bold transition inline-block">
              ← Return to PRAGYAN 2K26 Website
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
