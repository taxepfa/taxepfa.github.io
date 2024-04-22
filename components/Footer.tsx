import { Text } from '@mantine/core';
import { AUTHOR_NAME, AUTHOR_URL, LICENSE_URL, REPO_URL } from '~/lib/config';
import { ExternalLink } from './ExternalLink';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.root}>
      <Text size="sm" ta="center">
        &copy; <ExternalLink to={AUTHOR_URL}>{AUTHOR_NAME}</ExternalLink> 2023 &mdash; {new Date().getFullYear()}.
        <br />
        Acest proiect este open-source, codul este public și{' '}
        <ExternalLink to={REPO_URL}>disponibil pe GitHub</ExternalLink> sub{' '}
        <ExternalLink to={LICENSE_URL}>licență MIT</ExternalLink>.
        <br />
        Dacă ai găsit o eroare și ești dezvoltator, ar trebui să știi unde și cum să contribui.
      </Text>
    </div>
  );
}
