import { MainGenerator } from '@/components/Generator/MainGenerator';
import { Footer } from '@/components/Layout/Footer';
import { Hero } from '@/components/Layout/Hero';
import { GalleryPreview } from '@/sections/GalleryPreview';
import { HomeFAQ } from '@/components/SEO/HomeFAQ';
import { StatsSection } from '@/components/SEO/StatsSection';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

// ================================================================
// SEO Metadata - 首页优化
// ================================================================
export const metadata = genMeta("/");

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Hero />
      <MainGenerator />
      {/* GEO 优化：统计数据增强可信度，让 AI 更容易引用具体数字 */}
      <StatsSection />
      <GalleryPreview />
      {/* GEO 优化：首页 FAQ 让 AI 更容易引用我们的内容 */}
      <HomeFAQ />
      {/* <Footer /> */}
    </div>
  );
}
