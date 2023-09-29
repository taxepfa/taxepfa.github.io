import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { NEXT_YEAR, YEAR } from '~/lib/config';
import { theme } from '~/theme';
import classes from './layout.module.css';

export const metadata = {
  title: `Taxe PFA în ${YEAR} | Calculator`,
  description: `Calculează taxele pe care trebuie să le plătești ca PFA în ${NEXT_YEAR} pentru veniturile din ${YEAR}.`,
  keywords: `pfa, freelancing, taxe, calculator, grafic, contabilitate, fiscalitate, venituri, impozit, contributii, ${YEAR}, ${NEXT_YEAR}`,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ro">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body className={classes.body}>
        <MantineProvider theme={theme}>
          <Notifications position="top-center" />
          <Header />
          <Container size="sm" className={classes.container}>
            {children}
            <Footer />
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
