import { z } from 'zod';

const positionSchema = z.object({
  parentId: z.number().nullable().optional(),
  code: z.string().toUpperCase(),
  name: z.string().max(50).min(3),
});

export function validatePosition(input) {
  return positionSchema.safeParse(input);
}

export function validatePartialPosition(input) {
  return positionSchema.partial().safeParse(input);
}
