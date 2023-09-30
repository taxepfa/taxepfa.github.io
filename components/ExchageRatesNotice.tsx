import { Text } from '@mantine/core';
import { BASE_CURRENCY } from '~/lib/config';
import { ExchangeRates } from '~/lib/exchangeRates';
import { formatExchangeRate } from '~/lib/format';

export type ExchangeRateNoticeProps = {
  exchangeRates: ExchangeRates | undefined;
  incomeCurrency: string | null;
  deductibleExpensesCurrency: string | null;
};

export function ExchangeRatesNotice({
  exchangeRates,
  incomeCurrency,
  deductibleExpensesCurrency,
}: ExchangeRateNoticeProps) {
  const usedExchangeRates = [];
  if (incomeCurrency && incomeCurrency !== BASE_CURRENCY && exchangeRates) {
    usedExchangeRates.push({
      value: exchangeRates[incomeCurrency],
      currency: incomeCurrency,
    });
  }
  if (
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

  return usedExchangeRatesCount ? (
    <Text size="xs" c="dimmed" ta="center">
      Curs{multipleExchangeRates ? 'uri' : ''} de schimb folosit{multipleExchangeRates ? 'e' : ''}:{' '}
      {usedExchangeRates.map((rate) => formatExchangeRate(rate)).join(' și ')}.
    </Text>
  ) : null;
}
