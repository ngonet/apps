import { z } from 'zod';

const remunerationSalarySchema = z.object({
  remunerationId: z.string().uuid(),
  salaryId: z.number().int(),
  value: z.number(),
  since: z.date().optional(),
  until: z.date().optional(),
});

export function validateRemunerationSalary(input) {
  return remunerationSalarySchema.safeParse(input);
}

export function validatePartialRemunerationSalary(input) {
  return remunerationSalarySchema.partial().safeParse(input);
}
