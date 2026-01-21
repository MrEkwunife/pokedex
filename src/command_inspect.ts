import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.log(`Usage:`);
    console.log(`inspect <pokemon>`);
    return;
  }
  const pokemon = state.pokedex[pokemonName];
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log("Name:", pokemon.name);
  console.log("Height:", pokemon.height);
  console.log("Weight:", pokemon.weight);

  console.log("Stats:");
  for (const stats of pokemon.stats) {
    console.log(` - ${stats.stat.name}: ${stats.base_stat}`);
  }

  console.log("Types:");
  for (const typeInfo of pokemon.types) {
    console.log(" -", typeInfo.type.name);
  }
}
