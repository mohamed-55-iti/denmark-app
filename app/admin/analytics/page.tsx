'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', key: 'dashboard', href: '/admin' },
  { icon: 'list_alt', label: 'My Listings', key: 'listings', href: '/admin/listings' },
  { icon: 'chat', label: 'Messages', key: 'messages', href: '/admin/messages' },
  { icon: 'monitoring', label: 'Analytics', key: 'analytics', href: '/admin/analytics' },
  { icon: 'settings', label: 'Settings', key: 'settings', href: '/admin/settings' },
];

const monthlyViews = [
  { month: 'Jan', views: 1200, inquiries: 34, revenue: 8400 },
  { month: 'Feb', views: 1850, inquiries: 52, revenue: 12300 },
  { month: 'Mar', views: 1420, inquiries: 41, revenue: 9800 },
  { month: 'Apr', views: 2300, inquiries: 78, revenue: 18600 },
  { month: 'May', views: 3100, inquiries: 95, revenue: 24200 },
  { month: 'Jun', views: 2780, inquiries: 87, revenue: 21000 },
  { month: 'Jul', views: 3450, inquiries: 112, revenue: 28900 },
  { month: 'Aug', views: 2900, inquiries: 98, revenue: 23400 },
  { month: 'Sep', views: 3800, inquiries: 134, revenue: 34100 },
  { month: 'Oct', views: 4200, inquiries: 156, revenue: 41200 },
  { month: 'Nov', views: 3950, inquiries: 143, revenue: 38700 },
  { month: 'Dec', views: 4800, inquiries: 189, revenue: 51000 },
];

const categoryData = [
  { name: 'Technology', value: 34, color: '#131b2e' },
  { name: 'Manufacturing', value: 22, color: '#45464d' },
  { name: 'E-commerce', value: 18, color: '#76777d' },
  { name: 'Hospitality', value: 14, color: '#c6c6cd' },
  { name: 'Healthcare', value: 12, color: '#e4e2e4' },
];

const topListings = [
  { name: 'CloudScale SaaS', views: 4231, inquiries: 63, convRate: '1.49%', trend: 'up' },
  { name: 'Erhverv Precision Mfg.', views: 2891, inquiries: 41, convRate: '1.42%', trend: 'up' },
  { name: 'HealthFirst Clinics', views: 2341, inquiries: 42, convRate: '1.79%', trend: 'down' },
  { name: 'EcoRetail Group', views: 1203, inquiries: 18, convRate: '1.50%', trend: 'up' },
  { name: 'Nordic Hospitality', views: 892, inquiries: 7, convRate: '0.78%', trend: 'down' },
];

const trafficSources = [
  { source: 'Organic Search', visits: 5420, pct: 42 },
  { source: 'Direct', visits: 3180, pct: 25 },
  { source: 'Referral', visits: 2290, pct: 18 },
  { source: 'Social Media', visits: 1540, pct: 12 },
  { source: 'Email', visits: 380, pct: 3 },
];

