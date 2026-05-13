import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="w-full max-w-container-max bg-surface-container-lowest md:rounded-xl shadow-sm flex flex-col md:flex-row min-h-screen md:min-h-[850px] overflow-hidden mx-auto">
      {/* Left: Visual */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 bg-primary overflow-hidden hidden md:flex flex-col justify-end p-xl">
        <div className="absolute inset-0 opacity-80">
          <img
            alt="Nordic Workspace"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJu_PK7BTrKRmKJMHD8Ukmq0YVggM0ISv4reoYTUD29QLP-PcrymXNCylN9G0dF4YUxgdg1rMVOxUzIffLkX1ErMTv621iYfhphNPYj71MNZ-rFbcBHEnCdFc569igIa-s7I4Ekdq6x6WmODUqbOEZsJx7MHHXtdmKPx3wtCQuEFMMkvN5X6QyDGfnoYz54YTb1g2M_eOofSxpP2dRHgAv6-89QOjVTRa6v012m-9SrV1wl_3m-TQBm_r0WdYeONTQkw8MU7G70DI"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 space-y-md">
          <span className="text-on-primary font-bold tracking-tighter text-headline-md font-manrope">NordicMarket</span>
          <blockquote className="space-y-sm">
            <p className="text-on-primary text-[32px] font-manrope leading-tight font-semibold italic">
              &ldquo;Transparency is the cornerstone of every successful acquisition. We build the bridge between visionary founders and strategic investors.&rdquo;
            </p>
            <footer className="text-on-primary/70 font-inter uppercase tracking-widest text-[12px]">
              Erik Sørensen, Principal Partner
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Right: Form */}
      <section className="w-full md:w-1/2 lg:w-2/5 flex flex-col p-gutter md:p-xl justify-center bg-surface-container-low">
        <div className="md:hidden mb-lg flex justify-center">
          <span className="text-primary font-black text-headline-md font-manrope">NordicMarket</span>
        </div>
        <div className="max-w-[400px] mx-auto w-full space-y-lg">
          <div className="space-y-xs">
            <h1 className="text-on-surface font-manrope font-bold text-headline-lg">Welcome back</h1>
            <p className="text-on-surface-variant font-inter text-body-md">Manage your business listings and acquisitions.</p>
          </div>

          {/* Tabs */}
          <div className="flex p-base bg-surface-container rounded-lg">
            <button className="flex-1 py-xs text-label-caps font-inter rounded-md bg-surface-container-lowest text-primary shadow-sm">
              Login
            </button>
            <button className="flex-1 py-xs text-label-caps font-inter rounded-md text-on-surface-variant hover:text-primary transition-colors">
              Create Account
            </button>
          </div>

          {/* Form */}
          <form className="space-y-md">
            <div className="space-y-xs">
              <label className="block text-label-caps font-inter text-on-surface-variant ml-base" htmlFor="email">
                Work Email
              </label>
              <input
                className="w-full px-md py-sm bg-surface-container-lowest border-2 border-surface-variant rounded-lg focus:border-primary focus:outline-none transition-all text-body-md font-inter"
                id="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="space-y-xs">
              <div className="flex justify-between items-end px-base">
                <label className="text-label-caps font-inter text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <a className="text-[12px] text-on-primary-container hover:text-primary transition-colors font-inter font-medium" href="#">
                  Forgot?
                </a>
              </div>
              <input
                className="w-full px-md py-sm bg-surface-container-lowest border-2 border-surface-variant rounded-lg focus:border-primary focus:outline-none transition-all text-body-md font-inter"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <Link
              href="/"
              className="block w-full bg-primary text-on-primary font-inter text-label-caps py-sm rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-center"
            >
              Login to Dashboard
            </Link>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-sm">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink mx-md text-label-caps font-inter text-outline">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-xs border-2 border-surface-variant hover:border-outline-variant rounded-lg py-sm transition-all bg-surface-container-lowest">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-label-caps font-inter text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-xs border-2 border-surface-variant hover:border-outline-variant rounded-lg py-sm transition-all bg-surface-container-lowest">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span className="text-label-caps font-inter text-on-surface">LinkedIn</span>
            </button>
          </div>

          <div className="pt-lg text-center space-y-sm">
            <p className="text-body-sm font-inter text-on-secondary-container">
              By signing in, you agree to our{" "}
              <a className="text-primary font-semibold underline underline-offset-4" href="#">Terms</a>{" "}
              and{" "}
              <a className="text-primary font-semibold underline underline-offset-4" href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}