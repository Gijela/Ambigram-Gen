'use client';

import { useState } from 'react';
import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { InputForm } from './InputForm';
import { FontSelector } from './FontSelector';
import { PreviewCanvas } from './PreviewCanvas';
import { CustomizationPanel } from './CustomizationPanel';
import { DownloadPanel } from './DownloadPanel';
import { HistoryPanel } from './HistoryPanel';
import { PerformanceMonitor } from '../Debug/PerformanceMonitor';
import { AIGeneratorModal } from './AIGeneratorModal';
import { motion } from 'framer-motion';

export const MainGenerator = () => {
  const {
    inputText,
    inputText2,
    isGenerating,
    generationResult,
    error,
    showCustomization,
    generateAmbigram,
    toggleCustomization,
    history
  } = useAmbigramStore();

  const [showHistory, setShowHistory] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const handleGenerate = async () => {
    // 检查至少有一个输入框有内容
    if (!inputText.trim()) {
      return;
    }
    await generateAmbigram();
  };

  const handleOpenAIModal = () => {
    setShowAIModal(true);
  };

  return (
    <section id="generator" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Create Your Ambigram Free
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter any text content, and our AI algorithm will generate the perfect ambigram design for you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side: Input and Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Input Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Enter Text
              </h3>
              <InputForm />
              
              {/* Generate Buttons */}
              <div className="flex gap-3 mt-4">
                {/* 免费生成按钮 */}
                <motion.button
                  whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                  whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                  onClick={handleGenerate}
                  disabled={isGenerating || !inputText.trim()}
                  className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                    isGenerating
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 cursor-wait'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  } ${
                    !inputText.trim() && !isGenerating
                      ? 'opacity-50 cursor-not-allowed'
                      : 'text-white'
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="relative">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-5 h-5 border-2 border-transparent border-r-white/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                      </div>
                      <span className="animate-pulse">Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Generate</span>
                    </div>
                  )}
                </motion.button>

                {/* AI 生成按钮 */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenAIModal}
                  disabled={!inputText.trim()}
                  className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300
                    bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600
                    ${!inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'text-white'}
                    relative overflow-hidden group`}
                >
                  {/* 闪光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <span className="text-lg">✨</span>
                    <span>AI Generate</span>
                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">Pro</span>
                  </div>
                </motion.button>
              </div>

              {/* Generation Status Prompt */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-200 font-medium">AI is analyzing text structure...</p>
                      <p className="text-xs text-purple-300/80 mt-1">
                        Creating perfect ambigram design for "{inputText}{inputText2.trim() ? ` / ${inputText2}` : ''}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Font Selector */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Select Font
              </h3>
              <FontSelector />
            </div>

            {/* History Panel */}
            {history.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    History
                  </h3>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showHistory ? 'Collapse' : 'Expand'}
                  </button>
                </div>
                
                {showHistory && <HistoryPanel />}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-xl p-4"
              >
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side: Preview and Download Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Customization Panel */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Advanced Customization
                </h3>
                <button
                  onClick={toggleCustomization}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showCustomization ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              {showCustomization && <CustomizationPanel />}
            </div>

            {/* Preview Canvas */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Live Preview
                </h3>
                <div className="text-xs text-gray-400">
                  {inputText ? 'Vertical Ambigram Mode' : 'Waiting for Input'}
                </div>
              </div>
              <PreviewCanvas />
            </div>

            {/* Download Panel */}
            {generationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Download Your Design
                </h3>
                <DownloadPanel />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">
              💡 Usage Tips
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-purple-400">Smart Parsing:</strong>
                Supports intelligent parsing of words, phrases, etc.
              </div>
              <div>
                <strong className="text-purple-400">Tattoo Friendly:</strong>
                All designs are optimized for tattoo adaptation
              </div>
              <div>
                <strong className="text-purple-400">Completely Free:</strong>
                No watermarks, no restrictions, supports high-resolution downloads
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 性能监控组件 */}
      <PerformanceMonitor />

      {/* AI 生成弹窗 */}
      <AIGeneratorModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        initialText={inputText}
        initialText2={inputText2}
      />
    </section>
  );
};