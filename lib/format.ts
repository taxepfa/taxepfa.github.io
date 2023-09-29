import { BASE_CURRENCY, DECIMAL_FORMATTER, EXCHANGE_RATE_FORMATTER, STANDARD_FORMATTER } from './config';

export function formatAsInteger(amount: number | null | undefined) {
  return amount == null ? '…' : STANDARD_FORMATTER.format(amount);
}

export function formatAsDecimal(amount: number | null | undefined) {
  return amount == null ? '…' : DECIMAL_FORMATTER.format(amount);
}

export function formatAsBaseCurrency(amount: number | undefined) {
  return `${formatAsInteger(amount)} ${BASE_CURRENCY}`;
}

export function formatAsPercentage(amount: number | undefined) {
  return `${formatAsInteger(amount)}%`;
}

export function formatAsDecimalPercentage(amount: number) {
  return `${formatAsDecimal(amount)}%`;
}

export function formatExchangeRate({ value, currency }: { value: number | undefined; currency: string }) {
  return value == null ? '…' : `1 ${currency} = ${EXCHANGE_RATE_FORMATTER.format(value)} ${BASE_CURRENCY}`;
}
