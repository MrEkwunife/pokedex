import type { State } from "./state.js";
import * as z from "zod";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];

  try {
    const pokemeon = await state.pokeAPI.fetchPokemon(pokemonName);
    const { name, base_experience: baseExperience } = pokemeon;
    const chance = Math.floor(Math.random() * 150);

    console.log(`Throwing a Pokeball at ${name}...`);
    if (chance >= baseExperience) {
      console.log(`${name} was caught!`);
      state.pokedex[name] = pokemeon;
    } else {
      console.log(`${name} escaped!`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    } else {
      console.log(error);
    }
  }
}
