/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     Stripe Checkout Session API                            ║
 * ║  Creates a Stripe Checkout session for AI Ambigram generation payment      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';

/* ════════════════════════════════════════════════════════════════════════════
 *  Type Definitions
 * ════════════════════════════════════════════════════════════════════════════ */

interface CheckoutRequest {
  text: string;
  style: string;
  customStyle?: string;
  extraPrompt?: string;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  POST: Create Checkout Session
 * ════════════════════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CheckoutRequest = await request.json();
    const { text, style, customStyle, extraPrompt } = body;

    // Validate required fields
    if (!text?.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { error: 'Style is required' },
        { status: 400 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            product_data: {
              name: 'AI Ambigram Generation',
              description: `Generate artistic ambigram for "${text}"`,
            },
            unit_amount: STRIPE_CONFIG.amount,
          },
          quantity: 1,
        },
      ],
      // Store generation parameters in metadata
      metadata: {
        text,
        style,
        customStyle: customStyle || '',
        extraPrompt: extraPrompt || '',
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

