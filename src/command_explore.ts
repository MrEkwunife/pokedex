import { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const locationName = args[1];
  const locationData = await state.pokeAPI.fetchLocation(locationName);
  const pokemons = locationData.pokemon_encounters.map(
    (ecounter) => ecounter.pokemon.name,
  );

  console.log(`Exploring ${locationName}...`);
  console.log(`Found Pokemon:`);

  for (const name of pokemons) {
    console.log(` - ${name}`);
  }
}
