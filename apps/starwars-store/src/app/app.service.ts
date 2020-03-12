import { Injectable } from '@nestjs/common';

import { LineItem, StripeService } from './stripe/stripe.service';

const coffeeTypes = [
  'Café Con Hielo', 'Cortado', 'Espresso con panna', 'Flat White', 'Macchiato',
  'Cafe Cubano', 'Kopi susu', 'Galao', 'Doppio', 'Guillermo'];

@Injectable()
export class AppService {
  constructor(private readonly stripeService: StripeService) { }

  private async getLineItems(): Promise<Array<LineItem>> {
    const numberOfItems =
      Math.floor((Math.random() * 10) % coffeeTypes.length);

    return coffeeTypes
      .slice(0, numberOfItems)
      .map((coffeeType) => ({
        name: coffeeType,
        amount: Math.ceil((Math.random() * 1000) % 1000),
        currency: 'eur',
        quantity: 1
      }));
  }

  async getCheckoutSessionId() {
    const items = await this.getLineItems();
    const { id } = await this.stripeService.createCheckoutSession(items);

    return { id };
  }
}
