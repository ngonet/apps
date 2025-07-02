import { z } from 'zod';

const documentSchema = z.object({
  parentId: z.string().uuid().optional(),
  status: z.boolean().optional(),
  documentTypeId: z.number().int(),
  date: z.date(),
  endDate: z.date().optional(),
  schoolId: z.string().uuid(),
  personId: z.string().uuid(),
  salary: z.number().int().optional(),
  hours: z.number(),
});

export function validateDocument(input) {
  return documentSchema.safeParse(input);
}

export function validatePartialDocument(input) {
  return documentSchema.partial().safeParse(input);
}
