import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface LocationState {
  from?: { pathname?: string };
}

const FlipCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div className="flex gap-[3px] mb-1.5">
      {value.split('').map((ch, i) => (
        <span key={i} className="flip-tile w-6 h-8 md:w-7 md:h-9 flex items-center justify-center font-data font-black text-base md:text-lg text-[var(--bone)]">
          {ch}
        </span>
      ))}
    </div>
    <p className="text-xs uppercase tracking-widest text-white/50 font-data">{label}</p>
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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--neu-bg)]">

      {/* ---------------- BRAND PANEL (Physical Felt Board) ---------------- */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 felt-banner text-white flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        <div className="poster-orb w-96 h-96 -top-24 -left-24 opacity-50" />
        <div className="poster-orb w-72 h-72 -bottom-16 -right-16 opacity-30 bg-[var(--neu-blue)]" />

        <div className="punch-row punch-row-top absolute top-0 left-0 right-0 opacity-80 z-20 transform rotate-90 origin-top-right translate-x-[100%]" />

        <div className="relative z-10 flex items-start gap-2">
          <div className="woven-tag text-[var(--ink)] font-data font-black text-sm px-4 py-1.5 w-fit shadow-md">
            QA
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="poster-type text-5xl lg:text-7xl text-[var(--bone)]">
            Play.
            <br />
            Read.
            <br />
            Climb.
          </h1>
          <p className="font-bold text-white/60 max-w-sm">
            Sign in to enter this week&apos;s league, catch up on your read schedule, and see
            where you rank.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          <FlipCounter value="120+" label="Players" />
          <FlipCounter value="08" label="Leagues" />
        </div>
      </div>

      {/* ---------------- FORM PANEL (Neumorphic) ---------------- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative grain">
        
        <div className="w-full max-w-sm space-y-8 z-10">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="woven-tag text-[var(--ink)] font-data font-black text-sm px-3 py-1.5 w-fit shadow-sm">
              QA
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase text-[var(--ink)]">
              {mode === 'login' ? 'Welcome Back' : 'Reset Password'}
            </h2>
            <p className="font-bold text-[var(--ink)]/50 text-sm mt-1">
              {mode === 'login'
                ? 'Sign in to your Quiz Arena account'
                : "We'll email you a reset link"}
            </p>
          </div>

          {error && (
            <div className="neu-panel bg-white p-4 flex items-start gap-3 text-sm font-bold text-[var(--neu-coral)] relative">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'reset' && resetSent ? (
            <div className="neu-panel bg-white p-6 space-y-4 text-center">
              <p className="font-bold text-sm text-[var(--ink)]">
                Check <span className="text-[var(--neu-blue)]">{email}</span> for a reset link.
              </p>
              <button
                onClick={() => { setMode('login'); setResetSent(false); }}
                className="font-data text-xs font-bold uppercase tracking-widest text-[var(--ink)]/50 hover:text-[var(--ink)] underline"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {mode === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                    className="neu-panel w-full flex items-center justify-center gap-3 bg-white text-[var(--ink)] py-3.5 font-bold uppercase tracking-wide text-sm"
                  >
                    {googleLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3 my-4">
                    <div className="stitch-line flex-1 text-[var(--ink)]" />
                    <span className="font-data text-[10px] font-black uppercase text-[var(--ink)]/40">OR</span>
                    <div className="stitch-line flex-1 text-[var(--ink)]" />
                  </div>
                </>
              )}

              <form onSubmit={mode === 'login' ? handleLogin : handleReset} className="space-y-5">
                <div>
                  <label className="text-xs font-black font-data uppercase tracking-widest text-[var(--ink)]/50 mb-2 block pl-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full neu-inset bg-[var(--neu-bg)] pl-12 pr-4 py-3.5 font-bold text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:ring-2 focus:ring-[var(--neu-blue)] transition-all"
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div>
                    <div className="flex items-center justify-between mb-2 pl-2 pr-1">
                      <label className="text-xs font-black font-data uppercase tracking-widest text-[var(--ink)]/50">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('reset')}
                        className="text-xs font-bold text-[var(--neu-coral)] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full neu-inset bg-[var(--neu-bg)] pl-12 pr-12 py-3.5 font-bold text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:ring-2 focus:ring-[var(--neu-blue)] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 hover:text-[var(--ink)]"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading || googleLoading} 
                  className="neu-pill w-full flex items-center justify-center gap-2 py-4 mt-2 font-black uppercase text-sm tracking-wide bg-[var(--neu-blue)] text-white"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Send Reset Link'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {mode === 'reset' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center font-data text-xs font-bold uppercase tracking-widest text-[var(--ink)]/50 hover:text-[var(--ink)] mt-4"
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