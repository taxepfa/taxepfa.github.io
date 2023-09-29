import { GridCol, NumberInput, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { CURRENCIES, DEDUCTIBLE_EXPENSES_INTERVALS, DeductibleExpensesInterval } from '~/lib/config';
import { store } from '~/lib/store';
import { Select } from './Select';

export function CommonInputGridCols() {
  const commonSnapshot = useSnapshot(store.common);
  const settingsSnapshot = useSnapshot(store.settings);

  return (
    <>
      <GridCol span={{ xs: 6 }}>
        <NumberInput
          hideControls
          label="Cheltuieli deductibile"
          min={0}
          value={commonSnapshot.deductibleExpenses || ''}
          onChange={(val) => (store.common.deductibleExpenses = typeof val === 'number' ? val : null)}
        />
      </GridCol>
      <GridCol span={{ base: 6, xs: 3 }}>
        <Select
          ariaLabel="Moneda cheltuielilor deductibile"
          data={CURRENCIES}
          value={commonSnapshot.deductibleExpensesCurrency}
          onChange={(val: string) => (store.common.deductibleExpensesCurrency = val)}
        />
      </GridCol>
      <GridCol span={{ base: 6, xs: 3 }}>
        <Select
          ariaLabel="Intervalul cheltuielilor deductibile"
          data={DEDUCTIBLE_EXPENSES_INTERVALS}
          value={commonSnapshot.deductibleExpensesInterval}
          onChange={(val: string) => (store.common.deductibleExpensesInterval = val as DeductibleExpensesInterval)}
        />
      </GridCol>
      <GridCol mb="xs">
        <NumberInput
          hideControls
          label="Concediu neplătit"
          min={0}
          max={(settingsSnapshot.workingDaysPerMonth ?? 20) * 12}
          rightSectionWidth={50}
          rightSectionPointerEvents="none"
          rightSection={
            <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
              zile
            </Text>
          }
          value={commonSnapshot.unpaidVacationDays || ''}
          onChange={(val) => (store.common.unpaidVacationDays = typeof val === 'number' ? val : null)}
        />
      </GridCol>
    </>
  );
}
