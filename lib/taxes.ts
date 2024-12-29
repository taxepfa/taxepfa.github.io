import {
    BASE_CURRENCY,
    CHART_STEPS,
    HEALTH_PERCENTAGE,
    INCOME_TAX_PERCENTAGE,
    PENSION_PERCENTAGE, PERSONAL_DEDUCTIBLE, WAGE_COMPANY_TAX_PERCENTAGE,
    WEEKS_PER_MONTH,
    WEEKS_PER_YEAR,
} from './config';
import {ExchangeRates, useExchangeRates} from './exchangeRates';
import {State} from './state';

function calculatePensionTaxAmount(income: number, minimumWage: number, isPfaIncome = true) {
    // calculate the pension tax amount (CAS) and percentage of the gross income
    if (!isPfaIncome) {
        return 0;
    }
    if (income >= minimumWage * 24) {
        return minimumWage * 24 * PENSION_PERCENTAGE;
    }
    if (income >= minimumWage * 12) {
        return minimumWage * 12 * PENSION_PERCENTAGE;
    }
    return 0;
}

function calculateHealthTaxAmount(income: number, minimumWage: number, isPfaIncome = true) {
    if (income >= minimumWage * 60 && isPfaIncome) {
        return minimumWage * 60 * HEALTH_PERCENTAGE;
    }
    if (income >= minimumWage * 6 && isPfaIncome) {
        return income * HEALTH_PERCENTAGE;
    }
    if (income >= minimumWage * 24 && !isPfaIncome) {
        return minimumWage * 24 * HEALTH_PERCENTAGE;
    }
    if (income >= minimumWage * 12 && !isPfaIncome) {
        return minimumWage * 12 * HEALTH_PERCENTAGE;
    }
    if (income >= minimumWage * 6) {
        return minimumWage * 6 * HEALTH_PERCENTAGE;
    }
    return 0;
}

function calculateTotalIncome(incomeInterval: "hourly" | "daily" | "monthly" | "yearly", income: number, workingHoursPerWeek: number, vacationWeeksPerYear: number, workingDaysPerWeek: number) {
    if (incomeInterval === 'hourly') {
        income *= workingHoursPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
    } else if (incomeInterval === 'daily') {
        income *= workingDaysPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
    } else if (incomeInterval === 'monthly') {
        income *= 12 - vacationWeeksPerYear / WEEKS_PER_MONTH;
    }
    return income;
}

function splitMinimumWageIntoTaxesAndNet(minimumWage: number, taxFree: number) {
    const wage = minimumWage - taxFree;
    const pension = wage * PENSION_PERCENTAGE;
    const health = wage * HEALTH_PERCENTAGE;
    const personalDeductibleExpense = wage * PERSONAL_DEDUCTIBLE;
    const base = wage - pension - health - personalDeductibleExpense;
    const tax = base * INCOME_TAX_PERCENTAGE;
    const income = wage - tax + taxFree;
    const companyTax = wage * WAGE_COMPANY_TAX_PERCENTAGE
    const taxes = pension + health + tax;
    return {
        income,
        taxes,
        companyTax,
    }
}

