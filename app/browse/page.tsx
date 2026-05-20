"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const listings = [
  {
    id: "1",
    title: "Copenhagen Roastery Co.",
    category: "Cafe & Food",
    location: "Copenhagen",
    price: "4.2M DKK",
    priceNum: 4.2,
    revenue: "1.8M DKK",
    ebitda: "420K DKK",
    industry: "Food & Beverage",
    badge: "Featured",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoS-wDejNKFaBiKSR3ZAyR1UDUTU7lCs4LZqlszPB5AzI9RPFuIt-nuIMZka8GRXesapA3Fv8m3QvcUobcIgrDResVklB6a-GmFf_a30L-OH-YsTOJrPLhmlR4xcAM2gzm6CYjxPBmYccmFhvTe1a7wqfvvCkGY8AQfhObGAFx27xyJ0LgzF4r0ROaQSRhR8HKtKPAaaMEMcN3XydWp76hgOUj77St_x7t801-oEfHsN9WEDUfjOoIY5AefBUseg6472nUo4bldpQ",
  },
  {
    id: "2",
    title: "erhvervsmarked SaaS Platform",
    category: "Tech & SaaS",
    location: "Aarhus",
    price: "7.5M DKK",
    priceNum: 7.5,
    revenue: "3.2M DKK",
    ebitda: "1.1M DKK",
    industry: "Technology",
    badge: "Verified",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJu_PK7BTrKRmKJMHD8Ukmq0YVggM0ISv4reoYTUD29QLP-PcrymXNCylN9G0dF4YUxgdg1rMVOxUzIffLkX1ErMTv621iYfhphNPYj71MNZ-rFbcBHEnCdFc569igIa-s7I4Ekdq6x6WmODUqbOEZsJx7MHHXtdmKPx3wtCQuEFMMkvN5X6QyDGfnoYz54YTb1g2M_eOofSxpP2dRHgAv6-89QOjVTRa6v012m-9SrV1wl_3m-TQBm_r0WdYeONTQkw8MU7G70DI",
  },
  {
    id: "3",
    title: "Last-Mile Logistics",
    category: "Logistics",
    location: "Aarhus",
    price: "3.2M DKK",
    priceNum: 3.2,
    revenue: "2.1M DKK",
    ebitda: "380K DKK",
    industry: "Logistics",
    badge: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4l4qC8t1QhimK0ALHvUGjOnUbT2dPxNHoKMBBUZhIlvolQldXdwSodHT4NN6fJPuURPDh3oOdgf13M4HfICPYGhinz4pTVgcvgGD47rk9yxVUY2inqtxuJ76EvKHp-J836iTltJCuIHBT_f5umkNlf7A3eQL7eIK0HXYpOZ1Z2Jfs1c_XvxL-hJea6YWCE19QlENuyLCl89MJg6W_cRfS3EcIqprswwe0zVy8Uk8Tcct7WUXHuk1AqoAoja3ScOrTmLzaCTgjAEk",
  },
  {
    id: "4",
    title: "Scandinavian Retail Chain",
    category: "Retail",
    location: "Odense",
    price: "5.8M DKK",
    priceNum: 5.8,
    revenue: "4.5M DKK",
    ebitda: "690K DKK",
    industry: "Retail",
    badge: "New",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoS-wDejNKFaBiKSR3ZAyR1UDUTU7lCs4LZqlszPB5AzI9RPFuIt-nuIMZka8GRXesapA3Fv8m3QvcUobcIgrDResVklB6a-GmFf_a30L-OH-YsTOJrPLhmlR4xcAM2gzm6CYjxPBmYccmFhvTe1a7wqfvvCkGY8AQfhObGAFx27xyJ0LgzF4r0ROaQSRhR8HKtKPAaaMEMcN3XydWp76hgOUj77St_x7t801-oEfHsN9WEDUfjOoIY5AefBUseg6472nUo4bldpQ",
  },
  {
    id: "5",
    title: "Professional Services Firm",
    category: "Services",
    location: "Copenhagen",
    price: "2.9M DKK",
    priceNum: 2.9,
    revenue: "1.4M DKK",
    ebitda: "310K DKK",
    industry: "Services",
    badge: "Verified",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJu_PK7BTrKRmKJMHD8Ukmq0YVggM0ISv4reoYTUD29QLP-PcrymXNCylN9G0dF4YUxgdg1rMVOxUzIffLkX1ErMTv621iYfhphNPYj71MNZ-rFbcBHEnCdFc569igIa-s7I4Ekdq6x6WmODUqbOEZsJx7MHHXtdmKPx3wtCQuEFMMkvN5X6QyDGfnoYz54YTb1g2M_eOofSxpP2dRHgAv6-89QOjVTRa6v012m-9SrV1wl_3m-TQBm_r0WdYeONTQkw8MU7G70DI",
  },
  {
    id: "6",
    title: "E-commerce Fashion Brand",
    category: "Retail",
    location: "Copenhagen",
    price: "6.1M DKK",
    priceNum: 6.1,
    revenue: "5.2M DKK",
    ebitda: "880K DKK",
    industry: "Retail & E-commerce",
    badge: "Featured",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4l4qC8t1QhimK0ALHvUGjOnUbT2dPxNHoKMBBUZhIlvolQldXdwSodHT4NN6fJPuURPDh3oOdgf13M4HfICPYGhinz4pTVgcvgGD47rk9yxVUY2inqtxuJ76EvKHp-J836iTltJCuIHBT_f5umkNlf7A3eQL7eIK0HXYpOZ1Z2Jfs1c_XvxL-hJea6YWCE19QlENuyLCl89MJg6W_cRfS3EcIqprswwe0zVy8Uk8Tcct7WUXHuk1AqoAoja3ScOrTmLzaCTgjAEk",
  },
];

