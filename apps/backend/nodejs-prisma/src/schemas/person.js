import { z } from 'zod';
import { RUT, PHONE, CELLPHONE } from '../config/regexp.js';

const personSchema = z.object({
  rut: z.string().regex(RUT),
  firstName: z.string().max(50),
  firstSurname: z.string().max(50),
  secondSurname: z.string().max(50),
  address: z.string().max(50),
  communeId: z.number().int(),
  phone: z.string().regex(PHONE).optional(),
  cellphone: z.string().regex(CELLPHONE).optional(),
  email: z.string().email().optional(),
  birthdate: z.date(),
  nationality: z.enum(['chilena', 'extranjero']),
  sex: z.enum(['M', 'F']),
  civilStatus: z.enum(['Soltero', 'Casado', 'Viudo', 'Separado', 'Divorciado']),
  active: z.boolean().optional(),
});

export function validatePerson(input) {
  return personSchema.safeParse(input);
}

export function validatePartialPerson(input) {
  return personSchema.partial().safeParse(input);
}
