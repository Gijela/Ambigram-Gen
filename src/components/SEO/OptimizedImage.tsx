// ================================================================
// SEO Optimized Image Component
// ================================================================
// 自动优化的图片组件：
// - Lazy loading (延迟加载)
// - Alt text (无障碍 + SEO)
// - Next.js Image 优化
// - WebP 格式支持
// ================================================================

import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;  // 首屏图片设为 true
  quality?: number;    // 1-100, 默认 75
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
}: OptimizedImageProps) => {
  // 如果没有提供 width/height,使用 fill 模式
  const useFill = !width || !height;

  if (useFill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          loading={priority ? undefined : 'lazy'}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      loading={priority ? undefined : 'lazy'}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

// ================================================================
// 简化版：普通 img 标签优化
// ================================================================

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const SimpleOptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: SimpleImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
};

