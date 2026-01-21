import { initState } from "./state.js";

export async function startREPL() {
  const state = initState();
  let { rl, commands } = state;
  rl.prompt();
  rl.on("line", async (input) => {
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

    try {
      await cmd.callback(state, ...words.slice(1));
      rl.prompt();
    } catch (error) {}
  });
}

export function cleanInput(input: string): Array<string> {
  if (input.length === 0) return [];

  return input.toLowerCase().trim().replace(/ +/g, " ").split(" ");
}
