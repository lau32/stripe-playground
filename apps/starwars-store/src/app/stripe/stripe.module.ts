import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StripeService } from './stripe.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [StripeService]
})
export class StripeModule {
}
