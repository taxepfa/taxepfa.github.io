import {proxy} from 'valtio';
import {BASE_CURRENCY, DeductibleExpensesInterval, IncomeInterval} from './config';

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
    minimumWageTaxFreeDeductible: number;
    vatThreshold: number;
    dividendsTax: number;
    companyIncomeTax: number;
    companyHighIncomeTax: number;
    companyProfitTax: number;
    companyIncomeTaxThreshold: number;
    companyIncomeTaxToProfitThreshold: number;
};

export const initialState: State = {
    minimumWageTaxFreeDeductible: 300,
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
    vatThreshold: 300_000,
    dividendsTax: 0.10,
    companyIncomeTax: 0.01,
    companyHighIncomeTax: 0.03,
    companyProfitTax: 0.16,
    // Values are in RON for 2024
    companyIncomeTaxThreshold: 298_476,
    // Values are in RON for 2024
    companyIncomeTaxToProfitThreshold: 2_487_300

};

export const state = proxy<State>(initialState);
