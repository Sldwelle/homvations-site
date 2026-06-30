import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Homvations',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7fffc] text-[#153a52] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-teal-700 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Homvations
        </Link>

        <h1 className="text-4xl font-black mb-6 text-teal-700">Terms of Service</h1>
        <p className="text-sm text-[#153a52]/50 font-medium mb-10">Last updated: June 30, 2026</p>

        <div className="space-y-6 text-[#153a52]/80 leading-relaxed font-medium">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of homvations.com and the apps accessible
            from it, operated by Homvations, LLC (&quot;Homvations,&quot; &quot;we,&quot; &quot;us&quot;). By using
            this site, you agree to these Terms.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Using the Hub</h2>
          <p>
            Homvations is a hub linking to a growing set of apps, some free and some paid. Signing up with your
            name and email unlocks access to apps in the hub; access does not transfer ownership of any app or
            its content to you.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Individual Apps</h2>
          <p>
            Each app linked from this hub (for example, Purple Pizza AI) may have its own terms, pricing, and
            usage rules in addition to these Terms. Where those differ, the individual app&apos;s terms govern
            your use of that app.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">No Warranty</h2>
          <p>
            This hub and the apps it links to are under active development and are provided &quot;as is,&quot;
            without warranties of any kind, express or implied.
          </p>

          <h2 className="text-2xl font-black text-purple-900 pt-4">Changes</h2>
          <p>
            We may update these Terms as the hub and its apps evolve. Continued use of the site after changes
            means you accept the updated Terms.
          </p>

          <p className="text-sm text-[#153a52]/50 italic pt-8 border-t-2 border-teal-100">
            This is placeholder terms language for early development purposes and has not been reviewed by an
            attorney. Replace this content with counsel-reviewed text before relying on it as a binding
            agreement.
          </p>
        </div>
      </div>
    </div>
  );
}
