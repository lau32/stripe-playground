import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { StarWarsModule } from './star-wars/star-wars.module';

@Module({
  imports: [StripeModule, StarWarsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
