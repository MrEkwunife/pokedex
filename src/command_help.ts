import type { State } from "./state.js";

export async function commandHelp(state: State) {
  const { commands } = state;

  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const command in commands) {
    const commandName = commands[command].name;
    const commandDescription = commands[command].description;

    console.log(`${commandName}: ${commandDescription}`);
  }
}
