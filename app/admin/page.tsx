'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

type ListingStatus = 'pending' | 'approved' | 'rejected';

interface Listing {
  id: number;
  name: string;
  category: string;
  askingPrice: string;
  submittedAgo: string;
  status: ListingStatus;
  img: string;
}

const initialListings: Listing[] = [
  {
    id: 1,
    name: 'CloudScale SaaS',
    category: 'Technology',
    askingPrice: '€2,400,000',
    submittedAgo: '2h ago',
    status: 'pending',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWFfbkyGPiUamrvewEy17ix01yI46bVyPmEQu4xlSfsAaYCQhXKmvvHRYBv2ZZF9SX96VlRrnG5Cxqov3vXpoy92sLeRp64552lhJIXJkAZVGrJDD7Vm0jeNSJjTDfl9-ZZKrc8bR3PVPYizljnJ7vsF5CrUqSS_2GwxHVk4dMGx85JIHSMzlRiR8_XSbxWnNfBdUDnOsY8ythwvWHvxvVpyr3_LO-LqrgUd8Uk2j_GK92ackiJaSt5kTqXdYTopSWWWXAnX8kjKc',
  },
  {
    id: 2,
    name: 'Erhverv Precision Mfg.',
    category: 'Manufacturing',
    askingPrice: '€5,850,000',
    submittedAgo: '5h ago',
    status: 'pending',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8sNatjnG8mn-w-0aBUkZH-nST8dXJ8tYIW9gmKWCvc4oBBwjUpufV7-4Pp7VoJPOdV99cD9q0ocsmxCrXK1sK-YVuA-1TsW9tvrEIfbbIMyWRTsyUO7PBZROmAnWnnPrb0Wd8Udh7J6kDM4CBb9qFxAihqvq7zwZiSA6Wf_qhvVwPWFNNuo1IEPEGYttI5a7lC12RM3DC6OkuzXjhaJ8buriKy51KVxlvwql_aSCx6u-RmF-njyQjJQ35ypeoxdfn7rkRBElD1O8',
  },
  {
    id: 3,
    name: 'EcoRetail Group',
    category: 'E-commerce',
    askingPrice: '€920,000',
    submittedAgo: '1d ago',
    status: 'pending',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7aTczvE5DyTa25eQqy2eRIun5SNF4cCP8NMGVV1hRabXZmlCl3ar3Xvv1FyCcBTAt19h5JZB26Pixor8_s4oKqTMotOIcJ0evZ3ZzBQaEOWkHArLaf_e0xvIc_R25ouX1CLHaYMqoR1fmcgUOo',
  },
];

const barHeights = ['40%', '65%', '55%', '85%', '70%', '95%'];
const barMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

