import { z } from 'zod';

const familyAllowanceSchema = z.object({
  section: z.string().max(1),
  amount: z.number().int(),
  rentUntil: z.number().int(),
  rentSince: z.number().int(),
  rentUntil: z.number().int(),
  dateSince: z.date(),
  dateUntil: z.date(),
});

export function validateFamilyAllowance(input) {
  return familyAllowanceSchema.safeParse(input);
}

export function validatePartialFamilyAllowance(input) {
  return familyAllowanceSchema.partial().safeParse(input);
}
