import { z } from 'zod';

const communeSchema = z.object({});

export function validateCommune(input) {
  return communeSchema.safeParse(input);
}

export function validatePartialCommune(input) {
  return communeSchema.partial().safeParse(input);
}