export default function AdminDashboard() {
  const { tr, language, setLanguage, isRTL } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateStatus = (id: number, status: ListingStatus) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const pendingCount = listings.filter((l) => l.status === 'pending').length;

  const filteredListings = listings.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    // Clear auth tokens/session
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  const navItems = [
    { icon: 'dashboard', label: tr('dashboard'), key: 'dashboard', href: '/admin' },
    { icon: 'list_alt', label: tr('myListings'), key: 'listings', href: '/admin/listings' },
    { icon: 'chat', label: tr('messages'), key: 'messages', href: '/admin/messages' },
    { icon: 'monitoring', label: tr('analytics'), key: 'analytics', href: '/admin/analytics' },
    { icon: 'settings', label: tr('settings'), key: 'settings', href: '/admin/settings' },
  ];

  const languages: { code: 'en' | 'da' | 'ar'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'da', label: 'Dansk' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <div
      className="bg-[#fcf8fa] text-[#1b1b1d] overflow-x-hidden min-h-screen"
      style={{ fontFamily: 'Inter, sans-serif' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Sidebar */}
      <aside
        className={`h-screen w-64 fixed top-0 bg-[#f6f3f5] border-r border-[#c6c6cd] flex flex-col p-4 shadow-sm z-50 ${
          isRTL ? 'right-0 border-r-0 border-l' : 'left-0'
        }`}
      >
        <div className="px-4 py-6">
          <h1 className="text-[20px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {tr('adminPanel')}
          </h1>
          <p className="text-[14px] text-[#5a5f62]">{tr('businessOwner')}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setActiveNav(key)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all active:scale-[0.98] ${
                activeNav === key
                  ? 'bg-[#dce0e4] text-[#5e6367] font-medium'
                  : 'text-[#45464d] hover:bg-[#e4e2e4]'
              }`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-[#c6c6cd] space-y-1">
          <Link
            href="/post-ad"
            className="w-full bg-black text-white rounded-lg py-3 px-4 font-bold flex items-center justify-center gap-2 mb-4 hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            {tr('postAd')}
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 text-[#45464d] px-4 py-3 hover:bg-[#e4e2e4] rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-medium">{tr('helpCenter')}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-[#ba1a1a] px-4 py-3 hover:bg-[#ffdad6] rounded-lg transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">{tr('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`min-h-screen p-10 ${isRTL ? 'mr-64' : 'ml-64'}`}>

        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-[32px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {tr('marketplaceOverview')}
            </h2>
            <p className="text-[16px] text-[#5a5f62]">{tr('marketplaceSubtitle')}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className={`absolute inset-y-0 flex items-center text-[#76777d] ${isRTL ? 'right-3' : 'left-3'}`}>
                <span className="material-symbols-outlined">search</span>
              </span>
              <input
                className={`py-2 border-2 border-[#e4e2e4] rounded-lg bg-[#fcf8fa] focus:border-black focus:outline-none transition-colors w-64 text-[16px] ${
                  isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
                placeholder={tr('searchListings')}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* User Avatar + Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] hover:opacity-80 transition-opacity"
              >
                NA
              </button>

              {userMenuOpen && (
                <div
                  className={`absolute top-12 w-52 bg-white border border-[#c6c6cd] rounded-xl shadow-lg z-50 overflow-hidden ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="px-4 py-3 border-b border-[#c6c6cd]">
                    <p className="font-semibold text-black text-[14px]">NA Username</p>
                    <p className="text-[12px] text-[#76777d]">admin@erhvervsmarked.dk</p>
                  </div>
                  <Link
                    href="/admin/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#45464d] hover:bg-[#f6f3f5] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    {tr('profile')}
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#45464d] hover:bg-[#f6f3f5] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    {tr('accountSettings')}
                  </Link>
                  <div className="border-t border-[#c6c6cd]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      {tr('logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: 'group', label: tr('totalUsers'), value: '12,482', badge: '+12%', badgeRed: false, highlight: false },
            { icon: 'campaign', label: tr('activeAds'), value: '856', badge: '+4%', badgeRed: false, highlight: false },
            { icon: 'pending_actions', label: tr('pendingApproval'), value: String(pendingCount), badge: tr('actionRequired'), badgeRed: true, highlight: true },
            { icon: 'payments', label: tr('revenueMTD'), value: '€142,500', badge: '+22%', badgeRed: false, highlight: false },
          ].map(({ icon, label, value, badge, badgeRed, highlight }) => (
            <div
              key={label}
              className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                highlight ? 'border-l-4 border-l-black border-[#c6c6cd]' : 'border-[#c6c6cd]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${highlight ? 'bg-[#131b2e] text-white' : 'bg-[#dce0e4] text-[#5e6367]'}`}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`text-[11px] font-bold tracking-widest px-2 py-1 rounded-full ${
                  badgeRed ? 'text-[#ba1a1a] bg-[#ffdad6]' : 'text-[#98805d] bg-[#fcdeb5]'
                }`}>
                  {badge}
                </span>
              </div>
              <h3 className="text-[#5a5f62] text-[12px] font-semibold tracking-widest uppercase">{label}</h3>
              <p className="text-[28px] font-bold text-black mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</p>
            </div>
          ))}
        </section>

        {/* Table + Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 bg-white border border-[#c6c6cd] rounded-xl p-10 shadow-sm">
            <h3 className="text-[24px] font-semibold text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {tr('pendingReview')}
            </h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#c6c6cd]">
                  {[tr('businessName'), tr('category'), tr('askingPrice'), tr('actions')].map((h) => (
                    <th key={h} className="pb-6 text-[12px] font-semibold tracking-widest uppercase text-[#5a5f62]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c6c6cd]">
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-[#f6f3f5] transition-colors group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#e4e2e4] overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="w-full h-full object-cover" src={listing.img} alt={listing.name} />
                        </div>
                        <div>
                          <p className="font-bold text-black">{listing.name}</p>
                          <p className="text-[14px] text-[#5a5f62]">{tr('submittedAgo')} {listing.submittedAgo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-[14px] text-[#45464d]">{listing.category}</td>
                    <td className="py-6 font-medium text-black">{listing.askingPrice}</td>
                    <td className="py-6 text-right">
                      {listing.status === 'pending' ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => updateStatus(listing.id, 'approved')}
                            className="px-3 py-1 bg-black text-white text-[13px] font-bold rounded-lg hover:opacity-90 transition-opacity"
                          >
                            {tr('approve')}
                          </button>
                          <button
                            onClick={() => updateStatus(listing.id, 'rejected')}
                            className="px-3 py-1 border border-[#76777d] text-[13px] font-bold rounded-lg hover:bg-[#e4e2e4] transition-colors"
                          >
                            {tr('reject')}
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${
                          listing.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {listing.status === 'approved' ? tr('approved') : tr('rejected')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-10 shadow-sm flex flex-col">
            <h3 className="text-[24px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {tr('listingGrowth')}
            </h3>
            <p className="text-[14px] text-[#5a5f62] mb-10">{tr('monthlyPerformance')}</p>
            <div className="flex-1 flex flex-col justify-end gap-4 h-48">
              <div className="flex items-end gap-2 h-full">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-lg transition-all hover:bg-black ${
                      i === barHeights.length - 1 ? 'bg-black' : 'bg-[#dce0e4]'
                    }`}
                    style={{ height: h }}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                {barMonths.map((m) => (
                  <span key={m} className="text-[10px] font-semibold tracking-widest uppercase text-[#76777d]">{m}</span>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-[#c6c6cd]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] text-[#5a5f62]">{tr('premiumConversions')}</span>
                <span className="font-bold text-black">82%</span>
              </div>
              <div className="w-full bg-[#e4e2e4] h-2 rounded-full overflow-hidden">
                <div className="bg-black h-full w-[82%]" />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-10 flex items-center gap-6 shadow-sm">
            <div className="p-4 bg-[#fcdeb5] rounded-full text-[#271901] flex-shrink-0">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {tr('verifiedMarketplace')}
              </h4>
              <p className="text-[14px] text-[#5a5f62] mt-1">{tr('verifiedDesc')}</p>
            </div>
          </div>
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-10 flex items-center gap-6 shadow-sm">
            <div className="p-4 bg-[#dfe3e7] rounded-full text-[#171c1f] flex-shrink-0">
              <span className="material-symbols-outlined text-[32px]">support_agent</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {tr('supportQueue')}
              </h4>
              <p className="text-[14px] text-[#5a5f62] mt-1">{tr('supportDesc')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t border-[#c6c6cd] bg-[#dcd9db] py-16 ${isRTL ? 'mr-64' : 'ml-64'}`}>
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <h2 className="text-[18px] font-bold text-[#1b1b1d] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              erhvervsmarked
            </h2>
            <p className="text-[14px] text-[#5e6367] max-w-sm">{tr('footerDesc')}</p>
          </div>
          <div>
            <h3 className="text-[12px] font-semibold tracking-widest uppercase text-[#5a5f62] mb-6">{tr('resources')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/legal-templates" className="text-[14px] text-[#5e6367] hover:text-black transition-colors">
                  {tr('termsOfService')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[14px] text-[#5e6367] hover:text-black transition-colors">
                  {tr('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[14px] text-[#5e6367] hover:text-black transition-colors">
                  {tr('contactSupport')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[12px] font-semibold tracking-widest uppercase text-[#5a5f62] mb-6">{tr('language')}</h3>
            <div className="flex flex-wrap gap-4">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`text-[14px] transition-colors ${
                    language === code
                      ? 'font-bold text-black underline'
                      : 'text-[#5e6367] hover:text-black'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}