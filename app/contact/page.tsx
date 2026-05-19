"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Book a Call Modal ──────────────────────────────────────────────
function BookACallModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "09:00", topic: "General Demo" });
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-gutter">
      <div className="bg-surface rounded-2xl border border-outline-variant shadow-xl w-full max-w-md p-xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-md right-md text-secondary hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {booked ? (
          <div className="flex flex-col items-center text-center py-lg">
            <span className="material-symbols-outlined text-primary text-[56px] mb-md" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_available
            </span>
            <h2 className="text-headline-md font-manrope font-bold mb-sm">Call Booked!</h2>
            <p className="text-body-sm font-inter text-secondary mb-lg">
              We'll send a confirmation to <strong>{form.email}</strong>. See you on <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-on-primary px-xl py-sm rounded-lg font-inter font-semibold hover:opacity-90 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-headline-md font-manrope font-bold mb-xs">Book a 20-min Call</h2>
            <p className="text-body-sm font-inter text-secondary mb-lg">No sales pressure — just a walkthrough of the platform.</p>

            <form onSubmit={handleSubmit} className="space-y-md">
              <div>
                <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Lars Andersen"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="lars@example.dk"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Date</label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Time (CET)</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {["09:00","10:00","11:00","13:00","14:00","15:00","16:00"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Topic</label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>General Demo</option>
                  <option>Buying a Business</option>
                  <option>Selling a Business</option>
                  <option>Enterprise / API</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all"
              >
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Contact Page ──────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Enquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {showModal && <BookACallModal onClose={() => setShowModal(false)} />}

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-surface-container py-xl text-center">
          <div className="max-w-container-max mx-auto px-gutter">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-label-caps font-inter px-md py-xs rounded-full mb-md">
              Get in Touch
            </span>
            <h1 className="text-headline-xl font-manrope font-bold mb-md leading-tight">Contact Support</h1>
            <p className="text-body-lg font-inter text-secondary max-w-xl mx-auto">
              Our team typically responds within 1 business day. For urgent listing issues, use the live chat in the bottom right.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-xl bg-surface">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-xl">

              {/* Form */}
              <div className="bg-surface-container-low rounded-2xl border border-outline-variant p-xl">
                {sent ? (
                  <div className="flex flex-col items-center justify-center text-center h-full py-xl">
                    <span className="material-symbols-outlined text-primary text-[64px] mb-md" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <h2 className="text-headline-md font-manrope font-bold mb-sm">Message Sent!</h2>
                    <p className="text-body-md font-inter text-secondary">
                      We&apos;ll get back to you at <strong>{form.email}</strong> within 1 business day.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "General Enquiry", message: "" }); }}
                      className="mt-lg border-2 border-primary text-primary px-xl py-sm rounded-lg font-manrope font-semibold hover:bg-primary hover:text-on-primary transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-headline-md font-manrope font-semibold mb-lg">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-md">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                        <div>
                          <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Full Name</label>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Lars Andersen"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Email Address</label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="lars@example.dk"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Subject</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option>General Enquiry</option>
                          <option>Listing Issue</option>
                          <option>Billing & Subscription</option>
                          <option>Technical Problem</option>
                          <option>Verification Request</option>
                          <option>Enterprise Sales</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-inter font-semibold tracking-widest uppercase text-secondary mb-xs">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full border border-outline-variant rounded-lg px-md py-sm font-inter text-body-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="Describe your question or issue..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-md rounded-lg font-manrope font-semibold hover:opacity-90 transition-all"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Info sidebar */}
              <div className="space-y-md">
                {[
                  { icon: "schedule", title: "Response Time", desc: "We reply within 1 business day. Urgent issues are prioritized." },
                  { icon: "location_on", title: "Office", desc: "Vesterbrogade 34, 1620 Copenhagen V, Denmark" },
                  { icon: "mail", title: "Email", desc: "support@erhvervsmarked.dk" },
                  { icon: "phone", title: "Phone", desc: "+45 70 20 30 40\nMon–Fri, 9:00–17:00 CET" },
                ].map((item) => (
                  <div key={item.title} className="bg-surface-container-low rounded-xl p-md border border-outline-variant flex gap-md items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-manrope font-semibold text-body-md">{item.title}</p>
                      <p className="font-inter text-body-sm text-secondary mt-xs whitespace-pre-line">{item.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Book a Call card */}
                <div className="bg-primary text-on-primary rounded-xl p-lg">
                  <p className="font-manrope font-bold text-body-md mb-xs">Need a demo?</p>
                  <p className="font-inter text-body-sm text-on-primary/80 mb-md">
                    Book a 20-minute walkthrough with our team — no sales pressure.
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-on-primary text-primary px-lg py-xs rounded-lg font-inter font-semibold text-body-sm hover:opacity-90 transition-all"
                  >
                    Book a Call
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}