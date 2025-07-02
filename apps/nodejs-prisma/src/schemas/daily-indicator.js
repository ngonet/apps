import { z } from 'zod';

const dailyIndicatorSchema = z.object({
  date: z.date(),
  uf: z.number(),
  utm: z.number().int(),
});

export function validateDailyIndicator(input) {
  return dailyIndicatorSchema.safeParse(input);
}

export function validatePartialDailyIndicator(input) {
  return dailyIndicatorSchema.partial().safeParse(input);
}
