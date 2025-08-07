import { z } from 'zod';

const remunerationSchema = z.object({
  date: z.date(),
  documentId: z.string().uuid(),
  days: z.number().int().min(1).max(45),
  extraHours: z.number().optional(),
  netPayment: z.number().int().optional(),
  taxable: z.number().int().optional(),
  tributory: z.number().int().optional(),
});

export function validateRemuneration(input) {
  return remunerationSchema.safeParse(input);
}

export function validatePartialRemuneration(input) {
  return remunerationSchema.partial().safeParse(input);
}
