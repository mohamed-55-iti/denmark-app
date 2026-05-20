"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ListingDetailsPage() {
  const [showNDA, setShowNDA] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [ndaSubmitted, setNdaSubmitted] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      {/* NDA Modal */}
      {showNDA && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-md"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowNDA(false); setNdaSubmitted(false); } }}
        >
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md p-xl border border-outline-variant">
            {ndaSubmitted ? (
              <div className="text-center space-y-md py-md">
                <span
                  className="material-symbols-outlined text-primary text-[48px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h3 className="text-[24px] font-bold font-manrope">Request Received!</h3>
                <p className="text-secondary text-[14px]">
                  We'll send the NDA to your email within 24 hours.
                </p>
                <button
                  onClick={() => { setShowNDA(false); setNdaSubmitted(false); }}
                  className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-lg">
                  <div>
                    <h3 className="text-[20px] font-bold font-manrope">Sign NDA</h3>
                    <p className="text-secondary text-[13px] mt-xs">
                      Get access to the full financial data room
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNDA(false)}
                    className="text-secondary hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="space-y-md">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex items-start gap-sm pt-xs">
                    <input
                      type="checkbox"
                      id="nda-agree"
                      className="mt-1 accent-primary cursor-pointer"
                    />
                    <label htmlFor="nda-agree" className="text-[13px] text-on-surface-variant cursor-pointer">
                      I agree to keep all shared information confidential and not disclose it to third parties.
                    </label>
                  </div>
                  <button
                    onClick={() => setNdaSubmitted(true)}
                    className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md mt-md"
                  >
                    Submit & Sign NDA
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Ask a Question Modal */}
      {showQuestion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-md"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowQuestion(false); setQuestionSubmitted(false); } }}
        >
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md p-xl border border-outline-variant">
            {questionSubmitted ? (
              <div className="text-center space-y-md py-md">
                <span
                  className="material-symbols-outlined text-primary text-[48px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mark_email_read
                </span>
                <h3 className="text-[24px] font-bold font-manrope">Question Sent!</h3>
                <p className="text-secondary text-[14px]">
                  Erik will get back to you within 1 business day.
                </p>
                <button
                  onClick={() => { setShowQuestion(false); setQuestionSubmitted(false); }}
                  className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-lg">
                  <div>
                    <h3 className="text-[20px] font-bold font-manrope">Ask a Question</h3>
                    <p className="text-secondary text-[13px] mt-xs">
                      Erik Sørensen will respond within 24 hours
                    </p>
                  </div>
                  <button
                    onClick={() => setShowQuestion(false)}
                    className="text-secondary hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="space-y-md">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-secondary mb-xs">
                      Your Question
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What would you like to know about this business?"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={() => setQuestionSubmitted(true)}
                    className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    Send Question
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="max-w-[1280px] mx-auto px-gutter py-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs text-[12px] tracking-widest uppercase text-secondary mb-lg">
          <Link href="/browse" className="hover:text-primary transition-colors">
            Browse
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold">Copenhagen Roastery Co.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-xl">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <img
                alt="Copenhagen Roastery"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoS-wDejNKFaBiKSR3ZAyR1UDUTU7lCs4LZqlszPB5AzI9RPFuIt-nuIMZka8GRXesapA3Fv8m3QvcUobcIgrDResVklB6a-GmFf_a30L-OH-YsTOJrPLhmlR4xcAM2gzm6CYjxPBmYccmFhvTe1a7wqfvvCkGY8AQfhObGAFx27xyJ0LgzF4r0ROaQSRhR8HKtKPAaaMEMcN3XydWp76hgOUj77St_x7t801-oEfHsN9WEDUfjOoIY5AefBUseg6472nUo4bldpQ"
              />
              <div className="absolute top-md left-md flex gap-xs">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] tracking-widest uppercase font-bold px-sm py-[3px] rounded-full">
                  Featured
                </span>
                <span className="bg-secondary-container text-on-surface text-[10px] tracking-widest uppercase font-bold px-sm py-[3px] rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Title + Price */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-md">
              <div>
                <h1 className="text-[40px] font-bold font-manrope leading-tight tracking-tight mb-xs">
                  Copenhagen Roastery Co.
                </h1>
                <p className="text-secondary text-[14px] flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  Copenhagen, Denmark · Cafe & Food
                </p>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-bold text-primary font-manrope">4.2M DKK</div>
                <p className="text-secondary text-[12px] tracking-widest uppercase">Asking Price</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {[
                { label: "Annual Revenue", value: "1.8M DKK" },
                { label: "EBITDA", value: "420K DKK" },
                { label: "Years Operating", value: "8 Years" },
                { label: "Employees", value: "14 FTE" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-surface border border-outline-variant rounded-xl p-md text-center"
                >
                  <div className="text-[24px] font-bold font-manrope text-primary mb-xs">
                    {m.value}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-secondary">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">About this Business</h2>
              <p className="text-[16px] text-on-surface-variant leading-relaxed mb-md">
                Copenhagen Roastery Co. is an established specialty coffee roaster and café chain
                operating 3 locations across Copenhagen. Founded in 2016, the business has built a
                loyal customer base with a focus on ethically sourced, single-origin beans and a
                premium retail experience.
              </p>
              <p className="text-[16px] text-on-surface-variant leading-relaxed">
                The business includes full roastery equipment, a subscription coffee service with
                over 800 active subscribers, and long-term lease agreements at prime Copenhagen
                locations. This represents a rare opportunity to acquire a profitable, brand-led
                food and beverage operation with significant growth potential.
              </p>
            </div>

            {/* Assets & Inclusions */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">Assets & Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {[
                  "3 fully equipped café locations",
                  "Industrial roasting equipment (value ~600K DKK)",
                  "800+ active subscription customers",
                  "Established brand and social media presence",
                  "Staff (14 FTE, all eligible to transfer)",
                  "E-commerce store generating 240K DKK/yr",
                  "Supplier agreements with 6 origin farms",
                  "Proprietary roast profiles and recipes",
                ].map((asset) => (
                  <div key={asset} className="flex items-start gap-xs">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] mt-[2px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-[14px] text-on-surface">{asset}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financials Summary */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">Financial Snapshot</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="text-left py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        Metric
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2022
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2023
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2024
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: "Revenue", y22: "1.4M", y23: "1.6M", y24: "1.8M" },
                      { metric: "Gross Profit", y22: "680K", y23: "780K", y24: "890K" },
                      { metric: "EBITDA", y22: "290K", y23: "350K", y24: "420K" },
                      { metric: "Net Profit", y22: "180K", y23: "230K", y24: "290K" },
                    ].map((row) => (
                      <tr key={row.metric} className="border-b border-outline-variant">
                        <td className="py-sm font-medium">{row.metric}</td>
                        <td className="py-sm text-right text-secondary">{row.y22} DKK</td>
                        <td className="py-sm text-right text-secondary">{row.y23} DKK</td>
                        <td className="py-sm text-right font-bold">{row.y24} DKK</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-md">
            {/* Contact Card */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden sticky top-24">
              <div className="p-lg">
                <h3 className="text-[20px] font-bold font-manrope mb-xs">
                  Interested in this listing?
                </h3>
                <p className="text-secondary text-[14px] mb-lg">
                  Sign an NDA and get access to the full financial data room.
                </p>

                <div className="space-y-md">
                  <button
                    onClick={() => setShowNDA(true)}
                    className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    Sign NDA & Get Access
                  </button>
                  <button
                    onClick={() => setShowQuestion(true)}
                    className="w-full border-2 border-primary text-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:bg-primary hover:text-on-primary transition-all"
                  >
                    Ask a Question
                  </button>
                </div>

                <div className="mt-lg pt-lg border-t border-outline-variant space-y-sm">
                  {[
                    { icon: "verified_user", text: "Identity Verified Seller" },
                    { icon: "lock", text: "NDA Protected Data Room" },
                    { icon: "support_agent", text: "Advisor Support Included" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-xs text-[13px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Listing Agent */}
              <div className="bg-surface-container-low border-t border-outline-variant p-md flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-[14px]">
                  ES
                </div>
                <div>
                  <p className="font-semibold text-[14px]">Erik Sørensen</p>
                  <p className="text-secondary text-[12px]">Senior Acquisition Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}