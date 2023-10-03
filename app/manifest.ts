import { MetadataRoute } from 'next';
import { YEAR } from '~/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Taxe PFA în ${YEAR}`,
    short_name: 'Taxe PFA',
    description: `Estimează rapid taxele PFA în pentru anul ${YEAR}`,
    start_url: '/',
    background_color: '#25262b',
    theme_color: '#25262b',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'ro',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
      },
    ],
  };
}
