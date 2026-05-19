"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "da", label: "Dansk",    flag: "🇩🇰" },
  { code: "sv", label: "Svenska",  flag: "🇸🇪" },
  { code: "no", label: "Norsk",    flag: "🇳🇴" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, tr } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/",          labelKey: "nav_home"      as const },
    { href: "/browse",    labelKey: "nav_browse"    as const },
    { href: "/equipment", labelKey: "nav_equipment" as const },
    { href: "/valuation", labelKey: "nav_valuation" as const },
    { href: "/about",     labelKey: "nav_about"     as const },
    { href: "/admin",     labelKey: "nav_dashboard" as const },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-gutter max-w-[1280px] mx-auto h-16">
        {/* Logo + Nav */}
        <div className="flex items-center gap-xl">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="erhvervsmarked"
              className="h-10 w-auto object-contain"
            />
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
                {tr(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-md">

          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1 text-secondary hover:text-primary hover:bg-surface-variant px-2 py-1 rounded-full transition-all text-[12px] font-semibold"
              aria-label="Switch language"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
              <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.label}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-surface border border-outline-variant rounded-xl shadow-lg overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-surface-container ${
                      language === lang.code
                        ? "text-primary bg-secondary-container"
                        : "text-on-surface"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {language === lang.code && (
                      <span className="material-symbols-outlined text-[16px] ml-auto">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="hidden md:block text-secondary hover:text-primary transition-colors text-[12px] tracking-widest font-semibold uppercase"
          >
            {tr("nav_login")}
          </Link>
          <Link
            href="/post-ad"
            className="bg-primary text-on-primary px-md py-xs rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all"
          >
            {tr("nav_post_ad")}
          </Link>
        </div>
      </div>
    </header>
  );
}