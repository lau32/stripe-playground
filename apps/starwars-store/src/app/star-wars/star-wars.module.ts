import { Module } from '@nestjs/common';

import { StarWarsService } from './star-wars.service';

@Module({
  providers: [StarWarsService],
  exports: [StarWarsService]
})
export class StarWarsModule {
}
