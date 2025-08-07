import { z } from 'zod';
import { RUT, PHONE } from '../config/regexp.js';
import { validateDV } from '../utils/validate-dv.js';

const companySchema = z.object({
  rut: z.string().regex(RUT).refine(validateDV),
  name: z.string().max(50),
  address: z.string().max(50),
  communeId: z.number().int(),
  phone: z.string().regex(PHONE).optional(),
  email: z.string().email().optional(),
});

export function validateCompany(input) {
  return companySchema.safeParse(input);
}

export function validatePartialCompany(input) {
  return companySchema.partial().safeParse(input);
}
