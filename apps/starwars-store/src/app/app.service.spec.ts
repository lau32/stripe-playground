import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';
import { StarWarsService } from './star-wars/star-wars.service';

jest.mock('./stripe/stripe.service');

describe('AppService', () => {
  let service: AppService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AppService, StarWarsService, StripeService]
    }).compile();

    service = app.get(AppService);
  });

  it('should return session', async () => {
    const result = { test: 'mock' };
    const mockCharacters = [{ name: 'mock' }];
    const swService = app.get(StarWarsService);
    jest.spyOn(swService, 'getCharacters')
      .mockResolvedValue(mockCharacters);
    const stripeService = app.get(StripeService);
    jest.spyOn(stripeService, 'createCheckoutSession')
      .mockResolvedValue(result as any);

    const session = await service.getCheckoutSession();

    expect(session).toBe(result);
  });
});
