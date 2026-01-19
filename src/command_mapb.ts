import * as z from "zod";

import type { State } from "./state.js";

export async function commandMapB(state: State) {
  const { pokeAPI, prevLocationsURL } = state;

  if (prevLocationsURL === null) {
    console.log("you're on the first page");
    return;
  }

  try {
    const {
      next: nextLocation,
      previous: previousLocation,
      results,
    } = await pokeAPI.fetchLocations(prevLocationsURL);

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
