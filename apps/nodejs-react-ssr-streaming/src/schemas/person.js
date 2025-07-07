import { z } from 'zod';
import { PATTERNS } from '@/utils/regexp';
import { validateDV } from '@/utils/validate-dv';

export const personSchema = z.object({
  rut: z.string().regex(PATTERNS.RUT, 'Formato no válido').refine(validateDV, 'RUT no válido'),
  firstName: z.string().max(50),
  firstSurname: z.string().max(50),
  secondSurname: z.string().max(50),
  address: z.string().max(50),
  communeId: z.number().int(),
  phone: z.string().regex(PATTERNS.PHONE, 'Formato no válido').optional(),
  cellphone: z.string().regex(PATTERNS.CELLPHONE, 'Formato no válido').optional(),
  email: z.string().email('Email no válido').min(6, 'Mínimo 6 caracteres').optional(),
  birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'La fecha de nacimiento no es válida',
  }),
  nationality: z.enum(['chilena', 'extranjero']),
  sex: z.enum(['M', 'F']),
  civilStatus: z.enum(['Soltero', 'Casado', 'Viudo', 'Separado', 'Divorciado']),
  active: z.boolean().optional(),
});

export const personActiveSchema = z.object({
  rut: z.string().regex(PATTERNS.RUT, 'Formato no válido').refine(validateDV, 'RUT no válido'),
  firstName: z.string().max(50),
  firstSurname: z.string().max(50),
  secondSurname: z.string().max(50),
  active: z.boolean().optional(),
});

export function validatePerson(input) {
  return personSchema.safeParse(input);
}

export function validatePartialPerson(input) {
  return personSchema.partial().safeParse(input);
}
