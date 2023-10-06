import { Card, Text, TextProps, Title, TitleProps } from '@mantine/core';
import { Metadata } from 'next';
import { ExternalLink } from '~/components/ExternalLink';
import { Page } from '~/components/Page';
import { APP_NAME, AUTHOR_NAME, AUTHOR_URL, YEAR } from '~/lib/config';

const textProps: TextProps = { size: 'sm', mb: 'sm' };
const subtitleProps: TitleProps = { order: 3, size: 'sm', mt: 'md', mb: 'sm' };

export const metadata: Metadata = {
  title: `Despre proiect | ${APP_NAME}`,
  description: `Află cum, de ce și cine a dezvoltat proiectul ${APP_NAME} - un calculator care te ajută să estimezi rapid taxele pe care va trebui să le plătești ca PFA în ${YEAR} pentru veniturile din ${YEAR}`,
};

export default function AboutPage() {
  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Title order={2} mt="xs" mb="xl">
          Despre proiect
        </Title>
        <Text {...textProps}>
          Am construit acest calculator rapid de taxe pentru PFA folosind TypeScript, React, Next.js,{' '}
          <ExternalLink to="https://mantine.dev">Mantine</ExternalLink>,{' '}
          <ExternalLink to="https://valtio.pmnd.rs/docs/introduction/getting-started">Valtio</ExternalLink> și un pic de{' '}
          <em>common-sense</em>.
        </Text>
        <Title {...subtitleProps}>De ce l-am făcut?</Title>
        <Text {...textProps}>
          Pentru că după ce ciolacii au mărit birurile, în presa românească au apărut tot felul de articole în care
          diverși autointitulați experți în fiscalitate au declarat că activitatea desfășurată PFA nu este rentabilă și
          că ar trebui să-ți înființezi o firmă.
        </Text>
        <Text {...textProps}>Ceea ce este fals.</Text>
        <Text {...textProps}>
          Nu uita că o parte din acești experți sunt contabili care au un interes direct în a-ți vinde servicii de
          contabilitate, nu privesc <em>the big picture</em> din punctul <strong>tău</strong> de vedere, sau pur și
          simplu scriu pentru <em>click-bait</em>.
        </Text>
        <Text {...textProps}>
          Dacă îți vei înființa o firmă, vei avea un <em>overhead</em> administrativ mai mare și va trebui să
          contractezi serviciile unui contabil pe care îl vei plăti lunar, indiferent dacă ai sau nu venituri.
        </Text>
        <Text {...textProps}>
          Dacă lucrezi ca <em>freelancer</em> și nu ești un angajat disimulat în PFA sau SRL, probabil că nu vei avea
          venituri constante, sau poate chiar vei avea perioade în care, din diverse motive, nu vei încasa nimic. Poate
          că îti vei permite o vacanță sabatică, poate că vei decide că ceea ce ai câștigat în lunile anterioare este
          suficient pentru a-ți permite să nu lucrezi o perioadă și să îți folosești timpul pentru a învăța ceva nou.
        </Text>
        <Text {...textProps}>
          Dacă ești PFA și îți ții singur contabilitatea în perioadele în care nu ai venituri, nu trebuie să depui nicio
          declarație și nu va trebui să plătești pe nimeni.
        </Text>
        <Text {...textProps}>
          Cu alte cuvinte, poți lucra <em>on-and-off</em>, iar atunci când ești <em>off</em>, nu vei avea nicio
          cheltuială sau bătaie de cap.
        </Text>
        <Text {...textProps}>
          Nu mă declar expert, însă nu vorbesc din <span className="nowrap">(‿|‿)</span>, ci din experiență. De-a lungul
          anilor am lucrat ca angajat, ca PFA, și pentru o perioadă de timp am deținut o firmă.
        </Text>
        <Text {...textProps}>
          Sper ca acest calculator să te ajute să iei o decizie informată în ceea ce privește statutul tău fiscal.
        </Text>
        <Title {...subtitleProps}>
          De ce să plătesc CASS dacă nu am venit?
          <br />
          Nu cumva e o greșeală în formula de calcul?
        </Title>
        <Text {...textProps}>
          Nu, nu este o greșeală.
          <br />
          Sau dacă există, aceasta nu se află în acest calculator, ci în modificarea adusă Codului Fiscal în toamna
          anului 2023 fără nici un studiu real de impact și fără nicio considerație pentru cei care lucrează ca PFA și
          se pot afla în această situație.
          <br />
          Cu alte cuvinte trebuie să plătești CASS, chiar dacă ajungi în pierdere, pentru că așa au decretat ciolacii că{' '}
          <strong>datorezi</strong>.
          <br />
          În documentul legislativ intitulat{' '}
          <em>
            „LEGE privind unele măsuri fiscal bugetare pentru asigurarea sustenabilității financiare a Rom‚niei pe
            termen lung”
          </em>{' '}
          există următorul paragraf ambiguu:
        </Text>
        <Text {...textProps} fs="italic" pl="sm">
          (5) În situația în care baza de calcul prevăzută la art. 170 alin. (1), cumulată din una sau mai multe surse
          de venit din cele prevăzute la art. 155 alin. (1) lit. b), corespunzătoare veniturilor estimate/realizate sau
          pentru care s-a aplicat reținerea la sursă în cursul anului, după caz, este mai mică decât cea corespunzătoare
          unei baze de calcul egală cu nivelul de 6 salarii minime brute pe țară în vigoare la termenul de depunere a
          declarației prevăzute la art. 120, persoanele fizice <strong>datorează</strong> o diferență de contribuție de
          asigurări sociale de sănătate până la nivelul celei corespunzătoare bazei de calcul egală cu 6 salarii minime
          brute pe țară în vigoare la termenul de depunere a declarației prevăzute la art. 120 şi depun 18 declarația
          prevăzută la art. 122, până la data de 25 mai inclusiv a anului următor celui de realizare a veniturilor.
        </Text>
        <Text {...textProps}>
          Cost of doing honest business in Romania.
          <br />
          Poți să o privești ca pe o „taxă de protecție”.
          <br />
          Dar hei, stai liniștit, totul va fi bine.
          <br />
          Guvernul și organele statului au nevoie de mici antreprenori ca tine și de aceea lucrează neîncetat pentru
          bunăstarea ta. Nu am nicio îndoială că în cele din urmă vei primi înapoi banii pe care i-ai plătit, sub forma
          unor servicii de sănătate la cele mai înalte standarde.
        </Text>
        <Title {...subtitleProps}>Despre autor</Title>
        <Text {...textProps}>
          Sunt <ExternalLink to={AUTHOR_URL}>{AUTHOR_NAME}</ExternalLink>
          , dezvoltator software/web cu peste 20 ani de experiență în domeniu.
          <br />
          Am lucrat pentru companii mari din România și din străinătate, dar și pentru clienți mici și mijlocii, atât în
          calitate de angajat, cât și ca <em>freelancer</em>.
        </Text>
        <Text {...textProps}>
          În ultimii ani m-am concentrat pe dezvoltarea de aplicații web folosind tehnologii precum React/Next.js,
          Svelte/SvelteKit, Node.js, TypeScript, tRPC, GraphQL, PostgreSQL, Docker, etc.
        </Text>
        <Text {...textProps}>
          Sunt autorul unui număr de proiecte open-source de succes, printre care{' '}
          <ExternalLink to="https://icflorescu.github.io/mantine-datatable/">Mantine DataTable</ExternalLink>,{' '}
          <ExternalLink to="https://icflorescu.github.io/mantine-contextmenu/">Mantine ContextMenu</ExternalLink>,{' '}
          <ExternalLink to="https://icflorescu.github.io/trpc-sveltekit/">tRPC-SvelteKit</ExternalLink>,{' '}
          <ExternalLink to="https://pocketbase-uml.github.io">PocketBaseUML</ExternalLink>,{' '}
          <ExternalLink to="https://github.com/icflorescu/expose-wsl">Expose-WSL</ExternalLink>,{' '}
          <ExternalLink to="https://github.com/icflorescu/iisexpress-proxy">IISExpressProxy</ExternalLink> și{' '}
          <ExternalLink to={AUTHOR_URL}>altele</ExternalLink>.
        </Text>
        <Text {...textProps}>
          Pe GitHub mă găsești <ExternalLink to={AUTHOR_URL}>aici</ExternalLink>, iar pe LinkedIn{' '}
          <ExternalLink to="https://www.linkedin.com/in/icflorescu/">aici</ExternalLink>.
        </Text>
        <Text {...textProps}>
          Dacă ai nevoie de ajutor în dezvoltare web care implică vreuna din tehnologiile menționate mai sus, nu ezita
          să-mi dai un semn la adresa de email menționată în{' '}
          <ExternalLink to={AUTHOR_URL}>contul meu de GitHub</ExternalLink>.
        </Text>
      </Card>
    </Page>
  );
}
