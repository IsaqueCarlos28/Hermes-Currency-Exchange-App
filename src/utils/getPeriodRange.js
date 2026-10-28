const PERIOD_DAYS = {
  '7D': 7,
  '15D': 15,
  '30D': 30,
  '3M': 90,
  '6M': 180,
  '1A': 365,
  '5A': 1825,
  '10A': 3650,
};

export function getPeriodRange(period = '30D') {
  const days = PERIOD_DAYS[period] ?? PERIOD_DAYS['30D'];
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - days);

  const toIso = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`;

  return {
    startDate: toIso(start),
    endDate: toIso(end),
  };
}

export default getPeriodRange;
