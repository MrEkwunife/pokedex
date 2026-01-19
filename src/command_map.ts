import * as z from "zod";

import type { State } from "./state.js";

export async function commandMap(state: State) {
  const { pokeAPI } = state;

  try {
    const {
      next: nextLocation,
      previous: previousLocation,
      results,
    } = await pokeAPI.fetchLocations(state.nextLocationsURL ?? undefined);

    results.forEach((res) => {
      console.log(res.name);
    });

    state.nextLocationsURL = nextLocation;
    state.prevLocationsURL = previousLocation;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      process.exit(1);
    } else {
      `Error: ${error}`;
    }
  }
}
