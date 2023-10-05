import { MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useWidthAbove(breakpoint: MantineSize) {
  const { breakpoints } = useMantineTheme();
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}
