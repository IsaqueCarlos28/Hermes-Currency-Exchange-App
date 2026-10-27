export function validateAmount(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Valor obrigatório' };
  }
  const normalized = String(amount).replace(',', '.');
  const num = Number(normalized);
  if (isNaN(num)) {
    return { valid: false, error: 'Valor inválido' };
  }
  if (num <= 0) {
    return { valid: false, error: 'Valor deve ser maior que zero' };
  }
  return { valid: true, value: num };
}

export default validateAmount;
