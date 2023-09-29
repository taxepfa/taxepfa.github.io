import { proxy, subscribe } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval, LOCAL_STORAGE_STATE_KEY, UnpaidInterval } from './config';

export type State = {
  calculator: {
    income: number | null;
    incomeCurrency: string;
    incomeInterval: IncomeInterval;
  };
  chart: {
    incomeFrom: number | null;
    incomeTo: number | null;
    incomeCurrency: string;
    incomeInterval: IncomeInterval;
  };
  common: {
    deductibleExpenses: number | null;
    deductibleExpensesCurrency: string;
    deductibleExpensesInterval: DeductibleExpensesInterval;
    unpaidTime: number | null;
    unpaidInterval: UnpaidInterval;
  };
  settings: {
    minimumWage: number | null;
    workingDaysPerMonth: number | null;
    workingDaysPerWeek: number | null;
    workingHoursPerDay: number | null;
  };
};

export const state = proxy<State>({
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
    deductibleExpenses: null,
    deductibleExpensesCurrency: 'EUR',
    deductibleExpensesInterval: 'monthly',
    unpaidTime: null,
    unpaidInterval: 'weeks',
  },
  settings: {
    minimumWage: 3300,
    workingDaysPerMonth: 21,
    workingDaysPerWeek: 5,
    workingHoursPerDay: 8,
  },
});

subscribe(state, () => {
  localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(state));
});
