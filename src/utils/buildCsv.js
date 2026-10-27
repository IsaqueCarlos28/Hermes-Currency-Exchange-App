export function buildCsv(rows = [], headers = []) {
  const headerLine = headers.join(',');
  const lines = rows.map((r) => Object.values(r).join(','));
  return [headerLine, ...lines].join('\n');
}

export default buildCsv;
