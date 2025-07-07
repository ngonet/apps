import { z } from 'zod';

const brpSchema = z.object({
  year: z.date(),
  maxHours: z.number().int(),
  titleCareer: z.number().int(),
  mentionCareer: z.number().int(),
  title: z.number().int(),
  mention: z.number().int(),
});

export function validateBrp(input) {
  return brpSchema.safeParse(input);
}

export function validatePartialBrp(input) {
  return brpSchema.partial().safeParse(input);
}
