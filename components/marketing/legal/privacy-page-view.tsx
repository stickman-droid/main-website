import Link from "next/link";

export function PrivacyPageView() {
  return (
    <main className="min-h-screen bg-background text-[#252525]">
      <section className="w-full py-12 lg:py-24">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center justify-start gap-1.5 text-left text-[11px] font-mono font-bold tracking-[0.2em] text-[#8e8e8e] uppercase">
            <Link href="/" className="transition-colors hover:text-[#252525]">
              Home
            </Link>
            <span className="text-zinc-200">.</span>
            <span className="text-[#252525]">Privacy Policy</span>
          </div>

          <header className="mt-8 space-y-4">
            <h1
              className="text-[36px] font-bold tracking-tight text-[#252525] leading-[1.1]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm font-medium text-[#8e8e8e] uppercase tracking-widest">
              Last Updated: April 4, 2026
            </p>
          </header>

          <div className="mt-16 space-y-12 text-[16px] lg:text-[17px] leading-relaxed text-[#252525] font-medium max-w-[800px]">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">1. Introduction</h2>
              <p>
                At Stickman.Design, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you contact us through our website. This may include your name, email address, and any other information you choose to provide.
              </p>
              <p>
                We also automatically collect certain information when you browse our site, including your IP address, browser type, and usage data collected through cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve our services.</li>
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To monitor and analyze trends and usage of our website.</li>
                <li>To detect, prevent, and address technical or security issues.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">5. Data Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with service providers who perform services for us, or when required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">6. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete the information we hold about you.
              </p>
            </section>

            {/* <section className="space-y-4 pt-8 border-t border-zinc-100">
              <h2 className="text-xl font-bold text-[#252525] tracking-tight">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <span className="font-bold text-blue-600 block mt-2">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin.stickman@gmail.com"}
                </span>
              </p>
            </section> */}
          </div>
        </div>
      </section>
    </main>
  );
}

