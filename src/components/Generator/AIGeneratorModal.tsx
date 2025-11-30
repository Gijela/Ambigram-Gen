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
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayText = initialText2.trim()
    ? `${initialText} | ${initialText2}`
    : initialText;

  const isCustomStyle = selectedStyle === 'custom';

  /* ══════════════════════════════════════════════════════════════════════════
   *  Generate Handler
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleGenerate = useCallback(async () => {
    if (!initialText.trim()) {
      setError('Please enter text first');
      return;
    }

    if (isCustomStyle && !customStyle.trim()) {
      setError('Please describe your custom style');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: displayText,
          style: selectedStyle,
          customStyle: isCustomStyle ? customStyle.trim() : undefined,
          extraPrompt: extraPrompt.trim() || undefined,
          size: '1024x1024'
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Generation failed');
      }

      setGeneratedImage(result.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed, please try again');
    } finally {
      setIsGenerating(false);
    }
  }, [initialText, displayText, selectedStyle, customStyle, isCustomStyle, extraPrompt]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Download Handler
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleDownload = useCallback(async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
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
      window.open(generatedImage, '_blank');
    }
  }, [generatedImage]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Regenerate Handler
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleRegenerate = useCallback(() => {
    setGeneratedImage(null);
    setError(null);
  }, []);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Close Handler
   * ══════════════════════════════════════════════════════════════════════════ */

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setGeneratedImage(null);
      setError(null);
      setExtraPrompt('');
      onClose();
    }
  }, [onClose]);

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Result View
   * ══════════════════════════════════════════════════════════════════════════ */

  if (generatedImage) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
          {/* Image Display */}
          <div className="relative bg-black">
            <img
              src={generatedImage}
              alt="AI Generated Ambigram"
              className="w-full h-auto max-h-[60vh] object-contain"
            />
            <DialogClose className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 
                                     flex items-center justify-center text-white/80 hover:text-white 
                                     transition-colors backdrop-blur-sm">
              ✕
            </DialogClose>
          </div>

          {/* Action Area */}
          <div className="p-4 space-y-3 bg-gray-900">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                <span className="text-white font-medium">{displayText}</span>
                <span className="mx-2">·</span>
                <span>{STYLE_OPTIONS.find(s => s.id === selectedStyle)?.name}</span>
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRegenerate}
                className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/15 
                           text-white font-medium rounded-lg transition-colors
                           flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>Regenerate</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-500 
                           hover:from-green-600 hover:to-emerald-600
                           text-white font-medium rounded-lg transition-all
                           flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
   *  Render: Config View
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
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>💰 1 Credit ($2)</span>
            <span>~10-30 seconds</span>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !initialText.trim()}
            className={cn(
              "w-full py-3 px-4 font-medium rounded-lg transition-all",
              "flex items-center justify-center gap-2 text-white text-sm",
              isGenerating
                ? 'bg-purple-500/50 cursor-wait'
                : !initialText.trim()
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            )}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>AI is creating...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Generate AI Art</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
