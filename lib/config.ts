import { MantineColor } from '@mantine/core';

export const YEAR = 2024;
export const NEXT_YEAR = YEAR + 1;

export const APP_URL = 'https://taxepfa.github.io';
export const APP_NAME = `Taxe PFA în ${YEAR}`;
export const AUTHOR_NAME = 'Ionuț-Cristian Florescu';
export const AUTHOR_URL = 'https://github.com/icflorescu';
export const REPO_URL = 'https://github.com/taxepfa/taxepfa.github.io';
export const LICENSE_URL = 'https://github.com/taxepfa/taxepfa.github.io/blob/main/LICENSE';

export const WEEKS_PER_YEAR = 52.1429;
export const WEEKS_PER_MONTH = 4.34524;

export const PENSION_PERCENTAGE = 0.25;
export const HEALTH_PERCENTAGE = 0.1;
export const PERSONAL_DEDUCTIBLE = 0.2;
export const INCOME_TAX_PERCENTAGE = 0.1;
export const WAGE_COMPANY_TAX_PERCENTAGE = 0.0225;
export const BASE_CURRENCY = 'RON';
export const CURRENCIES = [BASE_CURRENCY, 'EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD'];
export const EXCHANGE_RATES_RELOAD_INTERVAL = 3_600_000;

export type IncomeInterval = 'hourly' | 'daily' | 'monthly' | 'yearly';
export type DeductibleExpensesInterval = 'monthly' | 'yearly';

export const INCOME_INTERVALS: {
  value: IncomeInterval;
  label: string;
}[] = [
  { value: 'hourly', label: 'pe oră' },
  { value: 'daily', label: 'pe zi' },
  { value: 'monthly', label: 'pe lună' },
  { value: 'yearly', label: 'pe tot anul' },
];

export const DEDUCTIBLE_EXPENSES_INTERVALS = INCOME_INTERVALS.filter(
  (i) => i.value !== 'hourly' && i.value !== 'daily'
) as {
  value: DeductibleExpensesInterval;
  label: string;
}[];

export const STANDARD_FORMATTER = new Intl.NumberFormat('ro-RO', {
  maximumFractionDigits: 0,
});

export const DECIMAL_FORMATTER = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const EXCHANGE_RATE_FORMATTER = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

export const TAXES = ['healthTaxPercentage', 'pensionTaxPercentage', 'incomeTaxPercentage'] as const;

export const TAX_NAMES = {
  healthTaxPercentage: 'CASS',
  pensionTaxPercentage: 'CAS',
  incomeTaxPercentage: 'Imp. pe venit',
} as const;

export const TAX_CHART_COLORS: Record<string, MantineColor> = {
  healthTaxPercentage: 'pink',
  pensionTaxPercentage: 'grape',
  incomeTaxPercentage: 'orange',
} as const;

export const LOCAL_STORAGE_STATE_KEY = 'state';

export const CHART_STEPS = 50;
