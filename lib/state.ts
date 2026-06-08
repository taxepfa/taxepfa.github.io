import { proxy } from 'valtio';
import { BASE_CURRENCY, DeductibleExpensesInterval, IncomeInterval } from './config';

export type State = {
  income: number;
  incomeCurrency: string;
  incomeInterval: IncomeInterval;
  workingHoursPerWeek: number;
  workingDaysPerWeek: number;
  vacationWeeksPerYear: number;
  deductibleExpenses: number;
  deductibleExpensesCurrency: string;
  deductibleExpensesInterval: DeductibleExpensesInterval;
  minimumWage: number;
  vatThreshold: number;
};

export const initialState: State = {
  income: 12000,
  incomeCurrency: BASE_CURRENCY,
  incomeInterval: 'monthly',
  workingHoursPerWeek: 40,
  workingDaysPerWeek: 5,
  vacationWeeksPerYear: 4,
  deductibleExpenses: 0,
  deductibleExpensesCurrency: BASE_CURRENCY,
  deductibleExpensesInterval: 'monthly',
  minimumWage: 3_300,
  vatThreshold: 395_000,
};

export const state = proxy<State>(initialState);
