"use client";

import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import {
  Pizza,
  Home,
  Rocket,
  Hammer,
  Accessibility,
  Scale,
  Leaf,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

// Apps unlocked once a visitor submits the name/email form are remembered
// here so they don't have to sign up again on every visit.
const UNLOCK_STORAGE_KEY = 'homvations_unlocked';

export default function HomvationsHub() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Reading localStorage after mount (rather than during render) avoids a
    // server/client hydration mismatch, since this value only exists in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(window.localStorage.getItem(UNLOCK_STORAGE_KEY) === 'true');
  }, []);

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(UNLOCK_STORAGE_KEY, 'true');
    }
    setUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f2f5f6] font-sans relative overflow-hidden pb-28">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-56 left-[8%] w-[640px] h-[640px] rounded-full bg-teal-500/30 blur-[90px]" />
      <div className="pointer-events-none absolute top-10 right-[4%] w-[560px] h-[560px] rounded-full bg-purple-600/30 blur-[90px]" />
      <div className="pointer-events-none absolute top-[1180px] left-[42%] w-[700px] h-[500px] rounded-full bg-orange-500/20 blur-[100px]" />

      {/* --- FLOATING GLASS NAV --- */}
      <div className="relative z-10 max-w-[1140px] mx-auto pt-6 px-6">
        <nav className="flex justify-between items-center px-5 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-2 rounded-xl shadow-[0_0_24px_rgba(45,212,191,0.55)]">
              <Home size={20} className="text-[#0a0e14]" strokeWidth={2.4} />
            </div>
            <span className="text-lg font-black tracking-tight text-[#f2f5f6]">Homvations</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#apps" className="text-sm font-semibold text-[rgba(242,245,246,0.65)] hover:text-[#f2f5f6] transition-colors">
              Apps
            </a>
            <a href="#commitments" className="text-sm font-semibold text-[rgba(242,245,246,0.65)] hover:text-[#f2f5f6] transition-colors">
              Commitments
            </a>
            <a
              href="#signup"
              className="text-sm font-bold text-[#0a0e14] bg-gradient-to-br from-teal-300 to-teal-400 px-5 py-2.5 rounded-xl shadow-[0_0_22px_rgba(45,212,191,0.4)] hover:opacity-90 transition-opacity"
            >
              Join waitlist
            </a>
          </div>
        </nav>
      </div>

      <main className="relative z-10 max-w-[1140px] mx-auto px-6 pt-22 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4.5 py-2 rounded-full text-[13px] font-bold text-teal-300 mb-8">
          <ShieldCheck size={14} />
          Now accepting waitlist sign-ups
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.02] tracking-tight text-balance bg-gradient-to-br from-white via-teal-200 to-purple-200 bg-clip-text text-transparent">
          Innovation lives here.
        </h1>
        <p className="text-lg md:text-xl text-[rgba(242,245,246,0.62)] font-medium mb-11 max-w-xl mx-auto">
          One sign-up gets you on the list for every app in the Homvations hub, as each one launches — built to be accessible, secure, and sustainable from day one.
        </p>

        {/* trust row */}
        <div className="flex justify-center gap-3.5 flex-wrap mb-18">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[rgba(242,245,246,0.75)] bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-full">
            <ShieldCheck size={15} className="text-teal-300" /> Encrypted &amp; private
          </span>
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[rgba(242,245,246,0.75)] bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-full">
            <CheckCircle2 size={15} className="text-teal-300" /> No spam, ever
          </span>
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[rgba(242,245,246,0.75)] bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-full">
            <CheckCircle2 size={15} className="text-teal-300" /> Unsubscribe anytime
          </span>
        </div>

        {/* --- JOIN THE HOMVATIONS WAITLIST --- */}
        <div
          id="signup"
          className="max-w-md mx-auto mb-18 bg-white/[0.045] backdrop-blur-2xl border border-teal-300/20 rounded-[28px] p-8 text-left scroll-mt-24"
        >
          <p className="text-[13px] font-semibold text-teal-300 mb-5 text-center">
            One sign-up. Every Homvations project, as it launches.
          </p>
          <Auth heading="Join the Homvations waitlist" onSuccess={handleUnlock} />
        </div>

        {/* --- BENTO GRID --- */}
        <div
          id="apps"
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 text-left mb-24 scroll-mt-24"
        >
          <div className="md:col-span-2 md:row-span-2 relative bg-white/[0.045] backdrop-blur-2xl border border-purple-300/20 rounded-[28px] p-9 flex flex-col overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full bg-purple-400/40 blur-[40px]" />
            <div className="relative z-10 flex justify-between items-start mb-7">
              <div className="relative flex items-center justify-center">
                <div className="absolute rounded-full bg-purple-300/55 blur-[24px]" style={{ width: 84, height: 84 }} />
                <div className="relative bg-purple-300/15 border border-purple-300/30 text-purple-300 p-4 rounded-2xl">
                  <Pizza size={32} />
                </div>
              </div>
              <span className="flex items-center gap-1.5 bg-white/[0.07] border border-white/[0.12] text-[#f2f5f6] text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wide">
                <Hammer size={11} /> Under innovation
              </span>
            </div>
            <h3 className="relative z-10 text-3xl font-black mb-2.5 text-[#f2f5f6] tracking-tight">Purple Pizza AI</h3>
            <p className="relative z-10 text-[15px] text-[rgba(242,245,246,0.6)] mb-7 font-medium leading-relaxed max-w-md">
              Our flagship AI chef, designing the world&apos;s most inventive pizzas. Still under innovation — join the Homvations waitlist above and we&apos;ll let you know the moment it opens.
            </p>
            <a
              href="#signup"
              className="relative z-10 mt-auto max-w-md w-full flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-[#f2f5f6] font-bold py-4 rounded-2xl hover:bg-white/15 transition-colors text-base"
            >
              Join the waitlist
            </a>
          </div>

          {/* trust card */}
          <div className="bg-white/[0.045] backdrop-blur-2xl border border-teal-300/20 rounded-[24px] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-teal-300/15 border border-teal-300/30 text-teal-300 p-2 rounded-xl">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-[15px] font-black text-[#f2f5f6]">Built to be trusted</h4>
            </div>
            <div className="flex flex-col gap-2.5">
              {["End-to-end encrypted", "No data resold, ever", "One-click unsubscribe"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[13px] font-semibold text-[rgba(242,245,246,0.68)]">
                  <CheckCircle2 size={14} className="text-teal-300 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* next innovation teaser */}
          <div className="bg-white/[0.025] border border-dashed border-teal-300/25 rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-3.5">
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full bg-teal-300/40 blur-[20px]" style={{ width: 64, height: 64 }} />
              <div className="relative bg-teal-300/10 text-teal-300 p-3.5 rounded-full">
                <Rocket size={24} />
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-black text-[#f2f5f6] mb-1">Next innovation</h4>
              <p className="text-[12.5px] text-[rgba(242,245,246,0.6)] font-medium">
                {unlocked ? "Coming soon. We'll let you know the moment it's live." : "Coming soon to your hub."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* --- OUR COMMITMENTS --- */}
      <section id="commitments" className="relative z-10 max-w-[1100px] mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-4xl md:text-[38px] font-black mb-3.5 text-[#f2f5f6] tracking-tight">
            Our Commitments
          </h2>
          <p className="text-base text-[rgba(242,245,246,0.55)] font-medium leading-relaxed">
            Every app in this hub is built on the same three principles, not just stated on this page.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="hidden md:block absolute top-[34px] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-teal-300/40 via-purple-300/40 to-orange-300/40" />

          <div className="relative bg-white/[0.045] backdrop-blur-xl border border-teal-300/20 rounded-[22px] p-7">
            <div className="relative w-fit mb-5">
              <div className="absolute rounded-full bg-teal-300/40 blur-[18px]" style={{ width: 62, height: 62 }} />
              <div className="relative bg-teal-300/12 text-teal-300 p-3 rounded-2xl">
                <Accessibility size={26} />
              </div>
            </div>
            <h3 className="text-lg font-black mb-2.5 text-[#f2f5f6]">Accessibility</h3>
            <p className="text-[13.5px] text-[rgba(242,245,246,0.55)] font-medium leading-relaxed">
              We build to WCAG standards &mdash; keyboard navigation, screen-reader support, and readable
              contrast &mdash; so every app works for every visitor, not just some.
            </p>
          </div>

          <div className="relative bg-white/[0.045] backdrop-blur-xl border border-purple-300/20 rounded-[22px] p-7">
            <div className="relative w-fit mb-5">
              <div className="absolute rounded-full bg-purple-300/40 blur-[18px]" style={{ width: 62, height: 62 }} />
              <div className="relative bg-purple-300/12 text-purple-300 p-3 rounded-2xl">
                <Scale size={26} />
              </div>
            </div>
            <h3 className="text-lg font-black mb-2.5 text-[#f2f5f6]">Equality</h3>
            <p className="text-[13.5px] text-[rgba(242,245,246,0.55)] font-medium leading-relaxed">
              We design for diverse communities from the start, not as an afterthought, and hold our
              products to that standard before they ship.
            </p>
          </div>

          <div className="relative bg-white/[0.045] backdrop-blur-xl border border-orange-300/20 rounded-[22px] p-7">
            <div className="relative w-fit mb-5">
              <div className="absolute rounded-full bg-orange-300/40 blur-[18px]" style={{ width: 62, height: 62 }} />
              <div className="relative bg-orange-300/12 text-orange-300 p-3 rounded-2xl">
                <Leaf size={26} />
              </div>
            </div>
            <h3 className="text-lg font-black mb-2.5 text-[#f2f5f6]">Sustainability</h3>
            <p className="text-[13.5px] text-[rgba(242,245,246,0.55)] font-medium leading-relaxed">
              We choose efficient infrastructure and mindful defaults, aiming to build apps that do
              more with less.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
