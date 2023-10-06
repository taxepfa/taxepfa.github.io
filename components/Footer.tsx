import { Text } from '@mantine/core';
import { AUTHOR_NAME, AUTHOR_URL } from '~/lib/config';
import { ExternalLink } from './ExternalLink';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.root}>
      <Text size="sm" ta="center">
        Realizat de <ExternalLink to={AUTHOR_URL}>{AUTHOR_NAME}</ExternalLink>
        .
        <br />
        Codul-sursă este disponibil pe GitHub.
        <br />
        Dacă ești dezvoltator, știi unde și cum să contribui.
        <br />
        Dacă lucrezi ca PFA, te-ar putea interesa și <ExternalLink to="https://swapp.ro">swapp.ro</ExternalLink>.
      </Text>
    </div>
  );
}
