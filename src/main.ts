import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState(1000 * 60 * 60);
  startREPL(state);
}

main();
