// Calcular el dígito verificador
export function checkDigit(T) {
  let M = 0;
  let S = 1;

  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : 'k';
}
