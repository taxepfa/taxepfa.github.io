import { BASE_CURRENCY, HEALTH_PERCENTAGE, PENSION_PERCENTAGE } from './config';
import { ExchangeRates, useExchangeRates } from './exchangeRates';
import { store } from './store';

type CalculatorSnapshot = (typeof store)['calculator'];
type ChartSnapshot = (typeof store)['chart'];
type CommonSnapshot = (typeof store)['common'];
type SettingsSnapshot = (typeof store)['settings'];

export function computeTaxes({
  calculatorSnapshot: { income, incomeCurrency, incomeInterval },
  commonSnapshot: { deductibleExpenses, deductibleExpensesCurrency, deductibleExpensesInterval, unpaidVacationDays },
  settingsSnapshot: { minimumWage, workingDaysPerMonth, workingHoursPerDay },
  exchangeRates,
}: {
  calculatorSnapshot: CalculatorSnapshot;
  commonSnapshot: CommonSnapshot;
  settingsSnapshot: SettingsSnapshot;
  exchangeRates: ExchangeRates | undefined;
}) {
  unpaidVacationDays = Math.min(unpaidVacationDays || 0, (workingDaysPerMonth || 0) * 12);
  deductibleExpenses = deductibleExpenses || 0;

  if (
    !exchangeRates ||
    income === null ||
    minimumWage === null ||
    workingDaysPerMonth === null ||
    workingHoursPerDay === null
  ) {
    return;
  }

  let totalIncome = income;
  if (incomeInterval === 'hourly') {
    totalIncome *= workingDaysPerMonth * workingHoursPerDay * 12 - unpaidVacationDays * workingHoursPerDay;
  } else if (incomeInterval === 'daily') {
    totalIncome *= workingDaysPerMonth * 12 - unpaidVacationDays;
  } else if (incomeInterval === 'monthly') {
    totalIncome *= 12 - unpaidVacationDays / workingDaysPerMonth;
  }

  if (incomeCurrency !== BASE_CURRENCY) {
    totalIncome *= exchangeRates[incomeCurrency];
  }

  let pensionTaxAmount = 0;
  if (totalIncome >= minimumWage * 24) {
    pensionTaxAmount = minimumWage * 24 * PENSION_PERCENTAGE;
  } else if (totalIncome >= minimumWage * 12) {
    pensionTaxAmount = minimumWage * 12 * PENSION_PERCENTAGE;
  }

  const pensionTaxPercentage = totalIncome === 0 ? 0 : (pensionTaxAmount / totalIncome) * 100;

  let healthTaxAmount = 0;
  if (totalIncome >= minimumWage * 60) {
    healthTaxAmount = minimumWage * 60 * HEALTH_PERCENTAGE;
  } else if (totalIncome >= minimumWage * 6) {
    healthTaxAmount = totalIncome * HEALTH_PERCENTAGE;
  } else {
    healthTaxAmount = minimumWage * 6 * HEALTH_PERCENTAGE;
  }
  const healthTaxPercentage = (healthTaxAmount / totalIncome) * 100;

  let totalDeductibleExpenses = deductibleExpenses;
  if (deductibleExpensesInterval === 'monthly') {
    totalDeductibleExpenses = deductibleExpenses * 12;
  }
  if (deductibleExpensesCurrency !== BASE_CURRENCY) {
    totalDeductibleExpenses *= exchangeRates[deductibleExpensesCurrency];
  }

  const taxableIncome = Math.max(totalIncome - pensionTaxAmount - healthTaxAmount - totalDeductibleExpenses, 0);

  const incomeTaxAmount = taxableIncome * 0.1;
  const incomeTaxPercentage = totalIncome === 0 ? 0 : (incomeTaxAmount / totalIncome) * 100;

  const totalTaxAmount = pensionTaxAmount + healthTaxAmount + incomeTaxAmount;
  const totalTaxPercentage = (totalTaxAmount / totalIncome) * 100;

  return {
    totalIncome,
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

export function useTaxesCalculator(params: {
  calculatorSnapshot: CalculatorSnapshot;
  commonSnapshot: CommonSnapshot;
  settingsSnapshot: SettingsSnapshot;
}) {
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();
  return {
    ...computeTaxes({ ...params, exchangeRates }),
    exchangeRates,
    exchangeRatesLoading,
  };
}

export function useTaxesChart({
  chartSnapshot: { incomeFrom, incomeTo, incomeCurrency, incomeInterval },
  commonSnapshot,
  settingsSnapshot,
}: {
  chartSnapshot: ChartSnapshot;
  commonSnapshot: CommonSnapshot;
  settingsSnapshot: SettingsSnapshot;
}) {
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();

  let data: {
    income: number;
    pensionTaxPercentage: number;
    healthTaxPercentage: number;
    incomeTaxPercentage: number;
  }[] = [];

  if (
    !exchangeRates ||
    incomeFrom === null ||
    incomeTo === null ||
    settingsSnapshot.minimumWage === null ||
    settingsSnapshot.workingDaysPerMonth === null ||
    settingsSnapshot.workingHoursPerDay === null
  ) {
    return {
      data,
      exchangeRates,
      exchangeRatesLoading,
    };
  }

  for (let i = incomeFrom; i <= incomeTo; i += (incomeTo - incomeFrom) / 50) {
    const { pensionTaxPercentage, healthTaxPercentage, incomeTaxPercentage } = computeTaxes({
      calculatorSnapshot: { income: i === 0 ? 0.1 : i, incomeCurrency, incomeInterval },
      commonSnapshot,
      settingsSnapshot,
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
    exchangeRates,
    exchangeRatesLoading,
  };
}
