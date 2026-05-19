"use client";
import { useState } from "react";
import Link from "next/link";

const steps = ["Details", "Financials", "Media", "Preview"];

export default function PostAdPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maskName, setMaskName] = useState(false);

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-16 min-h-screen">
      {/* Progress Stepper */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#e4e2e4] z-0" />
          {steps.map((step, i) => {
            const num = i + 1;
            const isActive = num === currentStep;
            const isDone = num < currentStep;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors
                    ${isActive ? "bg-[#000000] text-white" : isDone ? "bg-[#000000] text-white" : "bg-[#eae7e9] text-[#45464d]"}`}
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : num}
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d]">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form */}
        <div className="lg:col-span-8 bg-white border border-[#c6c6cd] rounded-xl p-10 shadow-sm">
          <header className="mb-10">
            <h1 className="text-[32px] font-semibold leading-tight text-black mb-1">Step {currentStep}: {steps[currentStep - 1]}</h1>
            <p className="text-[16px] text-[#45464d]">
              {currentStep === 1 && "Start by telling us the basic identifiers of your business."}
              {currentStep === 2 && "Provide key financial metrics to attract serious buyers."}
              {currentStep === 3 && "Upload photos and documents to support your listing."}
              {currentStep === 4 && "Review your listing before it goes live."}
            </p>
          </header>

          {currentStep === 1 && (
            <div className="space-y-10">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. erhvervsmarked Peak Logistics"
                  className="w-full h-12 px-6 bg-[#f6f3f5] border-2 border-[#eae7e9] rounded-lg focus:outline-none focus:border-black transition-colors text-[16px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">Category</label>
                  <select className="w-full h-12 px-6 bg-[#f6f3f5] border-2 border-[#eae7e9] rounded-lg focus:outline-none focus:border-black transition-colors text-[16px] appearance-none">
                    <option>SaaS / Digital</option>
                    <option>Retail & E-commerce</option>
                    <option>Manufacturing</option>
                    <option>Professional Services</option>
                    <option>Real Estate</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">Primary Location</label>
                  <input
                    type="text"
                    placeholder="Copenhagen, Denmark"
                    className="w-full h-12 px-6 bg-[#f6f3f5] border-2 border-[#eae7e9] rounded-lg focus:outline-none focus:border-black transition-colors text-[16px]"
                  />
                </div>
              </div>
              {/* Confidentiality Guard */}
              <div className="p-6 bg-[#f6f3f5] rounded-lg border border-dashed border-[#c6c6cd]">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-[#dce0e4] text-[#5e6367] rounded-full">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-black">Confidentiality Guard</h4>
                    <p className="text-[14px] text-[#45464d] mt-1">Your exact location and business name can be masked until an NDA is signed by the potential buyer.</p>
                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="mask"
                        checked={maskName}
                        onChange={e => setMaskName(e.target.checked)}
                        className="rounded border-[#76777d] text-black focus:ring-black h-5 w-5"
                      />
                      <label htmlFor="mask" className="text-[14px] font-medium">Mask business name for public listing</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Asking Price", placeholder: "e.g. $2,500,000" },
                  { label: "Annual Revenue", placeholder: "e.g. $800,000" },
                  { label: "Net Profit", placeholder: "e.g. $420,000" },
                  { label: "Years in Operation", placeholder: "e.g. 7" },
                ].map(({ label, placeholder }) => (
                  <div key={label} className="space-y-1">
                    <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      className="w-full h-12 px-6 bg-[#f6f3f5] border-2 border-[#eae7e9] rounded-lg focus:outline-none focus:border-black transition-colors text-[16px]"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">Business Description</label>
                <textarea
                  rows={5}
                  placeholder="Describe your business, its strengths, and why it's a great opportunity..."
                  className="w-full px-6 py-4 bg-[#f6f3f5] border-2 border-[#eae7e9] rounded-lg focus:outline-none focus:border-black transition-colors text-[16px] resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="border-2 border-dashed border-[#c6c6cd] rounded-xl p-12 text-center hover:border-black transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[48px] text-[#45464d]">cloud_upload</span>
                <p className="text-[16px] font-bold mt-4">Drag & drop photos here</p>
                <p className="text-[14px] text-[#45464d] mt-1">or click to browse — PNG, JPG up to 10MB each</p>
                <button className="mt-6 bg-black text-white px-8 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-widest">
                  Browse Files
                </button>
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold uppercase tracking-widest text-[#45464d] block">Upload Financial Documents (Optional)</label>
                <div className="border-2 border-dashed border-[#c6c6cd] rounded-xl p-6 text-center hover:border-black transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[32px] text-[#45464d]">description</span>
                  <p className="text-[14px] text-[#45464d] mt-2">P&L statements, balance sheets, tax returns (PDF)</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-[#f6f3f5] rounded-xl p-6 space-y-4">
                <h3 className="text-[20px] font-semibold">Listing Preview</h3>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  {[
                    ["Business Name", "erhvervsmarked Peak Logistics"],
                    ["Category", "SaaS / Digital"],
                    ["Location", "Copenhagen, Denmark"],
                    ["Asking Price", "$2,500,000"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-[#45464d] uppercase text-[11px] font-semibold tracking-widest block">{k}</span>
                      <span className="font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#dce0e4] rounded-xl p-6">
                <p className="text-[14px] text-[#45464d]">By submitting, you agree to our <a href="#" className="text-black font-bold underline">Terms of Service</a> and confirm all information is accurate.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-10 border-t border-[#c6c6cd] flex justify-between items-center mt-10">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              className="text-black font-bold text-[12px] uppercase tracking-widest hover:-translate-x-1 transition-transform flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.min(steps.length, s + 1))}
              className="bg-black text-white px-16 py-3 rounded-lg font-bold text-[12px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              {currentStep === steps.length ? "Submit Listing" : "Next Step"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#f0edef] border border-[#c6c6cd] rounded-xl overflow-hidden">
            <div className="h-48 bg-[#dcd9db] flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-[#76777d]">business</span>
            </div>
            <div className="p-6">
              <h3 className="text-[24px] font-semibold text-black mb-2">Why post here?</h3>
              <p className="text-[14px] text-[#45464d] mb-6">erhvervsmarked reaches over 15,000 verified investors looking for stable acquisitions in Northern Europe and the Middle East.</p>
              <ul className="space-y-3">
                {["Verified Buyer Network", "Secure NDA Framework", "Valuations Support"].map(item => (
                  <li key={item} className="flex gap-3 items-center text-[14px] font-medium">
                    <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#dce0e4] text-[#5e6367] p-6 rounded-xl">
            <span className="text-[12px] font-semibold uppercase tracking-widest opacity-70">Need Help?</span>
            <p className="text-[16px] font-bold mt-2">Talk to an M&A Advisor</p>
            <p className="text-[14px] mt-2">Our team can help you prepare your financial data for the next step.</p>
            <button className="mt-4 w-full py-2 bg-white text-[#5a5f62] font-bold text-[12px] uppercase tracking-widest rounded-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}