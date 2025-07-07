import { z } from 'zod';

const provisionalIndicatorSchema = z.object({
  active: z.boolean(),
});

export function validateProvisionalIndicator(input) {
  return provisionalIndicatorSchema.safeParse(input);
}

export function validatePartialProvisionalIndicator(input) {
  return provisionalIndicatorSchema.partial().safeParse(input);
}
