import { z } from 'zod';
import { PATTERNS } from '@/utils/regexp';
import { validateDV } from '@/utils/validate-dv';

export const companySchema = z.object({
  rut: z.string().regex(PATTERNS.RUT, 'Formato no válido').refine(validateDV, 'RUT no válido'),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  address: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  communeId: z.number().int('Debe ser un número entero'),
  phone: z.string().regex(PATTERNS.PHONE, 'Formato no válido').optional(),
  email: z.string().email('Email no válido').min(6, 'Mínimo 6 caracteres').optional(),
});
