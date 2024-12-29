'use client';

import {Card, NumberInput, Stack, Text} from '@mantine/core';
import {useSnapshot} from 'valtio';
import {BASE_CURRENCY} from '~/lib/config';
import {state} from '~/lib/state';

export default function SettingsPageContent() {
    const snap = useSnapshot(state);

    return (
        <Card p="md" pb="lg" withBorder radius="md">
            <Stack gap="md">
                <NumberInput
                    hideControls
                    required
                    min={0}
                    label="Salariul minim pe economie"
                    description="Reprezintă baza de calcul pentru taxe și impozite, mărită anual din pix de ciolaci"
                    rightSectionWidth={50}
                    rightSectionPointerEvents="none"
                    rightSection={
                        <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                            {BASE_CURRENCY}
                        </Text>
                    }
                    value={snap.minimumWage}
                    onChange={(val) => (state.minimumWage = val === '' ? 0 : Number(val))}
                    error={snap.vatThreshold <= 0 ? 'Scrie o valoare pozitivă' : null}
                />
                <NumberInput
                    hideControls
                    required
                    min={0}
                    label="Plafon de TVA"
                    description="Venitul anual peste care ești obligat să te înregistrezi în scopuri de TVA"
                    rightSectionWidth={50}
                    rightSectionPointerEvents="none"
                    rightSection={
                        <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                            {BASE_CURRENCY}
                        </Text>
                    }
                    value={snap.vatThreshold}
                    onChange={(val) => (state.vatThreshold = val === '' ? 0 : Number(val))}
                    error={snap.vatThreshold <= 0 ? 'Scrie o valoare pozitivă' : null}
                />
            </Stack>
        </Card>
    );
}
