const DEFAULT_MESSAGES = {
  required: 'Informe um valor maior que zero.',
  invalid: 'Digite um número válido.',
};

export function validateAmount(amount, messages = DEFAULT_MESSAGES) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: messages.required };
  }

  const trimmed = String(amount).trim();
  if (!trimmed) {
    return { valid: false, error: messages.required };
  }

  const parsed = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(parsed)) {
    return { valid: false, error: messages.invalid };
  }

  if (parsed <= 0) {
    return { valid: false, error: messages.required };
  }

  return { valid: true, value: parsed };
}

export { DEFAULT_MESSAGES };
export default validateAmount;
