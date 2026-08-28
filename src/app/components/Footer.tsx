import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#0a0e14] mt-6">
      <div className="max-w-[1140px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-2 rounded-xl">
            <Home size={16} className="text-[#0a0e14]" strokeWidth={2.4} />
          </div>
          <span className="text-base font-black tracking-tight text-[#f2f5f6]">Homvations</span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-semibold text-[rgba(242,245,246,0.55)]">
          <Link href="/privacy" className="hover:text-[#f2f5f6] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#f2f5f6] transition-colors">
            Terms of Service
          </Link>
        </nav>

        <p className="text-[13px] text-[rgba(242,245,246,0.6)] font-medium">
          &copy; 2026 Homvations, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
