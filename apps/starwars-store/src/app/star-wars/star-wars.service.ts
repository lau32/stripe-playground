import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface SwapiResponse<T> {
  count: number
  next: string
  previous: string
  results: Array<T>
}

interface Character {
  name: string
}

const SWAPI_BASE = 'https://swapi.co/api/';
const SWAPI_PEOPLE = `${SWAPI_BASE}people/`;

const lukeSkywalkerCharacter: Character = { name: "Luke Skywalker" };

@Injectable()
export class StarWarsService {
  async getCharacters(): Promise<Character[]> {
    const response = await axios.get<SwapiResponse<Character>>(SWAPI_PEOPLE);

    if (response.status !== 200 || !response.data.count) {
      return [lukeSkywalkerCharacter];
    }

    return response.data.results;
  }
}
