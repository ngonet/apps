import { z } from 'zod';

const documentPositionSchema = z.object({
  documentId: z.string().uuid(),
  positionId: z.number().int(),
});

export function validateDocumentPosition(input) {
  return documentPositionSchema.safeParse(input);
}

export function validatePartialDocumentPosition(input) {
  return documentPositionSchema.partial().safeParse(input);
}
