/**
 * Juridische teksten (nl). Bewust los van nl.ts: deze twee blokken
 * worden alleen door /privacy en /voorwaarden gebruikt (LegalPage laadt
 * ze apart). Zaten ze in de taalbundel, dan downloadde elke bezoeker de
 * volledige privacyverklaring en algemene voorwaarden mee.
 */
import { site } from '../site';
import { offer } from '../offer';
import { eur } from '../../lib/format';

const PRIJS = eur(offer.price, 'nl');
const DAGEN = offer.deliveryDays;
const PLUS = eur(offer.care[0].monthly, 'nl');
const PREMIUM = eur(offer.care[1].monthly, 'nl');

const privacy = {
  title: 'Privacyverklaring',
  metaDescription: `Privacyverklaring van ${site.legalName}: welke gegevens de bestelbon verwerkt, waarom, en welke rechten je hebt.`,
  updated: 'Laatst bijgewerkt: oktober 2026',
  intro: `${site.legalName} (hierna: “ik”) bouwt websites voor ondernemers. Op deze pagina lees je hoe ik omga met de persoonsgegevens die je via ${site.url} met mij deelt. Kort gezegd: ik verwerk alleen wat jij zelf invult op de bestelbon, ik gebruik dat alleen om je aanvraag te beantwoorden, en ik verkoop of deel niets met derden voor marketing.`,
  sections: [
    {
      title: 'Welke gegevens verwerk ik?',
      body: [
        'Verstuur je de bestelbon, dan verwerk ik: je naam, je e-mailadres, de naam van je zaak en je branche, en als je die invult ook je telefoonnummer en je bericht.',
        'Typ je in het voorbeeld bovenaan de naam van je zaak, dan blijft die in je eigen browser. Hij gaat niet naar mij of naar een server, tot je zelf de bestelbon verstuurt.',
        'Deze website gebruikt geen trackingcookies en geen analytics. Er is daarom ook geen cookiebanner.',
      ],
    },
    {
      title: 'Waarvoor gebruik ik je gegevens?',
      body: [
        'Alleen om je aanvraag te beantwoorden: ik maak je gratis proefpagina en neem contact met je op via e-mail, telefoon of WhatsApp, afhankelijk van wat jij invulde.',
        'De grondslag hiervoor is het nemen van maatregelen op jouw verzoek, voorafgaand aan een overeenkomst (art. 6 lid 1 sub b AVG): jij vraagt een proefpagina aan, ik lever die.',
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
        'Alleen ik. Voor de techniek werk ik met één verwerker: Base44 (onderdeel van Wix), dat deze website host, de bestelbon voor mij bewaart en de bevestiging per e-mail verstuurt. Daarvoor gelden verwerkersafspraken volgens de AVG.',
        'Stuur je je bon via WhatsApp of e-mail, dan gaan je gegevens via die dienst. Daarvoor gelden ook de voorwaarden van WhatsApp of van je e-mailprovider.',
        'Ik verkoop nooit gegevens en deel niets met derden voor marketingdoeleinden.',
      ],
    },
    {
      title: 'Jouw rechten',
      body: [
        'Je mag je gegevens altijd inzien, laten corrigeren of laten verwijderen. Ook kun je bezwaar maken tegen verwerking of vragen om overdracht van je gegevens (dataportabiliteit).',
        `Mail daarvoor naar ${site.email}. Ik reageer binnen enkele werkdagen, uiterlijk binnen de wettelijke termijn van één maand.`,
        'Ben je het niet eens met hoe ik met je gegevens omga? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
      ],
    },
    {
      title: 'Beveiliging',
      body: [
        'Deze site draait volledig via een versleutelde verbinding (HTTPS). Formuliergegevens worden versleuteld verstuurd en alleen bewaard in mijn beveiligde mailbox en in de beveiligde omgeving van mijn website bij Base44.',
      ],
    },
    {
      title: 'Contact',
      body: [
        `${site.legalName}, KvK 89874994, ${site.email}.`,
        'Vragen over deze privacyverklaring? Mail of app me gerust.',
      ],
    },
  ],
  backLink: 'Terug naar de site',
} as const;

