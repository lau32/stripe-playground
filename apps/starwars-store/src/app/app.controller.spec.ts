import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

jest.mock('./app.service');

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();
  });

  describe('getCheckoutSession', () => {
    it('should return session', () => {
      const service: AppService = app.get(AppService);
      jest.spyOn(service, 'getCheckoutSessionId').mockResolvedValue({} as any);

      const appController = app.get<AppController>(AppController);
      expect(appController.getCheckoutSession()).toBeTruthy();
    });
  });
});
