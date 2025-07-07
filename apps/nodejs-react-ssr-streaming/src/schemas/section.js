import { z } from 'zod';

const sectionSchema = z.object({
  active: z.boolean(),
});

export function validateSection(input) {
  return sectionSchema.safeParse(input);
}

export function validatePartialSection(input) {
  return sectionSchema.partial().safeParse(input);
}
