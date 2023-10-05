'use client';

import { useSnapshot } from 'valtio';
import { IncomeDetailsCard } from '~/components/IncomeDetailsCard';
import { InputCard } from '~/components/InputCard';
import { SettingsInfoCard } from '~/components/SettingsInfoCard';
import { TaxationDetailsCard } from '~/components/TaxationDetailsCard';
import { state } from '~/lib/state';
import { useTaxesCalculator } from '~/lib/taxes';

export default function HomePageContent() {
  const snap = useSnapshot(state);

  const {
    grossIncomeInBaseCurrency,
    totalTaxAmountInBaseCurrency,
    totalTaxPercentage,
    pensionTaxAmountInBaseCurrency,
    healthTaxAmountInBaseCurrency,
    incomeTaxAmountInBaseCurrency,
    netIncome,
    totalNetIncomeInBaseCurrency,
    exchangeRates,
    exchangeRatesLoading,
  } = useTaxesCalculator(snap);

  const accentColor = totalTaxPercentage
    ? totalTaxPercentage > 100
      ? 'red'
      : totalTaxPercentage > 50
      ? 'orange'
      : 'blue'
    : 'blue';

  const grossIncomeOverVATThreshold =
    grossIncomeInBaseCurrency !== undefined && grossIncomeInBaseCurrency > snap.vatThreshold;

  return (
    <>
      <InputCard grossIncomeOverVATThreshold={grossIncomeOverVATThreshold} />
      <TaxationDetailsCard
        accentColor={accentColor}
        totalTaxAmountInBaseCurrency={totalTaxAmountInBaseCurrency}
        totalTaxPercentage={totalTaxPercentage}
        healthTaxAmountInBaseCurrency={healthTaxAmountInBaseCurrency}
        pensionTaxAmountInBaseCurrency={pensionTaxAmountInBaseCurrency}
        incomeTaxAmountInBaseCurrency={incomeTaxAmountInBaseCurrency}
        exchangeRatesLoading={exchangeRatesLoading}
      />
      <IncomeDetailsCard
        accentColor={accentColor}
        totalNetIncomeInBaseCurrency={totalNetIncomeInBaseCurrency}
        netIncome={netIncome}
        grossIncomeInBaseCurrency={grossIncomeInBaseCurrency}
        totalTaxPercentage={totalTaxPercentage}
        exchangeRatesLoading={exchangeRatesLoading}
      />
      <SettingsInfoCard
        grossIncomeOverVATThreshold={grossIncomeOverVATThreshold}
        exchangeRatesLoading={exchangeRatesLoading}
        exchangeRates={exchangeRates}
      />
    </>
  );
}
