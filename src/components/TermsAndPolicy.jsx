const TermsAndPolicy = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-slate-300 leading-relaxed">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Privacy Policy – ForexEdge.in
      </h1>
      <p className="text-sm text-slate-400 mb-4 text-center">
        Effective Date: 29.05.2025
      </p>

      <p className="mb-6">
        ForexEdge.in is committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, disclose, and
        safeguard your information when you visit our website.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Personal Information: name, email, IP address, etc.</li>
            <li>Usage Data: browser type, pages visited, etc.</li>
            <li>Cookies & Tracking Technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. How We Use Your Information
          </h2>
          <p>Your information is used to:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Provide and improve services</li>
            <li>Respond to inquiries</li>
            <li>Analyze site usage</li>
            <li>Send updates/promotions (with consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Information Sharing and Disclosure
          </h2>
          <p>
            We do not sell, trade, or rent your personal information. We may
            share data with:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Trusted service providers</li>
            <li>Law enforcement if legally required</li>
            <li>To protect our rights and users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Data Security
          </h2>
          <p>
            We use technical and organizational safeguards to protect your data.
            However, no system is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Third-Party Links
          </h2>
          <p>
            Our website may link to third-party websites. We are not responsible
            for their privacy policies or content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Your Rights
          </h2>
          <p>You may:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Request access to your data</li>
            <li>Ask us to correct or delete it</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Contact Us
          </h2>
          <p>
            For privacy-related inquiries:
            <br />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contactforexedge@gmail.com"
              className="text-blue-400 underline"
            >
              contactforexedge@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndPolicy;
