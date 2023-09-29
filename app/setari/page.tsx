'use client';

import { Card, NumberInput, Stack, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { Page } from '~/components/Page';
import { store } from '~/lib/store';

export default function SettingsPage() {
  const settingsSnapshot = useSnapshot(store.settings);

  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Stack gap="md" mb="xs">
          <NumberInput
            hideControls
            required
            min={0}
            label="Salariul minim pe economie"
            rightSectionWidth={50}
            rightSectionPointerEvents="none"
            rightSection={
              <Text c="dimmed" fz="sm" w="100%" pr="xs" ta="right">
                RON
              </Text>
            }
            value={settingsSnapshot.minimumWage || ''}
            onChange={(val) => (store.settings.minimumWage = typeof val === 'number' ? val : null)}
            error={settingsSnapshot.minimumWage == null ? 'Scrie o valoare' : null}
          />
          <NumberInput
            hideControls
            required
            min={0}
            label="Numărul de ore de lucru pe zi"
            value={settingsSnapshot.workingHoursPerDay || ''}
            onChange={(val) => (store.settings.workingHoursPerDay = typeof val === 'number' ? val : null)}
            error={settingsSnapshot.workingHoursPerDay == null ? 'Scrie o valoare' : null}
          />
          <NumberInput
            hideControls
            required
            min={0}
            label="Numărul de zile de lucru pe lună"
            value={settingsSnapshot.workingDaysPerMonth || ''}
            onChange={(val) => (store.settings.workingDaysPerMonth = typeof val === 'number' ? val : null)}
            error={settingsSnapshot.workingDaysPerMonth == null ? 'Scrie o valoare' : null}
          />
        </Stack>
      </Card>
    </Page>
  );
}
