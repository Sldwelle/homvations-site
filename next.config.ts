import type { NextConfig } from "next";

// Security headers applied to every response. These are a real, low-cost
// hardening pass: no external services, no billing impact — just response
// headers Vercel/Next.js serve on every request.
const securityHeaders = [
  // Prevents this site from being embedded in an iframe elsewhere (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers from MIME-sniffing a response away from its declared content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limits how much referrer info leaks to other origins when users click out.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser features this site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Tells browsers to only ever reach this site over HTTPS (Vercel serves HTTPS by default).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // A real but conservative CSP: same-origin by default, Next.js needs
  // 'unsafe-inline' for its hydration styles/scripts, and Supabase is the
  // only external API this site calls today. Tighten the script-src further
  // once inline scripts can be nonce'd.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
