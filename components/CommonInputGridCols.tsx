import { GridCol, NumberInput } from '@mantine/core';
import { useSnapshot } from 'valtio';
import {
  CURRENCIES,
  DEDUCTIBLE_EXPENSES_INTERVALS,
  DeductibleExpensesInterval,
  UNPAID_INTERVALS,
  UnpaidInterval,
} from '~/lib/config';
import { state } from '~/lib/state';
import { Select } from './Select';

export function CommonInputGridCols() {
  const commonSnapshot = useSnapshot(state.common);

  return (
    <>
      <GridCol span={{ xs: 6 }}>
        <NumberInput
          hideControls
          label="Cheltuieli deductibile"
          min={0}
          value={commonSnapshot.deductibleExpenses || ''}
          onChange={(val) => (state.common.deductibleExpenses = typeof val === 'number' ? val : null)}
        />
      </GridCol>
      <GridCol span={{ base: 6, xs: 3 }}>
        <Select
          ariaLabel="Moneda cheltuielilor deductibile"
          data={CURRENCIES}
          value={commonSnapshot.deductibleExpensesCurrency}
          onChange={(val: string) => (state.common.deductibleExpensesCurrency = val)}
        />
      </GridCol>
      <GridCol span={{ base: 6, xs: 3 }}>
        <Select
          ariaLabel="Intervalul cheltuielilor deductibile"
          data={DEDUCTIBLE_EXPENSES_INTERVALS}
          value={commonSnapshot.deductibleExpensesInterval}
          onChange={(val: string) => (state.common.deductibleExpensesInterval = val as DeductibleExpensesInterval)}
        />
      </GridCol>
      <GridCol span={{ xs: 6 }}>
        <NumberInput
          hideControls
          label="Nu vei lucra"
          min={0}
          value={commonSnapshot.unpaidTime || ''}
          onChange={(val) => (state.common.unpaidTime = typeof val === 'number' ? val : null)}
        />
      </GridCol>
      <GridCol span={{ xs: 6 }}>
        <Select
          ariaLabel="Unități de măsură ale timpului în care nu vei lucra"
          data={UNPAID_INTERVALS}
          value={commonSnapshot.unpaidInterval}
          onChange={(val: string) => (state.common.unpaidInterval = val as UnpaidInterval)}
        />
      </GridCol>
    </>
  );
}
