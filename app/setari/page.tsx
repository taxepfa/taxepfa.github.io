import { Metadata } from 'next';
import { Page } from '~/components/Page';
import { APP_NAME, YEAR } from '~/lib/config';
import SettingsPageContent from './SettingsPageContent';

export const metadata: Metadata = {
  title: `Setări | ${APP_NAME}`,
  description: `Setează salariul minim pe economie și plafonul de TVA pentru a estima rapid taxele pe care va trebui să le plătești ca PFA în ${YEAR} pentru veniturile din ${YEAR}`,
};

export default function SettingsPage() {
  return (
    <Page>
      <SettingsPageContent />
    </Page>
  );
}
