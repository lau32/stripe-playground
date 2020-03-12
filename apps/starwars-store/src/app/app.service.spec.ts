import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';

jest.mock('./stripe/stripe.service');

describe('AppService', () => {
  let service: AppService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AppService, StripeService]
    }).compile();

    service = app.get(AppService);
  });

  it('should return session', async () => {
    const result = { test: 'mock' };
    const stripeService = app.get(StripeService);
    jest.spyOn(stripeService, 'createCheckoutSession')
      .mockResolvedValue(result as any);

    const session = await service.getCheckoutSessionId();

    expect(session).toBe(result);
  });
});
