import { z } from 'zod';

const bienniumSchema = z.object({
  biennium: z.number().int().min(1).max(15),
  rate: z.number(),
});

export function validateBiennium(input) {
  return bienniumSchema.safeParse(input);
}

export function validatePartialBiennium(input) {
  return bienniumSchema.partial().safeParse(input);
}
