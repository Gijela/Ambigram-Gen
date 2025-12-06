// ================================================================
// SEO-Friendly Slug Utilities
// ================================================================
// 将数字 ID 转换为语义化的 slug,提升 SEO 和用户体验

/**
 * 将标题转换为 URL-safe 的 slug
 * 
 * @param title - 原始标题
 * @returns URL-safe slug
 * 
 * @example
 * titleToSlug("The History of Ambigram Art") 
 * // => "history-of-ambigram-art"
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')          // 空格转连字符
    .replace(/-+/g, '-')           // 多个连字符合并
    .replace(/^-|-$/g, '');        // 去除首尾连字符
}

/**
 * 从 slug 生成美化的标题
 * 
 * @param slug - URL slug
 * @returns 美化的标题
 * 
 * @example
 * slugToTitle("history-of-ambigram-art")
 * // => "History of Ambigram Art"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ================================================================
// Blog Posts Data with Slugs
// ================================================================

export interface BlogPostMeta {
  id: string;          // 保留数字 ID 用于兼容性
  slug: string;        // SEO-friendly URL slug
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
}

export const BLOG_POSTS_META: BlogPostMeta[] = [
  {
    id: '1',
    slug: 'history-of-ambigram-art',
    title: 'The History and Evolution of Ambigram Art',
    excerpt: 'Explore the evolution of ambigrams from ancient symbols to modern digital art, understanding the cultural background and technical development of this unique art form.',
    category: 'Art History',
    tags: ['history', 'art', 'culture'],
    author: 'Art Historian',
    publishDate: '2025-06-20',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    slug: 'tattoo-design-trends-2025',
    title: 'Ambigram Design Trends in Tattoo Art',
    excerpt: 'The most popular ambigram design styles in the tattoo world for 2025, from minimalism to complex geometric patterns - a comprehensive analysis.',
    category: 'Tattoo Design',
    tags: ['tattoo', 'design', 'trends'],
    author: 'Tattoo Artist',
    publishDate: '2025-06-18',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: '3',
    slug: 'multilingual-ambigram-techniques',
    title: 'Creative Techniques for Multi-Language Ambigrams',
    excerpt: 'In-depth analysis of character structure characteristics, mastering core techniques and aesthetic principles for creating ambigrams in different languages.',
    category: 'Creative Techniques',
    tags: ['multilingual', 'techniques', 'tutorial'],
    author: 'Typography Designer',
    publishDate: '2025-06-15',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: '4',
    slug: 'font-choice-impact-on-ambigrams',
    title: 'How Font Choice Affects Ambigram Results',
    excerpt: 'How different font styles influence the visual effect of ambigrams, and how to choose the most suitable font for your design.',
    category: 'Design Theory',
    tags: ['fonts', 'design', 'theory'],
    author: 'Font Designer',
    publishDate: '2025-06-12',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: '5',
    slug: 'ai-technology-in-ambigram-generation',
    title: 'AI Technology in Ambigram Generation',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the ambigram creation process and future development prospects.',
    category: 'Technology Innovation',
    tags: ['AI', 'technology', 'innovation'],
    author: 'Tech Expert',
    publishDate: '2025-06-10',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: '6',
    slug: 'ambigrams-in-brand-design',
    title: 'Ambigrams in Brand Design Applications',
    excerpt: 'How brands use ambigrams to create unique visual identity, enhancing brand memorability and influence.',
    category: 'Brand Design',
    tags: ['branding', 'business', 'design'],
    author: 'Brand Designer',
    publishDate: '2025-06-08',
    readTime: '9 min read',
    featured: false,
  },
];

// ================================================================
// Tutorial Data with Slugs
// ================================================================

export interface TutorialMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  steps: number;
  tags: string[];
}

export const TUTORIALS_META: TutorialMeta[] = [
  {
    id: '1',
    slug: 'ambigram-basics-introduction',
    title: 'Ambigram Basics Introduction',
    description: 'Learn the basic concepts and creation methods of ambigrams from scratch',
    category: 'Basic Tutorials',
    difficulty: 'beginner',
    duration: '10 min',
    steps: 5,
    tags: ['beginner', 'basics', 'concepts'],
  },
  {
    id: '2',
    slug: 'different-length-words-technique',
    title: 'Different Length Words Ambigram Techniques',
    description: 'Master advanced techniques for handling different length word combinations',
    category: 'Advanced Techniques',
    difficulty: 'intermediate',
    duration: '15 min',
    steps: 8,
    tags: ['advanced', 'algorithm', 'techniques'],
  },
  {
    id: '3',
    slug: 'tattoo-design-specialization',
    title: 'Tattoo Design Specialized Ambigrams',
    description: 'Professional methods for optimizing ambigrams for tattoo design',
    category: 'Tattoo Design',
    difficulty: 'intermediate',
    duration: '20 min',
    steps: 10,
    tags: ['tattoo', 'design', 'professional'],
  },
  {
    id: '4',
    slug: 'multilingual-creation-guide',
    title: 'Multi-Language Ambigram Creation Guide',
    description: 'Special handling methods and techniques for multi-language character ambigrams',
    category: 'Language Tutorials',
    difficulty: 'advanced',
    duration: '25 min',
    steps: 12,
    tags: ['multilingual', 'characters', 'typography'],
  },
  {
    id: '5',
    slug: 'font-selection-and-pairing',
    title: 'Font Selection and Pairing',
    description: 'How to choose the right fonts to enhance ambigram effects',
    category: 'Design Theory',
    difficulty: 'beginner',
    duration: '12 min',
    steps: 6,
    tags: ['fonts', 'design', 'aesthetics'],
  },
  {
    id: '6',
    slug: 'advanced-customization-techniques',
    title: 'Advanced Customization Techniques',
    description: 'Use advanced features to create unique ambigram works',
    category: 'Advanced Techniques',
    difficulty: 'advanced',
    duration: '30 min',
    steps: 15,
    tags: ['advanced', 'customization', 'creative'],
  },
];

// ================================================================
// 查找辅助函数
// ================================================================

/**
 * 通过 slug 查找博客文章
 */
export function getBlogBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS_META.find(post => post.slug === slug);
}

/**
 * 通过 ID 查找博客文章 (向后兼容)
 */
export function getBlogById(id: string): BlogPostMeta | undefined {
  return BLOG_POSTS_META.find(post => post.id === id);
}

/**
 * 通过 slug 查找教程
 */
export function getTutorialBySlug(slug: string): TutorialMeta | undefined {
  return TUTORIALS_META.find(tutorial => tutorial.slug === slug);
}

/**
 * 通过 ID 查找教程 (向后兼容)
 */
export function getTutorialById(id: string): TutorialMeta | undefined {
  return TUTORIALS_META.find(tutorial => tutorial.id === id);
}

/**
 * 生成博客文章的 slug URL
 */
export function getBlogUrl(slugOrId: string): string {
  const post = getBlogBySlug(slugOrId) || getBlogById(slugOrId);
  return post ? `/blog/${post.slug}` : '/blog';
}

/**
 * 生成教程的 slug URL
 */
export function getTutorialUrl(slugOrId: string): string {
  const tutorial = getTutorialBySlug(slugOrId) || getTutorialById(slugOrId);
  return tutorial ? `/tutorials/${tutorial.slug}` : '/tutorials';
}

