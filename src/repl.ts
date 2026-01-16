import { createInterface } from "node:readline";
import process from "node:process";
import { getCommands } from "./commands.js";

export function startREPL() {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  r1.prompt();
  r1.on("line", (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      r1.prompt();
      return;
    }
    const commandName = words[0];

    const commands = getCommands();
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: ${commandName}. Type "help" for a list of commands`,
      );
      r1.prompt();
      return;
    }

    cmd.callback(commands);

    r1.prompt();
  });
}

export function cleanInput(input: string): Array<string> {
  if (input.length === 0) return [];

  return input.toLowerCase().trim().replace(/ +/g, " ").split(" ");
}
