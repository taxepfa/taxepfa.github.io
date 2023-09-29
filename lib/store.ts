import { proxy, subscribe } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval } from './config';

function proxyWithLocalStorage<T extends object>(key: string, initialValue: T) {
  if (typeof window === 'undefined') return proxy(initialValue);

  const storageItem = localStorage.getItem(key);
  const state = proxy(storageItem !== null ? (JSON.parse(storageItem) as T) : initialValue);
  subscribe(state, () => localStorage.setItem(key, JSON.stringify(state)));

  return state;
}

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
    unpaidVacationDays: number | null;
  };
  settings: {
    minimumWage: number | null;
    workingDaysPerMonth: number | null;
    workingHoursPerDay: number | null;
  };
};

export const store = proxyWithLocalStorage<State>('state', {
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
    unpaidVacationDays: null,
  },
  settings: {
    minimumWage: 3300,
    workingDaysPerMonth: 21,
    workingHoursPerDay: 8,
  },
});
