import Link from "next/link";

export function TermsPageView() {
  return (
    <main className="min-h-screen bg-white text-[#3D3D3D]">
      <section className="w-full py-12 lg:py-24">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center justify-start gap-1.5 text-left text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <Link href="/" className="transition-colors hover:text-zinc-600">
              Home
            </Link>
            <span className="text-zinc-200">.</span>
            <span className="text-zinc-600">Terms of Service</span>
          </div>

          <header className="mt-8 space-y-4">
            <h1
              className="text-[36px] font-bold tracking-tight text-[#3D3D3D] leading-[1.1]"
              style={{ fontFamily: 'var(--font-heading, serif)' }}
            >
              Terms of Service
            </h1>
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
              Effective Date: April 4, 2026
            </p>
          </header>

          <div className="mt-16 space-y-12 text-[16px] lg:text-[17px] leading-relaxed text-zinc-600 font-medium max-w-[800px]">
            <p className="text-[#3D3D3D] italic">
              Please read these Terms of Service carefully before using Stickman.Design.
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">2. Intellectual Property Rights</h2>
              <p>
                The materials on Stickman.Design, including the design, layout, text, graphics, and logos, are the property of Stickman.Design and are protected by applicable copyright and trademark law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">3. User Responsibilities</h2>
              <p>
                You represent and warrant that you will use our site and services only for lawful purposes. You are responsible for all activity that occurs under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">4. Prohibited Activities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Using the site for any unauthorized or illegal purpose.</li>
                <li>Attempting to interfere with the security or operation of the site.</li>
                <li>Copying or scraping content without our express permission.</li>
                <li>Engaging in any conduct that restricts or inhibits any other user from using the site.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">5. Limitation of Liability</h2>
              <p>
                In no event shall Stickman.Design or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stickman.Design.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">6. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-100">
              <h2 className="text-xl font-bold text-[#3D3D3D] tracking-tight">Changes to Terms</h2>
              <p>
                We reserve the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
              <p className="mt-4">
                If you have questions about these terms, please contact:
                <br />
                <span className="font-bold text-blue-600 block mt-2">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin.stickman@gmail.com"}
                </span>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
