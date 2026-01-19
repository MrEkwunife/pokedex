import * as z from "zod";
import {
  ShallowLocationsSchema,
  ShallowLocations,
  LocationSchema,
  Location,
} from "./pokeapi.schema.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return ShallowLocationsSchema.parse(data);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/${locationName}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return LocationSchema.parse(data);
  }
}
