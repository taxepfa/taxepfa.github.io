'use client';

import { useSnapshot } from 'valtio';
import { FootNotes } from '~/components/FootNotes';
import { InputCard } from '~/components/InputCard';
import { state } from '~/lib/state';
import { useTaxesCalculator } from '~/lib/taxes';
import { HomePageOutputCard } from './HomePageOutputCard';

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
      <HomePageOutputCard
        totalTaxAmount={totalTaxAmount}
        totalTaxPercentage={totalTaxPercentage}
        healthTaxAmount={healthTaxAmount}
        pensionTaxAmount={pensionTaxAmount}
        incomeTaxAmount={incomeTaxAmount}
        exchangeRatesLoading={exchangeRatesLoading}
      />
      <FootNotes
        grossIncome={grossIncome}
        grossIncomeOverVATThreshold={grossIncomeOverVATThreshold}
        exchangeRates={exchangeRates}
      />
    </>
  );
}
