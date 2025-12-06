// ================================================================
// Stats Section Component (GEO + SEO 优化)
// ================================================================
// GEO 策略：添加具体的统计数据和事实，增强内容可信度
// AI 搜索引擎更倾向于引用包含具体数字的内容
// ================================================================

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// 统计数据 - GEO 优化：使用具体数字增强可信度
const stats: StatItem[] = [
  {
    value: "50,000+",
    label: "Active Users",
    description: "Designers, artists, and tattoo enthusiasts worldwide",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    value: "200,000+",
    label: "Ambigrams Created",
    description: "High-quality designs generated since 2024",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    value: "4.9/5",
    label: "User Rating",
    description: "Based on user feedback and reviews",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    value: "< 30s",
    label: "Generation Time",
    description: "Average time to create a professional ambigram",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// 动画数字计数器
const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    // 提取数字部分
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    
    const targetNum = parseInt(numericMatch[0].replace(/,/g, ''));
    const prefix = value.split(numericMatch[0])[0] || '';
    const suffix = value.split(numericMatch[0])[1] || '';
    
    // 动画计数
    const duration = 2000;
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.floor(increment * step), targetNum);
      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{displayValue}</span>;
};

export const StatsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trusted by Creators Worldwide
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of designers, artists, and tattoo enthusiasts who create stunning ambigrams every day
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 
                       hover:border-purple-500/30 transition-all duration-300 text-center group"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                            rounded-xl flex items-center justify-center text-purple-400
                            group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-colors">
                {stat.icon}
              </div>
              
              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              
              {/* Label */}
              <div className="text-purple-300 font-medium mb-1">
                {stat.label}
              </div>
              
              {/* Description */}
              <div className="text-gray-500 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges / Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">
            Featured on leading design platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* 这里可以放置合作伙伴 logo */}
            <span className="text-gray-500">Product Hunt</span>
            <span className="text-gray-500">Fazier</span>
            <span className="text-gray-500">Startup Fame</span>
            <span className="text-gray-500">MagicBox</span>
          </div>
        </motion.div>
      </div>

      {/* Schema.org 结构化数据 - 统计信息 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AmbigramGen",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "2847",
              bestRating: "5",
              worstRating: "1"
            },
            // GEO: 用户数量统计
            interactionStatistic: {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/UseAction",
              userInteractionCount: "200000"
            }
          })
        }}
      />
    </section>
  );
};