const voorwaarden = {
  title: 'Algemene voorwaarden',
  updated: 'Versie oktober 2026',
  metaDescription: `Algemene voorwaarden van ${site.legalName}, in gewone taal: hoe een opdracht start, wat je krijgt voor ${PRIJS}, hoe betalen werkt en wat er daarna gebeurt.`,
  intro: `Geen kleine lettertjes: dit zijn de afspraken waaronder ik werk, in gewone taal. Ze gelden voor alles wat je bij ${site.legalName} (KvK 89874994) afneemt. Staat er iets in dat niet duidelijk is? Mail of app me, dan leggen we het vast voordat we beginnen.`,
  sections: [
    {
      title: 'Zo start een opdracht',
      body: [
        'Mijn aanbod is voor zakelijke klanten: ondernemers, praktijken en verenigingen. Je vraagt via de bestelbon op deze site een gratis proefpagina aan, of we overleggen via mail, telefoon of WhatsApp. Bevalt de proefpagina, dan krijg je een bevestiging met de vaste prijs. Alle prijzen zijn exclusief 21% btw.',
        'Die bevestiging is 30 dagen geldig. Zeg je schriftelijk ja (een mailtje of appje telt ook), dan is dat het startschot en gelden deze voorwaarden. Zeg je nee of hoor ik niets, dan betaal je niets, ook niet voor de proefpagina.',
      ],
    },
    {
      title: `Wat je krijgt voor ${PRIJS}`,
      body: [
        'Een website op maat op één pagina: een eigen ontwerp met motion, gemaakt voor telefoon en desktop, een nette basis voor Google, teksten op basis van een gesprek, het koppelen van je domein, de livegang en hosting. Wat er precies op komt, staat in de bevestiging.',
        `Je site staat binnen ${DAGEN} werkdagen live, gerekend vanaf het moment dat al jouw materiaal binnen is (teksten of ons gesprek, foto’s, logo en toegangen). Lukt dat onverhoopt niet, dan hoor je dat meteen, met een nieuwe datum.`,
        `Vóór de livegang kijken we samen naar het resultaat. ${offer.revisionRounds} rondes aanpassingen horen bij de prijs. Daarna vallen wijzigingen onder onderhoud of onder meerwerk, en dat hoor je altijd vooraf, met een vaste prijs.`,
      ],
    },
    {
      title: 'Betalen',
      body: [
        'Je betaalt in twee helften. De eerste factuur stuur ik na je akkoord; dan start de bouw. De tweede factuur volgt bij de livegang. Voor beide facturen geldt een betaaltermijn van 14 dagen.',
        'Betaal je te laat, dan stuur ik eerst een gewone herinnering. Blijft betalen uit, dan gelden de wettelijke rente en incassokosten.',
        'Lever je na akkoord langer dan drie maanden geen materiaal aan, ondanks een herinnering, dan mag ik het project afronden op basis van wat er ligt; de eerste helft blijft dan verschuldigd.',
      ],
    },
    {
      title: 'Hosting',
      body: [
        'Hosting zit in de prijs, zonder maandbedrag. Ik zet je site bij een betrouwbare hostingpartij en houd de techniek in de gaten.',
        'Dat geldt voor de site zoals ik hem opleverde. Komt er later iets bij met eigen doorlopende kosten, zoals een webshop of een boekingssysteem, dan hoor je dat vooraf.',
        'Stop ik ooit met hosten, dan hoor je dat minimaal drie maanden van tevoren en verhuis ik je site kosteloos naar een partij naar keuze.',
      ],
    },
    {
      title: 'Onderhoud, als je dat wilt',
      body: [
        `Na de livegang heb je niets nodig: geen abonnement en geen maandbedrag. Wil je dat ik je site bijhoud, dan kan dat vanaf ${PLUS} per maand: elke maand je wijzigingen doorvoeren, plus een kort rapport. Voor ${PREMIUM} per maand zijn kleine wijzigingen onbeperkt en heb je altijd voorrang.`,
        'Onderhoud zeg je op per mail of app; het stopt aan het einde van de lopende maand. Er is geen minimumlooptijd.',
        'Zonder onderhoud kun je me altijd inhuren voor een wijziging. Je hoort vooraf wat het kost.',
      ],
    },
    {
      title: 'Jouw materiaal',
      body: [
        'Jij levert de teksten, foto’s en andere content aan, of we spreken af dat ik daarbij help. Jij staat ervoor in dat dat materiaal gebruikt mag worden: dus geen foto’s of teksten van iemand anders zonder toestemming.',
        'Met persoonsgegevens ga ik om zoals in de privacyverklaring staat. Verwerkt jouw site gegevens van jouw klanten, bijvoorbeeld via een contactformulier, dan doe ik dat alleen in jouw opdracht en leggen we dat vast in een korte verwerkersovereenkomst.',
      ],
    },
    {
      title: 'Van wie is de site?',
      body: [
        'Het domein staat op jouw naam en is dus vanaf dag één van jou; de registratie betaal je zelf, meestal zo’n € 10 per jaar. De site zelf (het ontwerp, de teksten, de code en de opbouw) is helemaal van jou zodra hij volledig is betaald. Op verzoek bevestig ik die overdracht met een ondertekend document. Open-source onderdelen blijven onder hun eigen licentie; dat is normaal en kost je niets.',
        'Ik mag de site in mijn portfolio tonen en er in mijn eigen communicatie naar verwijzen, tenzij jij aangeeft dat liever niet te willen.',
      ],
    },
    {
      title: 'Als er iets misgaat',
      body: [
        'Ik werk zorgvuldig en gebruik betrouwbare partijen voor hosting en e-mail, maar 100% bereikbaarheid kan niemand beloven. Is er een storing, dan ga ik er direct mee aan de slag.',
        'Gaat er ondanks alles iets mis waardoor je schade hebt, dan is mijn aansprakelijkheid beperkt tot het bedrag van de opdracht, plus wat je in de drie maanden ervoor aan onderhoud betaalde. Indirecte schade, zoals gemiste omzet, valt daarbuiten. Niets hiervan beperkt aansprakelijkheid die volgens de wet niet beperkt mag worden.',
      ],
    },
    {
      title: 'Tot slot',
      body: [
        'Op onze afspraken is Nederlands recht van toepassing. Wijzig ik deze voorwaarden, dan blijft voor een lopende opdracht de versie gelden waarmee je akkoord ging. Voor onderhoud hoor je een wijziging minimaal een maand vooraf; ben je het er niet mee eens, dan zeg je gewoon op.',
        `Vragen? Mail naar ${site.email} of stuur een appje.`,
      ],
    },
  ],
  backLink: 'Terug naar de site',
} as const;

export const nlLegal = { privacy, voorwaarden } as const;
