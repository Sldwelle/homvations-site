import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Homvations',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc] text-[#153a52] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-teal-700 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Homvations
        </Link>

        <h1 className="text-4xl font-black mb-6 text-teal-700">Privacy Policy</h1>
        <p className="text-sm text-[#153a52]/50 font-medium mb-10">Last updated: June 30, 2026</p>

        <div className="space-y-6 text-[#153a52]/80 leading-relaxed font-medium">
          <p>
            Homvations, LLC (&quot;Homvations,&quot; &quot;we,&quot; &quot;us&quot;) operates homvations.com and the
            apps linked from this hub. This Privacy Policy describes the information we collect and how we use
            it.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Information We Collect</h2>
          <p>
            When you sign up to unlock an app from this hub, we collect the name and email address you provide.
            We do not collect payment information, government IDs, or other sensitive personal data through this
            form.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">How We Use Your Information</h2>
          <p>
            We use your name and email to grant access to apps in the Homvations hub, to communicate with you
            about those apps, and to improve our products. We do not sell your personal information.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Your Choices</h2>
          <p>
            You may request that we delete your information at any time by contacting us. Each individual app
            linked from this hub may have its own privacy practices, which we encourage you to review separately.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Contact</h2>
          <p>
            Questions about this policy can be directed to Homvations, LLC through the contact channels listed
            on this site.
          </p>

          <p className="text-sm text-[#153a52]/50 italic pt-8 border-t-2 border-teal-100">
            This is placeholder policy language for early development purposes and has not been reviewed by an
            attorney. Replace this content with counsel-reviewed text before relying on it as a binding policy.
          </p>
        </div>
      </div>
    </div>
  );
}
