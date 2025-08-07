// Input masks for @mona-health/react-input-mask
export const MASKS = {
  RUT: '99.999.999-9',
  PHONE: '+56 99 9999 9999',
  CELLPHONE: '+56 9 9999 9999',
};

// Validation patterns for zod schemas
export const PATTERNS = {
  RBD: /^\d{1,6}-[\dKk]$/,
  RUT: /^\d{1,2}\.\d{3}\.\d{3}-[\dKk]$/,
  PHONE: /^(\+56) ([2-9]{1}) ([0-9]{4}) ([0-9]{4})$/,
  CELLPHONE: /^(\+56) (9) ([0-9]{4}) ([0-9]{4})$/,
};
