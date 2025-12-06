// ================================================================
// Page-Specific FAQ Component (GEO 优化)
// ================================================================
// 可复用的 FAQ 组件，适用于任何页面
// 每个页面传入不同的 FAQ 内容，避免重复
// ================================================================

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface PageFAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;  // 紧凑模式，适合博客/教程页面
}

export const PageFAQ = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description,
  className = '',
  compact = false
}: PageFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className={`${compact ? 'py-8' : 'py-16'} ${className}`}>
      <div className={compact ? '' : 'max-w-4xl mx-auto px-4'}>
        {/* Section Header */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {description && (
              <p className="text-gray-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {compact && (
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {title}
          </h3>
        )}

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden ${
                compact ? '' : 'hover:border-purple-500/30 transition-colors'
              }`}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full ${compact ? 'px-4 py-3' : 'px-5 py-4'} flex items-center justify-between text-left hover:bg-white/5 transition-colors`}
              >
                <h4 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-white pr-4`}>
                  {faq.question}
                </h4>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-purple-400 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className={`${compact ? 'px-4 pb-3 text-sm' : 'px-5 pb-4 text-base'} text-gray-300 leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema for GEO (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

// ================================================================
// 预定义的页面 FAQ 数据 (GEO 优化)
// ================================================================

// Blog 文章通用 FAQ
export const blogArticleFAQs: FAQItem[] = [
  {
    question: "How can I apply these ambigram techniques?",
    answer: "You can practice these techniques using AmbigramGen's free online tool. Simply enter your words, experiment with different fonts and styles, and download your creation in high-resolution PNG or SVG format."
  },
  {
    question: "What's the best way to learn ambigram design?",
    answer: "Start with our beginner tutorials, practice with simple word pairs (like LOVE/LIFE), and gradually move to more complex designs. AmbigramGen's instant preview feature helps you learn by experimentation."
  },
  {
    question: "Can I use ambigram designs commercially?",
    answer: "Yes! All ambigrams created with AmbigramGen are 100% free for commercial use with no attribution required. Perfect for logos, merchandise, and professional designs."
  }
];

// Tutorial 页面通用 FAQ
export const tutorialFAQs: FAQItem[] = [
  {
    question: "Do I need design experience to follow this tutorial?",
    answer: "No design experience needed! This tutorial is beginner-friendly. AmbigramGen's AI-powered tool handles the complex design work automatically."
  },
  {
    question: "What if my ambigram doesn't look right?",
    answer: "Try different fonts, adjust letter spacing, or experiment with word combinations. Some letter pairs work better than others. Our tool shows you multiple variations to choose from."
  },
  {
    question: "How long does it take to create an ambigram?",
    answer: "With AmbigramGen, you can create a professional ambigram in under 30 seconds. The AI does the heavy lifting, so you just need to pick your favorite design."
  }
];

// About 页面 FAQ
export const aboutFAQs: FAQItem[] = [
  {
    question: "Who created AmbigramGen?",
    answer: "AmbigramGen was created by a team of typography enthusiasts and AI engineers passionate about making ambigram design accessible to everyone. Our mission is to democratize this beautiful art form."
  },
  {
    question: "Is AmbigramGen safe to use?",
    answer: "Yes! We don't store your designs on our servers. All processing happens securely, and your creations belong entirely to you. No account required, no data collection."
  },
  {
    question: "How can I support AmbigramGen?",
    answer: "The best way to support us is by sharing your creations on social media and telling friends about the tool. We're committed to keeping AmbigramGen free for everyone."
  }
];

// Gallery 页面 FAQ
export const galleryFAQs: FAQItem[] = [
  {
    question: "Can I submit my ambigram to the gallery?",
    answer: "Yes! We welcome community submissions. Create your ambigram using AmbigramGen, then share it with us through our contact page for a chance to be featured."
  },
  {
    question: "Are gallery designs available for download?",
    answer: "Gallery images are for inspiration only. To create similar designs, use our free generator and customize to your preference. This ensures your design is unique."
  },
  {
    question: "How are featured designs selected?",
    answer: "We select designs based on creativity, technical execution, and visual appeal. Word combinations that showcase the unique possibilities of ambigrams are especially appreciated."
  }
];

// Contact 页面 FAQ
export const contactFAQs: FAQItem[] = [
  {
    question: "How quickly will I receive a response?",
    answer: "We typically respond within 24-48 hours during business days. For urgent matters, please indicate this in your message subject."
  },
  {
    question: "Can I request custom ambigram designs?",
    answer: "We focus on providing free tools rather than custom design services. However, our tool can create professional-quality ambigrams for any word combination you need."
  },
  {
    question: "How do I report a bug or suggest a feature?",
    answer: "Use our feedback form or email us directly. We actively review all suggestions and prioritize improvements based on user feedback."
  }
];

// Feedback 页面 FAQ
export const feedbackFAQs: FAQItem[] = [
  {
    question: "What happens after I submit feedback?",
    answer: "Every feedback submission is reviewed by our team. We categorize and prioritize based on impact and feasibility. Popular feature requests often get implemented in our regular updates."
  },
  {
    question: "Can I track the status of my feedback?",
    answer: "We don't currently have a public roadmap, but we frequently update users via our blog when requested features are released. Subscribe to our updates to stay informed."
  },
  {
    question: "What kind of feedback is most helpful?",
    answer: "Detailed descriptions with specific use cases, screenshots, or step-by-step reproduction steps are most valuable. This helps us understand exactly what you need and how to prioritize it."
  }
];

// Blog 列表页 FAQ (GEO: 针对 "ambigram blog" 搜索)
export const blogListFAQs: FAQItem[] = [
  {
    question: "What topics does the AmbigramGen blog cover?",
    answer: "Our blog covers ambigram design history, typography techniques, tattoo design trends, creative tutorials, and the latest updates to our free online ambigram generator tool."
  },
  {
    question: "How often is new content published?",
    answer: "We publish new articles and tutorials regularly, typically 2-3 times per month. Topics range from beginner guides to advanced design techniques and creative inspiration."
  },
  {
    question: "Can I contribute to the blog?",
    answer: "We welcome guest contributions from designers, artists, and ambigram enthusiasts. Contact us with your article idea, and we'll review it for potential publication."
  }
];

// Tutorial 列表页 FAQ (GEO: 针对 "how to make ambigram" 搜索)
export const tutorialListFAQs: FAQItem[] = [
  {
    question: "What skill level are these tutorials for?",
    answer: "Our tutorials range from beginner to advanced. Each tutorial clearly shows the difficulty level, estimated time, and prerequisites so you can find content matching your skill level."
  },
  {
    question: "Do I need special software to follow these tutorials?",
    answer: "No! All tutorials can be followed using our free online AmbigramGen tool. No downloads, no subscriptions, and no design experience required."
  },
  {
    question: "What's the best tutorial for beginners?",
    answer: "Start with 'Ambigram Basics Introduction' which covers fundamental concepts, then move to 'Basic Font Selection and Design Fundamentals' to practice creating your first ambigram."
  }
];

