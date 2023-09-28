import { Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <Text className={classes.root} size="xs" c="dimmed" ta="center">
      Realizat de{' '}
      <a className={classes.link} href="https://github.com/icflorescu" target="_blank">
        Ionut-Cristian Florescu
      </a>
      .
      <br />
      Dacă lucrezi ca PFA, te-ar putea interesa și{' '}
      <a className={classes.link} href="https://swapp.ro" target="_blank">
        swapp.ro
      </a>
      .
    </Text>
  );
}
