import { z } from 'zod';

const documentSubventionSchema = z.object({
  documentId: z.string().uuid(),
  subventionId: z.number().int(),
  hours: z.number(),
});

export function validateDocumentSubvention(input) {
  return documentSubventionSchema.safeParse(input);
}

export function validatePartialDocumentSubvention(input) {
  return documentSubventionSchema.partial().safeParse(input);
}
