'use client';

import { Card, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { Area, AreaChart, CartesianGrid, Legend, ReferenceDot, Tooltip, XAxis, YAxis } from 'recharts';
import { useSnapshot } from 'valtio';
import { ChartTooltip } from '~/components/ChartTooltip';
import { FootNotes } from '~/components/FootNotes';
import { InputCard } from '~/components/InputCard';
import { Page } from '~/components/Page';
import { BASE_CURRENCY, CHART_STEPS, TAXES, TAX_CHART_COLORS, TAX_NAMES } from '~/lib/config';
import { formatAsInteger } from '~/lib/format';
import { state } from '~/lib/state';
import { useTaxesChart } from '~/lib/taxes';

export default function ChartPage() {
  const snap = useSnapshot(state);
  const { data, grossIncome, grossIncomeOverVATThreshold, totalTaxPercentage, exchangeRates, exchangeRatesLoading } =
    useTaxesChart(snap) || {};

  const { ref, width } = useElementSize();
  const { colors } = useMantineTheme();

  const yTicks = [0, 50];
  if (totalTaxPercentage && totalTaxPercentage < 50) {
    const tick = Number(totalTaxPercentage.toFixed(2));
    if (!yTicks.includes(tick)) yTicks.push(tick);
    yTicks.sort();
  }

  return (
    <Page>
      <InputCard grossIncomeOverVATThreshold={grossIncomeOverVATThreshold} />
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
              content={({ active, payload }) =>
                active && payload ? (
                  <ChartTooltip
                    {...payload![0].payload}
                    incomeCurrency={snap.incomeCurrency}
                    incomeInterval={snap.incomeInterval}
                  />
                ) : null
              }
            />
            {TAXES.map((tax) => {
              const color = colors[TAX_CHART_COLORS[tax]][6];
              return <Area key={tax} type="monotone" dataKey={tax} stackId="1" stroke={color} fill={color} />;
            })}
            <ReferenceDot
              y={totalTaxPercentage}
              x={data?.[CHART_STEPS / 2].income}
              stroke="currentColor"
              fill="transparent"
              opacity={0.75}
              r={6}
            />
            <Legend wrapperStyle={{ marginBottom: -70 }} formatter={(v: keyof typeof TAX_NAMES) => TAX_NAMES[v]} />
          </AreaChart>
        )}
      </Card>
      <FootNotes
        grossIncome={grossIncome}
        grossIncomeOverVATThreshold={grossIncomeOverVATThreshold}
        exchangeRates={exchangeRates}
      />
    </Page>
  );
}
