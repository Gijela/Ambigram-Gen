/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     Verify Stripe Checkout Session                         ║
 * ║  Validates payment status and returns generation metadata                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Return metadata for generation
    return NextResponse.json({
      success: true,
      metadata: {
        text: session.metadata?.text || '',
        style: session.metadata?.style || 'tattoo',
        customStyle: session.metadata?.customStyle || '',
        extraPrompt: session.metadata?.extraPrompt || '',
      },
    });

  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

