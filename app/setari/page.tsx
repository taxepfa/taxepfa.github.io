'use client';

import { Card, NumberInput, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { Page } from '~/components/Page';
import { state } from '~/lib/state';

export default function SettingsPage() {
  const snap = useSnapshot(state);

  return (
    <Page>
      <Card p="md" withBorder radius="md">
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
              RON
            </Text>
          }
          value={snap.minimumWage}
          onChange={(val) => (state.minimumWage = val = '' ? 0 : Number(val))}
          error={snap.income <= 0 ? 'Scrie o valoare pozitivă' : null}
        />
      </Card>
    </Page>
  );
}
