/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                          Stripe Configuration                              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
});

export const STRIPE_CONFIG = {
  priceId: process.env.STRIPE_PRICE_ID || '',
  currency: 'usd',
  amount: 200, // $2.00 in cents
};

