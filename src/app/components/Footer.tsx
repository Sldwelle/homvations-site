import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-teal-100 bg-white/60 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-teal-500 p-2 rounded-xl">
            <Home size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-teal-700">HOMVATIONS</span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-bold text-[#153a52]/70">
          <Link href="/privacy" className="hover:text-teal-700 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-teal-700 transition-colors">
            Terms of Service
          </Link>
        </nav>

        <p className="text-sm text-[#153a52]/50 font-medium">
          &copy; 2026 Homvations, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
