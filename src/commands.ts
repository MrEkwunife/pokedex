import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },

    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },

    map: {
      name: "map",
      description: "List Pokedex in a particular location",
      callback: commandMap,
    },

    mapb: {
      name: "mapb",
      description: "List previously listed locations",
      callback: commandMapB,
    },

    explore: {
      name: "explore",
      description: "Explores a location deeply. explore <locationName>",
      callback: commandExplore,
    },

    catch: {
      name: "catch",
      description:
        "Catches a pokemon and stores it users Pokedex. catch <pokemonName>",
      callback: commandCatch,
    },
  };
}
