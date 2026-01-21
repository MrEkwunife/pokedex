import {
  ShallowLocationsSchema,
  ShallowLocations,
  LocationSchema,
  Location,
  PokemonSchema,
  Pokemon,
} from "./pokeapi.schema.js";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(5 * 60 * 1000);

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return ShallowLocationsSchema.parse(cached);
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    this.cache.add(url, data);
    return ShallowLocationsSchema.parse(data);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<Location>(url);
    if (cached) {
      return LocationSchema.parse(cached);
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    this.cache.add(url, data);
    return LocationSchema.parse(data);
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}`;
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return PokemonSchema.parse(cached);
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    this.cache.add<Pokemon>(url, data);
    return PokemonSchema.parse(data);
  }
}
