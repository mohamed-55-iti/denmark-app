'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', key: 'dashboard', href: '/admin' },
  { icon: 'list_alt', label: 'My Listings', key: 'listings', href: '/admin/listings' },
  { icon: 'chat', label: 'Messages', key: 'messages', href: '/admin/messages' },
  { icon: 'monitoring', label: 'Analytics', key: 'analytics', href: '/admin/analytics' },
  { icon: 'settings', label: 'Settings', key: 'settings', href: '/admin/settings' },
];

interface Message {
  id: number;
  text: string;
  from: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  initials: string;
  listing: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'Erik Andersen',
    initials: 'EA',
    listing: 'CloudScale SaaS',
    lastMessage: 'Can we schedule a call to discuss the financials?',
    time: '2m ago',
    unread: 3,
    online: true,
    messages: [
      { id: 1, text: 'Hello, I am very interested in CloudScale SaaS. Could you provide more details about the MRR and churn rate?', from: 'them', time: '10:12' },
      { id: 2, text: 'Hi Erik! MRR is currently €48,000 with 2.1% monthly churn. Happy to share the full data room.', from: 'me', time: '10:18' },
      { id: 3, text: 'That sounds promising. What is the team size and are key employees willing to stay post-acquisition?', from: 'them', time: '10:25' },
      { id: 4, text: 'We have 8 FTEs. The CTO and lead developer have both signed retention agreements for 18 months.', from: 'me', time: '10:31' },
      { id: 5, text: 'Can we schedule a call to discuss the financials?', from: 'them', time: '10:45' },
    ],
  },
  {
    id: 2,
    name: 'Sofie Larsen',
    initials: 'SL',
    listing: 'Erhverv Precision Mfg.',
    lastMessage: 'I have reviewed the due diligence documents.',
    time: '1h ago',
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: 'Good morning. I represent a private equity firm interested in industrial assets in Scandinavia.', from: 'them', time: '09:05' },
      { id: 2, text: 'Good morning Sofie! Erhverv Precision is a great fit — established in 1998, 40+ enterprise clients.', from: 'me', time: '09:10' },
      { id: 3, text: 'I have reviewed the due diligence documents.', from: 'them', time: '09:55' },
    ],
  },
  {
    id: 3,
    name: 'Mads Christensen',
    initials: 'MC',
    listing: 'EcoRetail Group',
    lastMessage: 'Thanks for the info! I will get back to you.',
    time: '3h ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Hi, I saw EcoRetail Group listed. Is the €920k price negotiable?', from: 'them', time: '07:30' },
      { id: 2, text: 'Hi Mads! The sellers have some flexibility. What offer range are you considering?', from: 'me', time: '07:45' },
      { id: 3, text: 'Probably around €800k if the inventory checks out.', from: 'them', time: '07:52' },
      { id: 4, text: 'That could work. I can arrange a physical inspection of the warehouse for next week.', from: 'me', time: '08:01' },
      { id: 5, text: 'Thanks for the info! I will get back to you.', from: 'them', time: '08:10' },
    ],
  },
  {
    id: 4,
    name: 'Anna Bech',
    initials: 'AB',
    listing: 'HealthFirst Clinics',
    lastMessage: 'We have submitted a formal LOI.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Following our call on Monday, I want to confirm our interest in HealthFirst Clinics.', from: 'them', time: 'Tue 14:20' },
      { id: 2, text: 'Great to hear from you, Anna. The sellers are still in discussions with one other party.', from: 'me', time: 'Tue 14:35' },
      { id: 3, text: 'Understood. We have submitted a formal LOI.', from: 'them', time: 'Tue 15:00' },
    ],
  },
  {
    id: 5,
    name: 'Tobias Holm',
    initials: 'TH',
    listing: 'CloudScale SaaS',
    lastMessage: 'Is the SaaS product B2B or B2C?',
    time: 'Mon',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Hi, quick question — is the SaaS product B2B or B2C?', from: 'them', time: 'Mon 11:00' },
      { id: 2, text: 'Is the SaaS product B2B or B2C?', from: 'them', time: 'Mon 11:05' },
    ],
  },
];

