import { LoadingOverlay } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { BASE_CURRENCY } from '~/lib/config';
import { state } from '~/lib/state';

export type ExchangeRatesLoadingOverlayProps = {
  exchangeRatesLoading: boolean | undefined;
};

export function ExchangeRatesLoadingOverlay({ exchangeRatesLoading }: ExchangeRatesLoadingOverlayProps) {
  const snap = useSnapshot(state);

  return (
    <LoadingOverlay
      visible={
        (snap.incomeCurrency !== BASE_CURRENCY ||
          (snap.deductibleExpenses !== 0 && snap.deductibleExpensesCurrency !== BASE_CURRENCY)) &&
        exchangeRatesLoading
      }
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
    />
  );
}
