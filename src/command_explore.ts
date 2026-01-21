import * as z from "zod";
import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];
  if (!locationName) {
    console.log(`Usage:`);
    console.log(`explore <locationName>`);
    return;
  }

  try {
    const { pokemon_encounters } =
      await state.pokeAPI.fetchLocation(locationName);
    console.log(`Exploring ${locationName}...`);
    console.log("Found Pokemon:");

    pokemon_encounters.forEach((encounter) => {
      console.log(` - ${encounter.pokemon.name}`);
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      process.exit(1);
    } else {
      console.log(`Error ${error}`);
    }
  }
}
