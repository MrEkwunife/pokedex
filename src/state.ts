import { createInterface, type Interface } from "readline";
import process from "node:process";
import { getCommands } from "./commands_registry.js";
import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
  caughtPokemon: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number): State {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    rl: r1,
    commands: getCommands(),
    pokeAPI: new PokeAPI(cacheInterval),
    nextLocationURL: "",
    prevLocationURL: "",
    caughtPokemon: {},
  };
}