const categories = ["All", "Cafe & Food", "Tech & SaaS", "Logistics", "Services", "Retail"];
const locations = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const filtered = useMemo(() => {
    let result = [...listings];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.industry.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter((l) => l.category === activeCategory);
    }

    // Price
    result = result.filter((l) => l.priceNum <= maxPrice);

    // Locations
    if (selectedLocations.length > 0) {
      result = result.filter((l) => selectedLocations.includes(l.location));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "revenue-desc":
        result.sort((a, b) => parseFloat(b.revenue) - parseFloat(a.revenue));
        break;
      default:
        // newest = original order (keep as-is)
        break;
    }

    return result;
  }, [activeCategory, maxPrice, selectedLocations, sortBy, searchQuery]);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-surface-container-low border-b border-outline-variant py-xl">
          <div className="max-w-[1280px] mx-auto px-gutter">
            <h1 className="text-[48px] font-bold leading-tight tracking-tight font-manrope mb-xs">
              Browse Listings
            </h1>
            <p className="text-secondary text-[18px] mb-lg">
              {filtered.length} verified{filtered.length !== listings.length ? " matching" : ""} businesses available for acquisition
            </p>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-md">
              <div className="flex-1 flex items-center gap-xs bg-surface px-md rounded-lg border-2 border-surface-container-high focus-within:border-primary transition-colors">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  className="w-full border-none outline-none bg-transparent py-sm text-[16px]"
                  placeholder="Search businesses, categories, locations…"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]"
                  >
                    close
                  </button>
                )}
              </div>
              <select
                className="bg-surface border-2 border-surface-container-high rounded-lg px-md py-sm text-[14px] text-secondary focus:outline-none focus:border-primary transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="revenue-desc">Revenue: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        <div className="max-w-[1280px] mx-auto px-gutter py-xl flex flex-col lg:flex-row gap-xl">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0 space-y-lg">
            {/* Category */}
            <div className="bg-surface border border-outline-variant rounded-xl p-md">
              <h3 className="text-[12px] tracking-widest font-semibold uppercase text-on-surface-variant mb-md">
                Category
              </h3>
              <ul className="space-y-xs">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-sm py-xs rounded-lg text-[14px] transition-colors ${
                        cat === activeCategory
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-on-surface hover:bg-surface-container-low"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="bg-surface border border-outline-variant rounded-xl p-md">
              <h3 className="text-[12px] tracking-widest font-semibold uppercase text-on-surface-variant mb-md">
                Price Range
              </h3>
              <div className="space-y-sm">
                <input
                  className="w-full h-1 bg-outline-variant rounded-full appearance-none accent-primary"
                  max="10"
                  min="0"
                  step="0.5"
                  type="range"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="flex justify-between text-[12px] text-secondary">
                  <span>0 DKK</span>
                  <span className="text-primary font-semibold">
                    {maxPrice >= 10 ? "10M+ DKK" : `${maxPrice}M DKK`}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface border border-outline-variant rounded-xl p-md">
              <div className="flex items-center justify-between mb-md">
                <h3 className="text-[12px] tracking-widest font-semibold uppercase text-on-surface-variant">
                  Location
                </h3>
                {selectedLocations.length > 0 && (
                  <button
                    onClick={() => setSelectedLocations([])}
                    className="text-[11px] text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <ul className="space-y-xs">
                {locations.map((loc) => (
                  <li key={loc} className="flex items-center gap-xs">
                    <input
                      type="checkbox"
                      id={loc}
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                      className="rounded border-outline text-primary w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor={loc} className="text-[14px] text-on-surface cursor-pointer">
                      {loc}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset All */}
            {(activeCategory !== "All" || maxPrice < 10 || selectedLocations.length > 0 || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setMaxPrice(10);
                  setSelectedLocations([]);
                  setSearchQuery("");
                  setSortBy("newest");
                }}
                className="w-full border-2 border-outline-variant text-secondary py-xs rounded-lg text-[12px] tracking-widest font-semibold uppercase text-center hover:border-primary hover:text-primary transition-all"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-2xl text-center">
                <span className="material-symbols-outlined text-[64px] text-outline mb-md">search_off</span>
                <h3 className="text-[20px] font-bold font-manrope mb-xs">No listings found</h3>
                <p className="text-secondary text-[14px]">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
                {filtered.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-outline-variant"
                  >
                    <div className="h-44 relative overflow-hidden">
                      <img
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={listing.image}
                      />
                      {listing.badge && (
                        <span
                          className={`absolute top-sm left-sm text-[10px] tracking-widest font-bold uppercase px-xs py-[2px] rounded-full ${
                            listing.badge === "Featured"
                              ? "bg-tertiary-fixed text-on-tertiary-fixed"
                              : listing.badge === "New"
                              ? "bg-primary text-on-primary"
                              : "bg-secondary-container text-on-surface"
                          }`}
                        >
                          {listing.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-md">
                      <div className="flex justify-between items-start mb-xs">
                        <h3 className="text-[18px] font-bold font-manrope leading-tight">{listing.title}</h3>
                        <span className="text-primary font-bold text-[14px] whitespace-nowrap ml-xs">
                          {listing.price}
                        </span>
                      </div>
                      <p className="text-secondary text-[12px] tracking-widest uppercase mb-md">
                        {listing.category} · {listing.location}
                      </p>
                      <div className="grid grid-cols-2 gap-sm border-t border-outline-variant pt-md mb-md">
                        <div>
                          <span className="block text-[10px] tracking-widest uppercase text-secondary">
                            Revenue
                          </span>
                          <span className="font-bold text-[14px]">{listing.revenue}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] tracking-widest uppercase text-secondary">
                            EBITDA
                          </span>
                          <span className="font-bold text-[14px]">{listing.ebitda}</span>
                        </div>
                      </div>
                      <Link
                        href={`/listings/${listing.id}`}
                        className="block w-full border-2 border-primary text-primary py-xs rounded-lg text-[12px] tracking-widest font-semibold uppercase text-center hover:bg-primary hover:text-on-primary transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}