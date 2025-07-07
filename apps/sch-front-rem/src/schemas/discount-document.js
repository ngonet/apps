import { z } from 'zod';

const discountDocumentSchema = z.object({
  active: z.boolean(),
});

export function validateDiscountDocument(input) {
  return discountDocumentSchema.safeParse(input);
}

export function validatePartialDiscountDocument(input) {
  return discountDocumentSchema.partial().safeParse(input);
}
