import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../config/firebase';

export const AdminLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { loginAdmin, admin, participant } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect to admin dashboard
  useEffect(() => {
    if (admin || (participant && participant.role === 'ADMIN')) {
      navigate('/admin/dashboard');
    }
  }, [admin, participant, navigate]);

  const handleGoogleAdminLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const gUser = await signInWithGoogle();
      if (!gUser || !gUser.email) {
        throw new Error('Google authentication cancelled or returned no email.');
      }

      // Check with backend /api/auth/admin/google
      const payload = {
        email: gUser.email,
        name: gUser.name,
        avatar: gUser.avatar,
        googleId: gUser.uid,
        uid: gUser.uid
      };

      let res = await fetch('/api/auth/admin/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/auth/admin/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
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

      // Handle unauthorized or backend responses
      if (res.status === 403 || res.status === 401) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || `Access Denied: Google account (${gUser.email}) does not have administrative privileges.`);
        return;
      }

      // Fallback offline verification if server is unreachable
      const cleanEmail = gUser.email.toLowerCase();
      const localAllowedAdmins = ['admin@sanjivani.edu.in'];
      if (localAllowedAdmins.includes(cleanEmail)) {
        loginAdmin(gUser.email, 'offline-admin-token', gUser.name || 'PRAGYAN Super Admin');
        navigate('/admin/dashboard');
      } else {
        setError(`Access Denied: Google account (${gUser.email}) is not registered as an authorized administrator.`);
      }
    } catch (err: any) {
      console.error('Admin Google login error:', err);
      setError(err?.message || 'Failed to authenticate with Google. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-11 w-auto object-contain mix-blend-multiply" />
          </Link>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9E1D2] border border-[#A77A1C]/40 text-[#A77A1C] font-mono text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" />
              <span>ADMINISTRATIVE PORTAL</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
              PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span>
            </h1>
            <p className="text-xs text-[#7B8379]">
              Authorized <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#A77A1C] font-semibold">Sanjivani University</a> Administrators Only
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-8 rounded-3xl shadow-xl space-y-6 text-left relative">
          
          <div className="space-y-2">
            <h2 className="font-serif font-extrabold text-lg text-[#162E28] uppercase">
              Administrator Access
            </h2>
            <p className="text-xs text-[#7B8379] leading-relaxed">
              Administrative access is strictly managed via Google Single Sign-On. Only approved institutional accounts are granted access to the management console.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Direct Admin Login Button */}
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={loading}
            className="w-full py-4 px-5 rounded-2xl border-2 border-[#A77A1C]/60 bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] font-mono font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#E5BE61]" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
            )}
            <span>SIGN IN WITH GOOGLE (ADMIN)</span>
          </button>

          <div className="pt-2 text-center border-t border-[#D2CAB6]/60">
            <Link to="/" className="text-xs text-[#7B8379] hover:text-[#162E28] font-mono font-bold transition">
              ← Return to Main Website
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
