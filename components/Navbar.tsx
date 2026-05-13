"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/equipment", label: "Equipment" },
    { href: "/valuation", label: "Valuation" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-gutter max-w-[1280px] mx-auto h-16">
        {/* Logo + Nav */}
        <div className="flex items-center gap-xl">
          <Link
            href="/"
            className="text-headline-md font-bold text-primary font-manrope tracking-tight"
          >
            NordicMarket
          </Link>
          <nav className="hidden md:flex items-center gap-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] tracking-widest font-semibold uppercase transition-colors ${
                  pathname === link.href
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-secondary cursor-pointer hover:bg-surface-variant p-xs rounded-full transition-all text-[20px]">
            language
          </span>
          <Link
            href="/login"
            className="hidden md:block text-secondary hover:text-primary transition-colors text-[12px] tracking-widest font-semibold uppercase"
          >
            Login
          </Link>
          <Link
            href="/post-ad"
            className="bg-primary text-on-primary px-md py-xs rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all"
          >
            Post an Ad
          </Link>
        </div>
      </div>
    </header>
  );
}