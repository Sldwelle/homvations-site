"use client";


import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Auth from './components/Auth';
import { Pizza, Sparkles, Zap, Clock, ArrowRight, Home, Rocket, Star, Heart, LogOut } from 'lucide-react';

export default function HomvationsHub() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if a user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setLoading(false);
    });

    // 2. Listen for sign-in/sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  }

  if (loading) return <div className="min-h-screen bg-[#fdfaff]" />;

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
        {session && (
          <button onClick={() => supabase.auth.signOut()} className="text-purple-900/40 hover:text-orange-500 transition-colors">
            <LogOut size={20} />
          </button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
        {!session ? (
          // --- SHOW SIGN-IN BOX IF NOT LOGGED IN ---
          <div className="py-12">
            <h1 className="text-4xl font-black mb-8 text-purple-950">Welcome Home</h1>
            <Auth />
          </div>
        ) : (
          // --- SHOW HUB IF LOGGED IN ---
          <>
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 px-4 py-2 rounded-full text-orange-600 text-sm font-bold mb-8 animate-bounce">
              <Sparkles size={16} />
              <span>Logged in as {session.user.email}</span>
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
          </>
        )}
      </main>

      {/* --- TRACKER: ONLY SHOWS IF LOGGED IN --- */}
      {session && profile && (
        <footer className="fixed bottom-6 left-0 right-0 px-4 md:px-6 z-50">
          <div className="max-w-4xl mx-auto bg-white border-4 border-purple-900 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-2xl text-orange-600 animate-pulse"><Clock size={24} /></div>
              <div>
                <p className="text-[10px] uppercase font-black text-orange-600 tracking-tighter">Your Free Trial</p>
                <p className="text-base font-bold text-purple-950">7 Days Remaining</p>
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
               <div className="flex justify-between items-end mb-2">
                 <div className="flex items-center gap-2">
                   <Zap size={16} className="text-teal-500 fill-teal-500" />
                   <span className="text-[10px] font-black text-purple-900 uppercase">Energy Levels</span>
                 </div>
                 <span className="text-xs font-black text-purple-900">{profile.tokens_remaining} / 100 Use</span>
               </div>
               <div className="h-4 w-full bg-purple-50 rounded-full border-2 border-purple-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 via-purple-400 to-purple-600 transition-all duration-1000" style={{ width: `${profile.tokens_remaining}%` }} />
               </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-black px-8 py-4 rounded-2xl transition-all shadow-md shadow-orange-200">
              GET MORE ENERGY
            </button>
          </div>
        </footer>
      )}

      <div className="fixed top-20 right-[10%] -z-10 text-orange-200 rotate-12 opacity-50"><Heart size={120} /></div>
      <div className="fixed bottom-40 left-[5%] -z-10 text-purple-200 -rotate-12 opacity-50"><Star size={80} /></div>
    </div>
  );
}
