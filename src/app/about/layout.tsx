import { generateMetadata as genMeta } from '@/lib/seo/metadata';

// ================================================================
// SEO Metadata - About Page
// ================================================================
export const metadata = genMeta("/about");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

