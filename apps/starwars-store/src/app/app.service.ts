import { Injectable } from '@nestjs/common';

import { LineItem, StripeService } from './stripe/stripe.service';
import { StarWarsService } from './star-wars/star-wars.service';

@Injectable()
export class AppService {
  constructor(
    private readonly swService: StarWarsService,
    private readonly stripeService: StripeService) {
  }

  private async getLineItems(): Promise<Array<LineItem>> {
    const characters = await this.swService.getCharacters();
    const numberOfCharacters =
      Math.floor((Math.random() * 10) % characters.length);

    return characters
      .slice(0, numberOfCharacters)
      .map((character) => ({
        name: character.name,
        description: `${character.name} figure`,
        amount: Math.ceil((Math.random() * 10000) % 10000),
        currency: 'eur',
        quantity: 1
      }));
  }

  async getCheckoutSession() {
    const items = await this.getLineItems();

    return this.stripeService.createCheckoutSession(items);
  }
}
