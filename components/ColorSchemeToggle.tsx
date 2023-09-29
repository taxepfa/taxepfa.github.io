'use client';

import { Box, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import clsx from 'clsx';
import classes from './ColorSchemeToggle.module.css';

export type ColorSchemeToggleProps = {
  className: string;
  textClassName: string;
  text: string;
};

export function ColorSchemeToggle({ className, textClassName, text }: ColorSchemeToggleProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Box
      component="button"
      className={clsx(classes.root, className)}
      aria-label="Schimbă tema"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    >
      <IconSun size={20} stroke={1.5} className={classes.light} />
      <IconMoon size={20} stroke={1.5} className={classes.dark} />
      <div className={textClassName}>{text}</div>
    </Box>
  );
}
