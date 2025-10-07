import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const name = args[1];
  const pokemon = await state.pokeAPI.fetchPokemon(name);

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  const res = Math.floor(Math.random() * pokemon.base_experience);
  if (res > 40) {
    console.log(`${pokemon.name} escaped!`);
    return;
  }

  console.log(`${pokemon.name} was caught!`);
  console.log("You may now inspect it with the inspect command.");
  state.caughtPokemon[pokemon.name] = pokemon;
}
