import { createInterface } from "node:readline";
import process from "node:process";
import { getCommands } from "./commands.js";
import { initState } from "./state.js";

export function startREPL() {
  const { rl, commands } = initState();
  rl.prompt();
  rl.on("line", (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: ${commandName}. Type "help" for a list of commands`,
      );
      rl.prompt();
      return;
    }

    cmd.callback({ rl, commands });
    rl.prompt();
  });
}

export function cleanInput(input: string): Array<string> {
  if (input.length === 0) return [];

  return input.toLowerCase().trim().replace(/ +/g, " ").split(" ");
}
