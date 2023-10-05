import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { INCOME_INTERVALS, IncomeInterval, TAXES, TAX_CHART_COLORS, TAX_NAMES } from '~/lib/config';
import { formatAsDecimalPercentage, formatAsInteger } from '~/lib/format';
import classes from './ChartTooltip.module.css';

export type ChartTooltipProps = {
  income: number;
  incomeInterval: IncomeInterval;
  incomeCurrency: string;
  healthTaxPercentage: number;
  pensionTaxPercentage: number;
  incomeTaxPercentage: number;
};

export function ChartTooltip(props: ChartTooltipProps) {
  const { income, incomeCurrency, incomeInterval, healthTaxPercentage, pensionTaxPercentage, incomeTaxPercentage } =
    props;
  const totalTaxPercentage = healthTaxPercentage + pensionTaxPercentage + incomeTaxPercentage;
  const { colors } = useMantineTheme();
  return (
    <Box py="xs" className={classes.root}>
      <Group justify="space-between" px="xs" pb={6} mb={6} className={classes.header}>
        <Text size="xs" fw="bold">
          Venit:
        </Text>
        <Text size="xs" fw="bold">
          {formatAsInteger(income)} {incomeCurrency} {INCOME_INTERVALS.find((i) => i.value === incomeInterval)?.label}
        </Text>
      </Group>
      {TAXES.map((tax) => {
        const taxPercentage = props[tax];
        const color = colors[TAX_CHART_COLORS[tax]][6];
        return (
          <Group key={tax} justify="space-between" px="xs">
            <Text size="xs" c={color} fw="bold">
              {TAX_NAMES[tax]}:
            </Text>
            <Text size="xs" c={color} fw="bold">
              {taxPercentage > 100 ? 'peste 100%' : formatAsDecimalPercentage(taxPercentage)}
            </Text>
          </Group>
        );
      })}
      <Group justify="space-between" px="xs" pt={8} mt={6} className={classes.footer}>
        <Text size="xs" fw="bold">
          Total taxe:
        </Text>
        <Text size="xs" fw="bold">
          {totalTaxPercentage > 100 ? 'peste 100%' : formatAsDecimalPercentage(totalTaxPercentage)}
        </Text>
      </Group>
    </Box>
  );
}
