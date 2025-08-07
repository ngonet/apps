import { z } from 'zod';

const salarySubventionSchema = z.object({
  salaryId: z.number().int(),
  subventionId: z.number().int(),
});

export function validateSalarySubvention(input) {
  return salarySubventionSchema.safeParse(input);
}

export function validatePartialSalarySubvention(input) {
  return salarySubventionSchema.partial().safeParse(input);
}
