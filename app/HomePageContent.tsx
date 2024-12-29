'use client';

import {useSnapshot} from 'valtio';
import {IncomeDetailsCard} from '~/components/IncomeDetailsCard';
import {InputCard} from '~/components/InputCard';
import {SettingsInfoCard} from '~/components/SettingsInfoCard';
import {TaxationDetailsCard} from '~/components/TaxationDetailsCard';
import {state} from '~/lib/state';
import {useTaxesCalculator} from '~/lib/taxes';
import {Card, Text} from "@mantine/core";

export default function HomePageContent() {
    const snap = useSnapshot(state);

    const pfa = useTaxesCalculator({...snap, type: 'pfa'});

    const srlVenit = useTaxesCalculator({...snap, type: 'srl-venit'});
    const srlProfit = useTaxesCalculator({...snap, type: 'srl-profit'});

    const accentColor = pfa.totalTaxPercentage
        ? pfa.totalTaxPercentage > 100
            ? 'red'
            : pfa.totalTaxPercentage > 50
                ? 'orange'
                : 'blue'
        : 'blue';

    const grossIncomeOverVATThreshold =
        pfa.grossIncomeInBaseCurrency !== undefined && pfa.grossIncomeInBaseCurrency > snap.vatThreshold;

    return (
        <>
            <InputCard grossIncomeOverVATThreshold={grossIncomeOverVATThreshold}/>
            <Card withBorder p="md" radius="md" pos="relative">
                <Text fw={700} fz={24} lh={1.25} mt={{base: 'xs', xs: 'md'}} ta={"center"}>
                    Taxe PFA
                </Text>
                <TaxationDetailsCard
                    accentColor={accentColor}
                    totalTaxAmountInBaseCurrency={pfa.totalTaxAmountInBaseCurrency}
                    totalTaxPercentage={pfa.totalTaxPercentage}
                    healthTaxAmountInBaseCurrency={pfa.healthTaxAmountInBaseCurrency}
                    pensionTaxAmountInBaseCurrency={pfa.pensionTaxAmountInBaseCurrency}
                    incomeTaxAmountInBaseCurrency={pfa.incomeTaxAmountInBaseCurrency}
                    exchangeRatesLoading={pfa.exchangeRatesLoading}
                />
                <IncomeDetailsCard
                    accentColor={accentColor}
                    totalNetIncomeInBaseCurrency={pfa.totalNetIncomeInBaseCurrency}
                    netIncome={pfa.netIncome}
                    grossIncomeInBaseCurrency={pfa.grossIncomeInBaseCurrency}
                    totalTaxPercentage={pfa.totalTaxPercentage}
                    exchangeRatesLoading={pfa.exchangeRatesLoading}
                />
            </Card>

            <Card withBorder p="md" radius="md" pos="relative">
                <Text fw={700} fz={24} lh={1.25} mt={{base: 'xs', xs: 'md'}} ta={"center"}>
                    Taxe SRL (venit)
                </Text>
                <TaxationDetailsCard
                    accentColor={accentColor}
                    totalTaxAmountInBaseCurrency={srlVenit.totalTaxAmountInBaseCurrency}
                    totalTaxPercentage={srlVenit.totalTaxPercentage}
                    healthTaxAmountInBaseCurrency={srlVenit.healthTaxAmountInBaseCurrency}
                    pensionTaxAmountInBaseCurrency={srlVenit.pensionTaxAmountInBaseCurrency}
                    incomeTaxAmountInBaseCurrency={srlVenit.incomeTaxAmountInBaseCurrency}
                    exchangeRatesLoading={srlVenit.exchangeRatesLoading}
                />
                <IncomeDetailsCard
                    accentColor={accentColor}
                    totalNetIncomeInBaseCurrency={srlVenit.totalNetIncomeInBaseCurrency}
                    netIncome={srlVenit.netIncome}
                    grossIncomeInBaseCurrency={srlVenit.grossIncomeInBaseCurrency}
                    totalTaxPercentage={srlVenit.totalTaxPercentage}
                    exchangeRatesLoading={srlVenit.exchangeRatesLoading}
                />
            </Card>
            <Card withBorder p="md" radius="md" pos="relative">
                <Text fw={700} fz={24} lh={1.25} mt={{base: 'xs', xs: 'md'}} ta={"center"}>
                    Taxe SRL (Profit)
                </Text>
                <TaxationDetailsCard
                    accentColor={accentColor}
                    totalTaxAmountInBaseCurrency={srlProfit.totalTaxAmountInBaseCurrency}
                    totalTaxPercentage={srlProfit.totalTaxPercentage}
                    healthTaxAmountInBaseCurrency={srlProfit.healthTaxAmountInBaseCurrency}
                    pensionTaxAmountInBaseCurrency={srlProfit.pensionTaxAmountInBaseCurrency}
                    incomeTaxAmountInBaseCurrency={srlProfit.incomeTaxAmountInBaseCurrency}
                    exchangeRatesLoading={srlProfit.exchangeRatesLoading}
                />
                <IncomeDetailsCard
                    accentColor={accentColor}
                    totalNetIncomeInBaseCurrency={srlProfit.totalNetIncomeInBaseCurrency}
                    netIncome={srlProfit.netIncome}
                    grossIncomeInBaseCurrency={srlProfit.grossIncomeInBaseCurrency}
                    totalTaxPercentage={srlProfit.totalTaxPercentage}
                    exchangeRatesLoading={srlProfit.exchangeRatesLoading}
                />
            </Card>

            <SettingsInfoCard
                grossIncomeOverVATThreshold={grossIncomeOverVATThreshold}
                exchangeRatesLoading={pfa.exchangeRatesLoading}
                exchangeRates={pfa.exchangeRates}
            />
        </>
    );
}
