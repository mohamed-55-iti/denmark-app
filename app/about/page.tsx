import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  { name: "Lars Andersen", role: "CEO & Co-Founder", initials: "LA" },
  { name: "Mette Christiansen", role: "Head of Listings", initials: "MC" },
  { name: "Thomas Nielsen", role: "CTO", initials: "TN" },
  { name: "Sofie Pedersen", role: "Legal & Compliance", initials: "SP" },
];

const values = [
  { icon: "verified", title: "Transparency", desc: "Every listing is verified. No hidden fees, no broker commissions — just honest deals between real people." },
  { icon: "handshake", title: "Trust", desc: "We facilitate direct connections between buyers and sellers with secure communication and verified financials." },
  { icon: "speed", title: "Efficiency", desc: "Our platform cuts average deal time to 42 days, compared to 6–12 months through traditional brokers." },
  { icon: "public", title: "Accessibility", desc: "Available in Danish, Swedish, and Norwegian — built for the Nordic business community." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              About Us
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md max-w-3xl mx-auto leading-tight">
              Denmark&apos;s Most Trusted Business Marketplace
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-2xl mx-auto">
              Founded in 2021, erhvervsmarked was built to eliminate the opacity and high costs of traditional business brokering — giving founders and investors a fairer, faster path to deal completion.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
              <div>
                <h2 className="text-headline-lg font-manrope font-semibold mb-md">Our Mission</h2>
                <p className="text-body-md font-inter text-secondary mb-md">
                  We believe every SME founder deserves a smooth, transparent exit — and every investor deserves access to verified, data-rich acquisition targets without gatekeepers.
                </p>
                <p className="text-body-md font-inter text-secondary">
                  erhvervsmarked removes friction from the M&amp;A process for small and medium businesses across Denmark, Sweden, and Norway — connecting 15,000+ investors with 1,200+ verified sellers on a single secure platform.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-md">
                {[
                  { value: "2,400+", label: "Active Listings" },
                  { value: "DKK 4.2B", label: "Total Value Listed" },
                  { value: "98%", label: "Verified Sellers" },
                  { value: "42 Days", label: "Avg. Time to Close" },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-container-low rounded-xl p-md text-center border border-outline-variant">
                    <p className="text-headline-lg font-manrope font-bold text-primary">{s.value}</p>
                    <p className="text-body-sm font-inter text-secondary mt-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="text-headline-lg font-manrope font-semibold mb-base">Our Values</h2>
              <p className="text-secondary font-inter max-w-xl mx-auto">The principles that guide every decision we make.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              {values.map((v) => (
                <div key={v.title} className="bg-surface rounded-xl p-lg border border-outline-variant text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center mx-auto mb-md">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{v.icon}</span>
                  </div>
                  <h3 className="text-headline-md font-manrope font-semibold mb-xs">{v.title}</h3>
                  <p className="text-body-sm font-inter text-secondary">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="text-headline-lg font-manrope font-semibold mb-base">Meet the Team</h2>
              <p className="text-secondary font-inter max-w-xl mx-auto">The people building the future of Nordic M&amp;A.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto mb-md font-manrope font-bold text-headline-md shadow-md">
                    {member.initials}
                  </div>
                  <h3 className="font-manrope font-semibold text-body-md">{member.name}</h3>
                  <p className="text-body-sm font-inter text-secondary mt-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-xl bg-primary text-on-primary text-center">
          <div className="max-w-container-max mx-auto px-gutter space-y-md">
            <h2 className="text-headline-lg font-manrope font-bold">Ready to Get Started?</h2>
            <p className="text-on-primary/70 font-inter text-body-md max-w-lg mx-auto">
              Join thousands of entrepreneurs across Scandinavia who trust erhvervsmarked.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
              <Link href="/browse" className="bg-on-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all">
                Browse Listings
              </Link>
              <Link href="/contact" className="border-2 border-on-primary text-on-primary px-xl py-md rounded-lg font-manrope font-semibold hover:bg-on-primary hover:text-primary transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
