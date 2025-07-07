import { z } from 'zod';
import { RUT } from '../config/regexp.js';

const healthSchema = z.object({
  code: z.string(),
  rut: z.string().regex(RUT),
  name: z.string().max(50),
  rate: z.number().optional(),
});

export function validateHealth(input) {
  return healthSchema.safeParse(input);
}

export function validatePartialHealth(input) {
  return healthSchema.partial().safeParse(input);
}
