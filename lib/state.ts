import { proxy, subscribe } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval, LOCAL_STORAGE_STATE_KEY, UnpaidTimeUnits } from './config';

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
    unpaidTimeUnits: UnpaidTimeUnits;
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
    income: 12000,
    incomeCurrency: 'RON',
    incomeInterval: 'monthly',
  },
  chart: {
    incomeFrom: 0,
    incomeTo: 12000,
    incomeCurrency: 'RON',
    incomeInterval: 'monthly',
  },
  common: {
    deductibleExpenses: null,
    deductibleExpensesCurrency: 'RON',
    deductibleExpensesInterval: 'monthly',
    unpaidTime: null,
    unpaidTimeUnits: 'weeks',
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
  localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify({ ...state, appVersion: process.env.APP_VERSION }));
});
