import { z } from 'zod';

const salarySchema = z.object({
  code: z.number().int(),
  name: z.string().max(50),
  taxable: z.boolean().optional(),
  proportional: z.boolean().optional(),
});

export function validateSalary(input) {
  return salarySchema.safeParse(input);
}

export function validatePartialSalary(input) {
  return salarySchema.partial().safeParse(input);
}
