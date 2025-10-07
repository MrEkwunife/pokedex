import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();
  rl.on("line", async (input) => {
    const inputArray = cleanInput(input);
    if (!inputArray.length) {
      rl.prompt();
      return;
    }

    const commandObj = commands[inputArray[0]];
    if (commandObj) {
      try {
        await commandObj.callback(state, ...inputArray);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
