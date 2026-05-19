import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const phases = [
  {
    phase: "01",
    title: "Initial Screening",
    duration: "Days 1–3",
    color: "bg-primary",
    steps: [
      { title: "Sign the NDA", desc: "Before receiving any financial data, execute a bilateral NDA with the seller. Use our template in the Legal Templates section." },
      { title: "Review the Listing Memorandum", desc: "Request the full Information Memorandum (IM) — this should include: business overview, 3-year P&L, customer concentration, and key contracts." },
      { title: "Initial Call with Seller", desc: "Schedule a 30-minute call to assess seller motivation, timeline, and deal-breakers. This saves time on both sides." },
    ],
  },
  {
    phase: "02",
    title: "Financial Due Diligence",
    duration: "Days 4–14",
    color: "bg-secondary-container",
    steps: [
      { title: "Request 3-Year Financials", desc: "P&L, balance sheet, and cash flow statements. Prefer audited accounts — if not available, ask for bank statements as a cross-reference." },
      { title: "Normalize EBITDA", desc: "Identify owner's salary, one-time costs, and personal expenses run through the business. Adjusted EBITDA is the real earnings multiple base." },
      { title: "Accounts Receivable & Payable", desc: "Review AR aging report. High overdue receivables are a red flag. Check AP to understand payment obligations at closing." },
      { title: "Revenue Concentration", desc: "If more than 20% of revenue comes from one customer, factor churn risk into your valuation." },
    ],
  },
  {
    phase: "03",
    title: "Legal & Operational Review",
    duration: "Days 10–21",
    color: "bg-tertiary-fixed",
    steps: [
      { title: "Corporate Documents", desc: "Articles of association, shareholder register, board minutes, and any existing shareholder agreements. Check for restrictions on transfer." },
      { title: "Contracts Review", desc: "Key customer contracts, supplier agreements, leases, and employment contracts. Understand notice periods and change-of-control clauses." },
      { title: "Intellectual Property", desc: "Confirm ownership of trademarks, domain names, software, and trade secrets. Are they in the company's name — or the founder's personal name?" },
      { title: "Litigation & Liabilities", desc: "Request a declaration of pending or threatened litigation, regulatory violations, and tax disputes." },
    ],
  },
  {
    phase: "04",
    title: "Negotiation & Close",
    duration: "Days 21–42",
    color: "bg-primary",
    steps: [
      { title: "Submit Letter of Intent (LOI)", desc: "Non-binding offer outlining price, structure (asset vs share), exclusivity period, and conditions precedent." },
      { title: "Negotiate Terms", desc: "Agree on price adjustments, earn-out clauses, seller guarantees, and transition support period (typically 3–6 months)." },
      { title: "Engage a Lawyer", desc: "Draft or review the final Purchase Agreement (APA or SPA) with a qualified Danish corporate lawyer." },
      { title: "Close & Transfer", desc: "Execute the agreement, transfer funds, notify employees and key stakeholders, and begin the transition handover." },
    ],
  },
];

export default function DueDiligencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Buyer&apos;s Guide
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              Due Diligence Guide
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              A practical, step-by-step framework for evaluating a business acquisition in Denmark — from first NDA to final close.
            </p>
            <div className="flex gap-md justify-center mt-lg flex-wrap">
              <Link href="/legal-templates" className="bg-primary text-on-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all">
                Download Checklist
              </Link>
              <Link href="/valuation" className="border-2 border-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:bg-primary hover:text-on-primary transition-all">
                Valuation Tool
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline overview */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">

            {/* Phase cards */}
            <div className="space-y-xl">
              {phases.map((phase, i) => (
                <div key={phase.phase} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-lg">
                  {/* Phase label */}
                  <div className="flex flex-col items-start md:items-center text-center md:pt-sm">
                    <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center text-on-primary font-manrope font-bold text-headline-md mb-sm shadow-md`}>
                      {phase.phase}
                    </div>
                    <h3 className="font-manrope font-bold text-body-md">{phase.title}</h3>
                    <span className="text-[11px] font-inter text-secondary tracking-widest uppercase mt-xs">{phase.duration}</span>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                    {phase.steps.map((step) => (
                      <div key={step.title} className="bg-surface-container-low rounded-xl p-md border border-outline-variant">
                        <div className="flex items-center gap-xs mb-xs">
                          <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                          <h4 className="font-manrope font-semibold text-body-md">{step.title}</h4>
                        </div>
                        <p className="font-inter text-body-sm text-secondary">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Connector line */}
                  {i < phases.length - 1 && (
                    <div className="hidden md:block col-span-2 flex justify-center">
                      <div className="w-px h-8 bg-outline-variant mx-auto ml-[100px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Red flags */}
            <div className="mt-xl bg-red-50 border border-red-200 rounded-2xl p-xl">
              <h3 className="font-manrope font-bold text-headline-md mb-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                Common Red Flags
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {[
                  "Revenue concentrated in 1–2 customers (>30%)",
                  "No audited financials — seller only has internal records",
                  "Key-person dependency: business cannot run without the founder",
                  "Declining revenue for 2+ consecutive years",
                  "Verbal-only customer contracts",
                  "Undisclosed litigation or tax disputes",
                  "Seller unwilling to provide financials pre-NDA",
                  "Lease expiring within 12 months with no renewal option",
                ].map((flag) => (
                  <div key={flag} className="flex items-start gap-xs">
                    <span className="material-symbols-outlined text-red-500 text-[18px] shrink-0 mt-px" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                    <span className="font-inter text-body-sm text-red-800">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
