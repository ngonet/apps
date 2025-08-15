import { z } from 'zod';

const healthPersonSchema = z.object({
  healthId: z.string().uuid(),
  personId: z.string().uuid(),
  planValue: z.number(),
});

export function validateHealthPerson(input) {
  return healthPersonSchema.safeParse(input);
}

export function validatePartialHealthPerson(input) {
  return healthPersonSchema.partial().safeParse(input);
}
