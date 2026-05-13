import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ListingDetailsPage() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-gutter py-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs text-[12px] tracking-widest uppercase text-secondary mb-lg">
          <Link href="/browse" className="hover:text-primary transition-colors">
            Browse
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold">Copenhagen Roastery Co.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-xl">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden h-[400px]">
              <img
                alt="Copenhagen Roastery"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoS-wDejNKFaBiKSR3ZAyR1UDUTU7lCs4LZqlszPB5AzI9RPFuIt-nuIMZka8GRXesapA3Fv8m3QvcUobcIgrDResVklB6a-GmFf_a30L-OH-YsTOJrPLhmlR4xcAM2gzm6CYjxPBmYccmFhvTe1a7wqfvvCkGY8AQfhObGAFx27xyJ0LgzF4r0ROaQSRhR8HKtKPAaaMEMcN3XydWp76hgOUj77St_x7t801-oEfHsN9WEDUfjOoIY5AefBUseg6472nUo4bldpQ"
              />
              <div className="absolute top-md left-md flex gap-xs">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] tracking-widest uppercase font-bold px-sm py-[3px] rounded-full">
                  Featured
                </span>
                <span className="bg-secondary-container text-on-surface text-[10px] tracking-widest uppercase font-bold px-sm py-[3px] rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Title + Price */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-md">
              <div>
                <h1 className="text-[40px] font-bold font-manrope leading-tight tracking-tight mb-xs">
                  Copenhagen Roastery Co.
                </h1>
                <p className="text-secondary text-[14px] flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  Copenhagen, Denmark · Cafe & Food
                </p>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-bold text-primary font-manrope">4.2M DKK</div>
                <p className="text-secondary text-[12px] tracking-widest uppercase">Asking Price</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {[
                { label: "Annual Revenue", value: "1.8M DKK" },
                { label: "EBITDA", value: "420K DKK" },
                { label: "Years Operating", value: "8 Years" },
                { label: "Employees", value: "14 FTE" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-surface border border-outline-variant rounded-xl p-md text-center"
                >
                  <div className="text-[24px] font-bold font-manrope text-primary mb-xs">
                    {m.value}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-secondary">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">About this Business</h2>
              <p className="text-[16px] text-on-surface-variant leading-relaxed mb-md">
                Copenhagen Roastery Co. is an established specialty coffee roaster and café chain
                operating 3 locations across Copenhagen. Founded in 2016, the business has built a
                loyal customer base with a focus on ethically sourced, single-origin beans and a
                premium retail experience.
              </p>
              <p className="text-[16px] text-on-surface-variant leading-relaxed">
                The business includes full roastery equipment, a subscription coffee service with
                over 800 active subscribers, and long-term lease agreements at prime Copenhagen
                locations. This represents a rare opportunity to acquire a profitable, brand-led
                food and beverage operation with significant growth potential.
              </p>
            </div>

            {/* Assets & Inclusions */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">Assets & Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                {[
                  "3 fully equipped café locations",
                  "Industrial roasting equipment (value ~600K DKK)",
                  "800+ active subscription customers",
                  "Established brand and social media presence",
                  "Staff (14 FTE, all eligible to transfer)",
                  "E-commerce store generating 240K DKK/yr",
                  "Supplier agreements with 6 origin farms",
                  "Proprietary roast profiles and recipes",
                ].map((asset) => (
                  <div key={asset} className="flex items-start gap-xs">
                    <span
                      className="material-symbols-outlined text-primary text-[18px] mt-[2px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-[14px] text-on-surface">{asset}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financials Summary */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg">
              <h2 className="text-[24px] font-bold font-manrope mb-md">Financial Snapshot</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="text-left py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        Metric
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2022
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2023
                      </th>
                      <th className="text-right py-sm text-[12px] tracking-widest uppercase text-secondary font-semibold">
                        2024
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: "Revenue", y22: "1.4M", y23: "1.6M", y24: "1.8M" },
                      { metric: "Gross Profit", y22: "680K", y23: "780K", y24: "890K" },
                      { metric: "EBITDA", y22: "290K", y23: "350K", y24: "420K" },
                      { metric: "Net Profit", y22: "180K", y23: "230K", y24: "290K" },
                    ].map((row) => (
                      <tr key={row.metric} className="border-b border-outline-variant">
                        <td className="py-sm font-medium">{row.metric}</td>
                        <td className="py-sm text-right text-secondary">{row.y22} DKK</td>
                        <td className="py-sm text-right text-secondary">{row.y23} DKK</td>
                        <td className="py-sm text-right font-bold">{row.y24} DKK</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-md">
            {/* Contact Card */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden sticky top-24">
              <div className="p-lg">
                <h3 className="text-[20px] font-bold font-manrope mb-xs">
                  Interested in this listing?
                </h3>
                <p className="text-secondary text-[14px] mb-lg">
                  Sign an NDA and get access to the full financial data room.
                </p>

                <div className="space-y-md">
                  <button className="w-full bg-primary text-on-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:opacity-90 active:scale-95 transition-all shadow-md">
                    Sign NDA & Get Access
                  </button>
                  <button className="w-full border-2 border-primary text-primary py-sm rounded-lg text-[12px] tracking-widest font-semibold uppercase hover:bg-primary hover:text-on-primary transition-all">
                    Ask a Question
                  </button>
                </div>

                <div className="mt-lg pt-lg border-t border-outline-variant space-y-sm">
                  {[
                    { icon: "verified_user", text: "Identity Verified Seller" },
                    { icon: "lock", text: "NDA Protected Data Room" },
                    { icon: "support_agent", text: "Advisor Support Included" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-xs text-[13px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {item.icon}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Listing Agent */}
              <div className="bg-surface-container-low border-t border-outline-variant p-md flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-[14px]">
                  ES
                </div>
                <div>
                  <p className="font-semibold text-[14px]">Erik Sørensen</p>
                  <p className="text-secondary text-[12px]">Senior Acquisition Advisor</p>
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