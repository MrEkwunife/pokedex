import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();
  const pokeAPI = new PokeAPI();

  return {
    rl,
    commands,
    pokeAPI,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