export function calculateTaxes({
                                   income,
                                   incomeCurrency,
                                   incomeInterval,
                                   deductibleExpenses,
                                   deductibleExpensesCurrency,
                                   deductibleExpensesInterval,
                                   workingHoursPerWeek,
                                   workingDaysPerWeek,
                                   vacationWeeksPerYear,
                                   minimumWage,
                                   minimumWageTaxFreeDeductible,
                                   vatThreshold,
                                   dividendsTax,
                                   companyIncomeTax,
                                   companyHighIncomeTax,
                                   companyProfitTax,
                                   companyIncomeTaxThreshold,
                                   exchangeRates,
                                   type,
                               }: State & {
    exchangeRates: ExchangeRates | undefined;
    type: 'pfa' | 'srl-venit' | 'srl-profit'
}) {
    if (
        (incomeCurrency !== BASE_CURRENCY && !exchangeRates) ||
        (deductibleExpensesCurrency !== BASE_CURRENCY && !exchangeRates)
    ) {
        return;
    }
    const isPfaIncome = type === 'pfa';
    // subtract vacation time and adjust the income accordingly
    income = calculateTotalIncome(incomeInterval, income, workingHoursPerWeek, vacationWeeksPerYear, workingDaysPerWeek);

    // people could accidentally input too many vacation weeks, so we need to make sure the income is not negative
    income = Math.max(income, 0);

    // convert income to base currency if needed
    if (incomeCurrency !== BASE_CURRENCY) {
        income *= exchangeRates![incomeCurrency];
    }

    // save the gross income to return it later
    const grossIncomeInBaseCurrency = income;

    if (deductibleExpensesInterval === 'monthly') {
        deductibleExpenses *= 12;
    }

    if (type === 'srl-venit') {
        deductibleExpenses += minimumWage * 12;
    }

    // convert deductible expenses to base currency if needed
    if (deductibleExpensesCurrency !== BASE_CURRENCY) {
        deductibleExpenses *= exchangeRates![deductibleExpensesCurrency];
    }
    let companyTaxes = 0;

    // subtract deductible expenses from the income
    if (isPfaIncome) {
        income -= deductibleExpenses;

    } else {
        // Calculate Company Taxes
        if (type === 'srl-venit') {
            const companyIncomeTaxedTaxes = Math.max(
                grossIncomeInBaseCurrency * companyHighIncomeTax,
                0
            )
            const companyIncomeTaxedProfits = grossIncomeInBaseCurrency - companyIncomeTaxedTaxes;
            const companyIncomeTaxedDividendTax = companyIncomeTaxedProfits * dividendsTax;
            income = companyIncomeTaxedProfits - companyIncomeTaxedDividendTax;
            companyTaxes = companyIncomeTaxedTaxes + companyIncomeTaxedDividendTax;


        }
        if (type === 'srl-profit') {
            const companyProfitTaxedTaxes = Math.max(
                (grossIncomeInBaseCurrency - deductibleExpenses) * companyProfitTax,
                0
            )

            const companyProfitTaxedProfits = (grossIncomeInBaseCurrency - deductibleExpenses) - companyProfitTaxedTaxes;

            const companyProfitTaxedDividendTax = companyProfitTaxedProfits * dividendsTax;

            income = companyProfitTaxedProfits - companyProfitTaxedDividendTax;
            companyTaxes = companyProfitTaxedTaxes + companyProfitTaxedDividendTax;
        }
        const { income: salaryIncome }= splitMinimumWageIntoTaxesAndNet(minimumWage, minimumWageTaxFreeDeductible);
        income += salaryIncome;
    }

    const pensionTaxAmountInBaseCurrency = calculatePensionTaxAmount(income, minimumWage, isPfaIncome);
    const pensionTaxPercentage =
        grossIncomeInBaseCurrency === 0 ? 0 : (pensionTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

    // calculate the health tax amount (CASS) and percentage of the gross income
    const healthTaxAmountInBaseCurrency = calculateHealthTaxAmount(income, minimumWage, isPfaIncome);
    const healthTaxPercentage = (healthTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

    // calculate the taxable income and make sure it's not negative
    const taxableIncome = Math.max(
        income - pensionTaxAmountInBaseCurrency - healthTaxAmountInBaseCurrency - companyTaxes,
        0
    );

    // calculate the income tax amount and percentage of the gross income
    const incomeTaxAmountInBaseCurrency = isPfaIncome ? taxableIncome * INCOME_TAX_PERCENTAGE : income - taxableIncome;
    const incomeTaxPercentage =
        grossIncomeInBaseCurrency === 0 ? 0 : (incomeTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

    // calculate the total tax amount and percentage of the gross income
    const totalTaxAmountInBaseCurrency =
        pensionTaxAmountInBaseCurrency + healthTaxAmountInBaseCurrency + incomeTaxAmountInBaseCurrency;
    const totalTaxPercentage = (totalTaxAmountInBaseCurrency / grossIncomeInBaseCurrency) * 100;

    // calculate the total net income in base currency
    const totalNetIncomeInBaseCurrency = grossIncomeInBaseCurrency - totalTaxAmountInBaseCurrency;

    // convert the total net income to the income currency if needed and adjust it for the income interval
    let netIncome = totalNetIncomeInBaseCurrency;
    if (incomeCurrency !== BASE_CURRENCY) {
        netIncome /= exchangeRates![incomeCurrency];
    }
    if (incomeInterval === 'hourly') {
        netIncome /= workingHoursPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
    } else if (incomeInterval === 'daily') {
        netIncome /= workingDaysPerWeek * (WEEKS_PER_YEAR - vacationWeeksPerYear);
    } else if (incomeInterval === 'monthly') {
        netIncome /= 12 - vacationWeeksPerYear / WEEKS_PER_MONTH;
    }


    return {
        grossIncomeInBaseCurrency,
        grossIncomeOverVATThreshold: grossIncomeInBaseCurrency > vatThreshold,
        totalNetIncomeInBaseCurrency,
        netIncome,
        totalTaxAmountInBaseCurrency,
        totalTaxPercentage,
        pensionTaxAmountInBaseCurrency,
        pensionTaxPercentage,
        healthTaxAmountInBaseCurrency,
        healthTaxPercentage,
        incomeTaxAmountInBaseCurrency,
        incomeTaxPercentage,
    };
}

export function useTaxesCalculator(params: State & { type: 'pfa' | 'srl-venit' | 'srl-profit' }) {
    const {exchangeRates, exchangeRatesLoading} = useExchangeRates();
    return {
        ...calculateTaxes({...params, exchangeRates}),
        exchangeRates,
        exchangeRatesLoading,
    };
}

export type ChartDataPoint = {
    income: number;
    pensionTaxPercentage: number;
    healthTaxPercentage: number;
    incomeTaxPercentage: number;
    netIncome: number;
};

export function useTaxesChart({income, ...otherParams}: State & { type: 'pfa' | 'srl-venit' | 'srl-profit' }) {
    const {exchangeRates, exchangeRatesLoading} = useExchangeRates();

    const data: ChartDataPoint[] = [];

    if (!exchangeRates || income === 0) {
        return;
    }

    const incomeTo = income * 2;
    const step = incomeTo / CHART_STEPS;

    for (let i = 0; i <= incomeTo; i += step) {
        const {pensionTaxPercentage, healthTaxPercentage, incomeTaxPercentage, netIncome} = calculateTaxes({
            income: i === 0 ? 0.1 : i,
            ...otherParams,
            exchangeRates,
        })!;

        data.push({
            income: i,
            pensionTaxPercentage,
            healthTaxPercentage,
            incomeTaxPercentage,
            netIncome,
        });
    }

    return {
        data,
        ...calculateTaxes({
            income,
            ...otherParams,
            exchangeRates,
        }),
        exchangeRates,
        exchangeRatesLoading,
    };
}
