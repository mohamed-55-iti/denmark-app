import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const templates = [
  {
    category: "Confidentiality",
    icon: "lock",
    items: [
      {
        name: "Standard NDA (Bilateral)",
        desc: "Mutual non-disclosure for both buyer and seller. Covers financials, operations, and customer data.",
        format: "DOCX + PDF",
        tier: "Free",
        downloadUrl: "/templates/nda-bilateral.docx",
        fileName: "erhvervsmarked-nda-bilateral.docx",
      },
      {
        name: "One-Way NDA (Buyer-Side)",
        desc: "Unilateral confidentiality agreement protecting seller information during initial due diligence.",
        format: "DOCX + PDF",
        tier: "Free",
        downloadUrl: "/templates/nda-buyer-side.docx",
        fileName: "erhvervsmarked-nda-buyer-side.docx",
      },
    ],
  },
  {
    category: "Letters of Intent",
    icon: "edit_note",
    items: [
      {
        name: "Letter of Intent (Asset Purchase)",
        desc: "Non-binding LOI template for the acquisition of business assets, equipment, and contracts.",
        format: "DOCX",
        tier: "Pro",
        downloadUrl: null,
        fileName: null,
      },
      {
        name: "Letter of Intent (Share Purchase)",
        desc: "LOI covering share-based acquisition with exclusivity, timeline, and condition precedents.",
        format: "DOCX",
        tier: "Pro",
        downloadUrl: null,
        fileName: null,
      },
    ],
  },
  {
    category: "Due Diligence",
    icon: "fact_check",
    items: [
      {
        name: "Due Diligence Checklist (Full)",
        desc: "130-item checklist covering financial, legal, HR, IT, and operational due diligence.",
        format: "XLSX + PDF",
        tier: "Free",
        downloadUrl: "/templates/due-diligence-checklist.xlsx",
        fileName: "erhvervsmarked-due-diligence-checklist.xlsx",
      },
      {
        name: "Financial Data Request List",
        desc: "Standardized list of financial documents to request from the seller before making an offer.",
        format: "DOCX",
        tier: "Free",
        downloadUrl: "/templates/financial-data-request.docx",
        fileName: "erhvervsmarked-financial-data-request.docx",
      },
    ],
  },
  {
    category: "Purchase Agreements",
    icon: "gavel",
    items: [
      {
        name: "Asset Purchase Agreement (Template)",
        desc: "Comprehensive APA template. Requires legal review before signing. Danish law compliant.",
        format: "DOCX",
        tier: "Pro",
        downloadUrl: null,
        fileName: null,
      },
      {
        name: "Share Purchase Agreement (Template)",
        desc: "SPA template with reps, warranties, and closing conditions. Danish law compliant.",
        format: "DOCX",
        tier: "Pro",
        downloadUrl: null,
        fileName: null,
      },
    ],
  },
];

const tierColor: Record<string, string> = {
  Free: "bg-green-50 text-green-700 border-green-200",
  Pro: "bg-secondary-container text-on-secondary-container border-outline-variant",
};

export default function LegalTemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Legal Resources
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              M&amp;A Legal Templates
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Battle-tested legal document templates for Danish business acquisitions. Drafted by M&amp;A lawyers and reviewed annually.
            </p>
            <p className="text-body-sm font-inter text-secondary mt-md">
              ⚠️ Templates are starting points only. Always consult a qualified Danish lawyer before signing binding agreements.
            </p>
          </div>
        </section>

        {/* Templates */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter space-y-xl">
            {templates.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-sm mb-lg">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[22px]">{group.icon}</span>
                  </div>
                  <h2 className="text-headline-md font-manrope font-semibold">{group.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {group.items.map((item) => (
                    <div key={item.name} className="bg-surface-container-low rounded-xl p-lg border border-outline-variant flex flex-col gap-sm">
                      <div className="flex items-start justify-between gap-sm">
                        <h3 className="font-manrope font-semibold text-body-md leading-snug">{item.name}</h3>
                        <span className={`text-[11px] font-inter font-semibold px-sm py-1 rounded-full border shrink-0 ${tierColor[item.tier]}`}>
                          {item.tier}
                        </span>
                      </div>
                      <p className="text-body-sm font-inter text-secondary">{item.desc}</p>
                      <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant">
                        <span className="text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[16px]">description</span>
                          {item.format}
                        </span>
                        {item.tier === "Free" && item.downloadUrl ? (
                          <a
                            href={item.downloadUrl}
                            download={item.fileName}
                            className="bg-primary text-on-primary px-md py-xs rounded-lg font-inter text-label-caps hover:opacity-90 transition-all flex items-center gap-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            Download
                          </a>
                        ) : (
                          <Link href="/pricing" className="border border-primary text-primary px-md py-xs rounded-lg font-inter text-label-caps hover:bg-primary hover:text-on-primary transition-all flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[16px]">lock</span>
                            Pro Plan
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer + CTA */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-2xl mx-auto px-gutter text-center">
            <div className="bg-surface border border-outline-variant rounded-2xl p-xl mb-xl">
              <span className="material-symbols-outlined text-primary text-[40px] mb-md block" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
              <h3 className="font-manrope font-semibold text-headline-md mb-sm">Legal Disclaimer</h3>
              <p className="font-inter text-body-sm text-secondary">
                These templates are provided for informational and drafting assistance purposes only. They do not constitute legal advice. erhvervsmarked strongly recommends engaging a Danish-qualified lawyer before executing any binding legal document related to a business acquisition.
              </p>
            </div>
            <Link href="/due-diligence" className="inline-flex items-center gap-xs text-primary font-inter font-semibold hover:gap-sm transition-all">
              Read our Due Diligence Guide <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}