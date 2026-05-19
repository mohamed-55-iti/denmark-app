"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ValuationPage() {
  const [revenue, setRevenue] = useState("");
  const [ebitda, setEbitda] = useState("");
  const [industry, setIndustry] = useState("Tech & SaaS");
  const [years, setYears] = useState("3");
  const [result, setResult] = useState<null | { low: string; mid: string; high: string }>(null);

  const multiples: Record<string, number> = {
    "Tech & SaaS": 5.5,
    "Cafe & Food": 2.5,
    "Logistics": 3.5,
    "Retail": 2.0,
    "Healthcare": 4.0,
    "Construction": 2.8,
    "Services": 3.0,
    "Other": 2.5,
  };

  const handleCalculate = () => {
    const rev = parseFloat(revenue.replace(/[^0-9.]/g, ""));
    const ebit = parseFloat(ebitda.replace(/[^0-9.]/g, ""));
    if (!rev || !ebit) return;
    const mult = multiples[industry] ?? 3.0;
    const yrsBonus = parseFloat(years) >= 5 ? 1.15 : parseFloat(years) >= 3 ? 1.0 : 0.85;
    const mid = ebit * mult * yrsBonus;
    const fmt = (n: number) =>
      n >= 1_000_000
        ? `${(n / 1_000_000).toFixed(1)}M DKK`
        : `${Math.round(n / 1000)}K DKK`;
    setResult({ low: fmt(mid * 0.8), mid: fmt(mid), high: fmt(mid * 1.2) });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Free Tool
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              Business Valuation Calculator
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Get an instant estimate of your business&apos;s market value based on industry-standard multiples used across Scandinavian M&amp;A deals.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              {/* Form */}
              <div className="bg-surface-container-low rounded-2xl p-xl border border-outline-variant">
                <h2 className="text-headline-md font-manrope font-semibold mb-lg">Enter Your Details</h2>
                <div className="space-y-md">
                  <div>
                    <label className="block text-label-caps font-inter font-semibold text-secondary mb-xs tracking-widest uppercase text-[11px]">Annual Revenue (DKK)</label>
                    <input
                      type="text"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      placeholder="e.g. 2,500,000"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps font-inter font-semibold text-secondary mb-xs tracking-widest uppercase text-[11px]">Annual EBITDA (DKK)</label>
                    <input
                      type="text"
                      value={ebitda}
                      onChange={(e) => setEbitda(e.target.value)}
                      placeholder="e.g. 600,000"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-label-caps font-inter font-semibold text-secondary mb-xs tracking-widest uppercase text-[11px]">Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {["Tech & SaaS", "Cafe & Food", "Logistics", "Retail", "Healthcare", "Construction", "Services", "Other"].map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-label-caps font-inter font-semibold text-secondary mb-xs tracking-widest uppercase text-[11px]">Years in Business</label>
                    <select
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="1">Less than 2 years</option>
                      <option value="3">2–4 years</option>
                      <option value="5">5+ years</option>
                    </select>
                  </div>
                  <button
                    onClick={handleCalculate}
                    className="w-full bg-primary text-on-primary py-md rounded-lg font-manrope font-semibold text-body-md hover:opacity-90 transition-all mt-md"
                  >
                    Calculate Valuation
                  </button>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col gap-md">
                {result ? (
                  <>
                    <div className="bg-primary text-on-primary rounded-2xl p-xl text-center flex-1 flex flex-col justify-center">
                      <p className="text-label-caps font-inter tracking-widest uppercase text-on-primary/70 mb-xs">Estimated Market Value</p>
                      <p className="text-headline-xl font-manrope font-bold">{result.mid}</p>
                      <p className="text-on-primary/70 font-inter text-body-sm mt-xs">Mid-range estimate</p>
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant text-center">
                        <p className="text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Conservative</p>
                        <p className="text-headline-md font-manrope font-bold">{result.low}</p>
                      </div>
                      <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant text-center">
                        <p className="text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Optimistic</p>
                        <p className="text-headline-md font-manrope font-bold">{result.high}</p>
                      </div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant">
                      <p className="text-body-sm font-inter text-secondary">
                        <span className="font-semibold text-on-surface-variant">Disclaimer:</span> This is a preliminary estimate based on industry multiples. Actual valuations depend on growth trajectory, assets, contracts, and buyer profile. We recommend a professional audit before listing.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-surface-container-low rounded-2xl p-xl border border-outline-variant flex flex-col items-center justify-center text-center flex-1 min-h-[300px]">
                    <span className="material-symbols-outlined text-outline text-[64px] mb-md" style={{ fontVariationSettings: "'FILL' 0" }}>calculate</span>
                    <p className="text-headline-md font-manrope font-semibold text-on-surface-variant">Your valuation will appear here</p>
                    <p className="text-body-sm font-inter text-secondary mt-xs">Fill in the details on the left and click Calculate.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Multiples table */}
            <div className="mt-xl bg-surface-container-low rounded-2xl border border-outline-variant overflow-hidden">
              <div className="p-lg border-b border-outline-variant">
                <h3 className="text-headline-md font-manrope font-semibold">Industry Multiples Reference</h3>
                <p className="text-body-sm font-inter text-secondary mt-xs">EBITDA multiples used in Scandinavian M&A markets (2024 data).</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface border-b border-outline-variant">
                    <tr>
                      {["Industry", "Multiple Range", "Typical Buyer", "Avg. Deal Size"].map((h) => (
                        <th key={h} className="text-left px-lg py-sm text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {[
                      ["Tech & SaaS", "4x – 7x", "Strategic / PE", "4–12M DKK"],
                      ["Cafe & Food", "2x – 3x", "Individual", "0.5–3M DKK"],
                      ["Logistics", "3x – 4x", "Strategic", "2–8M DKK"],
                      ["Retail", "1.5x – 2.5x", "Individual / Strategic", "0.5–4M DKK"],
                      ["Healthcare", "3.5x – 5x", "PE / Strategic", "3–10M DKK"],
                      ["Construction", "2.5x – 3.5x", "Strategic", "1–6M DKK"],
                    ].map(([ind, mult, buyer, size]) => (
                      <tr key={ind} className="hover:bg-surface transition-all">
                        <td className="px-lg py-sm font-inter font-semibold text-body-sm">{ind}</td>
                        <td className="px-lg py-sm font-inter text-body-sm text-primary font-bold">{mult}</td>
                        <td className="px-lg py-sm font-inter text-body-sm text-secondary">{buyer}</td>
                        <td className="px-lg py-sm font-inter text-body-sm text-secondary">{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
