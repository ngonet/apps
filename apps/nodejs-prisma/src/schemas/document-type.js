import { z } from 'zod';

const documentTypeSchema = z.object({
  name: z.string().max(25),
});

export function validateDocumentType(input) {
  return documentTypeSchema.safeParse(input);
}

export function validatePartialDocumentType(input) {
  return documentTypeSchema.partial().safeParse(input);
}
