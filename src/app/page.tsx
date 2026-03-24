"use client";

import React, { useState, useEffect } from 'react';
import { Pizza, Sparkles, Zap, Clock, ArrowRight, Home, Rocket, Star, Heart } from 'lucide-react';

export default function HomvationsHub() {
  // --- HYDRATION SHIELD ---
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If the app hasn't "mounted" yet, show nothing or a simple loading screen
  // This prevents Error #299 and extension conflicts
  if (!mounted) {
    return <div className="min-h-screen bg-[#fdfaff]" />;
  }

  return (
    <div className="min-h-screen bg-[#fdfaff] text-[#2d1b4d] selection:bg-purple-200 font-sans pb-32">
      
      {/* --- PLAYFUL TOP DECORATION --- */}
      <div className="h-2 bg-gradient-to-r from-purple-500 via-orange-400 to-teal-400 w-full" />

      {/* --- NAVIGATION --- */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-purple-600 p-2.5 rounded-2xl rotate-3 group-hover:rotate-0 transition-all shadow-lg shadow-purple-200">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-purple-900">
            HOMVATIONS
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-purple-900/60 uppercase tracking-widest">
          <a href="mailto:support@homvations.com" className="hover:text-purple-600 transition-colors">Support</a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 px-4 py-2 rounded-full text-orange-600 text-sm font-bold mb-8 animate-bounce">
          <Sparkles size={16} />
          <span>At Home with Innovation</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-purple-950 tracking-tight">
          Where <span className="text-purple-600 italic">Innovative</span> <br />
          <span className="text-purple-600">Solutions</span> feel <br />
          right at <span className="text-orange-500 underline decoration-teal-400 decoration-8 underline-offset-4">Home</span>.
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-16 text-purple-900/60 font-medium leading-relaxed">
          Homvations is your personal launchpad for AI tools that make the future feel familiar, fun, and incredibly useful.
        </p>

        {/* --- THE HUB APP GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          
          {/* Card 1: Purple Pizza AI */}
          <div className="group relative bg-white border-4 border-purple-600 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-3xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Pizza size={40} />
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-2 shadow-sm">Active Now</span>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-orange-400 text-orange-400" />)}
                </div>
              </div>
            </div>
            
            <h3 className="text-3xl font-black mb-4 text-purple-900">Purple Pizza AI</h3>
            <p className="text-purple-900/70 mb-10 font-medium text-lg leading-relaxed">
              Our flagship AI chef! Designing the world's most innovative pizzas and food art with a single prompt.
            </p>
            
            <a 
              href="https://purplepizzaai.com/" 
              target="_blank" 
              className="flex items-center justify-center gap-3 bg-purple-600 text-white font-black py-4 px-8 rounded-2xl hover:bg-orange-500 transition-all text-lg shadow-lg shadow-purple-200"
            >
              Launch App
              <ArrowRight size={22} />
            </a>
          </div>

          {/* Card 2: Future Innovation Slot */}
          <div className="bg-white/50 border-4 border-dashed border-purple-200 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center opacity-80">
            <div className="bg-teal-50 text-teal-500 p-6 rounded-full mb-6">
              <Rocket size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-purple-900">Next Innovation</h3>
            <p className="text-purple-900/50 font-medium">
              We're currently "cooking up" <br />something new in the lab.
            </p>
            <div className="mt-8 bg-purple-50 text-purple-400 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest border border-purple-100">
              Developing...
            </div>
          </div>

        </div>
      </main>

      {/* --- FRIENDLY TOKEN & TIME TRACKER --- */}
      <footer className="fixed bottom-6 left-0 right-0 px-4 md:px-6 z-50">
        <div className="max-w-4xl mx-auto bg-white border-4 border-purple-900 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          
          {/* Trial Timer */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-2xl text-orange-600 animate-pulse">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-orange-600 tracking-tighter">Your Free Trial</p>
              <p className="text-base font-bold text-purple-950">6 Days Remaining</p>
            </div>
          </div>

          {/* Token Usage */}
          <div className="flex-1 min-w-[200px]">
             <div className="flex justify-between items-end mb-2">
               <div className="flex items-center gap-2">
                 <Zap size={16} className="text-teal-500 fill-teal-500" />
                 <span className="text-[10px] font-black text-purple-900 uppercase">Energy Levels</span>
               </div>
               <span className="text-xs font-black text-purple-900">84 / 100 Use</span>
             </div>
             <div className="h-4 w-full bg-purple-50 rounded-full border-2 border-purple-900 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 via-purple-400 to-purple-600 transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
                  style={{ width: '84%' }}
                />
             </div>
          </div>

          {/* CTA */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-black px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-md hover:shadow-orange-200">
            GET MORE ENERGY
          </button>
          
        </div>
      </footer >

      {/* Fun Background Accents */}
      <div className="fixed top-20 right-[10%] -z-10 text-orange-200 rotate-12 opacity-50"><Heart size={120} /></div>
      <div className="fixed bottom-40 left-[5%] -z-10 text-purple-200 -rotate-12 opacity-50"><Star size={80} /></div>
    </div>
  );
}