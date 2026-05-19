import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for individual sellers testing the market.",
    highlight: false,
    features: [
      { label: "1 active listing", included: true },
      { label: "Basic financials display", included: true },
      { label: "Direct buyer inquiries (up to 3)", included: true },
      { label: "erhvervsmarked verified badge", included: false },
      { label: "NDA templates", included: false },
      { label: "Priority search placement", included: false },
      { label: "Dedicated deal advisor", included: false },
    ],
    cta: "Get Started Free",
    href: "/post-ad",
  },
  {
    name: "Professional",
    price: "1,499 DKK",
    period: "/ month",
    desc: "For serious sellers who want maximum exposure and tools.",
    highlight: true,
    features: [
      { label: "5 active listings", included: true },
      { label: "Full financial data room", included: true },
      { label: "Unlimited buyer inquiries", included: true },
      { label: "erhvervsmarked verified badge", included: true },
      { label: "NDA templates included", included: true },
      { label: "Priority search placement", included: true },
      { label: "Dedicated deal advisor", included: false },
    ],
    cta: "Start Professional",
    href: "/post-ad",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For brokers, PE funds, and high-volume acquisition teams.",
    highlight: false,
    features: [
      { label: "Unlimited listings", included: true },
      { label: "Full financial data room", included: true },
      { label: "Unlimited buyer inquiries", included: true },
      { label: "erhvervsmarked verified badge", included: true },
      { label: "Full legal template suite", included: true },
      { label: "Featured homepage placement", included: true },
      { label: "Dedicated deal advisor", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

const faq = [
  { q: "Is there a success fee?", a: "No. erhvervsmarked does not charge success fees or commissions on completed deals. Your subscription is all you pay." },
  { q: "Can I cancel anytime?", a: "Yes. Monthly plans can be cancelled at any time with no penalty. Annual plans include a 14-day refund window." },
  { q: "How does the Verified badge work?", a: "Our team manually reviews submitted financials and registration documents before awarding the Verified badge. This process typically takes 2–3 business days." },
  { q: "Do buyers pay to use the platform?", a: "No. Buyer access is completely free. Creating an account, browsing listings, and sending inquiries costs nothing." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Transparent Pricing
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              No Broker Fees. No Hidden Costs.
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Simple subscription pricing for sellers. Buyers always browse for free.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border overflow-hidden flex flex-col ${
                    plan.highlight
                      ? "border-primary shadow-xl ring-2 ring-primary"
                      : "border-outline-variant"
                  }`}
                >
                  {plan.highlight && (
                    <div className="bg-primary text-on-primary text-center py-xs text-label-caps font-inter font-semibold tracking-widest">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`p-xl flex-1 flex flex-col ${plan.highlight ? "bg-surface" : "bg-surface-container-low"}`}>
                    <h2 className="text-headline-md font-manrope font-bold mb-xs">{plan.name}</h2>
                    <p className="text-secondary font-inter text-body-sm mb-lg">{plan.desc}</p>
                    <div className="mb-lg">
                      <span className="text-headline-xl font-manrope font-bold">{plan.price}</span>
                      {plan.period && <span className="text-secondary font-inter text-body-md">{plan.period}</span>}
                    </div>
                    <ul className="space-y-sm mb-xl flex-1">
                      {plan.features.map((f) => (
                        <li key={f.label} className="flex items-center gap-sm">
                          <span
                            className={`material-symbols-outlined text-[20px] shrink-0 ${f.included ? "text-primary" : "text-outline"}`}
                            style={{ fontVariationSettings: f.included ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            {f.included ? "check_circle" : "cancel"}
                          </span>
                          <span className={`font-inter text-body-sm ${f.included ? "text-on-surface-variant" : "text-outline line-through"}`}>
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.href}
                      className={`block w-full text-center py-md rounded-xl font-manrope font-semibold transition-all ${
                        plan.highlight
                          ? "bg-primary text-on-primary hover:opacity-90"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-2xl mx-auto px-gutter">
            <h2 className="text-headline-lg font-manrope font-semibold mb-xl text-center">Frequently Asked Questions</h2>
            <div className="space-y-md">
              {faq.map((item) => (
                <div key={item.q} className="bg-surface rounded-xl p-lg border border-outline-variant">
                  <h3 className="font-manrope font-semibold text-body-md mb-xs">{item.q}</h3>
                  <p className="font-inter text-body-sm text-secondary">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
