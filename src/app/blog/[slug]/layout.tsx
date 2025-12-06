import { generateBlogMetadata } from '@/lib/seo/metadata';
import { BLOG_POSTS_META, getBlogBySlug } from '@/lib/seo/slugs';

// ================================================================
// Blog Detail Page Layout - SEO Optimized with Slugs
// ================================================================
// 使用语义化的 slug 而非数字 ID,大幅提升 SEO
// Example: /blog/history-of-ambigram-art (vs /blog/1)
// ================================================================

// ================================================================
// 生成静态参数 (SSG) - 使用 slug
// ================================================================
export async function generateStaticParams() {
  return BLOG_POSTS_META.map((post) => ({
    slug: post.slug,
  }));
}

// ================================================================
// 动态生成 Metadata - 基于 slug
// ================================================================
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | AmbigramGen',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMetadata(post.slug, post.title, post.excerpt);
}

// ================================================================
// Layout 组件
// ================================================================
export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
