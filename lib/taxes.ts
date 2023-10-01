import { BASE_CURRENCY, HEALTH_PERCENTAGE, PENSION_PERCENTAGE } from './config';
import { ExchangeRates, useExchangeRates } from './exchangeRates';
import { state } from './state';

type CalculatorSnapshot = (typeof state)['calculator'];
type ChartSnapshot = (typeof state)['chart'];
type CommonSnapshot = (typeof state)['common'];
type SettingsSnapshot = (typeof state)['settings'];

export function computeTaxes({
  calculatorSnapshot: { income, incomeCurrency, incomeInterval },
  commonSnapshot: {
    deductibleExpenses,
    deductibleExpensesCurrency,
    deductibleExpensesInterval,
    unpaidTime,
    unpaidTimeUnits,
  },
  settingsSnapshot: { minimumWage, workingDaysPerMonth, workingDaysPerWeek, workingHoursPerDay },
  exchangeRates,
}: {
  calculatorSnapshot: CalculatorSnapshot;
  commonSnapshot: CommonSnapshot;
  settingsSnapshot: SettingsSnapshot;
  exchangeRates: ExchangeRates | undefined;
}) {
  unpaidTime = unpaidTime || 0;
  deductibleExpenses = deductibleExpenses || 0;

  if (
    income === 0 ||
    ((incomeCurrency !== BASE_CURRENCY || deductibleExpensesCurrency !== BASE_CURRENCY) && !exchangeRates)
  ) {
    return;
  }

  let totalIncome = income;
  if (incomeInterval === 'hourly') {
    let unpaidHours = 0;
    switch (unpaidTimeUnits) {
      case 'days':
        unpaidHours = unpaidTime * workingHoursPerDay;
        break;
      case 'weeks':
        unpaidHours = unpaidTime * workingDaysPerWeek * workingHoursPerDay;
        break;
      case 'months':
        unpaidHours = unpaidTime * workingDaysPerMonth * workingHoursPerDay;
        break;
    }
    totalIncome *= workingDaysPerMonth * workingHoursPerDay * 12 - unpaidHours;
  } else if (incomeInterval === 'daily') {
    let unpaidDays = 0;
    switch (unpaidTimeUnits) {
      case 'days':
        unpaidDays = unpaidTime;
        break;
      case 'weeks':
        unpaidDays = unpaidTime * workingDaysPerWeek;
        break;
      case 'months':
        unpaidDays = unpaidTime * workingDaysPerMonth;
        break;
    }
    totalIncome *= workingDaysPerMonth * 12 - unpaidDays;
  } else if (incomeInterval === 'monthly') {
    let unpaidMonths = 0;
    switch (unpaidTimeUnits) {
      case 'days':
        unpaidMonths = unpaidTime / workingDaysPerMonth;
        break;
      case 'weeks':
        unpaidMonths = unpaidTime / (workingDaysPerWeek * workingDaysPerMonth);
        break;
      case 'months':
        unpaidMonths = unpaidTime;
        break;
    }
    totalIncome *= 12 - unpaidMonths;
  }

  // this is because people could accidentally input too much unpaid time
  totalIncome = Math.max(totalIncome, 0);

  if (incomeCurrency !== BASE_CURRENCY) {
    totalIncome *= exchangeRates![incomeCurrency];
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
    totalDeductibleExpenses *= exchangeRates![deductibleExpensesCurrency];
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

  if (!exchangeRates || incomeFrom >= incomeTo) {
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
