import { z } from 'zod';
import { RUT } from '../config/regexp.js';

const afpSchema = z.object({
  code: z.string().max(10),
  rut: z.string().regex(RUT),
  name: z.string().max(50),
  dependentRate: z.number(),
  independentRate: z.number(),
  sisRate: z.number(),
  since: z.date().optional(),
  until: z.date().optional(),
});

export function validateAfp(input) {
  return afpSchema.safeParse(input);
}

export function validatePartialAfp(input) {
  return afpSchema.partial().safeParse(input);
}
