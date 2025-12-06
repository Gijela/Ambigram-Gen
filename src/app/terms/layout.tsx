import { generateMetadata as genMeta } from '@/lib/seo/metadata';

// ================================================================
// SEO Metadata - Terms of Service Page
// ================================================================
export const metadata = genMeta("/terms");

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

