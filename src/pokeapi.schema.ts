import * as z from "zod";

export const ShallowLocationsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
});

export const LocationSchema = z.object({
  encounter_method_rates: z
    .array(
      z.object({
        encounter_method: z.object({ name: z.string(), url: z.string().url() }),
        version_details: z.array(
          z.object({
            rate: z.number(),
            version: z.object({ name: z.string(), url: z.string().url() }),
          }),
        ),
      }),
    )
    .optional(),

  game_index: z.number(),
  id: z.number(),
  location: z.object({ name: z.string(), url: z.string() }),
  name: z.string(),
  names: z.array(
    z.object({
      language: z.object({ name: z.string(), url: z.string() }),
      name: z.string(),
    }),
  ),
  pokemon_encounters: z.array(
    z.object({
      pokemon: z.object({ name: z.string(), url: z.string() }),
      version_details: z.array(
        z.object({
          encounter_details: z.array(
            z.object({
              chance: z.number(),
              condition_values: z.array(
                z.object({ name: z.string(), url: z.string() }),
              ),
              max_level: z.number(),
              method: z.object({ name: z.string(), url: z.string() }),
              min_level: z.number(),
            }),
          ),
          max_chance: z.number(),
          version: z.object({ name: z.string(), url: z.string() }),
        }),
      ),
    }),
  ),
});

export type ShallowLocations = z.infer<typeof ShallowLocationsSchema>;
export type Location = z.infer<typeof LocationSchema>;
