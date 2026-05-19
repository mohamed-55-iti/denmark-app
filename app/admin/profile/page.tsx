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

export default function ProfilePage() {
  const { isRTL, tr } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Nour',
    lastName: 'Al-Rashid',
    email: 'admin@erhvervsmarked.dk',
    phone: '+45 12 34 56 78',
    title: 'Business Owner',
    company: 'erhvervsmarked ApS',
    bio: 'Passionate about connecting entrepreneurs with the right business opportunities across Northern Europe.',
    location: 'Copenhagen, Denmark',
    website: 'https://erhvervsmarked.dk',
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#fcf8fa] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`h-screen w-64 fixed top-0 bg-[#f6f3f5] border-[#c6c6cd] flex flex-col p-4 shadow-sm z-50 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}`}>
        <div className="px-4 py-6">
          <h1 className="text-[20px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>erhvervsmarked Admin</h1>
          <p className="text-[14px] text-[#5a5f62]">{tr('businessOwner')}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, key, href }) => (
            <Link key={key} href={href} className="flex items-center gap-3 rounded-lg px-4 py-3 text-[#45464d] hover:bg-[#e4e2e4] transition-all">
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

      {/* Main */}
      <main className={`min-h-screen p-10 ${isRTL ? 'mr-64' : 'ml-64'}`}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin" className="text-[#76777d] hover:text-black transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h2 className="text-[32px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Profile</h2>
            <p className="text-[16px] text-[#5a5f62]">Manage your personal information and public presence.</p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <p className="text-emerald-700 font-medium">Profile saved successfully.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Card */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-[36px] font-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                NA
              </div>
              <button className="absolute bottom-0 right-0 w-9 h-9 bg-white border-2 border-[#c6c6cd] rounded-full flex items-center justify-center hover:bg-[#f6f3f5] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </button>
            </div>
            <h3 className="text-[20px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {form.firstName} {form.lastName}
            </h3>
            <p className="text-[14px] text-[#5a5f62] mt-1">{form.title}</p>
            <p className="text-[14px] text-[#76777d]">{form.company}</p>

            <div className="w-full border-t border-[#c6c6cd] mt-6 pt-6 space-y-3 text-left">
              {[
                { icon: 'location_on', value: form.location },
                { icon: 'language', value: form.website },
                { icon: 'mail', value: form.email },
              ].map(({ icon, value }) => (
                <div key={icon} className="flex items-center gap-3 text-[14px] text-[#45464d]">
                  <span className="material-symbols-outlined text-[18px] text-[#76777d]">{icon}</span>
                  <span className="truncate">{value}</span>
                </div>
              ))}
            </div>

            <div className="w-full mt-6 pt-6 border-t border-[#c6c6cd]">
              <div className="flex justify-between text-center">
                {[{ label: 'Listings', value: '12' }, { label: 'Sold', value: '4' }, { label: 'Reviews', value: '98%' }].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[20px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</p>
                    <p className="text-[12px] text-[#76777d] uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-semibold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>Personal Information</h3>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-[#f6f3f5] transition-colors">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(false)} className="px-4 py-2 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-[#f6f3f5] transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg text-[14px] font-medium hover:opacity-90 transition-opacity">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'First Name', field: 'firstName' },
                  { label: 'Last Name', field: 'lastName' },
                  { label: 'Email', field: 'email' },
                  { label: 'Phone', field: 'phone' },
                  { label: 'Job Title', field: 'title' },
                  { label: 'Company', field: 'company' },
                  { label: 'Location', field: 'location' },
                  { label: 'Website', field: 'website' },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">{label}</label>
                    {editing ? (
                      <input
                        value={form[field as keyof typeof form]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] transition-colors bg-[#fcf8fa]"
                      />
                    ) : (
                      <p className="text-[15px] text-black py-3 px-4 bg-[#f6f3f5] rounded-lg">{form[field as keyof typeof form]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#5a5f62] mb-2">Bio</label>
                {editing ? (
                  <textarea
                    value={form.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#e4e2e4] rounded-lg focus:border-black focus:outline-none text-[15px] transition-colors bg-[#fcf8fa] resize-none"
                  />
                ) : (
                  <p className="text-[15px] text-black py-3 px-4 bg-[#f6f3f5] rounded-lg leading-relaxed">{form.bio}</p>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-[#ffdad6] rounded-xl p-8 shadow-sm">
              <h3 className="text-[18px] font-semibold text-[#ba1a1a] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Danger Zone</h3>
              <p className="text-[14px] text-[#5a5f62] mb-6">Irreversible actions. Please proceed with caution.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-5 py-2.5 border border-[#c6c6cd] rounded-lg text-[14px] font-medium hover:bg-[#f6f3f5] transition-colors">
                  Deactivate Account
                </button>
                <button className="px-5 py-2.5 bg-[#ba1a1a] text-white rounded-lg text-[14px] font-medium hover:opacity-90 transition-opacity">
                  Delete Account Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}