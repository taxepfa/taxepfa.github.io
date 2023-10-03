import { Text } from '@mantine/core';
import { AUTHOR_NAME, AUTHOR_URL } from '~/lib/config';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <Text className={classes.root} size="xs" c="dimmed" ta="center">
      Realizat de{' '}
      <a href={AUTHOR_URL} target="_blank">
        {AUTHOR_NAME}
      </a>
      .
      <br />
      Codul-sursă este disponibil pe GitHub{' '}
      <a href="https://github.com/taxepfa/taxepfa.github.io" target="_blank">
        aici
      </a>
      .
      <br />
      Dacă lucrezi ca PFA, te-ar putea interesa și{' '}
      <a href="https://swapp.ro" target="_blank">
        swapp.ro
      </a>
      .
    </Text>
  );
}
