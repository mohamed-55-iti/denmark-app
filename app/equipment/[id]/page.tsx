"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const equipmentListings = [
  {
    id: "e1", title: "CNC Milling Machine – DMG MORI", price: "280,000 DKK", category: "Manufacturing",
    year: 2019, condition: "Excellent", location: "Odense",
    desc: "5-axis CNC milling center, low operating hours. Full service history. Includes tooling set.",
    fullDesc: "This DMG MORI 5-axis CNC milling center is in excellent condition with low operating hours. It comes with a full documented service history and a complete tooling set. Ideal for precision manufacturing operations. The machine has been maintained by certified DMG MORI technicians and is ready for immediate production use.",
    img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&auto=format&fit=crop",
    specs: [
      { label: "Brand", value: "DMG MORI" },
      { label: "Model", value: "DMU 50 3rd Generation" },
      { label: "Year", value: "2019" },
      { label: "Axes", value: "5-axis" },
      { label: "Work Area", value: "500 × 450 × 400 mm" },
      { label: "Spindle Speed", value: "18,000 RPM" },
      { label: "Operating Hours", value: "~1,200 hrs" },
      { label: "Location", value: "Odense, Denmark" },
    ],
    seller: { name: "Nordic Machining A/S", role: "Verified Industrial Seller", initials: "NM" },
  },
  {
    id: "e2", title: "Mercedes Sprinter Refrigerated Van", price: "145,000 DKK", category: "Logistics",
    year: 2021, condition: "Good", location: "Copenhagen",
    desc: "Dual-zone refrigeration, 3.5t payload. Used for food distribution. Ready for immediate handover.",
    fullDesc: "A well-maintained Mercedes Sprinter with dual-zone refrigeration unit. Used exclusively for food distribution in the Copenhagen metro area. Both refrigeration zones function perfectly and have been recently serviced. The vehicle comes with full service records and is ready for immediate handover with no outstanding issues.",
    img: "/images/e2.jpg",
    specs: [
      { label: "Brand", value: "Mercedes-Benz" },
      { label: "Model", value: "Sprinter 316 CDI" },
      { label: "Year", value: "2021" },
      { label: "Payload", value: "3,500 kg" },
      { label: "Refrigeration", value: "Dual-zone (-18°C / +4°C)" },
      { label: "Mileage", value: "87,000 km" },
      { label: "Fuel", value: "Diesel" },
      { label: "Location", value: "Copenhagen, Denmark" },
    ],
    seller: { name: "Køl Transport ApS", role: "Verified Fleet Seller", initials: "KT" },
  },
  {
    id: "e3", title: "Commercial Espresso Machine – La Marzocco", price: "38,000 DKK", category: "Cafe & Food",
    year: 2022, condition: "Excellent", location: "Aarhus",
    desc: "3-group La Marzocco Linea PB. Minimal use, descaled and serviced. Perfect for cafe acquisitions.",
    fullDesc: "A nearly new La Marzocco Linea PB 3-group espresso machine with minimal use. Recently descaled and fully serviced by an authorized La Marzocco technician. This machine was originally purchased for a café that did not open due to lease complications. An exceptional opportunity to acquire a top-tier commercial espresso machine at well below retail price.",
    img: "https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=800&auto=format&fit=crop",
    specs: [
      { label: "Brand", value: "La Marzocco" },
      { label: "Model", value: "Linea PB" },
      { label: "Year", value: "2022" },
      { label: "Groups", value: "3" },
      { label: "Boilers", value: "Dual (PID controlled)" },
      { label: "Voltage", value: "400V / 3-phase" },
      { label: "Condition", value: "Excellent – minimal use" },
      { label: "Location", value: "Aarhus, Denmark" },
    ],
    seller: { name: "Brew Assets DK", role: "Verified Equipment Dealer", initials: "BA" },
  },
  {
    id: "e4", title: "Forklift – Toyota 8FBM20", price: "95,000 DKK", category: "Logistics",
    year: 2020, condition: "Good", location: "Aalborg",
    desc: "Electric counterbalance forklift, 2000kg capacity. Battery recently replaced. Inspection passed 2024.",
    fullDesc: "A reliable Toyota 8FBM20 electric counterbalance forklift with a 2,000 kg lifting capacity. The battery was replaced in early 2024 and the forklift passed its most recent annual inspection. Used in a single warehouse environment with consistent maintenance. Suitable for indoor and outdoor use on hard surfaces.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop",
    specs: [
      { label: "Brand", value: "Toyota" },
      { label: "Model", value: "8FBM20" },
      { label: "Year", value: "2020" },
      { label: "Capacity", value: "2,000 kg" },
      { label: "Drive", value: "Electric" },
      { label: "Battery", value: "Replaced 2024" },
      { label: "Mast Height", value: "4,700 mm (triplex)" },
      { label: "Location", value: "Aalborg, Denmark" },
    ],
    seller: { name: "Jylland Lager & Logistik", role: "Verified Industrial Seller", initials: "JL" },
  },
  {
    id: "e5", title: "Server Rack – Dell PowerEdge x6", price: "62,000 DKK", category: "Tech",
    year: 2021, condition: "Excellent", location: "Copenhagen",
    desc: "6x Dell PowerEdge R740 rack servers, 48-core each, 512GB RAM per node. Full rack included.",
    fullDesc: "Six Dell PowerEdge R740 rack servers in excellent working condition, sold together with the full 42U rack enclosure. Each server is configured with dual 24-core Intel Xeon Gold processors and 512GB ECC RAM. Originally used in a SaaS company's on-premise infrastructure before migrating to cloud. All servers have been wiped and reset to factory defaults.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    specs: [
      { label: "Brand", value: "Dell" },
      { label: "Model", value: "PowerEdge R740 × 6" },
      { label: "Year", value: "2021" },
      { label: "CPU (each)", value: "2× Intel Xeon Gold 6252 (24-core)" },
      { label: "RAM (each)", value: "512GB DDR4 ECC" },
      { label: "Storage (each)", value: "8× 1.8TB SAS 10K" },
      { label: "Rack", value: "42U APC included" },
      { label: "Location", value: "Copenhagen, Denmark" },
    ],
    seller: { name: "CloudShift ApS", role: "Verified Tech Seller", initials: "CS" },
  },
  {
    id: "e6", title: "Dental Chair – Sirona Intego", price: "112,000 DKK", category: "Healthcare",
    year: 2020, condition: "Very Good", location: "Frederiksberg",
    desc: "Complete dental unit with integrated X-ray arm. Selling as part of practice wind-down.",
    fullDesc: "A complete Sirona Intego dental unit in very good condition, being sold as part of a planned practice wind-down after the owner's retirement. Includes the integrated X-ray arm, delivery system, patient chair, and doctor's stool. All components are fully functional. The unit has been regularly serviced by an authorized Sirona technician. Available for viewing at the practice by appointment.",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop",
    specs: [
      { label: "Brand", value: "Sirona (Dentsply)" },
      { label: "Model", value: "Intego" },
      { label: "Year", value: "2020" },
      { label: "X-ray", value: "Integrated arm (Heliodent)" },
      { label: "Delivery", value: "Floor-mounted, 6-instrument" },
      { label: "Upholstery", value: "Very good – no tears" },
      { label: "Includes", value: "Chair, stool, delivery system, X-ray" },
      { label: "Location", value: "Frederiksberg, Denmark" },
    ],
    seller: { name: "Dr. H. Andersen", role: "Verified Private Seller", initials: "HA" },
  },
];

