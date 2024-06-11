import {
  BASE_CURRENCY,
  CHART_STEPS,
  HEALTH_PERCENTAGE,
  INCOME_TAX_PERCENTAGE,
  PENSION_PERCENTAGE,
  WEEKS_PER_MONTH,
  WEEKS_PER_YEAR,
} from './config';
import { ExchangeRates, useExchangeRates } from './exchangeRates';
import { State } from './state';

export function calculateTaxes({
  income,
  incomeCurrency,
  incomeInterval,
  deductibleExpenses,
  deductibleExpensesCurrency,
  deductibleExpensesInterval,
  workingHoursPerWeek,
  workingDaysPerWeek,
  vacationWeeksPerYear,
  minimumWage,
  vatThreshold,
  exchangeRates,
}: State & { exchangeRates: ExchangeRates | undefined }) {
  if (
    (incomeCurrency !== BASE_CURRENCY && !exchangeRates) ||
    (deductibleExpensesCurrency !== BASE_CURRENCY && !exchangeRates)
  )
    return;

  // subtract vacation time and adjust the income accordingly
  if (incomeInterval === 'hourly') income *= workingHoursPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'daily') income *= workingDaysPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'monthly') income *= 12 - vacationWeeksPerYear / WEEKS_PER_MONTH;

  // people could accidentally input too many vacation weeks, so we need to make sure the income is not negative
  income = Math.max(income, 0);

  // convert income to base currency if needed
  if (incomeCurrency !== BASE_CURRENCY) income *= exchangeRates![incomeCurrency];

  // save the gross income to return it later
  const grossIncomeInBaseCurrency = income;

  if (deductibleExpensesInterval === 'monthly') deductibleExpenses *= 12;

  // convert deductible expenses to base currency if needed
  if (deductibleExpensesCurrency !== BASE_CURRENCY) deductibleExpenses *= exchangeRates![deductibleExpensesCurrency];

  // subtract deductible expenses from the income
  income -= deductibleExpenses;

  // calculate the pension tax amount (CAS) and percentage of the gross income
  let pensionTaxAmountInBaseCurrency = 0;
  if (income >= minimumWage * 24) pensionTaxAmountInBaseCurrency = minimumWage * 24 * PENSION_PERCENTAGE;
  else if (income >= minimumWage * 12) pensionTaxAmountInBaseCurrency = minimumWage * 12 * PENSION_PERCENTAGE;
  const pensionTaxPercentage =
    grossIncomeInBaseCurrency === 0 ? 0 : (pensionTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

  // calculate the health tax amount (CASS) and percentage of the gross income
  let healthTaxAmountInBaseCurrency = 0;
  if (income >= minimumWage * 60) healthTaxAmountInBaseCurrency = minimumWage * 60 * HEALTH_PERCENTAGE;
  else if (income >= minimumWage * 6) healthTaxAmountInBaseCurrency = income * HEALTH_PERCENTAGE;
  else healthTaxAmountInBaseCurrency = minimumWage * 6 * HEALTH_PERCENTAGE;
  const healthTaxPercentage = (healthTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

  // calculate the taxable income and make sure it's not negative
  const taxableIncome = Math.max(
    income - pensionTaxAmountInBaseCurrency - healthTaxAmountInBaseCurrency,
    0
  );

  // calculate the income tax amount and percentage of the gross income
  const incomeTaxAmountInBaseCurrency = taxableIncome * INCOME_TAX_PERCENTAGE;
  const incomeTaxPercentage =
    grossIncomeInBaseCurrency === 0 ? 0 : (incomeTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

  // calculate the total tax amount and percentage of the gross income
  const totalTaxAmountInBaseCurrency =
    pensionTaxAmountInBaseCurrency + healthTaxAmountInBaseCurrency + incomeTaxAmountInBaseCurrency;
  const totalTaxPercentage = (totalTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

  // calculate the total net income in base currency
  const totalNetIncomeInBaseCurrency = grossIncomeInBaseCurrency - totalTaxAmountInBaseCurrency;

  // convert the total net income to the income currency if needed and adjust it for the income interval
  let netIncome = totalNetIncomeInBaseCurrency;
  if (incomeCurrency !== BASE_CURRENCY) netIncome /= exchangeRates![incomeCurrency];
  if (incomeInterval === 'hourly') netIncome /= workingHoursPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'daily') netIncome /= workingDaysPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'monthly') netIncome /= 12 - vacationWeeksPerYear / WEEKS_PER_MONTH;

  return {
    grossIncomeInBaseCurrency,
    grossIncomeOverVATThreshold: grossIncomeInBaseCurrency > vatThreshold,
    totalNetIncomeInBaseCurrency,
    netIncome,
    totalTaxAmountInBaseCurrency,
    totalTaxPercentage,
    pensionTaxAmountInBaseCurrency,
    pensionTaxPercentage,
    healthTaxAmountInBaseCurrency,
    healthTaxPercentage,
    incomeTaxAmountInBaseCurrency,
    incomeTaxPercentage,
  };
}

export function useTaxesCalculator(params: State) {
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();
  return {
    ...calculateTaxes({ ...params, exchangeRates }),
    exchangeRates,
    exchangeRatesLoading,
  };
}

export type ChartDataPoint = {
  income: number;
  pensionTaxPercentage: number;
  healthTaxPercentage: number;
  incomeTaxPercentage: number;
  netIncome: number;
};

export function useTaxesChart({ income, ...otherParams }: State) {
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();

  const data: ChartDataPoint[] = [];

  if (!exchangeRates || income === 0) return;

  const incomeTo = income * 2;
  const step = incomeTo / CHART_STEPS;

  for (let i = 0; i <= incomeTo; i += step) {
    const { pensionTaxPercentage, healthTaxPercentage, incomeTaxPercentage, netIncome } = calculateTaxes({
      income: i === 0 ? 0.1 : i,
      ...otherParams,
      exchangeRates,
    })!;

    data.push({
      income: i,
      pensionTaxPercentage,
      healthTaxPercentage,
      incomeTaxPercentage,
      netIncome,
    });
  }

  return {
    data,
    ...calculateTaxes({
      income,
      ...otherParams,
      exchangeRates,
    }),
    exchangeRates,
    exchangeRatesLoading,
  };
}
