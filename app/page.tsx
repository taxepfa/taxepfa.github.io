'use client';

import { Card, Group, LoadingOverlay, RingProgress, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { FootNotes } from '~/components/FootNotes';
import { InputCard } from '~/components/InputCard';
import { Page } from '~/components/Page';
import { BASE_CURRENCY, NEXT_YEAR } from '~/lib/config';
import { formatAsBaseCurrency, formatAsPercentage } from '~/lib/format';
import { state } from '~/lib/state';
import { useTaxesCalculator } from '~/lib/taxes';
import classes from './page.module.css';

export default function HomePage() {
  const snap = useSnapshot(state);

  const {
    grossIncome,
    totalTaxAmount,
    totalTaxPercentage,
    pensionTaxAmount,
    healthTaxAmount,
    incomeTaxAmount,
    exchangeRates,
    exchangeRatesLoading,
  } = useTaxesCalculator(snap);

  const totalTaxPercentageOver100 = !!totalTaxPercentage && totalTaxPercentage > 100;
  const color = totalTaxPercentage
    ? totalTaxPercentage > 100
      ? 'red'
      : totalTaxPercentage > 50
      ? 'orange'
      : 'blue'
    : 'blue';

  return (
    <Page>
      <InputCard />
      <Card className={classes.results} withBorder p="md" radius="md" pos="relative">
        <LoadingOverlay
          visible={
            (snap.incomeCurrency !== BASE_CURRENCY ||
              (snap.deductibleExpenses !== 0 && snap.deductibleExpensesCurrency !== BASE_CURRENCY)) &&
            exchangeRatesLoading
          }
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <div className={classes.resultTexts}>
          <Text className={classes.resultText} fz={22}>
            Vei plăti ciolacilor în {NEXT_YEAR}
          </Text>
          <div>
            <Text fz="sm" c="dimmed">
              În total
            </Text>
            <Text className={classes.resultText} c={color} fz={36}>
              {formatAsBaseCurrency(totalTaxAmount)}
            </Text>
          </div>
          <Group>
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                CAS
                <br />
                (pensie)
              </Text>
              <Text className={classes.resultText}>{formatAsBaseCurrency(pensionTaxAmount)}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                CASS
                <br />
                (sănătate)
              </Text>
              <Text className={classes.resultText}>{formatAsBaseCurrency(healthTaxAmount)}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Impozit
                <br />
                pe venit
              </Text>
              <Text className={classes.resultText}>{formatAsBaseCurrency(incomeTaxAmount)}</Text>
            </div>
          </Group>
        </div>
        <div className={classes.resultRing}>
          <RingProgress
            roundCaps
            thickness={10}
            size={240}
            sections={[{ value: totalTaxPercentage || 0, color }]}
            label={
              <div>
                <Text ta="center" fz="sm" mt={-10} c="dimmed">
                  Adică
                  <br />
                  {totalTaxPercentageOver100 ? (
                    <Text component="span" fz="sm" c={color} fw="bold">
                      mai mult de
                    </Text>
                  ) : (
                    'aproximativ'
                  )}
                </Text>
                <Text ta="center" c={color} fz={64} className={classes.resultText}>
                  {formatAsPercentage(totalTaxPercentageOver100 ? 100 : totalTaxPercentage)}
                </Text>
                <Text ta="center" fz="sm" mt={2} c="dimmed">
                  din venitul tău
                </Text>
              </div>
            }
          />
        </div>
      </Card>
      <FootNotes grossIncome={grossIncome} exchangeRates={exchangeRates} />
    </Page>
  );
}
