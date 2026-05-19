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

type Tab = 'account' | 'notifications' | 'security' | 'billing';

const tabs: { key: Tab; icon: string; label: string }[] = [
  { key: 'account', icon: 'manage_accounts', label: 'Account' },
  { key: 'notifications', icon: 'notifications', label: 'Notifications' },
  { key: 'security', icon: 'lock', label: 'Security' },
  { key: 'billing', icon: 'credit_card', label: 'Billing' },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-black' : 'bg-[#c6c6cd]'}`}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-6' : 'left-1'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { isRTL, tr, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [saved, setSaved] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [notifs, setNotifs] = useState({
    newMessage: true,
    listingApproved: true,
    listingRejected: true,
    newOffer: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
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
            <Link key={key} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${key === 'settings' ? 'bg-[#dce0e4] text-[#5e6367] font-medium' : 'text-[#45464d] hover:bg-[#e4e2e4]'}`}>
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
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin" className="text-[#76777d] hover:text-black transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h2 className="text-[32px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{tr('accountSettings')}</h2>
            <p className="text-[16px] text-[#5a5f62]">Manage your account preferences and security.</p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <p className="text-emerald-700 font-medium">Settings saved successfully.</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f0edef] rounded-xl p-1 mb-8 w-fit">
          {tabs.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all ${activeTab === key ? 'bg-white shadow-sm text-black' : 'text-[#76777d] hover:text-black'}`}
            >
              <span className="material-symbols-outlined text-[16px]">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>General Preferences</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">Display Name</label>
                  <input defaultValue="NA Username" className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] bg-[#fcf8fa]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">Language</label>
                  <div className="flex gap-3">
                    {[{ code: 'en', label: 'English' }, { code: 'da', label: 'Dansk' }, { code: 'ar', label: 'العربية' }].map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => setLanguage(code as 'en' | 'da' | 'ar')}
                        className={`px-4 py-2 rounded-lg border-2 text-[14px] font-medium transition-all ${language === code ? 'border-black bg-black text-white' : 'border-[#e4e2e4] hover:border-black'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">Timezone</label>
                  <select className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] bg-[#fcf8fa]">
                    <option>Europe/Copenhagen (UTC+1)</option>
                    <option>Europe/London (UTC+0)</option>
                    <option>America/New_York (UTC-5)</option>
                    <option>Asia/Dubai (UTC+4)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">Currency Display</label>
                  <select className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] bg-[#fcf8fa]">
                    <option>EUR (€)</option>
                    <option>DKK (kr.)</option>
                    <option>USD ($)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSave} className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity">
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Email Notifications</h3>
              <div className="space-y-5">
                {[
                  { key: 'newMessage', label: 'New messages', desc: 'When a buyer or seller sends you a message' },
                  { key: 'listingApproved', label: 'Listing approved', desc: 'When your listing passes review' },
                  { key: 'listingRejected', label: 'Listing rejected', desc: 'When your listing requires changes' },
                  { key: 'newOffer', label: 'New offer received', desc: 'When someone makes an offer on your listing' },
                  { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary of activity every Monday' },
                  { key: 'marketingEmails', label: 'Marketing & updates', desc: 'Product news and platform announcements' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-[#f0edef] last:border-0">
                    <div>
                      <p className="text-[15px] font-medium text-black">{label}</p>
                      <p className="text-[13px] text-[#76777d]">{desc}</p>
                    </div>
                    <Toggle on={notifs[key as keyof typeof notifs]} onToggle={() => toggleNotif(key as keyof typeof notifs)} />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity">
                Save Notifications
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Password</h3>
              {!showPasswordForm ? (
                <div className="flex items-center justify-between py-4 bg-[#f6f3f5] rounded-xl px-6">
                  <div>
                    <p className="font-medium text-black">Password</p>
                    <p className="text-[13px] text-[#76777d]">Last changed 30 days ago</p>
                  </div>
                  <button onClick={() => setShowPasswordForm(true)} className="px-4 py-2 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-white transition-colors">
                    Change
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                    <div key={label}>
                      <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">{label}</label>
                      <input type="password" className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] bg-[#fcf8fa]" />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setShowPasswordForm(false)} className="px-4 py-2 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-[#f6f3f5]">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg text-[14px] font-bold hover:opacity-90">Update Password</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Two-Factor Authentication</h3>
              <p className="text-[14px] text-[#5a5f62] mb-6">Add an extra layer of security to your account.</p>
              <div className="flex items-center justify-between py-4 bg-[#f6f3f5] rounded-xl px-6">
                <div>
                  <p className="font-medium text-black">Authenticator App</p>
                  <p className="text-[13px] text-[#76777d]">{twoFactor ? 'Enabled — your account is protected' : 'Not configured'}</p>
                </div>
                <Toggle on={twoFactor} onToggle={() => setTwoFactor((v) => !v)} />
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Active Sessions</h3>
              {[
                { device: 'Chrome on macOS', location: 'Copenhagen, DK', time: 'Active now', current: true },
                { device: 'Safari on iPhone', location: 'Copenhagen, DK', time: '2 hours ago', current: false },
                { device: 'Firefox on Windows', location: 'Aarhus, DK', time: '3 days ago', current: false },
              ].map(({ device, location, time, current }) => (
                <div key={device} className="flex items-center justify-between py-4 border-b border-[#f0edef] last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f0edef] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px] text-[#5a5f62]">devices</span>
                    </div>
                    <div>
                      <p className="font-medium text-black text-[14px]">{device}</p>
                      <p className="text-[12px] text-[#76777d]">{location} · {time}</p>
                    </div>
                  </div>
                  {current ? (
                    <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">This device</span>
                  ) : (
                    <button className="text-[13px] text-[#ba1a1a] hover:underline font-medium">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Current Plan</h3>
              <p className="text-[14px] text-[#5a5f62] mb-6">Your subscription and usage details.</p>
              <div className="bg-black text-white rounded-xl p-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[12px] font-semibold tracking-widest uppercase text-[#c6c6cd] mb-1">CURRENT PLAN</p>
                    <p className="text-[28px] font-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Professional</p>
                    <p className="text-[#c6c6cd] text-[14px] mt-1">€149 / month · Renews Jun 14, 2026</p>
                  </div>
                  <span className="bg-white text-black text-[12px] font-bold px-3 py-1 rounded-full">ACTIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#333]">
                  {[{ label: 'Listings', used: '12', limit: '25' }, { label: 'Messages', used: '843', limit: 'Unlimited' }, { label: 'Storage', used: '2.1 GB', limit: '10 GB' }].map(({ label, used, limit }) => (
                    <div key={label}>
                      <p className="text-[11px] text-[#c6c6cd] uppercase tracking-widest">{label}</p>
                      <p className="font-bold text-white">{used}<span className="font-normal text-[#c6c6cd] text-[13px]"> / {limit}</span></p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-black text-white rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity">Upgrade Plan</button>
                <button className="px-5 py-2.5 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-[#f6f3f5] transition-colors">Cancel Subscription</button>
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Payment Method</h3>
              <div className="flex items-center justify-between py-4 bg-[#f6f3f5] rounded-xl px-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-black">•••• •••• •••• 4242</p>
                    <p className="text-[13px] text-[#76777d]">Expires 12/27</p>
                  </div>
                </div>
                <button className="text-[14px] font-medium text-black hover:underline">Update</button>
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-black mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Invoice History</h3>
              {[
                { date: 'May 14, 2026', amount: '€149.00', status: 'Paid' },
                { date: 'Apr 14, 2026', amount: '€149.00', status: 'Paid' },
                { date: 'Mar 14, 2026', amount: '€149.00', status: 'Paid' },
              ].map(({ date, amount, status }) => (
                <div key={date} className="flex items-center justify-between py-4 border-b border-[#f0edef] last:border-0">
                  <div>
                    <p className="font-medium text-black text-[14px]">{date}</p>
                    <p className="text-[13px] text-[#76777d]">Professional Plan</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-600 font-bold text-[13px] bg-emerald-50 px-2 py-0.5 rounded-full">{status}</span>
                    <p className="font-bold text-black">{amount}</p>
                    <button className="text-[13px] text-[#76777d] hover:text-black transition-colors">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}