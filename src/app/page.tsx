import { MainGenerator } from '@/components/Generator/MainGenerator';
import { Footer } from '@/components/Layout/Footer';
import { Hero } from '@/components/Layout/Hero';
import { GalleryPreview } from '@/sections/GalleryPreview';
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
      <GalleryPreview />
      {/* <Footer /> */}
    </div>
  );
}
