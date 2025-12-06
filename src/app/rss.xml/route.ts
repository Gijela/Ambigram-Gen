// ================================================================
// RSS Feed Route (SEO 优化)
// ================================================================
// RSS Feed 帮助内容分发和搜索引擎发现新内容
// 路径: /rss.xml
// ================================================================

import { BLOG_POSTS_META } from '@/lib/seo/slugs';

const SITE_URL = 'https://ambigramgen.com';

export async function GET() {
  // 按发布日期排序（最新在前）
  const sortedPosts = [...BLOG_POSTS_META].sort((a, b) => {
    const dateA = new Date(a.publishDate || '2025-01-01');
    const dateB = new Date(b.publishDate || '2025-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  const rssItems = sortedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishDate || '2025-01-01').toUTCString()}</pubDate>
      <author>hello@ambigramgen.com (AmbigramGen Team)</author>
      <category>${post.category || 'Design'}</category>
    </item>`).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AmbigramGen Blog - Typography &amp; Ambigram Design</title>
    <link>${SITE_URL}/blog</link>
    <description>Discover the art of ambigram design. Tips, tutorials, and inspiration for creating stunning rotational typography for tattoos, logos, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.svg</url>
      <title>AmbigramGen Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} AmbigramGen. All rights reserved.</copyright>
    <managingEditor>hello@ambigramgen.com (AmbigramGen Team)</managingEditor>
    <webMaster>hello@ambigramgen.com (AmbigramGen Team)</webMaster>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

