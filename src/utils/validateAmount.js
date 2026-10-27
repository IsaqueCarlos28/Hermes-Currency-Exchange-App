export function validateAmount(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Informe um valor maior que zero.' };
  }

  const normalized = String(amount).replace(',', '.');
  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) {
    return { valid: false, error: 'Digite um número válido.' };
  }

  if (parsed <= 0) {
    return { valid: false, error: 'Informe um valor maior que zero.' };
  }

  return { valid: true, value: parsed };
}

export default validateAmount;
