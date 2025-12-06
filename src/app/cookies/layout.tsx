import { generateMetadata as genMeta } from '@/lib/seo/metadata';

// ================================================================
// SEO Metadata - Cookie Policy Page
// ================================================================
export const metadata = genMeta("/cookies");

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

