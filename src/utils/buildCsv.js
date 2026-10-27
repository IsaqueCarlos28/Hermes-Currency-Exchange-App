function escapeCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function buildCsv(rows = [], headers = []) {
  const headerLine = headers.map(escapeCell).join(';');
  const lines = rows.map((row) => {
    const values = Array.isArray(row) ? row : Object.values(row);
    return values.map(escapeCell).join(';');
  });
  return [headerLine, ...lines].join('\r\n');
}

export default buildCsv;
