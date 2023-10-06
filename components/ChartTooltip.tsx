import { Box, Group, GroupProps, MantineColor, Text, TextProps, useMantineTheme } from '@mantine/core';
import { INCOME_INTERVALS, IncomeInterval, TAXES, TAX_CHART_COLORS, TAX_NAMES } from '~/lib/config';
import { formatAsDecimal, formatAsDecimalPercentage, formatAsInteger } from '~/lib/format';
import { ChartDataPoint } from '~/lib/taxes';
import classes from './ChartTooltip.module.css';

const commonTextProps: TextProps = { size: 'xs', fw: 'bold' };
const commonGroupProps: GroupProps = { justify: 'space-between', px: 'xs' };

export type ChartTooltipProps = {
  incomeInterval: IncomeInterval;
  incomeCurrency: string;
} & ChartDataPoint;

export function ChartTooltip(props: ChartTooltipProps) {
  const {
    income,
    incomeCurrency,
    incomeInterval,
    healthTaxPercentage,
    pensionTaxPercentage,
    incomeTaxPercentage,
    netIncome,
  } = props;
  const totalTaxPercentage = healthTaxPercentage + pensionTaxPercentage + incomeTaxPercentage;
  const incomeIntervalName = INCOME_INTERVALS.find((i) => i.value === incomeInterval)?.label;
  const { colors } = useMantineTheme();
  const negativeIncome = netIncome < 0;
  const netIncomeColor: MantineColor | undefined = negativeIncome ? 'red' : undefined;

  return (
    <Box py="xs" className={classes.root}>
      <Group {...commonGroupProps} pb={6} mb={6} className={classes.header}>
        <Text {...commonTextProps}>Venit brut:</Text>
        <Text {...commonTextProps}>
          {formatAsInteger(income)} {incomeCurrency} {incomeIntervalName}
        </Text>
      </Group>
      {TAXES.map((tax) => {
        const taxPercentage = props[tax];
        const color = colors[TAX_CHART_COLORS[tax]][6];
        return (
          <Group key={tax} {...commonGroupProps}>
            <Text {...commonTextProps} c={color}>
              {TAX_NAMES[tax]}:
            </Text>
            <Text {...commonTextProps} c={color}>
              {taxPercentage > 100 ? 'peste 100%' : formatAsDecimalPercentage(taxPercentage)}
            </Text>
          </Group>
        );
      })}
      <Box pt={8} mt={6} className={classes.footer}>
        <Group {...commonGroupProps}>
          <Text {...commonTextProps}>Total taxe:</Text>
          <Text {...commonTextProps}>
            {totalTaxPercentage > 100 ? 'peste 100%' : formatAsDecimalPercentage(totalTaxPercentage)}
          </Text>
        </Group>
        <Group {...commonGroupProps}>
          <Text {...commonTextProps} c={netIncomeColor}>
            {negativeIncome ? 'Pierdere netă' : 'Venit net'}:
          </Text>
          <Text {...commonTextProps} c={netIncomeColor}>
            {formatAsDecimal(Math.abs(netIncome))} {incomeCurrency} {incomeIntervalName}
          </Text>
        </Group>
      </Box>
    </Box>
  );
}
