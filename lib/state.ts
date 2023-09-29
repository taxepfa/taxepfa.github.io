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
    minimumWage: number;
    workingDaysPerMonth: number;
    workingDaysPerWeek: number;
    workingHoursPerDay: number;
  };
};

export const initialState: State = {
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
};

export const state = proxy<State>(initialState);

subscribe(state, () => {
  localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(state));
});
