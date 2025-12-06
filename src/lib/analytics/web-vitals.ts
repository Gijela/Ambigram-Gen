// ================================================================
// Web Vitals 监控 (Core Web Vitals)
// ================================================================
// 监控关键性能指标：LCP, FID, CLS, FCP, TTFB
// 这些指标直接影响 SEO 排名和用户体验
// ================================================================

import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

// ================================================================
// 性能指标阈值 (Google 推荐)
// ================================================================
const THRESHOLDS = {
  // LCP (Largest Contentful Paint) - 最大内容绘制
  // Good: < 2.5s, Needs Improvement: 2.5s-4s, Poor: > 4s
  LCP: { good: 2500, needsImprovement: 4000 },
  
  // INP (Interaction to Next Paint) - 交互到下一次绘制 (替代 FID)
  // Good: < 200ms, Needs Improvement: 200-500ms, Poor: > 500ms
  INP: { good: 200, needsImprovement: 500 },
  
  // CLS (Cumulative Layout Shift) - 累积布局偏移
  // Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25
  CLS: { good: 0.1, needsImprovement: 0.25 },
  
  // FCP (First Contentful Paint) - 首次内容绘制
  // Good: < 1.8s, Needs Improvement: 1.8s-3s, Poor: > 3s
  FCP: { good: 1800, needsImprovement: 3000 },
  
  // TTFB (Time to First Byte) - 首字节时间
  // Good: < 800ms, Needs Improvement: 800-1800ms, Poor: > 1800ms
  TTFB: { good: 800, needsImprovement: 1800 },
};

// ================================================================
// 评估性能等级
// ================================================================
type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

function getRating(name: string, value: number): PerformanceRating {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// ================================================================
// 性能报告接口
// ================================================================
interface VitalsReport {
  name: string;
  value: number;
  rating: PerformanceRating;
  delta: number;
  id: string;
  navigationType: string;
}

// ================================================================
// 发送到分析服务
// ================================================================
function sendToAnalytics(metric: Metric) {
  const report: VitalsReport = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  // 开发环境：输出到控制台
  if (process.env.NODE_ENV === 'development') {
    const color = report.rating === 'good' ? '🟢' : 
                  report.rating === 'needs-improvement' ? '🟡' : '🔴';
    console.log(`${color} Web Vitals [${report.name}]:`, {
      value: report.value.toFixed(2),
      rating: report.rating,
      delta: report.delta.toFixed(2),
    });
    return;
  }

  // 生产环境：发送到 Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      // 自定义维度
      metric_rating: report.rating,
      metric_delta: metric.delta,
    });
  }

  // 也可以发送到自定义端点
  // fetch('/api/analytics/vitals', {
  //   method: 'POST',
  //   body: JSON.stringify(report),
  //   headers: { 'Content-Type': 'application/json' },
  // });
}

// ================================================================
// 初始化 Web Vitals 监控
// ================================================================
export function initWebVitals() {
  // 仅在浏览器环境运行
  if (typeof window === 'undefined') return;

  // 注册所有 Core Web Vitals 监控
  // 注: FID 已被 INP 取代 (web-vitals 4.0+)
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// ================================================================
// 获取当前页面性能摘要
// ================================================================
export function getPerformanceSummary(): Record<string, any> | null {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    // DNS 查询时间
    dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
    // TCP 连接时间
    tcpConnect: navigation.connectEnd - navigation.connectStart,
    // 请求响应时间
    requestResponse: navigation.responseEnd - navigation.requestStart,
    // DOM 解析时间
    domParsing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
    // 页面完全加载时间
    pageLoad: navigation.loadEventEnd - navigation.navigationStart,
    // 资源数量
    resourceCount: performance.getEntriesByType('resource').length,
  };
}

// ================================================================
// 性能优化建议
// ================================================================
export const OPTIMIZATION_TIPS = {
  LCP: [
    'Optimize images: use WebP format, add width/height attributes',
    'Preload critical resources: fonts, hero images',
    'Reduce server response time (TTFB)',
    'Remove render-blocking resources',
  ],
  INP: [
    'Break up long JavaScript tasks into smaller chunks',
    'Use web workers for heavy computations',
    'Reduce JavaScript execution time',
    'Optimize event handlers and reduce their complexity',
  ],
  CLS: [
    'Always include size attributes on images and videos',
    'Reserve space for dynamic content',
    'Avoid inserting content above existing content',
    'Use CSS transform for animations instead of layout properties',
  ],
  FCP: [
    'Reduce server response time',
    'Remove render-blocking resources',
    'Minify CSS and use critical CSS inline',
    'Preconnect to required origins',
  ],
  TTFB: [
    'Use a CDN',
    'Optimize server code and database queries',
    'Use HTTP/2 or HTTP/3',
    'Implement proper caching strategies',
  ],
};

