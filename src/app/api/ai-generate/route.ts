/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     AI Ambigram 生成 API 路由                              ║
 * ║  调用 nano-banana-pro 模型生成艺术风格的 Ambigram 图像                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { NextRequest, NextResponse } from 'next/server';

/* ════════════════════════════════════════════════════════════════════════════
 *  类型定义
 * ════════════════════════════════════════════════════════════════════════════ */

interface AIGenerateRequest {
  text: string;           // User input text (e.g. "Hope | Faith")
  style: string;          // Preset style ID
  customStyle?: string;   // Custom style description (when style === 'custom')
  extraPrompt?: string;   // Additional user description
  size?: string;          // Image size
}

interface AIGenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  预设风格配置
 * ════════════════════════════════════════════════════════════════════════════ */

const STYLE_PRESETS: Record<string, { name: string; prompt: string }> = {
  tattoo: {
    name: 'Tattoo',
    prompt: 'realistic tattoo style, black ink on skin texture, fine line work, professional tattoo art, shading and gradients, high contrast, suitable for tattoo design'
  },
  gothic: {
    name: 'Gothic',
    prompt: 'gothic metal style, ornate decorations, dark fantasy aesthetic, silver and gold metallic textures, medieval calligraphy, dramatic lighting, dark gradient background'
  },
  watercolor: {
    name: 'Watercolor',
    prompt: 'watercolor painting style, soft edges, artistic brush strokes, vibrant colors bleeding into each other, paper texture background, artistic and dreamy'
  },
  '3d': {
    name: '3D Metal',
    prompt: '3D embossed effect, raised metallic surface, dramatic studio lighting, gold and bronze materials, photorealistic rendering, depth and shadows'
  },
  neon: {
    name: 'Neon',
    prompt: 'neon light effect, glowing tubes, cyberpunk aesthetic, dark city night background, vibrant pink blue and purple neon colors, electric glow'
  },
  minimal: {
    name: 'Minimal',
    prompt: 'minimalist line art, single continuous stroke, clean and elegant design, pure white background, black thin lines, modern and sophisticated'
  }
};

/* ════════════════════════════════════════════════════════════════════════════
 *  Prompt 构建器
 * ════════════════════════════════════════════════════════════════════════════ */

function buildPrompt(text: string, styleId: string, customStyle?: string, extraPrompt?: string): string {
  // Parse text: support "word1 | word2" format
  const parts = text.split('|').map(p => p.trim()).filter(Boolean);
  const word1 = parts[0] || text;
  const word2 = parts[1] || word1;

  // Get style configuration
  let stylePrompt: string;
  if (styleId === 'custom' && customStyle) {
    stylePrompt = customStyle;
  } else {
    const style = STYLE_PRESETS[styleId] || STYLE_PRESETS.tattoo;
    stylePrompt = style.prompt;
  }

  // Build core prompt
  const corePrompt = `
Create a stunning ambigram typography design:

TEXT: "${word1}"${word2 !== word1 ? ` and "${word2}"` : ''}

AMBIGRAM REQUIREMENTS:
- The design reads as "${word1}" when viewed normally
- The design reads as "${word2}" when rotated 180 degrees
- Elegant calligraphic letterforms with perfect symmetry
- Each letter is artistically crafted to be readable from both orientations

STYLE: ${stylePrompt}

COMPOSITION:
- Text is the focal point, centered in the image
- Professional typography design
- High resolution, crisp details
- Suitable for tattoo, logo, or artistic print

${extraPrompt ? `ADDITIONAL REQUIREMENTS: ${extraPrompt}` : ''}
`.trim();

  return corePrompt;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  API 路由处理器
 * ════════════════════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest): Promise<NextResponse<AIGenerateResponse>> {
  try {
    // 1. Parse request body
    const body: AIGenerateRequest = await request.json();
    const { text, style, customStyle, extraPrompt, size = '1024x1024' } = body;

    // 2. Validate parameters
    if (!text?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter text to generate' },
        { status: 400 }
      );
    }

    if (!style || (!STYLE_PRESETS[style] && style !== 'custom')) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid style' },
        { status: 400 }
      );
    }

    if (style === 'custom' && !customStyle?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please describe your custom style' },
        { status: 400 }
      );
    }

    // 3. Check API Key
    const apiKey = process.env.NANO_BANANA_API_KEY;
    if (!apiKey) {
      console.error('NANO_BANANA_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Service configuration error, please contact admin' },
        { status: 500 }
      );
    }

    // 4. Build Prompt
    const prompt = buildPrompt(text, style, customStyle, extraPrompt);

    // 5. 调用 nano-banana-pro API
    const apiResponse = await fetch('https://api.gptgod.online/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'nano-banana-2-4k',
        prompt: prompt,
        n: 1,
        size: size,
        response_format: 'url'
      })
    });

    // 6. Handle API response
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('nano-banana-pro API error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Image generation failed, please try again' },
        { status: 500 }
      );
    }

    const result = await apiResponse.json();

    // 7. Extract image URL
    const imageUrl = result.data?.[0]?.url;
    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve generated image' },
        { status: 500 }
      );
    }

    // 8. Return success
    return NextResponse.json({
      success: true,
      imageUrl
    });

  } catch (error) {
    console.error('AI generate error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error, please try again later' },
      { status: 500 }
    );
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 *  获取可用风格列表 (GET 请求)
 * ════════════════════════════════════════════════════════════════════════════ */

export async function GET(): Promise<NextResponse> {
  const styles = Object.entries(STYLE_PRESETS).map(([id, config]) => ({
    id,
    name: config.name
  }));

  return NextResponse.json({ styles });
}

