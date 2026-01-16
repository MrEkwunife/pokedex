import { createInterface } from "node:readline";
import process from "node:process";

export function startREPL() {
  // console.log("Hello Repl");

  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  r1.prompt();
  r1.on("line", (input) => {
    const commands = cleanInput(input);

    if (commands.length === 1) {
      r1.prompt();
      return;
    }

    console.log("Your command was: " + commands[0]);
    r1.prompt();
  });
}

export function cleanInput(input: string): Array<string> {
  return input.toLowerCase().trim().replace(/ +/g, " ").split(" ");
}
