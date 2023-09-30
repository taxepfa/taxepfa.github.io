'use client';

import { useEffect } from 'react';
import { LOCAL_STORAGE_STATE_KEY } from '~/lib/config';
import { State, initialState, state } from '~/lib/state';

export function StateLoader() {
  useEffect(() => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (serializedState) {
        const newState = JSON.parse(serializedState) as State & { appVersion: string };

        if (newState.appVersion !== process.env.APP_VERSION) {
          console.info('App version changed, will reset local storage state...');
          localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
          return;
        }

        state.calculator.income = newState.calculator.income || initialState.calculator.income;
        state.calculator.incomeCurrency = newState.calculator.incomeCurrency || initialState.calculator.incomeCurrency;
        state.calculator.incomeInterval = newState.calculator.incomeInterval || initialState.calculator.incomeInterval;

        state.chart.incomeFrom = newState.chart.incomeFrom || initialState.chart.incomeFrom;
        state.chart.incomeTo = newState.chart.incomeTo || initialState.chart.incomeTo;
        state.chart.incomeCurrency = newState.chart.incomeCurrency || initialState.chart.incomeCurrency;
        state.chart.incomeInterval = newState.chart.incomeInterval || initialState.chart.incomeInterval;
        state.settings.minimumWage = newState.settings.minimumWage || initialState.settings.minimumWage;

        state.common.deductibleExpenses = newState.common.deductibleExpenses || initialState.common.deductibleExpenses;
        state.common.deductibleExpensesCurrency =
          newState.common.deductibleExpensesCurrency || initialState.common.deductibleExpensesCurrency;
        state.common.deductibleExpensesInterval =
          newState.common.deductibleExpensesInterval || initialState.common.deductibleExpensesInterval;
        state.common.unpaidTime = newState.common.unpaidTime || initialState.common.unpaidTime;
        state.common.unpaidTimeUnits = newState.common.unpaidTimeUnits || initialState.common.unpaidTimeUnits;

        state.settings.workingHoursPerDay =
          newState.settings.workingHoursPerDay || initialState.settings.workingHoursPerDay;
        state.settings.workingDaysPerWeek =
          newState.settings.workingDaysPerWeek || initialState.settings.workingDaysPerWeek;
        state.settings.workingDaysPerMonth =
          newState.settings.workingDaysPerMonth || initialState.settings.workingDaysPerMonth;
      }
    } catch {
      console.warn('Error while trying to load state from local storage, will try to reset it...');
      try {
        localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
      } finally {
        // Do nothing
      }
    }
  }, []);

  return null;
}
