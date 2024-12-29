import { Card, Flex, MantineColor, MantineStyleProps, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { BASE_CURRENCY, INCOME_INTERVALS } from '~/lib/config';
import { formatAsBaseCurrency, formatAsDecimal } from '~/lib/format';
import { state } from '~/lib/state';
import { ExchangeRatesLoadingOverlay } from './ExchangeRatesLoadingOverlay';
import { IncomePercentageRing } from './IncomePercentageRing';

export type IncomeDetailsCardProps = {
  accentColor: MantineColor;
  totalNetIncomeInBaseCurrency: number | undefined;
  netIncome: number | undefined;
  grossIncomeInBaseCurrency: number | undefined;
  totalTaxPercentage: number | undefined;
  exchangeRatesLoading: boolean;
};

export function IncomeDetailsCard({
  accentColor,
  totalNetIncomeInBaseCurrency,
  netIncome,
  grossIncomeInBaseCurrency,
  totalTaxPercentage,
  exchangeRatesLoading,
}: IncomeDetailsCardProps) {
  const { incomeCurrency, incomeInterval } = useSnapshot(state);
  const positiveIncome = netIncome === undefined || netIncome >= 0;
  const textAlign: MantineStyleProps['ta'] = { base: 'center', xs: 'left' };

  return (
    <Card p="md" radius="md" pos="relative">
      <Flex direction={{ base: 'column', xs: 'row' }} align={{ base: 'center', xs: 'flex-start' }}>
        <ExchangeRatesLoadingOverlay exchangeRatesLoading={exchangeRatesLoading} />
        <Flex direction="column" gap={{ base: 'sm', xs: 'lg' }} align={{ base: 'center', xs: 'flex-start' }}>
          <Text fw={700} fz={24} lh={1.25} mt={{ base: 'xs', xs: 'md' }} ta={textAlign}>
            Vei {positiveIncome ? 'rămâne' : 'ieși pe minus'} cu
          </Text>
          <div>
            <Text fz="sm" c="dimmed" ta={textAlign}>
              {incomeCurrency === BASE_CURRENCY ? 'Suma de' : 'Echivalentul a'}
            </Text>
            <Text fw={700} lh={1} c={accentColor} ta={textAlign} fz={36}>
              {formatAsBaseCurrency(positiveIncome ? totalNetIncomeInBaseCurrency : -totalNetIncomeInBaseCurrency!)}
            </Text>
          </div>
          {(incomeCurrency !== BASE_CURRENCY || incomeInterval !== 'yearly') && (
            <div>
              <Text fz="sm" c="dimmed" ta={textAlign}>
                Adică aproximativ
              </Text>
              <Text fw={700} lh={1} ta={textAlign} className="nowrap">
                {formatAsDecimal(positiveIncome ? netIncome : -netIncome)} {incomeCurrency}
                {incomeInterval !== 'yearly' &&
                  ` ${INCOME_INTERVALS.find((interval) => interval.value === incomeInterval)?.label}`}
              </Text>
            </div>
          )}
          <div>
            <Text fz="sm" c="dimmed" ta={textAlign}>
              La un venit brut de
            </Text>
            <Text fw={700} lh={1} ta={textAlign} className="nowrap">
              {formatAsBaseCurrency(grossIncomeInBaseCurrency)}
            </Text>
          </div>
        </Flex>
        <IncomePercentageRing
          type="netIncome"
          value={totalTaxPercentage ? 100 - totalTaxPercentage : undefined}
          color={accentColor}
        />
      </Flex>
    </Card>
  );
}
