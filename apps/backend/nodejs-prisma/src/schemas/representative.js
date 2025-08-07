import { z } from 'zod';
import { RUT, PHONE, CELLPHONE } from '../config/regexp.js';
import { validateDV } from '../utils/validate-dv.js';

const representativeSchema = z.object({
  companyId: z.string().uuid(),
  rut: z.string().regex(RUT).refine(validateDV),
  firstName: z.string().max(50),
  firstSurname: z.string().max(50),
  secondSurname: z.string().max(50),
  phone: z.string().regex(PHONE).nullable().optional(),
  cellphone: z.string().regex(CELLPHONE).nullable().optional(),
  email: z.string().email().optional(),
});

export function validateRepresentative(input) {
  return representativeSchema.safeParse(input);
}

export function validatePartialRepresentative(input) {
  return representativeSchema.partial().safeParse(input);
}
