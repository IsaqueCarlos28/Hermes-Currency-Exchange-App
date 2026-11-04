export function convertAmount(amount, rate) {
  if (amount === null || amount === undefined || rate === null || rate === undefined) {
    return null;
  }

  const amountText = String(amount).trim();
  if (!amountText || String(rate).trim() === '') return null;

  const num = Number(amountText.replace(',', '.'));
  const parsedRate = Number(rate);
  if (!Number.isFinite(num) || !Number.isFinite(parsedRate)) return null;

  return num * parsedRate;
}

export default convertAmount;
