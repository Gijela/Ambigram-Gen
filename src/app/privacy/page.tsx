// ================================================================
// Privacy Policy Page - Server Component (SSR)
// ================================================================
// 移除 'use client' 和 framer-motion，改用 CSS 动画
// SEO 优化：服务端渲染，首屏速度更快
// ================================================================

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal information security
          </p>
          <p className="text-gray-400 mt-4">Last updated: January 1, 2025</p>
        </div>

        {/* Policy Content */}
        <div className="space-y-8 text-gray-300 animate-slide-up">
          {/* Section 1 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              AmbigramGen.com (hereinafter referred to as &quot;we&quot; or &quot;this website&quot;) respects and protects the privacy of all users. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with this privacy policy, please stop using our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-purple-300 mb-3">2.1 Information You Actively Provide</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Contact Information:</strong> Email address, name, etc., when you contact us</li>
              <li><strong>Feedback Content:</strong> Opinions and suggestions when you submit feedback</li>
              <li><strong>Generated Content:</strong> Text input for creating ambigrams</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-300 mb-3">2.2 Information Automatically Collected</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Device Information:</strong> Browser type, operating system, screen resolution</li>
              <li><strong>Usage Data:</strong> Visited pages, feature usage time, click behavior</li>
              <li><strong>IP Address:</strong> Your approximate geographic location</li>
              <li><strong>Cookies:</strong> For improving user experience and analyzing website usage</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Provide Services:</strong> Process your requests to generate ambigrams</li>
              <li><strong>Improve Services:</strong> Analyze usage data to optimize website functionality and performance</li>
              <li><strong>Communication:</strong> Respond to your inquiries, feedback, and support requests</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security issues</li>
              <li><strong>Analytics:</strong> Understand user behavior for improving user experience</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">We will not sell, rent, or share your personal information with third parties, except in the following cases:</p>
            
            <h3 className="text-xl font-semibold text-purple-300 mb-3">4.1 Third-Party Service Providers</h3>
            <p className="mb-2">We may share information with trusted third-party service providers, such as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Analytics Services:</strong> Google Analytics (for website usage analysis)</li>
              <li><strong>Hosting Services:</strong> Cloud service providers for storing data</li>
              <li><strong>Communication Tools:</strong> Email service providers</li>
            </ul>
            <p className="mb-4">These service providers can only access information necessary to perform specific tasks and are obligated to protect your information.</p>

            <h3 className="text-xl font-semibold text-purple-300 mb-3">4.2 Legal Requirements</h3>
            <p className="mb-2">We may disclose your information if required to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Comply with legal requirements, court orders, or government requests</li>
              <li>Protect our or others&apos; rights, property, or safety</li>
              <li>Prevent or investigate possible illegal activities</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use Cookies and similar technologies to enhance user experience and analyze website usage.
            </p>
            
            <h3 className="text-xl font-semibold text-purple-300 mb-3">Types of Cookies:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Essential Cookies:</strong> Necessary for website normal operation</li>
              <li><strong>Analytics Cookies:</strong> For collecting usage statistics and analyzing user behavior</li>
              <li><strong>Preference Cookies:</strong> For remembering your settings and preferences</li>
            </ul>

            <p>
              You can manage or disable Cookies through your browser settings, but this may affect some website functionalities. Please visit our <a href="/cookies" className="text-purple-400 hover:text-purple-300 underline">Cookie Policy</a> page for more information.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p className="mb-4">
              We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Encryption:</strong> Use HTTPS encryption to transmit data</li>
              <li><strong>Access Control:</strong> Strictly limit access to personal information</li>
              <li><strong>Security Monitoring:</strong> Regularly monitor and update security measures</li>
              <li><strong>Data Backup:</strong> Regularly back up data to prevent loss</li>
            </ul>
            <p className="mt-4">
              However, no transmission over the Internet is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request to view the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request to correct inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request to delete your personal information</li>
              <li><strong>Restriction:</strong> Request to limit the processing of your information</li>
              <li><strong>Portability:</strong> Request to obtain your data in a common format</li>
              <li><strong>Objection:</strong> Object to the processing of your information</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@ambigramgen.com" className="text-purple-400 hover:text-purple-300 underline">privacy@ambigramgen.com</a>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">8. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately so we can delete it.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page and may notify you through website announcements or email.
            </p>
            <p>
              We encourage you to regularly review this Privacy Policy to stay informed about how we protect your information.
            </p>
          </section>

          {/* Section 10 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> <a href="mailto:privacy@ambigramgen.com" className="text-purple-400 hover:text-purple-300 underline">privacy@ambigramgen.com</a></li>
              <li><strong>Contact Page:</strong> <a href="/contact" className="text-purple-400 hover:text-purple-300 underline">Visit our Contact Page</a></li>
            </ul>
          </section>

          {/* Acknowledgment */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-center">
            <p className="text-lg text-white">
              Thank you for trusting AmbigramGen.com. We are committed to protecting your privacy and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
