/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     Payment Success Page                                   ║
 * ║  Handles successful Stripe payment and triggers AI generation              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

'use client';

import { useEffect, useState, useCallback, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

/* ════════════════════════════════════════════════════════════════════════════
 *  Types
 * ════════════════════════════════════════════════════════════════════════════ */

type PageState = 'loading' | 'generating' | 'success' | 'error';

/* ════════════════════════════════════════════════════════════════════════════
 *  Main Content Component
 * ════════════════════════════════════════════════════════════════════════════ */

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [state, setState] = useState<PageState>('loading');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationInfo, setGenerationInfo] = useState<{ text: string; style: string } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // 防止重复调用的 ref
  const isProcessingRef = useRef(false);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Verify Payment & Generate
   * ══════════════════════════════════════════════════════════════════════════ */

  const processPayment = useCallback(async () => {
    // 防止重复调用（React 18 Strict Mode 会触发两次）
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    if (!sessionId) {
      setError('Invalid session');
      setState('error');
      return;
    }

    try {
      // 1. Verify payment and get generation params
      const verifyRes = await fetch(`/api/checkout/verify?session_id=${sessionId}`);
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      const { text, style, customStyle, extraPrompt } = verifyData.metadata;
      setGenerationInfo({ text, style });
      setState('generating');

      // 2. Generate AI image
      const generateRes = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style, customStyle, extraPrompt, size: '1024x1024' }),
      });

      const generateData = await generateRes.json();

      if (!generateData.success) {
        throw new Error(generateData.error || 'Generation failed');
      }

      setImageUrl(generateData.imageUrl);
      setState('success');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  }, [sessionId]);

  useEffect(() => {
    processPayment();
  }, [processPayment]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Download Handler with Loading State
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleDownload = useCallback(async () => {
    if (!imageUrl || isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ambigram-ai-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  }, [imageUrl, isDownloading]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Loading State
   * ══════════════════════════════════════════════════════════════════════════ */

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Verifying payment...</p>
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Generating State
   * ══════════════════════════════════════════════════════════════════════════ */

  if (state === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <span className="absolute inset-0 flex items-center justify-center text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-4">AI is creating your artwork...</p>
          {generationInfo && (
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-sm text-gray-300">
                <span className="text-white font-medium">{generationInfo.text}</span>
                <span className="mx-2">·</span>
                <span>{generationInfo.style}</span>
              </p>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-4">Generating 4K high-resolution image, this may take ~20-60 seconds</p>
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Error State
   * ══════════════════════════════════════════════════════════════════════════ */

  if (state === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            If you were charged, please contact support with your session ID
          </p>
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Success State
   * ══════════════════════════════════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Artwork is Ready!</h1>
          <p className="text-gray-400">Thank you for your purchase</p>
        </div>

        {/* Image Display */}
        <div className="bg-black/50 rounded-2xl overflow-hidden border border-white/10 mb-6">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`AI generated ambigram artwork${generationInfo?.text ? ` for "${generationInfo.text}"` : ''}${generationInfo?.style ? ` in ${generationInfo.style} style` : ''} - custom typography design created with AmbigramGen`}
              className="w-full h-auto"
              loading="eager"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl transition-colors text-center"
          >
            ← Create Another
          </Link>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex-1 py-3 px-6 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2
              ${isDownloading 
                ? 'bg-gray-600 cursor-wait' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              }`}
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Info */}
        {generationInfo && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Generated: <span className="text-gray-300">{generationInfo.text}</span> · {generationInfo.style}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Page Component with Suspense
 * ════════════════════════════════════════════════════════════════════════════ */

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
