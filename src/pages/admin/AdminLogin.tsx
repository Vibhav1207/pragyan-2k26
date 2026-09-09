import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../config/firebase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { loginAdmin, loginParticipantGoogle, admin, participant } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect to admin dashboard
  useEffect(() => {
    if (admin || (participant && participant.role === 'ADMIN')) {
      navigate('/admin/dashboard');
    }
  }, [admin, participant, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === 'admin@sanjivani.edu.in' && password === 'admin123') {
        loginAdmin(email, 'mock-jwt-admin-token-2026', 'PRAGYAN Super Admin');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use admin@sanjivani.edu.in / admin123 or Continue with Google if authorized in MongoDB.');
      }
      setLoading(false);
    }, 600);
  };

  const handleGoogleAdminLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const gUser = await signInWithGoogle();
      if (gUser) {
        await loginParticipantGoogle(gUser);
        // Check updated participant / admin role from MongoDB
        const storedPart = localStorage.getItem('pragyan_participant_user');
        const parsed = storedPart ? JSON.parse(storedPart) : null;
        if (parsed && parsed.role === 'ADMIN') {
          loginAdmin(parsed.email, 'google-admin-token', parsed.name);
          navigate('/admin/dashboard');
        } else {
          setError(`Access Denied: No Admin Access.`);
        }
      }
    } catch (err: any) {
      console.error('Admin Google login error:', err);
      setError(err?.message || 'Failed to authenticate with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block p-3 bg-white rounded-2xl shadow-md border border-slate-200 hover:scale-105 transition">
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>ADMINISTRATION AUTHENTICATION</span>
            </div>
            <h1 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0B192C] uppercase tracking-tight">
              PRAGYAN 2K26 ADMIN PORTAL
            </h1>
            <p className="text-xs text-slate-500">
              Authorized <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#1D4ED8] font-medium">Sanjivani University</a> Hackathon Administrators Only
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl space-y-6 text-left relative">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Admin Login */}
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#0B192C] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>CONTINUE WITH GOOGLE (ADMIN)</span>
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">OR WITH CREDENTIALS</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sanjivani.edu.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotOpen(true);
                    setForgotSent(false);
                  }}
                  className="text-[11px] text-blue-600 hover:underline font-mono font-bold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>LOGIN TO ADMIN DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-[#0B192C] font-bold transition">
              ← Return to PRAGYAN 2K26 Public Website
            </Link>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full space-y-4 text-left shadow-2xl text-[#0B192C]">
            <div className="flex items-center gap-2 text-[#0B192C] font-space font-bold text-lg uppercase">
              <KeyRound className="w-5 h-5 text-blue-600" />
              <span>RESET ADMIN PASSWORD</span>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Password Reset Email Sent!
                </div>
                <p className="text-slate-600">
                  Instructions to reset password sent to <span className="font-bold text-[#0B192C]">{forgotEmail}</span>.
                </p>
                <button
                  onClick={() => setForgotOpen(false)}
                  className="w-full mt-2 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Enter your admin email address to receive password reset link.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@sanjivani.edu.in"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-600/20"
                  >
                    SEND RESET LINK
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

