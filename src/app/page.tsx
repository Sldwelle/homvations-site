"use client";

import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import { Pizza, ArrowRight, Home, Rocket, Star, Heart, Lock, Accessibility, Scale, Leaf } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f7fffc] text-[#153a52] font-sans pb-32">
      <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-500 w-full" />

      {/* --- NAVIGATION --- */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-teal-500 p-2.5 rounded-2xl shadow-lg shadow-teal-200">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-teal-700">HOMVATIONS</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[1.1] text-teal-700 tracking-tight">
          Innovation Lives Here
        </h1>
        <p className="text-lg text-[#153a52]/70 font-medium mb-12 max-w-2xl mx-auto">
          Sign up once to unlock every app in the Homvations hub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {unlocked ? (
            <div className="group relative bg-white border-4 border-teal-400 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)] transition-all">
              <div className="flex justify-between items-start mb-10">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-3xl"><Pizza size={40} /></div>
                <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Active</span>
              </div>
              <h3 className="text-3xl font-black mb-4 text-purple-900">Purple Pizza AI</h3>
              <p className="text-purple-900/70 mb-10 font-medium text-lg leading-relaxed">Our flagship AI chef! Designing the world&apos;s most innovative pizzas.</p>
              <a
                href="https://purplepizzaai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-purple-600 text-white font-black py-4 px-8 rounded-2xl hover:bg-orange-500 transition-all text-lg shadow-lg shadow-purple-200"
              >
                Launch App <ArrowRight size={22} />
              </a>
            </div>
          ) : (
            <div className="bg-white border-4 border-purple-900 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)]">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-3xl"><Pizza size={40} /></div>
                <span className="flex items-center gap-1 bg-[#153a52] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  <Lock size={12} /> Locked
                </span>
              </div>
              <h3 className="text-3xl font-black mb-2 text-purple-900">Purple Pizza AI</h3>
              <p className="text-purple-900/70 mb-6 font-medium leading-relaxed">Our flagship AI chef! Enter your name and email below to unlock it.</p>
              <Auth heading="Unlock Purple Pizza AI" onSuccess={handleUnlock} />
            </div>
          )}

          <div className="bg-white/50 border-4 border-dashed border-teal-700 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center opacity-80">
            <div className="bg-teal-50 text-teal-500 p-6 rounded-full mb-6"><Rocket size={40} /></div>
            <h3 className="text-2xl font-bold mb-2 text-teal-800">Next Innovation</h3>
            <p className="text-purple-900/50 font-medium">Coming soon to your hub.</p>
          </div>
        </div>
      </main>

      {/* --- OUR COMMITMENTS --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-teal-700 tracking-tight">
            Our Commitments
          </h2>
          <p className="text-lg text-[#153a52]/70 font-medium max-w-2xl mx-auto">
            Every app in this hub is built on the same three principles, not just stated on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white border-4 border-teal-700 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(20,184,166,0.15)]">
            <div className="bg-teal-50 text-teal-600 p-4 rounded-3xl w-fit mb-6">
              <Accessibility size={36} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-teal-800">Accessibility</h3>
            <p className="text-[#153a52]/70 font-medium leading-relaxed">
              We build to WCAG standards &mdash; keyboard navigation, screen-reader support, and readable
              contrast &mdash; so every app works for every visitor, not just some.
            </p>
          </div>

          <div className="bg-white border-4 border-purple-900 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)]">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-3xl w-fit mb-6">
              <Scale size={36} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-purple-900">Equality</h3>
            <p className="text-purple-900/70 font-medium leading-relaxed">
              We design for diverse communities from the start, not as an afterthought, and hold our
              products to that standard before they ship.
            </p>
          </div>

          <div className="bg-white border-4 border-orange-500 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(249,115,22,0.15)]">
            <div className="bg-orange-50 text-orange-500 p-4 rounded-3xl w-fit mb-6">
              <Leaf size={36} />
            </div>
            <h3 className="text-2xl font-black mb-3 text-orange-700">Sustainability</h3>
            <p className="text-[#153a52]/70 font-medium leading-relaxed">
              We choose efficient infrastructure and mindful defaults, aiming to build apps that do
              more with less.
            </p>
          </div>
        </div>
      </section>

      <div className="fixed top-20 right-[10%] -z-10 text-orange-200 rotate-12 opacity-50"><Heart size={120} /></div>
      <div className="fixed bottom-40 left-[5%] -z-10 text-purple-200 -rotate-12 opacity-50"><Star size={80} /></div>
    </div>
  );
}
