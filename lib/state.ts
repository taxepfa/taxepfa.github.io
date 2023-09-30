import { proxy, subscribe } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval, LOCAL_STORAGE_STATE_KEY, UnpaidTimeUnits } from './config';

export type State = {
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
    unpaidTime: number;
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
    deductibleExpenses: 0,
    deductibleExpensesCurrency: 'RON',
    deductibleExpensesInterval: 'monthly',
    unpaidTime: 0,
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
