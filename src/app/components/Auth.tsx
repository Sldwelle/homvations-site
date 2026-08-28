"use client";

import React, { useState } from "react";
import { Mail, Sparkles, Loader2, User, Shield } from "lucide-react";

type AuthProps = {
  /** Called with the submitted email after a successful signup. */
  onSuccess?: (email: string) => void;
  /** Heading text shown above the form. */
  heading?: string;
};

export default function Auth({ onSuccess = () => {}, heading = "Join Homvations" }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — left blank by real users
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  // When this form actually mounted — sent back so the server can reject
  // submissions that arrive suspiciously fast (a basic bot signal). A lazy
  // useState initializer (rather than useRef(Date.now())) keeps render pure.
  const [startedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageIsError(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          startedAt,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong. Please try again.");
        setMessageIsError(true);
      } else {
        setMessage("Thanks! You're on the list.");
        onSuccess(email);
        setName("");
        setEmail("");
      }
    } catch {
      setMessage("Network error — please try again.");
      setMessageIsError(true);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 text-[#f2f5f6]">
        <div className="bg-[rgba(216,180,254,0.14)] border border-[rgba(216,180,254,0.3)] p-3 rounded-2xl">
          <Sparkles size={22} className="text-[#d8b4fe]" />
        </div>
        <h2 className="text-xl font-black">{heading}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot field — visually hidden, kept out of tab order, never
            shown to real visitors. Any filled-in value marks the submission
            as automated. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-[10px] font-black text-[rgba(242,245,246,0.5)] uppercase tracking-wider mb-2 ml-1"
          >
            Your Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(242,245,246,0.35)]"
              size={18}
            />
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#d8b4fe] focus:outline-none font-medium text-[#f2f5f6] placeholder:text-[rgba(242,245,246,0.3)] text-sm"
              required
              maxLength={120}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-black text-[rgba(242,245,246,0.5)] uppercase tracking-wider mb-2 ml-1"
          >
            Your Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(242,245,246,0.35)]"
              size={18}
            />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#d8b4fe] focus:outline-none font-medium text-[#f2f5f6] placeholder:text-[rgba(242,245,246,0.3)] text-sm"
              required
              maxLength={254}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-purple-600 to-orange-500 text-white font-bold py-3.5 rounded-xl transition-opacity shadow-[0_0_32px_rgba(147,51,234,0.45)] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Join the waitlist"}
        </button>
      </form>

      <p className="flex items-center gap-1.5 justify-center text-xs text-[rgba(242,245,246,0.6)] mt-3.5 font-medium">
        <Shield size={12} />
        We never share your email. Unsubscribe anytime.
      </p>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={
            "mt-5 p-3.5 text-sm font-semibold rounded-xl text-center border " +
            (messageIsError
              ? "bg-[rgba(248,113,113,0.08)] border-[rgba(248,113,113,0.3)] text-[#fca5a5]"
              : "bg-[rgba(94,234,212,0.08)] border-[rgba(94,234,212,0.3)] text-[#5eead4]")
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}
