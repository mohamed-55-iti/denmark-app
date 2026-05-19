import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { icon: "restaurant", label: "Cafe & Food" },
  { icon: "devices", label: "Tech & SaaS" },
  { icon: "local_shipping", label: "Logistics" },
  { icon: "handyman", label: "Services" },
  { icon: "storefront", label: "Retail" },
  { icon: "local_hospital", label: "Healthcare" },
  { icon: "construction", label: "Construction" },
  { icon: "more_horiz", label: "Other" },
];

const featuredListings = [
  {
    title: "Artisan Coffee House",
    price: "2.4M DKK",
    desc: "Prime location in Indre By. High foot traffic and established loyal customer base.",
    stat1Label: "REVENUE",
    stat1Val: "1.2M / Yr",
    stat2Label: "LOCATION",
    stat2Val: "Copenhagen",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGuclqPwT_mlh92oQeeSh4_CrvGwnZR0hx1Rql8bA_0K7LOP82bjG7ObidghjV2P1sLl3ySEgytUFkRTjgMEmLMsqXhl2aKks9quBpNjYPqYWgZ3rbwCvziDU8UfvFg4IQRcwpcQszDuXVklZOsxm2fVFwNw6onU3-aN2l9_2R9vDZIO-2BgClViEIFkx67ynl-ilfFVXH2NHL9myQ0OFVHpIMH7hp5_RgFEezRwlvwlsbnTAGI04NyvSKKwtIFnjSCAIs-7uTpXg",
  },
  {
    title: "Inventory SaaS Platform",
    price: "4.8M DKK",
    desc: "Scaling B2B platform with 85% gross margins and recurring revenue streams.",
    stat1Label: "MRR",
    stat1Val: "140K DKK",
    stat2Label: "INDUSTRY",
    stat2Val: "Technology",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9igeYONrIrmtWE3ahIzKD769xMNd_oSatIiLZJNxpsBRgOA2rxVG-SXiru-lXVFGIiOPKYPORqoGSsqEF4HRSiebFs-MtM37tFTviwkLAKZLPInhguN_CsEQKRDpMThMDpg5lcTmLnp4AOhn4aQD88GxywYMg0jhfhgbV6ao1Jocub9aDgwSqzyDcIq_NGnapDxjSccE7XbsbjkJOf30N4P9_SpcQdW-Vx6L7cyoYKgLQG4mp3jzK4JGKNGRsuzjfHeRh4PPaO3s",
  },
  {
    title: "Last-Mile Logistics",
    price: "3.2M DKK",
    desc: "Fleet of 12 electric vans with active long-term contracts in Aarhus region.",
    stat1Label: "ASSETS",
    stat1Val: "1.8M DKK",
    stat2Label: "LOCATION",
    stat2Val: "Aarhus",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4l4qC8t1QhimK0ALHvUGjOnUbT2dPxNHoKMBBUZhIlvolQldXdwSodHT4NN6fJPuURPDh3oOdgf13M4HfICPYGhinz4pTVgcvgGD47rk9yxVUY2inqtxuJ76EvKHp-J836iTltJCuIHBT_f5umkNlf7A3eQL7eIK0HXYpOZ1Z2Jfs1c_XvxL-hJea6YWCE19QlENuyLCl89MJg6W_cRfS3EcIqprswwe0zVy8Uk8Tcct7WUXHuk1AqoAoja3ScOrTmLzaCTgjAEk",
  },
];