const conditionColors: Record<string, string> = {
  "Excellent": "text-green-700 bg-green-50 border-green-200",
  "Very Good": "text-blue-700 bg-blue-50 border-blue-200",
  "Good": "text-yellow-700 bg-yellow-50 border-yellow-200",
};

export default function EquipmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const item = equipmentListings.find((e) => e.id === id);

  const [showContact, setShowContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-gutter py-xl">
          <span className="material-symbols-outlined text-outline text-[72px]">search_off</span>
          <h1 className="text-headline-lg font-manrope font-bold mt-md">Listing Not Found</h1>
          <p className="text-secondary font-inter text-body-md mt-xs mb-lg">
            This equipment listing doesn't exist or has been removed.
          </p>
          <Link
            href="/equipment"
            className="bg-primary text-on-primary px-xl py-sm rounded-lg font-inter font-semibold hover:opacity-90 transition-all"
          >
            Back to Equipment
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      {/* Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContact(false);
              setSubmitted(false);
            }
          }}
        >
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md p-xl border border-outline-variant">
            {submitted ? (
              <div className="text-center space-y-md py-md">
                <span
                  className="material-symbols-outlined text-primary text-[48px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mark_email_read
                </span>
                <h3 className="text-[24px] font-bold font-manrope">Message Sent!</h3>
                <p className="text-secondary text-[14px]">The seller will get back to you shortly.</p>
                <button
                  onClick={() => { setShowContact(false); setSubmitted(false); }}
                  className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-lg">
                  <div>
                    <h3 className="text-[20px] font-bold font-manrope">Contact Seller</h3>
                    <p className="text-secondary text-[13px] mt-xs">About: {item.title}</p>
                  </div>
                  <button
                    onClick={() => setShowContact(false)}
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
                      placeholder="Full name"
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
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="I'm interested in this listing..."
                      className="w-full border border-outline-variant rounded-lg px-md py-sm text-[14px] bg-surface focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-[1280px] mx-auto px-gutter py-xl w-full">

        {/* Breadcrumb */}
        <div className="flex items-center gap-xs text-[12px] tracking-widest uppercase text-secondary mb-lg">
          <Link href="/equipment" className="hover:text-primary transition-colors">
            Equipment
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold truncate max-w-[200px]">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">

          {/* Main */}
          <div className="lg:col-span-8 space-y-xl">

            {/* Hero image */}
            <div className="rounded-xl overflow-hidden h-[360px] border border-outline-variant">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title + price */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-md">
              <div>
                <h1 className="text-[36px] font-bold font-manrope leading-tight tracking-tight mb-xs">
                  {item.title}
                </h1>
                <div className="flex items-center gap-sm flex-wrap">
                  <span className="text-secondary text-[14px] flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {item.location}, Denmark
                  </span>
                  <span className="text-secondary text-[14px]">·</span>
                  <span className="text-secondary text-[14px]">{item.category}</span>
                  <span className={`text-[11px] font-semibold px-xs py-1 rounded border ${conditionColors[item.condition]}`}>
                    {item.condition}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[32px] font-bold text-primary font-manrope">{item.price}</div>
                <p className="text-secondary text-[12px] tracking-widest uppercase">Asking Price</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[20px] font-bold font-manrope mb-md">About this Equipment</h2>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">{item.fullDesc}</p>
            </div>

            {/* Specs */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[20px] font-bold font-manrope mb-md">Specifications</h2>
              <div className="divide-y divide-outline-variant">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-sm">
                    <span className="text-[13px] tracking-widest uppercase text-secondary font-semibold">
                      {spec.label}
                    </span>
                    <span className="text-[14px] font-medium text-on-surface">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden sticky top-24">
              <div className="p-lg space-y-md">
                <div>
                  <h3 className="text-[18px] font-bold font-manrope mb-xs">Interested?</h3>
                  <p className="text-secondary text-[13px]">
                    Contact the seller directly to arrange a viewing or ask questions.
                  </p>
                </div>

                <button
                  onClick={() => setShowContact(true)}
                  className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  Contact Seller
                </button>

                <div className="pt-md border-t border-outline-variant space-y-sm">
                  {[
                    { icon: "verified_user", text: "Verified Seller" },
                    { icon: "visibility", text: "Viewing Available on Request" },
                    { icon: "handshake", text: "Direct Sale – No Middleman" },
                  ].map((trust) => (
                    <div key={trust.text} className="flex items-center gap-xs text-[13px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[18px]">{trust.icon}</span>
                      {trust.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller info */}
              <div className="bg-surface-container-low border-t border-outline-variant p-md flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-[13px] shrink-0">
                  {item.seller.initials}
                </div>
                <div>
                  <p className="font-semibold text-[14px]">{item.seller.name}</p>
                  <p className="text-secondary text-[12px]">{item.seller.role}</p>
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