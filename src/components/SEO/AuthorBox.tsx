// ================================================================
// Author Box Component (E-A-T 优化)
// ================================================================
// E-A-T = Expertise, Authoritativeness, Trustworthiness
// Google 和 AI 搜索引擎更信任有明确作者信息的内容
// ================================================================

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ================================================================
// 作者数据定义
// ================================================================

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;           // 头像 URL 或占位符
  expertise: string[];      // 专业领域
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// 预定义作者数据 (可根据实际情况修改)
export const AUTHORS: Record<string, Author> = {
  'typography-expert': {
    id: 'typography-expert',
    name: 'Alex Chen',
    role: 'Typography Expert & Lead Designer',
    bio: 'Alex has over 10 years of experience in typography and logo design. He has created ambigrams for major brands and has been featured in design publications worldwide. His passion for symmetrical letterforms led to the creation of AmbigramGen.',
    avatar: '/authors/alex-chen.jpg',
    expertise: ['Typography', 'Logo Design', 'Ambigram Art', 'Brand Identity'],
    social: {
      twitter: 'https://twitter.com/ambigramgen',
      linkedin: 'https://linkedin.com/company/ambigramgen',
      website: 'https://ambigramgen.com'
    }
  },
  'tattoo-artist': {
    id: 'tattoo-artist',
    name: 'Mike Rodriguez',
    role: 'Professional Tattoo Artist',
    bio: 'Mike is a certified tattoo artist with 15+ years of experience specializing in typographic tattoos. He has inked over 5,000 ambigram designs and consults on font selection and sizing for optimal skin application.',
    avatar: '/authors/mike-rodriguez.jpg',
    expertise: ['Tattoo Design', 'Skin Typography', 'Font Selection', 'Body Art'],
    social: {
      twitter: 'https://twitter.com/ambigramgen'
    }
  },
  'ai-engineer': {
    id: 'ai-engineer',
    name: 'Sarah Kim',
    role: 'AI Engineer & Co-founder',
    bio: 'Sarah holds a Master\'s degree in Computer Science from MIT with a focus on generative AI. She developed the core algorithms powering AmbigramGen\'s ability to create ambigrams from words of different lengths.',
    avatar: '/authors/sarah-kim.jpg',
    expertise: ['Machine Learning', 'Generative AI', 'Algorithm Design', 'Computer Vision'],
    social: {
      github: 'https://github.com/Gijela',
      linkedin: 'https://linkedin.com/company/ambigramgen'
    }
  },
  'design-writer': {
    id: 'design-writer',
    name: 'Emma Watson',
    role: 'Design Writer & Content Creator',
    bio: 'Emma is a design journalist with contributions to major publications including Design Week and Creative Review. She covers typography trends, design history, and creative tools.',
    avatar: '/authors/emma-watson.jpg',
    expertise: ['Design Writing', 'Typography History', 'Creative Trends', 'Content Strategy'],
    social: {
      twitter: 'https://twitter.com/ambigramgen',
      website: 'https://ambigramgen.com/blog'
    }
  }
};

// 根据博客文章作者名匹配 Author 对象
export function getAuthorByName(name: string): Author | null {
  // 简单匹配逻辑
  const authorMap: Record<string, string> = {
    'Design Expert': 'typography-expert',
    'Tattoo Artist': 'tattoo-artist',
    'Typography Expert': 'typography-expert',
    'Tattoo Artist Mike': 'tattoo-artist',
    'Tech Writer': 'ai-engineer',
    'AI Specialist': 'ai-engineer',
    'Design Writer': 'design-writer',
    'Brand Strategist': 'design-writer',
    // 可以继续添加映射
  };
  
  const authorId = authorMap[name];
  return authorId ? AUTHORS[authorId] : null;
}

// ================================================================
// Author Box UI 组件
// ================================================================

interface AuthorBoxProps {
  author: Author;
  publishDate?: string;
  readTime?: string;
  compact?: boolean;  // 紧凑模式
}

export const AuthorBox = ({ 
  author, 
  publishDate, 
  readTime,
  compact = false 
}: AuthorBoxProps) => {
  // 生成 Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.expertise,
    url: author.social?.website || 'https://ambigramgen.com',
    sameAs: [
      author.social?.twitter,
      author.social?.linkedin,
      author.social?.github,
      author.social?.website
    ].filter(Boolean)
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 
                      flex items-center justify-center text-white font-bold text-sm">
          {author.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Info */}
        <div>
          <div className="text-white font-medium text-sm">{author.name}</div>
          <div className="text-gray-400 text-xs flex items-center gap-2">
            {publishDate && <span>{publishDate}</span>}
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 
                      flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {author.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-1">{author.name}</h4>
          <p className="text-purple-300 text-sm mb-2">{author.role}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">{author.bio}</p>
          
          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {author.expertise.map((skill, index) => (
              <span 
                key={index}
                className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Social Links */}
          {author.social && (
            <div className="flex gap-3">
              {author.social.twitter && (
                <a 
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`${author.name} on Twitter`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
              {author.social.linkedin && (
                <a 
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`${author.name} on LinkedIn`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {author.social.github && (
                <a 
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`${author.name} on GitHub`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {author.social.website && (
                <a 
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`${author.name}'s website`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Person Schema for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </motion.div>
  );
};

// ================================================================
// About Author Section (文章末尾使用)
// ================================================================

interface AboutAuthorProps {
  authorName: string;
  publishDate?: string;
  readTime?: string;
}

export const AboutAuthor = ({ authorName, publishDate, readTime }: AboutAuthorProps) => {
  const author = getAuthorByName(authorName);
  
  // 如果找不到作者，创建默认作者
  if (!author) {
    const defaultAuthor: Author = {
      id: 'default',
      name: authorName,
      role: 'Content Creator at AmbigramGen',
      bio: 'A passionate contributor to the AmbigramGen community, sharing knowledge and insights about ambigram design and typography.',
      avatar: '',
      expertise: ['Ambigram Design', 'Typography', 'Creative Writing']
    };
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          About the Author
        </h3>
        <AuthorBox author={defaultAuthor} publishDate={publishDate} readTime={readTime} />
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        About the Author
      </h3>
      <AuthorBox author={author} publishDate={publishDate} readTime={readTime} />
    </div>
  );
};

