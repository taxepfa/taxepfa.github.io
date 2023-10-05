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
  const grossIncome = income;

  if (deductibleExpensesInterval === 'monthly') deductibleExpenses *= 12;

  // convert deductible expenses to base currency if needed
  if (deductibleExpensesCurrency !== BASE_CURRENCY) deductibleExpenses *= exchangeRates![deductibleExpensesCurrency];

  // subtract deductible expenses from the income
  income -= deductibleExpenses;

  // calculate the pension tax amount (CAS) and percentage of the gross income
  let pensionTaxAmount = 0;
  if (income >= minimumWage * 24) pensionTaxAmount = minimumWage * 24 * PENSION_PERCENTAGE;
  else if (income >= minimumWage * 12) pensionTaxAmount = minimumWage * 12 * PENSION_PERCENTAGE;
  const pensionTaxPercentage = grossIncome === 0 ? 0 : (pensionTaxAmount / grossIncome) * 100;

  // calculate the health tax amount (CASS) and percentage of the gross income
  let healthTaxAmount = 0;
  if (income >= minimumWage * 60) healthTaxAmount = minimumWage * 60 * HEALTH_PERCENTAGE;
  else if (income >= minimumWage * 6) healthTaxAmount = income * HEALTH_PERCENTAGE;
  else healthTaxAmount = minimumWage * 6 * HEALTH_PERCENTAGE;
  const healthTaxPercentage = (healthTaxAmount / grossIncome) * 100;

  // calculate the taxable income and make sure it's not negative
  const taxableIncome = Math.max(income - pensionTaxAmount - healthTaxAmount - deductibleExpenses, 0);

  // calculate the income tax amount and percentage of the gross income
  const incomeTaxAmount = taxableIncome * INCOME_TAX_PERCENTAGE;
  const incomeTaxPercentage = grossIncome === 0 ? 0 : (incomeTaxAmount / grossIncome) * 100;

  // calculate the total tax amount and percentage of the gross income
  const totalTaxAmount = pensionTaxAmount + healthTaxAmount + incomeTaxAmount;
  const totalTaxPercentage = (totalTaxAmount / grossIncome) * 100;

  // calculate the net income in user-selected currency, per user-selected interval
  let netIncome = grossIncome - totalTaxAmount;
  if (incomeCurrency !== BASE_CURRENCY) netIncome /= exchangeRates![incomeCurrency];
  if (incomeInterval === 'hourly') netIncome /= workingHoursPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'daily') netIncome /= workingDaysPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
  else if (incomeInterval === 'monthly') netIncome /= 12 - vacationWeeksPerYear / WEEKS_PER_MONTH;

  return {
    grossIncome,
    grossIncomeOverVATThreshold: grossIncome > vatThreshold,
    netIncome,
    totalTaxAmount,
    totalTaxPercentage,
    pensionTaxAmount,
    pensionTaxPercentage,
    healthTaxAmount,
    healthTaxPercentage,
    incomeTaxAmount,
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
};

export function useTaxesChart({ income, ...otherParams }: State) {
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();

  let data: ChartDataPoint[] = [];

  if (!exchangeRates || income === 0) return;

  const incomeTo = income * 2;
  const step = incomeTo / CHART_STEPS;

  for (let i = 0; i <= incomeTo; i += step) {
    const { pensionTaxPercentage, healthTaxPercentage, incomeTaxPercentage } = calculateTaxes({
      income: i === 0 ? 0.1 : i,
      ...otherParams,
      exchangeRates,
    })!;

    data.push({
      income: i,
      pensionTaxPercentage,
      healthTaxPercentage,
      incomeTaxPercentage,
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
