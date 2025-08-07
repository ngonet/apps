import { z } from 'zod';
import { PATTERNS } from '@/utils/regexp';
import { validateDV } from '@/utils/validate-dv';

export const schoolSchema = z.object({
  rbd: z
    .string()
    .regex(PATTERNS.RBD, 'Formato no válido')
    .min(3, 'Mínimo 3 caracteres')
    .max(10, 'Máximo 10 caracteres')
    .refine(validateDV, 'RBD no válido'),
  name: z.string().min(3, 'Mínimo 3 caracteres').max(25, 'Máximo 25 caracteres'),
  address: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  communeId: z.number().int('Debe ser un número entero'),
  phone: z.string().regex(PATTERNS.PHONE, 'Formato no válido').optional(),
  email: z.string().email('Email no válido').min(6, 'Mínimo 6 caracteres').optional(),
  resolution: z.number().int('Debe ser un número entero').min(1, 'Debe ser mayor a 0'),
  dateResolution: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'La fecha de resolución no es válida',
    })
    .optional(),
  establishmentType: z.enum([
    'Municipal',
    'Particular Subvencionado',
    'Particular',
    'Admin. delegada',
  ]),
  logo: z.string().nullable().optional(),
  companyId: z.string().uuid('ID de empresa no válido').optional(),
  ccafId: z
    .number()
    .int('Debe ser un número entero')
    .min(1, 'Debe seleccionar una caja de compensación')
    .nullable()
    .optional(),
});
