'use client';

import { Card, Grid, GridCol, Group, LoadingOverlay, NumberInput, RingProgress, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { CommonInputGridCols } from '~/components/CommonInputGridCols';
import { ExchangeRatesNotice } from '~/components/ExchageRatesNotice';
import { Page } from '~/components/Page';
import { Select } from '~/components/Select';
import { BASE_CURRENCY, CURRENCIES, INCOME_INTERVALS, IncomeInterval, NEXT_YEAR, YEAR } from '~/lib/config';
import { safeFormatAsBaseCurrency, safeFormatAsPercentage } from '~/lib/format';
import { store } from '~/lib/store';
import { useTaxesCalculator } from '~/lib/taxes';
import classes from './page.module.css';

export default function HomePage() {
  const calculatorSnapshot = useSnapshot(store.calculator);
  const commonSnapshot = useSnapshot(store.common);
  const settingsSnapshot = useSnapshot(store.settings);

  const {
    totalIncome,
    totalTaxAmount,
    totalTaxPercentage,
    pensionTaxAmount,
    healthTaxAmount,
    incomeTaxAmount,
    exchangeRates,
    exchangeRatesLoading,
  } = useTaxesCalculator({ calculatorSnapshot, commonSnapshot, settingsSnapshot });
  const totalTaxPercentageOver100 = totalTaxPercentage > 100;
  const color = totalTaxPercentage > 100 ? 'red' : totalTaxPercentage > 50 ? 'orange' : 'blue';

  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Grid gutter="md">
          <GridCol span={{ xs: 6 }}>
            <NumberInput
              hideControls
              required
              min={0}
              label="Venit estimat"
              value={calculatorSnapshot.income}
              onChange={(val) => (store.calculator.income = typeof val === 'number' ? val : NaN)}
              error={isNaN(calculatorSnapshot.income) ? 'Scrie o valoare' : null}
            />
          </GridCol>
          <GridCol span={{ base: 6, xs: 3 }}>
            <Select
              ariaLabel="Moneda venitului"
              data={CURRENCIES}
              value={calculatorSnapshot.incomeCurrency}
              onChange={(val: string) => (store.calculator.incomeCurrency = val)}
            />
          </GridCol>
          <GridCol span={{ base: 6, xs: 3 }}>
            <Select
              ariaLabel="Intervalul pe care este estimat venitul"
              data={INCOME_INTERVALS}
              value={calculatorSnapshot.incomeInterval}
              onChange={(val: string) => (store.calculator.incomeInterval = val as IncomeInterval)}
            />
          </GridCol>
          <CommonInputGridCols />
        </Grid>
      </Card>
      <Card className={classes.results} withBorder p="md" radius="md" pos="relative">
        <LoadingOverlay visible={exchangeRatesLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <div className={classes.resultTexts}>
          <Text className={classes.resultText} fz={22}>
            Vei plăti ciolacilor în {NEXT_YEAR}
          </Text>
          <div>
            <Text fz="xs" c="dimmed">
              În total
            </Text>
            <Text className={classes.resultText} c={color} fz={36}>
              {safeFormatAsBaseCurrency(totalTaxAmount)}
            </Text>
          </div>
          <Group>
            <div>
              <Text size="xs" c="dimmed" mb={4}>
                CAS (pensie)
              </Text>
              <Text className={classes.resultText}>{safeFormatAsBaseCurrency(pensionTaxAmount)}</Text>
            </div>
            <div>
              <Text size="xs" c="dimmed" mb={4}>
                CASS (sănătate)
              </Text>
              <Text className={classes.resultText}>{safeFormatAsBaseCurrency(healthTaxAmount)}</Text>
            </div>
            <div>
              <Text size="xs" c="dimmed" mb={4}>
                Impozit pe venit
              </Text>
              <Text className={classes.resultText}>{safeFormatAsBaseCurrency(incomeTaxAmount)}</Text>
            </div>
          </Group>
        </div>
        <div className={classes.resultRing}>
          <RingProgress
            roundCaps
            thickness={8}
            size={200}
            sections={[{ value: totalTaxPercentage, color }]}
            label={
              <div>
                <Text ta="center" fz="xs" mt={-16} c="dimmed">
                  Adică
                  <br />
                  {totalTaxPercentageOver100 ? (
                    <Text component="span" fz="xs" c={color} fw="bold">
                      mai mult de
                    </Text>
                  ) : (
                    'aproximativ'
                  )}
                </Text>
                <Text ta="center" c={color} fz={48} className={classes.resultText}>
                  {safeFormatAsPercentage(totalTaxPercentageOver100 ? 100 : totalTaxPercentage)}
                </Text>
                <Text ta="center" fz="xs" mt={2} c="dimmed">
                  din venitul tău
                </Text>
              </div>
            }
          />
        </div>
      </Card>
      <div>
        {!isNaN(totalIncome) &&
          (calculatorSnapshot.incomeCurrency !== BASE_CURRENCY || calculatorSnapshot.incomeInterval !== 'yearly') && (
            <Text size="xs" c="dimmed" ta="center">
              Venitul tău brut estimat pentru anul {YEAR} este de {safeFormatAsBaseCurrency(totalIncome)}.
            </Text>
          )}
        <ExchangeRatesNotice
          exchangeRates={exchangeRates}
          incomeCurrency={calculatorSnapshot.incomeCurrency}
          deductibleExpensesCurrency={commonSnapshot.deductibleExpensesCurrency}
        />
      </div>
    </Page>
  );
}
