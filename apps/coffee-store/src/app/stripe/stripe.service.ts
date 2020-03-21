import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

const baseUrl = 'http://localhost:4200';

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
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`
    });
  }
}
