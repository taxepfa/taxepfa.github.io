import { Box, Group, Text } from '@mantine/core';
import { TAXES, TAX_NAMES } from '~/lib/config';
import { formatAsDecimalPercentage, formatAsInteger } from '~/lib/format';
import classes from './ChartTooltip.module.css';

export type ChartTooltipProps = {
  income: number;
  incomeCurrency: string;
  healthTaxPercentage: number;
  pensionTaxPercentage: number;
  incomeTaxPercentage: number;
  taxColors: Record<string, string>;
};

export function ChartTooltip(props: ChartTooltipProps) {
  const { income, incomeCurrency, healthTaxPercentage, pensionTaxPercentage, incomeTaxPercentage } = props;
  const totalTaxPercentage = healthTaxPercentage + pensionTaxPercentage + incomeTaxPercentage;
  return (
    <Box py="xs" className={classes.root}>
      <Group justify="space-between" px="xs" pb={6} mb={6} className={classes.header}>
        <Text size="xs" fw="bold">
          Venit:
        </Text>
        <Text size="xs" fw="bold">
          {formatAsInteger(income)} {incomeCurrency}
        </Text>
      </Group>
      {TAXES.map((tax) => (
        <Group key={tax} justify="space-between" px="xs">
          <Text size="xs" c={props.taxColors[tax]} fw="bold">
            {TAX_NAMES[tax]}:
          </Text>
          <Text size="xs" c={props.taxColors[tax]} fw="bold">
            {props[tax] > 100 ? 'peste 100%' : formatAsDecimalPercentage(props[tax])}
          </Text>
        </Group>
      ))}
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
