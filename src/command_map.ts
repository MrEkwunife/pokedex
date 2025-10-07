import { State } from "./state";

export async function commandMapForward(state: State) {
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationURL);

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationURL) {
    throw new Error("you're on the first page");
  }
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationURL);

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}
