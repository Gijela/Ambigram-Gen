// ================================================================
// Schema.org Structured Data
// ================================================================
// 为 Google 提供结构化数据,提升富文本摘要展示

import { Organization, WebSite, BreadcrumbList, FAQPage, Product } from 'schema-dts';

const SITE_URL = "https://ambigramgen.com";
const SITE_NAME = "AmbigramGen";

// ================================================================
// 组织 Schema
// ================================================================

export const organizationSchema: Organization = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: "Free online ambigram generator supporting different length words. Perfect for tattoo design, logos, and artistic creations.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "contact@ambigramgen.com",
    availableLanguage: ["English", "Chinese"]
  },
  sameAs: [
    "https://twitter.com/ambigramgen",
    "https://github.com/ambigramgen",
    "https://discord.gg/ambigramgen"
  ]
};

// ================================================================
// 网站 Schema
// ================================================================

export const websiteSchema: WebSite = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Create stunning ambigrams online for free. Support for different length words, perfect for tattoo designs.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME
  }
};

// ================================================================
// 面包屑 Schema 生成器
// ================================================================

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): BreadcrumbList {
  const itemListElement = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: SITE_URL
    }
  ];

  items.forEach((item, index) => {
    itemListElement.push({
      "@type": "ListItem" as const,
      position: index + 2,
      name: item.label,
      item: `${SITE_URL}${item.href}`
    });
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement
  };
}

// ================================================================
// FAQ Schema (for Help Page)
// ================================================================

// ================================================================
// 完整 FAQ Schema (GEO 优化：让 AI 更容易抓取问答内容)
// ================================================================
// 参考: https://frankknow.com/what-is-geo/
// GEO 策略：使用自然的问题句式，让内容更容易被 AI 引用
// ================================================================

export const helpCenterFAQSchema: FAQPage = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an Ambigram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ambigram is a special form of text art that can be read as different words or meanings from different angles (usually rotated 180 degrees). It combines artistic design with wordplay, commonly used in tattoo design, artistic creation, and brand identity. Popular examples include words like LOVE/LIFE that can be flipped upside down to read differently."
      }
    },
    {
      "@type": "Question",
      name: "Is AmbigramGen free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, AmbigramGen is 100% free to use with no watermarks, no restrictions, and unlimited downloads. Over 50,000 users have created ambigrams using our tool. All generated ambigrams can be used for both personal and commercial purposes without any attribution required."
      }
    },
    {
      "@type": "Question",
      name: "How to create ambigrams with different length words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AmbigramGen is the only free tool that supports different length word combinations. Simply enter two words of any length (e.g., 'LOVE' and 'FOREVER'), and our AI-powered algorithm will automatically perform letter mapping, space optimization, and visual balance processing to generate perfect ambigram effects in seconds."
      }
    },
    {
      "@type": "Question",
      name: "What export formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AmbigramGen supports multiple high-quality export formats: PNG (300 DPI, suitable for web and social media), SVG (vector format, infinitely scalable for large prints), and PDF (print-ready format). All exports are watermark-free and professionally optimized."
      }
    },
    {
      "@type": "Question",
      name: "Can I use generated ambigrams for tattoos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! AmbigramGen is specially optimized for tattoo designs. Features include: tattoo-specific templates, size calculator for body placement, line thickness optimization for skin, and high-resolution SVG export. Thousands of users have used AmbigramGen designs for their tattoos."
      }
    },
    {
      "@type": "Question",
      name: "What languages does AmbigramGen support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AmbigramGen supports multiple languages including English, Spanish, French, German, and other Latin-based alphabets. Our intelligent algorithm can handle complex character structures and diverse letter forms, providing high-quality ambigram artworks for users worldwide."
      }
    },
    {
      "@type": "Question",
      name: "How to choose the right font for my ambigram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AmbigramGen offers 20+ carefully selected fonts categorized by style: Gothic fonts work best for tattoo designs, handwritten fonts for artistic creations, and modern sans-serif fonts for commercial logos. Preview your design with different fonts before downloading."
      }
    },
    {
      "@type": "Question",
      name: "Why doesn't my ambigram look symmetrical?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ambigrams achieve visual balance rather than perfect mathematical symmetry. Our algorithm intelligently adjusts letter shapes to create readable designs from both orientations. If the result isn't ideal, try: 1) Different fonts, 2) Alternative word combinations, 3) Adjusting letter spacing settings."
      }
    },
    {
      "@type": "Question",
      name: "Can I save my ambigram creation history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, AmbigramGen automatically saves your creation history in your browser's local storage. You can view, re-edit, or download previous works anytime. For permanent storage, we recommend downloading and backing up your favorite designs."
      }
    },
    {
      "@type": "Question",
      name: "What makes AmbigramGen different from other ambigram generators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AmbigramGen is unique because: 1) It's the only free tool supporting different length words (most require same-length words), 2) AI-powered algorithm for superior visual balance, 3) Tattoo-optimized exports, 4) 100% free with no watermarks, 5) No account required. Used by over 50,000 designers, artists, and tattoo enthusiasts."
      }
    }
  ]
};

// ================================================================
// Product Schema (for Homepage)
// ================================================================

export const productSchema: Product = {
  "@type": "Product",
  name: "AmbigramGen - Free Ambigram Generator",
  description: "The most powerful free ambigram generator supporting different length word combinations, optimized for tattoo design. No watermark, unlimited use, high-quality SVG/PNG export.",
  brand: {
    "@type": "Brand",
    name: SITE_NAME
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: SITE_URL
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1250",
    bestRating: "5",
    worstRating: "1"
  }
};

// ================================================================
// 通用 Schema 注入函数
// ================================================================

/**
 * 生成用于注入 <head> 的 JSON-LD script 标签内容
 * 
 * @param schemas - 一个或多个 Schema 对象
 * @returns JSON-LD 字符串
 */
export function generateSchemaScript(...schemas: any[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas
  });
}

// ================================================================
// Article Schema (for Blog Posts)
// ================================================================

/**
 * 生成博客文章的 Article Schema
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  imageUrl?: string;
  slug: string;
}): any {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    image: article.imageUrl || `${SITE_URL}/logo.svg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

// ================================================================
// HowTo Schema (for Tutorials)
// ================================================================

/**
 * 生成教程的 HowTo Schema
 */
export function generateHowToSchema(tutorial: {
  title: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string }>;
  slug: string;
}): any {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.description,
    totalTime: tutorial.totalTime || "PT15M",
    step: tutorial.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

