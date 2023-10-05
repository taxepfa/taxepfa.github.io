import { Card, Text, TextProps } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { BASE_CURRENCY } from '~/lib/config';
import { ExchangeRates } from '~/lib/exchangeRates';
import { formatAsBaseCurrency, formatExchangeRate } from '~/lib/format';
import { state } from '~/lib/state';
import { ExchangeRatesLoadingOverlay } from './ExchangeRatesLoadingOverlay';
import classes from './SettingsInfoCard.module.css';

const commonTextProps: TextProps = { size: 'sm', ta: 'center' };

export type SettingsInfoCardProps = {
  grossIncomeOverVATThreshold: boolean | undefined;
  exchangeRates: ExchangeRates | undefined;
  exchangeRatesLoading: boolean | undefined;
};

export function SettingsInfoCard({
  grossIncomeOverVATThreshold,
  exchangeRatesLoading,
  exchangeRates,
}: SettingsInfoCardProps) {
  const { vatThreshold, income, incomeCurrency, minimumWage, deductibleExpenses, deductibleExpensesCurrency } =
    useSnapshot(state);
  const usedExchangeRates = [];
  if (income && incomeCurrency && incomeCurrency !== BASE_CURRENCY && exchangeRates) {
    usedExchangeRates.push({
      value: exchangeRates[incomeCurrency],
      currency: incomeCurrency,
    });
  }
  if (
    deductibleExpenses &&
    deductibleExpensesCurrency &&
    deductibleExpensesCurrency !== BASE_CURRENCY &&
    deductibleExpensesCurrency !== incomeCurrency &&
    exchangeRates
  ) {
    usedExchangeRates.push({
      value: exchangeRates[deductibleExpensesCurrency],
      currency: deductibleExpensesCurrency,
    });
  }
  const usedExchangeRatesCount = usedExchangeRates.length;
  const multipleExchangeRates = usedExchangeRatesCount > 1;

  return (
    <Card className={classes.root} p="md" withBorder radius="md" pos="relative" display="flex">
      <ExchangeRatesLoadingOverlay exchangeRatesLoading={exchangeRatesLoading} />
      <IconInfoCircle className={clsx(classes.icon, { [classes.warning]: grossIncomeOverVATThreshold })} />
      <div>
        {grossIncomeOverVATThreshold && (
          <Text {...commonTextProps} c="orange">
            Plafonul de TVA este de <span className="nowrap">{formatAsBaseCurrency(vatThreshold)}</span> pe an.
          </Text>
        )}
        <Text {...commonTextProps}>
          Salariul minim pe economie <span className="nowrap">este de {formatAsBaseCurrency(minimumWage)}</span>.
        </Text>
        {usedExchangeRatesCount > 0 && (
          <Text {...commonTextProps}>
            Cursu{multipleExchangeRates ? 'rile' : 'l'} de schimb folosit{multipleExchangeRates ? 'e' : ''}:{' '}
            {usedExchangeRates.map((rate, index) => (
              <span key={rate.currency} className="nowrap">
                {index === 1 ? ' și ' : ''}
                {formatExchangeRate(rate)}
              </span>
            ))}
            .
          </Text>
        )}
      </div>
      <Text {...commonTextProps}>
        Vezi aici <Link href="/setari">setârile</Link>.
      </Text>
    </Card>
  );
}
