"use client";

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Sparkles, Loader2 } from 'lucide-react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage('Oops! ' + error.message);
    } else {
      setMessage('Check your email for the magic link!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-4 border-purple-900 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(107,33,168,0.1)] max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6 text-purple-900">
        <div className="bg-purple-100 p-3 rounded-2xl">
          <Sparkles size={24} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-black italic">Join Homvations</h2>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-black text-purple-950 uppercase mb-2 ml-1">
            Your Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-purple-50 border-2 border-purple-100 rounded-2xl focus:border-orange-500 focus:outline-none font-medium text-purple-900"
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'SEND MAGIC LINK'}
        </button>
      </form>

      {message && (
        <div className="mt-6 p-4 bg-teal-50 border-2 border-teal-100 text-teal-700 text-sm font-bold rounded-2xl text-center">
          {message}
        </div>
      )}
    </div>
  );
}