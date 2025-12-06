// ================================================================
// Terms of Service Page - Server Component (SSR)
// ================================================================
// 移除 'use client' 和 framer-motion，改用 CSS 动画
// SEO 优化：服务端渲染，首屏速度更快
// ================================================================

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read and understand the following terms before using AmbigramGen.com services
          </p>
          <p className="text-gray-400 mt-4">Last updated: January 1, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-gray-300 animate-slide-up">
          {/* Section 1 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Service Description</h2>
            <p className="mb-4">
              AmbigramGen.com (hereinafter referred to as &quot;this website&quot; or &quot;we&quot;) provides users with free ambigram generation tools and related services. Users can create and download ambigram artwork through this website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Usage License</h2>
            <p className="mb-4">
              After agreeing to these terms of service, you receive a limited, personal, non-transferable, non-exclusive license to use the services provided by this website.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may use the generated ambigram works for personal or commercial purposes</li>
              <li>You may modify and edit the generated works</li>
              <li>You must respect the intellectual property rights of this website and not reverse engineer or copy the core algorithm</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">3. Prohibited Activities</h2>
            <p className="mb-4">When using the services of this website, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Upload or disseminate illegal, harmful, threatening, abusive, or infringing content</li>
              <li>Impersonate any person or entity or falsely state your relationship with any person or entity</li>
              <li>Disrupt or interfere with the normal operation of the website or server</li>
              <li>Attempt to reverse engineer, decompile, or disassemble any part of the website</li>
              <li>Use automated tools (such as robots, crawlers) to access the website</li>
              <li>Use the service for any illegal or unauthorized purposes</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property Rights</h2>
            <p className="mb-4">
              All content on this website (including but not limited to text, images, code, interface design) is owned by this website or its license providers and is protected by copyright and other intellectual property laws.
            </p>
            <p className="mb-4">
              <strong>Regarding generated works:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The ambigram works you generate belong to you</li>
              <li>This website does not claim ownership of works you create</li>
              <li>You can use the generated works freely, but please indicate they were created using AmbigramGen.com when appropriate</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
            <p className="mb-4">
              The services of this website are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The service will be uninterrupted or error-free</li>
              <li>All errors will be corrected</li>
              <li>The service or server is free of viruses or other harmful components</li>
              <li>Results will meet your specific requirements</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, this website is not liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Lost profits or data</li>
              <li>Service interruptions or delays</li>
              <li>Third-party infringement or violation of your rights</li>
              <li>Errors, mistakes, or inaccuracies in content</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Termination of Service</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your access to this website at any time without notice for any reason, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violation of these terms of service</li>
              <li>Request from law enforcement or government agencies</li>
              <li>Unexpected technical or security issues</li>
              <li>Prolonged periods of inactivity</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">8. Modification of Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms of service at any time. When modifications occur, we will update the &quot;Last updated&quot; date at the top of this page. Your continued use of the service constitutes your acceptance of the modified terms.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Applicable Law</h2>
            <p className="mb-4">
              These terms of service are governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in the United States.
            </p>
          </section>

          {/* Section 10 */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these terms of service, please contact us:
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> legal@ambigramgen.com</li>
              <li><strong>Website:</strong> https://ambigramgen.com/contact</li>
            </ul>
          </section>

          {/* Agreement Checkbox */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-center">
            <p className="text-lg text-white">
              By using AmbigramGen.com services, you agree to comply with these terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
