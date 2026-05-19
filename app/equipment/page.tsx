"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const equipmentListings = [
  {
    id: "e1", title: "CNC Milling Machine – DMG MORI", price: "280,000 DKK", category: "Manufacturing",
    year: 2019, condition: "Excellent", location: "Odense",
    desc: "5-axis CNC milling center, low operating hours. Full service history. Includes tooling set.",
    icon: "precision_manufacturing",
  },
  {
    id: "e2", title: "Mercedes Sprinter Refrigerated Van", price: "145,000 DKK", category: "Logistics",
    year: 2021, condition: "Good", location: "Copenhagen",
    desc: "Dual-zone refrigeration, 3.5t payload. Used for food distribution. Ready for immediate handover.",
    icon: "local_shipping",
  },
  {
    id: "e3", title: "Commercial Espresso Machine – La Marzocco", price: "38,000 DKK", category: "Cafe & Food",
    year: 2022, condition: "Excellent", location: "Aarhus",
    desc: "3-group La Marzocco Linea PB. Minimal use, descaled and serviced. Perfect for cafe acquisitions.",
    icon: "local_cafe",
  },
  {
    id: "e4", title: "Forklift – Toyota 8FBM20", price: "95,000 DKK", category: "Logistics",
    year: 2020, condition: "Good", location: "Aalborg",
    desc: "Electric counterbalance forklift, 2000kg capacity. Battery recently replaced. Inspection passed 2024.",
    icon: "forklift",
  },
  {
    id: "e5", title: "Server Rack – Dell PowerEdge x6", price: "62,000 DKK", category: "Tech",
    year: 2021, condition: "Excellent", location: "Copenhagen",
    desc: "6x Dell PowerEdge R740 rack servers, 48-core each, 512GB RAM per node. Full rack included.",
    icon: "dns",
  },
  {
    id: "e6", title: "Dental Chair – Sirona Intego", price: "112,000 DKK", category: "Healthcare",
    year: 2020, condition: "Very Good", location: "Frederiksberg",
    desc: "Complete dental unit with integrated X-ray arm. Selling as part of practice wind-down.",
    icon: "medical_services",
  },
];

const categories = ["All", "Manufacturing", "Logistics", "Cafe & Food", "Tech", "Healthcare"];
const conditionColors: Record<string, string> = {
  "Excellent": "text-green-700 bg-green-50",
  "Very Good": "text-blue-700 bg-blue-50",
  "Good": "text-yellow-700 bg-yellow-50",
};

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = equipmentListings.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl">
          <div className="max-w-container-max mx-auto px-gutter text-center">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Equipment Exchange
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">
              Commercial Equipment Listings
            </h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Buy and sell verified commercial equipment across Denmark — machinery, vehicles, tech infrastructure, and more.
            </p>
            {/* Search */}
            <div className="max-w-lg mx-auto mt-lg bg-surface rounded-xl shadow-md flex items-center gap-xs px-md border border-outline-variant">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search equipment..."
                className="flex-1 py-md bg-transparent border-none focus:outline-none font-inter text-body-md"
              />
            </div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-gutter">
            {/* Category filters */}
            <div className="flex gap-sm flex-wrap mb-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-md py-xs rounded-full font-inter text-label-caps font-semibold border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface text-secondary border-outline-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-body-sm font-inter text-secondary mb-lg">{filtered.length} listings found</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {filtered.map((item) => (
                <div key={item.id} className="bg-surface rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-all group">
                  <div className="h-36 bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[64px]" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                  </div>
                  <div className="p-md">
                    <div className="flex justify-between items-start mb-xs">
                      <h3 className="text-body-md font-manrope font-semibold leading-snug">{item.title}</h3>
                      <span className="text-primary font-bold font-inter text-body-md whitespace-nowrap ml-xs">{item.price}</span>
                    </div>
                    <p className="text-body-sm font-inter text-secondary mb-md">{item.desc}</p>
                    <div className="flex flex-wrap gap-xs mb-md">
                      <span className="bg-surface-container-low border border-outline-variant text-secondary text-[11px] font-inter font-semibold px-xs py-1 rounded tracking-wide">{item.year}</span>
                      <span className={`text-[11px] font-inter font-semibold px-xs py-1 rounded tracking-wide ${conditionColors[item.condition]}`}>{item.condition}</span>
                      <span className="bg-surface-container-low border border-outline-variant text-secondary text-[11px] font-inter font-semibold px-xs py-1 rounded tracking-wide flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>{item.location}
                      </span>
                    </div>
                    <Link
                      href={`/equipment/${item.id}`}
                      className="block w-full border-2 border-primary text-primary text-center py-xs rounded-lg font-inter text-label-caps hover:bg-primary hover:text-on-primary transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-xl">
                <span className="material-symbols-outlined text-outline text-[64px]">search_off</span>
                <p className="text-headline-md font-manrope font-semibold text-on-surface-variant mt-md">No equipment found</p>
                <p className="text-body-sm font-inter text-secondary mt-xs">Try a different search or category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Post CTA */}
        <section className="py-xl bg-primary text-on-primary text-center">
          <div className="max-w-container-max mx-auto px-gutter space-y-md">
            <h2 className="text-headline-lg font-manrope font-bold">Have Equipment to Sell?</h2>
            <p className="text-on-primary/70 font-inter text-body-md max-w-lg mx-auto">
              List your commercial equipment for free and reach thousands of verified buyers across Scandinavia.
            </p>
            <Link href="/post-ad" className="inline-block bg-on-primary text-primary px-xl py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all mt-md">
              Post Equipment Listing
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
