import { z } from 'zod';

const discountSchema = z.object({
  code: z.string().length(3).toUpperCase(),
  name: z.string().max(50),
  legal: z.boolean().optional(),
  proportional: z.boolean().optional(),
});

export function validateDiscount(input) {
  return discountSchema.safeParse(input);
}

export function validatePartialDiscount(input) {
  return discountSchema.partial().safeParse(input);
}
