Nettsiden MOVIEZ er en side laget med Next.js og TailwindCss som skal vise fram forskjellige type filmer ved hjelp av The Movie Database APIet.
MOVIEZ er laget for de som vil oppdage og lese om de nyeste filmene som kommer ut. Siden skal også tilby en unik stil som minner om 2010 tallet.

# Start Prosjektet!

- Last ned eller klon repositoriet ved hjelp av Github Desktop.
- Åpne prosjektet i Visual Studio Code eller et annet kode program du bruker.
- Åpne terminalen
- Dette er viktig! Siden hele prosjektet ligger inni moviez mappen må du kjøre cd moviez først.
- Etter det kjør npm install eller npm i.
- Når det er ferdig, kjør npm run dev for å åpne siden. http://localhost:3000.

# Få APIet i gang

- Lag en bruker på themoviedb.org
- Hvis du allerede har en bruker klikk på bruker ikonet
- Settings
- På venstre side er det en meny.
- Klikk på API
- Bla litt ned til du ser «Request an API Key
- Klikk på «click here»
- Velg hva du skal bruke APIet til og fyll in skjemaet.
- Etter det vil du se APIet og access token.
- Kopier API Read Access Token.
- Lag en .env.local fil inni i prosjekt root mappen (moviez)
- Skriv in: TMDB_TOKEN=”Din read access token her”
- Kjør deretter prosjektet med npm run dev for å få opp alle filmene.

# Refleksjon

Jeg synes dette arbeidet har gått veldig fint generelt.
Dette har vært mye lettere enn forrige oppgave og jeg føler vi har lært og fått mye informasjon om det vi måtte vite.
Jeg valgte å lage en film side siden det virket lettest og fordi jeg generelt liker å se på filmer i fritiden min. Film websider eller applikasjoner har mange muligheter for unike design, og siden jeg er veldig stor fan av ”Frutiger Aero” estetikken hadde jeg bare lyst å lage noe kult med det.
Jeg brukte derfor TailwindCss for å ha en lettere styling og fordi jeg hadde lyst å teste det litt.
Som sist merket jeg hvor nyttig det er med å dele opp funksjoner og elementer i komponenter. Det er fortsatt noen ting jeg kanskje kunne ha puttet i en egen komponent som tilbake og sjanger knappene, men jeg føler at koden er forstårlig nok.
Jeg puttet alle typer inne i en egen fil kalt types.ts for å holde bedre oversikt og fordi jeg ikke ville skrive det på nytt for alle funksjoner.
Jeg begynte også tidlig å putte alle TMDB relaterte funksjoner i en egen fil kalt tmdb.ts. Tror neste gang jeg lager et prosjekt lager jeg bare en fil for alle funksjoner med en gang. Sånn at page.tsx filene ikke blir så full med kode på starten.
Jeg hadde først planlagt å hente alle filmer på en side, men som jeg fort merket var dette ikke en god ide. For det første kan ikke TMDB bare hente alle filmer fra en lenke. TMDB har lenker for å hente en gruppe filmer som sjanger eller populære filmer.
Og for det andre belaster det siden mye å laste in så mye informasjon på en gang. Jeg merket når jeg fikk bilder til å virke at siden brukte litt mere tid å laste in alt.
Så for film siden tenkte jeg bare å ha en funksjon som henter populære filmer som default, også kan brukere bare klikke på sjanger knappene eller søke for å finne andre filmer. Det var også i de ukene hvor vi lærte om paginering og loading funksjoner som var nyttig.
Når jeg først startet med oppgaven hadde jeg planlagt å bruke Trakt.Tv men skiftet til TMDB fordi jeg ville ha bilder for plakatene. Trakt hadde mulighet for bilder, men fikk det ikke til å virke.
Jeg var også syk den uka som gjorde ting litt vanskeligere til å fungere.
Jeg hadde også problemer med Tailwind importering siden jeg hadde lastet ned to versjoner av Tailwind samtidig. Så jeg måtte slette gå tilbake til en gammel versjon å slette branchen.
Jeg føler at jeg har lært litt mere nå om Next.js og generelt litt mere om Typescript. Føler meg også mye mere sikker med GitHub nå og hva det er godt til. Branch funksjonen har hjulpet mye og jeg liker å se fremgangen.
Det er fortsatt noen ting jeg føler jeg kan bli bedre på men det kommer med tiden tror jeg. Jeg likte veldig å jobbe med Next siden det bare har ting innebygd som lenke til sider med mapper, og bruk av slugs.
Tror jeg kommer til å bruke React og Next videre om jeg skal lage websider privat i fremtiden.
