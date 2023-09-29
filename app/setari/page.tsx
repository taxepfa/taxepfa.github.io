'use client';

import { Card, Grid, GridCol, NumberInput, Text } from '@mantine/core';
import { useSnapshot } from 'valtio';
import { Page } from '~/components/Page';
import { initialState, state } from '~/lib/state';

export default function SettingsPage() {
  const settingsSnapshot = useSnapshot(state.settings);

  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Grid gutter="md" pb="xs">
          <GridCol span={12}>
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
              value={settingsSnapshot.minimumWage}
              onChange={(val) =>
                (state.settings.minimumWage = typeof val === 'number' ? val : initialState.settings.minimumWage)
              }
            />
          </GridCol>
          <GridCol span={{ sm: 4 }}>
            <NumberInput
              hideControls
              required
              min={0}
              label="Ore de lucru pe zi"
              value={settingsSnapshot.workingHoursPerDay}
              onChange={(val) =>
                (state.settings.workingHoursPerDay =
                  typeof val === 'number' ? val : initialState.settings.workingHoursPerDay)
              }
            />
          </GridCol>
          <GridCol span={{ sm: 4 }}>
            <NumberInput
              hideControls
              required
              min={0}
              label="Zile de lucru pe săptămână"
              value={settingsSnapshot.workingDaysPerWeek}
              onChange={(val) =>
                (state.settings.workingDaysPerWeek =
                  typeof val === 'number' ? val : initialState.settings.workingDaysPerWeek)
              }
            />
          </GridCol>
          <GridCol span={{ sm: 4 }}>
            <NumberInput
              hideControls
              required
              min={0}
              label="Zile de lucru pe lună"
              value={settingsSnapshot.workingDaysPerMonth}
              onChange={(val) =>
                (state.settings.workingDaysPerMonth =
                  typeof val === 'number' ? val : initialState.settings.workingDaysPerMonth)
              }
            />
          </GridCol>
        </Grid>
      </Card>
    </Page>
  );
}
