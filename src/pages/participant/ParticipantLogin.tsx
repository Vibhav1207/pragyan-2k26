import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  Loader2, 
  Globe,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { 
  signInWithGoogle, 
  signInWithGoogleRedirect, 
  checkRedirectResult 
} from '../../config/firebase';

export const ParticipantLogin: React.FC = () => {
  const { loginParticipantGoogle, participant } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
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
      loginParticipantGoogle(googleUser);
      navigate('/register');
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRedirectAuth = async () => {
    setRedirectLoading(true);
    setError(null);
    setUnauthorizedDomain(false);
    try {
      await signInWithGoogleRedirect();
    } catch (err: any) {
      handleAuthError(err);
      setRedirectLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-8 text-center">
        
        {/* Logo Branding */}
        <div className="space-y-3">
          <Link to="/" className="inline-block p-3.5 bg-white rounded-2xl shadow-md border border-slate-200 hover:scale-105 transition">
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-10 w-auto object-contain" />
          </Link>
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>GOOGLE AUTHENTICATION</span>
            </div>
            <h1 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight">
              JOIN PRAGYAN 2K26
            </h1>
            <p className="text-xs text-slate-500">
              Sign in with your Google account to proceed to Team Registration
            </p>
          </div>
        </div>

        {/* Google Authentication Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-left">
          
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="text-xs font-mono font-bold text-blue-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AUTHENTICATION STATUS
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                Domain: {currentDomain || 'localhost'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Verified student Google authentication for PRAGYAN 2K26 participants.
            </p>
          </div>

          {/* Unauthorized Domain Specific Warning Banner */}
          {unauthorizedDomain && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-3">
              <div className="flex items-start gap-2.5 font-bold text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-space">Domain Not Authorized</div>
                  <div className="text-[11px] text-amber-700 font-normal mt-0.5">
                    Authentication requests blocked from <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold text-amber-900">{currentDomain}</code>.
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200 text-[11px] text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600" /> How to authorize domain (1 min):
                </div>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px]">
                  <li>Go to <strong>Authentication Console</strong> → <strong>Settings</strong></li>
                  <li>Click <strong>Authorized domains</strong> tab</li>
                  <li>Click <strong>Add Domain</strong> and add <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-bold">{currentDomain}</code></li>
                </ol>
              </div>
            </div>
          )}

          {error && !unauthorizedDomain && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary Google Auth Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGooglePopupAuth}
              disabled={loading || redirectLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-md shadow-blue-600/20 transition-all group disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>SIGNING IN WITH GOOGLE...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>CONTINUE WITH GOOGLE (POPUP)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              onClick={handleGoogleRedirectAuth}
              disabled={loading || redirectLoading}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-space font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-300 transition-all disabled:opacity-50"
            >
              {redirectLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>REDIRECTING TO GOOGLE...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 text-slate-600" />
                  <span>CONTINUE WITH GOOGLE (REDIRECT MODE)</span>
                </>
              )}
            </button>
          </div>

          {/* Cancel & Return Link */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-[#0B192C] font-bold transition">
              ← Cancel & Return to PRAGYAN 2K26 Website
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};


