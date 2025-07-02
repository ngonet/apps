// Validation patterns for zod schemas
export const {
  RBD = /^\d{1,6}-[\dKk]$/,
  RUT = /^\d{7,8}-[\dKk]$/,
  PHONE = /^(\+56)([0-9]{9})$/,
  CELLPHONE = /^(\+569)([0-9]{8})$/,
} = RegExp;
