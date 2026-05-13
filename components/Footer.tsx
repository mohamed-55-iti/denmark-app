import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-outline-variant py-xl">
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
        {/* Brand */}
        <div className="col-span-1">
          <span className="text-[24px] font-bold text-on-surface font-manrope block mb-md">
            NordicMarket
          </span>
          <p className="text-[14px] text-on-secondary-container mb-md leading-relaxed">
            The premier business exchange platform for SMEs in Denmark and the
            wider Nordic region.
          </p>
          <div className="flex gap-sm">
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary transition-colors">
              public
            </span>
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary transition-colors">
              share
            </span>
          </div>
        </div>

        {/* Platform */}
        <div>
          <span className="text-[12px] tracking-widest font-semibold uppercase text-on-surface block mb-md">
            Platform
          </span>
          <ul className="space-y-sm">
            {["Browse Listings", "Success Stories", "Pricing", "Valuation Tool"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-on-secondary-container hover:text-primary transition-colors text-[14px]"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <span className="text-[12px] tracking-widest font-semibold uppercase text-on-surface block mb-md">
            Resources
          </span>
          <ul className="space-y-sm">
            {[
              "Legal Templates",
              "Due Diligence Guide",
              "Contact Support",
              "Privacy Policy",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-on-secondary-container hover:text-primary transition-colors text-[14px]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Language */}
        <div>
          <span className="text-[12px] tracking-widest font-semibold uppercase text-on-surface block mb-md">
            Language
          </span>
          <div className="flex flex-wrap gap-sm">
            {[
              { label: "English", active: true },
              { label: "Dansk", active: false },
              { label: "Svenska", active: false },
              { label: "Norsk", active: false },
            ].map((lang) => (
              <Link
                key={lang.label}
                href="#"
                className={`text-[14px] transition-colors ${
                  lang.active
                    ? "text-primary font-bold underline"
                    : "text-on-secondary-container hover:text-primary"
                }`}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1280px] mx-auto px-gutter mt-xl pt-lg border-t border-outline-variant text-center">
        <p className="text-[14px] text-secondary">
          © 2024 NordicMarket. Minimalist Business Exchange. Securely operating
          across Copenhagen, Aarhus, and Odense.
        </p>
      </div>
    </footer>
  );
}