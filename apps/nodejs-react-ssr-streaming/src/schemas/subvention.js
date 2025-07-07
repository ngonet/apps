import { z } from 'zod';

const subventionSchema = z.object({
  name: z.string().max(50),
});

export function validateSubvention(input) {
  return subventionSchema.safeParse(input);
}

export function validatePartialSubvention(input) {
  return subventionSchema.partial().safeParse(input);
}
