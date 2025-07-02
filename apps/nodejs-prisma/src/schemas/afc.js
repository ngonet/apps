import { z } from 'zod';

const afcSchema = z.object({
  active: z.boolean(),
});

export function validateAfc(input) {
  return afcSchema.safeParse(input);
}

export function validatePartialAfc(input) {
  return afcSchema.partial().safeParse(input);
}
