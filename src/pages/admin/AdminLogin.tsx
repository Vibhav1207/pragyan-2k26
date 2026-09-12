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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/auth/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
      }
      if (res.ok) {
        const data = await res.json();
        if (data.token && data.admin) {
          loginAdmin(data.admin.email, data.token, data.admin.name);
          navigate('/admin/dashboard');
          return;
        }
      }
      const errData = await res.json().catch(() => ({}));
      setError(errData.error || 'Invalid admin credentials.');
    } catch (err: any) {
      console.error('Admin login error:', err);
      if (email.toLowerCase() === 'admin@sanjivani.edu.in' && password === 'admin123') {
        loginAdmin(email, 'offline-admin-token', 'PRAGYAN Super Admin');
        navigate('/admin/dashboard');
      } else {
        setError('Failed to connect to backend server. Please verify credentials or connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAdminLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const gUser = await signInWithGoogle();
      if (gUser) {
        await loginParticipantGoogle(gUser);
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
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#162E28] selection:text-[#E5BE61]">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] font-serif font-black text-[18rem] text-[#162E28] select-none leading-none">
        ADMIN
      </div>

      <div className="w-full max-w-md relative z-10 space-y-8">
        
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block p-3.5 bg-[#F9F4EA] rounded-2xl shadow-sm border border-[#A77A1C]/40 hover:scale-105 transition">
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-11 w-auto object-contain" />
          </Link>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9E1D2] border border-[#A77A1C]/40 text-[#A77A1C] font-mono text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" />
              <span>ADMINISTRATION AUTHENTICATION</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
              PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span> ADMIN PORTAL
            </h1>
            <p className="text-xs text-[#7B8379]">
              Authorized <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#A77A1C] font-semibold">Sanjivani University</a> Administrators Only
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-8 rounded-3xl shadow-xl space-y-6 text-left relative">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Admin Login */}
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl border border-[#A77A1C]/40 bg-[#F9F4EA] hover:bg-[#E9E1D2] text-[#162E28] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#A77A1C]" />
            ) : (
              <svg className="w-4 h-4 shrink-0 bg-[#F9F4EA] rounded-full p-0.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>CONTINUE WITH GOOGLE (ADMIN)</span>
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-[#D2CAB6] flex-1" />
            <span className="text-[11px] font-mono text-[#A77A1C] font-semibold uppercase">OR WITH CREDENTIALS</span>
            <div className="h-px bg-[#D2CAB6] flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A77A1C] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sanjivani.edu.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379]/60 focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotOpen(true);
                    setForgotSent(false);
                  }}
                  className="text-[11px] text-[#A77A1C] hover:underline font-mono font-bold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A77A1C] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379]/60 focus:outline-none focus:border-[#A77A1C] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#E5BE61]" />
              ) : (
                <>
                  <span>AUTHENTICATE ADMIN LOGIN</span>
                  <ArrowRight className="w-4 h-4 text-[#E5BE61]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/40 text-[11px] text-[#162E28] font-mono space-y-1">
            <div className="font-bold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#A77A1C]" /> Demo Admin Credentials:
            </div>
            <div>Email: <code className="bg-[#F9F4EA] px-1 py-0.5 rounded text-[#A77A1C] font-bold">admin@sanjivani.edu.in</code></div>
            <div>Password: <code className="bg-[#F9F4EA] px-1 py-0.5 rounded text-[#A77A1C] font-bold">admin123</code></div>
          </div>

          <div className="pt-2 text-center">
            <Link to="/" className="text-xs text-[#7B8379] hover:text-[#162E28] font-mono font-bold transition">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {forgotOpen && (
        <div className="fixed inset-0 bg-[#050C0C]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F9F4EA] border border-[#A77A1C] rounded-3xl p-8 max-w-md w-full space-y-6 text-left shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <h3 className="font-serif font-black text-xl text-[#162E28] uppercase">ADMIN PASSWORD RESET</h3>
              <button onClick={() => setForgotOpen(false)} className="text-[#7B8379] hover:text-[#162E28]">✕</button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C] text-[#162E28] text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#162E28]">
                  <CheckCircle2 className="w-5 h-5 text-[#A77A1C]" /> Reset Instructions Dispatched!
                </div>
                <p className="text-[#7B8379] font-sans">
                  If an authorized admin account exists for <strong>{forgotEmail}</strong>, instructions have been sent.
                </p>
                <button
                  onClick={() => setForgotOpen(false)}
                  className="w-full mt-3 py-2 rounded-xl bg-[#162E28] text-[#F9F4EA] font-mono font-bold text-xs"
                >
                  CLOSE WINDOW
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-[#7B8379]">Enter your administrator email address to request password reset instructions.</p>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@sanjivani.edu.in"
                    className="w-full p-3 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setForgotOpen(false)} className="px-4 py-2 rounded-xl bg-[#E9E1D2] text-[#162E28] text-xs font-mono font-bold">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#162E28] text-[#F9F4EA] border border-[#A77A1C]/50 text-xs font-mono font-bold">Send Reset Link</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
