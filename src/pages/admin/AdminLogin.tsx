import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@sanjivani.edu.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === 'admin@sanjivani.edu.in' && password === 'admin123') {
        loginAdmin(email, 'mock-jwt-admin-token-2026', 'PRAGYAN Super Admin');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use admin@sanjivani.edu.in / admin123');
      }
      setLoading(false);
    }, 600);
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
              Authorized Sanjivani University Hackathon Administrators Only
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

            {/* Login Credentials Helper Box */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-slate-700 font-mono space-y-1">
              <div className="font-bold flex items-center gap-1 text-blue-700">
                <KeyRound className="w-3.5 h-3.5" /> DEFAULT DEMO CREDENTIALS:
              </div>
              <div>Email: <span className="text-[#0B192C] font-bold">admin@sanjivani.edu.in</span></div>
              <div>Password: <span className="text-[#0B192C] font-bold">admin123</span></div>
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

