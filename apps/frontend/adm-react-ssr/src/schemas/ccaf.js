import { z } from 'zod';
import { RUT } from '../config/regexp.js';

const ccafSchema = z.object({
  code: z.string().max(2),
  rut: z.string().regex(RUT),
  name: z.string().max(50),
  website: z.string().url(),
  rateCcaf: z.number(),
  rateFonasa: z.number(),
});

export function validateCcaf(input) {
  return ccafSchema.safeParse(input);
}

export function validatePartialCcaf(input) {
  return ccafSchema.partial().safeParse(input);
}
