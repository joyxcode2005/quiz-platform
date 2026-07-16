import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

interface LocationState {
  from?: { pathname?: string };
}

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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--bone)]">

      {/* ---------------- BRAND PANEL (desktop only) ---------------- */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[var(--ink)] text-white flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        <div className="glow-signal w-96 h-96 -top-24 -left-24" />
        <div className="glow-signal w-72 h-72 -bottom-16 -right-16" />

        <div className="relative z-10 stamp text-white font-data font-black text-sm px-4 py-1.5 bg-[var(--ink)] w-fit">
          QA
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-black uppercase leading-[0.95]">
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

        <div className="relative z-10 flex gap-8 font-data">
          <div>
            <p className="text-2xl font-black">120+</p>
            <p className="text-xs uppercase tracking-widest text-white/50">Players</p>
          </div>
          <div>
            <p className="text-2xl font-black">08</p>
            <p className="text-xs uppercase tracking-widest text-white/50">Leagues</p>
          </div>
        </div>
      </div>

      {/* ---------------- FORM PANEL ---------------- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="hazard-stripe absolute top-0 left-0 w-full md:hidden" />

        <div className="w-full max-w-sm space-y-8">
          <div className="md:hidden">
            <div className="stamp text-[var(--ink)] font-data font-black text-sm px-3 py-1.5 bg-white w-fit">
              QA
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black uppercase">
              {mode === 'login' ? 'Welcome Back' : 'Reset Password'}
            </h2>
            <p className="font-bold text-black/50 text-sm mt-1">
              {mode === 'login'
                ? 'Sign in to your Quiz Arena account'
                : "We'll email you a reset link"}
            </p>
          </div>

          {error && (
            <div className="brutal-border bg-white p-3 flex items-start gap-2 text-sm font-bold text-[var(--signal)]">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'reset' && resetSent ? (
            <div className="brutal-border brutal-shadow-sm bg-white p-4 space-y-3">
              <p className="font-bold text-sm">
                Check <span className="text-[var(--signal)]">{email}</span> for a reset link.
              </p>
              <button
                onClick={() => {
                  setMode('login');
                  setResetSent(false);
                }}
                className="font-data text-xs font-bold uppercase tracking-widest underline"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {mode === 'login' && (
                <>
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                    fullWidth
                    variant="outline"
                    className="gap-2 bg-white text-black border-black"
                  >
                    {googleLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 my-2">
                    <div className="h-[2px] bg-black/20 flex-1" />
                    <span className="font-data text-xs font-black uppercase text-black/40">OR</span>
                    <div className="h-[2px] bg-black/20 flex-1" />
                  </div>
                </>
              )}

              <form onSubmit={mode === 'login' ? handleLogin : handleReset} className="space-y-4">
                <div>
                  <label className="text-xs font-black font-data uppercase tracking-widest text-black/50 mb-1.5 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full brutal-border bg-white pl-10 pr-4 py-3 font-bold text-sm outline-none focus:shadow-[3px_3px_0_0_var(--signal)] transition-shadow"
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-black font-data uppercase tracking-widest text-black/50">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('reset')}
                        className="text-xs font-bold text-[var(--signal)] hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full brutal-border bg-white pl-10 pr-11 py-3 font-bold text-sm outline-none focus:shadow-[3px_3px_0_0_var(--signal)] transition-shadow"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-[var(--ink)]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                <Button type="submit" disabled={loading || googleLoading} fullWidth className="gap-2">
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Send Reset Link'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>

                {mode === 'reset' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center font-data text-xs font-bold uppercase tracking-widest text-black/50 hover:text-[var(--ink)]"
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