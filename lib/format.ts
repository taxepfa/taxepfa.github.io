import { BASE_CURRENCY, DECIMAL_FORMATTER, EXCHANGE_RATE_FORMATTER, STANDARD_FORMATTER } from './config';

export function formatAsInteger(amount: number) {
  return STANDARD_FORMATTER.format(amount);
}

export function formatAsDecimal(amount: number) {
  return DECIMAL_FORMATTER.format(amount);
}

export function safeFormatAsBaseCurrency(amount: number) {
  return isNaN(amount) ? '…' : `${formatAsInteger(amount)} ${BASE_CURRENCY}`;
}

export function formatAsPercentage(amount: number) {
  return `${formatAsInteger(amount)}%`;
}

export function formatAsDecimalPercentage(amount: number) {
  return `${formatAsDecimal(amount)}%`;
}

export function safeFormatAsPercentage(amount: number) {
  return isNaN(amount) ? '…' : formatAsPercentage(amount);
}

export function safeFormatExchangeRate({ value, currency }: { value: number; currency: string }) {
  return isNaN(value) ? '…' : `1 ${currency} = ${EXCHANGE_RATE_FORMATTER.format(value)} ${BASE_CURRENCY}`;
}
