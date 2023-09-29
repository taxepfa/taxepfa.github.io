'use client';

import { useEffect } from 'react';
import { LOCAL_STORAGE_STATE_KEY } from '~/lib/config';
import { State, initialState, state } from '~/lib/state';

export function StateLoader() {
  useEffect(() => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (serializedState) {
        const newState = JSON.parse(serializedState) as State;
        state.calculator.income = newState.calculator.income || initialState.calculator.income;
        state.calculator.incomeCurrency = newState.calculator.incomeCurrency || initialState.calculator.incomeCurrency;
        state.calculator.incomeInterval = newState.calculator.incomeInterval || initialState.calculator.incomeInterval;
        state.chart.incomeFrom = newState.chart.incomeFrom || initialState.chart.incomeFrom;
        state.chart.incomeTo = newState.chart.incomeTo || initialState.chart.incomeTo;
        state.chart.incomeCurrency = newState.chart.incomeCurrency || initialState.chart.incomeCurrency;
        state.chart.incomeInterval = newState.chart.incomeInterval || initialState.chart.incomeInterval;
        state.settings.minimumWage = newState.settings.minimumWage || initialState.settings.minimumWage;
        state.settings.workingHoursPerDay =
          newState.settings.workingHoursPerDay || initialState.settings.workingHoursPerDay;
        state.settings.workingDaysPerWeek =
          newState.settings.workingDaysPerWeek || initialState.settings.workingDaysPerWeek;
        state.settings.workingDaysPerMonth =
          newState.settings.workingDaysPerMonth || initialState.settings.workingDaysPerMonth;
      }
    } catch (err) {
      // just log the error for now
      console.error(err);
    }
  }, []);

  return null;
}
