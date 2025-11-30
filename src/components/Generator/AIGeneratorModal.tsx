/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     AI Ambigram Generator Modal                            ║
 * ║  Based on shadcn/ui Dialog, allows users to generate AI-styled Ambigrams  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

'use client';

import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/* ════════════════════════════════════════════════════════════════════════════
 *  Type Definitions
 * ════════════════════════════════════════════════════════════════════════════ */

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  initialText2?: string;
}

interface StyleOption {
  id: string;
  name: string;
  icon: string;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  Style Presets
 * ════════════════════════════════════════════════════════════════════════════ */

const STYLE_OPTIONS: StyleOption[] = [
  { id: 'tattoo', name: 'Tattoo', icon: '🖋️' },
  { id: 'gothic', name: 'Gothic', icon: '⚔️' },
  { id: 'watercolor', name: 'Watercolor', icon: '🎨' },
  { id: '3d', name: '3D Metal', icon: '💎' },
  { id: 'neon', name: 'Neon', icon: '✨' },
  { id: 'minimal', name: 'Minimal', icon: '〰️' },
  { id: 'custom', name: 'Custom', icon: '🎯' }
];

/* ════════════════════════════════════════════════════════════════════════════
 *  Main Component
 * ════════════════════════════════════════════════════════════════════════════ */

export const AIGeneratorModal = ({
  isOpen,
  onClose,
  initialText,
  initialText2 = ''
}: AIGeneratorModalProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('tattoo');
  const [customStyle, setCustomStyle] = useState<string>('');
  const [extraPrompt, setExtraPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const displayText = initialText2.trim()
    ? `${initialText} | ${initialText2}`
    : initialText;

  const isCustomStyle = selectedStyle === 'custom';

  /* ══════════════════════════════════════════════════════════════════════════
   *  Checkout Handler - Redirect to Stripe
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleCheckout = useCallback(async () => {
    if (!initialText.trim()) {
      setError('Please enter text first');
      return;
    }

    if (isCustomStyle && !customStyle.trim()) {
      setError('Please describe your custom style');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: displayText,
          style: selectedStyle,
          customStyle: isCustomStyle ? customStyle.trim() : undefined,
          extraPrompt: extraPrompt.trim() || undefined,
        })
      });

      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsProcessing(false);
    }
  }, [initialText, displayText, selectedStyle, customStyle, isCustomStyle, extraPrompt]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Close Handler
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setError(null);
      setExtraPrompt('');
      onClose();
    }
  }, [onClose]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render
   * ══════════════════════════════════════════════════════════════════════════ */

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <DialogHeader className="p-4 pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 
                            flex items-center justify-center text-lg shrink-0">
              ✨
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-base">AI Art Generator</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Create unique artistic Ambigram designs
              </DialogDescription>
            </div>
          </div>
          <DialogClose className="absolute right-3 top-3 w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 
                                   flex items-center justify-center text-gray-400 hover:text-white 
                                   transition-colors text-sm">
            ✕
          </DialogClose>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Text Display */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-xs text-gray-500 mb-1">Your Text</div>
            <div className="text-lg font-semibold text-white truncate">
              {displayText || 'Please enter text first'}
            </div>
          </div>

          {/* Style Selection */}
          <div>
            <div className="text-xs text-gray-500 mb-2">Choose Style</div>
            <div className="grid grid-cols-4 gap-2">
              {STYLE_OPTIONS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={cn(
                    "py-2 px-2 rounded-lg border transition-all text-center",
                    selectedStyle === style.id
                      ? 'bg-purple-500/20 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  )}
                >
                  <span className="text-base">{style.icon}</span>
                  <div className="text-[10px] mt-0.5 font-medium truncate">{style.name}</div>
                </button>
              ))}
            </div>

            {/* Custom Style Input */}
            {isCustomStyle && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <textarea
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="Describe your style, e.g. 'steampunk with gears and brass', 'japanese calligraphy ink wash'..."
                  rows={2}
                  className="w-full px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg 
                             text-sm text-white placeholder-gray-400 resize-none
                             focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500"
                />
              </div>
            )}
          </div>

          {/* Extra Prompt */}
          <div>
            <div className="text-xs text-gray-500 mb-2">Extra Description (Optional)</div>
            <textarea
              value={extraPrompt}
              onChange={(e) => setExtraPrompt(e.target.value)}
              placeholder="e.g. add flames, blue tones..."
              rows={2}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg 
                         text-sm text-white placeholder-gray-500 resize-none
                         focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 pt-3 border-t border-white/10 shrink-0 bg-black/20">
          {/* Payment Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure payment via Stripe</span>
            </div>
            <span>~10-30 seconds</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing || !initialText.trim()}
            className={cn(
              "w-full py-3 px-4 font-medium rounded-lg transition-all",
              "flex items-center justify-center gap-2 text-white text-sm",
              isProcessing
                ? 'bg-purple-500/50 cursor-wait'
                : !initialText.trim()
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            )}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting to payment...</span>
              </>
            ) : (
              <>
                <span>💳</span>
                <span>Pay $2 & Generate</span>
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-500">
            <span>🔒 SSL Encrypted</span>
            <span>💳 Visa / Mastercard / Amex</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
