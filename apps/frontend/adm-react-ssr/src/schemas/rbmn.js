import { z } from 'zod';

export const rbmnSchema = z.object({
  year: z.date(),
  preschool: z.number().int(),
  highschool: z.number().int(),
});

export function validateRbmn(input) {
  return rbmnSchema.safeParse(input);
}

export function validatePartialRbmn(input) {
  return rbmnSchema.partial().safeParse(input);
}
