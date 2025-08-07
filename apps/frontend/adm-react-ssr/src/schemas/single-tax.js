import { z } from 'zod';

const singleTaxSchema = z.object({
  date: z.date(),
  rentSince: z.number(),
  rentUntil: z.number().optional(),
  factor: z.number(),
  discount: z.number(),
  rate: z.number().optional(),
});

export function validateSingleTax(input) {
  return singleTaxSchema.safeParse(input);
}

export function validatePartialSingleTax(input) {
  return singleTaxSchema.partial().safeParse(input);
}
