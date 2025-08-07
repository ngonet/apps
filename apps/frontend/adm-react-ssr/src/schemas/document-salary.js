import { z } from 'zod';

const documentSalarySchema = z.object({
  documentId: z.string().uuid(),
  salaryId: z.number().int(),
  value: z.number(),
  since: z.date(),
  until: z.date(),
});

export function validateDocumentSalary(input) {
  return documentSalarySchema.safeParse(input);
}

export function validatePartialDocumentSalary(input) {
  return documentSalarySchema.partial().safeParse(input);
}
