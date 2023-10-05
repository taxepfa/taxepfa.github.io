'use client';

import { useSnapshot } from 'valtio';
import { InputCard } from '~/components/InputCard';
import { SettingsInfoCard } from '~/components/SettingsInfoCard';
import { TaxationDetailsCard } from '~/components/TaxationDetailsCard';
import { state } from '~/lib/state';
import { useTaxesCalculator } from '~/lib/taxes';

export default function HomePageContent() {
  const snap = useSnapshot(state);

  const {
    grossIncome,
    totalTaxAmount,
    totalTaxPercentage,
    pensionTaxAmount,
    healthTaxAmount,
    incomeTaxAmount,
    exchangeRates,
    exchangeRatesLoading,
  } = useTaxesCalculator(snap);

  const grossIncomeOverVATThreshold = grossIncome !== undefined && grossIncome > snap.vatThreshold;

  return (
    <>
      <InputCard grossIncomeOverVATThreshold={grossIncomeOverVATThreshold} />
      <TaxationDetailsCard
        totalTaxAmount={totalTaxAmount}
        totalTaxPercentage={totalTaxPercentage}
        healthTaxAmount={healthTaxAmount}
        pensionTaxAmount={pensionTaxAmount}
        incomeTaxAmount={incomeTaxAmount}
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
