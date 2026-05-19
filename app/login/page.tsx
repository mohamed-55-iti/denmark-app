'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

type Tab = 'login' | 'register' | 'forgot';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);

  const supabase = createClient();

  // Detect OTP-expired error from URL params (e.g. after clicking expired email link)
  useEffect(() => {
    const errorCode =
      searchParams.get('error_code') ??
      new URLSearchParams(window.location.hash.replace('#', '?')).get('error_code');

    if (errorCode === 'otp_expired') {
      setOtpExpired(true);
      setError('Your confirmation link has expired. Enter your email below and resend a new one.');
      // Clean up the URL without a full reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);

  const handleEmailAuth = async () => {
    setError('');
    setSuccess('');
    setOtpExpired(false);
    setLoading(true);

    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/admin');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setSuccess('Account created! Check your email to confirm.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setResending(true);
    setError('');
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      setOtpExpired(false);
      setSuccess('A fresh confirmation email has been sent — check your inbox.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not resend email. Try again.');
    } finally {
      setResending(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) throw error;
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  const handleLinkedIn = async () => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  return (
    <main className="w-full bg-white flex flex-col md:flex-row min-h-screen overflow-hidden mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Left: Visual */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 bg-black overflow-hidden hidden md:flex flex-col justify-end p-16">
        <div className="absolute inset-0 opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="erhvervsmarked Workspace"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJu_PK7BTrKRmKJMHD8Ukmq0YVggM0ISv4reoYTUD29QLP-PcrymXNCylN9G0dF4YUxgdg1rMVOxUzIffLkX1ErMTv621iYfhphNPYj71MNZ-rFbcBHEnCdFc569igIa-s7I4Ekdq6x6WmODUqbOEZsJx7MHHXtdmKPx3wtCQuEFMMkvN5X6QyDGfnoYz54YTb1g2M_eOofSxpP2dRHgAv6-89QOjVTRa6v012m-9SrV1wl_3m-TQBm_r0WdYeONTQkw8MU7G70DI"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 space-y-6">
          <Link href="/" className="text-white font-bold text-[20px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            erhvervsmarked
          </Link>
          <blockquote className="space-y-4">
            <p className="text-white text-[32px] leading-tight font-semibold italic" style={{ fontFamily: 'Manrope, sans-serif' }}>
              &ldquo;Transparency is the cornerstone of every successful acquisition. We build the bridge between visionary founders and strategic investors.&rdquo;
            </p>
            <footer className="text-white/70 uppercase tracking-widest text-[12px]">
              Erik Sørensen, Principal Partner
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Right: Form */}
      <section className="w-full md:w-1/2 lg:w-2/5 flex flex-col px-8 py-16 md:px-16 justify-center bg-[#f6f3f5]">

        {/* Mobile logo */}
        <div className="md:hidden mb-10 flex justify-center">
          <Link href="/" className="text-black font-black text-[24px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            erhvervsmarked
          </Link>
        </div>

        <div className="max-w-[400px] mx-auto w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-black font-bold text-[32px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {tab === 'forgot' ? 'Reset password' : 'Welcome back'}
            </h1>
            <p className="text-[#45464d] text-[16px]">
              {tab === 'forgot'
                ? 'Enter your email and we\'ll send you a reset link.'
                : 'Manage your business listings and acquisitions.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-[#eae7e9] rounded-lg">
            {(['login', 'register'] as Tab[]).filter(t => t !== 'forgot').map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccess(''); setOtpExpired(false); }}
                className={`flex-1 py-2 text-[12px] font-semibold uppercase tracking-widest rounded-md transition-all ${
                  tab === t
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#45464d] hover:text-black'
                }`}
              >
                {t === 'login' ? 'Login' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[14px] px-4 py-3 rounded-lg space-y-3">
              <p>{error}</p>
              {otpExpired && (
                <button
                  onClick={handleResendConfirmation}
                  disabled={resending}
                  className="inline-flex items-center gap-2 bg-amber-800 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resending ? 'Sending…' : 'Resend confirmation email'}
                </button>
              )}
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[14px] px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {tab === 'register' && (
              <div className="space-y-1">
                <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#45464d]" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Erik Sørensen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-3 bg-white border-2 border-[#eae7e9] rounded-lg focus:border-black focus:outline-none transition-all text-[16px]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#45464d]" htmlFor="email">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 bg-white border-2 border-[#eae7e9] rounded-lg focus:border-black focus:outline-none transition-all text-[16px]"
              />
            </div>

            {tab !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d]" htmlFor="password">
                  Password
                </label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setTab('forgot'); setError(''); setSuccess(''); }}
                    className="text-[12px] text-[#45464d] hover:text-black transition-colors font-medium"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailAuth()}
                className="w-full px-6 py-3 bg-white border-2 border-[#eae7e9] rounded-lg focus:border-black focus:outline-none transition-all text-[16px]"
              />
            </div>
            )}

            {tab === 'forgot' ? (
              <>
                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-widest py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
                  className="w-full text-center text-[12px] text-[#45464d] hover:text-black font-semibold uppercase tracking-widest transition-colors"
                >
                  ← Back to Login
                </button>
              </>
            ) : (
              <button
                onClick={handleEmailAuth}
                disabled={loading}
                className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-widest py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Please wait...'
                  : tab === 'login'
                  ? 'Login to Dashboard'
                  : 'Create Account'}
              </button>
            )}
          </div>

          {tab !== 'forgot' && (<>
          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#c6c6cd]" />
            <span className="flex-shrink mx-4 text-[11px] font-semibold tracking-widest uppercase text-[#76777d]">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-[#c6c6cd]" />
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 border-2 border-[#eae7e9] hover:border-[#c6c6cd] rounded-lg py-3 transition-all bg-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#1b1b1d]">Google</span>
            </button>
            <button
              onClick={handleLinkedIn}
              className="flex items-center justify-center gap-2 border-2 border-[#eae7e9] hover:border-[#c6c6cd] rounded-lg py-3 transition-all bg-white"
            >
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#1b1b1d]">LinkedIn</span>
            </button>
          </div>

          <p className="text-center text-[14px] text-[#5e6367]">
            By signing in, you agree to our{' '}
            <Link className="text-black font-semibold underline underline-offset-4" href="/terms">Terms</Link>{' '}
            and{' '}
            <Link className="text-black font-semibold underline underline-offset-4" href="/privacy">Privacy Policy</Link>.
          </p>
          </>)}
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}