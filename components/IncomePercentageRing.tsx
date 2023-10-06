import { Flex, MantineColor, RingProgress, Text } from '@mantine/core';
import { formatAsPercentage } from '~/lib/format';
import classes from './IncomePercentageRing.module.css';

export type IncomePercentageRingProps = {
  type: 'netIncome' | 'tax';
  value: number | undefined;
  color: MantineColor;
};

export function IncomePercentageRing({ type, value, color }: IncomePercentageRingProps) {
  const valueOver100 = !!value && value > 100;
  const negativeIncome = type === 'netIncome' && value && value < 0;
  return (
    <Flex justify={{ base: 'flex-start', xs: 'flex-end' }} className={classes.root}>
      <RingProgress
        roundCaps
        thickness={10}
        size={240}
        sections={[{ value: value || 0, color }]}
        label={
          <Text ta="center" fz="sm" c="dimmed">
            Adică
            <br />
            {negativeIncome ? (
              <>
                <Text span inherit c={color} fw={700}>
                  dai statului
                  <br />
                  <Text span inherit fz={32} lh={0.75}>
                    mai mult
                  </Text>
                </Text>
                <br />
                decât câștigi
              </>
            ) : (
              <>
                {valueOver100 ? (
                  <Text span inherit c={color} fw={700}>
                    mai mult de
                  </Text>
                ) : (
                  'aproximativ'
                )}
                <Text span inherit display="block" c={color} fz={64} fw={700} lh={1}>
                  {formatAsPercentage(valueOver100 ? 100 : value)}
                </Text>
                din venitul tău
                <br />
                brut
              </>
            )}
          </Text>
        }
      />
    </Flex>
  );
}
