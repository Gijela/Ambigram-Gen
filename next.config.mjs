/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // ================================================================
  // SEO Redirects
  // ================================================================
  async redirects() {
    return [
      // www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ambigramgen.com',
          },
        ],
        destination: 'https://ambigramgen.com/:path*',
        permanent: true, // 301 永久重定向
      },
      
      // ================================
      // Blog: 旧数字 ID → 新 SEO-friendly slug
      // ================================
      {
        source: '/blog/1',
        destination: '/blog/history-of-ambigram-art',
        permanent: true,
      },
      {
        source: '/blog/2',
        destination: '/blog/tattoo-design-trends-2025',
        permanent: true,
      },
      {
        source: '/blog/3',
        destination: '/blog/multilingual-ambigram-techniques',
        permanent: true,
      },
      {
        source: '/blog/4',
        destination: '/blog/font-choice-impact-on-ambigrams',
        permanent: true,
      },
      {
        source: '/blog/5',
        destination: '/blog/ai-technology-in-ambigram-generation',
        permanent: true,
      },
      {
        source: '/blog/6',
        destination: '/blog/ambigrams-in-brand-design',
        permanent: true,
      },
      
      // ================================
      // Tutorials: 旧数字 ID → 新 SEO-friendly slug
      // ================================
      {
        source: '/tutorials/1',
        destination: '/tutorials/ambigram-basics-introduction',
        permanent: true,
      },
      {
        source: '/tutorials/2',
        destination: '/tutorials/different-length-words-technique',
        permanent: true,
      },
      {
        source: '/tutorials/3',
        destination: '/tutorials/tattoo-design-specialization',
        permanent: true,
      },
      {
        source: '/tutorials/4',
        destination: '/tutorials/multilingual-creation-guide',
        permanent: true,
      },
      {
        source: '/tutorials/5',
        destination: '/tutorials/font-selection-and-pairing',
        permanent: true,
      },
      {
        source: '/tutorials/6',
        destination: '/tutorials/advanced-customization-techniques',
        permanent: true,
      },
    ];
  },

  // ================================================================
  // Security Headers (including HSTS)
  // ================================================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
