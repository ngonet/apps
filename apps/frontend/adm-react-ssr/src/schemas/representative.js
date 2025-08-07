import { z } from 'zod';
import { PATTERNS } from '@/utils/regexp';
import { validateDV } from '@/utils/validate-dv';

export const representativeSchema = z.object({
  companyId: z.string().uuid().optional(),
  rut: z.string().regex(PATTERNS.RUT, 'Formato no válido').refine(validateDV, 'RUT no válido'),
  firstName: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  firstSurname: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  secondSurname: z.string().max(50, 'Máximo 50 caracteres').optional(),
  phone: z.string().regex(PATTERNS.PHONE, 'Formato no válido').nullable().optional(),
  cellphone: z.string().regex(PATTERNS.CELLPHONE, 'Formato no válido').nullable().optional(),
  email: z.string().email('Email no válido').min(6, 'Mínimo 6 caracteres').optional(),
});