export default function MessagesPage() {
  const { isRTL, tr } = useLanguage();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<number>(1);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active?.messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now(), text: input.trim(), from: 'me', time: 'Now' };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: input.trim(), time: 'Just now', unread: 0 }
          : c
      )
    );
    setInput('');
  };

  const handleSelect = (id: number) => {
    setActiveId(id);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.listing.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

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
            <Link key={key} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${key === 'messages' ? 'bg-[#dce0e4] text-[#5e6367] font-medium' : 'text-[#45464d] hover:bg-[#e4e2e4]'}`}>
              <span className="material-symbols-outlined">{icon}</span>
              <span className="font-medium">{label}</span>
              {key === 'messages' && totalUnread > 0 && (
                <span className="ml-auto bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{totalUnread}</span>
              )}
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

      {/* Messages Layout */}
      <div className={`flex h-screen ${isRTL ? 'mr-64' : 'ml-64'}`}>

        {/* Conversation List */}
        <div className="w-80 flex-shrink-0 border-r border-[#c6c6cd] bg-white flex flex-col">
          <div className="p-5 border-b border-[#c6c6cd]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {tr('messages')}
                {totalUnread > 0 && (
                  <span className="ml-2 text-[13px] bg-black text-white px-2 py-0.5 rounded-full">{totalUnread}</span>
                )}
              </h2>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#f6f3f5] rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-[40px] text-[#c6c6cd]">chat</span>
                <p className="text-[14px] text-[#76777d] mt-2">No conversations found.</p>
              </div>
            ) : (
              filteredConvs.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelect(conv.id)}
                  className={`w-full text-left p-5 border-b border-[#f0edef] transition-colors hover:bg-[#f6f3f5] ${activeId === conv.id ? 'bg-[#f0edef]' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[13px] font-bold">
                        {conv.initials}
                      </div>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className={`text-[14px] ${conv.unread > 0 ? 'font-bold text-black' : 'font-semibold text-black'}`}>{conv.name}</p>
                        <span className="text-[11px] text-[#76777d] flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-[12px] text-[#76777d] truncate">{conv.listing}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className={`text-[13px] truncate flex-1 ${conv.unread > 0 ? 'font-medium text-black' : 'text-[#76777d]'}`}>
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <span className="ml-2 bg-black text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-[#fcf8fa]">
          {/* Chat Header */}
          <div className="bg-white border-b border-[#c6c6cd] px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[13px] font-bold">
                  {active.initials}
                </div>
                {active.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-bold text-black text-[15px]">{active.name}</p>
                <p className="text-[12px] text-[#76777d]">
                  Re: {active.listing} · {active.online ? 'Online now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black" title="Schedule call">
                <span className="material-symbols-outlined text-[20px]">video_call</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black" title="View listing">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-[#f0edef] transition-colors text-[#76777d] hover:text-black" title="More options">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* Listing Context Banner */}
          <div className="bg-[#f0edef] border-b border-[#c6c6cd] px-8 py-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-[16px] text-[#76777d]">storefront</span>
            <span className="text-[13px] text-[#5a5f62]">Discussing:</span>
            <span className="text-[13px] font-semibold text-black">{active.listing}</span>
            <Link href={`/listings/1`} className="ml-auto text-[12px] text-[#76777d] hover:text-black flex items-center gap-1 transition-colors">
              View listing
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            {active.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[65%] ${msg.from === 'me' ? 'order-2' : 'order-1'}`}>
                  {msg.from === 'them' && (
                    <p className="text-[11px] text-[#76777d] mb-1 ml-1">{active.name}</p>
                  )}
                  <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-black text-white rounded-tr-sm'
                      : 'bg-white border border-[#e4e2e4] text-black rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-[11px] text-[#76777d] mt-1 ${msg.from === 'me' ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-[#c6c6cd] px-6 py-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 bg-[#f6f3f5] rounded-2xl px-4 py-3 flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Message ${active.name}...`}
                  rows={1}
                  className="flex-1 bg-transparent text-[14px] text-black placeholder-[#76777d] focus:outline-none resize-none max-h-32"
                  style={{ minHeight: '24px' }}
                />
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-[#e4e2e4] transition-colors text-[#76777d]">
                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#e4e2e4] transition-colors text-[#76777d]">
                    <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-11 h-11 bg-black text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
            <p className="text-[11px] text-[#76777d] mt-2 ml-1">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}