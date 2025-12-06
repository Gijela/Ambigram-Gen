// ================================================================
// Web Vitals Reporter Component
// ================================================================
// 在客户端初始化 Core Web Vitals 监控
// ================================================================

'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/analytics/web-vitals';

export const WebVitalsReporter = () => {
  useEffect(() => {
    // 初始化 Web Vitals 监控
    initWebVitals();
  }, []);

  // 这个组件不渲染任何内容
  return null;
};

