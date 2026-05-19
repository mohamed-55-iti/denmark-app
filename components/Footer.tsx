"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "da", label: "Dansk"   },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk"   },
  { code: "ar", label: "العربية" },
];

export default function Footer() {
  const { language, setLanguage, tr } = useLanguage();
  const languageSectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleGlobeClick = () => {
    languageSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter py-xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-xl">

          {/* Brand */}
          <div>
            <p className="font-manrope font-bold text-body-lg mb-sm">erhvervsmarked</p>
            <p className="font-inter text-body-sm text-secondary leading-relaxed">
              {tr("footerDesc")}
            </p>
            <div className="flex gap-sm mt-md items-center">

              {/* Globe → scroll to language section */}
              <button
                onClick={handleGlobeClick}
                title="Choose language"
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </button>

              {/* Share → copy link + "Copied!" tooltip */}
              <div className="relative">
                <button
                  onClick={handleShareClick}
                  title="Copy link"
                  className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copied ? "check" : "share"}
                  </span>
                </button>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[11px] px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Platform */}
          <div>
            <p className="font-inter font-semibold text-[11px] tracking-widest uppercase text-secondary mb-md">
              Platform
            </p>
            <ul className="space-y-sm">
              {[
                { label: tr("nav_browse"),    href: "/browse"     },
                { label: tr("nav_equipment"), href: "/equipment"  },
                { label: tr("nav_valuation"), href: "/valuation"  },
                { label: tr("nav_about"),     href: "/about"      },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-body-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-inter font-semibold text-[11px] tracking-widest uppercase text-secondary mb-md">
              {tr("resources")}
            </p>
            <ul className="space-y-sm">
              {[
                { label: tr("termsOfService"), href: "/terms" },
                { label: tr("privacyPolicy"),  href: "/privacy"         },
                { label: tr("contactSupport"), href: "/contact"         },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-body-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language — ref هنا عشان الـ Globe يعمل scroll ليه */}
          <div ref={languageSectionRef}>
            <p className="font-inter font-semibold text-[11px] tracking-widest uppercase text-secondary mb-md">
              {tr("language")}
            </p>
            <ul className="space-y-sm">
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`font-inter text-body-sm transition-colors text-left ${
                      language === lang.code
                        ? "text-primary font-semibold underline underline-offset-2"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant mt-xl pt-lg flex flex-col sm:flex-row justify-between items-center gap-sm">
          <p className="font-inter text-body-sm text-secondary text-center">
            © 2025 erhvervsmarked. Minimalist Business Exchange.
          </p>
          <div className="flex gap-md">
            <Link href="/privacy" className="font-inter text-[11px] text-secondary hover:text-primary transition-colors">
              {tr("privacyPolicy")}
            </Link>
            <Link href="/terms" className="font-inter text-[11px] text-secondary hover:text-primary transition-colors">
              {tr("termsOfService")}
            </Link>
            <Link href="/contact" className="font-inter text-[11px] text-secondary hover:text-primary transition-colors">
              {tr("contactSupport")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}