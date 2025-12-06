import { generateTutorialMetadata } from '@/lib/seo/metadata';
import { TUTORIALS_META, getTutorialBySlug } from '@/lib/seo/slugs';

// ================================================================
// Tutorial Detail Page Layout - SEO Optimized with Slugs
// ================================================================
// 使用语义化的 slug 而非数字 ID,大幅提升 SEO
// Example: /tutorials/ambigram-basics-introduction (vs /tutorials/1)
// ================================================================

// ================================================================
// 生成静态参数 (SSG) - 使用 slug
// ================================================================
export async function generateStaticParams() {
  return TUTORIALS_META.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

// ================================================================
// 动态生成 Metadata - 基于 slug
// ================================================================
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tutorial = getTutorialBySlug(params.slug);
  
  if (!tutorial) {
    return {
      title: 'Tutorial Not Found | AmbigramGen',
      description: 'The requested tutorial could not be found.',
    };
  }

  return generateTutorialMetadata(tutorial.slug, tutorial.title, tutorial.description);
}

// ================================================================
// Layout 组件
// ================================================================
export default function TutorialDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
