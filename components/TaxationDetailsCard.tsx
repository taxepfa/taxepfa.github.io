import { Card, Flex, MantineColor, MantineStyleProps, Text } from '@mantine/core';
import { NEXT_YEAR } from '~/lib/config';
import { formatAsBaseCurrency } from '~/lib/format';
import { ExchangeRatesLoadingOverlay } from './ExchangeRatesLoadingOverlay';
import { IncomePercentageRing } from './IncomePercentageRing';

export type TaxationDetailsCardProps = {
  accentColor: MantineColor;
  totalTaxPercentage: number | undefined;
  totalTaxAmountInBaseCurrency: number | undefined;
  pensionTaxAmountInBaseCurrency: number | undefined;
  healthTaxAmountInBaseCurrency: number | undefined;
  incomeTaxAmountInBaseCurrency: number | undefined;
  exchangeRatesLoading: boolean;
};

export function TaxationDetailsCard({
  accentColor,
  totalTaxPercentage,
  totalTaxAmountInBaseCurrency,
  pensionTaxAmountInBaseCurrency,
  healthTaxAmountInBaseCurrency,
  incomeTaxAmountInBaseCurrency,
  exchangeRatesLoading,
}: TaxationDetailsCardProps) {
  const textAlign: MantineStyleProps['ta'] = { base: 'center', xs: 'left' };
  return (
    <Card p="md" radius="md" pos="relative">
      <Flex direction={{ base: 'column', xs: 'row' }} align={{ base: 'center', xs: 'flex-start' }}>
        <ExchangeRatesLoadingOverlay exchangeRatesLoading={exchangeRatesLoading} />
        <Flex direction="column" gap={{ base: 'sm', xs: 'lg' }} align={{ base: 'center', xs: 'flex-start' }}>
          <Text fw={700} fz={24} lh={1.25} mt={{ base: 'xs', xs: 'md' }} ta={textAlign}>
            Vei plăti ciolacilor <span className="nowrap">în {NEXT_YEAR}</span>
          </Text>
          <div>
            <Text fz="sm" c="dimmed" ta={textAlign}>
              În total
            </Text>
            <Text fw={700} lh={1} c={accentColor} fz={36}>
              {formatAsBaseCurrency(totalTaxAmountInBaseCurrency)}
            </Text>
          </div>
          <Flex gap={{ base: 'xs', sm: 'xl' }}>
            <div>
              <Text size="sm" c="dimmed" mb={4} ta={textAlign}>
                CAS
                <br />
                (pensie)
              </Text>
              <Text fw={700} lh={1} className="nowrap" ta={textAlign}>
                {formatAsBaseCurrency(pensionTaxAmountInBaseCurrency)}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={4} ta={textAlign}>
                CASS
                <br />
                (sănătate)
              </Text>
              <Text fw={700} lh={1} className="nowrap" ta={textAlign}>
                {formatAsBaseCurrency(healthTaxAmountInBaseCurrency)}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={4} ta={textAlign}>
                Impozit
                <br />
                pe venit
              </Text>
              <Text fw={700} lh={1} className="nowrap" ta={textAlign}>
                {formatAsBaseCurrency(incomeTaxAmountInBaseCurrency)}
              </Text>
            </div>
          </Flex>
        </Flex>
        <IncomePercentageRing type="tax" value={totalTaxPercentage} color={accentColor} />
      </Flex>
    </Card>
  );
}
