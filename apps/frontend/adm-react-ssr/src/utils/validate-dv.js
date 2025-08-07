// Function to validate Chilean RUT
export const validateDV = (rut) => {
  // Remove dots and hyphens, and convert to uppercase
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Split the RUT and verification digit
  const body = rut.slice(0, -1);
  const dv = rut.slice(-1);

  // Validate that the body is a number and the verification digit is a number or 'K'
  if (!/^\d+$/.test(body) || !/^[\dK]$/.test(dv)) {
    return false;
  }

  // Calculate the expected verification digit
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i)) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const dvExpected = 11 - (sum % 11);
  const dvCalculated = dvExpected === 11 ? '0' : dvExpected === 10 ? 'K' : dvExpected.toString();

  // Compare the calculated digit with the provided digit
  return dvCalculated === dv;
};
