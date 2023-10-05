import { Box, Card, Group, RingProgress, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { NEXT_YEAR } from '~/lib/config';
import { formatAsBaseCurrency, formatAsPercentage } from '~/lib/format';
import { useWidthAbove } from '~/lib/utils';
import { ExchangeRatesLoadingOverlay } from './ExchangeRatesLoadingOverlay';
import classes from './TaxationDetailsCard.module.css';

const MIN_RING_WIDTH = 240;
const MAX_RING_WIDTH = 320;

export type TaxationDetailsCardProps = {
  totalTaxPercentage: number | undefined;
  totalTaxAmount: number | undefined;
  pensionTaxAmount: number | undefined;
  healthTaxAmount: number | undefined;
  incomeTaxAmount: number | undefined;
  exchangeRatesLoading: boolean;
};

export function TaxationDetailsCard({
  totalTaxPercentage,
  totalTaxAmount,
  pensionTaxAmount,
  healthTaxAmount,
  incomeTaxAmount,
  exchangeRatesLoading,
}: TaxationDetailsCardProps) {
  const aboveXs = useWidthAbove('xs');
  const { width: ringWidth, ref: ringRef } = useElementSize();
  const totalTaxPercentageOver100 = !!totalTaxPercentage && totalTaxPercentage > 100;
  const color = totalTaxPercentage
    ? totalTaxPercentage > 100
      ? 'red'
      : totalTaxPercentage > 50
      ? 'orange'
      : 'blue'
    : 'blue';

  return (
    <Card className={classes.root} withBorder p="md" radius="md" pos="relative" display="flex">
      <ExchangeRatesLoadingOverlay exchangeRatesLoading={exchangeRatesLoading} />
      <Box display="flex" className={classes.textItems}>
        <Text className={classes.text} fz={24} lh={1.25}>
          Vei plăti ciolacilor <span className="nowrap">în {NEXT_YEAR}</span>
        </Text>
        <div>
          <Text fz="sm" c="dimmed">
            În total
          </Text>
          <Text className={classes.text} c={color} fz={36}>
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
            <Text className={classes.text}>{formatAsBaseCurrency(pensionTaxAmount)}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed" mb={4}>
              CASS
              <br />
              (sănătate)
            </Text>
            <Text className={classes.text}>{formatAsBaseCurrency(healthTaxAmount)}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed" mb={4}>
              Impozit
              <br />
              pe venit
            </Text>
            <Text className={classes.text}>{formatAsBaseCurrency(incomeTaxAmount)}</Text>
          </div>
        </Group>
      </Box>
      <div ref={ringRef} className={classes.ring}>
        <RingProgress
          roundCaps
          thickness={10}
          size={
            aboveXs || ringWidth === 0 ? MIN_RING_WIDTH : Math.max(MIN_RING_WIDTH, Math.min(ringWidth, MAX_RING_WIDTH))
          }
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
              <Text ta="center" c={color} fz={64} className={classes.text}>
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
  );
}
