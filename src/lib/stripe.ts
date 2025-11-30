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
  apiVersion: '2025-11-17.clover',
  typescript: true,
});

/* ════════════════════════════════════════════════════════════════════════════
 *  Pricing Configuration
 *  ────────────────────
 *  amount: 价格，单位为 cents（美分）
 *          100 = $1.00 | 200 = $2.00 | 500 = $5.00
 * ════════════════════════════════════════════════════════════════════════════ */

export const STRIPE_CONFIG = {
  currency: 'usd',
  amount: parseInt(process.env.AI_GENERATION_PRICE_CENTS || '200', 10),
};
