// ================================================================
// SEO Metadata Configuration
// ================================================================
// 统一管理所有页面的 SEO 元数据
// 消除特殊情况,让每个页面自然获得独特的 meta 信息

import { Metadata } from "next";

// ================================================================
// 基础配置
// ================================================================

const SITE_NAME = "AmbigramGen.com";
const SITE_URL = "https://ambigramgen.com";
// ✅ 专业 OG Image (1200x630px SVG)
// 支持 SVG 格式,现代浏览器完美支持,文件小加载快
// 如需 PNG 格式,可使用在线工具转换: https://svgtopng.com
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

// ================================================================
// 页面元数据配置表
// ================================================================
// 好品味:用数据结构消除 if/else 特殊情况

interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

export const PAGE_METADATA: Record<string, PageMetadata> = {
  // ──────────────────────────────────────────────────────────────
  // 首页 - 主关键词优化
  // ──────────────────────────────────────────────────────────────
  "/": {
    title: "Free Ambigram Generator - Create Stunning Ambigrams Instantly",
    description:
      "Create beautiful ambigrams online for free. Supports different length words, perfect for tattoo designs. No watermark, instant download in PNG/SVG/PDF. Start creating now!",
    keywords:
      "ambigram generator, free ambigram maker, ambigram creator, tattoo design, rotational ambigram, flip text generator, different length words",
    ogTitle: "Free Ambigram Generator | Different Length Words Supported",
    ogDescription:
      "The most powerful free ambigram generator. Create stunning symmetrical art perfect for tattoos, logos, and designs in seconds.",
  },

  // ──────────────────────────────────────────────────────────────
  // 关于页面
  // ──────────────────────────────────────────────────────────────
  "/about": {
    title: "About AmbigramGen - Revolutionary Ambigram Creation Technology",
    description:
      "Learn about AmbigramGen's innovative algorithm that supports different length word combinations. World's first free ambigram generator optimized for tattoo and design professionals.",
    keywords:
      "ambigram technology, different length algorithm, ambigram innovation, about ambigramgen, tattoo generator",
    ogTitle: "About AmbigramGen - Innovation in Ambigram Art",
  },

  // ──────────────────────────────────────────────────────────────
  // 博客主页
  // ──────────────────────────────────────────────────────────────
  "/blog": {
    title: "Ambigram Design Blog - Tips, Trends & Inspiration",
    description:
      "Explore ambigram design techniques, tattoo trends, typography tips, and creative inspiration. Expert guides for designers and tattoo enthusiasts.",
    keywords:
      "ambigram blog, design techniques, tattoo trends, typography tips, ambigram inspiration, design tutorials",
    ogTitle: "Ambigram Design Blog | Tips & Inspiration",
  },

  // ──────────────────────────────────────────────────────────────
  // 联系页面
  // ──────────────────────────────────────────────────────────────
  "/contact": {
    title: "Contact Us - AmbigramGen Support & Inquiries",
    description:
      "Get in touch with AmbigramGen team. Questions, feedback, or collaboration inquiries welcome. We respond within 24 hours.",
    keywords:
      "contact ambigramgen, customer support, ambigram help, feedback, business collaboration",
  },

  // ──────────────────────────────────────────────────────────────
  // Gallery 页面
  // ──────────────────────────────────────────────────────────────
  "/gallery": {
    title: "Ambigram Gallery - Stunning Examples & Creative Inspiration",
    description:
      "Browse 1000+ beautiful ambigram designs created by our community. Find inspiration for your next tattoo, logo, or artistic project.",
    keywords:
      "ambigram gallery, ambigram examples, tattoo inspiration, design showcase, ambigram art, creative ambigrams",
    ogTitle: "Ambigram Gallery | 1000+ Design Examples",
  },

  // ──────────────────────────────────────────────────────────────
  // 帮助中心
  // ──────────────────────────────────────────────────────────────
  "/help": {
    title: "Help Center - AmbigramGen Tutorials & FAQ",
    description:
      "Find answers to common questions about ambigram creation, font selection, export formats, and technical support. Comprehensive help guides included.",
    keywords:
      "ambigram help, how to create ambigram, faq, ambigram tutorial, technical support, user guide",
  },

  // ──────────────────────────────────────────────────────────────
  // 教程主页
  // ──────────────────────────────────────────────────────────────
  "/tutorials": {
    title: "Ambigram Tutorials - Learn Design Techniques Step by Step",
    description:
      "Master ambigram creation from beginner to expert. Free video tutorials covering basics, advanced techniques, tattoo optimization, and multi-language designs.",
    keywords:
      "ambigram tutorials, design lessons, learn ambigram, tattoo design tutorial, typography course, step by step guide",
    ogTitle: "Free Ambigram Tutorials | Beginner to Advanced",
  },

  // ──────────────────────────────────────────────────────────────
  // 反馈页面
  // ──────────────────────────────────────────────────────────────
  "/feedback": {
    title: "Feedback & Suggestions - Help Us Improve AmbigramGen",
    description:
      "Share your feedback and suggestions to help us improve AmbigramGen. Report bugs, request features, or share your experience.",
    keywords:
      "ambigram feedback, product suggestions, feature request, bug report, user experience",
  },

  // ──────────────────────────────────────────────────────────────
  // 法律页面
  // ──────────────────────────────────────────────────────────────
  "/privacy": {
    title: "Privacy Policy - AmbigramGen Data Protection",
    description:
      "Learn how AmbigramGen protects your privacy. We don't collect personal data. All ambigram creation happens in your browser.",
    keywords: "privacy policy, data protection, user privacy, ambigram privacy",
  },

  "/terms": {
    title: "Terms of Service - AmbigramGen Usage Agreement",
    description:
      "AmbigramGen terms of service and usage agreement. Free for personal and commercial use. No attribution required.",
    keywords: "terms of service, usage agreement, commercial use, licensing",
  },

  "/cookies": {
    title: "Cookie Policy - AmbigramGen Cookie Usage",
    description:
      "Learn about how AmbigramGen uses cookies to enhance your experience. Essential cookies only, no tracking.",
    keywords: "cookie policy, cookies, data storage, browser storage",
  },
};

