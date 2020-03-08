import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';

import { StarWarsService } from './star-wars.service';

jest.mock('axios');

describe('StarWarsService', () => {
  let service: StarWarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarWarsService]
    }).compile();

    service = module.get<StarWarsService>(StarWarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return default character on fail request', async () => {
    const result = { status: 500 };
    jest.spyOn(axios, 'get').mockResolvedValue(result);

    const characters = await service.getCharacters();

    expect(characters.length).toBe(1);
  });

  it('should return default character empty response data', async () => {
    const result = { data: { count: 0 } };
    jest.spyOn(axios, 'get').mockResolvedValue(result);

    const characters = await service.getCharacters();

    expect(characters.length).toBe(1);
  });
});
