import { optional, z } from 'zod';

const discountRemunerationSchema = z.object({
  remunerationId: z.string().uuid(),
  discountId: z.number().int(),
  value: z.number(),
  since: z.date().optional(),
  until: z.date().optional(),
});

export function validateDiscountRemuneration(input) {
  return discountRemunerationSchema.safeParse(input);
}

export function validatePartialDiscountRemuneration(input) {
  return discountRemunerationSchema.partial().safeParse(input);
}
