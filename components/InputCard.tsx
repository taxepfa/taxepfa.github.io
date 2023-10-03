import { Card, Grid, GridCol, NumberInput, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import {
  CURRENCIES,
  DEDUCTIBLE_EXPENSES_INTERVALS,
  DeductibleExpensesInterval,
  INCOME_INTERVALS,
  IncomeInterval,
} from '~/lib/config';
import { state } from '~/lib/state';
import classes from './InputCard.module.css';
import { Select } from './Select';

export type InputCardProps = {
  grossIncomeOverVATThreshold: boolean | undefined;
};

export function InputCard({ grossIncomeOverVATThreshold }: InputCardProps) {
  const snap = useSnapshot(state);
  return (
    <Card p="md" withBorder radius="md">
      <Grid gutter="md" pb="xs">
        <GridCol span={{ xs: 6 }}>
          <NumberInput
            hideControls
            required
            min={0}
            label="Venit estimat"
            description={
              grossIncomeOverVATThreshold ? (
                <Text className={classes.warning} size="xs" c="orange">
                  Atenție, vei depăși pragul de TVA!
                </Text>
              ) : null
            }
            inputWrapperOrder={['label', 'input', 'description', 'error']}
            value={snap.income || ''}
            onChange={(val) => (state.income = val === '' ? 0 : Number(val))}
            error={snap.income <= 0 ? 'Scrie o valoare pozitivă' : null}
          />
        </GridCol>
        <GridCol span={{ base: 6, xs: 3 }}>
          <Select
            ariaLabel="Moneda venitului"
            data={CURRENCIES}
            value={snap.incomeCurrency}
            onChange={(val: string) => (state.incomeCurrency = val)}
          />
        </GridCol>
        <GridCol span={{ base: 6, xs: 3 }}>
          <Select
            ariaLabel="Intervalul pe care este estimat venitul"
            data={INCOME_INTERVALS}
            value={snap.incomeInterval}
            onChange={(val: string) => (state.incomeInterval = val as IncomeInterval)}
          />
        </GridCol>

        {snap.incomeInterval === 'hourly' && (
          <GridCol>
            <NumberInput
              hideControls
              label="Volum de lucru"
              rightSectionWidth={130}
              rightSectionPointerEvents="none"
              rightSection={
                <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                  ore pe săptămână
                </Text>
              }
              min={0}
              value={snap.workingHoursPerWeek || ''}
              onChange={(val) => (state.workingHoursPerWeek = val === '' ? 0 : Number(val))}
              error={snap.workingHoursPerWeek <= 0 ? 'Scrie o valoare pozitivă' : null}
            />
          </GridCol>
        )}
        {snap.incomeInterval === 'daily' && (
          <GridCol>
            <NumberInput
              hideControls
              label="Volum de lucru"
              rightSectionWidth={132}
              rightSectionPointerEvents="none"
              rightSection={
                <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                  zile pe săptămână
                </Text>
              }
              min={0}
              value={snap.workingDaysPerWeek || ''}
              onChange={(val) => (state.workingDaysPerWeek = val === '' ? 0 : Number(val))}
              error={snap.workingDaysPerWeek <= 0 ? 'Scrie o valoare pozitivă' : null}
            />
          </GridCol>
        )}
        <GridCol>
          <NumberInput
            hideControls
            label="Nu vei lucra"
            description="Perioade de timp în care nu vei avea încasări (concedii, căutare de clienți, etc.)"
            rightSectionWidth={122}
            rightSectionPointerEvents="none"
            rightSection={
              <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                săptămâni pe an
              </Text>
            }
            min={0}
            value={snap.vacationWeeksPerYear || ''}
            onChange={(val) => (state.vacationWeeksPerYear = val === '' ? 0 : Number(val))}
            error={snap.vacationWeeksPerYear < 0 ? 'Scrie o valoare pozitivă sau nimic' : null}
          />
        </GridCol>
        <GridCol span={{ xs: 6 }}>
          <NumberInput
            hideControls
            required
            min={0}
            label="Cheltuieli deductibile"
            value={snap.deductibleExpenses || ''}
            onChange={(val) => (state.deductibleExpenses = val === '' ? 0 : Number(val))}
            error={snap.deductibleExpenses < 0 ? 'Scrie o valoare pozitivă sau nimic' : null}
          />
        </GridCol>
        <GridCol span={{ base: 6, xs: 3 }}>
          <Select
            ariaLabel="Moneda cheltuielilor deductibile"
            data={CURRENCIES}
            value={snap.deductibleExpensesCurrency}
            onChange={(val: string) => (state.deductibleExpensesCurrency = val)}
          />
        </GridCol>
        <GridCol span={{ base: 6, xs: 3 }}>
          <Select
            ariaLabel="Intervalul pe care sunt estimate cheultuielile deductibile"
            data={DEDUCTIBLE_EXPENSES_INTERVALS}
            value={snap.deductibleExpensesInterval}
            onChange={(val: string) => (state.deductibleExpensesInterval = val as DeductibleExpensesInterval)}
          />
        </GridCol>
      </Grid>
    </Card>
  );
}
