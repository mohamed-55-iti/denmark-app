import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { icon: "restaurant", label: "F&B" },
  { icon: "precision_manufacturing", label: "Manufacturing" },
  { icon: "laptop_mac", label: "SaaS" },
  { icon: "local_shipping", label: "Logistics" },
  { icon: "health_and_safety", label: "Healthcare" },
  { icon: "storefront", label: "Retail" },
];

const featuredListings = [
  {
    id: "1",
    title: "Artisan Coffee House",
    price: "2.4M DKK",
    description: "Prime location in Indre By. High foot traffic and established loyal customer base.",
    badge: "Verified",
    stat1Label: "REVENUE",
    stat1Value: "1.2M / Yr",
    stat2Label: "LOCATION",
    stat2Value: "Copenhagen",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGuclqPwT_mlh92oQeeSh4_CrvGwnZR0hx1Rql8bA_0K7LOP82bjG7ObidghjV2P1sLl3ySEgytUFkRTjgMEmLMsqXhl2aKks9quBpNjYPqYWgZ3rbwCvziDU8UfvFg4IQRcwpcQszDuXVklZOsxm2fVFwNw6onU3-aN2l9_2R9vDZIO-2BgClViEIFkx67ynl-ilfFVXH2NHL9myQ0OFVHpIMH7hp5_RgFEezRwlvwlsbnTAGI04NyvSKKwtIFnjSCAIs-7uTpXg",
  },
  {
    id: "2",
    title: "Inventory SaaS Platform",
    price: "4.8M DKK",
    description: "Scaling B2B platform with 85% gross margins and recurring revenue streams.",
    badge: "Hot",
    stat1Label: "MRR",
    stat1Value: "140K DKK",
    stat2Label: "INDUSTRY",
    stat2Value: "Technology",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9igeYONrIrmtWE3ahIzKD769xMNd_oSatIiLZJNxpsBRgOA2rxVG-SXiru-lXVFGIiOPKYPORqoGSsqEF4HRSiebFs-MtM37tFTviwkLAKZLPInhguN_CsEQKRDpMThMDpg5lcTmLnp4AOhn4aQD88GxywYMg0jhfhgbV6ao1Jocub9aDgwSqzyDcIq_NGnapDxjSccE7XbsbjkJOf30N4P9_SpcQdW-Vx6L7cyoYKgLQG4mp3jzK4JGKNGRsuzjfHeRh4PPaO3s",
  },
  {
    id: "3",
    title: "Last-Mile Logistics",
    price: "3.2M DKK",
    description: "Fleet of 12 electric vans with active long-term contracts in Aarhus region.",
    badge: "Verified",
    stat1Label: "ASSETS",
    stat1Value: "1.8M DKK",
    stat2Label: "LOCATION",
    stat2Value: "Aarhus",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4l4qC8t1QhimK0ALHvUGjOnUbT2dPxNHoKMBBUZhIlvolQldXdwSodHT4NN6fJPuURPDh3oOdgf13M4HfICPYGhinz4pTVgcvgGD47rk9yxVUY2inqtxuJ76EvKHp-J836iTltJCuIFkx67ynl-ilfFVXH2NHL9myQ0OFVHpIMH7hp5_RgFEezRwlvwlsbnTAGI04NyvSKKwtIFnjSCAIs-7uTpXg",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-surface py-xl px-gutter">
        <div className="max-w-container-max mx-auto text-center space-y-md">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-label-caps px-md py-xs rounded-full">
            Denmark&apos;s Premier Business Marketplace
          </span>
          <h1 className="text-headline-lg font-headline-lg font-manrope max-w-3xl mx-auto leading-tight">
            Acquire or Exit a Business with Full Transparency
          </h1>
          <p className="text-on-surface-variant text-body-md max-w-xl mx-auto">
            Browse verified listings across Scandinavia. Connect directly with founders, review financials, and close deals — no brokers, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
            <Link
              href="/browse"
              className="bg-primary text-on-primary px-xl py-sm rounded-lg font-label-caps font-bold text-label-caps hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Browse Businesses
            </Link>
            <Link
              href="/post-ad"
              className="border-2 border-primary text-primary px-xl py-sm rounded-lg font-label-caps font-bold text-label-caps hover:bg-primary hover:text-on-primary transition-all"
            >
              List Your Business
            </Link>
          </div>
          <div className="flex justify-center gap-xl pt-lg flex-wrap">
            {["15,000+ Investors", "1,200 Verified Listings", "Avg. 42 Days to Close"].map((s) => (
              <div key={s} className="text-center">
                <span className="block text-headline-md font-headline-md font-manrope">{s.split(" ")[0]}</span>
                <span className="text-body-sm text-on-surface-variant">{s.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-lg bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex gap-md justify-center flex-wrap">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={`/browse?category=${c.label}`}
                className="group flex flex-col items-center gap-xs p-md min-w-[100px] rounded-xl hover:bg-surface-container transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <span className="text-label-caps font-label-caps">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="text-headline-lg font-headline-lg font-manrope mb-xs">Featured Opportunities</h2>
              <p className="text-on-surface-variant text-body-md">Hand-picked premium listings from verified sellers.</p>
            </div>
            <Link href="/browse" className="text-primary font-bold flex items-center gap-xs hover:gap-sm transition-all text-label-caps font-label-caps">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-outline-variant">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={listing.img}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-sm right-sm bg-surface/90 backdrop-blur px-xs py-1 rounded text-label-caps font-label-caps text-primary border border-outline-variant">
                    {listing.badge}
                  </div>
                </div>
                <div className="p-md">
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className="text-headline-md font-headline-md font-manrope">{listing.title}</h3>
                    <span className="text-primary font-bold whitespace-nowrap ml-xs">{listing.price}</span>
                  </div>
                  <p className="text-on-surface-variant text-body-sm mb-md">{listing.description}</p>
                  <div className="grid grid-cols-2 gap-sm border-t border-outline-variant pt-md mb-md">
                    <div>
                      <span className="block text-label-caps font-label-caps text-on-secondary-container">{listing.stat1Label}</span>
                      <span className="font-bold text-body-md">{listing.stat1Value}</span>
                    </div>
                    <div>
                      <span className="block text-label-caps font-label-caps text-on-secondary-container">{listing.stat2Label}</span>
                      <span className="font-bold text-body-md">{listing.stat2Value}</span>
                    </div>
                  </div>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="block w-full border-2 border-primary text-primary text-center py-xs rounded-lg font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h2 className="text-headline-lg font-headline-lg font-manrope mb-xs">How NordicMarket Works</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto text-body-md">Three simple steps to secure your next business acquisition or exit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              { n: "1", title: "Discover", desc: "Browse verified listings across Denmark with detailed financial data and asset lists." },
              { n: "2", title: "Verify", desc: "Communicate directly with sellers through our secure portal and review audited documents." },
              { n: "3", title: "Close", desc: "Use our NDA framework and legal templates to finalize your acquisition seamlessly." },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mb-md font-manrope text-headline-md font-bold shadow-lg">
                  {step.n}
                </div>
                <h3 className="text-headline-md font-headline-md font-manrope mb-xs">{step.title}</h3>
                <p className="text-on-surface-variant text-body-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-xl bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-gutter text-center space-y-md">
          <h2 className="text-headline-lg font-headline-lg font-manrope">Ready to Find Your Next Acquisition?</h2>
          <p className="text-on-primary/70 text-body-md max-w-lg mx-auto">
            Join 15,000+ investors and founders already using NordicMarket.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
            <Link
              href="/browse"
              className="bg-on-primary text-primary px-xl py-sm rounded-lg font-label-caps font-bold text-label-caps hover:opacity-90 transition-all shadow-md"
            >
              Browse Listings
            </Link>
            <Link
              href="/post-ad"
              className="border-2 border-on-primary text-on-primary px-xl py-sm rounded-lg font-label-caps font-bold text-label-caps hover:bg-on-primary hover:text-primary transition-all"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}