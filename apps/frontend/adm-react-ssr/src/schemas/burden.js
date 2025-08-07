import { z } from 'zod';
import { PATTERNS } from '../utils/regexp.js';

export const burdenSchema = z.object({
  personId: z.string().uuid(),
  rut: z.string().regex(PATTERNS.RUT),
  firstName: z.string().max(50),
  firstSurname: z.string().max(50),
  secondSurname: z.string().max(50),
  birthdate: z.date(),
  nationality: z.enum(['chilena', 'extranjero']),
  sex: z.enum(['M', 'F']),
});

export function validateBurden(input) {
  return burdenSchema.safeParse(input);
}

export function validatePartialBurden(input) {
  return burdenSchema.partial().safeParse(input);
}
