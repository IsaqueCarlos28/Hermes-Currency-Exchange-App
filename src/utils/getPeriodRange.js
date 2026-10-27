export function getPeriodRange(period) {
  // Placeholder - return start and end dates
  const end = new Date();
  const start = new Date(end);
  // Simplified
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

export default getPeriodRange;
