import { Metadata } from 'next';
import { Page } from '~/components/Page';
import { YEAR } from '~/lib/config';
import ChartPageContent from './ChartPageContent';

export const metadata: Metadata = {
  title: `Grafic | Taxe PFA în ${YEAR}`,
  description: `Vezi un grafic cu variația procentuală a taxelor pe care va trebui să le plătești ca PFA în ${YEAR} pentru veniturile din ${YEAR}`,
};

export default function ChartPage() {
  return (
    <Page>
      <ChartPageContent />
    </Page>
  );
}
