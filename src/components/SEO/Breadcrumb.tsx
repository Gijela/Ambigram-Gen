// ================================================================
// SEO Breadcrumb Component
// ================================================================
// 面包屑导航组件,提升用户体验和 SEO
// 包含 Schema.org BreadcrumbList 结构化数据
// ================================================================

import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  // 生成 Schema.org 结构化数据
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* 可见的面包屑导航 */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        {/* 首页图标 */}
        <Link
          href="/"
          className="text-gray-400 hover:text-purple-400 transition-colors"
          aria-label="Home"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>

        {/* 面包屑项目 */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.href} className="flex items-center space-x-2">
              {/* 分隔符 */}
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>

              {/* 链接或当前页 */}
              {isLast ? (
                <span
                  className="text-purple-400 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};

// ================================================================
// 辅助函数：从路径生成面包屑
// ================================================================

export function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];

  // 路径映射
  const pathLabels: Record<string, string> = {
    blog: 'Blog',
    tutorials: 'Tutorials',
    about: 'About',
    gallery: 'Gallery',
    help: 'Help',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
  };

  let currentPath = '';
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // 对于详情页,使用更友好的标签
    if (index === paths.length - 1 && paths[0] === 'blog') {
      items.push({
        label: 'Article',
        href: currentPath,
      });
    } else if (index === paths.length - 1 && paths[0] === 'tutorials') {
      items.push({
        label: 'Tutorial',
        href: currentPath,
      });
    } else {
      items.push({
        label: pathLabels[segment] || segment,
        href: currentPath,
      });
    }
  });

  return items;
}

