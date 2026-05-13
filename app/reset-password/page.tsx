'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ready, setReady] = useState(false);

  const supabase = createClient();

  // The auth/callback route already exchanged the code for a session server-side.
  // So we just check if there's an active session — if yes, the user is ready.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') && session) {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleReset = async () => {
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess('Password updated! Redirecting to login…');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="w-full bg-white flex flex-col md:flex-row min-h-screen overflow-hidden mx-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Left: Visual */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 bg-black overflow-hidden hidden md:flex flex-col justify-end p-16">
        <div className="absolute inset-0 opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Nordic Workspace"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJu_PK7BTrKRmKJMHD8Ukmq0YVggM0ISv4reoYTUD29QLP-PcrymXNCylN9G0dF4YUxgdg1rMVOxUzIffLkX1ErMTv621iYfhphNPYj71MNZ-rFbcBHEnCdFc569igIa-s7I4Ekdq6x6WmODUqbOEZsJx7MHHXtdmKPx3wtCQuEFMMkvN5X6QyDGfnoYz54YTb1g2M_eOofSxpP2dRHgAv6-89QOjVTRa6v012m-9SrV1wl_3m-TQBm_r0WdYeONTQkw8MU7G70DI"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 space-y-6">
          <Link href="/" className="text-white font-bold text-[20px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            NordicMarket
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
            NordicMarket
          </Link>
        </div>

        <div className="max-w-[400px] mx-auto w-full space-y-8">

          <div className="space-y-2">
            <h1 className="text-black font-bold text-[32px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              New password
            </h1>
            <p className="text-[#45464d] text-[16px]">
              Choose a strong password for your account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-[14px] px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[14px] px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {/* Not ready yet — link may still be loading */}
          {!ready && !success && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[14px] px-4 py-3 rounded-lg">
              Verifying your reset link… please wait.
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-1">
              <label
                className="block text-[12px] font-semibold uppercase tracking-widest text-[#45464d]"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!ready}
                className="w-full px-6 py-3 bg-white border-2 border-[#eae7e9] rounded-lg focus:border-black focus:outline-none transition-all text-[16px] disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label
                className="block text-[12px] font-semibold uppercase tracking-widest text-[#45464d]"
                htmlFor="confirm"
              >
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleReset()}
                disabled={!ready}
                className="w-full px-6 py-3 bg-white border-2 border-[#eae7e9] rounded-lg focus:border-black focus:outline-none transition-all text-[16px] disabled:opacity-50"
              />
            </div>

            <button
              onClick={handleReset}
              disabled={loading || !ready}
              className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-widest py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving…' : 'Set New Password'}
            </button>

            <Link
              href="/login"
              className="block text-center text-[12px] text-[#45464d] hover:text-black font-semibold uppercase tracking-widest transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}