import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

@Injectable()
export class StripeService {
  private config: Stripe.StripeConfig = null;
  private stripe: Stripe = new Stripe(this.configService.get('STRIPE_SK'), this.config);

  constructor(private readonly configService: ConfigService) {
  }

  async createCheckoutSession(line_items: Stripe.Checkout.SessionCreateParams.LineItem[])
    : Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal'],
      line_items,
      success_url: 'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/cancel'
    });
  }
}
