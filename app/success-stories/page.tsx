import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stories = [
  {
    id: "1",
    buyer: "Anders Koch",
    seller: "Birgit Larsen",
    business: "Larsen Bakery Chain",
    location: "Copenhagen",
    value: "3.8M DKK",
    days: 31,
    category: "Cafe & Food",
    quote: "I found the listing on a Tuesday. By Friday I had a signed NDA and access to the financials. We closed in under 5 weeks — something my lawyer said was nearly impossible through traditional brokers.",
    initials: "AK",
  },
  {
    id: "2",
    buyer: "Nordic Capital Group",
    seller: "Poul Sørensen",
    business: "FleetTrack SaaS",
    location: "Aarhus",
    value: "11.2M DKK",
    days: 58,
    category: "Tech & SaaS",
    quote: "As a founder, I was nervous about the process. erhvervsmarked gave us a data room, NDA templates, and connected us directly with four qualified buyers. The whole thing felt professional from day one.",
    initials: "PS",
  },
  {
    id: "3",
    buyer: "Maria Vestergaard",
    seller: "Erik Christensen",
    business: "Christensen Physio Clinic",
    location: "Aalborg",
    value: "1.9M DKK",
    days: 44,
    category: "Healthcare",
    quote: "I was a first-time buyer with no M&A experience. The platform walked me through every step — due diligence checklist, legal templates, valuation guidance. I felt confident the whole way.",
    initials: "MV",
  },
  {
    id: "4",
    buyer: "GreenRoute Logistics A/S",
    seller: "Hans-Peter Møller",
    business: "Møller Last Mile",
    location: "Odense",
    value: "5.5M DKK",
    days: 39,
    category: "Logistics",
    quote: "We were looking for a fleet to expand our network. Found exactly what we needed — verified assets, clean financials, motivated seller. Smooth handover. Would absolutely use erhvervsmarked again.",
    initials: "GR",
  },
];

const stats = [
  { value: "340+", label: "Completed Deals" },
  { value: "42 Days", label: "Average Time to Close" },
  { value: "DKK 2.1B", label: "Total Deal Value" },
  { value: "98%", label: "Buyer Satisfaction" },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Success Stories
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              Real Deals. Real People.
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Over 340 completed transactions across Denmark. Here are the stories behind some of them.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-primary text-on-primary py-lg">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-xl text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-headline-lg font-manrope font-bold">{s.value}</p>
                  <p className="text-on-primary/60 font-inter text-body-sm mt-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter space-y-xl">
            {stories.map((story, i) => (
              <div
                key={story.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-xl items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                {/* Info card */}
                <div className={`bg-surface-container-low rounded-2xl p-xl border border-outline-variant ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  <div className="flex items-center gap-md mb-md">
                    <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-manrope font-bold text-headline-md shrink-0">
                      {story.initials}
                    </div>
                    <div>
                      <p className="font-manrope font-semibold text-body-md">{story.buyer}</p>
                      <p className="text-body-sm font-inter text-secondary">Acquired from {story.seller}</p>
                    </div>
                  </div>
                  <blockquote className="text-body-md font-inter text-on-surface-variant italic border-l-4 border-primary pl-md mb-md">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Deal details */}
                <div className={`space-y-md ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  <div>
                    <span className="inline-block bg-secondary-container text-on-secondary-container text-[11px] font-inter font-semibold px-sm py-1 rounded-full tracking-widest uppercase mb-sm">
                      {story.category}
                    </span>
                    <h2 className="text-headline-lg font-manrope font-bold">{story.business}</h2>
                    <p className="text-secondary font-inter text-body-md mt-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {story.location}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant">
                      <p className="text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Deal Value</p>
                      <p className="text-headline-md font-manrope font-bold text-primary">{story.value}</p>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant">
                      <p className="text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Time to Close</p>
                      <p className="text-headline-md font-manrope font-bold">{story.days} days</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-xl bg-surface-container-low text-center">
          <div className="max-w-container-max mx-auto px-gutter space-y-md">
            <h2 className="text-headline-lg font-manrope font-semibold">Ready to Write Your Story?</h2>
            <p className="text-secondary font-inter text-body-md max-w-lg mx-auto">Browse verified listings or list your business today.</p>
            <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
              <Link href="/browse" className="bg-primary text-on-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all">
                Browse Listings
              </Link>
              <Link href="/post-ad" className="border-2 border-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:bg-primary hover:text-on-primary transition-all">
                List Your Business
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
