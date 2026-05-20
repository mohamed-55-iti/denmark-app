'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// ── same listings data (in a real app this would come from an API/DB) ──────────
const allListings = [
  { id: 1, name: 'CloudScale SaaS', category: 'Technology', price: '2400000', views: 1243, inquiries: 18, status: 'active', posted: 'May 2, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWFfbkyGPiUamrvewEy17ix01yI46bVyPmEQu4xlSfsAaYCQhXKmvvHRYBv2ZZF9SX96VlRrnG5Cxqov3vXpoy92sLeRp64552lhJIXJkAZVGrJDD7Vm0jeNSJjTDfl9-ZZKrc8bR3PVPYizljnJ7vsF5CrUqSS_2GwxHVk4dMGx85JIHSMzlRiR8_XSbxWnNfBdUDnOsY8ythwvWHvxvVpyr3_LO-LqrgUd8Uk2j_GK92ackiJaSt5kTqXdYTopSWWWXAnX8kjKc', description: 'A leading cloud-based SaaS platform serving 500+ enterprise clients across Europe.', location: 'Copenhagen, Denmark', employees: '45', revenue: '1200000', ebitda: '420000', established: '2019' },
  { id: 2, name: 'Erhverv Precision Mfg.', category: 'Manufacturing', price: '5850000', views: 892, inquiries: 7, status: 'active', posted: 'Apr 28, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8sNatjnG8mn-w-0aBUkZH-nST8dXJ8tYIW9gmKWCvc4oBBwjUpufV7-4Pp7VoJPOdV99cD9q0ocsmxCrXK1sK-YVuA-1TsW9tvrEIfbbIMyWRTsyUO7PBZROmAnWnnPrb0Wd8Udh7J6kDM4CBb9qFxAihqvq7zwZiSA6Wf_qhvVwPWFNNuo1IEPEGYttI5a7lC12RM3DC6OkuzXjhaJ8buriKy51KVxlvwql_aSCx6u-RmF-njyQjJQ35ypeoxdfn7rkRBElD1O8', description: 'Specialized CNC manufacturing for aerospace and automotive sectors.', location: 'Aarhus, Denmark', employees: '120', revenue: '3200000', ebitda: '980000', established: '2008' },
  { id: 3, name: 'EcoRetail Group', category: 'E-commerce', price: '920000', views: 421, inquiries: 3, status: 'pending', posted: 'May 18, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7aTczvE5DyTa25eQqy2eRIun5SNF4cCP8NMGVV1hRabXZmlCl3ar3Xvv1FyCcBTAt19h5JZB26Pixor8_s4oKqTMotOIcJ0evZ3ZzBQaEOWkHArLaf_e0xvIc_R25ouX1CLHaYMqoR1fmcgUOo', description: 'Sustainable e-commerce brand with 30k+ monthly active customers.', location: 'Odense, Denmark', employees: '18', revenue: '640000', ebitda: '120000', established: '2021' },
  { id: 4, name: 'Nordic Hospitality Co.', category: 'Hospitality', price: '3100000', views: 0, inquiries: 0, status: 'rejected', posted: 'May 10, 2026', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=80&fit=crop', description: 'Premium hotel group with 3 boutique properties in Copenhagen.', location: 'Copenhagen, Denmark', employees: '65', revenue: '1800000', ebitda: '310000', established: '2015' },
  { id: 5, name: 'HealthFirst Clinics', category: 'Healthcare', price: '1750000', views: 2341, inquiries: 42, status: 'sold', posted: 'Jan 15, 2026', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=80&h=80&fit=crop', description: 'Network of 5 private clinics providing general and specialist care.', location: 'Aalborg, Denmark', employees: '38', revenue: '2100000', ebitda: '450000', established: '2012' },
];

const categories = ['Technology', 'Manufacturing', 'E-commerce', 'Hospitality', 'Healthcare', 'Retail', 'Logistics', 'Food & Beverage', 'Services', 'Other'];

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', key: 'dashboard', href: '/admin' },
  { icon: 'list_alt', label: 'My Listings', key: 'listings', href: '/admin/listings' },
  { icon: 'chat', label: 'Messages', key: 'messages', href: '/admin/messages' },
  { icon: 'monitoring', label: 'Analytics', key: 'analytics', href: '/admin/analytics' },
  { icon: 'settings', label: 'Settings', key: 'settings', href: '/admin/settings' },
];

export default function EditListingPage() {
  const { isRTL, tr } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const original = allListings.find((l) => l.id === id);

  const [form, setForm] = useState(
    original ?? {
      id: 0, name: '', category: '', price: '', views: 0, inquiries: 0,
      status: 'pending', posted: '', img: '', description: '',
      location: '', employees: '', revenue: '', ebitda: '', established: '',
    }
  );
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!original) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8fa]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center">
          <span className="material-symbols-outlined text-[64px] text-[#c6c6cd]">search_off</span>
          <h2 className="text-[24px] font-bold mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Listing not found</h2>
          <p className="text-[#76777d] mt-2 mb-6">The listing with ID #{id} does not exist.</p>
          <Link href="/admin/listings" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Business name is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Enter a valid asking price';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    // In a real app: await fetch(`/api/listings/${id}`, { method: 'PATCH', body: JSON.stringify(form) })
    setSaved(true);
    setTimeout(() => { router.push('/admin/listings'); }, 1500);
  };

  const handleResubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaved(true);
    setTimeout(() => { router.push('/admin/listings'); }, 1500);
  };

  const isRejected = original.status === 'rejected';

  return (
    <div className="bg-[#fcf8fa] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`h-screen w-64 fixed top-0 bg-[#f6f3f5] flex flex-col p-4 shadow-sm z-50 ${isRTL ? 'right-0 border-l border-[#c6c6cd]' : 'left-0 border-r border-[#c6c6cd]'}`}>
        <div className="px-4 py-6">
          <h1 className="text-[20px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>erhvervsmarked Admin</h1>
          <p className="text-[14px] text-[#5a5f62]">{tr('businessOwner')}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, key, href }) => (
            <Link key={key} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${key === 'listings' ? 'bg-[#dce0e4] text-[#5e6367] font-medium' : 'text-[#45464d] hover:bg-[#e4e2e4]'}`}>
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-[#c6c6cd] space-y-1">
          <Link href="/post-ad" className="w-full bg-black text-white rounded-lg py-3 px-4 font-bold flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined">add</span>{tr('postAd')}
          </Link>
          <Link href="/contact" className="flex items-center gap-3 text-[#45464d] px-4 py-3 hover:bg-[#e4e2e4] rounded-lg transition-all">
            <span className="material-symbols-outlined">help</span>
            <span className="font-medium">{tr('helpCenter')}</span>
          </Link>
          <Link href="/login" className="flex items-center gap-3 text-[#ba1a1a] px-4 py-3 hover:bg-[#ffdad6] rounded-lg transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">{tr('logout')}</span>
          </Link>
        </div>
      </aside>

      {/* Success Toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-[200] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-semibold">{isRejected ? 'Resubmitted for review!' : 'Listing updated successfully!'}</span>
        </div>
      )}

      <main className={`min-h-screen p-10 ${isRTL ? 'mr-64' : 'ml-64'}`}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#76777d] mb-8">
          <Link href="/admin" className="hover:text-black transition-colors">Dashboard</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link href="/admin/listings" className="hover:text-black transition-colors">My Listings</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-black font-medium">Edit: {original.name}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/listings" className="w-10 h-10 rounded-xl border border-[#c6c6cd] flex items-center justify-center hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h2 className="text-[28px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Edit Listing</h2>
              <p className="text-[14px] text-[#76777d]">#{id} · Last updated {original.posted}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/listings/${id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 border border-[#c6c6cd] rounded-xl text-[14px] font-medium hover:bg-[#f0edef] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Preview
            </Link>
            {isRejected ? (
              <button
                onClick={handleResubmit}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#ba1a1a] text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Fix & Resubmit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Rejection Banner */}
        {isRejected && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <span className="material-symbols-outlined text-red-500 text-[22px] mt-0.5 shrink-0">error</span>
            <div>
              <p className="text-[14px] font-bold text-red-700 mb-1">This listing was rejected</p>
              <p className="text-[13px] text-red-600">Missing financial documentation. Please upload audited statements from the last 3 years, then click <strong>Fix &amp; Resubmit</strong>.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── LEFT: main form ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <section className="bg-white border border-[#c6c6cd] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-black mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>Basic Information</h3>
              <div className="space-y-4">
                <Field label="Business Name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Nordic Hospitality Co."
                    className={inputCls(errors.name)}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Category" error={errors.category}>
                    <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls(errors.category)}>
                      <option value="">Select category…</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Location" error={errors.location}>
                    <input
                      value={form.location}
                      onChange={(e) => set('location', e.target.value)}
                      placeholder="e.g. Copenhagen, Denmark"
                      className={inputCls(errors.location)}
                    />
                  </Field>
                </div>
                <Field label="Description" error={errors.description}>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe the business, its strengths, and why it's a great acquisition..."
                    rows={4}
                    className={inputCls(errors.description) + ' resize-none'}
                  />
                </Field>
              </div>
            </section>

            {/* Financials */}
            <section className="bg-white border border-[#c6c6cd] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-black mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>Financial Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Asking Price (€)" error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] font-medium">€</span>
                    <input
                      value={form.price}
                      onChange={(e) => set('price', e.target.value)}
                      placeholder="3100000"
                      className={inputCls(errors.price) + ' pl-7'}
                    />
                  </div>
                </Field>
                <Field label="Annual Revenue (€)">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] font-medium">€</span>
                    <input value={form.revenue} onChange={(e) => set('revenue', e.target.value)} placeholder="1800000" className={inputCls() + ' pl-7'} />
                  </div>
                </Field>
                <Field label="EBITDA (€)">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] font-medium">€</span>
                    <input value={form.ebitda} onChange={(e) => set('ebitda', e.target.value)} placeholder="310000" className={inputCls() + ' pl-7'} />
                  </div>
                </Field>
                <Field label="Employees">
                  <input value={form.employees} onChange={(e) => set('employees', e.target.value)} placeholder="65" className={inputCls()} />
                </Field>
                <Field label="Year Established">
                  <input value={form.established} onChange={(e) => set('established', e.target.value)} placeholder="2015" className={inputCls()} />
                </Field>
              </div>
            </section>

            {/* Documents — highlighted for rejected */}
            <section className={`border rounded-2xl p-6 shadow-sm ${isRejected ? 'bg-red-50 border-red-300' : 'bg-white border-[#c6c6cd]'}`}>
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-[16px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Supporting Documents</h3>
                {isRejected && <span className="text-[11px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Required</span>}
              </div>
              <div className="border-2 border-dashed border-[#c6c6cd] rounded-xl p-8 text-center hover:border-black transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-[40px] text-[#c6c6cd] group-hover:text-black transition-colors">upload_file</span>
                <p className="text-[14px] font-semibold text-black mt-3">Drop files here or click to upload</p>
                <p className="text-[12px] text-[#76777d] mt-1">Audited financial statements, tax returns, business registration (PDF, max 10MB)</p>
                <button className="mt-4 px-5 py-2 bg-black text-white rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity">
                  Browse Files
                </button>
              </div>
            </section>
          </div>

          {/* ── RIGHT: sidebar panels ── */}
          <div className="space-y-6">
            {/* Status */}
            <section className="bg-white border border-[#c6c6cd] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-black mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Listing Status</h3>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-bold uppercase tracking-widest ${
                original.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                original.status === 'pending' ? 'bg-[#fcdeb5] text-[#98805d]' :
                original.status === 'rejected' ? 'bg-red-50 text-red-700' :
                'bg-[#dce0e4] text-[#5a5f62]'
              }`}>
                <span className="material-symbols-outlined text-[16px]">
                  {original.status === 'active' ? 'check_circle' : original.status === 'pending' ? 'schedule' : original.status === 'rejected' ? 'cancel' : 'sell'}
                </span>
                {original.status}
              </div>
              {original.status === 'pending' && (
                <p className="text-[12px] text-[#76777d] mt-3">Your listing is under review. This usually takes 1–2 business days.</p>
              )}
            </section>

            {/* Stats */}
            <section className="bg-white border border-[#c6c6cd] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-black mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#76777d] flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">visibility</span> Views</span>
                  <span className="text-[15px] font-bold text-black">{original.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#76777d] flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">person</span> Leads</span>
                  <span className="text-[15px] font-bold text-black">{original.inquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#76777d] flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Posted</span>
                  <span className="text-[13px] font-medium text-black">{original.posted}</span>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-white border border-[#c6c6cd] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-black mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Danger Zone</h3>
              <p className="text-[12px] text-[#76777d] mb-4">Permanently delete this listing and all its data. This cannot be undone.</p>
              <button className="w-full py-2.5 border-2 border-red-200 text-red-700 rounded-xl text-[13px] font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Delete Listing
              </button>
            </section>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="mt-8 flex items-center justify-between bg-white border border-[#c6c6cd] rounded-2xl p-4 shadow-sm">
          <Link href="/admin/listings" className="flex items-center gap-2 text-[14px] text-[#76777d] hover:text-black transition-colors font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Cancel
          </Link>
          <div className="flex items-center gap-3">
            {Object.keys(errors).length > 0 && (
              <p className="text-[13px] text-red-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">error</span>
                Please fix the errors above
              </p>
            )}
            {isRejected ? (
              <button
                onClick={handleResubmit}
                className="flex items-center gap-2 px-8 py-3 bg-[#ba1a1a] text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Fix & Resubmit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl text-[14px] font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Changes
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────
function inputCls(error?: string) {
  return `w-full px-3 py-2.5 border-2 rounded-xl text-[14px] focus:outline-none transition-colors ${
    error ? 'border-red-400 focus:border-red-600 bg-red-50' : 'border-[#e4e2e4] focus:border-black bg-white'
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#45464d] mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[12px] text-red-600 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{error}</p>}
    </div>
  );
}