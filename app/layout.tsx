import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';

import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { StateLoader } from '~/components/StateLoader';
import { NEXT_YEAR, YEAR } from '~/lib/config';
import { theme } from '~/theme';
import classes from './layout.module.css';

export const metadata = {
  title: `Taxe PFA în ${YEAR}`,
  description: `Calculează taxele pe care trebuie să le plătești ca PFA în ${NEXT_YEAR} pentru veniturile din ${YEAR}.`,
  keywords: `pfa, freelancing, taxe, calculator, grafic, contabilitate, fiscalitate, venituri, impozit, contributii, ${YEAR}, ${NEXT_YEAR}`,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ro">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="application-name" content="Taxe PFA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#25262b" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <StateLoader />
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
