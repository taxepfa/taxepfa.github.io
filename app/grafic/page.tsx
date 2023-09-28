'use client';

import { Card, Grid, GridCol, LoadingOverlay, NumberInput, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useSnapshot } from 'valtio';
import { CommonInputGridCols } from '~/components/CommonInputGridCols';
import { ExchangeRatesNotice } from '~/components/ExchageRatesNotice';
import { Page } from '~/components/Page';
import { Select } from '~/components/Select';
import { CURRENCIES, INCOME_INTERVALS, IncomeInterval } from '~/lib/config';
import { formatAsDecimalPercentage, formatAsInteger } from '~/lib/format';
import { store } from '~/lib/store';
import { useTaxesChart } from '~/lib/taxes';

const TAX_NAMES = {
  healthTaxPercentage: 'CASS',
  pensionTaxPercentage: 'CAS',
  incomeTaxPercentage: 'Imp. pe venit',
};

export default function ChartPage() {
  const chartSnapshot = useSnapshot(store.chart);
  const commonSnapshot = useSnapshot(store.common);
  const settingsSnapshot = useSnapshot(store.settings);
  const { data, exchangeRates, exchangeRatesLoading } = useTaxesChart({
    chartSnapshot,
    commonSnapshot,
    settingsSnapshot,
  });

  const { ref, width } = useElementSize();
  const { colors } = useMantineTheme();

  const healthTaxColor = colors.red[6];
  const pensionTaxColor = colors.blue[6];
  const incomeTaxColor = colors.green[6];

  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Grid gutter="md">
          <GridCol span={{ base: 6, xs: 3 }}>
            <NumberInput
              hideControls
              required
              min={0}
              label="Venit de la"
              value={chartSnapshot.incomeFrom}
              onChange={(val) => (store.chart.incomeFrom = typeof val === 'number' ? val : NaN)}
              error={
                isNaN(chartSnapshot.incomeFrom)
                  ? 'Scrie o valoare'
                  : chartSnapshot.incomeFrom < 0
                  ? 'Trebuie să fie număr pozitiv'
                  : null
              }
            />
          </GridCol>
          <GridCol span={{ base: 6, xs: 3 }}>
            <NumberInput
              hideControls
              required
              min={chartSnapshot.incomeFrom || 0}
              label="Până la"
              value={chartSnapshot.incomeTo}
              onChange={(val) => (store.chart.incomeTo = typeof val === 'number' ? val : NaN)}
              error={
                isNaN(chartSnapshot.incomeTo)
                  ? 'Scrie o valoare'
                  : chartSnapshot.incomeTo <= chartSnapshot.incomeFrom
                  ? `Trebuie să fie mai mare de ${formatAsInteger(chartSnapshot.incomeFrom)}`
                  : null
              }
            />
          </GridCol>
          <GridCol span={{ base: 6, xs: 3 }}>
            <Select
              ariaLabel="Moneda venitului"
              data={CURRENCIES}
              value={chartSnapshot.incomeCurrency}
              onChange={(val: string) => (store.chart.incomeCurrency = val)}
            />
          </GridCol>
          <GridCol span={{ base: 6, xs: 3 }}>
            <Select
              ariaLabel="Intervalul pe care este estimat venitul"
              data={INCOME_INTERVALS}
              value={chartSnapshot.incomeInterval}
              onChange={(val: string) => (store.chart.incomeInterval = val as IncomeInterval)}
            />
          </GridCol>
          <CommonInputGridCols />
        </Grid>
      </Card>
      <Card ref={ref} p="md" h={width ? 'auto' : 180} withBorder radius="md">
        <LoadingOverlay
          visible={!width || exchangeRatesLoading}
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
              left: -10,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" cursor={'pointer'} />
            <XAxis
              dataKey="income"
              tickFormatter={(v) => `${formatAsInteger(v)} ${chartSnapshot.incomeCurrency}`}
              angle={-45}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} allowDataOverflow tickFormatter={(v) => `${v}%`} />
            <Tooltip
              labelFormatter={(v) => `${formatAsInteger(v)} ${chartSnapshot.incomeCurrency}`}
              formatter={(v: number, name) => {
                return [
                  v > 100 ? 'peste 100%' : formatAsDecimalPercentage(v),
                  TAX_NAMES[name as keyof typeof TAX_NAMES],
                ];
              }}
            />
            <Area
              type="monotone"
              dataKey="incomeTaxPercentage"
              stackId="1"
              stroke={incomeTaxColor}
              fill={incomeTaxColor}
            />
            <Area
              type="monotone"
              dataKey="healthTaxPercentage"
              stackId="1"
              stroke={healthTaxColor}
              fill={healthTaxColor}
            />
            <Area
              type="monotone"
              dataKey="pensionTaxPercentage"
              stackId="1"
              stroke={pensionTaxColor}
              fill={pensionTaxColor}
            />
            <Legend wrapperStyle={{ marginBottom: -70 }} formatter={(v: keyof typeof TAX_NAMES) => TAX_NAMES[v]} />
          </AreaChart>
        )}
      </Card>
      <ExchangeRatesNotice
        exchangeRates={exchangeRates}
        incomeCurrency={chartSnapshot.incomeCurrency}
        deductibleExpensesCurrency={commonSnapshot.deductibleExpensesCurrency}
      />
    </Page>
  );
}
