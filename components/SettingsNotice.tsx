import { Text } from '@mantine/core';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { formatAsInteger } from '~/lib/format';
import { state } from '~/lib/state';

export function SettingsNotice() {
  const settingsSnapshot = useSnapshot(state.settings);

  return (
    <Text size="xs" c="dimmed" ta="center" maw={360} mx="auto">
      <Link href="/setari">Presupunem</Link> că salariul minim pe economie este de{' '}
      {formatAsInteger(settingsSnapshot.minimumWage)} RON, timpul mediu de lucru este de{' '}
      {settingsSnapshot.workingHoursPerDay} ore pe zi, {settingsSnapshot.workingDaysPerWeek} zile pe săptămână sau{' '}
      {settingsSnapshot.workingDaysPerMonth} zile pe lună.
    </Text>
  );
}
