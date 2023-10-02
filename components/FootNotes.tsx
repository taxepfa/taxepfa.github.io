import { Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { BASE_CURRENCY, VAT_THRESHOLD, YEAR } from '~/lib/config';
import { ExchangeRates } from '~/lib/exchangeRates';
import { formatAsBaseCurrency, formatAsInteger, formatExchangeRate } from '~/lib/format';
import { state } from '~/lib/state';

export type FootNotesProps = {
  grossIncome: number | undefined;
  exchangeRates: ExchangeRates | undefined;
};

export function FootNotes({ grossIncome, exchangeRates }: FootNotesProps) {
  const { incomeCurrency, incomeInterval, minimumWage, deductibleExpensesCurrency } = useSnapshot(state);
  const grossIncomeOverVATThreshold = grossIncome !== undefined && grossIncome > VAT_THRESHOLD;
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

  return (
    <Stack gap="xs">
      {grossIncome !== undefined && (incomeCurrency !== BASE_CURRENCY || incomeInterval !== 'yearly') && (
        <Text size="xs" c={grossIncomeOverVATThreshold ? 'red' : 'dimmed'} ta="center">
          Venitul tău brut estimat pentru anul {YEAR} este de{' '}
          <span className="nowrap">{formatAsBaseCurrency(grossIncome)}</span>.
          {grossIncomeOverVATThreshold && (
            <>
              <br />
              Vei fi obligat să te înregistrezi în scopuri de TVA!
            </>
          )}
        </Text>
      )}
      <Text size="xs" c="dimmed" ta="center" maw={360} mx="auto">
        <Link href="/setari">Presupunem</Link> că salariul minim pe economie este de{' '}
        <span className="nowrap">{formatAsInteger(minimumWage)} RON</span>.
      </Text>
      {usedExchangeRatesCount && (
        <Text size="xs" c="dimmed" ta="center">
          Curs{multipleExchangeRates ? 'uri' : ''} de schimb folosit{multipleExchangeRates ? 'e' : ''}:{' '}
          {usedExchangeRates.map((rate, index) => (
            <span key={rate.currency} className="nowrap">
              {index === 1 ? ' și ' : ''}
              {formatExchangeRate(rate)}
            </span>
          ))}
          .
        </Text>
      )}
    </Stack>
  );
}
