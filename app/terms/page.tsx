"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "acceptance",
    icon: "handshake",
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using erhvervsmarked (\"the Platform\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, please do not use the Platform.",
      "These Terms constitute a legally binding agreement between you and erhvervsmarked ApS, a company registered in Denmark (CVR: XXXXXXXX), regarding your use of the Platform and all related services.",
      "We reserve the right to update or modify these Terms at any time. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    id: "eligibility",
    icon: "verified_user",
    title: "2. Eligibility & Registration",
    content: [
      "You must be at least 18 years of age and have full legal capacity to enter into binding contracts under Danish law to use the Platform.",
      "When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "erhvervsmarked reserves the right to suspend or terminate accounts that violate these Terms or that provide inaccurate or misleading information.",
    ],
  },
  {
    id: "platform-use",
    icon: "storefront",
    title: "3. Platform Use & Listings",
    content: [
      "The Platform serves as a marketplace connecting buyers and sellers of Danish businesses. We do not act as a broker, agent, or advisor in any transaction.",
      "Sellers are solely responsible for the accuracy and completeness of all listing information, including but not limited to financial figures, asset descriptions, legal status, and operational details.",
      "All listings must relate to legitimate businesses operating in Denmark or the Nordic region. Listings for illegal operations, shell companies with no genuine business activity, or businesses that violate Danish law are strictly prohibited.",
      "erhvervsmarked reserves the right to remove any listing that violates these Terms or that we deem inappropriate, without prior notice or liability.",
    ],
  },
  {
    id: "pro-features",
    icon: "workspace_premium",
    title: "4. Pro Plan & Subscriptions",
    content: [
      "Certain features of the Platform, including access to legal templates, priority listing placement, and advanced analytics, require a Pro subscription.",
      "Subscriptions are billed monthly or annually as selected at the time of purchase. All fees are quoted and charged in Danish Krone (DKK) and are inclusive of applicable VAT.",
      "You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period, and no partial refunds are issued for unused time.",
      "erhvervsmarked reserves the right to modify subscription pricing with 30 days' advance notice to existing subscribers.",
    ],
  },
  {
    id: "legal-templates",
    icon: "description",
    title: "5. Legal Templates & Documents",
    content: [
      "Legal templates available on the Platform are provided for informational and drafting assistance purposes only. They do not constitute legal advice, and their use does not create a lawyer-client relationship with erhvervsmarked or any of its affiliates.",
      "Templates are drafted as general starting points and may not reflect recent changes in Danish law. erhvervsmarked strongly recommends that all parties engage a qualified Danish lawyer before executing any binding legal agreement.",
      "erhvervsmarked accepts no liability for losses, damages, or disputes arising from the use of Platform-provided templates without independent legal review.",
    ],
  },
  {
    id: "prohibited",
    icon: "block",
    title: "6. Prohibited Conduct",
    content: [
      "You agree not to use the Platform to post false, misleading, or fraudulent listings or information.",
      "You may not use the Platform to circumvent our fee structure, including by conducting off-platform transactions with contacts identified through the Platform in order to avoid applicable fees.",
      "You may not scrape, crawl, or systematically extract data from the Platform without our prior written consent.",
      "Any attempt to manipulate Platform rankings, reviews, or verification status through illegitimate means is strictly prohibited and may result in immediate account termination and legal action.",
    ],
  },
  {
    id: "liability",
    icon: "balance",
    title: "7. Limitation of Liability",
    content: [
      "erhvervsmarked provides the Platform on an \"as is\" and \"as available\" basis. We make no warranties, express or implied, regarding the accuracy of listings, the suitability of any business for purchase, or the outcome of any transaction.",
      "To the maximum extent permitted by Danish law, erhvervsmarked shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the Platform, even if we have been advised of the possibility of such damages.",
      "Our total aggregate liability to you for any claims arising from your use of the Platform shall not exceed the total fees you have paid to erhvervsmarked in the 12 months preceding the claim.",
    ],
  },
  {
    id: "governing-law",
    icon: "gavel",
    title: "8. Governing Law & Disputes",
    content: [
      "These Terms are governed by and construed in accordance with the laws of Denmark, without regard to its conflict of law principles.",
      "Any dispute arising from or relating to these Terms or your use of the Platform shall be submitted to the exclusive jurisdiction of the Copenhagen City Court (Københavns Byret) as the court of first instance.",
      "Before initiating legal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at legal@erhvervsmarked.dk. We will make good-faith efforts to resolve disputes within 30 days of receiving notice.",
    ],
  },
  {
    id: "contact",
    icon: "mail",
    title: "9. Contact",
    content: [
      "If you have questions about these Terms, please contact us at legal@erhvervsmarked.dk or by post at: erhvervsmarked ApS, Vesterbrogade 34, 1620 Copenhagen V, Denmark.",
      "For general support inquiries unrelated to legal matters, please visit our Contact page or use the in-app support chat.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-surface-container-low border-b border-outline-variant py-xl px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-center gap-xs text-on-surface-variant text-body-sm mb-md">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Terms of Service</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
            <div>
              <span className="inline-flex items-center gap-xs bg-secondary-container text-on-secondary-container text-label-caps font-label-caps px-md py-xs rounded-full mb-md">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Legal
              </span>
              <h1 className="text-headline-lg font-headline-lg font-manrope">Terms of Service</h1>
              <p className="text-on-surface-variant text-body-md mt-xs max-w-lg">
                Please read these terms carefully before using the erhvervsmarked platform.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-xs text-body-sm text-on-surface-variant shrink-0">
              <span>Last updated: <strong className="text-on-surface">1 January 2025</strong></span>
              <span>Effective: <strong className="text-on-surface">1 January 2025</strong></span>
              <span>Jurisdiction: <strong className="text-on-surface">Denmark</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-xl items-start">

            {/* Sticky sidebar nav */}
            <aside className="hidden lg:block sticky top-8">
              <p className="text-label-caps font-label-caps text-on-surface-variant mb-md">On this page</p>
              <nav className="flex flex-col gap-xs">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-primary transition-colors py-xs px-sm rounded-lg hover:bg-surface-container group"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-secondary-container group-hover:text-primary transition-colors">
                      {s.icon}
                    </span>
                    <span className="text-[13px] leading-tight">{s.title.replace(/^\d+\.\s/, "")}</span>
                  </a>
                ))}
              </nav>

              {/* Quick links */}
              <div className="mt-xl pt-xl border-t border-outline-variant">
                <p className="text-label-caps font-label-caps text-on-surface-variant mb-md">Related</p>
                <div className="flex flex-col gap-xs">
                  <Link href="/privacy" className="flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">privacy_tip</span>
                    Privacy Policy
                  </Link>
                  <Link href="/legal-templates" className="flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    Legal Templates
                  </Link>
                  <Link href="/contact" className="flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    Contact Support
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="space-y-xl">

              {/* Intro notice */}
              <div className="bg-surface-container rounded-xl border border-outline-variant p-lg flex gap-md">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                  info
                </span>
                <div>
                  <p className="font-manrope font-semibold text-body-md mb-xs">Before you proceed</p>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    These Terms of Service govern your use of the erhvervsmarked platform. They are written in English for legal clarity, but the governing language for all disputes is Danish. By continuing to use the Platform, you confirm that you have read and understood these Terms.
                  </p>
                </div>
              </div>

              {/* Sections */}
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-8"
                >
                  <div className="flex items-center gap-md mb-md pb-sm border-b border-outline-variant">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">{section.icon}</span>
                    </div>
                    <h2 className="text-headline-md font-headline-md font-manrope">{section.title}</h2>
                  </div>
                  <div className="space-y-md pl-0 lg:pl-[56px]">
                    {section.content.map((para, i) => (
                      <p key={i} className="text-body-md text-on-surface leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Final notice */}
              <div className="bg-primary text-on-primary rounded-xl p-lg mt-xl">
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-[28px] shrink-0 mt-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    counseling
                  </span>
                  <div>
                    <p className="font-manrope font-bold text-body-md mb-xs">Need legal advice?</p>
                    <p className="text-on-primary/80 text-body-sm mb-md leading-relaxed">
                      These Terms are not a substitute for professional legal counsel. If you are considering acquiring or selling a business, we strongly recommend consulting a qualified Danish M&A lawyer.
                    </p>
                    <div className="flex flex-wrap gap-md">
                      <Link
                        href="/legal-templates"
                        className="inline-flex items-center gap-xs bg-on-primary text-primary px-lg py-xs rounded-lg text-label-caps font-label-caps font-bold hover:opacity-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">description</span>
                        Legal Templates
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-xs border-2 border-on-primary text-on-primary px-lg py-xs rounded-lg text-label-caps font-label-caps font-bold hover:bg-on-primary hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
