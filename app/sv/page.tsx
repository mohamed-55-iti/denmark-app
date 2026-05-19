import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SvenskaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
            🇸🇪 Svenska
          </span>
          <h1 className="text-headline-xl font-manrope font-bold mb-md">
            Danmarks Marknadsplats för Företag
          </h1>
          <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto mb-xl">
            Köp och sälj verifierade företag, utrustning och kommersiella tillgångar i Danmark och Norden — utan mäklare, utan dolda avgifter.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <Link href="/browse" className="bg-primary text-on-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all">
              Bläddra bland annonser
            </Link>
            <Link href="/post-ad" className="border-2 border-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:bg-primary hover:text-on-primary transition-all">
              Lista ditt företag
            </Link>
          </div>
          <div className="mt-xl flex gap-md justify-center flex-wrap">
            {[
              { label: "English", href: "/", flag: "🇬🇧" },
              { label: "Dansk", href: "/da", flag: "🇩🇰" },
              { label: "Norsk", href: "/no", flag: "🇳🇴" },
            ].map((lang) => (
              <Link key={lang.label} href={lang.href}
                className="border border-outline-variant text-secondary font-inter px-lg py-sm rounded-lg hover:border-primary hover:text-primary transition-all">
                {lang.flag} {lang.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
