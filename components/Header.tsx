import { Container } from '@mantine/core';
import { IconAdjustments, IconCalculator, IconChartArea, IconInfoCircle } from '@tabler/icons-react';
import cx from 'clsx';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import classes from './Header.module.css';
import { NavLink } from './NavLink';

export function Header() {
  return (
    <header className={classes.root}>
      <Container size="sm" className={classes.container}>
        <h1 className={classes.title}>Taxe PFA în 2024</h1>
        <nav className={classes.links}>
          <NavLink
            className={classes.link}
            textClassName={classes.linkText}
            href="/"
            icon={<IconCalculator size={20} stroke={1.5} />}
            text="Calcul"
          />
          <NavLink
            className={classes.link}
            textClassName={classes.linkText}
            href="/grafic"
            icon={<IconChartArea size={20} stroke={1.5} />}
            text="Grafic"
          />
          <NavLink
            className={classes.link}
            textClassName={classes.linkText}
            href="/setari"
            icon={<IconAdjustments size={20} stroke={1.5} />}
            text="Setări"
          />
          <NavLink
            className={classes.link}
            textClassName={classes.linkText}
            href="/despre"
            icon={<IconInfoCircle size={20} stroke={1.5} />}
            text="Despre"
          />
        </nav>
        <ColorSchemeToggle
          className={cx(classes.link, classes.button)}
          textClassName={cx(classes.linkText, classes.buttonText)}
          text="Temă"
        />
      </Container>
    </header>
  );
}
