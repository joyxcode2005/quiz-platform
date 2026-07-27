import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: { pathname?: string };
}

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const FlipCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div className="flex gap-[2px] sm:gap-[3px] md:gap-1.5 mb-1 md:mb-2">
      {value.split('').map((ch, i) => (
        <span key={i} className="relative w-5 h-7 sm:w-8 sm:h-10 md:w-10 md:h-14 lg:w-12 lg:h-16 flex items-center justify-center font-data font-black text-sm sm:text-lg md:text-2xl lg:text-3xl text-white bg-[#1A1A1A]/80 border border-white/20 rounded md:rounded-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />
          <span className="relative z-10">{ch}</span>
        </span>
      ))}
    </div>
    <p className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-data">{label}</p>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle } = useAuth();
  const from = (location.state as LocationState)?.from?.pathname || '/home';

  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate(from, { replace: true });
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setGoogleLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetSent(true);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-[#141414] relative overflow-hidden">

      {/* ================= FIXED STATIC BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10 mix-blend-screen" style={{ backgroundImage: NOISE_TEXTURE }} />
        <div className="absolute -top-32 -left-32 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#FF7A1A]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full bg-[#1F1F1F]" />
        <div className="absolute top-[30%] -right-10 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-[#FFC800] opacity-80" />
        <div className="absolute bottom-[10%] -left-10 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full bg-[#FF4D1C] opacity-70" />
      </div>

      {/* ---------------- BRAND PANEL (Left / Top) ---------------- */}
      {/* Changed md:justify-between to justify-center with scaled gaps so it doesn't stretch awkwardly on tall desktop monitors */}
      <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col justify-center p-6 sm:p-12 lg:p-20 relative z-10 shrink-0 gap-5 sm:gap-8 md:gap-12 lg:gap-16">
        <div className="flex items-start">
          <div className="font-data font-black text-xs md:text-sm lg:text-base px-3 py-1 md:px-5 md:py-2 w-fit bg-white/10 border border-white/20 backdrop-blur-md rounded-lg text-white tracking-widest shadow-lg">
            QA
          </div>
        </div>

        <div className="space-y-1 md:space-y-4 lg:space-y-6">
          <h1 className="font-black text-4xl sm:text-6xl md:text-[4.5rem] lg:text-[6rem] text-white leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
            Play.<br />
            Read.<br />
            Climb.
          </h1>
          <p className="font-bold text-white/60 max-w-sm lg:max-w-md text-[10px] sm:text-sm md:text-base lg:text-lg leading-tight md:leading-relaxed">
            Sign in to enter this week&apos;s league, catch up on your read schedule, and see
            where you rank.
          </p>
        </div>

        <div className="flex gap-6 sm:gap-8 md:gap-12">
          <FlipCounter value="120+" label="Players" />
          <FlipCounter value="08" label="Leagues" />
        </div>
      </div>

      {/* ---------------- FORM PANEL (Right / Bottom Glass) ---------------- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative z-10 bg-[#141414]/60 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-y-auto">
        
        {/* Scaled max-width from max-w-sm to max-w-md/lg on desktop so the form breathes better */}
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-5 md:space-y-8 lg:space-y-10 z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Reset Password'}
            </h2>
            <p className="font-bold text-white/50 text-xs sm:text-sm md:text-base mt-1 md:mt-2">
              {mode === 'login'
                ? 'Sign in to your Quiz Arena account'
                : "We'll email you a reset link"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 md:p-4 lg:p-5 rounded-xl flex items-start gap-3 text-xs sm:text-sm md:text-base font-bold text-red-400 relative">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'reset' && resetSent ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-8 space-y-4 md:space-y-6 text-center">
              <p className="font-bold text-xs sm:text-sm md:text-base text-white">
                Check <span className="text-[#FF7A1A]">{email}</span> for a reset link.
              </p>
              <button
                onClick={() => { setMode('login'); setResetSent(false); }}
                className="font-data text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white underline transition-colors"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              {mode === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                    className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 sm:py-3.5 md:py-4 lg:py-5 rounded-xl md:rounded-2xl font-bold uppercase tracking-wide text-xs sm:text-sm md:text-base cursor-pointer transition-colors disabled:opacity-50 shadow-lg"
                  >
                    {googleLoading ? (
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3 my-2 sm:my-4 md:my-6">
                    <div className="flex-1 border-t border-dashed border-white/20" />
                    <span className="font-data text-[8px] sm:text-[10px] md:text-xs font-black uppercase text-white/40">OR</span>
                    <div className="flex-1 border-t border-dashed border-white/20" />
                  </div>
                </>
              )}

              <form onSubmit={mode === 'login' ? handleLogin : handleReset} className="space-y-3 sm:space-y-5 md:space-y-6">
                <div>
                  <label className="text-[9px] sm:text-[10px] md:text-xs font-black font-data uppercase tracking-widest text-white/50 mb-1.5 sm:mb-2 md:mb-3 block pl-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl pl-10 md:pl-14 pr-4 py-2.5 sm:py-3.5 md:py-4 lg:py-5 font-bold text-xs sm:text-sm md:text-base outline-none text-white placeholder:text-white/30 focus:border-[#FF7A1A] focus:bg-white/10 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3 pl-1 pr-1">
                      <label className="text-[9px] sm:text-[10px] md:text-xs font-black font-data uppercase tracking-widest text-white/50">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('reset')}
                        className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/50 hover:text-white hover:underline transition-colors"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl pl-10 md:pl-14 pr-10 md:pr-14 py-2.5 sm:py-3.5 md:py-4 lg:py-5 font-bold text-xs sm:text-sm md:text-base outline-none text-white placeholder:text-white/30 focus:border-[#FF7A1A] focus:bg-white/10 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading || googleLoading} 
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 md:py-5 mt-2 sm:mt-4 md:mt-6 rounded-xl md:rounded-2xl font-black uppercase text-xs sm:text-sm md:text-base tracking-wide bg-[#FF7A1A] hover:bg-[#FF7A1A]/90 text-[#141414] transition-colors shadow-[0_0_20px_rgba(255,122,26,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Send Reset Link'}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </>
                  )}
                </button>

                {mode === 'reset' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center font-data text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mt-3 sm:mt-4 md:mt-6 transition-colors"
                  >
                    Back to Login
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;