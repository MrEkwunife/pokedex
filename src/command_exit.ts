import { State } from "./state";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.pokeAPI.closeCache();
  process.exit(0);
}
