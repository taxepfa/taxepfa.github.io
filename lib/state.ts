import { proxy } from 'valtio';
import { DeductibleExpensesInterval, IncomeInterval } from './config';

export type State = {
  income: number;
  incomeCurrency: string;
  incomeInterval: IncomeInterval;
  minimumWage: number;
  workingHoursPerWeek: number;
  workingDaysPerWeek: number;
  vacationWeeksPerYear: number;
  deductibleExpenses: number;
  deductibleExpensesCurrency: string;
  deductibleExpensesInterval: DeductibleExpensesInterval;
};

export const initialState: State = {
  income: 12000,
  incomeCurrency: 'RON',
  incomeInterval: 'monthly',
  minimumWage: 3300,
  workingHoursPerWeek: 40,
  workingDaysPerWeek: 5,
  vacationWeeksPerYear: 4,
  deductibleExpenses: 0,
  deductibleExpensesCurrency: 'RON',
  deductibleExpensesInterval: 'monthly',
};

export const state = proxy<State>(initialState);