type Period = '7d' | '30d' | '90d' | '12m';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#c6c6cd] rounded-xl shadow-lg p-4">
        <p className="text-[12px] font-semibold text-[#76777d] uppercase tracking-widest mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-[14px] font-bold text-black">
            {p.name}: <span style={{ color: p.color }}>{typeof p.value === 'number' && p.name === 'revenue' ? `€${p.value.toLocaleString()}` : p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const { isRTL, tr } = useLanguage();
  const [period, setPeriod] = useState<Period>('12m');
  const [activeMetric, setActiveMetric] = useState<'views' | 'inquiries' | 'revenue'>('views');

  const metricColor = { views: '#131b2e', inquiries: '#76777d', revenue: '#45464d' };

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
            <Link key={key} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${key === 'analytics' ? 'bg-[#dce0e4] text-[#5e6367] font-medium' : 'text-[#45464d] hover:bg-[#e4e2e4]'}`}>
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

      <main className={`min-h-screen p-10 ${isRTL ? 'mr-64' : 'ml-64'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-[#76777d] hover:text-black transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h2 className="text-[32px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{tr('analytics')}</h2>
              <p className="text-[16px] text-[#5a5f62]">Track performance across all your listings.</p>
            </div>
          </div>
          {/* Period Selector */}
          <div className="flex gap-1 bg-[#f0edef] rounded-xl p-1">
            {(['7d', '30d', '90d', '12m'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${period === p ? 'bg-white shadow-sm text-black' : 'text-[#76777d] hover:text-black'}`}
              >
                {p === '12m' ? '12 months' : p === '90d' ? '90 days' : p === '30d' ? '30 days' : '7 days'}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Views', value: '31,810', change: '+18.4%', up: true, icon: 'visibility' },
            { label: 'Total Inquiries', value: '1,219', change: '+11.2%', up: true, icon: 'mail' },
            { label: 'Avg. Time on Listing', value: '4m 32s', change: '+6.8%', up: true, icon: 'schedule' },
            { label: 'Conversion Rate', value: '1.38%', change: '-0.2%', up: false, icon: 'trending_up' },
          ].map(({ label, value, change, up, icon }) => (
            <div key={label} className="bg-white border border-[#c6c6cd] rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-[#f0edef]">
                  <span className="material-symbols-outlined text-[20px] text-[#5a5f62]">{icon}</span>
                </div>
                <span className={`text-[12px] font-bold flex items-center gap-0.5 ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                  <span className="material-symbols-outlined text-[14px]">{up ? 'arrow_upward' : 'arrow_downward'}</span>
                  {change}
                </span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5a5f62]">{label}</p>
              <p className="text-[28px] font-black text-black mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[20px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Performance Over Time</h3>
              <p className="text-[13px] text-[#76777d]">Monthly breakdown of key metrics</p>
            </div>
            <div className="flex gap-1 bg-[#f0edef] rounded-xl p-1">
              {(['views', 'inquiries', 'revenue'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all capitalize ${activeMetric === m ? 'bg-white shadow-sm text-black' : 'text-[#76777d] hover:text-black'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyViews} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricColor[activeMetric]} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={metricColor[activeMetric]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0edef" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#76777d' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#76777d' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke={metricColor[activeMetric]}
                strokeWidth={2.5}
                fill="url(#metricGrad)"
                dot={{ fill: metricColor[activeMetric], r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Row: Bar chart + Pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Inquiries by month bar */}
          <div className="lg:col-span-2 bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
            <h3 className="text-[18px] font-semibold text-black mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Inquiries per Month</h3>
            <p className="text-[13px] text-[#76777d] mb-6">Number of buyer inquiries received</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyViews} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0edef" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#76777d' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#76777d' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="inquiries" fill="#131b2e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
            <h3 className="text-[18px] font-semibold text-black mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>By Category</h3>
            <p className="text-[13px] text-[#76777d] mb-4">Listing distribution</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-[12px] text-[#45464d]">{name}</span>
                  </div>
                  <span className="text-[12px] font-bold text-black">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Top Listings + Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Listings */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
            <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Top Performing Listings</h3>
            <div className="space-y-0 divide-y divide-[#f0edef]">
              {topListings.map(({ name, views, inquiries, convRate, trend }, i) => (
                <div key={name} className="flex items-center gap-4 py-4">
                  <span className="text-[13px] font-black text-[#c6c6cd] w-6 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-black truncate">{name}</p>
                    <p className="text-[12px] text-[#76777d]">{views.toLocaleString()} views · {inquiries} leads</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-black">{convRate}</p>
                    <span className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      <span className="material-symbols-outlined text-[12px]">{trend === 'up' ? 'arrow_upward' : 'arrow_downward'}</span>
                      {trend === 'up' ? 'Rising' : 'Falling'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
            <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map(({ source, visits, pct }) => (
                <div key={source}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[14px] font-medium text-black">{source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-[#76777d]">{visits.toLocaleString()}</span>
                      <span className="text-[13px] font-bold text-black w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#f0edef] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#f0edef]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-[#76777d]">Total Sessions</p>
                  <p className="text-[28px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>12,810</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-[#76777d]">Bounce Rate</p>
                  <p className="text-[28px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>38.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}