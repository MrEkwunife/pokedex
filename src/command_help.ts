import { State } from "./state.js";

export async function commandHelp(state: State) {
  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage: ");
  console.log();

  const { commands } = state;
  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
