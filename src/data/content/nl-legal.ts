/**
 * Juridische teksten (nl). Bewust los van nl.ts: deze twee blokken
 * worden alleen door /privacy en /voorwaarden gebruikt, en die renderen
 * server-side. Zaten ze in de taalbundel, dan downloadde elke bezoeker de
 * volledige privacyverklaring en algemene voorwaarden in tweevoud mee.
 */
import { site } from '../site';

const privacy = {
  title: 'Privacyverklaring',
  metaDescription: `Privacyverklaring van ${site.legalName}: welke gegevens het offerteformulier verwerkt, waarom, en welke rechten je hebt.`,
  updated: 'Laatst bijgewerkt: juli 2026',
  intro: `${site.legalName} (hierna: “ik”) bouwt websites voor kleine ondernemers. Op deze pagina lees je hoe ik omga met de persoonsgegevens die je via ${site.url} met mij deelt. Kort samengevat: ik verzamel alleen wat jij zelf invult in het offerteformulier, ik gebruik dat uitsluitend om contact met je op te nemen, en ik verkoop of deel niets met derden voor marketing.`,
  sections: [
    {
      title: 'Welke gegevens verwerk ik?',
      body: [
        'Vul je het offerteformulier in, dan verwerk ik: je naam, bedrijfsnaam (optioneel), telefoonnummer (optioneel), e-mailadres, je eventuele opmerking en de samenstelling die je in de configurator koos (pakket, extra’s en richtprijs).',
        'Deze website gebruikt géén tracking-cookies en géén analytics. Er is daarom ook geen cookiebanner.',
      ],
    },
    {
      title: 'Waarvoor gebruik ik je gegevens?',
      body: [
        'Uitsluitend om je aanvraag te beantwoorden: ik stuur je een offerte en eventueel een demo-voorstel, en neem daarover contact met je op via e-mail, telefoon of WhatsApp — afhankelijk van wat jij invulde.',
        'De grondslag hiervoor is “uitvoering van een overeenkomst” (art. 6 lid 1 sub b AVG): jij vraagt een offerte aan, ik lever die.',
      ],
    },
    {
      title: 'Hoe lang bewaar ik je gegevens?',
      body: [
        'Word je klant, dan bewaar ik je gegevens zolang we samenwerken en daarna zolang de wet dat vereist (bijvoorbeeld de fiscale bewaarplicht van 7 jaar voor facturen).',
        'Word je geen klant, dan verwijder ik je aanvraag uiterlijk 12 maanden na het laatste contact.',
      ],
    },
    {
      title: 'Wie hebben er toegang tot je gegevens?',
      body: [
        'Alleen ik. Voor de techniek werk ik met twee verwerkers: Vercel (hosting van deze website, met servers in de EU waar mogelijk) en Resend (het versturen van het offerteformulier naar mijn mailbox). Met beide partijen gelden verwerkersovereenkomsten volgens de AVG.',
        'De sectie “Interactieve kaart” bevat een ingesloten Google Maps-kaart. Die laadt pas zodra je hem in beeld scrolt; vanaf dat moment kan Google cookies plaatsen volgens het privacybeleid van Google. Wil je dat niet, scroll die demo dan voorbij zonder de kaart te laden.',
        'Ik verkoop nooit gegevens en deel niets met derden voor marketingdoeleinden.',
      ],
    },
    {
      title: 'Jouw rechten',
      body: [
        'Je mag je gegevens altijd inzien, laten corrigeren of laten verwijderen. Ook kun je bezwaar maken tegen verwerking of vragen om overdracht van je gegevens (dataportabiliteit).',
        `Mail daarvoor naar ${site.email} — ik reageer binnen enkele werkdagen, uiterlijk binnen de wettelijke termijn van één maand.`,
        'Ben je het niet eens met hoe ik met je gegevens omga? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      title: 'Beveiliging',
      body: [
        'Deze site draait volledig via een versleutelde verbinding (HTTPS). Formuliergegevens worden versleuteld verstuurd en alleen opgeslagen in mijn beveiligde mailbox.',
      ],
    },
    {
      title: 'Contact',
      body: [
        `${site.legalName} · KVK 89874994 · ${site.email}`,
        'Vragen over deze privacyverklaring? Mail of app me gerust.',
      ],
    },
  ],
  backLink: '← Terug naar de site',
} as const;

const voorwaarden = {
  title: 'Algemene voorwaarden',
  updated: 'Versie augustus 2026',
  metaDescription: `Algemene voorwaarden van ${site.legalName}, in gewone taal: hoe een opdracht start, wat je krijgt, hoe betalen werkt en hoe je maandelijks opzegt.`,
  intro: `Geen kleine lettertjes: dit zijn de afspraken waaronder ik werk, in gewone taal. Ze gelden voor alles wat je bij ${site.legalName} (KVK 89874994) afneemt. Staat er iets tussen dat niet duidelijk is? Mail of app me gewoon — dan leggen we het vast voordat we beginnen.`,
  sections: [
    {
      title: 'Zo start een opdracht',
      body: [
        'Mijn aanbod is voor zakelijke klanten: ondernemers, praktijken en verenigingen. Je stelt op deze site je website samen, of we overleggen via mail, telefoon of WhatsApp. Daarna krijg je één duidelijke offerte met een vaste prijs: een eenmalig bedrag en — afhankelijk van je keuzes — een maandbedrag. Alle prijzen zijn exclusief btw.',
        'De offerte is 30 dagen geldig. Zeg je schriftelijk ja (een mailtje of appje telt ook), dan is dat het startschot en gelden deze voorwaarden.',
      ],
    },
    {
      title: 'Wat ik lever, en wanneer',
      body: [
        'Je krijgt precies wat er in de offerte staat: het gekozen basispakket plus de gekozen opties. De meeste sites staan binnen 5 werkdagen live, gerekend vanaf het moment dat al jouw materiaal (teksten, foto’s, toegangen) binnen is. Complexere modules, zoals een portaal of online bestellen, kunnen een paar dagen extra vragen.',
        'Vóór de livegang kijken we samen naar het resultaat. Twee rondes met aanpassingen horen bij de prijs. Daarna vallen wijzigingen — groot en klein — onder het onderhoud of onder meerwerk, met eerst een vaste prijs.',
      ],
    },
    {
      title: 'Betalen',
      body: [
        'Het eenmalige bedrag betaal je in twee helften. De eerste factuur stuur ik bij akkoord en de bouw start meteen; de site gaat live zodra die eerste helft binnen is. De tweede factuur volgt na de livegang. Voor beide facturen geldt een betaaltermijn van 14 dagen.',
        'Het maandbedrag loopt vanaf de livegang en betaal je per maand, op factuur of via automatische incasso — wat we afspreken.',
        'Betaal je te laat, dan stuur ik eerst een gewone herinnering. Blijft betalen uit, dan gelden de wettelijke rente en incassokosten, en mag ik doorlopende diensten pauzeren tot de betaling binnen is — dat kondig ik altijd eerst aan.',
        'Lever je na akkoord langer dan drie maanden geen materiaal aan, ondanks een herinnering, dan mag ik het project afronden op basis van wat er ligt; de eerste helft blijft dan verschuldigd.',
      ],
    },
    {
      title: 'Maandelijkse diensten en opzeggen',
      body: [
        'Het maandbedrag dekt hosting, updates en beveiliging, plus de modules met doorlopende kosten (zoals de agenda of de chatbot). Af en toe een kleine wijziging — een prijs, een foto, je openingstijden — hoort daar gewoon bij.',
        'Opzeggen kan elke maand, per mail of app, en gaat in aan het einde van de lopende maand; er is geen minimumlooptijd. Je site en je domein zijn en blijven van jou: ik lever alle bestanden netjes aan en verhuis je domein kosteloos. Alleen de doorlopende diensten stoppen dan.',
        'Moet ik het maandbedrag of deze doorlopende diensten ooit aanpassen — bijvoorbeeld omdat kosten van hosting- of AI-partijen veranderen — dan hoor je dat minimaal een maand van tevoren. Ben je het er niet mee eens, dan zeg je gewoon op.',
      ],
    },
    {
      title: 'Jouw materiaal',
      body: [
        'Jij levert de teksten, foto’s en andere content aan, of we spreken af dat ik daarbij help. Jij staat ervoor in dat dat materiaal gebruikt mag worden — dus geen foto’s of teksten van iemand anders zonder toestemming.',
        'Met persoonsgegevens ga ik om zoals in de privacyverklaring staat. Draaien er op jouw site modules die gegevens van jóuw klanten verwerken (zoals de agenda, intake of het portaal), dan verwerk ik die alleen in jouw opdracht en leggen we dat vast in een korte verwerkersovereenkomst. Zeg je op, dan krijg je een export van die gegevens en verwijder ik ze daarna binnen 30 dagen.',
      ],
    },
    {
      title: 'Van wie is de site?',
      body: [
        'Het domein registreer ik op jouw naam — dat is dus vanaf dag één van jou. De site zelf (het ontwerp, de teksten, de code en de opbouw) is helemaal van jou zodra het eenmalige bedrag volledig is betaald; op verzoek bevestig ik die overdracht met een ondertekend document. Het maandbedrag staat hier los van. Open-source onderdelen blijven onder hun eigen licentie — dat is normaal en kost je niets.',
        'Ik mag de site in mijn portfolio tonen en er in mijn eigen communicatie naar verwijzen, tenzij jij aangeeft dat liever niet te willen.',
      ],
    },
    {
      title: 'AI-modules',
      body: [
        'De chatbot en de AI-telefonist geven automatische antwoorden. We stellen ze samen zorgvuldig in, maar zulke systemen kunnen een vraag verkeerd begrijpen of een antwoord geven dat niet klopt. Controleer belangrijke informatie (prijzen, openingstijden, afspraken) in de eerste weken dus extra, en geef fouten meteen door — dan stel ik ze bij.',
        'Wat deze modules namens jouw zaak communiceren, blijft jouw verantwoordelijkheid. Laat ze geen medisch, juridisch of financieel advies geven.',
      ],
    },
    {
      title: 'Als er iets misgaat',
      body: [
        'Ik werk zorgvuldig en gebruik betrouwbare partijen voor hosting en e-mail, maar 100% bereikbaarheid kan niemand beloven. Is er een storing, dan ga ik er direct mee aan de slag.',
        'Gaat er ondanks alles iets mis waardoor je schade hebt, dan is mijn aansprakelijkheid beperkt tot het bedrag dat je mij in de drie maanden ervoor betaalde — of het eenmalige bedrag van jouw offerte, als dat hoger is. Indirecte schade, zoals gemiste omzet, valt daarbuiten. Niets hiervan beperkt aansprakelijkheid die volgens de wet niet beperkt mag worden.',
      ],
    },
    {
      title: 'Tot slot',
      body: [
        'Op onze afspraken is Nederlands recht van toepassing. Wijzig ik deze voorwaarden, dan blijft voor een lopende bouwopdracht de versie gelden waarmee je akkoord ging; voor doorlopende diensten geldt de aankondigingsregel hierboven.',
        `Vragen? Mail naar ${site.email} of stuur een appje.`,
      ],
    },
  ],
  backLink: '← Terug naar de site',
} as const;

export const nlLegal = { privacy, voorwaarden } as const;
