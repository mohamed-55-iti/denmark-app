import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Who We Are",
    content: `erhvervsmarked ApS (CVR: 12345678) operates the erhvervsmarked.dk platform — a marketplace for buying and selling businesses and commercial assets in Denmark and the wider Nordic region. We are the data controller for all personal data collected through this platform.\n\nContact: privacy@erhvervsmarked.dk | Vesterbrogade 34, 1620 Copenhagen V, Denmark.`,
  },
  {
    title: "2. What Data We Collect",
    content: `We collect the following categories of personal data:\n\n• **Account data**: name, email address, phone number, and company details provided during registration.\n• **Listing data**: business financial information, asset details, and documents uploaded by sellers.\n• **Usage data**: pages visited, search queries, time on site, device type, and IP address (anonymized after 90 days).\n• **Communication data**: messages sent between buyers and sellers through our secure messaging system.\n• **Payment data**: billing information processed securely through Stripe. We do not store card numbers.`,
  },
  {
    title: "3. Legal Basis for Processing",
    content: `We process your data under the following legal bases (GDPR Article 6):\n\n• **Contract performance**: to provide the marketplace services you have signed up for.\n• **Legitimate interests**: to improve platform security, prevent fraud, and send relevant platform updates.\n• **Legal obligation**: to comply with Danish bookkeeping law (Bogføringsloven) and tax reporting requirements.\n• **Consent**: for marketing emails and optional analytics cookies (you may withdraw consent at any time).`,
  },
  {
    title: "4. How We Use Your Data",
    content: `Your data is used to:\n\n• Create and manage your account and listings.\n• Facilitate secure communication between buyers and sellers.\n• Verify seller identity and financial documents for the Verified badge.\n• Process subscription payments.\n• Send transactional emails (account confirmations, listing updates, inquiry notifications).\n• Send marketing emails, if you have opted in.\n• Improve platform performance and detect fraudulent activity.`,
  },
  {
    title: "5. Data Sharing",
    content: `We do not sell your personal data. We share data only with:\n\n• **Buyers/Sellers**: contact details and listing data are shared between matched parties after NDA execution.\n• **Service providers**: Stripe (payments), AWS (hosting), SendGrid (email), Intercom (support chat) — all bound by data processing agreements.\n• **Legal authorities**: if required by court order or Danish law.\n\nAll third-party processors are GDPR-compliant and operate within the EU/EEA or under Standard Contractual Clauses.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your data for the following periods:\n\n• **Account data**: retained for the duration of your account plus 3 years after deletion (for legal compliance).\n• **Listing data**: retained for 5 years after listing closure (Danish bookkeeping requirements).\n• **Communication data**: retained for 2 years, then permanently deleted.\n• **Usage/analytics data**: anonymized after 90 days.`,
  },
  {
    title: "7. Your Rights",
    content: `Under GDPR, you have the right to:\n\n• **Access** a copy of your personal data.\n• **Rectify** inaccurate data.\n• **Erase** your data ("right to be forgotten"), subject to legal retention obligations.\n• **Restrict** processing in certain circumstances.\n• **Data portability** — receive your data in a machine-readable format.\n• **Object** to processing based on legitimate interests.\n• **Withdraw consent** for marketing at any time via your account settings.\n\nTo exercise any of these rights, email privacy@erhvervsmarked.dk. We will respond within 30 days.`,
  },
  {
    title: "8. Cookies",
    content: `We use the following cookie categories:\n\n• **Essential cookies**: required for login, security, and core functionality. Cannot be disabled.\n• **Analytics cookies**: used to understand platform usage (Google Analytics, anonymized). Opt-in only.\n• **Marketing cookies**: used to deliver relevant ads on third-party platforms. Opt-in only.\n\nYou can manage your cookie preferences at any time via the cookie banner or your account settings.`,
  },
  {
    title: "9. Contact & Complaints",
    content: `For privacy questions, contact our Data Protection Officer at privacy@erhvervsmarked.dk.\n\nIf you believe we have mishandled your data, you have the right to lodge a complaint with the Danish Data Protection Authority (Datatilsynet): www.datatilsynet.dk | +45 33 19 32 00.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">Privacy Policy</h1>
            <p className="text-body-md font-inter text-secondary">Last updated: 1 January 2025 · Effective: 1 January 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-xl bg-surface">
          <div className="max-w-3xl mx-auto px-gutter">

            {/* Summary box */}
            <div className="bg-secondary-container rounded-2xl p-lg mb-xl border border-outline-variant">
              <p className="font-manrope font-semibold text-body-md mb-xs">Plain language summary</p>
              <p className="font-inter text-body-sm text-on-surface-variant">
                We collect only the data needed to run the marketplace. We don&apos;t sell it. You can delete your account and data at any time. This policy explains everything in full — but if you have questions, just email us.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-xl">
              {sections.map((section) => (
                <div key={section.title} className="border-b border-outline-variant pb-xl last:border-0">
                  <h2 className="text-headline-md font-manrope font-semibold mb-md">{section.title}</h2>
                  <div className="font-inter text-body-sm text-secondary leading-relaxed whitespace-pre-line">
                    {section.content.split("**").map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="text-on-surface-variant font-semibold">{part}</strong> : part
                    )}
                  </div>
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
