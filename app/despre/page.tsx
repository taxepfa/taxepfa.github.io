import { Card, Text, Title } from '@mantine/core';
import { Page } from '~/components/Page';
import { AUTHOR_NAME, AUTHOR_URL } from '~/lib/config';

export default function AboutPage() {
  return (
    <Page>
      <Card p="md" withBorder radius="md">
        <Title order={2} mt="xs" mb="xl">
          Despre proiect
        </Title>
        <Text size="sm" mb="sm">
          Acest calculator rapid de taxe pentru PFA a fost realizat de{' '}
          <a href={AUTHOR_URL} target="_blank">
            {AUTHOR_NAME}
          </a>{' '}
          cu TypeScript, React, Next.js,{' '}
          <a href="https://mantine.dev" target="_blank">
            Mantine
          </a>
          ,{' '}
          <a href="https://valtio.pmnd.rs/docs/introduction/getting-started" target="_blank">
            Valtio
          </a>{' '}
          și un pic de <em>common-sense</em>.
        </Text>
        <Title order={3} size="sm" mt="md" mb="sm">
          De ce?
        </Title>
        <Text size="sm" mb="sm">
          Pentru că după ce ciolacii au mărit birurile, în presa românească au apărut tot felul de articole în care
          diverși autointitulați experți în fiscalitate au declarat că activitatea desfășurată PFA nu este rentabilă și
          că ar trebui să-ți înființezi o firmă.
        </Text>
        <Text size="sm" mb="sm">
          Ceea ce este fals.
        </Text>
        <Text size="sm" mb="sm">
          Nu uita că o parte din acești experți sunt contabili care au un interes direct în a-ți vinde servicii de
          contabilitate, nu privesc <em>the big picture</em> din punctul <strong>tău</strong> de vedere, sau pur și
          simplu scriu pentru <em>click-bait</em>.
        </Text>
        <Text size="sm" mb="sm">
          Dacă îți vei înființa o firmă, vei avea un <em>overhead</em> administrativ mai mare și va trebui să
          contractezi serviciile unui contabil pe care îl vei plăti lunar, indiferent dacă ai sau nu venituri.
        </Text>
        <Text size="sm" mb="sm">
          Dacă lucrezi ca <em>freelancer</em> și nu ești un angajat disimulat în PFA sau SRL, probabil că nu vei avea
          venituri constante, sau poate chiar vei avea perioade în care, din diverse motive, nu vei încasa nimic. Poate
          că îti vei permite o vacanță sabatică, poate că vei decide că ceea ce ai câștigat în lunile anterioare este
          suficient pentru a-ți permite să nu lucrezi o perioadă și să îți folosești timpul pentru a învăța ceva nou.
        </Text>
        <Text size="sm" mb="sm">
          Dacă ești PFA și îți ții singur contabilitatea în perioadele în care nu ai venituri, nu trebuie să depui nicio
          declarație și nu va trebui să plătești pe nimeni.
        </Text>
        <Text size="sm" mb="sm">
          Cu alte cuvinte, poți lucra <em>on-and-off</em>, iar atunci când ești <em>off</em>, nu vei avea nicio
          cheltuială sau bătaie de cap.
        </Text>
        <Text size="sm" mb="sm">
          Nu mă declar expert, însă nu vorbesc din (‿|‿), ci din experiență. De-a lungul anilor am lucrat ca angajat, ca
          PFA, și pentru o perioadă de timp am deținut o firmă.
        </Text>
        <Text size="sm" mb="sm">
          Sper ca acest calculator să te ajute să iei o decizie informată în ceea ce privește statutul tău fiscal.
        </Text>
        <Title order={3} size="sm" mt="md" mb="sm">
          Despre autor
        </Title>
        <Text size="sm" mb="sm">
          Sunt{' '}
          <a href={AUTHOR_URL} target="_blank">
            {AUTHOR_NAME}
          </a>
          , dezvoltator software/web cu peste 20 ani de experiență în domeniu.
          <br />
          Am lucrat pentru companii mari din România și din străinătate, dar și pentru clienți mici și mijlocii, atât în
          calitate de angajat, cât și ca <em>freelancer</em>.
        </Text>
        <Text size="sm" mb="sm">
          În ultimii ani m-am concentrat pe dezvoltarea de aplicații web folosind tehnologii precum React/Next.js,
          Svelte/SvelteKit, Node.js, TypeScript, tRPC, GraphQL, PostgreSQL, Docker, etc.
        </Text>
        <Text size="sm" mb="sm">
          Sunt autorul unui număr de proiecte open-source de succes, printre care{' '}
          <a href="https://icflorescu.github.io/mantine-datatable/" target="_blank">
            Mantine DataTable
          </a>
          ,{' '}
          <a href="https://icflorescu.github.io/mantine-contextmenu/" target="_blank">
            Mantine ContextMenu
          </a>
          ,{' '}
          <a href="https://icflorescu.github.io/trpc-sveltekit/" target="_blank">
            tRPC-SvelteKit
          </a>
          ,{' '}
          <a href="https://pocketbase-uml.github.io" target="_blank">
            PocketBaseUML
          </a>
          ,{' '}
          <a href="https://github.com/icflorescu/expose-wsl" target="_blank">
            Expose-WSL
          </a>
          ,{' '}
          <a href="https://github.com/icflorescu/iisexpress-proxy" target="_blank">
            IISExpressProxy
          </a>{' '}
          și{' '}
          <a href={AUTHOR_URL} target="_blank">
            altele
          </a>
          .
        </Text>
        <Text size="sm" mb="sm">
          Pe GitHub mă găsești{' '}
          <a href={AUTHOR_URL} target="_blank">
            aici
          </a>
          , iar pe LinkedIn{' '}
          <a href="https://www.linkedin.com/in/icflorescu/" target="_blank">
            aici
          </a>
          .
        </Text>
        <Text size="sm" mb="lg">
          Dacă ai nevoie de ajutor în dezvoltare web care implică vreuna din tehnologiile menționate mai sus, nu ezita
          să-mi dai un semn la adresa de email menționată în{' '}
          <a href={AUTHOR_URL} target="_blank">
            contul meu de GitHub
          </a>
          .
        </Text>
      </Card>
    </Page>
  );
}
