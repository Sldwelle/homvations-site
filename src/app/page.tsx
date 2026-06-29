"use client";

import React from 'react';
import Auth from './components/Auth';
import { Pizza, Sparkles, ArrowRight, Home, Rocket, Star, Heart } from 'lucide-react';

export default function HomvationsHub() {
    
     
    return (
    <div className="min-h-screen bg-[#fdfaff] text-[#2d1b4d] font-sans pb-32">
      <div className="h-2 bg-gradient-to-r from-purple-500 via-orange-400 to-teal-400 w-full" />

      {/* --- NAVIGATION --- */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-purple-600 p-2.5 rounded-2xl shadow-lg shadow-purple-200">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-purple-900">HOMVATIONS</span>
        </div>
        
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
      <div className="py-12">
        <h1 className="text-4xl font-black mb-8 text-purple-950">Welcome Home</h1>
        <Auth />
      </div>


                        
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-purple-950 tracking-tight">
              Where <span className="text-purple-600 italic">Innovative</span> <br />
              <span className="text-purple-600">Solutions</span> feel <br />
              right at <span className="text-orange-500 underline decoration-teal-400 decoration-8 underline-offset-4">Home</span>.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
              <div className="group relative bg-white border-4 border-purple-600 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)] transition-all">
                <div className="flex justify-between items-start mb-10">
                  <div className="bg-purple-100 text-purple-600 p-4 rounded-3xl"><Pizza size={40} /></div>
                  <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Active</span>
                </div>
                <h3 className="text-3xl font-black mb-4 text-purple-900">Purple Pizza AI</h3>
                <p className="text-purple-900/70 mb-10 font-medium text-lg leading-relaxed">Our flagship AI chef! Designing the world's most innovative pizzas.</p>
                <a href="https://purplepizzaai.com/" target="_blank" className="flex items-center justify-center gap-3 bg-purple-600 text-white font-black py-4 px-8 rounded-2xl hover:bg-orange-500 transition-all text-lg shadow-lg shadow-purple-200">
                  Launch App <ArrowRight size={22} />
                </a>
              </div>

              <div className="bg-white/50 border-4 border-dashed border-purple-200 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center opacity-80">
                <div className="bg-teal-50 text-teal-500 p-6 rounded-full mb-6"><Rocket size={40} /></div>
                <h3 className="text-2xl font-bold mb-2 text-purple-900">Next Innovation</h3>
                <p className="text-purple-900/50 font-medium">Coming soon to your hub.</p>
              </div>
            </div>
          
        
      </main>

     
      <div className="fixed top-20 right-[10%] -z-10 text-orange-200 rotate-12 opacity-50"><Heart size={120} /></div>
      <div className="fixed bottom-40 left-[5%] -z-10 text-purple-200 -rotate-12 opacity-50"><Star size={80} /></div>
    </div>
  );
}
