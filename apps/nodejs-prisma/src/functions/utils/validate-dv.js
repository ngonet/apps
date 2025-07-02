import { checkDigit } from './check-digit.js';

export function validateDV({ rut }) {
  const tmp = rut.split('-');
  const T = tmp[0];
  const dv = tmp[1];
  if (dv == 'K') dv = 'k';
  return checkDigit(T) == dv;
}
