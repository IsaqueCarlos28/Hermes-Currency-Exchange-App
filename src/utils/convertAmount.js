export function convertAmount(amount, rate) {
  const num = Number(String(amount).replace(',', '.'));
  const r = Number(rate);
  if (isNaN(num) || isNaN(r)) return null;
  return num * r;
}

export default convertAmount;
