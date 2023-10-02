'use client';

import { Card, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { Area, AreaChart, CartesianGrid, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import { useSnapshot } from 'valtio';
import { ChartTooltip } from '~/components/ChartTooltip';
import { FootNotes } from '~/components/FootNotes';
import { InputCard } from '~/components/InputCard';
import { Page } from '~/components/Page';
import { BASE_CURRENCY, TAXES, TAX_NAMES } from '~/lib/config';
import { formatAsInteger } from '~/lib/format';
import { state } from '~/lib/state';
import { useTaxesChart } from '~/lib/taxes';

export default function ChartPage() {
  const snap = useSnapshot(state);
  const { data, grossIncome, totalTaxPercentage, exchangeRates, exchangeRatesLoading } = useTaxesChart(snap);

  const { ref, width } = useElementSize();
  const { colors } = useMantineTheme();

  const taxColors = {
    healthTaxPercentage: colors.red[6],
    pensionTaxPercentage: colors.blue[6],
    incomeTaxPercentage: colors.green[6],
  } as const;

  const yTicks = [0, 50];
  if (totalTaxPercentage && totalTaxPercentage < 50) {
    const tick = Number(totalTaxPercentage.toFixed(2));
    if (!yTicks.includes(tick)) yTicks.push(tick);
    yTicks.sort();
  }

  return (
    <Page>
      <InputCard />
      <Card ref={ref} p="md" h={width ? 'auto' : 180} withBorder radius="md">
        <LoadingOverlay
          visible={
            !width ||
            ((snap.incomeCurrency !== BASE_CURRENCY ||
              (snap.deductibleExpenses !== 0 && snap.deductibleExpensesCurrency !== BASE_CURRENCY)) &&
              exchangeRatesLoading)
          }
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        {width > 0 && (
          <AreaChart
            width={width}
            height={width / 1.6 + 80}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" cursor={'pointer'} />
            <XAxis
              dataKey="income"
              tickFormatter={(v) => `${formatAsInteger(v)} ${snap.incomeCurrency}`}
              angle={-45}
              textAnchor="end"
            />
            <YAxis domain={[0, 50]} allowDataOverflow ticks={yTicks} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload) return null;
                return (
                  <ChartTooltip {...payload![0].payload} incomeCurrency={snap.incomeCurrency} taxColors={taxColors} />
                );
              }}
            />
            {TAXES.map((tax) => (
              <Area key={tax} type="monotone" dataKey={tax} stackId="1" stroke={taxColors[tax]} fill={taxColors[tax]} />
            ))}
            <ReferenceLine y={totalTaxPercentage} stroke="currentColor" opacity={0.5} />
            <Legend wrapperStyle={{ marginBottom: -70 }} formatter={(v: keyof typeof TAX_NAMES) => TAX_NAMES[v]} />
          </AreaChart>
        )}
      </Card>
      <FootNotes grossIncome={grossIncome} exchangeRates={exchangeRates} />
    </Page>
  );
}