const stats = [
  { value: "2,400+", label: "Active Listings" },
  { value: "DKK 4.2B", label: "Total Listed Value" },
  { value: "98%", label: "Verified Sellers" },
  { value: "340+", label: "Successful Exits" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-surface-container overflow-hidden py-xl md:py-[120px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoS-wDejNKFaBiKSR3ZAyR1UDUTU7lCs4LZqlszPB5AzI9RPFuIt-nuIMZka8GRXesapA3Fv8m3QvcUobcIgrDResVklB6a-GmFf_a30L-OH-YsTOJrPLhmlR4xcAM2gzm6CYjxPBmYccmFhvTe1a7wqfvvCkGY8AQfhObGAFx27xyJ0LgzF4r0ROaQSRhR8HKtKPAaaMEMcN3XydWp76hgOUj77St_x7t801-oEfHsN9WEDUfjOoIY5AefBUseg6472nUo4bldpQ"
              alt="erhvervsmarked.dk workspace"
            />
          </div>
          <div className="relative max-w-container-max mx-auto px-gutter text-center">
            <div className="inline-flex items-center gap-xs bg-tertiary-fixed text-on-tertiary-fixed px-sm py-1 rounded-full mb-md">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-label-caps font-inter">Denmark&apos;s #1 Secure Exchange</span>
            </div>
            <h1 className="text-headline-xl font-manrope font-bold mb-md max-w-3xl mx-auto leading-tight tracking-tight">
              The Trusted Exchange for Small Businesses in Denmark.
            </h1>
            <p className="text-body-lg font-inter text-secondary mb-xl max-w-2xl mx-auto">
              Securely buy and sell established companies, high-value equipment, and commercial assets
              with erhvervsmarked transparency.
            </p>
            {/* Search */}
            <div className="max-w-3xl mx-auto bg-surface p-base rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-base">
              <div className="flex-1 flex items-center gap-xs px-sm w-full">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  className="w-full border-none focus:outline-none bg-transparent py-md font-inter text-body-md"
                  placeholder="Search keywords (e.g. 'Cafe in Aarhus')"
                  type="text"
                />
              </div>
              <div className="w-px h-8 bg-outline-variant hidden md:block" />
              <div className="flex-1 flex items-center gap-xs px-sm w-full">
                <span className="material-symbols-outlined text-outline">category</span>
                <select className="w-full border-none focus:outline-none bg-transparent py-md font-inter text-body-md text-secondary">
                  <option>All Categories</option>
                  <option>Technology</option>
                  <option>Logistics</option>
                  <option>Food &amp; Beverage</option>
                  <option>Retail</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <Link
                href="/browse"
                className="w-full md:w-auto bg-primary text-on-primary px-[32px] py-md rounded-lg font-manrope font-semibold text-body-md hover:opacity-90 transition-all whitespace-nowrap"
              >
                Find Opportunities
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex flex-wrap justify-center gap-md">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={`/browse?category=${cat.label}`}
                  className="group flex flex-col items-center gap-xs p-md min-w-[120px] rounded-xl hover:bg-surface-container-low transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <span className="text-label-caps font-inter">{cat.label}</span>
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
                <h2 className="text-headline-lg font-manrope font-semibold mb-base">Featured Opportunities</h2>
                <p className="text-secondary font-inter text-body-md">Hand-picked premium listings from verified sellers.</p>
              </div>
              <Link
                href="/browse"
                className="text-primary font-bold flex items-center gap-xs hover:gap-sm transition-all text-label-caps font-inter"
              >
                View All Listings <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {featuredListings.map((listing) => (
                <div
                  key={listing.title}
                  className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-outline-variant"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={listing.img}
                      alt={listing.title}
                    />
                    <div className="absolute top-sm right-sm bg-surface/90 backdrop-blur px-xs py-1 rounded text-label-caps font-inter text-primary border border-outline-variant">
                      Verified
                    </div>
                  </div>
                  <div className="p-md">
                    <div className="flex justify-between items-start mb-xs">
                      <h3 className="text-headline-md font-manrope font-semibold">{listing.title}</h3>
                      <span className="text-primary font-bold font-inter">{listing.price}</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm font-inter mb-md">{listing.desc}</p>
                    <div className="grid grid-cols-2 gap-sm border-t border-outline-variant pt-md mb-md">
                      <div>
                        <span className="block text-[10px] text-secondary font-inter font-semibold tracking-widest uppercase">
                          {listing.stat1Label}
                        </span>
                        <span className="font-bold text-body-md font-inter">{listing.stat1Val}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-secondary font-inter font-semibold tracking-widest uppercase">
                          {listing.stat2Label}
                        </span>
                        <span className="font-bold text-body-md font-inter">{listing.stat2Val}</span>
                      </div>
                    </div>
                    <Link
                      href="/listings/1"
                      className="block w-full border-2 border-primary text-primary py-xs rounded-lg text-label-caps font-inter text-center hover:bg-primary hover:text-on-primary transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-[80px] bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="text-headline-lg font-manrope font-semibold mb-base">How erhvervsmarked Works</h2>
              <p className="text-secondary font-inter max-w-xl mx-auto">
                Three simple steps to secure your next business acquisition or exit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              {[
                { n: "1", title: "Discover", desc: "Browse verified listings across Denmark with detailed financial data and asset lists." },
                { n: "2", title: "Verify", desc: "Communicate directly with sellers through our secure portal and review audited documents." },
                { n: "3", title: "Acquire", desc: "Complete your acquisition with confidence using our guided transfer process and legal support." },
              ].map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mb-md font-manrope font-bold text-headline-md shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="text-headline-md font-manrope font-semibold mb-xs">{step.title}</h3>
                  <p className="text-secondary font-inter text-body-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-xl bg-primary-container text-on-primary">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-xl text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-headline-xl font-manrope font-bold">{stat.value}</p>
                  <p className="text-on-primary/60 font-inter text-body-sm mt-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-xl bg-surface text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <h2 className="text-headline-lg font-manrope font-semibold mb-md">Ready to Buy or Sell?</h2>
            <p className="text-secondary font-inter mb-xl max-w-xl mx-auto">
              Join thousands of erhvervsmarked entrepreneurs who trust erhvervsmarked for their business transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link
                href="/browse"
                className="bg-primary text-on-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all"
              >
                Browse Listings
              </Link>
              <Link
                href="/post-ad"
                className="border-2 border-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:bg-primary hover:text-on-primary transition-all"
              >
                Post Your Business
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}