// ================================================================
// Metadata 生成函数
// ================================================================

/**
 * 生成完整的 Next.js Metadata 对象
 * 
 * @param pathname - 页面路径,如 "/about"
 * @returns Metadata 对象
 * 
 * @example
 * export const metadata = generateMetadata("/about");
 */
export function generateMetadata(pathname: string): Metadata {
  const config = PAGE_METADATA[pathname] || PAGE_METADATA["/"];

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "AmbigramGen Team" }],
    creator: "AmbigramGen",
    publisher: "AmbigramGen",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: config.canonical || pathname,
    },
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      url: `${SITE_URL}${pathname}`,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: config.ogTitle || config.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      images: [DEFAULT_OG_IMAGE],
      creator: "@ambigramgen",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ================================================================
// 动态页面 Metadata 生成器
// ================================================================

/**
 * 为博客文章生成 Metadata
 * 
 * @param id - 文章 ID
 * @param title - 文章标题
 * @param excerpt - 文章摘要
 * @returns Metadata 对象
 */
export function generateBlogMetadata(
  slug: string,
  title: string,
  excerpt: string
): Metadata {
  return {
    title: `${title} | AmbigramGen Blog`,
    description: excerpt,
    keywords: `ambigram, ${title.toLowerCase()}, design blog, tattoo art`,
    openGraph: {
      title: title,
      description: excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

/**
 * 为教程页面生成 Metadata
 * 
 * @param id - 教程 ID
 * @param title - 教程标题
 * @param description - 教程描述
 * @returns Metadata 对象
 */
export function generateTutorialMetadata(
  slug: string,
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} | AmbigramGen Tutorials`,
    description: description,
    keywords: `ambigram tutorial, ${title.toLowerCase()}, learn ambigram, design course`,
    openGraph: {
      title: title,
      description: description,
      url: `${SITE_URL}/tutorials/${slug}`,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `/tutorials/${slug}`,
    },
  };
}

