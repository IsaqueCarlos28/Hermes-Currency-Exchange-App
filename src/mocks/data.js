import {
  normalizeCurrencies,
  normalizeHistoricalRates,
  normalizeLatestRate,
} from '../services/frankfurterAdapters';

/*
 * Dados mock no formato bruto da Frankfurter (v2).
 * Passam pelos mesmos adaptadores da API para que a troca por `fetch`
 * não mude o formato consumido pelos componentes.
 */

const MOCK_CURRENCIES_RESPONSE = [
  {
    iso_code: 'USD',
    iso_numeric: '840',
    name: 'US Dollar',
    symbol: '$',
    start_date: '1999-01-04',
    end_date: '2026-10-27',
  },
  {
    iso_code: 'BRL',
    iso_numeric: '986',
    name: 'Brazilian Real',
    symbol: 'R$',
    start_date: '1994-07-01',
    end_date: '2026-10-27',
  },
  {
    iso_code: 'EUR',
    iso_numeric: '978',
    name: 'Euro',
    symbol: '€',
    start_date: '1999-01-01',
    end_date: '2026-10-27',
  },
  {
    iso_code: 'GBP',
    iso_numeric: '826',
    name: 'British Pound',
    symbol: '£',
    start_date: '1999-01-04',
    end_date: '2026-10-27',
  },
  {
    iso_code: 'JPY',
    iso_numeric: '392',
    name: 'Japanese Yen',
    symbol: '¥',
    start_date: '1999-01-04',
    end_date: '2026-10-27',
  },
];

const MOCK_LATEST_RATE_RESPONSE = {
  date: '2026-10-27',
  base: 'USD',
  quote: 'BRL',
  rate: 5.4218,
};

const MOCK_HISTORICAL_RATES_RESPONSE = [
  { date: '2026-10-27', base: 'USD', quote: 'BRL', rate: 5.4218 },
  { date: '2026-10-26', base: 'USD', quote: 'BRL', rate: 5.4102 },
  { date: '2026-10-23', base: 'USD', quote: 'BRL', rate: 5.3987 },
  { date: '2026-10-22', base: 'USD', quote: 'BRL', rate: 5.431 },
  { date: '2026-10-21', base: 'USD', quote: 'BRL', rate: 5.4156 },
  { date: '2026-10-20', base: 'USD', quote: 'BRL', rate: 5.3874 },
  { date: '2026-10-19', base: 'USD', quote: 'BRL', rate: 5.3791 },
  { date: '2026-10-16', base: 'USD', quote: 'BRL', rate: 5.3842 },
  { date: '2026-10-15', base: 'USD', quote: 'BRL', rate: 5.3908 },
  { date: '2026-10-14', base: 'USD', quote: 'BRL', rate: 5.3765 },
  { date: '2026-10-13', base: 'USD', quote: 'BRL', rate: 5.3981 },
  { date: '2026-10-12', base: 'USD', quote: 'BRL', rate: 5.4057 },
  { date: '2026-10-09', base: 'USD', quote: 'BRL', rate: 5.3962 },
  { date: '2026-10-08', base: 'USD', quote: 'BRL', rate: 5.3814 },
  { date: '2026-10-07', base: 'USD', quote: 'BRL', rate: 5.3859 },
  { date: '2026-10-06', base: 'USD', quote: 'BRL', rate: 5.3902 },
  { date: '2026-10-05', base: 'USD', quote: 'BRL', rate: 5.3748 },
  { date: '2026-10-02', base: 'USD', quote: 'BRL', rate: 5.3681 },
  { date: '2026-10-01', base: 'USD', quote: 'BRL', rate: 5.3726 },
  { date: '2026-09-30', base: 'USD', quote: 'BRL', rate: 5.3604 },
  { date: '2026-09-29', base: 'USD', quote: 'BRL', rate: 5.3558 },
];

export const MOCK_CURRENCIES = normalizeCurrencies(MOCK_CURRENCIES_RESPONSE);
export const MOCK_LATEST_RATE = normalizeLatestRate(MOCK_LATEST_RATE_RESPONSE);
export const MOCK_HISTORICAL_RATES = normalizeHistoricalRates(
  MOCK_HISTORICAL_RATES_RESPONSE,
);

export {
  MOCK_CURRENCIES_RESPONSE,
  MOCK_HISTORICAL_RATES_RESPONSE,
  MOCK_LATEST_RATE_RESPONSE,
};

export default {
  currencies: MOCK_CURRENCIES,
  latestRate: MOCK_LATEST_RATE,
  historicalRates: MOCK_HISTORICAL_RATES,
};
