import { z } from 'zod';

const afpPersonSchema = z.object({
  afpId: z.string().uuid(),
  personId: z.string().uuid(),
});

export function validateAfpPerson(input) {
  return afpPersonSchema.safeParse(input);
}

export function validatePartialAfpPerson(input) {
  return afpPersonSchema.partial().safeParse(input);
}
