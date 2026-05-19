'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', key: 'dashboard', href: '/admin' },
  { icon: 'list_alt', label: 'My Listings', key: 'listings', href: '/admin/listings' },
  { icon: 'chat', label: 'Messages', key: 'messages', href: '/admin/messages' },
  { icon: 'monitoring', label: 'Analytics', key: 'analytics', href: '/admin/analytics' },
  { icon: 'settings', label: 'Settings', key: 'settings', href: '/admin/settings' },
];

type Status = 'all' | 'active' | 'pending' | 'rejected' | 'sold';

interface Listing {
  id: number;
  name: string;
  category: string;
  price: string;
  views: number;
  inquiries: number;
  status: 'active' | 'pending' | 'rejected' | 'sold';
  posted: string;
  img: string;
}

const allListings: Listing[] = [
  { id: 1, name: 'CloudScale SaaS', category: 'Technology', price: '€2,400,000', views: 1243, inquiries: 18, status: 'active', posted: 'May 2, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWFfbkyGPiUamrvewEy17ix01yI46bVyPmEQu4xlSfsAaYCQhXKmvvHRYBv2ZZF9SX96VlRrnG5Cxqov3vXpoy92sLeRp64552lhJIXJkAZVGrJDD7Vm0jeNSJjTDfl9-ZZKrc8bR3PVPYizljnJ7vsF5CrUqSS_2GwxHVk4dMGx85JIHSMzlRiR8_XSbxWnNfBdUDnOsY8ythwvWHvxvVpyr3_LO-LqrgUd8Uk2j_GK92ackiJaSt5kTqXdYTopSWWWXAnX8kjKc' },
  { id: 2, name: 'Erhverv Precision Mfg.', category: 'Manufacturing', price: '€5,850,000', views: 892, inquiries: 7, status: 'active', posted: 'Apr 28, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8sNatjnG8mn-w-0aBUkZH-nST8dXJ8tYIW9gmKWCvc4oBBwjUpufV7-4Pp7VoJPOdV99cD9q0ocsmxCrXK1sK-YVuA-1TsW9tvrEIfbbIMyWRTsyUO7PBZROmAnWnnPrb0Wd8Udh7J6kDM4CBb9qFxAihqvq7zwZiSA6Wf_qhvVwPWFNNuo1IEPEGYttI5a7lC12RM3DC6OkuzXjhaJ8buriKy51KVxlvwql_aSCx6u-RmF-njyQjJQ35ypeoxdfn7rkRBElD1O8' },
  { id: 3, name: 'EcoRetail Group', category: 'E-commerce', price: '€920,000', views: 421, inquiries: 3, status: 'pending', posted: 'May 18, 2026', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7aTczvE5DyTa25eQqy2eRIun5SNF4cCP8NMGVV1hRabXZmlCl3ar3Xvv1FyCcBTAt19h5JZB26Pixor8_s4oKqTMotOIcJ0evZ3ZzBQaEOWkHArLaf_e0xvIc_R25ouX1CLHaYMqoR1fmcgUOo' },
  { id: 4, name: 'Nordic Hospitality Co.', category: 'Hospitality', price: '€3,100,000', views: 0, inquiries: 0, status: 'rejected', posted: 'May 10, 2026', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=80&h=80&fit=crop' },
  { id: 5, name: 'HealthFirst Clinics', category: 'Healthcare', price: '€1,750,000', views: 2341, inquiries: 42, status: 'sold', posted: 'Jan 15, 2026', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=80&h=80&fit=crop' },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  pending: { label: 'Pending', bg: 'bg-[#fcdeb5]', text: 'text-[#98805d]' },
  rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-700' },
  sold: { label: 'Sold', bg: 'bg-[#dce0e4]', text: 'text-[#5a5f62]' },
};

export default function MyListingsPage() {
  const { isRTL, tr } = useLanguage();
  const [filter, setFilter] = useState<Status>('all');
  const [listings, setListings] = useState<Listing[]>(allListings);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = listings.filter((l) => {
    const matchStatus = filter === 'all' || l.status === filter;
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteConfirm(null);
  };

  const counts = {
    all: listings.length,
    active: listings.filter((l) => l.status === 'active').length,
    pending: listings.filter((l) => l.status === 'pending').length,
    rejected: listings.filter((l) => l.status === 'rejected').length,
    sold: listings.filter((l) => l.status === 'sold').length,
  };

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

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-red-600">delete</span>
            </div>
            <h3 className="text-[20px] font-bold text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Delete listing?</h3>
            <p className="text-[14px] text-[#5a5f62] mb-6">This will permanently remove the listing and all associated data. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-[#c6c6cd] rounded-xl font-medium hover:bg-[#f6f3f5] transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 bg-[#ba1a1a] text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Delete</button>
            </div>
          </div>
        </div>
      )}

      <main className={`min-h-screen p-10 ${isRTL ? 'mr-64' : 'ml-64'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-[#76777d] hover:text-black transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h2 className="text-[32px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{tr('myListings')}</h2>
              <p className="text-[16px] text-[#5a5f62]">Manage and track all your business listings.</p>
            </div>
          </div>
          <Link href="/post-ad" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">add</span>
            New Listing
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Views', value: listings.reduce((s, l) => s + l.views, 0).toLocaleString(), icon: 'visibility' },
            { label: 'Total Inquiries', value: listings.reduce((s, l) => s + l.inquiries, 0).toString(), icon: 'mail' },
            { label: 'Active Listings', value: counts.active.toString(), icon: 'check_circle' },
            { label: 'Total Value', value: '€14.02M', icon: 'payments' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white border border-[#c6c6cd] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[18px] text-[#76777d]">{icon}</span>
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#5a5f62]">{label}</p>
              </div>
              <p className="text-[24px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-1 bg-[#f0edef] rounded-xl p-1 flex-wrap">
            {(['all', 'active', 'pending', 'rejected', 'sold'] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all capitalize flex items-center gap-1.5 ${filter === s ? 'bg-white shadow-sm text-black' : 'text-[#76777d] hover:text-black'}`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${filter === s ? 'bg-black text-white' : 'bg-[#e4e2e4] text-[#76777d]'}`}>
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-[#e4e2e4] rounded-xl focus:border-black focus:outline-none text-[14px] bg-white"
            />
          </div>
        </div>

        {/* Listings Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#c6c6cd] rounded-2xl p-16 text-center shadow-sm">
            <span className="material-symbols-outlined text-[56px] text-[#c6c6cd]">inbox</span>
            <p className="text-[18px] font-semibold text-black mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>No listings found</p>
            <p className="text-[14px] text-[#76777d] mt-2">Try adjusting your filters or post a new listing.</p>
            <Link href="/post-ad" className="inline-flex items-center gap-2 mt-6 bg-black text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">add</span>
              Post a Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((listing) => {
              const sc = statusConfig[listing.status];
              return (
                <div key={listing.id} className="bg-white border border-[#c6c6cd] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-5">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl bg-[#e4e2e4] overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={listing.img} alt={listing.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-[17px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{listing.name}</h3>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#76777d]">{listing.category} · Posted {listing.posted}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right hidden sm:block">
                      <p className="text-[20px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{listing.price}</p>
                      <p className="text-[12px] text-[#76777d]">asking price</p>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-6 px-6 border-x border-[#f0edef]">
                      <div className="text-center">
                        <p className="text-[18px] font-bold text-black">{listing.views.toLocaleString()}</p>
                        <p className="text-[11px] text-[#76777d] uppercase tracking-widest">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[18px] font-bold text-black">{listing.inquiries}</p>
                        <p className="text-[11px] text-[#76777d] uppercase tracking-widest">Leads</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="p-2 rounded-lg hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black"
                        title="View"
                      >
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                      </Link>
                      <Link
                        href={`/admin/listings/${listing.id}/edit`}
                        className="p-2 rounded-lg hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(listing.id)}
                        className="p-2 rounded-lg hover:bg-[#ffdad6] transition-colors text-[#76777d] hover:text-[#ba1a1a]"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Rejected reason */}
                  {listing.status === 'rejected' && (
                    <div className="mt-4 pt-4 border-t border-[#f0edef] flex items-start gap-3 bg-red-50 rounded-xl p-4">
                      <span className="material-symbols-outlined text-red-500 text-[18px] mt-0.5">error</span>
                      <div>
                        <p className="text-[13px] font-semibold text-red-700">Listing rejected</p>
                        <p className="text-[12px] text-red-600 mt-0.5">Missing financial documentation. Please upload audited statements from the last 3 years.</p>
                      </div>
                      <Link href={`/admin/listings/${listing.id}/edit`} className="ml-auto text-[13px] font-bold text-red-700 hover:underline whitespace-nowrap">Fix & Resubmit</Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}