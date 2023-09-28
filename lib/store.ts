import { proxy } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval } from './config';

export const store = proxy<{
  calculator: {
    income: number;
    incomeCurrency: string;
    incomeInterval: IncomeInterval;
  };
  chart: {
    incomeFrom: number;
    incomeTo: number;
    incomeCurrency: string;
    incomeInterval: IncomeInterval;
  };
  common: {
    deductibleExpenses: number;
    deductibleExpensesCurrency: string;
    deductibleExpensesInterval: DeductibleExpensesInterval;
    unpaidVacationDays: number;
  };
  settings: {
    minimumWage: number;
    workingDaysPerMonth: number;
    workingHoursPerDay: number;
  };
}>({
  calculator: {
    income: 3000,
    incomeCurrency: 'EUR',
    incomeInterval: 'monthly',
  },
  chart: {
    incomeFrom: 0,
    incomeTo: 6000,
    incomeCurrency: 'EUR',
    incomeInterval: 'monthly',
  },
  common: {
    deductibleExpenses: NaN,
    deductibleExpensesCurrency: 'EUR',
    deductibleExpensesInterval: 'monthly',
    unpaidVacationDays: NaN,
  },
  settings: {
    minimumWage: 3300,
    workingDaysPerMonth: 20,
    workingHoursPerDay: 8,
  },
});
