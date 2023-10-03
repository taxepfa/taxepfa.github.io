import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import useSWR from 'swr';
import { BASE_CURRENCY, CURRENCIES, EXCHANGE_RATES_RELOAD_INTERVAL } from './config';

const BASE_CURRENCY_LOWER_CASE = BASE_CURRENCY.toLowerCase();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type ExchangeRates = Record<string, number>;

export function useExchangeRates() {
  const { data, isLoading } = useSWR(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${BASE_CURRENCY_LOWER_CASE.toLowerCase()}.min.json`,
    fetcher,
    {
      refreshInterval: EXCHANGE_RATES_RELOAD_INTERVAL,
      revalidateOnFocus: false,
      onError: () => {
        notifications.show({
          title: 'Eroare!',
          message: 'Cursurile de schimb valutar nu au putut fi încărcate.',
          color: 'red',
          icon: <IconX className="notification-error-icon" />,
          onClose: () => {
            notifications.clean();
          },
        });
      },
    }
  );

  let exchangeRates: ExchangeRates | undefined;

  if (data?.[BASE_CURRENCY_LOWER_CASE]) {
    exchangeRates = {};
    for (const lowerCaseCurrency of Object.keys(data[BASE_CURRENCY_LOWER_CASE])) {
      const currency = lowerCaseCurrency.toUpperCase();
      if (currency !== BASE_CURRENCY && CURRENCIES.includes(currency)) {
        exchangeRates[currency] = 1 / data[BASE_CURRENCY_LOWER_CASE][lowerCaseCurrency];
      }
    }
  }

  return {
    exchangeRates,
    exchangeRatesLoading: isLoading,
  };
}
