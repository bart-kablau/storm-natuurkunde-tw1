/* =========================================================================
   content.js: Natuurkunde toetsweek 1 (havo 2): H1 §1.1-1.2, H2 §2.3-2.4, H4 §4.1-4.3.
   Nova NaSk 1-2 mavo/havo. Inhoud volgt 02-verwerkt/brontekst.md (leerdoelenkaart TW1)
   en 02-verwerkt/leerplan.md (§1 de 14 onderwerpen, §2 misvattingen, §5 app).
   Engine = tools/oefen-engine (canoniek); dit bestand is alleen de vak-inhoud.

   De onderwerp-id's zijn ook de film-id's en speelles-id's: video/<id>.mp4 is de film
   (Films-tegel); video/<id>-n1..3.mp4 zijn de korte dia-video's per niveau (H1/H2).

   Regel: elke vraag heeft w + meer, elke mc per foute optie een fout-uitleg.
   Checks: node tools/checks/audit-feedback.mjs <dit bestand>
           node tools/checks/genverify.mjs <deze map>
           node tools/checks/nask-verify.mjs <deze map>
           node <deze map>/build/check-natuurkunde.mjs   (generatoren, lengte, em-dashes)
   ========================================================================= */

window.VAK = {
  id: "natuurkunde_tw1",
  store: "storm_natuurkunde_tw1_v1",
  titel: "Natuurkunde met Storm: toetsweek 1",
  brand: "Natuurkunde met Storm",
  badge: "⚛",
  mascotEmoji: "🔬",
  doelLabel: "begrip",
  spiekTitel: "Natuurkunde TW1: onderzoeken, dichtheid en elektriciteit",
  wiskunde: true,                       // laadt math.js: numeriek nakijken van de rekenvragen
  begripVak: true,
  spraak: { vraagLang: "nl-NL", antwoordLang: "nl-NL" },
  matching: { stripInfinitief: false, accentTolerant: true, lidwoordTolerant: false },
  masteryHits: 2,
  stapelGrootte: 6,
  proefPerOnderwerp: 1,                 // 14 onderwerpen: 1 per onderwerp + mix + begrippen
  /* antwoorden zijn kale getallen: een komma en een maalpunt, geen xⁿ en haakjes */
  rekenToetsen: [[",", ","], ["·", "·"]],
  speelles: "speelles/",
  speellesTekst: "14 lessen · speel het eerst, dan snap je het",
  tegels: ["leerstof", "begrippen", "proeftoets", "spiekblad"],
  tegelProef: { em: "📝", h: "Proeftoets", p: "H1, H2 en H4 door elkaar, zoals in de toetsweek" },
  proefTitel: "Proeftoets TW1",
  films: [
    { id: "vakken",           titel: "H1 · Leeft het, of verandert het?",        emoji: "🧪", thema: "H1 · Natuurwetenschappen" },
    { id: "methode",          titel: "H1 · Onderzoeken als een wetenschapper",   emoji: "🔎", thema: "H1 · Natuurwetenschappen" },
    { id: "massa-gewicht",    titel: "H2 · Massa en gewicht op de maan",         emoji: "🌕", thema: "H2 · Stoffen" },
    { id: "volume",           titel: "H2 · Hoeveel ruimte neemt het in?",        emoji: "🧪", thema: "H2 · Stoffen" },
    { id: "dichtheid",        titel: "H2 · Gram per blokje",                     emoji: "🧱", thema: "H2 · Stoffen" },
    { id: "drijven",          titel: "H2 · Drijven, zweven of zinken",           emoji: "🛟", thema: "H2 · Stoffen" },
    { id: "stroomkring",      titel: "H4 · Het rondje van de lading",            emoji: "🔁", thema: "H4 · Elektriciteit" },
    { id: "geleiders",        titel: "H4 · Wat laat stroom door?",               emoji: "🧲", thema: "H4 · Elektriciteit" },
    { id: "stroomsterkte",    titel: "H4 · De stroommeter",                      emoji: "🅰️", thema: "H4 · Elektriciteit" },
    { id: "spanning",         titel: "H4 · De duw van de batterij",              emoji: "🔋", thema: "H4 · Elektriciteit" },
    { id: "schakelingen",     titel: "H4 · Serie of parallel?",                  emoji: "💡", thema: "H4 · Elektriciteit" },
    { id: "stroom-redeneren", titel: "H4 · Waar gaat de stroom heen?",           emoji: "🔀", thema: "H4 · Elektriciteit" }
  ]
};

window.__TOPICS = window.__TOPICS || {};


/* ===== onderwerpen (deel A) ===== */

/* ================================================================ vakken (1.1.1-1.1.3) */
window.__TOPICS["vakken"] = {
  id: "vakken", emoji: "🧪", titel: "H1 · Biologie, natuurkunde of scheikunde?",
  kort: "Leeft het? Zo nee: is er een andere stof ontstaan? En hoe röntgenstraling door je hand heen kijkt.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "<b>Wetenschap</b> is kennis opdoen én die kennis gebruiken in het dagelijks leven. Een <b>natuurwetenschap</b> is een wetenschap die de <b>natuur</b> bestudeert. Op school heb je er drie: biologie, natuurkunde en scheikunde.",
        "De eerste vraag is altijd: <b>leeft het?</b> Een bloem die bloeit of een vogel die naar het zuiden vliegt: dat leeft, dus <b>biologie</b>.",
        "Leeft het niet? Bliksem, zonnepanelen, kaarsvet dat smelt, de remweg van een scooter, een spijker die roest: dat is de <b>niet-levende</b> natuur. Daar gaan <b>natuurkunde</b> en <b>scheikunde</b> over.",
        "Een beroemde natuurkundige is <b>Wilhelm Conrad Röntgen</b>. In <b>1895</b> ontdekte hij stralen die <b>onzichtbaar</b> zijn en <b>dwars door papier en karton</b> gaan.",
        "Je <b>botten</b> houden veel van die straling <b>tegen</b>, je spieren en huid bijna niets. Zo ontstaat achter je hand een schaduwbeeld, en dat kun je fotograferen: een <b>röntgenfoto</b>."
      ],
      regel: "Vraag 1: leeft het? Ja → biologie. Nee → natuurkunde of scheikunde.",
      voorbeelden: [
        { en: "Een bloeiende bloem", nl: "een plant leeft", let: "<b>let op</b>: leeft het, dan is het <b>biologie</b>, ook als er een apparaat bij is." },
        { en: "Bliksem bij onweer", nl: "leeft niet", let: "<b>let op</b>: niet-levend betekent natuurkunde of scheikunde; welke van de twee leer je bij Zilver." },
        { en: "Een röntgenfoto van een hand", nl: "botten houden de straling tegen", let: "<b>let op</b>: de straling zelf zie je niet, alleen de foto." }
      ],
      vragen: [
        { t: "mc", q: "Wat bestudeert het vak <b>biologie</b>?",
          o: ["De levende natuur", "De niet-levende natuur", "Blijvende veranderingen", "Tijdelijke veranderingen"],
          a: "De levende natuur",
          fout: {
            "De niet-levende natuur": "Dat zijn juist natuurkunde en scheikunde. Biologie gaat over wat leeft: planten, dieren en je eigen lichaam.",
            "Blijvende veranderingen": "Dat is scheikunde. Biologie kijkt niet naar tijdelijk of blijvend, maar naar wat leeft.",
            "Tijdelijke veranderingen": "Dat is natuurkunde. Bij biologie draait het om leven, niet om het soort verandering."
          },
          w: "Biologie = de levende natuur.",
          meer: "Alle drie zijn natuurwetenschappen. Biologie pakt het levende deel: planten, dieren en het menselijk lichaam." },

        { t: "gap", q: "Een wetenschap die de natuur bestudeert, heet een ___.",
          a: "natuurwetenschap|natuurwetenschappen", soepel: true,
          w: "Natuur + wetenschap = natuurwetenschap.",
          meer: "Biologie, natuurkunde en scheikunde zijn alle drie natuurwetenschappen." },

        { t: "mc", q: "Wat is <b>wetenschap</b> volgens je boek?",
          o: ["Kennis opdoen en die gebruiken in het dagelijks leven",
              "Proefjes doen in een groot laboratorium vol dure apparaten",
              "Alles wat je op school leert, van gym tot Frans",
              "Het bestuderen van planten, dieren en mensen"],
          a: "Kennis opdoen en die gebruiken in het dagelijks leven",
          fout: {
            "Proefjes doen in een groot laboratorium vol dure apparaten": "Proefjes horen erbij, maar wetenschap is meer. Het gaat om kennis opdoen én die kennis gebruiken, met of zonder apparaten.",
            "Alles wat je op school leert, van gym tot Frans": "Te breed. Een rondje hardlopen bij gym is geen wetenschap.",
            "Het bestuderen van planten, dieren en mensen": "Dat is de omschrijving van biologie, en biologie is maar één soort wetenschap."
          },
          w: "Wetenschap = kennis opdoen + die kennis toepassen.",
          meer: "Door dat toepassen hebben we nu goede kleding, huizen en telefoons." },

        { t: "mc", q: "Je wilt weten bij welk vak iets hoort. Welke vraag stel je <b>als eerste</b>?",
          o: ["Leeft het?", "Zit er een apparaat bij?", "Wordt het warm?", "Verandert de kleur?"],
          a: "Leeft het?",
          fout: {
            "Zit er een apparaat bij?": "Een apparaat zegt niets over het vak. Brood bakken in een oven is scheikunde, kaarsvet dat smelt (zonder apparaat) is natuurkunde.",
            "Wordt het warm?": "Warmte komt bij alle vakken voor: je lichaam is warm (biologie), smelten (natuurkunde) en vuur (scheikunde).",
            "Verandert de kleur?": "Kleur is geen goede eerste vraag. Een bloem die opengaat verandert ook van kleur, en dat is biologie."
          },
          w: "Eerst: leeft het? Pas daarna kijk je verder.",
          meer: "Leeft het, dan biologie. Leeft het niet, dan stel je een tweede vraag (die leer je bij Zilver): is er een andere stof ontstaan?" },

        { t: "sleep", opgave: "Leeft het, of leeft het niet?",
          chips: [ {t:"een bloeiende bloem", bak:"bio"}, {t:"vogels die naar het zuiden vliegen", bak:"bio"},
                   {t:"je hart dat klopt", bak:"bio"}, {t:"bliksem bij onweer", bak:"niet"},
                   {t:"de remweg van een scooter", bak:"niet"}, {t:"zonnepanelen die stroom maken", bak:"niet"} ],
          bakjes: [ {id:"bio", label:"Biologie", som:"levende natuur"},
                    {id:"niet", label:"Natuurkunde of scheikunde", som:"niet-levende natuur"} ],
          w: "Planten, dieren en je lichaam leven. Bliksem, scooters en zonnepanelen niet.",
          meer: "Een zonnepaneel is een apparaat, maar dat maakt het geen apart vak. Het leeft niet: dat is de enige vraag hier." },

        { t: "mc", q: "Het ontstaan van <b>bliksem</b> hoort bij welk soort natuur?",
          o: ["De niet-levende natuur", "De levende natuur", "Geen natuur, het is weer", "De levende en niet-levende"],
          a: "De niet-levende natuur",
          fout: {
            "De levende natuur": "Bliksem leeft niet: hij groeit niet, eet niet en plant zich niet voort.",
            "Geen natuur, het is weer": "Het weer is juist een natuurverschijnsel. Natuurwetenschappen gaan ook over het weer, aardbevingen en vulkanen.",
            "De levende en niet-levende": "Er leeft niets aan een bliksemflits. Het hoort alleen bij de niet-levende natuur."
          },
          w: "Bliksem leeft niet, dus niet-levende natuur.",
          meer: "Natuurverschijnselen zoals het weer, aardbevingen, vulkanen en zonsverduisteringen horen bij de niet-levende natuur." },

        { t: "mc", q: "In welk jaar ontdekte Röntgen zijn stralen?",
          o: ["1895", "1795", "1945", "1985"],
          a: "1895",
          fout: {
            "1795": "Honderd jaar te vroeg: Röntgen werd pas in 1845 geboren.",
            "1945": "Te laat: Röntgen overleed al in 1923.",
            "1985": "Veel te laat. Toen waren röntgenfoto's al bijna honderd jaar gewoon in het ziekenhuis."
          },
          w: "1895, op het eind van de negentiende eeuw.",
          meer: "Röntgen leefde van 1845 tot 1923. Hij was vijftig toen hij de stralen ontdekte." },

        { t: "mc", q: "Wat ontdekte Röntgen over zijn stralen?",
          o: ["Ze zijn onzichtbaar en gaan door papier heen",
              "Ze zijn paars van kleur en gaan door papier",
              "Ze zijn onzichtbaar en kaatsen terug op papier",
              "Ze zijn alleen in het donker als licht te zien"],
          a: "Ze zijn onzichtbaar en gaan door papier heen",
          fout: {
            "Ze zijn paars van kleur en gaan door papier": "Ze hebben helemaal geen kleur die je kunt zien: röntgenstraling is onzichtbaar.",
            "Ze zijn onzichtbaar en kaatsen terug op papier": "Onzichtbaar klopt, maar ze kaatsen niet terug. Ze gaan juist dwars door papier en karton heen.",
            "Ze zijn alleen in het donker als licht te zien": "Ook in het donker zie je ze niet. Röntgen zag alleen wat ze deden, bijvoorbeeld het beeld op een foto."
          },
          w: "Onzichtbaar, en dwars door papier en karton.",
          meer: "Gewoon licht houdt papier tegen, röntgenstraling niet. Dat maakte de ontdekking zo vreemd." },

        { t: "mc", q: "Wat houdt in je hand de <b>meeste</b> röntgenstraling tegen?",
          o: ["De botten", "De spieren", "De huid", "Het bloed"],
          a: "De botten",
          fout: {
            "De spieren": "Spieren laten de straling bijna helemaal door. Daarom zie je ze nauwelijks op een foto.",
            "De huid": "De huid laat de straling door, net als de spieren.",
            "Het bloed": "Bloed houdt de straling niet tegen. Botten zijn veel harder en dichter."
          },
          w: "Botten houden de straling tegen, spieren en huid laten hem door.",
          meer: "Daarom is een röntgenfoto zo handig bij een botbreuk: de botten zie je scherp." },

        { t: "gap", q: "Storm tekent alleen de botten van een hand, zonder huid. Haar tekening lijkt op een ___ (foto met onzichtbare straling).",
          a: "röntgenfoto|rontgenfoto|röntgenfoto's|rontgenfoto's", soepel: true,
          w: "Op een röntgenfoto zie je de botten, de spieren bijna niet.",
          meer: "Röntgenfoto's worden veel gebruikt om breuken in botten op te sporen." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Leeft het niet? Dan stel je de <b>tweede vraag: is er een andere stof ontstaan?</b>",
        "<b>Nee, het blijft dezelfde stof</b> → de verandering is <b>tijdelijk</b> → <b>natuurkunde</b>. Water dat bevriest, is nog steeds water. Een metalen staaf die uitzet als hij warm wordt, krimpt weer als hij afkoelt.",
        "<b>Ja, er is een andere stof</b> → de verandering is <b>blijvend</b> → <b>scheikunde</b>. Hout dat verbrandt, wordt as en rook. Een spijker roest. Koper wordt groen door regen en lucht (<b>oxideren</b>).",
        "Hulpvraag: <b>kun je het terugdraaien?</b> IJs laat je weer smelten. Van as maak je nooit meer hout. En pas op voor de Apparatenman: of er een apparaat bij zit, zegt <b>niets</b>.",
        "Röntgen: op de foto zijn de delen die <b>veel straling tegenhouden wit</b>. Röntgenstraling is <b>schadelijk</b> voor je lichaam, dus artsen gebruiken er zo weinig mogelijk van."
      ],
      regel: "Dezelfde stof = tijdelijk = natuurkunde. Andere stof = blijvend = scheikunde.",
      voorbeelden: [
        { en: "Water dat bevriest tot ijs", nl: "nog steeds water, je laat het weer smelten", let: "<b>let op</b>: een verandering van toestand is altijd <b>natuurkunde</b>." },
        { en: "Hout dat verbrandt tot as en rook", nl: "as is geen hout meer", let: "<b>let op</b>: niet terug te draaien, dus <b>scheikunde</b>." },
        { en: "Brood bakken in een oven", nl: "er ontstaat een korst, een nieuwe stof", let: "<b>let op</b>: een apparaat maakt het geen natuurkunde. Kijk naar de stof." }
      ],
      vragen: [
        { t: "vb", opgave: "Uitgewerkt voorbeeld: Storm en haar moeder kopen in de stad een ijsje. In de zon smelt het. Welk vak hoort hierbij?",
          stappen: [
            { toon: "Stap 1: leeft het?", uitleg: "Nee, een ijsje leeft niet. Dus geen biologie." },
            { toon: "Stap 2: is er een andere stof ontstaan?", uitleg: "Nee. Gesmolten ijs is nog steeds ijs, alleen vloeibaar." },
            { toon: "Stap 3: kun je het terugdraaien?", uitleg: "Ja: leg het in de vriezer en het wordt weer hard." },
            { toon: "Conclusie: natuurkunde", uitleg: "Dezelfde stof, tijdelijk, dus natuurkunde." }
          ],
          waarom: { q: "Waarom is dit geen scheikunde?",
                    o: ["omdat er geen andere stof ontstaat", "omdat er geen apparaat aan te pas komt", "omdat de zon de warmte levert"],
                    a: "omdat er geen andere stof ontstaat" },
          fout: {
            "omdat er geen apparaat aan te pas komt": "Een apparaat zegt niets. Smelt je het ijsje in de magnetron, dan is het nog steeds natuurkunde.",
            "omdat de zon de warmte levert": "Waar de warmte vandaan komt, maakt niet uit. Het gaat erom of de stof dezelfde stof blijft."
          },
          w: "Smelten maakt geen nieuwe stof, dus tijdelijk, dus natuurkunde.",
          meer: "Gebruik altijd dit stappenplan: leeft het? → andere stof? → terugdraaien?" },

        { t: "mc", q: "Hout verbrandt tot as en rook. Wat klopt?",
          o: ["Blijvend, dus scheikunde", "Tijdelijk, dus natuurkunde", "Blijvend, dus natuurkunde", "Tijdelijk, dus scheikunde"],
          a: "Blijvend, dus scheikunde",
          fout: {
            "Tijdelijk, dus natuurkunde": "Probeer van as en rook maar eens weer hout te maken: dat lukt nooit. Er zijn andere stoffen ontstaan.",
            "Blijvend, dus natuurkunde": "Blijvend klopt, maar blijvend hoort bij scheikunde. Natuurkunde gaat over tijdelijke veranderingen.",
            "Tijdelijk, dus scheikunde": "Tijdelijk klopt niet (as wordt nooit meer hout), en tijdelijk zou bij natuurkunde horen."
          },
          w: "As en rook zijn andere stoffen dan hout: blijvend, scheikunde.",
          meer: "Onthoud het als paar: tijdelijk hoort bij natuurkunde, blijvend bij scheikunde." },

        { t: "mc", q: "Een koperen dak is na jaren groen geworden (oxideren). Waar hoort dit bij?",
          o: ["Scheikunde, er is een nieuwe stof ontstaan",
              "Natuurkunde, alleen de kleur is veranderd",
              "Biologie, er groeit iets groens op het dak",
              "Natuurkunde, je kunt het groen eraf poetsen"],
          a: "Scheikunde, er is een nieuwe stof ontstaan",
          fout: {
            "Natuurkunde, alleen de kleur is veranderd": "De kleur is alleen het teken. Het groene laagje is een echte nieuwe stof, gemaakt uit koper, regen en lucht.",
            "Biologie, er groeit iets groens op het dak": "Er groeit en leeft niets. Het koper reageert met water en lucht.",
            "Natuurkunde, je kunt het groen eraf poetsen": "Dan poets je de nieuwe stof weg. Het koper dat groen werd, krijg je niet terug."
          },
          w: "Oxideren maakt een nieuwe stof, dus blijvend, dus scheikunde.",
          meer: "Roesten van ijzer is hetzelfde verhaal: ijzer + lucht + water geeft roest, en roest is geen ijzer meer." },

        { t: "mc", q: "De Apparatenman zegt: 'Natuurkunde is alles met apparaten.' Welk voorbeeld bewijst dat hij <b>fout</b> zit?",
          o: ["Brood bakken in een oven is scheikunde",
              "Een lamp die brandt hoort bij natuurkunde",
              "Een föhn die warme lucht blaast is natuurkunde",
              "Met een telefoon kun je bellen en appen"],
          a: "Brood bakken in een oven is scheikunde",
          fout: {
            "Een lamp die brandt hoort bij natuurkunde": "Dat klopt wel, maar het past juist bij zijn idee. Je zoekt een apparaat dat géén natuurkunde is.",
            "Een föhn die warme lucht blaast is natuurkunde": "Ook dit past bij zijn idee. Het bewijst niet dat hij fout zit.",
            "Met een telefoon kun je bellen en appen": "Dat zegt niets over welk vak het is. Het weerlegt zijn idee niet."
          },
          w: "Een oven is een apparaat, maar de korst is een nieuwe stof: scheikunde.",
          meer: "Andersom werkt het ook: kaarsvet dat smelt heeft geen apparaat nodig en is toch natuurkunde. Het vak hangt af van de stof, niet van het apparaat." },

        { t: "sleep", opgave: "Tijdelijk (natuurkunde) of blijvend (scheikunde)?",
          chips: [ {t:"tin smelten", bak:"nat"}, {t:"water dat verdampt", bak:"nat"},
                   {t:"een staaf die uitzet door warmte", bak:"nat"}, {t:"een spijker die roest", bak:"schei"},
                   {t:"hout dat verbrandt", bak:"schei"}, {t:"een pannenkoek bakken", bak:"schei"} ],
          bakjes: [ {id:"nat", label:"Tijdelijk → natuurkunde", som:"zelfde stof"},
                    {id:"schei", label:"Blijvend → scheikunde", som:"andere stof"} ],
          w: "Vraag bij elk: is er een andere stof ontstaan?",
          meer: "Een gebakken pannenkoek wordt nooit meer beslag. Gesmolten tin wordt gewoon weer hard." },

        { t: "gap", q: "Natuurkundige veranderingen zijn ___ (het tegenovergestelde van blijvend).",
          a: "tijdelijk", soepel: true,
          w: "Tijdelijk = natuurkunde, blijvend = scheikunde.",
          meer: "Tijdelijk betekent: de stof blijft dezelfde stof en je kunt het terugdraaien." },

        { t: "mc", q: "Na het zwemmen hangt Storm haar natte badpak in de zon. Het water verdampt. Welk vak?",
          o: ["Natuurkunde", "Scheikunde", "Biologie", "Natuurkunde en scheikunde"],
          a: "Natuurkunde",
          fout: {
            "Scheikunde": "Het water wordt waterdamp, maar waterdamp is nog steeds water. Er is geen nieuwe stof.",
            "Biologie": "Een badpak en water leven niet, ook al heeft Storm het gedragen.",
            "Natuurkunde en scheikunde": "Er gebeurt hier maar één ding: water verdampt. Dat is alleen natuurkunde."
          },
          w: "Verdampen is een verandering van toestand: tijdelijk, natuurkunde.",
          meer: "Waterdamp koelt af en wordt weer water: denk aan een beslagen spiegel na het douchen." },

        { t: "mc", q: "De Eiffeltoren is op een hete zomerdag zo'n 30 cm langer dan in de winter. Wat klopt?",
          o: ["Natuurkunde, want in de winter krimpt hij weer",
              "Scheikunde, want het ijzer is echt veranderd",
              "Natuurkunde, want de toren is een bouwwerk",
              "Scheikunde, want er komt warmte bij kijken"],
          a: "Natuurkunde, want in de winter krimpt hij weer",
          fout: {
            "Scheikunde, want het ijzer is echt veranderd": "Het ijzer blijft ijzer, het zet alleen een beetje uit. In de winter is de toren weer korter.",
            "Natuurkunde, want de toren is een bouwwerk": "Natuurkunde klopt, maar om de verkeerde reden. Een bouwwerk of apparaat zegt niets over het vak.",
            "Scheikunde, want er komt warmte bij kijken": "Warmte is geen bewijs. Smelten en uitzetten hebben ook warmte nodig, en zijn natuurkunde."
          },
          w: "Uitzetten is tijdelijk: de stof blijft dezelfde.",
          meer: "Metaal zet uit als het warm wordt en krimpt als het afkoelt. Daarom zitten er naden in bruggen." },

        { t: "mc", q: "Welke delen zijn <b>wit</b> op een röntgenfoto?",
          o: ["Die veel straling tegenhouden", "Die veel straling doorlaten", "Die het dikst zijn", "Die het warmst zijn"],
          a: "Die veel straling tegenhouden",
          fout: {
            "Die veel straling doorlaten": "Andersom. Waar veel straling doorheen gaat, wordt de foto juist donker.",
            "Die het dikst zijn": "Een dikke spier blijft toch donker. Het gaat om hoeveel straling er wordt tegengehouden.",
            "Die het warmst zijn": "Een röntgenfoto meet geen temperatuur."
          },
          w: "Tegenhouden = wit. Botten zijn dus wit.",
          meer: "Metaal houdt nog meer tegen dan bot. Een schroefje of munt is daarom fel wit op de foto." },

        { t: "mc", q: "Waarom maken artsen zo <b>weinig mogelijk</b> röntgenfoto's?",
          o: ["Röntgenstraling is schadelijk", "De foto wordt anders te wit", "Je bot kan er verder door breken", "De straling is te duur"],
          a: "Röntgenstraling is schadelijk",
          fout: {
            "De foto wordt anders te wit": "De foto is het probleem niet. Het gaat om je gezondheid.",
            "Je bot kan er verder door breken": "Straling breekt geen botten. Het beschadigt wel je lichaam.",
            "De straling is te duur": "Geld is niet de reden die je boek geeft. Röntgenstraling is schadelijk."
          },
          w: "Röntgenstraling is schadelijk voor je lichaam.",
          meer: "Eén foto is niet erg, maar te veel straling beschadigt je lichaam. Daarom krijg je alleen een foto als het echt nodig is." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Nu de instinkers. Er gebeurt iets spectaculairs (<b>vuur, warmte, gloed, kleur</b>) en meteen denk je: scheikunde. Maar de enige vraag blijft: <b>is er een andere stof ontstaan?</b>",
        "<b>Smelten</b> van kaarsvet is natuurkunde, ook al zit er een vlam bij. Het <b>branden</b> van de lont is wel scheikunde. <b>Oplossen</b> van suiker in thee is natuurkunde: de suiker zit er nog, verspreid in het water.",
        "<b>Kleur is geen bewijs.</b> Een gloeispiraal wordt rood, maar blijft hetzelfde metaal. Roest is wél een nieuwe stof. Soms gebeuren er <b>meer veranderingen tegelijk</b>: een verhitte spijker zet uit en gloeit (natuurkunde) en kan ook oxideren (scheikunde).",
        "Röntgen: wit op de foto betekent precies één ding: <b>veel straling tegengehouden</b>. Van een <b>ongeboren kind</b> maken artsen liever een <b>echo</b>: die werkt met geluidsgolven, en die zijn <b>niet schadelijk</b>."
      ],
      regel: "Niet kijken naar vuur, warmte, kleur of apparaten. Alleen kijken: is er een nieuwe stof?",
      voorbeelden: [
        { en: "Suiker oplossen in thee", nl: "nog steeds suiker, verspreid in het water", let: "<b>let op</b>: oplossen is niet hetzelfde als smelten. Allebei wel natuurkunde." },
        { en: "Een gloeispiraal die rood wordt", nl: "zet je hem uit, dan wordt hij weer grijs", let: "<b>let op</b>: kleur alleen bewijst geen nieuwe stof." },
        { en: "Echo van een ongeboren kind", nl: "geluidsgolven, niet schadelijk", let: "<b>let op</b>: röntgenstraling is wel schadelijk, dus daar is een echo veiliger." }
      ],
      vragen: [
        { t: "mc", q: "Storm en haar moeder kopen een geurkaars. Als hij brandt, wordt het kaarsvet vloeibaar. Waar hoort dat <b>smelten</b> bij?",
          o: ["Natuurkunde", "Scheikunde", "Biologie", "Bij geen enkel vak"],
          a: "Natuurkunde",
          fout: {
            "Scheikunde": "De bekendste instinker: er is vuur, dus het voelt scheikundig. Maar gesmolten kaarsvet is nog steeds kaarsvet: laat het afkoelen en het wordt weer hard. Alleen het branden van de lont is scheikunde.",
            "Biologie": "Kaarsvet leeft niet.",
            "Bij geen enkel vak": "Het is wel een verandering, van vast naar vloeibaar. Een tijdelijke, dus natuurkunde."
          },
          w: "Smelten is een verandering van toestand: dezelfde stof, natuurkunde.",
          meer: "Bij één kaars gebeuren twee dingen: het kaarsvet smelt (natuurkunde) en de lont brandt (scheikunde)." },

        { t: "mc", q: "De gloeispiraal van een kachel wordt rood als je hem aanzet. Waar hoort dat bij?",
          o: ["Natuurkunde, het metaal blijft hetzelfde", "Scheikunde, want er komt een kleur bij", "Scheikunde, want hij wordt heel heet", "Natuurkunde, want een kachel is een apparaat"],
          a: "Natuurkunde, het metaal blijft hetzelfde",
          fout: {
            "Scheikunde, want er komt een kleur bij": "Kleur alleen bewijst niets. Zet de kachel uit en de spiraal wordt weer grijs: het is nog hetzelfde metaal.",
            "Scheikunde, want hij wordt heel heet": "Warmte is geen bewijs. Bij smelten wordt het ook heet, en dat is natuurkunde.",
            "Natuurkunde, want een kachel is een apparaat": "Natuurkunde klopt, maar om de verkeerde reden. Een oven is ook een apparaat, en brood bakken is scheikunde."
          },
          w: "Het metaal blijft hetzelfde metaal, de gloed gaat weer weg.",
          meer: "Vergelijk met koper dat groen wordt: daar is wél een nieuwe stof. Bij een gloeiende spiraal niet." },

        { t: "mc", q: "Je lost een schepje suiker op in thee. Wat is er met de suiker gebeurd?",
          o: ["Hij zit verspreid in de thee", "Hij is een andere stof geworden", "Hij is helemaal verdwenen", "Hij is gesmolten tot water"],
          a: "Hij zit verspreid in de thee",
          fout: {
            "Hij is een andere stof geworden": "De thee smaakt zoet, dus de suiker is er nog. Laat het water verdampen en de suiker ligt er weer.",
            "Hij is helemaal verdwenen": "Weeg het maar: 200 g thee + 10 g suiker = 210 g. Er is niets weg.",
            "Hij is gesmolten tot water": "Smelten en oplossen zijn twee dingen. Smelten: vast wordt vloeibaar door warmte. Oplossen: verspreid raken in een vloeistof."
          },
          w: "Oplossen is natuurkunde: de suiker blijft suiker.",
          meer: "Oplossen en smelten worden vaak verward. Suiker lost ook op in koud water, zonder dat er iets smelt." },

        { t: "mc", q: "Waarom is 'de kleur veranderde' <b>geen bewijs</b> voor scheikunde?",
          o: ["Bij gloeien verandert de kleur ook, maar de stof niet",
              "Bij scheikunde verandert de kleur eigenlijk nooit",
              "Kleur is iets van biologie, want je ziet het met je ogen",
              "Een kleur kun je niet meten, dus het telt niet"],
          a: "Bij gloeien verandert de kleur ook, maar de stof niet",
          fout: {
            "Bij scheikunde verandert de kleur eigenlijk nooit": "Juist wel: roest is bruin en koper wordt groen. Kleur kan bij allebei veranderen, en daarom bewijst het niets.",
            "Kleur is iets van biologie, want je ziet het met je ogen": "Dat je iets met je ogen ziet, maakt het geen biologie. Je ziet ook bliksem.",
            "Een kleur kun je niet meten, dus het telt niet": "Daar gaat het niet om. Een kleur kan zowel bij een tijdelijke als bij een blijvende verandering veranderen."
          },
          w: "Kleur verandert bij allebei, dus het zegt niet welk vak.",
          meer: "Kleur is een aanwijzing, geen bewijs. Het bewijs is: is er een andere stof ontstaan?" },

        { t: "mc", q: "Een ijzeren spijker wordt met een brander verhit. Hij zet uit, gaat gloeien en oxideert. Welke verandering is <b>scheikundig</b>?",
          o: ["Oxideren", "Uitzetten", "Gloeien", "Afkoelen"],
          a: "Oxideren",
          fout: {
            "Uitzetten": "Uitzetten is tijdelijk: als hij afkoelt, krimpt hij weer. Natuurkunde.",
            "Gloeien": "Gloeien is tijdelijk: na het afkoelen is het weer gewoon grijs ijzer. Natuurkunde.",
            "Afkoelen": "Afkoelen verandert de stof niet. Het ijzer blijft ijzer."
          },
          w: "Bij oxideren ontstaat een nieuwe stof, de rest is tijdelijk.",
          meer: "Bij één proef kunnen dus natuurkundige én scheikundige veranderingen tegelijk gebeuren. Bekijk ze één voor één." },

        { t: "mc", q: "Met een mixer maak je van melk en aardbeien een milkshake. Er ontstaat geen nieuwe stof. Wat klopt?",
          o: ["Natuurkundig, er ontstaat geen nieuwe stof",
              "Natuurkundig, er zit een apparaat bij",
              "Scheikundig, het ziet er heel anders uit",
              "Biologisch, aardbeien komen van een plant"],
          a: "Natuurkundig, er ontstaat geen nieuwe stof",
          fout: {
            "Natuurkundig, er zit een apparaat bij": "Natuurkundig klopt, maar dit is de Apparatenman. Met een lepel roeren is net zo natuurkundig.",
            "Scheikundig, het ziet er heel anders uit": "Er anders uitzien is geen bewijs. De melk en de aardbei zitten er nog, alleen in stukjes door elkaar.",
            "Biologisch, aardbeien komen van een plant": "Geplukte en gemixte aardbeien leven niet meer. Het gaat om wat er met de stof gebeurt."
          },
          w: "Mengen maakt geen nieuwe stof: natuurkundig.",
          meer: "Het goede antwoord met de verkeerde reden telt op een toets maar half. Noem altijd: er ontstaat (geen) andere stof." },

        { t: "sleep", opgave: "De instinkers: welke kant op?",
          chips: [ {t:"suiker oplossen", bak:"nat"}, {t:"koper dat groen wordt", bak:"schei"},
                   {t:"een gloeispiraal die rood wordt", bak:"nat"}, {t:"een lucifer die afbrandt", bak:"schei"},
                   {t:"kaarsvet dat smelt", bak:"nat"}, {t:"melk die zuur wordt", bak:"schei"} ],
          bakjes: [ {id:"nat", label:"Natuurkundig", som:"zelfde stof"},
                    {id:"schei", label:"Scheikundig", som:"nieuwe stof"} ],
          w: "Niet kijken naar vuur of kleur. Alleen: nieuwe stof, ja of nee?",
          meer: "Zure melk wordt nooit meer verse melk: blijvend. Een gloeispiraal wordt gewoon weer grijs: tijdelijk." },

        { t: "mc", q: "Op een röntgenfoto zie je een fel witte vlek in iemands keel. Wat weet je <b>zeker</b>?",
          o: ["Het houdt veel straling tegen", "Het is gemaakt van plastic", "Het is warmer dan de keel", "Het is zwaarder dan een bot"],
          a: "Het houdt veel straling tegen",
          fout: {
            "Het is gemaakt van plastic": "Plastic houdt juist weinig straling tegen. Metaal is waarschijnlijker, maar zeker weet je alleen dat het veel tegenhoudt.",
            "Het is warmer dan de keel": "Een röntgenfoto zegt niets over temperatuur.",
            "Het is zwaarder dan een bot": "Een foto weegt niets. Je ziet alleen hoeveel straling er tegengehouden wordt."
          },
          w: "Wit betekent: veel straling tegengehouden. Meer weet je niet zeker.",
          meer: "Dat het waarschijnlijk metaal is (een muntje, een schroefje), is een goede gok. Maar het enige wat de foto bewijst, is het tegenhouden." },

        { t: "mc", q: "Waarom maakt de arts van een <b>ongeboren kind</b> een echo en geen röntgenfoto?",
          o: ["Geluidsgolven zijn niet schadelijk", "Een echo laat de botten beter zien", "Röntgenstraling gaat niet door een buik", "Een echo is sneller klaar dan een foto"],
          a: "Geluidsgolven zijn niet schadelijk",
          fout: {
            "Een echo laat de botten beter zien": "Voor botten is een röntgenfoto juist duidelijker. De reden is veiligheid.",
            "Röntgenstraling gaat niet door een buik": "Die gaat er wel doorheen, net als door je hand. Maar de straling is schadelijk, en een ongeboren kind is extra kwetsbaar.",
            "Een echo is sneller klaar dan een foto": "Snelheid is niet de reden. Het gaat erom dat geluid niet schadelijk is en röntgenstraling wel."
          },
          w: "Echo = geluid = niet schadelijk. Röntgen = straling = schadelijk.",
          meer: "Een echo gebruikt geluid met zo'n hoge toon dat je het niet kunt horen. Het kind merkt er niets van." },

        { t: "open", q: "Leg uit waarom het <b>smelten</b> van ijs bij natuurkunde hoort en het <b>verbranden</b> van hout bij scheikunde.",
          punten: 2,
          modelantwoord: "Gesmolten ijs is nog steeds water: dezelfde stof, en je kunt het weer laten bevriezen. Dat is tijdelijk, dus natuurkunde. Bij verbranden ontstaan as en rook: andere stoffen, en daar maak je nooit meer hout van. Dat is blijvend, dus scheikunde.",
          sleutelwoorden: [
            { moet: ["zelfde stof"], syn: ["dezelfde stof", "nog steeds water", "blijft water", "tijdelijk", "terugdraaien", "bevriezen"] },
            { moet: ["andere stof"], syn: ["nieuwe stof", "as", "blijvend", "niet terug", "nooit meer hout"] }
          ],
          rubric: ["Smelten: de stof blijft dezelfde stof (tijdelijk, terug te draaien), dus natuurkunde",
                   "Verbranden: er ontstaan andere stoffen (blijvend), dus scheikunde"],
          w: "Dezelfde stof = tijdelijk = natuurkunde. Andere stof = blijvend = scheikunde.",
          meer: "Gebruik in je antwoord altijd het woord stof: 'er ontstaat (geen) andere stof'. Dat is het kernpunt waar de punten voor zijn." }
      ]
    }
  ]
};

/* ================================================================ methode (1.2.1, 1.2.2, 1.2.4) */
window.__TOPICS["methode"] = {
  id: "methode", emoji: "🔎", titel: "H1 · Onderzoeken: methode, veilig waarnemen, indicator",
  kort: "Zes vaste stappen, waarnemen zonder te proeven, en jodium dat blauw wordt bij zetmeel.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Een onderzoek gaat volgens vaste stappen: de <b>wetenschappelijke methode</b>.<br><b>1.</b> Onderzoeksvraag opstellen<br><b>2.</b> Hypothese bedenken<br><b>3.</b> Experiment bedenken<br><b>4.</b> Experiment uitvoeren<br><b>5.</b> Meetresultaten in een tabel en/of grafiek<br><b>6.</b> Onderzoeksvraag beantwoorden (de conclusie)",
        "In de <b>onderzoeksvraag</b> staat wat je wilt <b>ontdekken</b>: <i>Welke temperatuur heeft kokend water?</i> De <b>hypothese</b> is je <b>voorlopige antwoord</b>: wat denk je vooraf dat eruit komt?",
        "<b>Waarnemen</b> doe je met je <b>zintuigen</b>: zien, horen, ruiken, voelen en proeven. Maar in het lab mag <b>proeven nooit</b>.",
        "Een <b>indicator</b> is een stof die laat zien of een andere stof er is, door van <b>kleur</b> te veranderen. <b>Jodium</b> is bruingeel en wordt <b>donkerblauw</b> bij <b>zetmeel</b>."
      ],
      regel: "Vraag → hypothese → experiment bedenken → uitvoeren → tabel/grafiek → conclusie.",
      voorbeelden: [
        { en: "Zit er zetmeel in een witte boterham?", nl: "onderzoeksvraag", let: "<b>let op</b>: een vraag, met een vraagteken." },
        { en: "Nee, er zit geen zetmeel in.", nl: "hypothese", let: "<b>let op</b>: dit schrijf je op vóór de proef. Het mag fout blijken." },
        { en: "Jodium op de boterham → donkerblauw", nl: "de indicator laat zien: er is zetmeel", let: "<b>let op</b>: jodium zelf is bruingeel." }
      ],
      vragen: [
        { t: "sequence", q: "Zet de stappen van de wetenschappelijke methode in de goede volgorde.",
          stappen: ["Onderzoeksvraag opstellen", "Hypothese bedenken", "Experiment bedenken",
                    "Experiment uitvoeren", "Meetresultaten in een tabel of grafiek zetten",
                    "Onderzoeksvraag beantwoorden"],
          w: "Eerst weten wat je wilt ontdekken, dan voorspellen, dan pas doen.",
          meer: "Bedenken komt vóór uitvoeren, en het antwoord komt helemaal aan het eind." },

        { t: "mc", q: "Wat is een <b>hypothese</b>?",
          o: ["Wat je vooraf denkt dat eruit komt", "Het antwoord dat je na de proef hebt", "De vraag die je wilt onderzoeken", "De tabel met je meetresultaten"],
          a: "Wat je vooraf denkt dat eruit komt",
          fout: {
            "Het antwoord dat je na de proef hebt": "Dat is de conclusie. De hypothese komt juist vóór het experiment.",
            "De vraag die je wilt onderzoeken": "Dat is de onderzoeksvraag. De hypothese is je voorlopige antwoord daarop.",
            "De tabel met je meetresultaten": "Die hoort bij stap 5. De hypothese is een voorspelling in woorden."
          },
          w: "Hypothese = voorlopig antwoord, vooraf.",
          meer: "Volgorde: vraag → hypothese (vooraf) → experiment → conclusie (achteraf)." },

        { t: "mc", q: "Wat staat er in de <b>onderzoeksvraag</b>?",
          o: ["Wat je wilt ontdekken", "Wat je hebt ontdekt", "Hoe je de proef doet", "Welke spullen je pakt"],
          a: "Wat je wilt ontdekken",
          fout: {
            "Wat je hebt ontdekt": "Dat is de conclusie, helemaal aan het eind.",
            "Hoe je de proef doet": "Dat bedenk je in stap 3. De onderzoeksvraag zegt alleen wát je wilt weten.",
            "Welke spullen je pakt": "Die horen bij het bedenken van het experiment, niet bij de vraag."
          },
          w: "Onderzoeksvraag = wat je wilt ontdekken.",
          meer: "Je herkent hem vaak aan het vraagteken: 'Hoever rijdt een fiets door als je stopt met trappen?'" },

        { t: "gap", q: "De werkwijze met vaste stappen heet de ___ methode.",
          a: "wetenschappelijke", soepel: true,
          w: "De wetenschappelijke methode.",
          meer: "Elk natuurkundig of scheikundig onderzoek volgt dezelfde zes stappen." },

        { t: "mc", q: "Welke stap komt direct <b>na</b> het bedenken van je hypothese?",
          o: ["Het experiment bedenken", "Het experiment uitvoeren", "De conclusie opschrijven", "De tabel invullen"],
          a: "Het experiment bedenken",
          fout: {
            "Het experiment uitvoeren": "Eerst moet je bedenken wat je gaat doen. Uitvoeren is stap 4.",
            "De conclusie opschrijven": "De conclusie komt helemaal aan het eind, stap 6.",
            "De tabel invullen": "Een tabel kun je pas invullen als je gemeten hebt, in stap 5."
          },
          w: "Stap 2 hypothese, stap 3 experiment bedenken.",
          meer: "Bedenken (3) en uitvoeren (4) zijn twee aparte stappen. Eerst plannen, dan pas doen." },

        { t: "gap", q: "Een onderdeel van je lichaam waarmee je kunt waarnemen, heet een ___.",
          a: "zintuig|zintuigen", soepel: true,
          w: "Een zintuig.",
          meer: "Je ogen, oren, neus, huid en tong zijn zintuigen. Daarmee zie, hoor, ruik, voel en proef je." },

        { t: "mc", q: "Welke waarneming mag je bij natuur- en scheikunde <b>nooit</b> doen?",
          o: ["Proeven", "Ruiken", "Voelen", "Luisteren"],
          a: "Proeven",
          fout: {
            "Ruiken": "Ruiken mag wel, maar alleen voorzichtig. Proeven mag nooit.",
            "Voelen": "Voelen mag altijd, bijvoorbeeld of een buisje warm wordt.",
            "Luisteren": "Horen mag altijd, bijvoorbeeld of iets sist."
          },
          w: "Proeven mag nooit: sommige stoffen zijn giftig.",
          meer: "Ook niet een heel klein beetje, ook niet als het er onschuldig uitziet." },

        { t: "mc", q: "Wat doet een <b>indicator</b>?",
          o: ["Hij laat zien of een stof er is", "Hij meet hoeveel gram er is", "Hij maakt een nieuwe stof", "Hij meet de temperatuur"],
          a: "Hij laat zien of een stof er is",
          fout: {
            "Hij meet hoeveel gram er is": "Hoeveel gram meet je met een weegschaal. Een indicator zegt alleen óf een stof er is.",
            "Hij maakt een nieuwe stof": "Een indicator is er om iets aan te tonen, niet om iets te maken.",
            "Hij meet de temperatuur": "Dat doe je met een thermometer."
          },
          w: "Een indicator toont aan of een stof aanwezig is, met een kleur.",
          meer: "Er zijn indicatoren voor suiker, alcohol, zetmeel, koolstofdioxide en nog veel meer." },

        { t: "mc", q: "Welke kleur krijgt jodium als het bij <b>zetmeel</b> komt?",
          o: ["Donkerblauw", "Bruingeel", "Helder oranje", "Kleurloos"],
          a: "Donkerblauw",
          fout: {
            "Bruingeel": "Dat is de kleur van jodium zelf, voordat het bij zetmeel komt.",
            "Helder oranje": "Oranje hoort niet bij jodium en zetmeel. Het wordt juist donker.",
            "Kleurloos": "De kleur wordt juist donkerder, niet lichter."
          },
          w: "Bruingeel → donkerblauw.",
          meer: "Onthoud het als paar: jodium is bruingeel, bij zetmeel wordt het donkerblauw." },

        { t: "mc", q: "Storm wil weten of ze sneller zwemt mét of zonder badmuts. Wat is een goede <b>onderzoeksvraag</b>?",
          o: ["Zwem ik sneller met een badmuts?", "Ik denk dat ik met badmuts sneller ga.", "Ik zwem met badmuts 2 seconden sneller.", "Ik zwem twee keer 50 meter."],
          a: "Zwem ik sneller met een badmuts?",
          fout: {
            "Ik denk dat ik met badmuts sneller ga.": "Dat is een voorspelling vooraf: een hypothese, geen vraag.",
            "Ik zwem met badmuts 2 seconden sneller.": "Dat is al een uitkomst. Na de metingen is dit de conclusie.",
            "Ik zwem twee keer 50 meter.": "Dat is wat ze gaat doen: het experiment. Niet wat ze wil weten."
          },
          w: "Een onderzoeksvraag vraagt wat je nog niet weet.",
          meer: "Een goede onderzoeksvraag kun je met een meting beantwoorden. Hier: de tijd meten met en zonder badmuts." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Het lastige is niet de rij stappen, maar dit: <b>is deze zin een onderzoeksvraag, een hypothese of een conclusie?</b>",
        "<b>Onderzoeksvraag</b>: een vraag. Vraagteken, of een 'wil weten'-zin: <i>Serge wil weten hoe hoog het klaslokaal is.</i><br><b>Hypothese</b>: een voorspelling <b>vooraf</b>, vaak met <i>ik denk dat, ik verwacht, waarschijnlijk</i>.<br><b>Conclusie</b>: een antwoord <b>achteraf</b>, als feit: <i>Nick is de langste van de klas.</i>",
        "<b>Veilig waarnemen.</b> <b>Zien, horen en voelen</b> mag altijd. <b>Ruiken</b> alleen <b>voorzichtig</b>: wapper de damp naar je toe, want de damp van sommige stoffen is giftig en kan je longen beschadigen. <b>Proeven nooit</b>: sommige stoffen maken je ernstig ziek.",
        "Je zintuigen zijn niet <b>nauwkeurig</b>. Je ziet dát een elastiekje langer wordt, niet hoevéél. Daarvoor meet je met een <b>meetinstrument</b>. Ook het <b>blaaspijpje</b> van de politie was een indicator: voor <b>alcohol</b>."
      ],
      regel: "Vraag = onderzoeksvraag. Voorspelling vooraf = hypothese. Feit achteraf = conclusie. Proeven: nooit.",
      voorbeelden: [
        { en: "Wie is de langste van de klas?", nl: "onderzoeksvraag", let: "<b>let op</b>: ook 'X wil weten ...' is een onderzoeksvraag." },
        { en: "Ik verwacht dat Nick de langste is.", nl: "hypothese", let: "<b>let op</b>: 'ik verwacht' wijst op een voorspelling." },
        { en: "Nick is de langste van de klas.", nl: "conclusie", let: "<b>let op</b>: geschreven als feit, na het meten." }
      ],
      vragen: [
        { t: "vb", opgave: "Uitgewerkt voorbeeld: 'Ik denk dat water kookt bij 100 °C.' Is dit een onderzoeksvraag, hypothese of conclusie?",
          stappen: [
            { toon: "Stap 1: is het een vraag?", uitleg: "Nee: geen vraagteken en geen 'wil weten'. Dus geen onderzoeksvraag." },
            { toon: "Stap 2: is het een voorspelling of een feit?", uitleg: "Er staat 'ik denk dat'. Je weet het nog niet zeker." },
            { toon: "Stap 3: vooraf of achteraf?", uitleg: "Vooraf: er is nog niet gemeten." },
            { toon: "Conclusie: hypothese", uitleg: "Een voorlopig antwoord, vooraf opgeschreven." }
          ],
          waarom: { q: "Waarom is dit geen conclusie?",
                    o: ["omdat er nog niet gemeten is", "omdat er een getal in de zin staat", "omdat de zin over water gaat"],
                    a: "omdat er nog niet gemeten is" },
          fout: {
            "omdat er een getal in de zin staat": "Een conclusie mag best een getal hebben: 'Water kookt bij 100 °C.' Het gaat om vooraf of achteraf.",
            "omdat de zin over water gaat": "Waar de zin over gaat, maakt niet uit. Het gaat erom of je al gemeten hebt."
          },
          w: "'Ik denk dat' + nog niet gemeten = hypothese.",
          meer: "Haal je 'ik denk dat' weg en heb je gemeten, dan wordt dezelfde zin de conclusie: 'Water kookt bij 100 °C.'" },

        { t: "mc", q: "'Serge wil weten hoe hoog het klaslokaal is.' Wat is dit?",
          o: ["Een onderzoeksvraag", "Een hypothese", "Een conclusie", "Een meetwaarde met eenheid"],
          a: "Een onderzoeksvraag",
          fout: {
            "Een hypothese": "Serge voorspelt niets: hij zegt niet 'ik denk 3 meter'.",
            "Een conclusie": "Serge weet het nog niet, hij wil het weten. Een conclusie komt pas na het meten.",
            "Een meetwaarde met eenheid": "Er staat geen getal met een eenheid in de zin."
          },
          w: "'Wil weten' is een onderzoeksvraag zonder vraagteken.",
          meer: "Een onderzoeksvraag hoeft geen vraagzin te zijn. 'X wil weten hoe/of/hoeveel ...' telt ook." },

        { t: "mc", q: "Na de proef schrijft Lisa op: 'Papier brandt sneller dan hout.' Wat is dit?",
          o: ["Een conclusie", "Een hypothese", "Een onderzoeksvraag", "Een experiment"],
          a: "Een conclusie",
          fout: {
            "Een hypothese": "Een hypothese schrijf je vóór de proef. Lisa schrijft dit erna, als feit.",
            "Een onderzoeksvraag": "Er wordt niets gevraagd, er wordt iets vastgesteld.",
            "Een experiment": "Een experiment is wat je doet, niet wat je achteraf opschrijft."
          },
          w: "Na de proef, als feit opgeschreven = conclusie.",
          meer: "Had Lisa vóór de proef geschreven 'Ik denk dat papier sneller brandt', dan was het een hypothese." },

        { t: "sleep", opgave: "Onderzoeksvraag, hypothese of conclusie?",
          chips: [ {t:"Hoe snel gaat een e-bike?", bak:"vraag"},
                   {t:"Ik verwacht dat de e-bike sneller is", bak:"hyp"},
                   {t:"De e-bike is 8 km/u sneller", bak:"con"},
                   {t:"Storm wil weten hoe ver ze een bal schiet", bak:"vraag"},
                   {t:"Waarschijnlijk zit er geen zetmeel in", bak:"hyp"},
                   {t:"Er zit wel zetmeel in het brood", bak:"con"} ],
          bakjes: [ {id:"vraag", label:"Onderzoeksvraag", som:"vraag / wil weten"},
                    {id:"hyp", label:"Hypothese", som:"voorspelling vooraf"},
                    {id:"con", label:"Conclusie", som:"feit achteraf"} ],
          w: "Signaalwoorden: vraagteken of 'wil weten', 'ik verwacht/waarschijnlijk', of een kaal feit.",
          meer: "Een hypothese en een conclusie kunnen bijna dezelfde zin zijn. Het verschil is wanneer: vóór of ná het experiment." },

        { t: "mc", q: "Welke waarnemingen mag je <b>altijd</b> doen bij een onderzoek?",
          o: ["Zien, horen en voelen", "Zien, horen en ruiken", "Horen, voelen en proeven", "Ruiken, voelen en zien"],
          a: "Zien, horen en voelen",
          fout: {
            "Zien, horen en ruiken": "Ruiken mag niet altijd, alleen voorzichtig. De damp van sommige stoffen is giftig.",
            "Horen, voelen en proeven": "Proeven mag nooit. Sommige stoffen zijn giftig.",
            "Ruiken, voelen en zien": "Ruiken hoort hier niet bij: dat mag alleen voorzichtig."
          },
          w: "Altijd: zien, horen, voelen. Voorzichtig: ruiken. Nooit: proeven.",
          meer: "Klassieke toetsvraag. Staat proeven of ruiken in het rijtje 'altijd', dan is het fout." },

        { t: "mc", q: "Hoe ruik je <b>veilig</b> aan een stof?",
          o: ["Damp voorzichtig naar je toe wapperen", "Diep inademen vlak boven het potje", "Even snel snuiven, dan is het kort", "Niet: ruiken mag net als proeven nooit"],
          a: "Damp voorzichtig naar je toe wapperen",
          fout: {
            "Diep inademen vlak boven het potje": "Precies wat je niet moet doen: giftige damp komt dan vol in je longen.",
            "Even snel snuiven, dan is het kort": "Kort maar krachtig snuiven trekt nog steeds veel damp je longen in. Wapperen houdt het klein.",
            "Niet: ruiken mag net als proeven nooit": "Ruiken mag wel, alleen voorzichtig. Proeven is wat nooit mag."
          },
          w: "Ruiken mag, maar alleen door voorzichtig te wapperen.",
          meer: "Met wapperen houd je de hoeveelheid damp klein. Zo kun je ruiken zonder je longen te beschadigen." },

        { t: "sleep", opgave: "Mag dit bij natuur- en scheikunde?",
          chips: [ {t:"kijken naar de kleur", bak:"ja"}, {t:"luisteren of het sist", bak:"ja"},
                   {t:"voelen of de buis warm wordt", bak:"ja"}, {t:"damp naar je toe wapperen", bak:"voorzichtig"},
                   {t:"een klein beetje op je tong", bak:"nooit"}, {t:"aan je vinger likken na de proef", bak:"nooit"} ],
          bakjes: [ {id:"ja", label:"Mag altijd", som:"zien, horen, voelen"},
                    {id:"voorzichtig", label:"Alleen voorzichtig", som:"ruiken"},
                    {id:"nooit", label:"Mag nooit", som:"proeven"} ],
          w: "Alles wat via je mond gaat, mag nooit.",
          meer: "Ook aan je vinger likken is proeven: er kan stof aan zitten. Was na een proef altijd je handen." },

        { t: "mc", q: "Een klasgenoot zegt: 'Een klein beetje proeven kan geen kwaad. Ruiken is veel gevaarlijker.' Wat klopt?",
          o: ["Andersom: proeven nooit, ruiken voorzichtig", "Klopt: ruiken is gevaarlijker dan proeven", "Allebei mag, als je maar heel weinig neemt", "Allebei mag nooit bij een onderzoek"],
          a: "Andersom: proeven nooit, ruiken voorzichtig",
          fout: {
            "Klopt: ruiken is gevaarlijker dan proeven": "Dit is De Proever. Proeven mag nooit, ook niet een beetje: sommige stoffen maken je ernstig ziek.",
            "Allebei mag, als je maar heel weinig neemt": "Voor ruiken klopt 'weinig' (wapperen), maar proeven mag ook niet een klein beetje.",
            "Allebei mag nooit bij een onderzoek": "Ruiken mag wel, alleen voorzichtig. Alleen proeven mag nooit."
          },
          w: "Ruiken: voorzichtig. Proeven: nooit.",
          meer: "Sommige giftige stoffen smaken gewoon zoet. Aan de smaak merk je het gevaar dus niet." },

        { t: "mc", q: "Waarom is waarnemen met je zintuigen <b>niet genoeg</b> bij een onderzoek?",
          o: ["Het is niet nauwkeurig genoeg", "Je zintuigen werken niet in een lab", "Het duurt te lang om te kijken", "Je mag geen zintuigen gebruiken"],
          a: "Het is niet nauwkeurig genoeg",
          fout: {
            "Je zintuigen werken niet in een lab": "Ze werken prima: je kijkt de hele tijd wat er gebeurt.",
            "Het duurt te lang om te kijken": "Snelheid is niet het probleem. Je weet alleen niet hoevéél er verandert.",
            "Je mag geen zintuigen gebruiken": "Zien, horen en voelen mag altijd. Alleen proeven niet."
          },
          w: "Zintuigen zien dát iets verandert, een meetinstrument zegt hoevéél.",
          meer: "Hang een blokje aan een elastiekje: je ziet dat het langer wordt. Hoeveel langer weet je pas met een liniaal." },

        { t: "mc", q: "De politie gebruikte vroeger een blaaspijpje. Welke stof toonden ze daarmee aan?",
          o: ["Alcohol", "Zetmeel", "Suiker", "Koolstofdioxide"],
          a: "Alcohol",
          fout: {
            "Zetmeel": "Zetmeel toon je aan met jodium, en dat zit niet in je adem.",
            "Suiker": "Er zijn indicatoren voor suiker, maar daar controleerde de politie niet op.",
            "Koolstofdioxide": "Koolstofdioxide blaas je altijd uit, ook als je niets gedronken hebt. Dat zou niets bewijzen."
          },
          w: "Het blaaspijpje was een indicator voor alcohol.",
          meer: "Dezelfde truc als bij jodium: de stof in het pijpje verandert van kleur als er alcohol in je adem zit." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Nu het hele onderzoek in één keer, met het boterham-onderzoek:<br><b>Vraag:</b> zit er zetmeel in een witte boterham?<br><b>Hypothese:</b> nee.<br><b>Proef:</b> druppel jodium op de boterham.<br><b>Uitvoeren:</b> het wordt donkerblauw.<br><b>Conclusie:</b> er zit wél zetmeel in. De hypothese was <b>niet juist</b>.",
        "<b>De hypothese is niet de conclusie.</b> De conclusie komt uit je <b>meting</b>, niet uit je voorspelling. Een foute hypothese is geen mislukking: je hebt juist iets ontdekt.",
        "Een indicator geeft twee echte uitkomsten: <b>kleur verandert</b> = de stof is er; <b>kleur blijft</b> = de stof is er niet. Jodium dat bruingeel blijft, zegt dus: geen zetmeel.",
        "Kies je proef bij je vraag. Met jodium kun je alleen een vraag over <b>zetmeel</b> beantwoorden, niet over hoe zwaar of hoe lekker iets is."
      ],
      regel: "De conclusie volgt uit de meting. Klopt die niet met je hypothese, dan schrijf je: de hypothese was niet juist.",
      voorbeelden: [
        { en: "Hypothese 'geen zetmeel', jodium wordt donkerblauw", nl: "conclusie: wel zetmeel, hypothese niet juist", let: "<b>let op</b>: je past de meting niet aan je voorspelling aan." },
        { en: "Jodium blijft bruingeel op een plakje komkommer", nl: "conclusie: geen zetmeel", let: "<b>let op</b>: 'er gebeurt niets' is ook een echte uitkomst." }
      ],
      vragen: [
        { t: "mc", q: "De hypothese was: 'Er zit geen zetmeel in een witte boterham.' Het jodium wordt donkerblauw. Wat is de conclusie?",
          o: ["Er zit wel zetmeel in; de hypothese was niet juist",
              "Er zit geen zetmeel in; het jodium deed het niet goed",
              "De hypothese was juist, want het jodium veranderde",
              "Je kunt hier nog helemaal niets over zeggen"],
          a: "Er zit wel zetmeel in; de hypothese was niet juist",
          fout: {
            "Er zit geen zetmeel in; het jodium deed het niet goed": "Dan redeneer je je meting weg omdat hij je niet bevalt. Donkerblauw is precies het teken van zetmeel.",
            "De hypothese was juist, want het jodium veranderde": "De verandering laat zien dát er zetmeel is: het tegenovergestelde van de hypothese.",
            "Je kunt hier nog helemaal niets over zeggen": "Je kunt er juist veel over zeggen: jodium wordt donkerblauw bij zetmeel, en dat gebeurde."
          },
          w: "Donkerblauw = zetmeel. De hypothese zei 'geen', dus die was niet juist.",
          meer: "Een foute hypothese is geen mislukte proef. Je hebt iets nieuws ontdekt." },

        { t: "mc", q: "Je druppelt jodium op een plakje komkommer. Het blijft <b>bruingeel</b>. Wat concludeer je?",
          o: ["Er zit geen zetmeel in", "Er zit veel zetmeel in", "Het jodium is kapot", "Je moet het proeven"],
          a: "Er zit geen zetmeel in",
          fout: {
            "Er zit veel zetmeel in": "Dan was het donkerblauw geworden. Bruingeel blijven betekent: geen zetmeel.",
            "Het jodium is kapot": "Dat mag je niet zomaar aannemen. Twijfel je, test het jodium dan op iets met zeker zetmeel, zoals brood.",
            "Je moet het proeven": "Proeven mag nooit, en het jodium heeft je het antwoord al gegeven."
          },
          w: "Geen kleurverandering = de stof is er niet.",
          meer: "Kleur verandert = ja, kleur blijft = nee. Allebei zijn het echte uitkomsten." },

        { t: "sequence", q: "Zet dit zetmeel-onderzoek in de goede volgorde.",
          stappen: ["Vraag: zit er zetmeel in een cracker?",
                    "Hypothese: ik denk dat er zetmeel in zit",
                    "Bedenken: ik druppel jodium op de cracker",
                    "Uitvoeren: de cracker wordt donkerblauw",
                    "Resultaat in een tabel zetten",
                    "Conclusie: er zit zetmeel in; de hypothese was juist"],
          w: "Vraag, voorspelling, plan, doen, opschrijven, antwoord.",
          meer: "De conclusie staat altijd achteraan en verwijst terug naar de hypothese: juist of niet juist." },

        { t: "mc", q: "Tim had als hypothese 'Er zit zetmeel in'. Het jodium bleef bruingeel. Hij schrijft: 'Conclusie: er zit zetmeel in.' Wat gaat er mis?",
          o: ["Hij schrijft zijn hypothese over", "Hij had geen jodium mogen gebruiken", "Hij had eerst moeten proeven", "Er gaat niets mis"],
          a: "Hij schrijft zijn hypothese over",
          fout: {
            "Hij had geen jodium mogen gebruiken": "Jodium is juist de goede indicator voor zetmeel. De meting was prima.",
            "Hij had eerst moeten proeven": "Proeven mag nooit in het lab, en het lost niets op.",
            "Er gaat niets mis": "Wel: bruingeel betekent geen zetmeel. Zijn conclusie zegt het tegenovergestelde van zijn meting."
          },
          w: "De conclusie komt uit de meting, niet uit de hypothese.",
          meer: "Goede conclusie: 'Er zit geen zetmeel in; mijn hypothese was niet juist.'" },

        { t: "mc", q: "Waarom schrijf je je hypothese op <b>vóórdat</b> je het experiment doet?",
          o: ["Anders pas je hem aan aan de uitkomst", "Omdat het er netter uitziet", "Dan klopt hij altijd", "Dat hoeft niet, achteraf mag ook"],
          a: "Anders pas je hem aan aan de uitkomst",
          fout: {
            "Omdat het er netter uitziet": "Netheid is niet de reden. Een voorspelling telt alleen als je hem vooraf doet.",
            "Dan klopt hij altijd": "Juist niet: vooraf opgeschreven kan hij fout blijken, en dat hoort zo.",
            "Dat hoeft niet, achteraf mag ook": "Achteraf weet je de uitkomst al. Dan is het geen voorspelling meer."
          },
          w: "Een voorspelling is alleen een voorspelling als je hem vooraf doet.",
          meer: "Daarom heeft de wetenschappelijke methode een vaste volgorde: hypothese (2) vóór uitvoeren (4)." },

        { t: "mc", q: "Welke onderzoeksvraag kun je met <b>jodium</b> beantwoorden?",
          o: ["Zit er zetmeel in een cracker?", "Hoe zwaar is een cracker?", "Hoe lang duurt het eten ervan?", "Is een cracker lekker?"],
          a: "Zit er zetmeel in een cracker?",
          fout: {
            "Hoe zwaar is een cracker?": "Daarvoor heb je een weegschaal nodig. Jodium meet geen massa.",
            "Hoe lang duurt het eten ervan?": "Dat meet je met een stopwatch. Het heeft niets met een indicator te maken.",
            "Is een cracker lekker?": "Dat is een mening, en proeven mag nooit in het lab."
          },
          w: "Jodium is de indicator voor zetmeel.",
          meer: "Een indicator beantwoordt een ja/nee-vraag: is de stof er of niet?" },

        { t: "mc", q: "Onderzoeksvraag: 'Zit er zetmeel in een aardappel?' Welke zin is de <b>hypothese</b>?",
          o: ["Ik denk dat er zetmeel in een aardappel zit",
              "Zit er wel of geen zetmeel in een aardappel?",
              "Ik druppel jodium op een plakje aardappel",
              "Hij werd blauw, dus er zit zetmeel in"],
          a: "Ik denk dat er zetmeel in een aardappel zit",
          fout: {
            "Zit er wel of geen zetmeel in een aardappel?": "Dat is nog steeds een vraag. De hypothese is je voorlopige antwoord.",
            "Ik druppel jodium op een plakje aardappel": "Dat is het experiment: wat je gaat doen.",
            "Hij werd blauw, dus er zit zetmeel in": "Dat is de conclusie, achteraf. De hypothese schrijf je vooraf."
          },
          w: "'Ik denk dat' + vooraf = hypothese.",
          meer: "Vraag (2: hypothese) → plan (3) → doen (4) → conclusie (6). Elke zin hoort bij een andere stap." },

        { t: "mc", q: "In het lab ruikt een vloeistof naar chloor, net als het zwembad waar Storm zwemt. Je wilt weten wat het is. Wat doe je?",
          o: ["Voorzichtig wapperen, en zeker niet proeven",
              "Diep ruiken, zwembadlucht is toch veilig",
              "Een druppel proeven, chloor ken ik al",
              "Jodium erbij doen om chloor aan te tonen"],
          a: "Voorzichtig wapperen, en zeker niet proeven",
          fout: {
            "Diep ruiken, zwembadlucht is toch veilig": "In het zwembad zit heel weinig chloor in veel water. In het lab weet je niet wat het is of hoe sterk. Altijd voorzichtig wapperen.",
            "Een druppel proeven, chloor ken ik al": "Proeven mag nooit, ook niet als je denkt te weten wat het is.",
            "Jodium erbij doen om chloor aan te tonen": "Jodium is de indicator voor zetmeel, niet voor chloor."
          },
          w: "Onbekende stof: voorzichtig wapperen, nooit proeven.",
          meer: "Dat iets bekend ruikt, zegt niet dat het veilig is. De regels gelden altijd." },

        { t: "gap", q: "Een stof waarmee je kunt aantonen of een andere stof aanwezig is, heet een ___.",
          a: "indicator", soepel: true,
          w: "Een indicator verandert van kleur als de stof er is.",
          meer: "Jodium (zetmeel) en het blaaspijpje (alcohol) zijn voorbeelden." },

        { t: "open", q: "Leg uit wat het verschil is tussen een <b>hypothese</b> en een <b>conclusie</b>.",
          punten: 2,
          modelantwoord: "Een hypothese is een voorlopig antwoord dat je vóór het experiment opschrijft: wat je verwacht. De conclusie is het antwoord op de onderzoeksvraag dat je ná het experiment geeft, op basis van je metingen. De hypothese kan dus fout blijken.",
          sleutelwoorden: [
            { moet: ["voor"], syn: ["vooraf", "vóór", "verwacht", "voorspel", "voorlopig", "denk"] },
            { moet: ["na"], syn: ["achteraf", "ná", "meting", "resultaat", "uitkomst", "na het experiment"] }
          ],
          rubric: ["Hypothese: voorlopig antwoord of voorspelling, vóór het experiment",
                   "Conclusie: antwoord op de onderzoeksvraag ná het experiment, uit de metingen"],
          w: "Hypothese = vooraf (voorspelling). Conclusie = achteraf (uit de meting).",
          meer: "Bij de witte boterham waren ze verschillend: hypothese 'geen zetmeel', conclusie 'wel zetmeel'." }
      ]
    }
  ]
};

/* ================================================================ grootheid (1.2.3) */
window.__TOPICS["grootheid"] = {
  id: "grootheid", emoji: "📏", titel: "H1 · Grootheid, eenheid en meetwaarde",
  kort: "Het getal, de maat en wat je meet: drie verschillende dingen, met elk hun eigen meetinstrument.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Met je zintuigen zie je dát iets verandert. Wil je weten hoevéél, dan moet je <b>meten</b> met een <b>meetinstrument</b>.",
        "Je staat op de weegschaal en leest <b>52</b> af. 'Ik weeg 52' is in de natuurkunde <b>niet goed</b>: je zegt <b>52 kilogram</b>. In die meting zitten drie dingen:",
        "<b>meetwaarde</b> = het <b>getal</b> (52)<br><b>eenheid</b> = de <b>maat</b>, staat altijd achter het getal (kg)<br><b>grootheid</b> = de <b>eigenschap</b> die je meet (massa)",
        "De gouden test: <b>'25 meter' kun je zeggen, '25 lengte' niet.</b> Wat achter een getal past, is de eenheid. Wat je meet, is de grootheid."
      ],
      regel: "Getal = meetwaarde. Maat achter het getal = eenheid. Wat je meet = grootheid.",
      voorbeelden: [
        { en: "Het zwembad is 25 meter lang.", nl: "25 = meetwaarde · meter = eenheid · lengte = grootheid", let: "<b>let op</b>: 'lang' verraadt de grootheid lengte." },
        { en: "De massa van de bloemkool is 600 gram.", nl: "600 = meetwaarde · gram = eenheid · massa = grootheid", let: "<b>let op</b>: zonder 'gram' weet je niet wat 600 betekent." }
      ],
      vragen: [
        { t: "mc", q: "Wat is een <b>grootheid</b>?",
          o: ["Een eigenschap die je kunt meten", "De maat achter het getal", "Het getal dat je afleest", "Het gereedschap om te meten"],
          a: "Een eigenschap die je kunt meten",
          fout: {
            "De maat achter het getal": "Dat is de eenheid. Kilogram is een maat, massa is de eigenschap.",
            "Het getal dat je afleest": "Dat is de meetwaarde: in '52 kg' is dat 52.",
            "Het gereedschap om te meten": "Dat is een meetinstrument, zoals een weegschaal."
          },
          w: "Grootheid = eigenschap die je kunt meten.",
          meer: "Lengte, tijd, massa, volume en temperatuur zijn grootheden." },

        { t: "mc", q: "Wat is een <b>eenheid</b>?",
          o: ["De maat waarin je iets uitdrukt", "De eigenschap die je meet", "Het getal dat je afleest", "Een soort meetinstrument"],
          a: "De maat waarin je iets uitdrukt",
          fout: {
            "De eigenschap die je meet": "Dat is de grootheid. Massa is de eigenschap, kilogram de maat.",
            "Het getal dat je afleest": "Dat is de meetwaarde.",
            "Een soort meetinstrument": "Een meetinstrument is een ding, zoals een liniaal. Een eenheid is een maat."
          },
          w: "Eenheid = de maat, die achter het getal staat.",
          meer: "'25 meter' kan, '25 lengte' niet. Dus meter is de eenheid." },

        { t: "gap", q: "Het getal dat je bij een meting bepaalt, heet de ___.",
          a: "meetwaarde", soepel: true,
          w: "De meetwaarde.",
          meer: "In '52 kg' is 52 de meetwaarde en kg de eenheid." },

        { t: "mc", q: "Storm zwemt baantjes in een bad van <b>25 meter</b>. Wat is de <b>meetwaarde</b>?",
          o: ["25", "meter", "lengte", "zwembad"],
          a: "25",
          fout: {
            "meter": "Dat is de eenheid: de maat achter het getal.",
            "lengte": "Dat is de grootheid: wat er gemeten is.",
            "zwembad": "Dat is het ding waar het over gaat, geen van de drie."
          },
          w: "De meetwaarde is het kale getal.",
          meer: "25 = meetwaarde · meter = eenheid · lengte = grootheid." },

        { t: "mc", q: "Welk woord is een <b>eenheid</b>?",
          o: ["seconde", "tijd", "temperatuur", "volume"],
          a: "seconde",
          fout: {
            "tijd": "Tijd is een grootheid: '25 tijd' kun je niet zeggen.",
            "temperatuur": "Temperatuur is een grootheid. De eenheid ervan is graden Celsius (°C).",
            "volume": "Volume is een grootheid. De eenheden zijn liter, mL, cm³ en dm³."
          },
          w: "'25 seconde' kan, dus seconde is een eenheid.",
          meer: "Doe altijd de test: past het achter een getal? Dan is het een eenheid." },

        { t: "mc", q: "Welk woord is een <b>grootheid</b>?",
          o: ["temperatuur", "graden Celsius", "kilogram", "liter"],
          a: "temperatuur",
          fout: {
            "graden Celsius": "Dat is de eenheid van temperatuur: '21 graden Celsius' kan.",
            "kilogram": "Dat is de eenheid van massa.",
            "liter": "Dat is een eenheid van volume."
          },
          w: "Temperatuur is wat je meet, graden Celsius is de maat.",
          meer: "'21 temperatuur' kun je niet zeggen. Dus temperatuur is de grootheid." },

        { t: "sleep", opgave: "Grootheid of eenheid? Test: past het achter een getal?",
          chips: [ {t:"lengte", bak:"g"}, {t:"meter", bak:"e"}, {t:"massa", bak:"g"},
                   {t:"kilogram", bak:"e"}, {t:"volume", bak:"g"}, {t:"liter", bak:"e"} ],
          bakjes: [ {id:"g", label:"Grootheid", som:"wat je meet"},
                    {id:"e", label:"Eenheid", som:"past achter een getal"} ],
          w: "Past het achter een getal, dan is het een eenheid.",
          meer: "'30 meter' kan, '30 lengte' niet. Dat is het hele trucje." },

        { t: "mc", q: "Je leest <b>52</b> af op de weegschaal en zegt: 'Ik weeg 52.' Wat ontbreekt er?",
          o: ["De eenheid", "De meetwaarde", "Het meetinstrument", "Niets"],
          a: "De eenheid",
          fout: {
            "De meetwaarde": "De meetwaarde staat er wel: dat is 52.",
            "Het meetinstrument": "Dat heb je gebruikt (de weegschaal), maar dat hoeft niet in je antwoord.",
            "Niets": "52 wat? 52 gram is een appel, 52 kilogram is een mens. Zonder eenheid weet je het niet."
          },
          w: "Zet altijd de eenheid achter het getal: 52 kg.",
          meer: "In de natuurkunde is een getal zonder eenheid niet af." },

        { t: "gap", q: "Gereedschap om mee te meten, heet een ___.",
          a: "meetinstrument|meetinstrumenten", soepel: true,
          w: "Een meetinstrument.",
          meer: "Liniaal, weegschaal, maatcilinder, thermometer en stopwatch zijn meetinstrumenten." },

        { t: "mc", q: "Welke zin kun je <b>wel</b> zeggen?",
          o: ["25 meter", "25 lengte", "25 massa", "25 tijd"],
          a: "25 meter",
          fout: {
            "25 lengte": "Lengte is de grootheid. Je zegt 'een lengte van 25 meter'.",
            "25 massa": "Massa is de grootheid. Je zegt bijvoorbeeld 25 kilogram.",
            "25 tijd": "Tijd is de grootheid. Je zegt bijvoorbeeld 25 seconden."
          },
          w: "Achter een getal past alleen een eenheid.",
          meer: "Dit is de gouden test voor grootheid of eenheid." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Iedere grootheid heeft zijn <b>eigen eenheden</b> én zijn <b>eigen meetinstrument</b>. Leer ze als <b>setjes</b>:",
        "<b>lengte</b> (l) → meter, centimeter → liniaal, meetlint<br><b>massa</b> (m) → kilogram, gram → weegschaal<br><b>volume</b> (V) → L, mL, cm³ → maatcilinder<br><b>tijd</b> (t) → seconde, minuut → stopwatch<br><b>temperatuur</b> → graden Celsius (°C) → thermometer",
        "Uit H4 komen er twee bij:<br><b>stroomsterkte</b> (I) → ampère (A) → stroommeter<br><b>spanning</b> (U) → volt (V) → spanningsmeter",
        "Eén grootheid kan meerdere eenheden hebben: seconden, minuten en uren zijn allemaal eenheden van tijd. De letter tussen haakjes is het <b>symbool</b> van de grootheid op je formulekaart."
      ],
      regel: "Grootheid → eenheid → meetinstrument: leer ze als setje.",
      voorbeelden: [
        { en: "massa → kilogram → weegschaal", nl: "een compleet setje", let: "<b>let op</b>: symbool m." },
        { en: "stroomsterkte → ampère → stroommeter", nl: "uit H4", let: "<b>let op</b>: symbool I, niet S." },
        { en: "spanning → volt → spanningsmeter", nl: "uit H4", let: "<b>let op</b>: symbool U." }
      ],
      vragen: [
        { t: "vb", opgave: "Uitgewerkt voorbeeld: ontleed de zin 'De massa van de bloemkool is 600 gram.'",
          stappen: [
            { toon: "Stap 1: zoek het getal", uitleg: "600. Dat is de meetwaarde." },
            { toon: "Stap 2: wat staat er direct achter het getal?", uitleg: "gram. Dat is de eenheid." },
            { toon: "Stap 3: welke eigenschap is gemeten?", uitleg: "massa. Dat is de grootheid." },
            { toon: "Controle: '600 massa'?", uitleg: "Kan niet, dus massa is echt de grootheid en gram de eenheid." }
          ],
          waarom: { q: "Waarom is 'gram' de eenheid en niet 'massa'?",
                    o: ["omdat gram achter het getal past", "omdat gram het kortste woord is", "omdat massa eerder in de zin staat"],
                    a: "omdat gram achter het getal past" },
          fout: {
            "omdat gram het kortste woord is": "De lengte van het woord zegt niets. 'Graden Celsius' is ook een eenheid, en dat is lang.",
            "omdat massa eerder in de zin staat": "De plek in de zin zegt niets. 'De bloemkool is 600 gram zwaar' heeft dezelfde eenheid."
          },
          w: "Getal → eenheid erachter → grootheid is wat gemeten wordt.",
          meer: "Op de toets moet je deze drie vaak onderstrepen in een zin. Begin altijd bij het getal." },

        { t: "mc", q: "Welke eenheid hoort bij de grootheid <b>massa</b>?",
          o: ["kilogram", "meter", "liter", "centimeter"],
          a: "kilogram",
          fout: {
            "meter": "Meter hoort bij lengte.",
            "liter": "Liter hoort bij volume.",
            "centimeter": "Centimeter hoort bij lengte, net als meter."
          },
          w: "Massa meet je in kilogram of gram.",
          meer: "Setje: massa → kilogram (kg) of gram (g) → weegschaal." },

        { t: "mc", q: "Met welk meetinstrument meet je het <b>volume van een vloeistof</b>?",
          o: ["Maatcilinder", "Weegschaal", "Thermometer", "Liniaal of meetlint"],
          a: "Maatcilinder",
          fout: {
            "Weegschaal": "Daarmee meet je massa, niet hoeveel ruimte iets inneemt.",
            "Thermometer": "Daarmee meet je temperatuur.",
            "Liniaal of meetlint": "Daarmee meet je lengte. Een vloeistof heeft geen vaste vorm om op te meten."
          },
          w: "Volume van een vloeistof → maatcilinder.",
          meer: "In de keuken doet een maatbeker hetzelfde, maar een maatcilinder is nauwkeuriger." },

        { t: "sleep", opgave: "Bij welke grootheid hoort dit meetinstrument?",
          chips: [ {t:"weegschaal", bak:"massa"}, {t:"maatcilinder", bak:"volume"},
                   {t:"stopwatch", bak:"tijd"}, {t:"meetlint", bak:"lengte"},
                   {t:"stroommeter", bak:"stroom"}, {t:"spanningsmeter", bak:"spanning"} ],
          bakjes: [ {id:"massa", label:"Massa", som:"kg, g"}, {id:"volume", label:"Volume", som:"L, mL, cm³"},
                    {id:"tijd", label:"Tijd", som:"s, min"}, {id:"lengte", label:"Lengte", som:"m, cm"},
                    {id:"stroom", label:"Stroomsterkte", som:"A, mA"}, {id:"spanning", label:"Spanning", som:"V, mV"} ],
          w: "Elke grootheid heeft zijn eigen meetinstrument.",
          meer: "De stroommeter heet ook ampèremeter, de spanningsmeter ook voltmeter: genoemd naar hun eenheid." },

        { t: "mc", q: "Welke eenheid hoort bij <b>stroomsterkte</b>?",
          o: ["ampère", "volt", "watt", "seconde"],
          a: "ampère",
          fout: {
            "volt": "Volt is de eenheid van spanning: de duw van de batterij. Stroomsterkte is hoeveel lading per seconde voorbijkomt.",
            "watt": "Watt staat niet op jouw formulekaart. Stroomsterkte meet je in ampère.",
            "seconde": "Seconde is de eenheid van tijd."
          },
          w: "Stroomsterkte → ampère (A) → stroommeter.",
          meer: "Kleine stroomsterktes schrijf je in milliampère: 1 A = 1000 mA." },

        { t: "mc", q: "Met welk meetinstrument meet je <b>spanning</b>?",
          o: ["Spanningsmeter", "Stroommeter", "Thermometer", "Personenweegschaal"],
          a: "Spanningsmeter",
          fout: {
            "Stroommeter": "Die meet stroomsterkte in ampère. Spanning is iets anders: de duw van de batterij, in volt.",
            "Thermometer": "Die meet temperatuur.",
            "Personenweegschaal": "Die meet massa, niet spanning."
          },
          w: "Spanning → volt (V) → spanningsmeter (voltmeter).",
          meer: "Een losse batterij van 1,5 V heeft wel spanning, maar er loopt 0 A stroom. Daarom zijn het twee verschillende grootheden met twee meters." },

        { t: "mc", q: "Op je formulekaart staat het symbool <b>I</b>. Welke grootheid is dat?",
          o: ["stroomsterkte", "spanning", "lengte", "tijd"],
          a: "stroomsterkte",
          fout: {
            "spanning": "Spanning heeft het symbool U.",
            "lengte": "Lengte heeft het symbool l (kleine letter L), niet I.",
            "tijd": "Tijd heeft het symbool t."
          },
          w: "I = stroomsterkte, gemeten in ampère.",
          meer: "Rijtje van je formulekaart: t (tijd), l (lengte), m (massa), V (volume), ρ (dichtheid), I (stroomsterkte), U (spanning)." },

        { t: "gap", q: "Temperatuur meet je met een ___.",
          a: "thermometer", soepel: true,
          w: "Temperatuur → graden Celsius → thermometer.",
          meer: "In een koelkast is het zo'n 4 °C, in je lichaam 37 °C." },

        { t: "mc", q: "Welke is <b>geen</b> eenheid van tijd?",
          o: ["meter", "seconde", "minuut", "uur"],
          a: "meter",
          fout: {
            "seconde": "Seconde is juist de eenheid van tijd op je formulekaart.",
            "minuut": "Een minuut is 60 seconden: ook tijd.",
            "uur": "Een uur is 60 minuten: ook tijd."
          },
          w: "Meter is een eenheid van lengte.",
          meer: "Eén grootheid, meerdere eenheden: seconden, minuten, uren, dagen en weken horen allemaal bij tijd." },

        { t: "mc", q: "Storm speelt linksvoor. Bij de training sprint ze 30 meter in 5 seconden. Welke twee <b>grootheden</b> zijn gemeten?",
          o: ["lengte en tijd", "meter en seconde", "30 en 5", "massa en tijd"],
          a: "lengte en tijd",
          fout: {
            "meter en seconde": "Dat zijn de eenheden: de maten achter de getallen. '30 lengte' kan niet, '30 meter' wel.",
            "30 en 5": "Dat zijn de meetwaarden, de kale getallen.",
            "massa en tijd": "Tijd klopt, maar 30 meter is een afstand: dat is lengte, geen massa."
          },
          w: "Meter hoort bij lengte, seconde bij tijd.",
          meer: "Per meting: 30 = meetwaarde, meter = eenheid, lengte = grootheid. En 5 = meetwaarde, seconde = eenheid, tijd = grootheid." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Nu de valkuilen. <b>Valkuil 1: de eenheid vergeten.</b> Op een verkeersbord staat alleen 60. Iedereen snapt km/u, maar strikt is de meting niet af.",
        "<b>Valkuil 2: eenheden van stroom en spanning verwisselen.</b> 'De stroomsterkte is 0,3 volt' is fout: stroomsterkte gaat in ampère, spanning in volt. Let ook op de dubbele V: <b>V</b> als symbool is volume, <b>V</b> als eenheid is volt.",
        "<b>Valkuil 3: massa en volume door elkaar.</b> Massa is de hoeveelheid <b>stof</b>, volume de <b>ruimte</b>. Een ballon is groot (veel volume) maar heeft bijna geen massa.",
        "Ook bij een onbekende eenheid werkt de test. '1013 hectopascal' kan, '1013 luchtdruk' niet. Dus luchtdruk is de grootheid. En <b>dichtheid</b> (ρ) is ook een grootheid, met eenheid g/cm³."
      ],
      regel: "Een meting zonder (juiste) eenheid is niet af. Getal, eenheid en grootheid horen bij elkaar.",
      voorbeelden: [
        { en: "Verkeersbord met alleen '60'", nl: "de eenheid (km/u) ontbreekt", let: "<b>let op</b>: de meetwaarde staat er wel." },
        { en: "U = 6 V", nl: "U is de grootheid spanning, V is de eenheid volt", let: "<b>let op</b>: V betekent hier niet volume." }
      ],
      vragen: [
        { t: "mc", q: "Op een verkeersbord staat alleen het getal <b>60</b>. Wat ontbreekt er strikt genomen?",
          o: ["De eenheid", "De meetwaarde", "De grootheid", "Het meetinstrument"],
          a: "De eenheid",
          fout: {
            "De meetwaarde": "De meetwaarde staat er juist: dat is 60.",
            "De grootheid": "De grootheid (snelheid) zet je nooit achter een getal. Wat er letterlijk ontbreekt, is de maat: km/u.",
            "Het meetinstrument": "Een bord hoeft geen meetinstrument te noemen."
          },
          w: "Er staat een getal zonder maat erachter.",
          meer: "60 wat? Meter? Minuten? Iedereen weet dat km/u bedoeld wordt, maar compleet is het niet." },

        { t: "mc", q: "'Komt de luchtdruk onder 1013 hectopascal, dan gaat het vaak regenen.' Wat is de <b>grootheid</b>?",
          o: ["luchtdruk", "hectopascal", "1013", "regen"],
          a: "luchtdruk",
          fout: {
            "hectopascal": "Dat is de eenheid: '1013 hectopascal' kan.",
            "1013": "Dat is de meetwaarde, het getal.",
            "regen": "Dat is wat er gebeurt, niet wat er gemeten wordt."
          },
          w: "Wat gemeten wordt, is de luchtdruk.",
          meer: "Je hoeft hectopascal niet te kennen. De test '1013 luchtdruk' kan niet, verraadt al dat luchtdruk de grootheid is." },

        { t: "mc", q: "Welke zin is <b>fout</b> opgeschreven?",
          o: ["De stroomsterkte is 0,3 volt", "De stroomsterkte is 300 mA", "De spanning is 4,5 volt", "De spanning is 4500 mV"],
          a: "De stroomsterkte is 0,3 volt",
          fout: {
            "De stroomsterkte is 300 mA": "Klopt: milliampère is een eenheid van stroomsterkte (300 mA = 0,3 A).",
            "De spanning is 4,5 volt": "Klopt: volt is de eenheid van spanning.",
            "De spanning is 4500 mV": "Klopt: 4500 mV = 4,5 V, millivolt is ook een eenheid van spanning."
          },
          w: "Stroomsterkte gaat in ampère, niet in volt.",
          meer: "Dit is De Spanningsstromer: stroom en spanning door elkaar. Spanning is de duw (volt), stroomsterkte is hoeveel lading per seconde voorbijkomt (ampère)." },

        { t: "mc", q: "Op de formulekaart staat <b>U = 6 V</b>. Wat betekenen U en V hier?",
          o: ["U is spanning, V is de eenheid volt", "U is de eenheid, V is het volume", "U is het getal, V is de grootheid", "U is volume, V is de eenheid volt"],
          a: "U is spanning, V is de eenheid volt",
          fout: {
            "U is de eenheid, V is het volume": "V staat hier achter het getal 6, dus het is een eenheid: volt. Volume heeft wel het symbool V, maar dat staat nooit achter een getal.",
            "U is het getal, V is de grootheid": "Het getal is 6. U is het symbool van de grootheid spanning.",
            "U is volume, V is de eenheid volt": "U is het symbool van spanning. Volume heeft het symbool V."
          },
          w: "U = spanning (grootheid), V = volt (eenheid).",
          meer: "Dubbele V: als symbool van een grootheid is V volume, als eenheid achter een getal is V volt. Kijk waar de letter staat." },

        { t: "mc", q: "Welk setje hoort <b>niet</b> bij elkaar?",
          o: ["volume, volt, maatcilinder", "lengte, meter, meetlint", "temperatuur, graden Celsius, thermometer", "tijd, seconde, stopwatch"],
          a: "volume, volt, maatcilinder",
          fout: {
            "lengte, meter, meetlint": "Dit setje klopt: lengte meet je in meter met een meetlint.",
            "temperatuur, graden Celsius, thermometer": "Dit setje klopt: temperatuur in °C met een thermometer.",
            "tijd, seconde, stopwatch": "Dit setje klopt: tijd in seconden met een stopwatch."
          },
          w: "Volt is de eenheid van spanning. Volume gaat in liter, mL of cm³.",
          meer: "Volt en volume beginnen allebei met 'vol', maar hebben niets met elkaar te maken." },

        { t: "sleep", opgave: "'De stroommeter wijst 0,25 A aan.' en 'De batterij levert 4,5 volt.' Welk woord is wat?",
          chips: [ {t:"0,25", bak:"mw"}, {t:"A (ampère)", bak:"eh"}, {t:"stroomsterkte", bak:"gh"},
                   {t:"4,5", bak:"mw"}, {t:"volt", bak:"eh"}, {t:"spanning", bak:"gh"} ],
          bakjes: [ {id:"mw", label:"Meetwaarde", som:"het getal"},
                    {id:"eh", label:"Eenheid", som:"de maat"},
                    {id:"gh", label:"Grootheid", som:"wat je meet"} ],
          w: "Getal → meetwaarde. Maat erachter → eenheid. Eigenschap → grootheid.",
          meer: "De grootheid staat soms niet letterlijk in de zin. Een stroommeter meet stroomsterkte, dus dat is de grootheid." },

        { t: "mc", q: "Wat zegt de <b>massa</b> van een voorwerp?",
          o: ["Hoeveel stof erin zit", "Hoeveel ruimte het inneemt", "Hoe groot het is", "Hoe warm het is"],
          a: "Hoeveel stof erin zit",
          fout: {
            "Hoeveel ruimte het inneemt": "Dat is het volume, een andere grootheid.",
            "Hoe groot het is": "Groot gaat over ruimte, dus volume. Een grote ballon heeft bijna geen massa.",
            "Hoe warm het is": "Dat is temperatuur."
          },
          w: "Massa = hoeveelheid stof.",
          meer: "Een ballon is groot (veel volume) maar licht. Een muntje is klein maar heeft meer massa." },

        { t: "mc", q: "Welke grootheid hoort bij de eenheid <b>g/cm³</b>?",
          o: ["dichtheid", "massa", "volume", "temperatuur"],
          a: "dichtheid",
          fout: {
            "massa": "Massa gaat in gram of kilogram, zonder 'per cm³'.",
            "volume": "Volume gaat in cm³, zonder de gram ervoor.",
            "temperatuur": "Temperatuur gaat in graden Celsius (°C)."
          },
          w: "g/cm³ = gram per kubieke centimeter = dichtheid.",
          meer: "Dichtheid (ρ) meet je niet direct af: je rekent hem uit met ρ = m / V." },

        { t: "bouw", q: "Storm zwemt 50 meter in 48 seconden, in water van 27 °C. Hoeveel <b>meetwaarden</b> staan in deze zin? (alleen het getal)",
          a: "3",
          w: "50, 48 en 27: drie getallen, dus drie meetwaarden.",
          meer: "Elke meetwaarde heeft zijn eigen eenheid (meter, seconde, °C) en grootheid (lengte, tijd, temperatuur)." },

        { t: "open", q: "Leg uit waarom 'Ik weeg 52' in de natuurkunde niet goed is, en hoe het wel moet.",
          punten: 2,
          modelantwoord: "52 is alleen de meetwaarde. De eenheid ontbreekt, dus je weet niet of het 52 gram of 52 kilogram is. Goed is: mijn massa is 52 kilogram (52 kg).",
          sleutelwoorden: [
            { moet: ["eenheid"], syn: ["maat", "achter het getal", "ontbreekt"] },
            { moet: ["kilogram"], syn: ["kg", "52 kg", "kilo"] }
          ],
          rubric: ["Noemt dat de eenheid ontbreekt (52 is alleen de meetwaarde)",
                   "Geeft de goede schrijfwijze: 52 kilogram (kg), eventueel met massa als grootheid"],
          w: "Zonder eenheid is een meting niet af: 52 kg.",
          meer: "Nog netter: 'Mijn massa is 52 kg.' Dan staan grootheid, meetwaarde en eenheid er alle drie in." }
      ]
    }
  ]
};


/* ===== onderwerpen (deel B) ===== */

/* ================================================================ massa-gewicht (2.3.1, 2.3.2) */
window.__TOPICS["massa-gewicht"] = {
  id: "massa-gewicht", emoji: "⚖️", titel: "H2 · Massa en gewicht",
  kort: "Massa is hoeveel stof (kg), gewicht is hoe hard iets drukt of trekt (N).",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Met een <b>weegschaal</b> bepaal je de <b>massa</b> van een voorwerp of een hoeveelheid stof. Massa is de <b>hoeveelheid stof</b> in een voorwerp.",
        "Massa meet je in <b>gram (g)</b> of <b>kilogram (kg)</b>. Onthoud: <b>1 kg = 1000 g</b>. Een pak suiker is 1 kg, dus 1000 g.",
        "In het dagelijks leven zeg je 'ik weeg 52 kilo'. In de natuurkunde is dat je <b>massa</b>: 52 kg.",
        "<b>Gewicht</b> is iets anders: dat is de <b>kracht</b> waarmee een voorwerp op de ondergrond <b>drukt</b> of aan een ophangpunt <b>trekt</b>. Kracht meet je in <b>newton (N)</b>. Op aarde hoort bij 1 kg ongeveer <b>10 N</b>.",
        "Een weegschaal meet eigenlijk <b>hoe hard je drukt</b>, en rekent dat om naar kilogram."
      ],
      regel: "Massa = hoeveelheid stof in kg of g; gewicht = kracht in newton (op aarde 1 kg ≈ 10 N).",
      voorbeelden: [
        { en: "een pak suiker: 1 kg", nl: "massa, want het gaat om hoeveel suiker erin zit", let: "<b>let op</b>: 1 kg = 1000 g." },
        { en: "het pak drukt met 10 N op de tafel", nl: "gewicht, want het gaat om een kracht", let: "<b>let op</b>: gewicht schrijf je in newton, niet in kg." },
        { en: "een tas van 3 kg", nl: "massa 3 kg, gewicht op aarde ongeveer 30 N", let: "<b>let op</b>: keer 10 voor het gewicht op aarde." }
      ],
      vragen: [
        { t: "mc", q: "Met welk instrument bepaal je de <b>massa</b> van een hoeveelheid stof?",
          o: ["weegschaal", "maatcilinder", "liniaal", "thermometer"],
          a: "weegschaal",
          fout: {
            "maatcilinder": "met een maatcilinder meet je het volume van een vloeistof, dus hoeveel ruimte het inneemt. Niet hoeveel stof het is.",
            "liniaal": "met een liniaal meet je een lengte. 30 cm zegt niets over hoeveel gram iets is.",
            "thermometer": "een thermometer meet de temperatuur. Een warme en een koude appel van 150 g hebben dezelfde massa."
          },
          w: "Massa bepaal je met een weegschaal.",
          meer: "Weegschaal → massa (g, kg). Maatcilinder → volume (mL). Liniaal → lengte (cm). Elk instrument hoort bij een eigen grootheid." },

        { t: "mc", q: "Wat is <b>massa</b>?",
          o: ["De hoeveelheid stof in een voorwerp", "De ruimte die een voorwerp inneemt", "De kracht waarmee iets op de grond drukt", "Hoe hard een voorwerp is"],
          a: "De hoeveelheid stof in een voorwerp",
          fout: {
            "De ruimte die een voorwerp inneemt": "dat is volume. Een kussen neemt veel ruimte in, maar heeft weinig massa.",
            "De kracht waarmee iets op de grond drukt": "dat is gewicht, in newton. Massa en gewicht lijken op elkaar, maar zijn twee verschillende dingen.",
            "Hoe hard een voorwerp is": "hardheid is iets anders. Een zachte zak meel van 1 kg heeft evenveel massa als een harde steen van 1 kg."
          },
          w: "Massa = de hoeveelheid stof, in g of kg.",
          meer: "Neem je meer van een stof, dan wordt de massa groter. Twee pakken suiker hebben samen 2 kg massa." },

        { t: "mc", q: "In welke eenheid druk je <b>gewicht</b> uit?",
          o: ["newton (N)", "kilogram (kg)", "gram (g)", "milliliter (mL)"],
          a: "newton (N)",
          fout: {
            "kilogram (kg)": "kilogram is de eenheid van massa. Gewicht is een kracht, en kracht meet je in newton.",
            "gram (g)": "gram is ook een eenheid van massa (1 kg = 1000 g). Gewicht is een kracht: newton.",
            "milliliter (mL)": "milliliter is een eenheid van volume, voor vloeistoffen."
          },
          w: "Gewicht is een kracht, en kracht meet je in newton (N).",
          meer: "Op aarde hoort bij 1 kg ongeveer 10 N. Een tas van 2 kg drukt dus met ongeveer 20 N op de grond." },

        { t: "gap", q: "1 kg = ___ g",
          a: "1000", soepel: true,
          w: "1 kg = 1000 g.",
          meer: "'Kilo' betekent duizend. Een kilogram is dus duizend gram, net zoals een kilometer duizend meter is." },

        { t: "sleep", opgave: "Hoort het bij <b>massa</b> of bij <b>gewicht</b>? Sleep elk kaartje naar het goede bakje.",
          chips: [
            {t:"hoeveelheid stof", bak:"m"}, {t:"kilogram", bak:"m"}, {t:"gram", bak:"m"}, {t:"blijft gelijk op de maan", bak:"m"},
            {t:"kracht", bak:"g"}, {t:"newton", bak:"g"}, {t:"drukt op de ondergrond", bak:"g"}, {t:"wordt kleiner op de maan", bak:"g"}
          ],
          bakjes: [ {id:"m", label:"Massa", som:"hoeveel stof, in kg"}, {id:"g", label:"Gewicht", som:"een kracht, in N"} ],
          w: "Massa: hoeveelheid stof, kg en g, overal gelijk. Gewicht: kracht, newton, verandert op een andere plek.",
          meer: "Twijfel je? Vraag jezelf af: gaat het om hoeveel stof er is (massa), of om hoe hard iets drukt of trekt (gewicht)?" },

        { t: "mc", q: "Na het winkelen met je moeder zet je de tas met nieuwe kleren op de keukenweegschaal. Die geeft <b>2,4 kg</b>. Hoeveel gram is dat?",
          o: ["2400 g", "240 g", "24 g", "0,0024 g"],
          a: "2400 g",
          fout: {
            "240 g": "dan heb je keer 100 gedaan. 1 kg = 1000 g, dus 2,4 × 1000 = 2400.",
            "24 g": "dat is keer 10. Een tas kleren van 24 g zou net zo licht zijn als een paar papiertjes.",
            "0,0024 g": "je bent de verkeerde kant op gegaan. Gram is kleiner dan kilogram, dus het getal moet groter worden."
          },
          w: "Van kg naar g: keer 1000, dus 2,4 kg = 2400 g.",
          meer: "Komma drie plaatsen naar rechts: 2,4 → 24 → 240 → 2400. Een kleinere eenheid geeft een groter getal." },

        { t: "mc", q: "Wat betekent <b>gewicht</b> in de natuurkunde?",
          o: ["De kracht waarmee iets op de grond drukt", "De hoeveelheid stof in een voorwerp, in kilogram", "Hoeveel ruimte iets inneemt", "Hoeveel kilo je weegt"],
          a: "De kracht waarmee iets op de grond drukt",
          fout: {
            "De hoeveelheid stof in een voorwerp, in kilogram": "dat is massa. In de natuurkunde zijn massa en gewicht niet hetzelfde.",
            "Hoeveel ruimte iets inneemt": "dat is volume, in cm³ of mL.",
            "Hoeveel kilo je weegt": "dat zeg je in het dagelijks leven, maar 'kilo' hoort bij massa. Gewicht is een kracht in newton."
          },
          w: "Gewicht = de kracht waarmee iets drukt of trekt, in newton.",
          meer: "Een lamp aan het plafond trekt aan zijn haakje: dat trekken is ook gewicht." },

        { t: "mc", q: "Je zegt: 'ik weeg 52 kilo'. Wat is dat in de natuurkunde?",
          o: ["Mijn massa is 52 kg", "Mijn gewicht is 52 kg", "Mijn gewicht is 52 g", "Mijn volume is 52 kg"],
          a: "Mijn massa is 52 kg",
          fout: {
            "Mijn gewicht is 52 kg": "gewicht is een kracht en die meet je in newton, niet in kg. 52 kg is een massa.",
            "Mijn gewicht is 52 g": "52 g is zo licht als een paar koekjes. En gewicht is in newton.",
            "Mijn volume is 52 kg": "volume is ruimte, in cm³ of L. kg past daar niet achter."
          },
          w: "Kilogram hoort bij massa, dus: je massa is 52 kg.",
          meer: "Je gewicht op aarde is dan ongeveer 52 × 10 = 520 N." },

        { t: "bouw", q: "Op aarde hoort bij 1 kg ongeveer 10 N. Wat is het <b>gewicht</b> van een tas van <b>3 kg</b>? (alleen het getal, in N)",
          a: "30",
          w: "3 kg × 10 = 30 N.",
          meer: "Van massa naar gewicht op aarde: keer 10. Van gewicht naar massa: gedeeld door 10." },

        { t: "mc", q: "Een gewone weegschaal meet eigenlijk ...",
          o: ["hoe hard je erop drukt", "hoeveel ruimte je inneemt", "hoe groot je dichtheid is", "hoe warm je voeten zijn"],
          a: "hoe hard je erop drukt",
          fout: {
            "hoeveel ruimte je inneemt": "dat is je volume. Een weegschaal merkt niets van hoe groot je bent, alleen van hoe hard je drukt.",
            "hoe groot je dichtheid is": "dichtheid is massa per cm³. Daarvoor moet je ook het volume weten, en dat meet een weegschaal niet.",
            "hoe warm je voeten zijn": "temperatuur meet je met een thermometer."
          },
          w: "Een weegschaal voelt hoe hard je drukt (je gewicht) en rekent dat om naar kilogram.",
          meer: "Daarom geeft dezelfde weegschaal op de maan een veel kleiner getal: je drukt daar minder hard." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Nu het verschil op een andere plek. Ga je naar de <b>maan</b>, dan neem je al je stof mee: je <b>massa blijft precies gelijk</b>.",
        "De maan trekt veel minder hard aan je dan de aarde. Je <b>gewicht</b> wordt daar ongeveer <b>zes keer zo klein</b>.",
        "Rekenvoorbeeld: een astronaut van <b>60 kg</b> heeft op aarde een gewicht van 60 × 10 = <b>600 N</b>. Op de maan is dat 600 ÷ 6 = <b>100 N</b>. Haar massa: nog steeds <b>60 kg</b>.",
        "Pas op voor <b>De Maanlichte</b>. Die zegt: 'op de maan ben je lichter, dus heb je minder massa.' Dat botst: er is niets van je af gegaan. Je drukt alleen minder hard."
      ],
      regel: "Op een andere plek blijft de massa gelijk; alleen het gewicht verandert (maan ± 6 keer zo klein).",
      voorbeelden: [
        { en: "astronaut 60 kg op aarde", nl: "massa 60 kg, gewicht ± 600 N", let: "<b>let op</b>: 1 kg ≈ 10 N op aarde." },
        { en: "dezelfde astronaut op de maan", nl: "massa 60 kg, gewicht ± 100 N", let: "<b>let op</b>: alleen het gewicht deel je door 6." }
      ],
      vragen: [
        { t: "mc", q: "Een astronaut met een massa van <b>60 kg</b> landt op de maan. Wat is daar haar <b>massa</b>?",
          o: ["60 kg", "10 kg", "360 kg", "0 kg"],
          a: "60 kg",
          fout: {
            "10 kg": "dat is De Maanlichte: je deelt de massa door 6. Maar er is niets van haar af gegaan. Alleen haar gewicht wordt 6 keer zo klein.",
            "360 kg": "ze krijgt er geen stof bij. Massa blijft gelijk, waar je ook bent.",
            "0 kg": "zelfs in de ruimte heb je massa: je bestaat nog steeds uit evenveel stof."
          },
          w: "Massa is hoeveelheid stof. Die neem je gewoon mee: nog steeds 60 kg.",
          meer: "Vraag je bij een massavraag altijd af: is er stof bij gekomen of af gegaan? Nee? Dan is de massa gelijk." },

        { t: "mc", q: "Wat is het <b>gewicht</b> van diezelfde astronaut van 60 kg op de maan?",
          o: ["ongeveer 100 N", "ongeveer 600 N", "ongeveer 10 kg", "ongeveer 3600 N"],
          a: "ongeveer 100 N",
          fout: {
            "ongeveer 600 N": "dat is haar gewicht op aarde (60 × 10). Op de maan is het zes keer zo klein: 600 ÷ 6 = 100 N.",
            "ongeveer 10 kg": "gewicht is een kracht, dus in newton. En haar massa blijft 60 kg.",
            "ongeveer 3600 N": "je hebt keer 6 gedaan in plaats van gedeeld door 6. Op de maan wordt het gewicht kleiner, niet groter."
          },
          w: "Aarde: 60 × 10 = 600 N. Maan: 600 ÷ 6 = 100 N.",
          meer: "Twee stappen: eerst het gewicht op aarde (keer 10), dan delen door 6 voor de maan." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: een astronaut heeft een massa van 60 kg. Bepaal haar massa en gewicht op aarde en op de maan.",
          stappen: [
            { toon: "gegevens: massa = 60 kg · op aarde 1 kg ≈ 10 N · maan: gewicht ± 6 keer zo klein", uitleg: "Schrijf eerst op wat je weet." },
            { toon: "massa op aarde = massa op de maan = 60 kg", uitleg: "Er gaat geen stof van haar af, dus de massa blijft gelijk." },
            { toon: "gewicht op aarde = 60 × 10 = 600 N", uitleg: "Op aarde: per kg ongeveer 10 N." },
            { toon: "gewicht op de maan = 600 ÷ 6 = 100 N", uitleg: "De maan trekt zes keer zo zwak, dus drukt ze zes keer zo zacht." }
          ],
          waarom: { q: "Waarom blijft haar massa op de maan 60 kg?",
            o: ["Er is geen stof van haar af gegaan", "De maan trekt even hard als de aarde", "Een weegschaal werkt niet op de maan"],
            a: "Er is geen stof van haar af gegaan" },
          fout: {
            "De maan trekt even hard als de aarde": "de maan trekt juist zes keer zo zwak. Daardoor wordt haar gewicht kleiner, maar dat zegt niets over haar massa.",
            "Een weegschaal werkt niet op de maan": "een weegschaal werkt daar wel, hij wijst alleen minder aan. De massa verandert niet doordat je meet."
          },
          w: "Massa = hoeveelheid stof; die neem je mee. Gewicht = kracht; die hangt af van waar je bent.",
          meer: "Dit is precies de vraag die De Maanlichte fout beantwoordt. Massa gelijk, gewicht kleiner." },

        { t: "mc", q: "Lisa zegt: 'Op de maan ben je lichter, dus heb je daar minder massa.' Wat klopt?",
          o: ["Je gewicht is kleiner, je massa is gelijk", "Je massa is kleiner, je gewicht is gelijk", "Allebei worden ze zes keer kleiner", "Allebei blijven ze precies gelijk"],
          a: "Je gewicht is kleiner, je massa is gelijk",
          fout: {
            "Je massa is kleiner, je gewicht is gelijk": "precies andersom. Er gaat geen stof van je af, dus de massa blijft. Je drukt minder hard: het gewicht daalt.",
            "Allebei worden ze zes keer kleiner": "dat is De Maanlichte. Een astronaut van 60 kg zou dan 10 kg zijn: waar is die 50 kg stof gebleven?",
            "Allebei blijven ze precies gelijk": "je gewicht verandert wel: op de maan drukt een astronaut van 60 kg met 100 N in plaats van 600 N."
          },
          w: "Je voelt je lichter omdat je gewicht kleiner is; je massa blijft gelijk.",
          meer: "'Lichter' is een woord uit het dagelijks leven. In de natuurkunde zeg je: kleiner gewicht, zelfde massa." },

        { t: "bouw", q: "Je voetbal heeft een massa van <b>0,43 kg</b>. Wat is ongeveer zijn gewicht op aarde? (alleen het getal, in N)",
          a: "4,3",
          w: "0,43 × 10 = 4,3 N.",
          meer: "Keer 10 schuift de komma één plaats naar rechts: 0,43 → 4,3. Als linksvoor schiet je dus een bal van ongeveer 4,3 N richting de goal." },

        { t: "velden", q: "Een rugzak van <b>5 kg</b> gaat mee naar de maan. Vul in.",
          velden: [ {label:"massa op aarde (kg)", a:"5"}, {label:"gewicht op aarde (N)", a:"50"}, {label:"massa op de maan (kg)", a:"5"} ],
          w: "Massa blijft 5 kg; gewicht op aarde 5 × 10 = 50 N.",
          meer: "Op de maan zou het gewicht ongeveer 50 ÷ 6 ≈ 8 N zijn. De rugzak voelt daar veel lichter, maar er zit evenveel in." },

        { t: "mc", q: "Welke zin gaat over <b>gewicht</b> en niet over massa?",
          o: ["De tas trekt hard aan het haakje", "De tas bevat 2 kg appels", "Er zit precies 500 g suiker in dat pak", "De zak meel is 1 kg"],
          a: "De tas trekt hard aan het haakje",
          fout: {
            "De tas bevat 2 kg appels": "2 kg is een hoeveelheid stof: dat is massa.",
            "Er zit precies 500 g suiker in dat pak": "gram is een eenheid van massa. Het gaat om hoeveel suiker er is.",
            "De zak meel is 1 kg": "kilogram is massa. Hoe hard de zak drukt, staat er niet."
          },
          w: "Trekken aan een ophangpunt is een kracht: gewicht.",
          meer: "Gewicht: drukken op een ondergrond of trekken aan een ophangpunt. Zie je kg of g staan, dan gaat het over massa." },

        { t: "mc", q: "Welk rijtje is goed?",
          o: ["massa in kg, gewicht in N", "massa in N, gewicht in kg", "massa en gewicht allebei in kg", "massa en gewicht allebei in N"],
          a: "massa in kg, gewicht in N",
          fout: {
            "massa in N, gewicht in kg": "precies omgedraaid. Newton is de eenheid van kracht, en gewicht is een kracht.",
            "massa en gewicht allebei in kg": "zo praat je in het dagelijks leven. In de natuurkunde is gewicht een kracht: newton.",
            "massa en gewicht allebei in N": "massa is geen kracht maar een hoeveelheid stof. Die meet je in kg of g."
          },
          w: "Massa: kg (of g). Gewicht: N.",
          meer: "Op de formulekaart: massa m in kg, gewicht in newton (N), op aarde 1 kg ≈ 10 N." },

        { t: "gap", q: "Op de maan is je gewicht ongeveer ___ keer zo klein als op aarde.",
          a: "6|zes", soepel: true,
          w: "Ongeveer zes keer zo klein.",
          meer: "De maan is veel kleiner dan de aarde en trekt daarom minder hard. Je massa blijft gelijk." },

        { t: "mc", q: "Een astronaut van 60 kg gaat op de maan op een gewone weegschaal staan. Waarom ziet ze een veel kleiner getal dan 60?",
          o: ["Hij meet hoe hard je drukt", "Je massa is op de maan echt zes keer kleiner", "Hij gaat stuk door de kou", "De maan heeft helemaal geen zwaartekracht"],
          a: "Hij meet hoe hard je drukt",
          fout: {
            "Je massa is op de maan echt zes keer kleiner": "dat is De Maanlichte. Ze heeft nog evenveel stof in zich: 60 kg.",
            "Hij gaat stuk door de kou": "ook een kapotte weegschaal verandert haar massa niet. Hij wijst minder aan omdat ze minder hard drukt.",
            "De maan heeft helemaal geen zwaartekracht": "die heeft hij wel, anders zou ze wegzweven. Hij trekt alleen zes keer zo zwak als de aarde."
          },
          w: "De weegschaal meet hoe hard je drukt; op de maan druk je zes keer zachter.",
          meer: "De weegschaal rekent dat drukken om alsof je op aarde staat. Daarom wijst hij op de maan ongeveer 10 kg aan." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "De regel 'massa blijft, gewicht verandert' werkt op <b>elke</b> plek: op Mars, op de maan of ver weg in de ruimte. Het getal voor het gewicht is overal anders; de massa nooit.",
        "Ver weg van elke planeet trekt bijna niets aan je. Dan is je gewicht bijna <b>0 N</b>, maar je massa is nog gewoon 60 kg.",
        "Terugrekenen kan ook: weet je het gewicht op de maan, keer 6 geeft het gewicht op aarde, en gedeeld door 10 de massa.",
        "De <b>massa van een vloeistof</b> bepaal je in stappen: weeg de lege beker, giet de vloeistof erin, weeg opnieuw en trek de lege beker eraf."
      ],
      regel: "Massa verandert alleen als er stof bij komt of af gaat; gewicht hangt af van waar je bent.",
      voorbeelden: [
        { en: "gewicht op de maan 80 N", nl: "op aarde 80 × 6 = 480 N, dus massa 480 ÷ 10 = 48 kg", let: "<b>let op</b>: eerst terug naar aarde, dan door 10." },
        { en: "lege beker 120 g, met water 370 g", nl: "massa water = 370 − 120 = 250 g", let: "<b>let op</b>: de beker telt niet mee." }
      ],
      vragen: [
        { t: "mc", q: "Op Mars is je gewicht ongeveer 0,4 keer zo groot als op aarde. Wat is daar de <b>massa</b> van een astronaut van 60 kg?",
          o: ["60 kg", "24 kg", "150 kg", "240 N"],
          a: "60 kg",
          fout: {
            "24 kg": "dat is 60 × 0,4. Maar die 0,4 gaat over het gewicht. Er is geen stof van haar af gegaan, dus de massa blijft 60 kg.",
            "150 kg": "je hebt gedeeld door 0,4. Op Mars komt er geen stof bij: 60 kg.",
            "240 N": "dat is haar gewicht op Mars (600 × 0,4). Gevraagd was de massa, en die is in kg."
          },
          w: "Massa is overal gelijk: 60 kg.",
          meer: "Het gewicht op Mars is 600 × 0,4 = 240 N. Zie je hoe het 'nieuwe' getal alleen bij gewicht hoort?" },

        { t: "mc", q: "Een astronaut zweeft ver in de ruimte, ver van elke planeet. Wat is waar?",
          o: ["Gewicht bijna 0, massa nog 60 kg", "Massa bijna 0, gewicht nog 600 N", "Massa en gewicht zijn allebei 0", "Massa en gewicht zijn net als op aarde"],
          a: "Gewicht bijna 0, massa nog 60 kg",
          fout: {
            "Massa bijna 0, gewicht nog 600 N": "precies omgedraaid. Ze heeft nog al haar stof, maar er trekt bijna niets aan haar.",
            "Massa en gewicht zijn allebei 0": "haar massa kan niet 0 worden: ze bestaat nog steeds uit evenveel stof.",
            "Massa en gewicht zijn net als op aarde": "haar gewicht verandert wel. Ze drukt nergens op en trekt aan niets: ze zweeft."
          },
          w: "Zonder planeet in de buurt is het gewicht bijna nul; de massa blijft.",
          meer: "Daarom zweven astronauten. Maar een zware kist duwen gaat daar nog steeds lastig: massa blijft massa." },

        { t: "mc", q: "Je hangt een tas aan een veerunster, die meet in newton. Op aarde wijst hij <b>20 N</b> aan. Wat wijst hij op de maan aan?",
          o: ["ongeveer 3,3 N", "precies 20 N", "ongeveer 120 N", "ongeveer 2 kg"],
          a: "ongeveer 3,3 N",
          fout: {
            "precies 20 N": "de tas trekt op de maan minder hard aan de veer, want de maan trekt zes keer zo zwak.",
            "ongeveer 120 N": "je hebt keer 6 gedaan. Op de maan wordt het gewicht kleiner: 20 ÷ 6 ≈ 3,3 N.",
            "ongeveer 2 kg": "dat is de massa van de tas (20 ÷ 10). Een veerunster meet kracht, in newton."
          },
          w: "20 ÷ 6 ≈ 3,3 N.",
          meer: "De massa van de tas blijft 2 kg, op aarde en op de maan." },

        { t: "mc", q: "Waarom is 'ik weeg 52 kg' natuurkundig niet helemaal goed?",
          o: ["Gewicht is een kracht, en die is in newton", "Omdat kilogram alleen voor vloeistoffen bedoeld is", "Omdat je dan 52 000 gram moet zeggen", "Omdat wegen alleen met een maatcilinder kan"],
          a: "Gewicht is een kracht, en die is in newton",
          fout: {
            "Omdat kilogram alleen voor vloeistoffen bedoeld is": "dat geldt voor liter, niet voor kilogram. Kilogram is gewoon de eenheid van massa.",
            "Omdat je dan 52 000 gram moet zeggen": "52 kg is gelijk aan 52 000 g, dus dat maakt het niet beter of slechter. Het gaat om massa tegenover gewicht.",
            "Omdat wegen alleen met een maatcilinder kan": "een maatcilinder meet volume. Een weegschaal geeft de massa."
          },
          w: "'Wegen' klinkt als gewicht, maar 52 kg is je massa. Je gewicht is ongeveer 520 N.",
          meer: "Natuurkundig netjes: 'mijn massa is 52 kg' of 'mijn gewicht is ongeveer 520 N'." },

        { t: "bouw", q: "Een astronaut heeft op de maan een gewicht van <b>80 N</b>. Wat is haar massa? Gebruik: op de maan 6 keer zo klein, op aarde 1 kg ≈ 10 N. (alleen het getal, in kg)",
          a: "48",
          w: "80 × 6 = 480 N op aarde, 480 ÷ 10 = 48 kg.",
          meer: "Terugrekenen: eerst het gewicht op aarde (keer 6), dan de massa (gedeeld door 10)." },

        { t: "open", q: "Leg uit waarom een astronaut zich op de maan lichter voelt, terwijl haar massa niet verandert.",
          punten: 2,
          modelantwoord: "Haar massa is de hoeveelheid stof in haar lichaam. Op de maan is er geen stof van haar af gegaan, dus de massa blijft gelijk. Haar gewicht is de kracht waarmee ze op de grond drukt. De maan trekt zes keer zo zwak als de aarde, dus drukt ze minder hard: ze voelt zich lichter.",
          sleutelwoorden: [
            { moet: ["stof"], syn: ["hoeveelheid", "niets af", "evenveel"] },
            { moet: ["kracht"], syn: ["gewicht", "newton", "drukt", "trekt"] }
          ],
          rubric: ["Massa = hoeveelheid stof, en die verandert niet (er gaat niets af)", "Gewicht = kracht (drukken/trekken), en die is op de maan kleiner omdat de maan zwakker trekt"],
          w: "Massa = stof (blijft), gewicht = kracht (wordt kleiner op de maan).",
          meer: "Zo versla je De Maanlichte: 'lichter voelen' gaat over gewicht, niet over massa." },

        { t: "mc", q: "Een weegschaal op de maan toont <b>10 kg</b> bij een astronaut van 60 kg. Wat is er aan de hand?",
          o: ["Hij rekent druk om alsof je op aarde staat", "Op de maan heeft ze echt nog maar 10 kg massa", "Ze is onderweg 50 kg stof kwijtgeraakt", "De weegschaal meet op de maan het volume"],
          a: "Hij rekent druk om alsof je op aarde staat",
          fout: {
            "Op de maan heeft ze echt nog maar 10 kg massa": "dat is De Maanlichte. Er is niets van haar af gegaan, dus ze heeft nog 60 kg massa.",
            "Ze is onderweg 50 kg stof kwijtgeraakt": "dan zou ze bij terugkomst op aarde ook 10 kg wegen. Dat gebeurt niet: terug op aarde wijst de weegschaal weer 60.",
            "De weegschaal meet op de maan het volume": "een weegschaal meet nooit volume. Hij voelt hoe hard je drukt."
          },
          w: "De weegschaal meet hoe hard je drukt en rekent dat om met de aarde-regel. Op de maan klopt dat getal niet.",
          meer: "Wil je op de maan echt de massa weten, dan moet de weegschaal 'weten' dat hij op de maan staat." },

        { t: "sequence", q: "Je wilt de <b>massa van 100 mL melk</b> bepalen. Zet de stappen in de goede volgorde.",
          stappen: ["Weeg de lege beker", "Giet de melk in de beker", "Weeg de beker met melk", "Trek de massa van de lege beker eraf"],
          w: "Leeg wegen, vullen, vol wegen, aftrekken.",
          meer: "Een vloeistof kun je niet los op de weegschaal leggen. De beker weeg je apart, zodat je hem eraf kunt halen." },

        { t: "mc", q: "Een lege beker heeft een massa van <b>120 g</b>. Met water erin is het <b>370 g</b>. Wat is de massa van het water?",
          o: ["250 g", "490 g", "370 g", "120 g"],
          a: "250 g",
          fout: {
            "490 g": "je hebt opgeteld. Het water zit al in de 370 g; de beker moet je er juist af halen.",
            "370 g": "dat is beker plus water samen. De beker van 120 g hoort er niet bij.",
            "120 g": "dat is de lege beker."
          },
          w: "370 − 120 = 250 g.",
          meer: "Massa vloeistof = (beker + vloeistof) − lege beker." },

        { t: "mc", q: "Wat verandert er als je van de aarde naar de maan gaat?",
          o: ["je gewicht", "je massa", "de hoeveelheid stof in je", "het aantal gram dat je bent"],
          a: "je gewicht",
          fout: {
            "je massa": "massa blijft gelijk. Dat is precies de valkuil van De Maanlichte.",
            "de hoeveelheid stof in je": "dat is je massa, en die verandert niet door een reis.",
            "het aantal gram dat je bent": "gram is massa. 60 kg = 60 000 g, op aarde en op de maan."
          },
          w: "Alleen het gewicht verandert.",
          meer: "Kijk naar de eenheid: kg en g blijven gelijk, het aantal newton verandert." }
      ]
    }
  ]
};

/* ================================================================ volume (2.3.3 - 2.3.5) */
window.__TOPICS["volume"] = {
  id: "volume", emoji: "📦", titel: "H2 · Volume bepalen",
  kort: "Vloeistof: maatcilinder. Blok: l × b × h. Cilinder: π × r × r × h. Rare vorm: onderdompelen.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "<b>Volume</b> is de <b>ruimte</b> die een voorwerp of een hoeveelheid stof inneemt.",
        "Het volume van een <b>vloeistof</b> bepaal je met een <b>maatcilinder</b>, in <b>liter (L)</b> of <b>milliliter (mL)</b>. Onthoud: <b>1 L = 1000 mL</b>.",
        "Goed aflezen: kijk op <b>ooghoogte</b> naar het <b>vlakke deel</b> van de vloeistofspiegel. Aan de rand kruipt de vloeistof omhoog; dat randje telt niet mee. Kijk eerst hoeveel <b>één streepje</b> waard is: verschil tussen twee getallen gedeeld door het aantal vakjes.",
        "Van een <b>rechthoekig</b> voorwerp (een blok, een doos) bereken je het volume: <b>volume = lengte × breedte × hoogte</b>. Meet je in cm, dan krijg je cm³: zoveel blokjes van 1 cm bij 1 cm bij 1 cm passen erin."
      ],
      regel: "Vloeistof: maatcilinder op ooghoogte. Blok: lengte × breedte × hoogte (cm × cm × cm = cm³).",
      voorbeelden: [
        { en: "tussen 30 en 40 liggen 10 vakjes", nl: "één streepje = 10 ÷ 10 = 1 mL", let: "<b>let op</b>: altijd eerst de waarde van één streepje." },
        { en: "blok 5,0 × 3,0 × 4,0 cm", nl: "volume = 60 cm³", let: "<b>let op</b>: schrijf de eenheid cm³ erachter." },
        { en: "1,5 L", nl: "= 1500 mL", let: "<b>let op</b>: 1 L = 1000 mL." }
      ],
      vragen: [
        { t: "mc", q: "Met welk instrument bepaal je het volume van een hoeveelheid <b>vloeistof</b>?",
          o: ["maatcilinder", "weegschaal", "liniaal", "stroommeter"],
          a: "maatcilinder",
          fout: {
            "weegschaal": "een weegschaal geeft de massa: hoeveel stof. Niet hoeveel ruimte de vloeistof inneemt.",
            "liniaal": "met een liniaal meet je lengtes. Dat helpt bij een blok, maar een vloeistof heeft geen vaste vorm.",
            "stroommeter": "een stroommeter hoort bij elektriciteit: die meet de stroomsterkte in ampère."
          },
          w: "Een maatcilinder meet het volume van een vloeistof.",
          meer: "Op de maatcilinder staan streepjes in mL. Je giet de vloeistof erin en leest af." },

        { t: "mc", q: "Hoe lees je een maatcilinder goed af?",
          o: ["Op ooghoogte, bij het vlakke deel", "Van bovenaf, bij de hoogste rand van de vloeistof", "Schuin van onderen, dan zie je het beter", "Maakt niet uit, als je maar dichtbij kijkt"],
          a: "Op ooghoogte, bij het vlakke deel",
          fout: {
            "Van bovenaf, bij de hoogste rand van de vloeistof": "dubbel mis: schuin kijken geeft een verkeerde waarde, en het randje dat langs het glas omhoog kruipt telt niet mee.",
            "Schuin van onderen, dan zie je het beter": "schuin kijken (van onder of van boven) laat de streepjes verschuiven. Je leest dan een verkeerde waarde af.",
            "Maakt niet uit, als je maar dichtbij kijkt": "het maakt wel uit. Een paar mL verschil werkt door in je hele dichtheidssom."
          },
          w: "Ooghoogte en het vlakke deel van de vloeistofspiegel.",
          meer: "Zet de maatcilinder op tafel en zak door je knieën tot je ogen op gelijke hoogte zijn met de vloeistof." },

        { t: "mc", q: "Tussen de streepjes 30 en 40 op een maatcilinder liggen 10 vakjes. Hoeveel is <b>één streepje</b> waard?",
          o: ["1 mL", "10 mL", "4 mL", "0,1 mL"],
          a: "1 mL",
          fout: {
            "10 mL": "dat is het hele verschil tussen 30 en 40. Dat moet je nog verdelen over de 10 vakjes.",
            "4 mL": "je kijkt naar het getal 40. Het gaat om het verschil (10) gedeeld door het aantal vakjes (10).",
            "0,1 mL": "je hebt omgekeerd gedeeld: 10 vakjes ÷ 10 mL. Het moet andersom: 10 mL ÷ 10 vakjes."
          },
          w: "Verschil ÷ aantal vakjes: 10 ÷ 10 = 1 mL.",
          meer: "Een streepje is lang niet altijd 1. Bij een andere maatcilinder kan het 2 mL of 0,5 mL zijn." },

        { t: "gap", q: "1 L = ___ mL",
          a: "1000", soepel: true,
          w: "1 L = 1000 mL.",
          meer: "'Milli' betekent een duizendste. Een milliliter is een duizendste liter." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: bereken het volume van een blok van 5,0 cm lang, 3,0 cm breed en 4,0 cm hoog.",
          stappen: [
            { toon: "gegevens: lengte = 5,0 cm · breedte = 3,0 cm · hoogte = 4,0 cm", uitleg: "Schrijf eerst op wat je weet. Dat doet het boek ook." },
            { toon: "gevraagd: volume = ?", uitleg: "Schrijf op wat je zoekt." },
            { toon: "uitwerking: volume = lengte × breedte × hoogte", uitleg: "Eerst de formule in woorden." },
            { toon: "= 5,0 × 3,0 × 4,0 = 60 cm³", uitleg: "Invullen, uitrekenen, eenheid erachter." }
          ],
          waarom: { q: "Waarom staat er cm³ achter het antwoord?",
            o: ["cm × cm × cm geeft cm³", "Volume moet altijd in cm³", "Omdat 1 L = 1000 cm³"],
            a: "cm × cm × cm geeft cm³" },
          fout: {
            "Volume moet altijd in cm³": "volume mag ook in dm³, m³, L of mL. Hier wordt het cm³ omdat je drie keer in cm hebt gemeten.",
            "Omdat 1 L = 1000 cm³": "dat klopt wel, maar het verklaart de eenheid niet. Er komt geen liter in deze som voor."
          },
          w: "Drie keer cm vermenigvuldigen geeft cm³.",
          meer: "Je kunt het zien als blokjes: 5 in de lengte, 3 in de breedte, 4 lagen hoog. 5 × 3 × 4 = 60 blokjes van 1 cm³." },

        { t: "mc", q: "Welke formule hoort bij het volume van een <b>blok</b>?",
          o: ["lengte × breedte × hoogte", "lengte + breedte + hoogte", "lengte × breedte", "2 × (lengte + breedte)"],
          a: "lengte × breedte × hoogte",
          fout: {
            "lengte + breedte + hoogte": "optellen geeft geen ruimte. Een blok van 1 × 1 × 1 cm zou dan 3 cm³ zijn, terwijl het er maar 1 is.",
            "lengte × breedte": "dat is de oppervlakte van de bodem (cm²). Je mist de hoogte: hoeveel lagen er op elkaar liggen.",
            "2 × (lengte + breedte)": "dat is de omtrek: hoe lang een touwtje om de rand is."
          },
          w: "volume = lengte × breedte × hoogte.",
          meer: "Bodem (lengte × breedte) keer het aantal lagen (hoogte)." },

        { t: "bouw", q: "Een schoenendoos is 30 cm lang, 20 cm breed en 10 cm hoog. Wat is het volume? (alleen het getal, in cm³)",
          a: "6000",
          w: "30 × 20 × 10 = 6000 cm³.",
          meer: "Dat is 6 dm³, ofwel 6 liter. Een flinke doos dus." },

        { t: "mc", q: "Tussen 20 en 30 op een maatcilinder liggen <b>5</b> vakjes. Hoeveel is één streepje waard?",
          o: ["2 mL", "5 mL", "10 mL", "0,5 mL"],
          a: "2 mL",
          fout: {
            "5 mL": "dat is het aantal vakjes, niet de waarde van één vakje.",
            "10 mL": "dat is het hele verschil van 20 naar 30. Verdeel het over de 5 vakjes.",
            "0,5 mL": "je hebt omgekeerd gedeeld: 5 ÷ 10. Het moet 10 ÷ 5 zijn."
          },
          w: "10 mL ÷ 5 vakjes = 2 mL per streepje.",
          meer: "Minder vakjes tussen dezelfde getallen betekent dat elk streepje méér waard is." },

        { t: "gap", q: "Een maatcilinder lees je af op ___, bij het vlakke deel van de vloeistof.",
          a: "ooghoogte|oog hoogte", soepel: true,
          w: "Op ooghoogte.",
          meer: "Van boven of van onder kijk je schuin langs de streepjes, en dan lees je een verkeerde waarde af." },

        { t: "mc", q: "Welke eenheid hoort <b>niet</b> bij volume?",
          o: ["kg", "mL", "cm³", "dm³"],
          a: "kg",
          fout: {
            "mL": "milliliter is een eenheid van volume, vooral voor vloeistoffen.",
            "cm³": "kubieke centimeter is een eenheid van volume: een blokje van 1 cm bij 1 cm bij 1 cm.",
            "dm³": "kubieke decimeter is een eenheid van volume. 1 dm³ = 1 L."
          },
          w: "kg is een eenheid van massa.",
          meer: "Volume: m³, dm³, cm³, L, mL. Massa: kg, g." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Een <b>cilinder</b> (blikje, kaars, koker) is een stapel even grote cirkels. Net als bij het blok: <b>grondvlak × hoogte</b>. Alleen is het grondvlak nu een cirkel.",
        "<b>volume = π × straal × straal × hoogte</b> (π ≈ 3,14). De <b>straal</b> is de <b>halve diameter</b>. Meet je dwars door het midden (de diameter), deel dan eerst door 2.",
        "Pas op voor <b>De Diameterdief</b>: die vult de diameter in als straal. Dan is je straal 2 keer te groot, en omdat je de straal twee keer gebruikt, wordt je volume <b>4 keer</b> te groot.",
        "Een voorwerp met een <b>rare vorm</b> (steen, schroef)? Gebruik de <b>onderdompelmethode</b>: lees de <b>beginstand</b> af, laat het voorwerp helemaal onder water zakken, lees de <b>eindstand</b> af. <b>volume = eindstand − beginstand</b>."
      ],
      regel: "Cilinder: π × r × r × h, met r = diameter ÷ 2. Rare vorm: eindstand − beginstand.",
      voorbeelden: [
        { en: "blikje: 6,0 cm breed, 10 cm hoog", nl: "straal 3,0 cm → 3,14 × 3,0 × 3,0 × 10 = 283 cm³", let: "<b>let op</b>: eerst de diameter halveren." },
        { en: "begin 52 mL, eind 78 mL", nl: "volume steen = 78 − 52 = 26 cm³", let: "<b>let op</b>: 1 mL = 1 cm³." }
      ],
      vragen: [
        { t: "vb", opgave: "Uitgewerkt voorbeeld: een blikje is 6,0 cm breed (diameter) en 10 cm hoog. Bereken het volume.",
          stappen: [
            { toon: "gegevens: diameter = 6,0 cm · hoogte = 10 cm", uitleg: "'Breed' bij een blikje is de diameter: dwars door het midden." },
            { toon: "straal = 6,0 ÷ 2 = 3,0 cm", uitleg: "De formule wil de straal. Eerst halveren." },
            { toon: "volume = π × straal × straal × hoogte", uitleg: "Grondvlak (cirkel) keer de hoogte." },
            { toon: "= 3,14 × 3,0 × 3,0 × 10 = 283 cm³", uitleg: "Invullen en afronden. Dat is ongeveer 0,28 L." }
          ],
          waarom: { q: "Waarom deel je 6,0 eerst door 2?",
            o: ["De formule vraagt de straal, de halve diameter", "Omdat een blikje twee kanten heeft", "Om het antwoord in liter te krijgen"],
            a: "De formule vraagt de straal, de halve diameter" },
          fout: {
            "Omdat een blikje twee kanten heeft": "de bovenkant en onderkant hebben er niets mee te maken. Het gaat om straal tegenover diameter.",
            "Om het antwoord in liter te krijgen": "delen door 2 verandert de eenheid niet. Van cm³ naar L deel je door 1000."
          },
          w: "Straal = diameter ÷ 2; de formule gebruikt de straal.",
          meer: "Vergeet je het halveren, dan krijg je 3,14 × 6 × 6 × 10 = 1130 cm³: vier keer te veel." },

        { t: "mc", q: "Daan vult bij hetzelfde blikje de diameter in als straal: 3,14 × 6,0 × 6,0 × 10 = 1130 cm³. Hoeveel keer te groot is zijn antwoord?",
          o: ["4 keer", "2 keer", "6 keer", "het klopt precies"],
          a: "4 keer",
          fout: {
            "2 keer": "de straal is 2 keer te groot, ja. Maar hij staat twee keer in de formule (straal × straal): 2 × 2 = 4.",
            "6 keer": "6 is de diameter, niet de factor. 1130 ÷ 283 ≈ 4.",
            "het klopt precies": "dat is De Diameterdief. Het goede antwoord is 283 cm³, Daan zit er ver naast."
          },
          w: "Straal 2× te groot, en straal × straal geeft 2 × 2 = 4× te groot.",
          meer: "Een handige check: een blikje frisdrank is ongeveer 0,33 L = 330 cm³. 1130 cm³ is meer dan een liter, dat kan niet." },

        { t: "mc", q: "Welke formule hoort bij het volume van een <b>cilinder</b>?",
          o: ["π × r × r × h", "π × d × h", "r × r × h", "π × d × d × h"],
          a: "π × r × r × h",
          fout: {
            "π × d × h": "dan gebruik je de diameter maar één keer en geen straal. De formule is π × straal × straal × hoogte.",
            "r × r × h": "je mist π (≈ 3,14). Zonder π reken je eigenlijk een vierkant grondvlak uit.",
            "π × d × d × h": "dat is De Diameterdief: met de diameter in plaats van de straal wordt het 4 keer te groot."
          },
          w: "volume cilinder = π × straal × straal × hoogte.",
          meer: "r = straal, h = hoogte, d = diameter. π × r × r is de oppervlakte van de cirkel onderaan." },

        { t: "mc", q: "Hoe bereken je bij de onderdompelmethode het volume van het voorwerp?",
          o: ["eindstand − beginstand", "eindstand + beginstand", "alleen de eindstand", "beginstand − eindstand"],
          a: "eindstand − beginstand",
          fout: {
            "eindstand + beginstand": "dan tel je het water mee. Het voorwerp is alleen het stuk dat het water omhoog duwt.",
            "alleen de eindstand": "daar zit het water nog in. Je moet de beginstand eraf halen.",
            "beginstand − eindstand": "dan komt er een negatief getal uit. Het water stijgt, dus de eindstand is groter: eind − begin."
          },
          w: "Volume = eindstand − beginstand.",
          meer: "Het voorwerp duwt precies zijn eigen volume aan water omhoog." },

        { t: "bouw", q: "De beginstand is <b>40 mL</b>. Na het onderdompelen van een schroef is de stand <b>55 mL</b>. Wat is het volume van de schroef? (alleen het getal, in cm³)",
          a: "15",
          w: "55 − 40 = 15 mL = 15 cm³.",
          meer: "1 mL = 1 cm³, dus het getal blijft hetzelfde als je van mL naar cm³ gaat." },

        { t: "sequence", q: "Zet de stappen van de <b>onderdompelmethode</b> in de goede volgorde.",
          stappen: ["Vul de maatcilinder met water", "Lees de beginstand af", "Laat het voorwerp helemaal onder water zakken", "Lees de eindstand af", "Reken uit: eindstand − beginstand"],
          w: "Water, beginstand, voorwerp erin, eindstand, aftrekken.",
          meer: "Eerst de beginstand, dán pas het voorwerp erin. Andersom gaat mis: aan een voorwerp dat je eruit haalt blijft water hangen." },

        { t: "mc", q: "Je wilt het volume van een houten blokje met een rare vorm bepalen, maar het <b>drijft</b>. Wat doe je?",
          o: ["Duw het met een dunne naald onder water", "Lees de stand af terwijl het blokje gewoon drijft", "Doe zout in het water tot het zinkt", "Pak een grotere maatcilinder"],
          a: "Duw het met een dunne naald onder water",
          fout: {
            "Lees de stand af terwijl het blokje gewoon drijft": "dan zit een deel boven water en meet je te weinig volume. Het moet helemaal onder water.",
            "Doe zout in het water tot het zinkt": "zout water laat dingen juist beter drijven. En je maakt je beginstand kapot.",
            "Pak een grotere maatcilinder": "dan drijft het nog steeds. Een grotere maatcilinder leest ook minder nauwkeurig af."
          },
          w: "Met een dunne naald of pen duw je het helemaal onder water.",
          meer: "Een dunne naald heeft zelf bijna geen volume, dus die verstoort de meting nauwelijks." },

        { t: "mc", q: "Beginstand <b>52 mL</b>, eindstand <b>78 mL</b>. Wat is het volume van de steen?",
          o: ["26 cm³", "130 cm³", "78 cm³", "0,026 cm³"],
          a: "26 cm³",
          fout: {
            "130 cm³": "je hebt opgeteld (78 + 52). Het water was er al; je haalt de beginstand eraf.",
            "78 cm³": "dat is het water plus de steen. Trek de 52 mL water eraf.",
            "0,026 cm³": "je hebt mL omgerekend naar L. Maar 1 mL = 1 cm³: het getal blijft 26."
          },
          w: "78 − 52 = 26 mL = 26 cm³.",
          meer: "mL en cm³ zijn precies even groot. Daarom kun je de maatcilinder direct in cm³ lezen." },

        { t: "gap", q: "De straal is de ___ diameter.",
          a: "halve|helft van de", soepel: true,
          w: "Straal = halve diameter.",
          meer: "Diameter: van rand tot rand door het midden. Straal: van het midden naar de rand." },

        { t: "mc", q: "De koker voor je tekenpotloden is een cilinder met een <b>diameter van 4 cm</b>. Welke straal vul je in de formule in?",
          o: ["2 cm", "4 cm", "8 cm", "16 cm"],
          a: "2 cm",
          fout: {
            "4 cm": "dat is de diameter. De Diameterdief vult die in als straal, en dan wordt je volume 4 keer te groot.",
            "8 cm": "je hebt keer 2 gedaan in plaats van gedeeld door 2. De straal is kleiner dan de diameter.",
            "16 cm": "dat is 4 × 4. De straal is gewoon de helft: 4 ÷ 2 = 2 cm."
          },
          w: "4 ÷ 2 = 2 cm.",
          meer: "Is de koker 20 cm hoog, dan is het volume 3,14 × 2 × 2 × 20 ≈ 251 cm³." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Nu de redeneervragen. Bij de onderdompelmethode bepaalt de <b>volgorde</b> of je uitkomst klopt. Haal je een voorwerp eruit, dan blijft er water aan hangen; je 'beginstand' wordt dan te laag en je volume te groot.",
        "Zit het voorwerp <b>niet helemaal</b> onder water, dan duwt het minder water omhoog en meet je een te <b>klein</b> volume.",
        "Bij volumes werken veranderingen in drie richtingen. Maak je een blok in alle richtingen 2 keer zo groot, dan wordt het volume 2 × 2 × 2 = <b>8 keer</b> zo groot.",
        "Kies je meetinstrument slim: de <b>kleinste</b> maatcilinder waar het nog in past, leest het nauwkeurigst af, want die heeft de fijnste streepjes."
      ],
      regel: "Eerst de beginstand, voorwerp helemaal onder water, en reken in drie richtingen.",
      voorbeelden: [
        { en: "blok 2 × 2 × 2 cm en blok 4 × 4 × 4 cm", nl: "8 cm³ tegen 64 cm³: 8 keer zo groot", let: "<b>let op</b>: niet 2 keer, want het gaat in drie richtingen." },
        { en: "kaars: diameter 4,0 cm, hoogte 10 cm", nl: "3,14 × 2,0 × 2,0 × 10 ≈ 126 cm³", let: "<b>let op</b>: straal 2,0, niet 4,0." }
      ],
      vragen: [
        { t: "mc", q: "Waarom lees je bij de onderdompelmethode de beginstand af <b>voordat</b> het voorwerp erin gaat?",
          o: ["Er blijft water hangen aan een voorwerp dat je eruit haalt", "Anders verdampt het water te snel", "Anders kan de maatcilinder breken", "Dat maakt niet uit, andersom mag ook"],
          a: "Er blijft water hangen aan een voorwerp dat je eruit haalt",
          fout: {
            "Anders verdampt het water te snel": "in een paar seconden verdampt er niets wat je kunt zien.",
            "Anders kan de maatcilinder breken": "breken heeft met voorzichtig laten zakken te maken, niet met de volgorde van aflezen.",
            "Dat maakt niet uit, andersom mag ook": "het maakt wel uit. Haal je het voorwerp eruit, dan neemt het water mee en wordt je 'beginstand' te laag."
          },
          w: "Water aan het voorwerp maakt een achteraf gemeten beginstand te laag, en je volume te groot.",
          meer: "Voorbeeld: echte beginstand 52 mL. Er blijft 2 mL aan de steen hangen, dus je meet achteraf 50 mL. Je volume wordt 78 − 50 = 28 in plaats van 26 cm³." },

        { t: "mc", q: "Een blok is 2 × 2 × 2 cm. Een ander blok is 4 × 4 × 4 cm. Hoeveel keer zo groot is het volume van het grote blok?",
          o: ["8 keer", "2 keer", "4 keer", "6 keer"],
          a: "8 keer",
          fout: {
            "2 keer": "elke zijde is 2 keer zo lang, maar dat gebeurt in drie richtingen: 2 × 2 × 2.",
            "4 keer": "dat zou kloppen voor de oppervlakte van één zijvlak (2 × 2). Volume heeft een derde richting.",
            "6 keer": "je hebt 2 + 2 + 2 gedaan. Bij volume vermenigvuldig je: 2 × 2 × 2 = 8."
          },
          w: "8 cm³ tegen 64 cm³: 8 keer zo groot.",
          meer: "Daarom kun je je bij volumes zo snel vergissen. Een doos die 'twee keer zo groot' lijkt, past soms 8 keer zoveel." },

        { t: "bouw", q: "Een kaars heeft een diameter van <b>4,0 cm</b> en is <b>10 cm</b> hoog. Bereken het volume met π = 3,14. (alleen het getal, afgerond op hele cm³)",
          a: "126",
          w: "Straal 2,0 cm: 3,14 × 2,0 × 2,0 × 10 = 125,6 ≈ 126 cm³.",
          meer: "Met de diameter als straal zou je 502 cm³ krijgen: precies 4 keer te veel. Dat is De Diameterdief." },

        { t: "mc", q: "Bij het onderdompelen steekt een stukje van de steen nog <b>boven</b> het water uit. Wat gebeurt er met je uitkomst?",
          o: ["Je volume wordt te klein", "Je volume wordt te groot", "Je volume blijft precies goed", "Je volume wordt nul"],
          a: "Je volume wordt te klein",
          fout: {
            "Je volume wordt te groot": "het stuk boven water duwt geen water omhoog. Je meet dus minder, niet meer.",
            "Je volume blijft precies goed": "alleen het deel onder water telt mee. Het stukje erboven mis je.",
            "Je volume wordt nul": "het deel onder water duwt wel water omhoog. Je meet alleen te weinig."
          },
          w: "Alleen wat onder water zit, duwt water omhoog: te klein volume.",
          meer: "Daarom moet het voorwerp helemaal onder water. Drijft het, duw het dan met een dunne naald onder." },

        { t: "mc", q: "Tim doet eerst de steen in de maatcilinder: eindstand 78 mL. Dan haalt hij de steen eruit en leest 50 mL af. Wat is er met zijn uitkomst aan de hand?",
          o: ["Te groot: er bleef water aan de steen hangen", "Te klein: er bleef water aan de steen hangen", "Precies goed: de volgorde maakt niet uit", "Te klein: de steen heeft water opgezogen"],
          a: "Te groot: er bleef water aan de steen hangen",
          fout: {
            "Te klein: er bleef water aan de steen hangen": "het water aan de steen maakt de beginstand te laag. Eind − (te lage begin) = te groot.",
            "Precies goed: de volgorde maakt niet uit": "de volgorde maakt hier juist het verschil. 78 − 50 = 28 cm³, terwijl de steen kleiner is.",
            "Te klein: de steen heeft water opgezogen": "het gaat om water dat aan de buitenkant blijft hangen. Daardoor daalt de stand te ver: de uitkomst wordt groter."
          },
          w: "Een te lage beginstand geeft een te groot volume.",
          meer: "Vuistregel: eerst begin, dan pas het voorwerp erin. Dan hoef je het er niet uit te halen voor je meting." },

        { t: "open", q: "Leg uit waarom je bij een cilinder de diameter eerst door 2 deelt, en wat er met het volume gebeurt als je dat vergeet.",
          punten: 2,
          modelantwoord: "In de formule π × straal × straal × hoogte staat de straal, en de straal is de halve diameter. Vul je de diameter in, dan is je straal 2 keer te groot. Omdat de straal twee keer in de formule staat, wordt het volume 2 × 2 = 4 keer te groot.",
          sleutelwoorden: [
            { moet: ["straal"], syn: ["halve diameter", "helft"] },
            { moet: ["4"], syn: ["vier"] }
          ],
          rubric: ["De formule gebruikt de straal, en straal = diameter ÷ 2", "Vergeten geeft een 4 keer te groot volume, omdat de straal twee keer in de formule staat"],
          w: "Straal = diameter ÷ 2. Vergeten maakt het volume 4 keer te groot.",
          meer: "Zo versla je De Diameterdief: 2 keer te grote straal, en straal × straal, dus 4 keer." },

        { t: "mc", q: "Blikje A heeft een diameter van 6 cm en is 10 cm hoog. Blikje B heeft een diameter van 3 cm en is 20 cm hoog. Welk blikje heeft het grootste volume?",
          o: ["A, twee keer zo groot als B", "B, want die is hoger", "Ze zijn precies even groot", "B, twee keer zo groot als A"],
          a: "A, twee keer zo groot als B",
          fout: {
            "B, want die is hoger": "hoogte telt maar één keer mee, de straal twee keer. A: 3,14 × 3 × 3 × 10 ≈ 283 cm³, B: 3,14 × 1,5 × 1,5 × 20 ≈ 141 cm³.",
            "Ze zijn precies even groot": "dat lijkt zo (helft zo breed, twee keer zo hoog), maar de straal staat twee keer in de formule. A is 283 cm³, B maar 141 cm³.",
            "B, twee keer zo groot als A": "andersom. Halve straal maakt het grondvlak 4 keer zo klein, dubbele hoogte maakt dat maar half goed."
          },
          w: "A ≈ 283 cm³, B ≈ 141 cm³: A is twee keer zo groot.",
          meer: "Dit is waarom een breed glas vaak meer bevat dan een hoog, smal glas, ook al ziet het hoge glas er voller uit." },

        { t: "velden", q: "Een doos is 20 cm lang, 10 cm breed en 5 cm hoog. Vul in.",
          velden: [ {label:"volume (cm³)", a:"1000"}, {label:"volume (dm³)", a:"1"}, {label:"volume (L)", a:"1"} ],
          w: "20 × 10 × 5 = 1000 cm³ = 1 dm³ = 1 L.",
          meer: "Er past dus precies een pak melk in. 1 dm³ = 1000 cm³ en 1 dm³ = 1 L." },

        { t: "mc", q: "Je wilt het volume van een <b>sleutel</b> bepalen. Welke methode kies je?",
          o: ["onderdompelmethode", "lengte × breedte × hoogte", "π × r × r × h", "op de weegschaal leggen"],
          a: "onderdompelmethode",
          fout: {
            "lengte × breedte × hoogte": "dat werkt alleen bij een rechthoekig blok. Een sleutel heeft tandjes en een gat.",
            "π × r × r × h": "dat is voor een cilinder. Een sleutel is geen cilinder.",
            "op de weegschaal leggen": "dan krijg je de massa, niet het volume."
          },
          w: "Rare vorm: onderdompelmethode.",
          meer: "Blok: l × b × h. Cilinder: π × r × r × h. Alles met een rare vorm: eindstand − beginstand." },

        { t: "mc", q: "Je moet precies <b>45 mL</b> water afmeten. Welke maatcilinder pak je?",
          o: ["50 mL, streepjes van 1 mL", "100 mL, streepjes van 2 mL", "250 mL, streepjes van 5 mL", "40 mL, streepjes van 1 mL"],
          a: "50 mL, streepjes van 1 mL",
          fout: {
            "100 mL, streepjes van 2 mL": "past wel, maar de streepjes zijn grover. Je leest minder nauwkeurig af.",
            "250 mL, streepjes van 5 mL": "veel te grof: 45 mL valt tussen twee streepjes in.",
            "40 mL, streepjes van 1 mL": "daar past 45 mL niet in. Hij loopt over."
          },
          w: "De kleinste waar het nog in past, met de fijnste streepjes.",
          meer: "Fijnere streepjes betekent nauwkeuriger aflezen. Daarom staan er in het lab maatcilinders in verschillende maten." }
      ]
    }
  ]
};

/* ================================================================ dichtheid (2.4.1 - 2.4.3) */
window.__TOPICS["dichtheid"] = {
  id: "dichtheid", emoji: "🧱", titel: "H2 · Dichtheid",
  kort: "Dichtheid is de massa van 1 cm³ van een stof: ρ = m / V, in g/cm³.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Is aluminium lichter dan staal? Je kunt niet zomaar een aluminium fietsframe en een stalen stuur wegen: het frame is veel groter. Om goed te vergelijken neem je van elke stof een <b>blokje van 1 cm³</b> en weegt dat.",
        "Een blokje aluminium van 1 cm³ heeft een massa van <b>2,7 g</b>, een blokje staal van 1 cm³ <b>7,8 g</b>. Aluminium is dus ongeveer drie keer zo licht als staal.",
        "<b>De dichtheid van een stof = de massa van 1 cm³ van die stof.</b> De dichtheid van aluminium is 2,7 <b>gram per kubieke centimeter</b>: 2,7 <b>g/cm³</b>. Het woordje <b>per</b> betekent: voor elke 1 cm³.",
        "Is je blok groter dan 1 cm³? Verdeel het in gedachten in blokjes van 1 cm³ en reken uit hoeveel gram er in één blokje zit: <b>dichtheid = massa ÷ volume</b>, kort <b>ρ = m / V</b> (ρ spreek je uit als 'rho')."
      ],
      regel: "Dichtheid = massa van 1 cm³ = massa ÷ volume, in g/cm³.",
      voorbeelden: [
        { en: "messing: 34 g, 4 cm³", nl: "34 ÷ 4 = 8,5 g/cm³", let: "<b>let op</b>: elk blokje van 1 cm³ heeft 8,5 g." },
        { en: "aluminium 2,7 g/cm³", nl: "1 cm³ aluminium heeft een massa van 2,7 g", let: "<b>let op</b>: 'per' = voor elke 1 cm³." }
      ],
      vragen: [
        { t: "mc", q: "Wat is de <b>dichtheid</b> van een stof?",
          o: ["De massa van 1 cm³ van die stof", "De massa van het hele voorwerp", "Het volume van 1 gram van die stof", "Hoe groot en zwaar een voorwerp is"],
          a: "De massa van 1 cm³ van die stof",
          fout: {
            "De massa van het hele voorwerp": "dat is gewoon de massa. Een groot en een klein blok ijzer hebben een andere massa, maar dezelfde dichtheid.",
            "Het volume van 1 gram van die stof": "dat is precies andersom. Dichtheid is gram per cm³, niet cm³ per gram.",
            "Hoe groot en zwaar een voorwerp is": "groot en zwaar zeggen iets over het voorwerp, niet over de stof. Dichtheid kijkt altijd naar een blokje van 1 cm³."
          },
          w: "Dichtheid = de massa van 1 cm³.",
          meer: "Daarom staat er 'per' in de eenheid: gram per kubieke centimeter." },

        { t: "mc", q: "Welke eenheid hoort bij dichtheid?",
          o: ["g/cm³", "g", "cm³", "N"],
          a: "g/cm³",
          fout: {
            "g": "gram is de eenheid van massa. Bij dichtheid hoort ook het volume erbij: gram per cm³.",
            "cm³": "cm³ is de eenheid van volume. Je mist de massa.",
            "N": "newton is de eenheid van kracht, zoals gewicht."
          },
          w: "Gram per kubieke centimeter: g/cm³.",
          meer: "De eenheid vertelt je de formule: gram gedeeld door cm³. Dus massa ÷ volume." },

        { t: "mc", q: "Je wilt weten of aluminium lichter is dan staal. Hoe vergelijk je goed?",
          o: ["Vergelijk blokjes van 1 cm³ van elke stof", "Weeg een aluminium frame en een stalen stuur", "Kijk welk voorwerp het grootst is", "Pak het voorwerp dat het koudst voelt"],
          a: "Vergelijk blokjes van 1 cm³ van elke stof",
          fout: {
            "Weeg een aluminium frame en een stalen stuur": "dan vergelijk je twee voorwerpen van verschillende grootte. Een groot aluminium frame kan zwaarder zijn dan een klein stalen stuur.",
            "Kijk welk voorwerp het grootst is": "grootte zegt niets over de stof. Groot is niet hetzelfde als dicht.",
            "Pak het voorwerp dat het koudst voelt": "koud voelen heeft met warmte geleiden te maken, niet met dichtheid."
          },
          w: "Even grote blokjes (1 cm³) wegen: dan vergelijk je de stoffen zelf.",
          meer: "Aluminium 2,7 g per cm³ tegen staal 7,8 g per cm³. Zo zie je dat aluminium ongeveer 3 keer zo licht is." },

        { t: "gap", q: "Je leest 2,7 g/cm³ als: 2,7 gram ___ kubieke centimeter.",
          a: "per", soepel: true,
          w: "Gram per kubieke centimeter.",
          meer: "'Per' betekent 'voor elke'. Voor elke cm³ hoort er 2,7 g bij." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: een staafje messing heeft een massa van 34 g en een volume van 4 cm³. Wat is de dichtheid van messing?",
          stappen: [
            { toon: "gegevens: massa = 34 g · volume = 4 cm³", uitleg: "Massa in g en volume in cm³: de eenheden passen al." },
            { toon: "gevraagd: dichtheid = ?", uitleg: "Je zoekt de massa van 1 cm³." },
            { toon: "verdeel het staafje in gedachten in 4 blokjes van 1 cm³", uitleg: "Elk blokje heeft evenveel massa." },
            { toon: "dichtheid = 34 ÷ 4 = 8,5 g/cm³", uitleg: "Dat is ρ = m / V." }
          ],
          waarom: { q: "Waarom deel je 34 door 4?",
            o: ["Om de massa van één blokje van 1 cm³ te vinden", "Omdat je bij dichtheid altijd door 4 deelt", "Om het volume van het staafje te vinden"],
            a: "Om de massa van één blokje van 1 cm³ te vinden" },
          fout: {
            "Omdat je bij dichtheid altijd door 4 deelt": "je deelt door het volume, en dat is hier toevallig 4 cm³. Bij 5 cm³ deel je door 5.",
            "Om het volume van het staafje te vinden": "het volume was al gegeven: 4 cm³. Je zoekt de massa per cm³."
          },
          w: "Delen door het aantal cm³ geeft de massa van één blokje van 1 cm³.",
          meer: "Dat is precies wat dichtheid is. Volgens tabel 1 is 8,5 g/cm³ messing." },

        { t: "mc", q: "Een blokje aluminium van 1 cm³ heeft een massa van 2,7 g, een blokje staal van 1 cm³ 7,8 g. Wat kun je zeggen?",
          o: ["Aluminium is ongeveer 3 keer zo licht", "Aluminium is ongeveer 5 keer zo licht", "Staal is ongeveer 3 keer zo licht", "Ze zijn ongeveer even licht"],
          a: "Aluminium is ongeveer 3 keer zo licht",
          fout: {
            "Aluminium is ongeveer 5 keer zo licht": "7,8 − 2,7 is ongeveer 5, maar 'hoeveel keer' is delen: 7,8 ÷ 2,7 ≈ 3.",
            "Staal is ongeveer 3 keer zo licht": "andersom. Staal heeft de grootste massa per cm³, dus staal is de 'zware' stof.",
            "Ze zijn ongeveer even licht": "2,7 g en 7,8 g scheelt bijna een factor 3."
          },
          w: "7,8 ÷ 2,7 ≈ 3: aluminium is ongeveer 3 keer zo licht als staal.",
          meer: "Daarom maak je fietsvelgen en vliegtuigen graag van aluminium." },

        { t: "mc", q: "Welke formule klopt?",
          o: ["ρ = m / V", "ρ = V / m", "ρ = m × V", "ρ = m − V"],
          a: "ρ = m / V",
          fout: {
            "ρ = V / m": "omgedraaid. Kijk naar de eenheid g/cm³: gram (massa) boven, cm³ (volume) onder.",
            "ρ = m × V": "keer geeft een groter getal naarmate het blok groter is. Dichtheid hangt juist niet af van de grootte.",
            "ρ = m − V": "gram min cm³ kan niet: het zijn verschillende grootheden."
          },
          w: "Dichtheid = massa gedeeld door volume.",
          meer: "Ezelsbruggetje: de eenheid g/cm³ is de formule. Wat boven de streep staat (g) deel je door wat eronder staat (cm³)." },

        { t: "bouw", q: "Een blokje heeft een massa van <b>20 g</b> en een volume van <b>10 cm³</b>. Wat is de dichtheid? (alleen het getal, in g/cm³)",
          a: "2",
          w: "20 ÷ 10 = 2 g/cm³.",
          meer: "Elk blokje van 1 cm³ heeft 2 g. Dat is ongeveer keukenzout (2,2) of glas (2,6) in de buurt, maar geen van beide precies." },

        { t: "mc", q: "Je hebt een grote houten balk en een klein ijzeren spijkertje. Welke <b>stof</b> heeft de grootste dichtheid?",
          o: ["ijzer", "hout, want de balk is groter", "hout, want de balk is zwaarder", "allebei even groot"],
          a: "ijzer",
          fout: {
            "hout, want de balk is groter": "dat is de misvatting 'groot is dicht'. Het gaat om één cm³: hout (vurenhout) 0,58 g, ijzer 7,9 g.",
            "hout, want de balk is zwaarder": "zwaar is niet hetzelfde als dicht. De balk heeft meer massa omdat hij veel groter is, niet omdat hout dichter is.",
            "allebei even groot": "hout en ijzer zijn verschillende stoffen, met een verschillende dichtheid: 0,58 tegen 7,9 g/cm³."
          },
          w: "Ijzer: 7,9 g/cm³, vurenhout: 0,58 g/cm³.",
          meer: "Dichtheid gaat over de stof, niet over het voorwerp. Een heel klein stukje ijzer is nog steeds 7,9 g per cm³." },

        { t: "mc", q: "In het zwembad zwem je in water. Hoeveel gram is <b>1 cm³ water</b>?",
          o: ["1,0 g", "0,1 g", "10 g", "1000 g"],
          a: "1,0 g",
          fout: {
            "0,1 g": "dan zou water tien keer zo licht zijn als nu. Water heeft een dichtheid van 1,0 g/cm³.",
            "10 g": "dat is meer dan ijzer (7,9). Water is veel lichter: 1,0 g per cm³.",
            "1000 g": "dat is de massa van 1000 cm³ (1 liter) water."
          },
          w: "Water: 1,0 g/cm³, dus 1 cm³ water = 1,0 g.",
          meer: "Handig om te onthouden: 1 L water = 1000 cm³ = 1000 g = 1 kg." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Dichtheid is een <b>stofeigenschap</b>: een eigenschap waaraan je een stof kunt <b>herkennen</b>. Massa en volume zijn dat niet: die veranderen als je meer of minder van de stof neemt.",
        "Zaag je een blok doormidden, dan worden de massa én het volume half zo groot. De dichtheid blijft <b>gelijk</b>: 40 g ÷ 5 cm³ = 8, en 20 g ÷ 2,5 cm³ = 8.",
        "Daarom kun je met <b>tabel 1</b> uitzoeken van welke stof iets is: bereken de dichtheid en zoek het getal op. Een blokje van 723 g en 64 cm³ heeft een dichtheid van 11,3 g/cm³: lood.",
        "Gebruik de vaste rekenvorm: <b>gegevens → gevraagd → uitwerking</b>, met de eenheid in je antwoord."
      ],
      regel: "Dichtheid hangt alleen af van de stof: doorzagen verandert hem niet.",
      voorbeelden: [
        { en: "blok 40 g, 5 cm³, doorgezaagd", nl: "helft: 20 g, 2,5 cm³, dichtheid nog steeds 8 g/cm³", let: "<b>let op</b>: half zo groot is niet half zo dicht." },
        { en: "ring 26,25 g en 2,5 cm³", nl: "26,25 ÷ 2,5 = 10,5 g/cm³: zilver", let: "<b>let op</b>: zoek het getal op in tabel 1." }
      ],
      vragen: [
        { t: "mc", q: "Een blok heeft een massa van 40 g en een volume van 5 cm³. Je zaagt het precies doormidden. Wat is de dichtheid van één helft?",
          o: ["8 g/cm³", "4 g/cm³", "16 g/cm³", "20 g/cm³"],
          a: "8 g/cm³",
          fout: {
            "4 g/cm³": "dat is de misvatting 'half zo groot is half zo dicht'. Massa én volume halveren: 20 ÷ 2,5 = 8.",
            "16 g/cm³": "de helft is niet dichter geworden. Er zit evenveel massa in elke cm³: 20 ÷ 2,5 = 8.",
            "20 g/cm³": "20 g is de massa van de helft. Die moet je nog delen door het volume van de helft, 2,5 cm³."
          },
          w: "40 ÷ 5 = 8 en 20 ÷ 2,5 = 8: de dichtheid blijft gelijk.",
          meer: "Dit is waarom dichtheid een stofeigenschap is: het maakt niet uit hoeveel je van de stof hebt." },

        { t: "mc", q: "Waarom is dichtheid een <b>stofeigenschap</b>?",
          o: ["Hij hangt niet af van hoeveel stof je hebt", "Hij wordt groter als je meer van de stof neemt", "Je kunt hem met een liniaal meten", "Elk voorwerp heeft dezelfde dichtheid"],
          a: "Hij hangt niet af van hoeveel stof je hebt",
          fout: {
            "Hij wordt groter als je meer van de stof neemt": "dat geldt voor massa en volume. De dichtheid blijft gelijk: 40 : 5 = 8 en 20 : 2,5 = 8.",
            "Je kunt hem met een liniaal meten": "met een liniaal meet je hoogstens het volume van een blok. Je hebt ook de massa nodig.",
            "Elk voorwerp heeft dezelfde dichtheid": "verschillende stoffen hebben juist een verschillende dichtheid. Daarom kun je er de stof aan herkennen."
          },
          w: "Dichtheid hangt alleen af van welke stof het is.",
          meer: "Een spijker en een ijzeren balk: allebei 7,9 g/cm³. Met dat getal herken je ijzer." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: een zwart geverfd blokje meet 4,0 × 4,0 × 4,0 cm en heeft een massa van 723 g. Van welk materiaal kan het zijn?",
          stappen: [
            { toon: "gegevens: massa = 723 g · ribben 4,0 cm", uitleg: "De kleur helpt niet: het blokje is geverfd." },
            { toon: "volume = 4,0 × 4,0 × 4,0 = 64 cm³", uitleg: "Eerst het volume, want dat is niet gegeven." },
            { toon: "dichtheid = 723 ÷ 64 = 11,3 g/cm³", uitleg: "ρ = m / V." },
            { toon: "tabel 1: 11,3 g/cm³ = lood", uitleg: "Zoek het getal op in de tabel." }
          ],
          waarom: { q: "Waarom bereken je eerst het volume?",
            o: ["Je hebt massa én volume nodig voor ρ = m / V", "Omdat lood altijd 64 cm³ is", "Omdat tabel 1 in cm staat"],
            a: "Je hebt massa én volume nodig voor ρ = m / V" },
          fout: {
            "Omdat lood altijd 64 cm³ is": "lood kan elk volume hebben. Alleen de dichtheid van lood ligt vast: 11,3 g/cm³.",
            "Omdat tabel 1 in cm staat": "tabel 1 staat in g/cm³. Het volume heb je nodig om te kunnen delen."
          },
          w: "Zonder volume kun je niet delen: eerst V, dan ρ = m / V.",
          meer: "Dichtheid is een stofeigenschap, dus met het getal kun je de stof opzoeken. Zelfs als hij geverfd is." },

        { t: "mc", q: "Een ring heeft een massa van 26,25 g en een volume van 2,5 cm³. Van welke stof kan hij zijn? (gebruik tabel 1)",
          o: ["zilver", "goud", "lood", "koper"],
          a: "zilver",
          fout: {
            "goud": "goud heeft 19,3 g/cm³. Deze ring heeft 26,25 ÷ 2,5 = 10,5 g/cm³.",
            "lood": "lood is 11,3 g/cm³. Dichtbij, maar de ring heeft 10,5.",
            "koper": "koper is 8,96 g/cm³. Reken na: 26,25 ÷ 2,5 = 10,5."
          },
          w: "26,25 ÷ 2,5 = 10,5 g/cm³: zilver.",
          meer: "Juweliers gebruiken precies dit trucje om te controleren of een ring echt is." },

        { t: "bouw", q: "In een maatcilinder zit <b>9,0 cm³</b> van een vloeistof met een massa van <b>8,55 g</b>. Bereken de dichtheid. (alleen het getal, in g/cm³)",
          a: "0,95",
          w: "8,55 ÷ 9,0 = 0,95 g/cm³.",
          meer: "Een beetje lichter dan water (1,0). Zo'n vloeistof blijft boven op water drijven als hij er niet mee mengt." },

        { t: "sleep", opgave: "Je zaagt een blok ijzer doormidden. Wat <b>verandert</b> er, en wat <b>blijft gelijk</b>?",
          chips: [
            {t:"de massa", bak:"v"}, {t:"het volume", bak:"v"}, {t:"de lengte van het blok", bak:"v"},
            {t:"de dichtheid", bak:"b"}, {t:"welke stof het is", bak:"b"}, {t:"de massa van 1 cm³", bak:"b"}
          ],
          bakjes: [ {id:"v", label:"Verandert", som:"hangt af van hoeveel"}, {id:"b", label:"Blijft gelijk", som:"hangt af van de stof"} ],
          w: "Massa, volume en lengte veranderen; dichtheid (de massa van 1 cm³) en de stof blijven.",
          meer: "De massa van 1 cm³ ís de dichtheid. Daarom horen die twee kaartjes in hetzelfde bakje." },

        { t: "mc", q: "Een kilo lood en een kilo veren. Wat is waar?",
          o: ["Zelfde massa, lood heeft de grootste dichtheid", "Lood heeft de grootste massa", "Zelfde massa, dus ze hebben ook dezelfde dichtheid", "Veren hebben de grootste massa"],
          a: "Zelfde massa, lood heeft de grootste dichtheid",
          fout: {
            "Lood heeft de grootste massa": "allebei 1 kg, dus evenveel massa. Het verschil zit in het volume: veren nemen veel meer ruimte in.",
            "Zelfde massa, dus ze hebben ook dezelfde dichtheid": "dichtheid is massa per cm³. De veren hebben veel meer cm³, dus per cm³ veel minder massa.",
            "Veren hebben de grootste massa": "het zijn allebei 1 kg. Een grote zak veren lijkt meer, maar heeft evenveel stof."
          },
          w: "Gelijke massa, maar lood neemt veel minder ruimte in: grotere dichtheid.",
          meer: "Lood: 11,3 g/cm³. Een kilo lood past in 1000 ÷ 11,3 ≈ 88 cm³, een blokje kleiner dan je hand. Een kilo veren vult een heel kussen." },

        { t: "mc", q: "Je hebt een groot blok ijzer en een klein blokje ijzer. Hoe zit het met hun dichtheid?",
          o: ["Allebei 7,9 g/cm³", "Het grote blok heeft een grotere", "Het kleine blokje heeft een grotere", "Dat hangt af van de massa"],
          a: "Allebei 7,9 g/cm³",
          fout: {
            "Het grote blok heeft een grotere": "dat is Groot-Is-Dicht. Het grote blok heeft meer massa, maar ook meer volume. Per cm³ is het gelijk.",
            "Het kleine blokje heeft een grotere": "klein maakt een stof niet dichter. Elk cm³ ijzer heeft 7,9 g.",
            "Dat hangt af van de massa": "de massa hangt af van de grootte, de dichtheid niet. Dichtheid is een stofeigenschap."
          },
          w: "Zelfde stof = zelfde dichtheid: 7,9 g/cm³.",
          meer: "Een spijkertje en een brugbalk van ijzer: allebei 7,9 gram per cm³." },

        { t: "gap", q: "Dichtheid is een ___: een eigenschap waaraan je een stof kunt herkennen.",
          a: "stofeigenschap", soepel: true,
          w: "Een stofeigenschap.",
          meer: "Massa en volume zijn geen stofeigenschap: die hangen af van hoeveel stof je hebt." },

        { t: "velden", q: "Een steen heeft een massa van <b>78 g</b>. Je dompelt hem onder: beginstand <b>50 mL</b>, eindstand <b>80 mL</b>. Vul in.",
          velden: [ {label:"volume steen (cm³)", a:"30"}, {label:"dichtheid (g/cm³)", a:"2,6"} ],
          w: "80 − 50 = 30 cm³; 78 ÷ 30 = 2,6 g/cm³.",
          meer: "Volgens tabel 1 past 2,6 g/cm³ bij glas. Zo combineer je de onderdompelmethode met dichtheid." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Op Goud zit de valkuil in de <b>eenheden</b>. ρ = m / V geeft alleen g/cm³ als de massa in <b>g</b> staat en het volume in <b>cm³</b>. Staat er kg, dm³ of L? Reken dan eerst om.",
        "kg → g: × 1000. dm³ → cm³: × 1000. L → mL: × 1000, en 1 mL = 1 cm³.",
        "Versla <b>Groot-Is-Dicht</b> en zijn vriend 'zwaar is dicht': een groot of zwaar voorwerp kan een kleine dichtheid hebben (een boomstam), en een klein licht ding een grote (een loden kogeltje). Kijk altijd naar één cm³.",
        "Vergelijk je twee stoffen met <b>dezelfde massa</b>, dan heeft de stof met de kleinste dichtheid het grootste volume."
      ],
      regel: "Eerst eenheden goed (g en cm³), dan pas delen; denk altijd aan één cm³.",
      voorbeelden: [
        { en: "2,6 kg en 1 dm³", nl: "2600 g ÷ 1000 cm³ = 2,6 g/cm³: glas", let: "<b>let op</b>: eerst allebei omrekenen." },
        { en: "100 g koper en 100 g aluminium", nl: "aluminium heeft het grootste volume", let: "<b>let op</b>: kleinere dichtheid, dus meer cm³ voor dezelfde massa." }
      ],
      vragen: [
        { t: "mc", q: "Een blok heeft een massa van <b>2,6 kg</b> en een volume van <b>1 dm³</b>. Wat is de dichtheid in g/cm³?",
          o: ["2,6 g/cm³", "2600 g/cm³", "0,0026 g/cm³", "26 g/cm³"],
          a: "2,6 g/cm³",
          fout: {
            "2600 g/cm³": "je hebt alleen de massa omgerekend (2600 g) en niet het volume. 1 dm³ = 1000 cm³: 2600 ÷ 1000 = 2,6.",
            "0,0026 g/cm³": "je hebt alleen het volume omgerekend en de massa in kg gelaten: 2,6 ÷ 1000. Allebei omrekenen!",
            "26 g/cm³": "dan heb je ergens keer 10 gedaan. 2600 g ÷ 1000 cm³ = 2,6."
          },
          w: "2600 g ÷ 1000 cm³ = 2,6 g/cm³ (glas).",
          meer: "Allebei omrekenen, of allebei niet. Doe je er maar één, dan zit je er een factor 1000 naast." },

        { t: "bouw", q: "Een blok heeft een massa van <b>1,58 kg</b> en een volume van <b>0,2 dm³</b>. Wat is de dichtheid? (alleen het getal, in g/cm³)",
          a: "7,9",
          w: "1580 g ÷ 200 cm³ = 7,9 g/cm³.",
          meer: "Volgens tabel 1 is dat ijzer. Eerst kg → g en dm³ → cm³, dan delen." },

        { t: "mc", q: "Een blokje heeft een massa van 54 g en een volume van 20 cm³. Welke stof uit tabel 1 past het best?",
          o: ["aluminium", "glas", "staal", "ijzer"],
          a: "aluminium",
          fout: {
            "glas": "glas is 2,6 g/cm³, dichtbij maar niet gelijk. 54 ÷ 20 = 2,7, en dat is precies aluminium.",
            "staal": "staal is 7,8 g/cm³. Reken na: 54 ÷ 20 = 2,7.",
            "ijzer": "ijzer is 7,9 g/cm³, bijna drie keer zo groot als wat je uitrekent."
          },
          w: "54 ÷ 20 = 2,7 g/cm³: aluminium.",
          meer: "Twee stoffen die dicht bij elkaar liggen (glas 2,6, aluminium 2,7)? Reken dan precies na en kies het getal dat exact past." },

        { t: "mc", q: "Tim rekent de dichtheid van dat blokje uit als 20 ÷ 54 = 0,37 g/cm³. Wat ging er mis?",
          o: ["Hij deelde volume door massa", "Hij vergat kg om te rekenen", "Hij had moeten vermenigvuldigen", "Er ging niets mis"],
          a: "Hij deelde volume door massa",
          fout: {
            "Hij vergat kg om te rekenen": "de massa stond al in gram (54 g). Er hoefde niets omgerekend te worden.",
            "Hij had moeten vermenigvuldigen": "keer geeft 1080, en dat past bij geen enkele stof. Dichtheid is delen: massa ÷ volume.",
            "Er ging niets mis": "0,37 g/cm³ zou drijven op water, terwijl een blokje aluminium zinkt. Het goede antwoord is 54 ÷ 20 = 2,7."
          },
          w: "Massa boven, volume onder: 54 ÷ 20 = 2,7 g/cm³.",
          meer: "De eenheid g/cm³ verraadt de volgorde: eerst gram, dan delen door cm³." },

        { t: "mc", q: "Groot-Is-Dicht zegt: 'Een stalen schip heeft een grotere dichtheid dan een stalen spijker, want het is veel groter.' Wat klopt?",
          o: ["Fout: allebei staal, allebei 7,8 g/cm³", "Klopt: hoe groter, hoe dichter", "Fout: de kleine spijker heeft juist de grootste", "Klopt: een schip is veel zwaarder"],
          a: "Fout: allebei staal, allebei 7,8 g/cm³",
          fout: {
            "Klopt: hoe groter, hoe dichter": "dat is precies de misvatting. Groter betekent meer massa én meer volume. Per cm³ blijft het 7,8 g.",
            "Fout: de kleine spijker heeft juist de grootste": "klein maakt een stof ook niet dichter. Zelfde stof, zelfde dichtheid.",
            "Klopt: een schip is veel zwaarder": "zwaar is niet dicht. Het schip heeft meer massa, maar ook veel meer volume."
          },
          w: "Zelfde stof = zelfde dichtheid, hoe groot het voorwerp ook is.",
          meer: "De grootte van het voorwerp speelt geen rol. Dichtheid kijkt altijd naar 1 cm³ van de stof." },

        { t: "open", q: "Leg uit waarom dichtheid een stofeigenschap is. Gebruik het voorbeeld van een blok dat je doormidden zaagt.",
          punten: 2,
          modelantwoord: "Zaag je een blok doormidden, dan worden de massa en het volume allebei half zo groot. Bijvoorbeeld 40 g en 5 cm³ worden 20 g en 2,5 cm³. De dichtheid (massa gedeeld door volume) blijft dan gelijk: 40 : 5 = 8 en 20 : 2,5 = 8 g/cm³. De dichtheid hangt dus alleen af van de stof en niet van hoeveel je ervan hebt.",
          sleutelwoorden: [
            { moet: ["half"], syn: ["helft", "allebei kleiner", "massa en volume"] },
            { moet: ["gelijk"], syn: ["hetzelfde", "verandert niet", "blijft"] }
          ],
          rubric: ["Massa en volume worden allebei half zo groot (met of zonder getallen)", "De dichtheid blijft gelijk, dus hangt hij alleen af van de stof"],
          w: "Massa en volume halveren samen, dus m / V blijft gelijk: alleen de stof telt.",
          meer: "Een getallenvoorbeeld maakt je uitleg sterk: 40 : 5 = 8 en 20 : 2,5 = 8." },

        { t: "mc", q: "Twee blokjes hebben allebei een volume van 10 cm³. Blokje A heeft 27 g, blokje B 79 g. Wat is waar?",
          o: ["B is dichter, waarschijnlijk ijzer", "A is dichter, waarschijnlijk ijzer", "B is dichter, waarschijnlijk aluminium", "Ze zijn even dicht, want zelfde volume"],
          a: "B is dichter, waarschijnlijk ijzer",
          fout: {
            "A is dichter, waarschijnlijk ijzer": "A heeft minder massa in hetzelfde volume: 27 ÷ 10 = 2,7 (aluminium). B: 79 ÷ 10 = 7,9 (ijzer).",
            "B is dichter, waarschijnlijk aluminium": "B is wel het dichtst, maar 7,9 g/cm³ is ijzer. Aluminium is 2,7.",
            "Ze zijn even dicht, want zelfde volume": "zelfde volume, maar niet dezelfde massa. Dan verschilt de dichtheid."
          },
          w: "A: 2,7 g/cm³ (aluminium), B: 7,9 g/cm³ (ijzer).",
          meer: "Bij gelijk volume wint de grootste massa. Bij gelijke massa wint het kleinste volume." },

        { t: "velden", q: "Bij het winkelen koopt je moeder een pak melk. Je meet <b>250 mL</b> melk af en die heeft een massa van <b>0,26 kg</b>. Vul in.",
          velden: [ {label:"massa (g)", a:"260"}, {label:"volume (cm³)", a:"250"}, {label:"dichtheid (g/cm³)", a:"1,04"} ],
          w: "0,26 kg = 260 g; 250 mL = 250 cm³; 260 ÷ 250 = 1,04 g/cm³.",
          meer: "Melk is dus een beetje dichter dan water (1,0). Eerst omrekenen, dan pas delen." },

        { t: "mc", q: "Je hebt <b>100 g koper</b> en <b>100 g aluminium</b>. Welk blok heeft het grootste volume?",
          o: ["aluminium", "koper", "allebei even groot", "dat kun je niet weten"],
          a: "aluminium",
          fout: {
            "koper": "koper is dichter (8,96 g/cm³): er zit meer massa in elke cm³. Voor 100 g heb je dus minder cm³ nodig.",
            "allebei even groot": "zelfde massa betekent niet zelfde volume. Aluminium (2,7) heeft voor 100 g ongeveer 37 cm³ nodig, koper maar 11 cm³.",
            "dat kun je niet weten": "dat kan wel, met tabel 1. Kleinere dichtheid = meer volume voor dezelfde massa."
          },
          w: "Aluminium heeft de kleinste dichtheid, dus het grootste volume bij dezelfde massa.",
          meer: "100 ÷ 2,7 ≈ 37 cm³ aluminium tegen 100 ÷ 8,96 ≈ 11 cm³ koper." },

        { t: "sequence", q: "Je wilt weten van welke stof een steentje is. Zet de stappen in de goede volgorde.",
          stappen: ["Weeg de steen", "Lees de beginstand van het water af", "Laat de steen helemaal onder water zakken", "Lees de eindstand af", "Reken uit: volume = eind − begin", "Deel de massa door het volume", "Zoek de dichtheid op in tabel 1"],
          w: "Massa, volume (onderdompelen), delen, opzoeken.",
          meer: "Weeg de steen eerst, als hij nog droog is. Een natte steen heeft er wat water bij." }
      ]
    }
  ]
};

/* ================================================================ drijven (2.4.4) */
window.__TOPICS["drijven"] = {
  id: "drijven", emoji: "🛟", titel: "H2 · Drijven, zweven en zinken",
  kort: "Vergelijk de dichtheid van het voorwerp met die van de vloeistof (water 1,0 g/cm³).",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Of iets drijft of zinkt, zie je aan de <b>dichtheid</b>. Vergelijk de dichtheid van het voorwerp met de dichtheid van <b>water: 1,0 g/cm³</b>.",
        "<b>Kleiner</b> dan 1,0 g/cm³: het voorwerp <b>drijft</b>. Een blokje vurenhout (0,58) drijft.<br><b>Groter</b> dan 1,0 g/cm³: het voorwerp <b>zinkt</b>. Een gouden ring (19,3) zinkt.<br><b>Precies gelijk</b> aan 1,0 g/cm³: het voorwerp <b>zweeft</b> in het water.",
        "Het hangt dus <b>niet</b> af van hoe zwaar of groot iets is. Een olietanker van duizenden tonnen drijft, een muntje van een paar gram zinkt.",
        "Weet je de dichtheid nog niet? Reken hem dan eerst uit met ρ = m / V, en vergelijk daarna met 1,0."
      ],
      regel: "Kleiner dan 1,0 drijft, groter dan 1,0 zinkt, precies 1,0 zweeft (in water).",
      voorbeelden: [
        { en: "vurenhout 0,58 g/cm³", nl: "kleiner dan 1,0: drijft", let: "<b>let op</b>: ook een hele boomstam drijft." },
        { en: "goud 19,3 g/cm³", nl: "groter dan 1,0: zinkt", let: "<b>let op</b>: ook een heel klein gouden ringetje zinkt." },
        { en: "blok 30 g, 50 cm³", nl: "30 ÷ 50 = 0,6: drijft", let: "<b>let op</b>: eerst uitrekenen, dan vergelijken." }
      ],
      vragen: [
        { t: "mc", q: "Een voorwerp heeft een dichtheid van <b>0,58 g/cm³</b>. Wat doet het in water?",
          o: ["het drijft", "het zinkt", "het zweeft", "het lost op"],
          a: "het drijft",
          fout: {
            "het zinkt": "zinken gebeurt bij een dichtheid groter dan 1,0. 0,58 is kleiner.",
            "het zweeft": "zweven gebeurt alleen bij precies 1,0 g/cm³.",
            "het lost op": "oplossen heeft niets met dichtheid te maken. Vurenhout (0,58) lost niet op, het drijft."
          },
          w: "0,58 is kleiner dan 1,0: het drijft.",
          meer: "Vurenhout heeft precies deze dichtheid. Daarom drijven houten vlotten." },

        { t: "mc", q: "Goud heeft een dichtheid van 19,3 g/cm³. Wat doet een gouden ring in water?",
          o: ["hij zinkt", "hij drijft", "hij zweeft", "dat hangt af van hoe groot hij is"],
          a: "hij zinkt",
          fout: {
            "hij drijft": "drijven gebeurt alleen bij een dichtheid kleiner dan 1,0. 19,3 is veel groter.",
            "hij zweeft": "zweven is precies 1,0. Goud zit daar ver boven.",
            "dat hangt af van hoe groot hij is": "de grootte doet er niet toe, alleen de dichtheid. Een klein en een groot stuk goud: allebei 19,3, allebei zinken."
          },
          w: "19,3 is groter dan 1,0: zinkt.",
          meer: "Laat je je ring vallen bij het zwemmen, dan ligt hij op de bodem van het bad." },

        { t: "mc", q: "Een voorwerp heeft precies dezelfde dichtheid als water: 1,0 g/cm³. Wat doet het?",
          o: ["het zweeft", "het drijft", "het zinkt", "het springt omhoog"],
          a: "het zweeft",
          fout: {
            "het drijft": "drijven doet het bij een kleinere dichtheid dan water.",
            "het zinkt": "zinken doet het bij een grotere dichtheid dan water.",
            "het springt omhoog": "bij precies dezelfde dichtheid wordt het niet omhoog of omlaag geduwd. Het blijft hangen waar het is."
          },
          w: "Gelijk aan de vloeistof: het zweeft.",
          meer: "Zweven betekent: het blijft in het water hangen, op elke hoogte. Een vis kan dat bijna." },

        { t: "sleep", opgave: "Drijft het of zinkt het in <b>water</b> (1,0 g/cm³)? Sleep elke stof naar het goede bakje.",
          chips: [
            {t:"vurenhout 0,58", bak:"d"}, {t:"ijs 0,92", bak:"d"}, {t:"benzine 0,72", bak:"d"},
            {t:"perspex 1,2", bak:"z"}, {t:"glas 2,6", bak:"z"}, {t:"aluminium 2,7", bak:"z"}, {t:"zilver 10,5", bak:"z"}
          ],
          bakjes: [ {id:"d", label:"Drijft", som:"kleiner dan 1,0"}, {id:"z", label:"Zinkt", som:"groter dan 1,0"} ],
          w: "Onder 1,0 drijft (hout, ijs, benzine), boven 1,0 zinkt (perspex, glas, aluminium, zilver).",
          meer: "Perspex (1,2) zit net boven water: het zinkt, maar langzaam. IJs (0,92) zit net onder water: het drijft, met een groot deel onder water." },

        { t: "gap", q: "Water heeft een dichtheid van ___ g/cm³.",
          a: "1,0|1|1.0", soepel: true,
          w: "1,0 g/cm³.",
          meer: "Dat is het getal waarmee je alles vergelijkt bij drijven in water." },

        { t: "mc", q: "Een olietanker van duizenden tonnen drijft, een muntje van 7 gram zinkt. Hoe kan dat?",
          o: ["Het gaat om dichtheid, niet om massa", "Een tanker is lichter dan een muntje", "Hoe groter een ding is, hoe beter het blijft drijven", "Muntjes zinken omdat ze rond zijn"],
          a: "Het gaat om dichtheid, niet om massa",
          fout: {
            "Een tanker is lichter dan een muntje": "een tanker heeft juist veel meer massa. Toch drijft hij: massa beslist het niet.",
            "Hoe groter een ding is, hoe beter het blijft drijven": "een grote rots zinkt ook. Grootte beslist het niet, dichtheid wel.",
            "Muntjes zinken omdat ze rond zijn": "de vorm van een muntje doet er niet toe. Een vierkant muntje van hetzelfde metaal zinkt ook."
          },
          w: "Drijven of zinken hangt af van de dichtheid, niet van hoe zwaar of groot iets is.",
          meer: "Dit is de baas Zwaar-Zinkt: 'zwaar zinkt'. De tanker bewijst het tegendeel." },

        { t: "mc", q: "Wat vergelijk je om te weten of iets drijft in een vloeistof?",
          o: ["Dichtheid voorwerp met dichtheid vloeistof", "Massa van het voorwerp met massa van het water", "Volume van het voorwerp met volume van het water", "Hoe groot het voorwerp is met hoe diep het water is"],
          a: "Dichtheid voorwerp met dichtheid vloeistof",
          fout: {
            "Massa van het voorwerp met massa van het water": "massa beslist het niet: een tanker heeft veel massa en drijft toch.",
            "Volume van het voorwerp met volume van het water": "groot of klein zegt niets. Een grote balk hout drijft, een klein steentje zinkt.",
            "Hoe groot het voorwerp is met hoe diep het water is": "ook in een diep meer zinkt een muntje. De diepte verandert niets."
          },
          w: "Dichtheid tegenover dichtheid.",
          meer: "In water vergelijk je met 1,0 g/cm³. In een andere vloeistof met de dichtheid van die vloeistof." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: een blok heeft een massa van 30 g en een volume van 50 cm³. Drijft het in water?",
          stappen: [
            { toon: "gegevens: massa = 30 g · volume = 50 cm³", uitleg: "Eenheden g en cm³: klopt." },
            { toon: "dichtheid = 30 ÷ 50 = 0,6 g/cm³", uitleg: "Eerst de dichtheid uitrekenen." },
            { toon: "vergelijk: 0,6 is kleiner dan 1,0 (water)", uitleg: "Dan pas vergelijken met water." },
            { toon: "conclusie: het blok drijft", uitleg: "Kleiner dan de vloeistof = drijven." }
          ],
          waarom: { q: "Waarom drijft het blok?",
            o: ["0,6 g/cm³ is kleiner dan 1,0 g/cm³", "Omdat 30 g licht is", "Omdat 50 cm³ groot is"],
            a: "0,6 g/cm³ is kleiner dan 1,0 g/cm³" },
          fout: {
            "Omdat 30 g licht is": "30 g licht vinden zegt niets. Een stalen kogeltje van 30 g zinkt gewoon.",
            "Omdat 50 cm³ groot is": "groot of klein beslist het niet. Een groot stuk ijzer zinkt ook."
          },
          w: "De dichtheid (0,6) is kleiner dan die van water (1,0).",
          meer: "Altijd twee stappen: eerst ρ = m / V, dan vergelijken met de vloeistof." },

        { t: "gap", q: "Is de dichtheid van een voorwerp groter dan die van water, dan ___ het.",
          a: "zinkt", soepel: true,
          w: "Dan zinkt het.",
          meer: "Groter zinkt, kleiner drijft, gelijk zweeft." },

        { t: "mc", q: "Welke stof drijft op water?",
          o: ["vurenhout", "glas", "aluminium", "ijzer"],
          a: "vurenhout",
          fout: {
            "glas": "glas is 2,6 g/cm³, groter dan 1,0. Een knikker zinkt.",
            "aluminium": "aluminium is 2,7 g/cm³, groter dan 1,0. Een blokje aluminium zinkt.",
            "ijzer": "ijzer is 7,9 g/cm³. Een spijker zinkt meteen."
          },
          w: "Vurenhout: 0,58 g/cm³, kleiner dan 1,0.",
          meer: "Zoek bij twijfel de dichtheid op in tabel 1 en vergelijk met 1,0." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "In een <b>andere vloeistof</b> werkt het precies hetzelfde, alleen vergelijk je dan met de dichtheid van díe vloeistof. IJs (0,92) drijft op water (1,0), maar <b>zinkt</b> in alcohol (0,80).",
        "Er zijn ook verrassingen: in <b>kwik</b> (13,5 g/cm³) drijft zelfs ijzer (7,9). Alleen stoffen die dichter zijn dan 13,5, zoals goud (19,3), zinken daarin.",
        "Bij <b>gassen</b> vergelijk je met <b>lucht</b>: 0,001293 g/cm³. Helium (0,000178) is veel minder dicht, dus een heliumballon <b>stijgt</b>. Koolstofdioxide (0,00198) is dichter dan lucht en <b>zakt</b>.",
        "Twee vloeistoffen die niet mengen? De vloeistof met de kleinste dichtheid komt <b>bovenop</b>."
      ],
      regel: "Vergelijk altijd met de stof eromheen: water 1,0, alcohol 0,80, lucht 0,001293.",
      voorbeelden: [
        { en: "ijs 0,92 in alcohol 0,80", nl: "0,92 is groter dan 0,80: zinkt", let: "<b>let op</b>: in water drijft ijs wel." },
        { en: "helium in lucht", nl: "0,000178 is kleiner dan 0,001293: stijgt", let: "<b>let op</b>: gassen vergelijk je met lucht." }
      ],
      vragen: [
        { t: "mc", q: "Een ijsblokje (0,92 g/cm³) gooi je in een glas <b>alcohol</b> (0,80 g/cm³). Wat gebeurt er?",
          o: ["het zinkt", "het drijft, net als in water", "het zweeft", "het drijft, want ijs drijft altijd"],
          a: "het zinkt",
          fout: {
            "het drijft, net als in water": "in water drijft het, want 0,92 is kleiner dan 1,0. Maar alcohol is 0,80, en 0,92 is groter.",
            "het zweeft": "zweven kan alleen bij precies dezelfde dichtheid. 0,92 en 0,80 zijn niet gelijk.",
            "het drijft, want ijs drijft altijd": "ijs drijft alleen in een vloeistof die dichter is dan 0,92. Alcohol is minder dicht."
          },
          w: "0,92 is groter dan 0,80: het ijsblokje zinkt in alcohol.",
          meer: "Vergelijk altijd met de vloeistof waar het in zit, niet automatisch met water." },

        { t: "mc", q: "Een blokje vurenhout (0,58 g/cm³) leg je in alcohol (0,80 g/cm³). Wat doet het?",
          o: ["het drijft", "het zinkt", "het zweeft", "het lost op in de alcohol"],
          a: "het drijft",
          fout: {
            "het zinkt": "0,58 is kleiner dan 0,80. Dan drijft het.",
            "het zweeft": "zweven vraagt precies gelijke dichtheden. 0,58 is niet 0,80.",
            "het lost op in de alcohol": "hout lost niet op in alcohol. En oplossen is een andere vraag dan drijven."
          },
          w: "0,58 is kleiner dan 0,80: drijft.",
          meer: "Het hout drijft wel dieper in alcohol dan in water, omdat het verschil kleiner is." },

        { t: "mc", q: "Waarom stijgt een ballon met <b>helium</b> op?",
          o: ["Helium is minder dicht dan lucht", "Helium heeft helemaal geen massa", "Helium is warmer dan de lucht om de ballon", "De ballon wordt door de wind meegenomen"],
          a: "Helium is minder dicht dan lucht",
          fout: {
            "Helium heeft helemaal geen massa": "helium heeft wel massa, alleen heel weinig per cm³: 0,000178 g. Lucht heeft 0,001293 g per cm³.",
            "Helium is warmer dan de lucht om de ballon": "helium in een ballon is gewoon even warm als de lucht. Het gaat om dichtheid.",
            "De ballon wordt door de wind meegenomen": "ook binnen, zonder wind, stijgt een heliumballon naar het plafond."
          },
          w: "Helium (0,000178) is minder dicht dan lucht (0,001293): de ballon stijgt.",
          meer: "Bij gassen vergelijk je met lucht, net zoals je bij vaste stoffen in water vergelijkt met 1,0." },

        { t: "mc", q: "Je vult een ballon met <b>koolstofdioxide</b> (0,00198 g/cm³) en laat hem los. Lucht is 0,001293 g/cm³. Wat doet hij?",
          o: ["hij zakt naar de grond", "hij stijgt op", "hij blijft precies hangen", "hij knapt meteen"],
          a: "hij zakt naar de grond",
          fout: {
            "hij stijgt op": "stijgen doet een gas dat minder dicht is dan lucht (0,001293). Koolstofdioxide is dichter: 0,00198.",
            "hij blijft precies hangen": "dan zou koolstofdioxide even dicht moeten zijn als lucht. Het is dichter.",
            "hij knapt meteen": "koolstofdioxide laat een ballon niet knappen. Het is gewoon een gas dat dichter is dan lucht."
          },
          w: "0,00198 is groter dan 0,001293: hij zakt.",
          meer: "Koolstofdioxide blijft daarom laag bij de grond hangen, bijvoorbeeld onderin een put of kelder." },

        { t: "sleep", opgave: "Wat drijft en wat zinkt in <b>kwik</b> (13,5 g/cm³)? Let op, dit is een instinker.",
          chips: [
            {t:"ijzer 7,9", bak:"d"}, {t:"lood 11,3", bak:"d"}, {t:"zilver 10,5", bak:"d"}, {t:"koper 8,96", bak:"d"},
            {t:"goud 19,3", bak:"z"}
          ],
          bakjes: [ {id:"d", label:"Drijft op kwik", som:"kleiner dan 13,5"}, {id:"z", label:"Zinkt in kwik", som:"groter dan 13,5"} ],
          w: "Alles onder 13,5 drijft op kwik, ook ijzer en lood. Alleen goud (19,3) zinkt.",
          meer: "Zwaar-Zinkt zou zeggen dat lood altijd zinkt. In kwik drijft het gewoon: het gaat om de vergelijking met de vloeistof." },

        { t: "mc", q: "Een voorwerp <b>zweeft</b> in alcohol. Wat is zijn dichtheid?",
          o: ["0,80 g/cm³", "1,0 g/cm³", "0 g/cm³", "meer dan 0,80 g/cm³"],
          a: "0,80 g/cm³",
          fout: {
            "1,0 g/cm³": "1,0 is de dichtheid van water. In alcohol zweeft iets bij de dichtheid van alcohol: 0,80.",
            "0 g/cm³": "een dichtheid van 0 bestaat niet: alles heeft massa.",
            "meer dan 0,80 g/cm³": "dan zou het zinken in alcohol."
          },
          w: "Zweven = precies dezelfde dichtheid als de vloeistof: 0,80 g/cm³.",
          meer: "In water zweeft iets bij 1,0, in alcohol bij 0,80. Het hangt af van de vloeistof." },

        { t: "bouw", q: "Een blokje heeft een massa van <b>12 g</b> en een volume van <b>15 cm³</b>. Wat is de dichtheid? (alleen het getal, in g/cm³)",
          a: "0,8",
          w: "12 ÷ 15 = 0,8 g/cm³.",
          meer: "Dat is precies de dichtheid van alcohol. In alcohol zou dit blokje zweven." },

        { t: "mc", q: "Datzelfde blokje (0,80 g/cm³) leg je in water en in alcohol. Wat gebeurt er?",
          o: ["Drijft in water, zweeft in alcohol", "Zinkt in water, drijft in alcohol", "Zweeft in water, zinkt in alcohol", "Drijft in water en in alcohol"],
          a: "Drijft in water, zweeft in alcohol",
          fout: {
            "Zinkt in water, drijft in alcohol": "precies andersom gedacht. 0,80 is kleiner dan 1,0 (water), dus drijft het in water.",
            "Zweeft in water, zinkt in alcohol": "zweven in water vraagt 1,0. En in alcohol is het precies gelijk, dus zweeft het daar.",
            "Drijft in water en in alcohol": "in water drijft het wel. In alcohol is de dichtheid precies gelijk: dan zweeft het."
          },
          w: "Water 1,0: kleiner, dus drijft. Alcohol 0,80: gelijk, dus zweeft.",
          meer: "Hetzelfde voorwerp kan in de ene vloeistof drijven en in de andere zweven of zinken." },

        { t: "gap", q: "Een gas met een kleinere dichtheid dan lucht gaat ___.",
          a: "omhoog|stijgen|stijgt|naar boven", soepel: true,
          w: "Omhoog: het stijgt.",
          meer: "Helium en waterdamp zijn minder dicht dan lucht. Koolstofdioxide is dichter en zakt." },

        { t: "mc", q: "Je giet een beetje <b>benzine</b> (0,72 g/cm³) op water. Ze mengen niet. Waar komt de benzine?",
          o: ["bovenop het water", "onderin, onder het water", "precies in het midden", "verspreid door het hele glas"],
          a: "bovenop het water",
          fout: {
            "onderin, onder het water": "onderin komt de vloeistof met de grootste dichtheid. Benzine (0,72) is minder dicht dan water (1,0).",
            "precies in het midden": "met twee lagen is er geen midden: de minst dichte vloeistof ligt boven.",
            "verspreid door het hele glas": "dat zou gebeuren als ze mengen. Benzine en water mengen niet, dus ze vormen lagen."
          },
          w: "Minder dicht komt bovenop.",
          meer: "Daarom zie je bij een tankstation in een plas soms een glimmend laagje: benzine of olie drijft op het water." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Baas <b>Zwaar-Zinkt</b> zegt: 'zware dingen zinken'. Botsing: een boomstam van 300 kg drijft (vurenhout 0,58), een muntje van 7 g zinkt. Massa beslist het niet, dichtheid wel.",
        "Een stalen schip drijft, terwijl staal 7,8 g/cm³ is. Het schip is <b>hol</b>: binnenin zit lucht. Staal en lucht samen hebben een veel kleinere dichtheid dan 1,0. Een massieve stalen kogel heeft die lucht niet en zinkt.",
        "Zo werkt het ook bij zwemmen: met veel lucht in je longen drijf je makkelijker, want je lichaam met de lucht samen is minder dicht.",
        "Doorzagen verandert niets: dichtheid is een stofeigenschap. Een blokje dat zweeft, blijft in twee helften ook zweven."
      ],
      regel: "Massa en grootte beslissen niets; vergelijk de dichtheid (met lucht erin meegeteld) met de vloeistof.",
      voorbeelden: [
        { en: "boomstam 300 kg", nl: "vurenhout 0,58: drijft", let: "<b>let op</b>: zwaar is niet hetzelfde als dicht." },
        { en: "stalen schip tegen stalen kogel", nl: "schip hol met lucht: drijft; kogel massief: zinkt", let: "<b>let op</b>: de lucht in het schip telt mee." }
      ],
      vragen: [
        { t: "mc", q: "Zwaar-Zinkt zegt: 'Een boomstam van vurenhout van 300 kg zinkt, want hij is heel zwaar.' Wat klopt?",
          o: ["Fout: 0,58 is kleiner dan 1,0, dus hij drijft", "Klopt: alles boven 100 kg zinkt", "Klopt: zware dingen zinken altijd", "Fout: hij zweeft, want hij is groot"],
          a: "Fout: 0,58 is kleiner dan 1,0, dus hij drijft",
          fout: {
            "Klopt: alles boven 100 kg zinkt": "zo'n grens bestaat niet. Een olietanker van duizenden tonnen drijft.",
            "Klopt: zware dingen zinken altijd": "dat is precies Zwaar-Zinkt. Een muntje van 7 g zinkt, een stam van 300 kg drijft.",
            "Fout: hij zweeft, want hij is groot": "zweven vraagt een dichtheid van precies 1,0. Groot zijn maakt daar niets aan uit."
          },
          w: "Vurenhout 0,58 is kleiner dan 1,0: de stam drijft, hoe zwaar hij ook is.",
          meer: "Vroeger liet men boomstammen over rivieren drijven naar de zagerij. Juist zware stammen." },

        { t: "mc", q: "Een stalen schip drijft, een stalen kogel zinkt. Hoe kan dat?",
          o: ["Het schip is hol en zit vol lucht", "Scheepsstaal is een lichtere soort staal", "Zeewater houdt alles van staal drijvend", "Een kogel is zwaarder dan een heel schip"],
          a: "Het schip is hol en zit vol lucht",
          fout: {
            "Scheepsstaal is een lichtere soort staal": "het is gewoon staal, 7,8 g/cm³. Het verschil zit in de lucht binnenin het schip.",
            "Zeewater houdt alles van staal drijvend": "een stalen kogel zinkt ook in zeewater. Zeewater is maar een klein beetje dichter dan gewoon water.",
            "Een kogel is zwaarder dan een heel schip": "een schip heeft veel meer massa. Toch drijft het: het gaat om dichtheid."
          },
          w: "Staal plus de lucht erin is samen minder dicht dan water.",
          meer: "Maakt een schip water, dan verdwijnt die lucht en zinkt het." },

        { t: "mc", q: "Bij het zwemmen merk je: met veel lucht in je longen drijf je makkelijker. Waarom?",
          o: ["Lucht maakt je samen minder dicht", "Lucht in je longen maakt jou juist veel zwaarder", "Lucht maakt het water om je heen zwaarder", "Lucht laat het water warmer worden"],
          a: "Lucht maakt je samen minder dicht",
          fout: {
            "Lucht in je longen maakt jou juist veel zwaarder": "lucht heeft bijna geen massa (0,001293 g/cm³). Je volume wordt wel groter, dus je dichtheid kleiner.",
            "Lucht maakt het water om je heen zwaarder": "de lucht zit in jou, niet in het water. Het water verandert niet.",
            "Lucht laat het water warmer worden": "temperatuur speelt hier geen rol. Het gaat om dichtheid."
          },
          w: "Meer volume met bijna geen extra massa: je dichtheid daalt en je drijft makkelijker.",
          meer: "Blaas je alle lucht uit, dan zak je langzaam naar de bodem. Probeer het maar eens in het zwembad." },

        { t: "mc", q: "Een blokje zweeft in water. Je zaagt het doormidden. Wat doet elke helft?",
          o: ["het zweeft nog steeds", "het drijft, want het is lichter", "het zinkt, want het is kleiner", "de ene helft drijft, de andere zinkt"],
          a: "het zweeft nog steeds",
          fout: {
            "het drijft, want het is lichter": "elke helft heeft minder massa, maar ook minder volume. De dichtheid blijft 1,0.",
            "het zinkt, want het is kleiner": "kleiner maakt een stof niet dichter. Dichtheid is een stofeigenschap.",
            "de ene helft drijft, de andere zinkt": "het is dezelfde stof, dus beide helften hebben dezelfde dichtheid: 1,0."
          },
          w: "Doorzagen verandert de dichtheid niet: beide helften zweven.",
          meer: "Massa en volume halveren samen, zoals 40 : 5 = 8 en 20 : 2,5 = 8. Dus ρ blijft gelijk, en daarmee ook het zweven." },

        { t: "open", q: "Leg uit waarom een olietanker van duizenden tonnen blijft drijven, terwijl een muntje van een paar gram zinkt.",
          punten: 2,
          modelantwoord: "Of iets drijft of zinkt, hangt niet af van de massa maar van de dichtheid vergeleken met water (1,0 g/cm³). Het muntje is massief metaal met een dichtheid groter dan 1,0, dus het zinkt. De tanker is hol en zit vol lucht, dus de tanker als geheel heeft een dichtheid kleiner dan 1,0 en drijft.",
          sleutelwoorden: [
            { moet: ["dichtheid"], syn: ["dicht", "g/cm"] },
            { moet: ["water"], syn: ["1,0", "vloeistof"] }
          ],
          rubric: ["Het gaat om dichtheid, niet om massa of grootte", "Vergelijkt met water (1,0): muntje groter dan 1,0 zinkt, tanker (hol, met lucht) kleiner dan 1,0 drijft"],
          w: "Dichtheid vergeleken met water beslist, niet de massa.",
          meer: "Zo versla je Zwaar-Zinkt: zwaar zegt niets, dichtheid alles." },

        { t: "sequence", q: "In één glas giet je <b>kwik</b> (13,5), <b>water</b> (1,0) en <b>benzine</b> (0,72); ze mengen niet. Je doet er ook een <b>ijzeren spijker</b> (7,9) en een <b>ijsblokje</b> (0,92) in. Zet alles van <b>onder naar boven</b>.",
          stappen: ["kwik", "ijzeren spijker", "water", "ijsblokje", "benzine"],
          w: "Van grootste naar kleinste dichtheid: kwik, spijker (drijft op kwik), water, ijsblokje (drijft op water, zinkt in benzine), benzine.",
          meer: "De spijker zinkt door water heen (7,9 groter dan 1,0) maar blijft op het kwik liggen (7,9 kleiner dan 13,5). Het ijsblokje hangt precies tussen water en benzine." },

        { t: "mc", q: "Boven een pan kokend water komt <b>waterdamp</b> (0,00060 g/cm³). Lucht is 0,001293 g/cm³. Wat doet die damp?",
          o: ["hij stijgt op", "hij zakt naar de grond", "hij blijft hangen boven de pan", "hij zinkt terug in de pan"],
          a: "hij stijgt op",
          fout: {
            "hij zakt naar de grond": "zakken doet een gas dat dichter is dan lucht (0,001293). Waterdamp is minder dicht.",
            "hij blijft hangen boven de pan": "blijven hangen (zweven) gebeurt alleen bij precies dezelfde dichtheid als lucht.",
            "hij zinkt terug in de pan": "waterdamp is minder dicht dan lucht, dus hij gaat omhoog, niet omlaag."
          },
          w: "0,00060 is kleiner dan 0,001293: waterdamp stijgt.",
          meer: "Daarom zie je de damp boven de pan omhoog kringelen." },

        { t: "bouw", q: "Welke dichtheid moet een voorwerp hebben om in water te <b>zweven</b>? (alleen het getal, in g/cm³)",
          a: "1",
          w: "Precies 1,0 g/cm³, gelijk aan water.",
          meer: "Een duikboot regelt zijn dichtheid met water en lucht in tanks. Zo kan hij zweven op elke diepte." },

        { t: "mc", q: "Een blokje van <b>50 g</b> drijft op water. Wat weet je dan zeker over het volume?",
          o: ["Het is groter dan 50 cm³", "Het is kleiner dan 50 cm³", "Het is precies 50 cm³", "Daar kun je niets over zeggen"],
          a: "Het is groter dan 50 cm³",
          fout: {
            "Het is kleiner dan 50 cm³": "dan zou de dichtheid groter zijn dan 50 ÷ 50 = 1,0, en dan zinkt het.",
            "Het is precies 50 cm³": "dan is de dichtheid precies 1,0 en zweeft het. Maar het drijft.",
            "Daar kun je niets over zeggen": "dat kan wel. Drijven betekent: dichtheid kleiner dan 1,0, dus m ÷ V kleiner dan 1. Dan is V groter dan 50."
          },
          w: "Drijven: 50 ÷ V kleiner dan 1,0, dus V groter dan 50 cm³.",
          meer: "Hier redeneer je achteruit vanuit de formule. Dat is echt Goud-werk." },

        { t: "mc", q: "Wat is de beste reden waarom een stuk ijs (0,92) op water drijft?",
          o: ["0,92 is kleiner dan 1,0", "IJs is koud en koud spul drijft", "IJs is lichter dan het water in het glas", "IJs is een vaste stof en water niet"],
          a: "0,92 is kleiner dan 1,0",
          fout: {
            "IJs is koud en koud spul drijft": "koud of warm beslist niet. Een koud steentje zinkt gewoon.",
            "IJs is lichter dan het water in het glas": "dat zegt alleen iets over massa. Een grote ijsberg is veel zwaarder dan een glas water en drijft toch.",
            "IJs is een vaste stof en water niet": "vaste stoffen kunnen ook zinken, zoals glas of ijzer. Het gaat om de dichtheid."
          },
          w: "Dichtheid ijs (0,92) is kleiner dan water (1,0).",
          meer: "Het verschil is klein. Daarom zit het grootste deel van een ijsberg onder water." }
      ]
    }
  ]
};

/* ================================================================ omrekenen (formulekaart) */
window.__TOPICS["omrekenen"] = {
  id: "omrekenen", emoji: "🔁", titel: "H2 · Eenheden omrekenen en de formulekaart",
  kort: "Groot naar klein: × 1000 (getal groter). Klein naar groot: ÷ 1000 (getal kleiner).",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Vier paren moet je kennen: <b>1 kg = 1000 g</b> · <b>1 L = 1000 mL</b> · <b>1 A = 1000 mA</b> · <b>1 V = 1000 mV</b>. 'Milli' betekent een duizendste.",
        "Het getal is dus altijd 1000. De vraag is: <b>welke kant op?</b><br><b>Van een grote eenheid naar een kleine</b> (kg → g, L → mL, A → mA, V → mV): <b>× 1000</b>. Je hebt veel kleine stukjes nodig, dus het getal wordt <b>groter</b>.<br><b>Van klein naar groot</b> (g → kg, mL → L, mA → A, mV → V): <b>÷ 1000</b>. Het getal wordt <b>kleiner</b>.",
        "Doe daarna altijd de <b>uitkomstcheck</b>: kleine eenheid hoort bij een groot getal. 250 mA = 0,250 A, en niet 250 000 A.",
        "Dit is <b>Mijn formulekaart</b>, die komt op je spiekblad:<div style='overflow-x:auto;max-width:100%'><table style='font-size:.82rem;border-collapse:collapse'><tr><th>Grootheid</th><th>Symbool</th><th>Eenheid</th><th>Formule / omrekenen</th></tr><tr><td>tijd</td><td>t</td><td>seconde (s)</td><td>1 min = 60 s</td></tr><tr><td>lengte</td><td>l</td><td>meter (m), centimeter (cm)</td><td>1 m = 100 cm</td></tr><tr><td>massa</td><td>m</td><td>kilogram (kg), gram (g)</td><td>1 kg = 1000 g</td></tr><tr><td>gewicht</td><td>(F)</td><td>newton (N)</td><td>op aarde 1 kg ≈ 10 N</td></tr><tr><td>volume</td><td>V</td><td>cm³, dm³, m³, L, mL</td><td>1 L = 1 dm³ = 1000 cm³ · 1 mL = 1 cm³ · blok: l × b × h · cilinder: π × r × r × h · onderdompelen: eind − begin</td></tr><tr><td>dichtheid</td><td>ρ (rho)</td><td>g/cm³</td><td>ρ = m / V</td></tr><tr><td>stroomsterkte</td><td>I</td><td>ampère (A), milliampère (mA)</td><td>A → mA: × 1000 · mA → A: ÷ 1000</td></tr><tr><td>spanning</td><td>U</td><td>volt (V), millivolt (mV)</td><td>V → mV: × 1000 · mV → V: ÷ 1000 · in serie: optellen</td></tr></table></div>"
      ],
      regel: "Groot → klein: × 1000 (getal groter). Klein → groot: ÷ 1000 (getal kleiner).",
      voorbeelden: [
        { en: "3 kg = 3000 g", nl: "kg is groot, g is klein: × 1000", let: "<b>let op</b>: het getal werd groter. Klopt." },
        { en: "2500 mL = 2,5 L", nl: "mL is klein, L is groot: ÷ 1000", let: "<b>let op</b>: het getal werd kleiner. Klopt." },
        { en: "2 A = 2000 mA", nl: "A is groot, mA is klein: × 1000", let: "<b>let op</b>: precies dezelfde regel als bij gram." }
      ],
      vragen: [
        { t: "mc", q: "Je rekent <b>kilogram</b> om naar <b>gram</b>. Wat doe je met het getal?",
          o: ["× 1000, het getal wordt groter", "÷ 1000, het getal wordt kleiner", "× 100, het getal wordt groter", "niets, het getal blijft gelijk"],
          a: "× 1000, het getal wordt groter",
          fout: {
            "÷ 1000, het getal wordt kleiner": "dat is de andere kant op. Een gram is veel kleiner dan een kilogram, dus je hebt er veel meer nodig: 3 kg = 3000 g.",
            "× 100, het getal wordt groter": "de richting klopt, maar de stap is 1000: 1 kg = 1000 g.",
            "niets, het getal blijft gelijk": "1 kg en 1 g zijn heel verschillende hoeveelheden. Het getal verandert dus wel."
          },
          w: "Groot naar klein: × 1000, het getal wordt groter.",
          meer: "Check met iets wat je zeker weet: een pak suiker is 1 kg en ook 1000 g. Het getal werd groter." },

        { t: "mc", q: "Hoeveel milliliter gaat er in 1 liter?",
          o: ["1000 mL", "100 mL", "10 mL", "1 000 000 mL"],
          a: "1000 mL",
          fout: {
            "100 mL": "dat is een tiende liter, een klein glaasje. Een hele liter is 1000 mL.",
            "10 mL": "dat is nog geen slok. Een pak melk van 1 L is 1000 mL.",
            "1 000 000 mL": "dat is 1000 liter: een hele regenton vol."
          },
          w: "1 L = 1000 mL.",
          meer: "'Milli' betekent een duizendste: een milliliter is een duizendste liter." },

        { t: "mc", q: "Hoeveel milliampère is <b>1 A</b>?",
          o: ["1000 mA", "100 mA", "10 mA", "0,001 mA"],
          a: "1000 mA",
          fout: {
            "100 mA": "bij milli hoort altijd 1000, niet 100. 1 A = 1000 mA.",
            "10 mA": "dat is maar een honderdste ampère. 1 A = 1000 mA.",
            "0,001 mA": "je bent de verkeerde kant op gegaan. mA is kleiner dan A, dus er gaan er juist veel in één A."
          },
          w: "1 A = 1000 mA.",
          meer: "Precies zoals 1 kg = 1000 g. 'Milli' werkt bij elke eenheid hetzelfde." },

        { t: "bouw", q: "Reken om: <b>5 kg = ___ g</b> (alleen het getal)",
          a: "5000",
          w: "kg naar g: × 1000. 5 × 1000 = 5000.",
          meer: "Check: het getal werd groter, en dat hoort bij groot → klein." },

        { t: "bouw", q: "Reken om: <b>3000 mL = ___ L</b> (alleen het getal)",
          a: "3",
          w: "mL naar L: ÷ 1000. 3000 ÷ 1000 = 3.",
          meer: "Check: het getal werd kleiner, en dat hoort bij klein → groot." },

        { t: "mc", q: "Erik schrijft: 250 g = 250 000 kg. Wat ging er mis?",
          o: ["Verkeerde kant op: het is 0,25 kg", "Hij had × 100 moeten doen", "Er ging niets mis", "Hij had 1000 erbij moeten optellen"],
          a: "Verkeerde kant op: het is 0,25 kg",
          fout: {
            "Hij had × 100 moeten doen": "de stap 1000 klopt wel. De fout zit in de richting: van g naar kg moet je delen.",
            "Er ging niets mis": "250 000 kg is zo zwaar als een walvis. Een pakje boter van 250 g weegt dat niet.",
            "Hij had 1000 erbij moeten optellen": "bij omrekenen tel je nooit op. Je doet × 1000 of ÷ 1000."
          },
          w: "Van g (klein) naar kg (groot): ÷ 1000, dus 0,25 kg.",
          meer: "De uitkomstcheck vangt dit meteen: kg is groter dan g, dus het getal moet kleiner worden. 250 000 is juist groter." },

        { t: "sleep", opgave: "Doe je <b>× 1000</b> of <b>÷ 1000</b>? Sleep elke omrekening naar het goede bakje.",
          chips: [
            {t:"kg → g", bak:"x"}, {t:"L → mL", bak:"x"}, {t:"A → mA", bak:"x"}, {t:"V → mV", bak:"x"},
            {t:"g → kg", bak:"d"}, {t:"mL → L", bak:"d"}, {t:"mA → A", bak:"d"}, {t:"mV → V", bak:"d"}
          ],
          bakjes: [ {id:"x", label:"× 1000", som:"groot naar klein"}, {id:"d", label:"÷ 1000", som:"klein naar groot"} ],
          w: "Naar de milli- of gram-kant (klein): × 1000. Terug naar de grote eenheid: ÷ 1000.",
          meer: "Zie je een 'm' van milli verschijnen (V → mV), dan ga je naar klein: × 1000. Verdwijnt de 'm' (mA → A), dan ÷ 1000." },

        { t: "gap", q: "'Milli' betekent een ___.",
          a: "duizendste|1/1000", soepel: true,
          w: "Een duizendste.",
          meer: "1 mL = een duizendste liter, 1 mA = een duizendste ampère, 1 mV = een duizendste volt." },

        { t: "mc", q: "Welk symbool hoort op de formulekaart bij de grootheid <b>stroomsterkte</b>?",
          o: ["I", "A", "U", "S"],
          a: "I",
          fout: {
            "A": "A is de eenheid (ampère), niet het symbool van de grootheid. Dat is I.",
            "U": "U is het symbool van spanning.",
            "S": "S komt niet voor op de formulekaart. Stroomsterkte is I, met als eenheid ampère (A)."
          },
          w: "Stroomsterkte: symbool I, eenheid ampère (A).",
          meer: "Let op het verschil: het symbool hoort bij de grootheid (I), de eenheid komt achter het getal (A). 0,3 A is een stroomsterkte I." },

        { t: "mc", q: "Welk rijtje (grootheid, symbool, eenheid) klopt?",
          o: ["massa, m, kg", "massa, kg, m", "volume, L, V", "spanning, V, U"],
          a: "massa, m, kg",
          fout: {
            "massa, kg, m": "symbool en eenheid zijn verwisseld. Het symbool van massa is m, de eenheid is kg.",
            "volume, L, V": "omgedraaid: het symbool van volume is V, de eenheid is bijvoorbeeld L.",
            "spanning, V, U": "omgedraaid: het symbool van spanning is U, de eenheid is volt (V)."
          },
          w: "Massa: symbool m, eenheid kg.",
          meer: "Volume: V en L. Spanning: U en V. Pas op: de letter V betekent bij volume het symbool, bij spanning de eenheid volt." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Nu met <b>kommagetallen</b>. De regel blijft, alleen de komma schuift.",
        "<b>× 1000</b>: komma <b>drie plaatsen naar rechts</b>: 0,53 kg → 530 g, 0,35 A → 350 mA.<br><b>÷ 1000</b>: komma <b>drie plaatsen naar links</b>: 71 g → 0,071 kg, 4500 mV → 4,5 V.",
        "Ontbreken er cijfers? Vul aan met nullen: 7,2 g → 0,0072 kg.",
        "Blijf checken met iets wat je kent: een glas is ongeveer 250 mL, een batterij 1,5 V. Is je uitkomst een zwembad of een bliksemschicht? Dan ging de komma de verkeerde kant op."
      ],
      regel: "× 1000: komma drie plaatsen naar rechts. ÷ 1000: komma drie plaatsen naar links.",
      voorbeelden: [
        { en: "0,53 kg = 530 g", nl: "× 1000: komma drie naar rechts", let: "<b>let op</b>: getal groter, klopt bij kg → g." },
        { en: "250 mA = 0,250 A", nl: "÷ 1000: komma drie naar links", let: "<b>let op</b>: niet 250 000 A, dat is een bliksemschicht." }
      ],
      vragen: [
        { t: "mc", q: "Hoeveel plaatsen schuift de komma als je <b>× 1000</b> doet?",
          o: ["drie naar rechts", "drie naar links", "één naar rechts", "twee naar rechts"],
          a: "drie naar rechts",
          fout: {
            "drie naar links": "dat is ÷ 1000. Bij × wordt het getal groter, dus de komma gaat naar rechts.",
            "één naar rechts": "dat is × 10. 1000 heeft drie nullen, dus drie plaatsen.",
            "twee naar rechts": "dat is × 100. Bij 1000 zijn het er drie."
          },
          w: "1000 heeft drie nullen: drie plaatsen; × is naar rechts.",
          meer: "0,53 → 5,3 → 53 → 530: drie stapjes naar rechts." },

        { t: "mc", q: "Welke omrekening klopt?",
          o: ["0,005 kg = 5 g", "0,005 kg = 500 g", "0,005 kg = 0,000005 g", "0,005 kg = 50 g"],
          a: "0,005 kg = 5 g",
          fout: {
            "0,005 kg = 500 g": "dan ben je van 0,5 kg uitgegaan. 0,005 × 1000 = 5.",
            "0,005 kg = 0,000005 g": "verkeerde kant op. Naar gram (kleiner) hoort een groter getal.",
            "0,005 kg = 50 g": "dat is 0,05 kg. Tel de plaatsen: 0,005 → 0,05 → 0,5 → 5."
          },
          w: "0,005 × 1000 = 5 g.",
          meer: "5 g is ongeveer een suikerklontje. Zulke ijkpunten helpen je om rare antwoorden te zien." },

        { t: "mc", q: "Een lampje heeft een stroomsterkte van <b>250 mA</b>. Hoeveel ampère is dat?",
          o: ["0,250 A", "250 000 A", "2,5 A", "25 A"],
          a: "0,250 A",
          fout: {
            "250 000 A": "dat is De Kommaschuiver die de verkeerde kant op schuift. Van mA naar A is klein naar groot: ÷ 1000. 250 000 A is meer dan een bliksemschicht.",
            "2,5 A": "je hebt maar twee plaatsen geschoven (÷ 100). Bij 1000 zijn het er drie.",
            "25 A": "dat is ÷ 10. 250 ÷ 1000 = 0,250."
          },
          w: "mA → A: ÷ 1000, dus 250 mA = 0,250 A.",
          meer: "Check: A is de grote eenheid, dus het getal moet klein worden. 0,250 is kleiner dan 250. Klopt." },

        { t: "bouw", q: "Reken om: <b>7,11 kg = ___ g</b> (alleen het getal)",
          a: "7110",
          w: "× 1000: komma drie plaatsen naar rechts.",
          meer: "7,11 → 71,1 → 711 → 7110. Het getal werd groter, dat hoort bij kg → g." },

        { t: "bouw", q: "Reken om: <b>540 mL = ___ L</b> (alleen het getal)",
          a: "0,54",
          w: "÷ 1000: komma drie plaatsen naar links.",
          meer: "540 → 54 → 5,4 → 0,54. Ruim een halve liter, dat past bij een half pak melk." },

        { t: "bouw", q: "Reken om: <b>0,35 A = ___ mA</b> (alleen het getal)",
          a: "350",
          w: "A → mA: × 1000, komma drie naar rechts.",
          meer: "0,35 → 3,5 → 35 → 350. Kleinere eenheid, dus groter getal." },

        { t: "bouw", q: "Reken om: <b>4500 mV = ___ V</b> (alleen het getal)",
          a: "4,5",
          w: "mV → V: ÷ 1000, komma drie naar links.",
          meer: "4500 → 450,0 → 45,00 → 4,500 = 4,5 V. Dat is ongeveer drie batterijen van 1,5 V in serie." },

        { t: "mc", q: "Iemand schrijft: '67 mL = 67 000 L'. Hoe zie je zonder rekenen dat het fout is?",
          o: ["67 mL is een slokje, 67 000 L een zwembad", "mL en L kun je niet omrekenen", "Je mag nooit met 1000 vermenigvuldigen", "Je ziet het niet, je moet het narekenen"],
          a: "67 mL is een slokje, 67 000 L een zwembad",
          fout: {
            "mL en L kun je niet omrekenen": "dat kan juist prima: 1 L = 1000 mL.",
            "Je mag nooit met 1000 vermenigvuldigen": "dat mag wel, bij groot → klein. Hier ging het van klein naar groot, dus delen.",
            "Je ziet het niet, je moet het narekenen": "de uitkomstcheck werkt sneller: past het getal bij wat je je voorstelt? Een slokje is geen zwembad."
          },
          w: "Naar een grotere eenheid hoort een kleiner getal: 67 mL = 0,067 L.",
          meer: "De redelijkheidscheck is vaak sneller dan narekenen. Stel je de hoeveelheid even voor." },

        { t: "vb", opgave: "Uitgewerkt voorbeeld: een batterij levert 1,5 V. Hoeveel mV is dat?",
          stappen: [
            { toon: "van V naar mV", uitleg: "V is de grote eenheid, mV de kleine." },
            { toon: "groot → klein: × 1000", uitleg: "Je hebt veel millivolts nodig voor één volt." },
            { toon: "1,5 → 15 → 150 → 1500", uitleg: "Komma drie plaatsen naar rechts; vul aan met nullen." },
            { toon: "1,5 V = 1500 mV", uitleg: "Check: het getal werd groter. Klopt bij een kleinere eenheid." }
          ],
          waarom: { q: "Waarom wordt het getal groter?",
            o: ["Er gaan veel kleine mV in één V", "Omrekenen geeft altijd een groter getal", "Omdat mV een grotere eenheid is dan V"],
            a: "Er gaan veel kleine mV in één V" },
          fout: {
            "Omrekenen geeft altijd een groter getal": "van mV naar V wordt het getal juist kleiner: 1500 mV = 1,5 V. Het hangt af van de richting.",
            "Omdat mV een grotere eenheid is dan V": "andersom: 'milli' is een duizendste, dus mV is veel kleiner dan V."
          },
          w: "Een kleinere eenheid past vaker in hetzelfde: groter getal.",
          meer: "Zelfde regel als 1,5 kg = 1500 g en 1,5 L = 1500 mL." },

        { t: "mc", q: "Bij het winkelen koop je met je moeder een fles shampoo van <b>0,4 L</b>. Hoeveel mL is dat?",
          o: ["400 mL", "40 mL", "4000 mL", "0,0004 mL"],
          a: "400 mL",
          fout: {
            "40 mL": "dat is een piepklein reisflesje. 0,4 × 1000 = 400.",
            "4000 mL": "dat is 4 liter, een hele emmer. Je hebt een plaats te veel geschoven.",
            "0,0004 mL": "verkeerde kant op. L → mL is groot naar klein, dus het getal wordt groter."
          },
          w: "0,4 × 1000 = 400 mL.",
          meer: "Op veel flessen staat het allebei: 0,4 L en 400 mL. Kijk er de volgende keer eens naar in de winkel." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Nu de bruggen tussen de eenheden. Liter gebruik je alleen voor <b>vloeistoffen</b>; voor andere dingen dm³ of cm³. Ze zijn wel precies even groot: <b>1 L = 1 dm³</b> en <b>1 mL = 1 cm³</b>.",
        "<b>1 dm³ = 1000 cm³</b>: een kubus van 10 × 10 × 10 cm bevat 1000 blokjes van 1 cm³. Niet 10, want volume gaat in drie richtingen.",
        "De middelste brug is goud waard: een maatcilinder leest <b>mL</b>, dichtheid gaat in <b>g/cm³</b>, en 26 mL ís 26 cm³. Niets omrekenen.",
        "Vergelijken? Zet eerst alles in <b>dezelfde eenheid</b>. Welke stroom is groter, 0,5 A of 450 mA? 0,5 A = 500 mA, dus 0,5 A wint. Soms moet je twee dingen omrekenen voor je kunt delen, zoals bij de boomstam van 13,65 kg en 21 dm³."
      ],
      regel: "1 mL = 1 cm³ (gratis), 1 L = 1 dm³ = 1000 cm³; vergelijk pas als de eenheden gelijk zijn.",
      voorbeelden: [
        { en: "26 mL = 26 cm³", nl: "zelfde inhoud, ander woord", let: "<b>let op</b>: niets omrekenen." },
        { en: "21 dm³ = 21 000 cm³", nl: "dm³ is groot, cm³ klein: × 1000", let: "<b>let op</b>: niet × 10." },
        { en: "0,5 A tegen 450 mA", nl: "0,5 A = 500 mA, dus 0,5 A is groter", let: "<b>let op</b>: eerst dezelfde eenheid." }
      ],
      vragen: [
        { t: "mc", q: "Hoeveel cm³ is <b>1 mL</b>?",
          o: ["1 cm³", "10 cm³", "100 cm³", "1000 cm³"],
          a: "1 cm³",
          fout: {
            "10 cm³": "nee, ze zijn precies gelijk: 1 mL = 1 cm³.",
            "100 cm³": "ze zijn precies even groot. Een mL is een kubusje van 1 cm bij 1 cm bij 1 cm.",
            "1000 cm³": "dat is 1 dm³, ofwel 1 liter. Niet 1 mL."
          },
          w: "1 mL = 1 cm³.",
          meer: "De handigste brug van het hoofdstuk: wat de maatcilinder in mL zegt, mag je meteen als cm³ gebruiken." },

        { t: "mc", q: "Hoeveel cm³ gaat er in <b>1 dm³</b>?",
          o: ["1000 cm³", "10 cm³", "100 cm³", "1 cm³"],
          a: "1000 cm³",
          fout: {
            "10 cm³": "1 dm = 10 cm, ja. Maar volume gaat in drie richtingen: 10 × 10 × 10 = 1000.",
            "100 cm³": "dat zou kloppen voor een oppervlakte (10 × 10). Volume heeft een derde richting.",
            "1 cm³": "een kubus van 1 dm is veel groter dan een kubus van 1 cm."
          },
          w: "10 × 10 × 10 = 1000 cm³.",
          meer: "Een pak melk van 1 L is 1 dm³: er passen 1000 suikerklontjes van 1 cm³ in." },

        { t: "bouw", q: "Een maatcilinder geeft <b>45 mL</b>. Hoeveel cm³ is dat? (alleen het getal)",
          a: "45",
          w: "1 mL = 1 cm³: het getal blijft 45.",
          meer: "Je mag dit getal meteen invullen in ρ = m / V." },

        { t: "bouw", q: "Reken om: <b>21 dm³ = ___ cm³</b> (alleen het getal)",
          a: "21000",
          w: "dm³ → cm³: × 1000.",
          meer: "21 × 1000 = 21 000 cm³. Nodig als je de dichtheid in g/cm³ wilt." },

        { t: "mc", q: "Een boomstam heeft een massa van 13,65 kg en een volume van 21 dm³. Wat doe je <b>eerst</b> om de dichtheid in g/cm³ te vinden?",
          o: ["Allebei omrekenen: 13 650 g en 21 000 cm³", "Meteen 13,65 delen door 21", "Alleen de massa omrekenen naar gram", "De dichtheid opzoeken in tabel 1"],
          a: "Allebei omrekenen: 13 650 g en 21 000 cm³",
          fout: {
            "Meteen 13,65 delen door 21": "dan krijg je 0,65, toevallig het goede getal, maar in kg/dm³. Bij andere eenheden (kg en cm³) gaat het mis.",
            "Alleen de massa omrekenen naar gram": "dan deel je gram door dm³: 650 'g/dm³'. Dat is geen g/cm³. Allebei of geen van beide.",
            "De dichtheid opzoeken in tabel 1": "je weet nog niet welke stof het is. Eerst uitrekenen, daarna pas opzoeken."
          },
          w: "Eerst allebei naar g en cm³, dan delen: 13 650 ÷ 21 000 = 0,65 g/cm³.",
          meer: "Zorg dat de eenheden passen voordat je rekent. Dan klopt niet alleen je getal, maar ook je eenheid." },

        { t: "mc", q: "Welke stroomsterkte is het <b>grootst</b>?",
          o: ["0,5 A", "450 mA", "50 mA", "0,05 A"],
          a: "0,5 A",
          fout: {
            "450 mA": "450 lijkt een groot getal, maar het is in mA. 0,5 A = 500 mA, en dat is meer dan 450 mA.",
            "50 mA": "50 mA = 0,05 A, tien keer zo klein als 0,5 A.",
            "0,05 A": "0,05 A = 50 mA. Dat is tien keer zo klein als 0,5 A."
          },
          w: "Alles in mA: 500, 450, 50 en 50. 0,5 A wint.",
          meer: "Vergelijk nooit getallen met verschillende eenheden. Eerst omrekenen naar één eenheid." },

        { t: "mc", q: "Jamie schrijft: '0,2 A = 0,0002 mA'. Wat is het goede antwoord?",
          o: ["200 mA", "0,0002 mA", "20 mA", "2000 mA"],
          a: "200 mA",
          fout: {
            "0,0002 mA": "dat is wat Jamie schreef: de verkeerde kant op geschoven. A → mA is groot naar klein: × 1000.",
            "20 mA": "je hebt twee plaatsen geschoven (× 100). Het moeten er drie zijn.",
            "2000 mA": "je hebt vier plaatsen geschoven. 0,2 → 2 → 20 → 200."
          },
          w: "0,2 × 1000 = 200 mA.",
          meer: "Uitkomstcheck: mA is de kleine eenheid, dus het getal moet groter worden. 0,0002 is juist kleiner." },

        { t: "sequence", q: "Zet de stappen van het omrekenen in de goede volgorde.",
          stappen: ["Kijk van welke eenheid naar welke eenheid", "Bepaal: groot → klein of klein → groot", "Kies × 1000 of ÷ 1000", "Schuif de komma drie plaatsen", "Check: past het getal bij de richting?"],
          w: "Eenheden, richting, × of ÷, komma schuiven, check.",
          meer: "De laatste stap vergeten mensen het vaakst. Maar juist die vangt de 250 000 A-fout." },

        { t: "mc", q: "Wat is groter: <b>9 V</b> of <b>9000 mV</b>?",
          o: ["even groot", "9000 mV is groter", "9 V is groter", "dat kun je niet vergelijken"],
          a: "even groot",
          fout: {
            "9000 mV is groter": "9000 is een groter getal, maar mV is een duizend keer kleinere eenheid. 9000 mV = 9 V.",
            "9 V is groter": "volt is de grotere eenheid, maar er staan duizend keer zoveel mV. 9 × 1000 = 9000.",
            "dat kun je niet vergelijken": "dat kan wel: reken eerst om naar dezelfde eenheid. 9 V = 9000 mV."
          },
          w: "9 V × 1000 = 9000 mV: precies even groot.",
          meer: "Groter getal betekent niet meer, als de eenheden verschillen. Eerst gelijkmaken." },

        { t: "open", q: "Iemand schrijft '250 mA = 250 000 A'. Leg uit hoe je met de uitkomstcheck ziet dat dit fout is, en wat het goede antwoord is.",
          punten: 2,
          modelantwoord: "Ampère is een grotere eenheid dan milliampère. Van een kleine eenheid naar een grote moet het getal kleiner worden, dus je deelt door 1000. 250 000 is juist groter dan 250, dus het kan niet kloppen. Het goede antwoord is 250 ÷ 1000 = 0,250 A.",
          sleutelwoorden: [
            { moet: ["kleiner"], syn: ["delen", "÷", "gedeeld"] },
            { moet: ["0,25"], syn: ["0,250"] }
          ],
          rubric: ["A is een grotere eenheid dan mA, dus het getal moet kleiner worden (÷ 1000)", "Het goede antwoord is 0,250 A (of 0,25 A)"],
          w: "Naar de grote eenheid hoort een klein getal: 250 mA = 0,250 A.",
          meer: "Zo versla je De Kommaschuiver: na elke omrekening even vragen of het getal de goede kant op ging." }
      ]
    }
  ]
};



/* ===== onderwerpen (deel C) ===== */

/* ============ 1. stroomkring (4.1.1, 4.1.2) ============ */
window.__TOPICS["stroomkring"] = {
  id: "stroomkring", emoji: "💡", titel: "H4 · De gesloten stroomkring",
  kort: "Een lampje brandt alleen als de lading een rondje kan maken: van de ene pool, door het lampje, naar de andere pool.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Een lampje brandt alleen als er een elektrische stroom doorheen gaat. Daarvoor heb je een <b>gesloten stroomkring</b> nodig: van de ene pool van de batterij via een snoer naar het lampje, <b>door</b> het lampje heen, en via een <b>tweede snoer</b> terug naar de <b>andere</b> pool.",
        "Een stroomkring is dus een <b>rondje zonder onderbreking</b>. Zit er ergens een gat, dan is de kring <b>open</b> en brandt er niets.",
        "De onderdelen: een <b>spanningsbron</b> (de batterij), <b>snoeren</b>, een apparaat (bijvoorbeeld een <b>lampje</b>) en vaak een <b>schakelaar</b> om de stroom aan en uit te zetten.",
        "Apparaten die veel energie gebruiken (stofzuiger, wasmachine) sluit je aan op het <b>lichtnet</b>: het stopcontact. Veel kleine apparaten werken op <b>batterijen</b> of <b>accu's</b>."
      ],
      regel: "Het lampje brandt alleen als de lading een rondje kan maken: van de ene pool, door het lampje, naar de andere pool.",
      voorbeelden: [
        { en: "pluspool → snoer → lampje → snoer → minpool", nl: "gesloten kring: het lampje brandt", let: "<b>let op</b>: het tweede snoer moet naar de <b>andere</b> pool." },
        { en: "één snoer los", nl: "open kring: het lampje is uit", let: "<b>let op</b>: één gat is genoeg om alles stil te zetten." },
        { en: "wasmachine en zaklamp", nl: "wasmachine op het lichtnet, zaklamp op batterijen", let: "<b>let op</b>: veel energie nodig = lichtnet." }
      ],
      vragen: [
        { t: "mc", q: "Wanneer brandt een lampje in een stroomkring?",
          o: ["als de kring een rondje is zonder gat", "als er één snoer naar de pluspool loopt", "als de batterij groot genoeg is", "als de schakelaar in de kring open staat"],
          a: "als de kring een rondje is zonder gat",
          fout: {
            "als er één snoer naar de pluspool loopt": "Met één snoer kan de lading het lampje wel in, maar niet verder. Er is geen weg terug naar de andere pool.",
            "als de batterij groot genoeg is": "Ook een enorme accu laat geen lampje branden als de kring een gat heeft. Het rondje is het belangrijkst.",
            "als de schakelaar in de kring open staat": "Open betekent: lucht tussen de contactjes, dus een gat. Dan brandt het lampje juist niet."
          },
          w: "Alleen in een gesloten kring, een rondje zonder onderbreking, kan de lading bewegen.",
          meer: "Volg het rondje met je vinger: pool, snoer, lampje, snoer, andere pool. Kom je zonder gat terug? Dan brandt hij." },
        { t: "mc", q: "Welk onderdeel van de stroomkring zorgt voor de 'duw' die de lading laat bewegen?",
          o: ["de batterij", "het lampje", "de schakelaar", "het snoer"],
          a: "de batterij",
          fout: {
            "het lampje": "Het lampje gebruikt de duw juist: het zet energie om in licht en warmte.",
            "de schakelaar": "De schakelaar opent of sluit de kring, maar duwt niets. Zonder batterij doet hij niets.",
            "het snoer": "Het snoer is de weg waarover de lading gaat. Een weg duwt niet."
          },
          w: "De batterij is de spanningsbron: hij geeft de duw.",
          meer: "In het model is de batterij een pomp die een drukverschil maakt, net als een ballon die steeds opnieuw wordt opgepompt." },
        { t: "gap", q: "Een stroomkring zonder onderbreking heet een ___ stroomkring.", a: "gesloten", soepel: true,
          w: "Gesloten = rondje zonder gat. Met een gat heet hij open.",
          meer: "Denk aan een deur: dicht is gesloten, je kunt er rondlopen; een open plek is een gat in de kring." },
        { t: "mc", q: "Iemand verbindt één snoer van de pluspool naar het lampje. Het andere aansluitpunt van het lampje zit nergens aan. Brandt het lampje?",
          o: ["nee, de lading kan niet terug", "ja, de stroom komt het lampje in", "ja, maar het lampje brandt zwak", "alleen als de batterij nieuw is"],
          a: "nee, de lading kan niet terug",
          fout: {
            "ja, de stroom komt het lampje in": "Dat is De Eéndraad. Een lampje heeft twee aansluitingen: erin én eruit. Zonder weg terug beweegt er niets.",
            "ja, maar het lampje brandt zwak": "Zwak branden kan alleen als er stroom loopt. Zonder rondje loopt er 0 A, dus helemaal niets.",
            "alleen als de batterij nieuw is": "Een nieuwe batterij helpt niet. Het probleem is het gat in de kring, niet de batterij."
          },
          w: "Je hebt een tweede snoer nodig van het lampje naar de andere pool.",
          meer: "Een lampje heeft twee aansluitingen: onderaan en aan de zijkant van de fitting. De lading gaat er aan de ene kant in en aan de andere kant uit." },
        { t: "sleep", opgave: "Sleep elk onderdeel naar wat het doet in de stroomkring.",
          chips: [ { t: "batterij", bak: "b" }, { t: "accu", bak: "b" }, { t: "lampje", bak: "a" }, { t: "zoemer", bak: "a" }, { t: "motortje", bak: "a" }, { t: "snoer", bak: "v" }, { t: "schakelaar", bak: "v" } ],
          bakjes: [ { id: "b", label: "Spanningsbron", som: "geeft de duw" }, { id: "a", label: "Apparaat", som: "zet energie om (licht, geluid, beweging)" }, { id: "v", label: "Verbinding", som: "laat de lading door of onderbreekt hem" } ],
          w: "Bron duwt, apparaat zet energie om, snoer en schakelaar verbinden (of onderbreken).",
          meer: "Een accu is een oplaadbare batterij, dus ook een spanningsbron." },
        { t: "mc", q: "Storm en haar moeder kopen nieuwe kleren en een strijkijzer. Waar werkt het strijkijzer op?",
          o: ["op het lichtnet", "op een batterij", "op een zonnecel", "op een kleine accu"],
          a: "op het lichtnet",
          fout: {
            "op een batterij": "Een strijkijzer wordt heet en gebruikt veel energie. Daar is een batterij veel te zwak voor.",
            "op een zonnecel": "Een strijkijzer heeft een stekker voor het stopcontact. Een zonnecel zit er niet aan.",
            "op een kleine accu": "Een kleine accu is snel leeg bij zo'n grote verbruiker. Apparaten die veel energie gebruiken gaan op het lichtnet."
          },
          w: "Veel energie nodig (warmte maken) = lichtnet, het stopcontact.",
          meer: "Stofzuiger, wasmachine en strijkijzer: lichtnet. Zaklamp, afstandsbediening en rekenmachine: batterijen." },
        { t: "mc", q: "Wat doet een schakelaar in een stroomkring?",
          o: ["hij opent of sluit de kring", "hij slaat stroom op", "hij maakt nieuwe lading", "hij maakt het lampje feller"],
          a: "hij opent of sluit de kring",
          fout: {
            "hij slaat stroom op": "Opslaan doet een batterij of accu. Een schakelaar is alleen een 'brug' die open of dicht kan.",
            "hij maakt nieuwe lading": "Lading wordt nergens gemaakt: hij zit al in de draden. De schakelaar laat hem alleen wel of niet bewegen.",
            "hij maakt het lampje feller": "Een gewone schakelaar kent alleen aan en uit. Feller of zwakker hangt van de batterij en de kring af."
          },
          w: "Dicht = kring gesloten, lampje aan. Open = gat, lampje uit.",
          meer: "Binnenin komen twee geleidende stukjes tegen elkaar (aan) of er komt lucht tussen (uit)." },
        { t: "sequence", q: "Zet de route van de lading door een gesloten stroomkring in de goede volgorde.",
          stappen: ["pluspool van de batterij", "eerste snoer", "lampje", "tweede snoer", "minpool van de batterij"],
          w: "Van de ene pool, door het lampje, terug naar de andere pool.",
          meer: "Daarna begint het rondje gewoon opnieuw: de batterij duwt de lading steeds weer rond." },
        { t: "bouw", q: "Je hebt een batterij en één lampje, zonder schakelaar. Hoeveel snoeren heb je minimaal nodig om het lampje te laten branden? (alleen het getal)", a: "2",
          w: "Eén snoer van de ene pool naar het lampje, één snoer van het lampje naar de andere pool.",
          meer: "Met één snoer lukt het nooit: de lading kan het lampje dan niet uit. Dat is De Eéndraad." },
        { t: "vb", opgave: "Uitgewerkt voorbeeld: een batterij, een snoer van de pluspool naar het lampje en een snoer van het lampje via een schakelaar naar de minpool. De schakelaar staat open. Brandt het lampje?",
          stappen: [
            { toon: "Stap 1: is er een spanningsbron?", uitleg: "Ja, de batterij geeft de duw." },
            { toon: "Stap 2: volg het rondje", uitleg: "Pluspool, snoer, lampje, snoer, schakelaar, minpool." },
            { toon: "Stap 3: zoek een gat", uitleg: "De schakelaar staat open: daar zit lucht tussen de contactjes." },
            { toon: "Conclusie: het lampje brandt niet", uitleg: "Eén gat maakt de hele kring open." }
          ],
          waarom: { q: "Waarom brandt het lampje niet?",
            o: ["er zit lucht in de schakelaar", "de batterij is te zwak", "de schakelaar zit te ver weg"],
            a: "er zit lucht in de schakelaar" },
          fout: {
            "de batterij is te zwak": "Over de batterij weet je niets slechts. Het gat in de schakelaar is genoeg om alles stil te zetten.",
            "de schakelaar zit te ver weg": "Afstand maakt niet uit: een schakelaar werkt op elke plek in het rondje."
          },
          w: "Een open schakelaar is een gat met lucht, en lucht laat geen stroom door.",
          meer: "Doe de schakelaar dicht en het rondje is compleet: dan brandt het lampje meteen." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Wat beweegt er eigenlijk door de snoeren? Dat 'iets' heet <b>lading</b>. Een elektrische <b>stroom</b> is <b>bewegende lading</b>.",
        "De lading zit <b>altijd</b> al in de snoeren en het lampje, ook als de kring open is. Open je de kring, dan valt alleen de <b>beweging</b> stil. Denk aan bolletjes in een buis: ze zijn er altijd, de batterij zet ze in beweging.",
        "Daarom gaat het lampje meteen aan als je de schakelaar dichtdoet: alle bolletjes gaan <b>overal tegelijk</b> lopen. Er hoeft niets eerst van de batterij naar het lampje te reizen.",
        "Ons model: de batterij is een <b>pomp</b> die een drukverschil maakt, zoals een ballon die steeds opnieuw wordt opgepompt. Die druk duwt de bolletjes rond. Het boek vergelijkt het ook met wind: de beweging zie je niet, het effect wel (molens draaien, het lampje brandt).",
        "De schakelaar: <b>dicht</b> = twee geleidende delen tegen elkaar, kring gesloten. <b>Open</b> = er zit <b>lucht</b> tussen, en lucht laat geen stroom door."
      ],
      regel: "Stroom is bewegende lading: de lading is er altijd, de batterij zet hem in beweging, en een gat in de kring stopt de beweging.",
      voorbeelden: [
        { en: "schakelaar dicht", nl: "alle lading in de kring gaat tegelijk bewegen", let: "<b>let op</b>: er reist niets 'vooruit' naar het lampje." },
        { en: "schakelaar open", nl: "de lading blijft in de draden, maar staat stil", let: "<b>let op</b>: de lading is niet weg." },
        { en: "wind en molen", nl: "je ziet de wind niet, wel dat de molen draait", let: "<b>let op</b>: zo zie je de lading niet, wel het lampje." }
      ],
      vragen: [
        { t: "mc", q: "Wat is een elektrische stroom?",
          o: ["bewegende lading", "opgebruikte lading", "energie in de batterij", "de duw van de batterij"],
          a: "bewegende lading",
          fout: {
            "opgebruikte lading": "Lading wordt niet opgebruikt. Hij gaat rond en komt terug bij de batterij.",
            "energie in de batterij": "In de batterij zit energie, maar stroom is iets dat beweegt door de hele kring: lading.",
            "de duw van de batterij": "De duw is de spanning. De stroom is wat er door die duw gaat bewegen: de lading."
          },
          w: "Stroom = lading die beweegt.",
          meer: "Het woord zegt het al: iets stroomt. Dat iets is lading." },
        { t: "mc", q: "Je zet de schakelaar uit. Wat gebeurt er met de lading in de snoeren?",
          o: ["hij blijft, maar beweegt niet", "hij loopt terug de batterij in", "hij lekt weg door de lucht", "hij verdwijnt uit het snoer"],
          a: "hij blijft, maar beweegt niet",
          fout: {
            "hij loopt terug de batterij in": "Er gaat niets terug. De lading blijft waar hij is en staat stil, omdat de kring een gat heeft.",
            "hij lekt weg door de lucht": "Lucht is een isolator: daar gaat de lading juist niet doorheen.",
            "hij verdwijnt uit het snoer": "Lading verdwijnt niet. Doe je de schakelaar weer aan, dan gaat dezelfde lading meteen weer rond."
          },
          w: "De lading is er altijd; een open kring stopt alleen de beweging.",
          meer: "Bolletjes in een buis met een dop erop: ze blijven liggen, maar rollen niet meer rond." },
        { t: "mc", q: "Bij de avondtraining van Blauw Geel gaan alle lampen langs het veld aan met één schakelaar, terwijl de kabels honderden meters lang zijn. Waarom branden ze meteen?",
          o: ["de lading gaat overal tegelijk bewegen", "de lading reist razendsnel vanaf de kast", "elke lamp heeft een eigen voorraad lading", "de schakelaar stuurt een signaal vooruit"],
          a: "de lading gaat overal tegelijk bewegen",
          fout: {
            "de lading reist razendsnel vanaf de kast": "Er hoeft niets eerst te reizen. De lading zit al in de hele kabel en gaat in één keer overal lopen.",
            "elke lamp heeft een eigen voorraad lading": "Een lamp heeft geen voorraad die opraakt. De lading in de lamp hoort bij het rondje en gaat er gewoon doorheen.",
            "de schakelaar stuurt een signaal vooruit": "De schakelaar sluit alleen het rondje. Dan duwt de spanningsbron alle lading tegelijk rond."
          },
          w: "De lading zit al in de draden; sluit je de kring, dan beweegt alles tegelijk.",
          meer: "Denk aan een fietsketting: trap je, dan beweegt de hele ketting tegelijk, ook het stukje bij het achterwiel." },
        { t: "gap", q: "Een elektrische stroom is bewegende ___.", a: "lading", soepel: true,
          w: "Stroom = bewegende lading.",
          meer: "Lading is het 'iets' dat rondgaat. Zonder beweging is er wel lading, maar geen stroom." },
        { t: "mc", q: "Ruben zegt: 'Uit de plus én uit de min komt stroom. Die botst in het lampje en dan geeft hij licht.' Je zet een stroommeter in de plusdraad en een in de mindraad. Wat zie je?",
          o: ["beide 0,20 A, in één richting rond", "beide 0,20 A, recht tegen elkaar in", "plus 0,20 A en min 0 A", "plus 0,10 A en min 0,10 A"],
          a: "beide 0,20 A, in één richting rond",
          fout: {
            "beide 0,20 A, recht tegen elkaar in": "Dat is De Botsers. De meters laten zien dat de lading één kant op rondgaat: wat in de plusdraad naar het lampje gaat, gaat in de mindraad terug.",
            "plus 0,20 A en min 0 A": "Dan zou er lading in het lampje ophopen. De meter in de mindraad wijst net zoveel aan: 0,20 A.",
            "plus 0,10 A en min 0,10 A": "De stroom wordt niet verdeeld over twee draden die naar elkaar toe stromen. Beide meters wijzen de hele stroom aan: 0,20 A."
          },
          w: "De lading gaat één kant op rond; in elke draad van het rondje is de stroom even groot.",
          meer: "Er botst niets. Het lampje geeft licht omdat de lading er energie afgeeft, niet omdat twee stromen tegen elkaar knallen." },
        { t: "mc", q: "Wat zit er tussen de contactjes van een schakelaar die uit staat?",
          o: ["lucht", "plastic", "koper", "lading"],
          a: "lucht",
          fout: {
            "plastic": "Het plastic zit om de schakelaar heen. Tussen de contactjes zit bij 'uit' gewoon lucht.",
            "koper": "Koper is een geleider. Zat er koper tussen, dan was de kring dicht en brandde het lampje.",
            "lading": "Lading zit in de geleiders. Het punt is juist dat er een gat met lucht is waar de lading niet doorheen kan."
          },
          w: "Uit = lucht ertussen. Lucht is een isolator, dus de kring is open.",
          meer: "Daaruit volgt meteen: lucht laat geen stroom door. Anders zou een lamp nooit uitgaan." },
        { t: "sleep", opgave: "Is de kring gesloten (het lampje brandt) of open (het lampje brandt niet)?",
          chips: [ { t: "schakelaar dicht, alle snoeren vast", bak: "g" }, { t: "één snoer zit los", bak: "o" }, { t: "schakelaar staat open", bak: "o" }, { t: "beide snoeren aan de pluspool", bak: "o" }, { t: "lampje uit de fitting gedraaid", bak: "o" }, { t: "pluspool, lampje, minpool, zonder gat", bak: "g" } ],
          bakjes: [ { id: "g", label: "Gesloten", som: "het lampje brandt" }, { id: "o", label: "Open of fout", som: "het lampje brandt niet" } ],
          w: "Alleen een rondje van de ene pool naar de andere, zonder gat, laat het lampje branden.",
          meer: "Twee snoeren aan dezelfde pool is geen rondje tussen plus en min: er is geen drukverschil over het lampje." },
        { t: "vb", opgave: "Uitgewerkt voorbeeld: een zaklamp gaat niet aan. Je hebt er net een nieuwe batterij in gedaan. Zoek de fout.",
          stappen: [
            { toon: "Stap 1: spanningsbron?", uitleg: "Nieuwe batterij, dus die duwt prima." },
            { toon: "Stap 2: volg het rondje", uitleg: "Batterij, metalen strip, lampje, schakelaar, terug naar de batterij." },
            { toon: "Stap 3: zoek het gat", uitleg: "Het metalen strookje in de schakelaar raakt het contact niet meer: er zit lucht tussen." },
            { toon: "Conclusie", uitleg: "De kring is open. Buig het strookje terug, dan is het rondje dicht." }
          ],
          waarom: { q: "Waarom hielp de nieuwe batterij niet?",
            o: ["de kring heeft nog steeds een gat", "nieuwe batterijen moeten eerst laden", "het lampje heeft de lading al op"],
            a: "de kring heeft nog steeds een gat" },
          fout: {
            "nieuwe batterijen moeten eerst laden": "Een gewone nieuwe batterij werkt meteen. Het gat in de kring is het probleem.",
            "het lampje heeft de lading al op": "Dat is De Stroomvreter. Een lampje maakt geen lading op: de lading gaat rond en komt terug."
          },
          w: "Een sterke duw helpt niet als het rondje een gat heeft.",
          meer: "Bij storing eerst het rondje volgen, pas daarna aan de batterij denken." },
        { t: "mc", q: "Waarom zit een stofzuiger op het lichtnet en niet op een paar batterijen?",
          o: ["hij gebruikt veel energie", "batterijen geven geen stroom", "het lichtnet is minder gevaarlijk", "een stekker past niet op een batterij"],
          a: "hij gebruikt veel energie",
          fout: {
            "batterijen geven geen stroom": "Batterijen geven wel stroom: een zaklamp brandt er prima op. Ze zijn alleen te snel leeg voor een stofzuiger.",
            "het lichtnet is minder gevaarlijk": "Andersom: 230 V uit het stopcontact is juist gevaarlijk. Het lichtnet kiest je omdat het veel energie kan leveren.",
            "een stekker past niet op een batterij": "Dat is een gevolg, geen reden. Je kiest het lichtnet omdat het apparaat veel energie nodig heeft."
          },
          w: "Grote energieverbruikers gaan op het lichtnet.",
          meer: "Er bestaan ook accustofzuigers, maar die zijn kleiner en moeten vaak aan de lader." },
        { t: "mc", q: "Het boek vergelijkt bewegende lading met wind. Wat is de overeenkomst?",
          o: ["je ziet de beweging niet, wel het effect", "lading waait de draad uit naar buiten", "lading beweegt alleen als het waait", "je ziet de lading net als wolken"],
          a: "je ziet de beweging niet, wel het effect",
          fout: {
            "lading waait de draad uit naar buiten": "De lading blijft in de geleiders. De wind is alleen een vergelijking voor iets wat je niet ziet bewegen.",
            "lading beweegt alleen als het waait": "Het weer heeft er niets mee te maken. De batterij duwt de lading, binnen of buiten.",
            "je ziet de lading net als wolken": "Lading zie je juist niet. Je ziet alleen het effect: het lampje dat brandt."
          },
          w: "Wind zie je niet, draaiende molens wel. Lading zie je niet, een brandend lampje wel.",
          meer: "Daarom gebruiken we een model (bolletjes, pomp) om ons voor te stellen wat er gebeurt." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "<b>De Eéndraad</b> denkt: 'één draad naar het lampje is genoeg'. Kijk in het lampje: er zijn <b>twee aansluitingen</b> (de onderkant en de zijkant van de fitting) met een gloeidraadje ertussen. De lading moet erin én eruit, en daarna door naar de andere pool. Met één draad kan hij nergens heen.",
        "<b>De Botsers</b> denken: 'uit + en uit − komt stroom die in het lampje botst'. Zet een stroommeter in de plusdraad en een in de mindraad: allebei bijvoorbeeld <b>0,20 A</b>, en de lading gaat één kant op rond. Er botst niets.",
        "<b>De Stroomvreter</b> (die verslaan we bij stroomsterkte) denkt dat het lampje stroom opmaakt. Nee: het lampje zet <b>energie</b> om in licht en warmte. De <b>lading</b> gaat er gewoon doorheen en komt terug bij de batterij. Kernzin: <b>energie wordt omgezet, lading niet</b>.",
        "Twee snoeren aan <b>dezelfde</b> pool helpt niet: dan is er geen drukverschil over het lampje. Je hebt aan de ene kant de ene pool en aan de andere kant de <b>andere</b> pool nodig."
      ],
      regel: "Volg de lading met je vinger: van de ene pool, door het lampje, naar de andere pool. Lukt dat zonder gat, dan brandt het, en er gaat geen lading verloren.",
      voorbeelden: [
        { en: "één draad aan het lampje", nl: "brandt niet: de lading kan er niet uit", let: "<b>let op</b>: een lampje heeft twee aansluitingen." },
        { en: "meter in plusdraad 0,20 A, in mindraad 0,20 A", nl: "één stroom die rondgaat", let: "<b>let op</b>: geen twee stromen die botsen." },
        { en: "lege batterij", nl: "de energie is op, de lading niet", let: "<b>let op</b>: energie wordt omgezet, lading niet." }
      ],
      vragen: [
        { t: "mc", q: "Lotte houdt de pluspool van een batterij met één draad tegen de onderkant van een lampje. 'De stroom gaat toch het lampje in?' zegt ze. Wat is het beste antwoord?",
          o: ["de lading kan er aan de andere kant niet uit", "de draad is te kort voor de stroom", "het lampje heeft meer spanning nodig", "de stroom gaat erin, maar te langzaam"],
          a: "de lading kan er aan de andere kant niet uit",
          fout: {
            "de draad is te kort voor de stroom": "Lengte maakt niet uit: ook een draad van 10 cm werkt, als het rondje dicht is.",
            "het lampje heeft meer spanning nodig": "Met dezelfde batterij en twee draden brandt hij wel. Het ligt dus aan het ontbrekende rondje.",
            "de stroom gaat erin, maar te langzaam": "Er gaat helemaal niets in: zonder rondje is de stroom 0 A. Dat is De Eéndraad."
          },
          w: "Zonder tweede draad naar de andere pool is er geen rondje, dus geen stroom.",
          meer: "Laat Lotte de zijkant van de fitting met een tweede draad aan de minpool verbinden. Dan brandt hij meteen." },
        { t: "mc", q: "Een gloeilampje heeft twee aansluitpunten. Waarom twee?",
          o: ["één om erin en één om eruit", "één voor licht en één voor warmte", "één voor de plus en één voor reserve", "twee, zodat het dubbel zo fel brandt"],
          a: "één om erin en één om eruit",
          fout: {
            "één voor licht en één voor warmte": "Licht en warmte ontstaan allebei in het gloeidraadje. De twee punten zijn de ingang en de uitgang van het rondje.",
            "één voor de plus en één voor reserve": "Er is geen reserve: allebei zijn nodig. Valt er één weg, dan is de kring open.",
            "twee, zodat het dubbel zo fel brandt": "Met één aansluiting brandt hij niet half zo fel, maar helemaal niet. Je hebt ze allebei nodig voor het rondje."
          },
          w: "De lading gaat aan de ene kant het lampje in en aan de andere kant eruit.",
          meer: "Onderaan zit het ene contact, de schroefdraad aan de zijkant is het andere. Daartussen zit het gloeidraadje." },
        { t: "mc", q: "In de plusdraad meet je 0,30 A. Iemand zegt: 'In de mindraad meet je 0 A, want daar komt de stroom pas aan.' Wat wijst de meter in de mindraad echt aan?",
          o: ["0,30 A", "0 A", "0,15 A", "0,60 A"],
          a: "0,30 A",
          fout: {
            "0 A": "Bij 0 A in de mindraad zou de lading in het lampje blijven hangen. Die gaat er gewoon doorheen: ook hier 0,30 A.",
            "0,15 A": "De stroom wordt niet gehalveerd. Het lampje zet energie om, geen lading: 0,30 A erin, 0,30 A eruit.",
            "0,60 A": "Dat is optellen alsof er twee stromen zijn (De Botsers). Er is één stroom rond: overal 0,30 A."
          },
          w: "In één rondje is de stroom overal even groot: ook in de mindraad 0,30 A.",
          meer: "Alle lading gaat tegelijk rond, als een ketting. Er hoeft niets ergens 'aan te komen'." },
        { t: "mc", q: "Wat gebeurt er met de lading nadat hij door het lampje is gegaan?",
          o: ["hij gaat terug naar de batterij", "hij is omgezet in licht", "hij is voor de helft op", "hij blijft in het lampje"],
          a: "hij gaat terug naar de batterij",
          fout: {
            "hij is omgezet in licht": "Licht komt uit energie, niet uit lading. Kernzin: energie wordt omgezet, lading niet.",
            "hij is voor de helft op": "Dat is De Stroomvreter. Meet maar: vóór het lampje 0,30 A, ná het lampje ook 0,30 A.",
            "hij blijft in het lampje": "Dan zou het lampje vol lopen en stoppen. De lading gaat erdoor en verder het rondje rond."
          },
          w: "De lading gaat het hele rondje rond, terug naar de batterij, die hem opnieuw duwt.",
          meer: "Wat het lampje wel krijgt, is energie: die zet het om in licht en warmte." },
        { t: "open", q: "Leg uit waarom een lampje met maar één draad naar de batterij niet brandt.", punten: 2,
          modelantwoord: "Voor stroom is een gesloten kring nodig: een rondje van de ene pool via het lampje naar de andere pool. Met één draad kan de lading het lampje niet uit en niet terug naar de andere pool, dus beweegt er niets.",
          sleutelwoorden: [ { moet: ["rondje"], syn: ["gesloten", "kring", "terug"] }, { moet: ["andere pool"], syn: ["minpool", "pluspool", "tweede draad", "twee aansluitingen", "eruit"] } ],
          rubric: ["Er is een gesloten kring (rondje) nodig", "De lading moet via een tweede draad terug naar de andere pool"],
          w: "Geen rondje, geen stroom: de lading moet terug naar de andere pool.",
          meer: "Noem allebei: het rondje (gesloten kring) en de weg terug naar de andere pool." },
        { t: "mc", q: "Storm maakt een kaart met een lampje erin. Ze heeft twee snoertjes met krokodillenbekjes en een batterij. Welke opstelling laat het lampje branden?",
          o: ["plus naar lampje, lampje naar min", "plus naar lampje, lampje naar plus", "min naar lampje, lampje naar min", "plus naar lampje, tweede snoer los"],
          a: "plus naar lampje, lampje naar min",
          fout: {
            "plus naar lampje, lampje naar plus": "Twee snoeren, maar allebei aan dezelfde pool. Er is geen drukverschil over het lampje, dus geen stroom.",
            "min naar lampje, lampje naar min": "Zelfde fout andersom: allebei aan de min. Je hebt de ene pool en de andere pool nodig.",
            "plus naar lampje, tweede snoer los": "Een los snoer is een gat. Dan is het De Eéndraad: de lading kan nergens heen."
          },
          w: "Het rondje moet van de ene pool, door het lampje, naar de andere pool gaan.",
          meer: "Plus of min eerst maakt niet uit: plus-lampje-min of min-lampje-plus werkt allebei." },
        { t: "sleep", opgave: "Klopt het, of is het een denkfout?",
          chips: [ { t: "de lading is er ook als de kring open is", bak: "k" }, { t: "het lampje maakt de stroom op", bak: "d" }, { t: "uit + en − komt stroom die botst", bak: "d" }, { t: "energie wordt omgezet, lading niet", bak: "k" }, { t: "één draad naar het lampje is genoeg", bak: "d" }, { t: "een lampje heeft twee aansluitingen", bak: "k" } ],
          bakjes: [ { id: "k", label: "Klopt", som: "zo werkt een stroomkring" }, { id: "d", label: "Denkfout", som: "een baas uit deze les" } ],
          w: "De drie bazen: De Eéndraad, De Botsers en De Stroomvreter.",
          meer: "Bij elke denkfout hoort een test: één draad (lampje uit), twee meters (zelfde stroom, één richting), meter voor en na (zelfde getal)." },
        { t: "mc", q: "In ons model is de batterij een pomp bij een ballon. Wat doet het pompen?",
          o: ["het zet het drukverschil steeds terug", "het vult de snoeren met nieuwe lading", "het haalt opgebruikte stroom terug", "het blaast lucht door het lampje"],
          a: "het zet het drukverschil steeds terug",
          fout: {
            "het vult de snoeren met nieuwe lading": "De lading zit al in de snoeren. De batterij maakt geen lading, hij duwt hem rond.",
            "het haalt opgebruikte stroom terug": "Er wordt geen stroom opgebruikt. Wat op raakt is energie, en die vult de pomp telkens aan.",
            "het blaast lucht door het lampje": "De lucht is alleen een vergelijking. In het echt duwt de batterij lading door de draden."
          },
          w: "Een ballon loopt leeg; de pomp (batterij) houdt het drukverschil op peil, zodat de lading blijft rondgaan.",
          meer: "Spanning is die druk. Hoeveel lading er per seconde rondgaat, is de stroomsterkte." },
        { t: "mc", q: "Een batterij is 'leeg'. Wat is er op?",
          o: ["zijn energie: hij kan niet meer duwen", "zijn lading: die zit in het lampje", "de stroom: die ging door het lampje", "het koper in de snoeren"],
          a: "zijn energie: hij kan niet meer duwen",
          fout: {
            "zijn lading: die zit in het lampje": "De lading is niet weg en hoopt nergens op. Hij is gewoon in de kring, maar wordt niet meer geduwd.",
            "de stroom: die ging door het lampje": "Stroom is bewegende lading, en die komt terug bij de batterij. Op is alleen de energie om te duwen.",
            "het koper in de snoeren": "Het koper blijft gewoon zitten. Met een nieuwe batterij brandt hetzelfde lampje aan hetzelfde snoer weer."
          },
          w: "Energie wordt omgezet (licht, warmte), lading niet. Leeg = geen duw meer.",
          meer: "In het model: de pomp is uitgeput, de bolletjes zijn er nog maar worden niet meer rondgeduwd." },
        { t: "mc", q: "Waar mag je de schakelaar in een kring met één lampje zetten?",
          o: ["overal in het rondje", "alleen direct naast de pluspool", "alleen tussen lampje en minpool", "alleen vlak vóór het lampje"],
          a: "overal in het rondje",
          fout: {
            "alleen direct naast de pluspool": "Ook bij de minpool werkt hij: één gat waar dan ook stopt de hele kring.",
            "alleen tussen lampje en minpool": "Ook vóór het lampje werkt hij. De lading beweegt overal tegelijk, dus een gat ergens stopt alles.",
            "alleen vlak vóór het lampje": "Er is geen 'vóór' waar de stroom eerst langs moet. Elk gat in het rondje zet alle lading stil."
          },
          w: "Eén rondje: een gat op welke plek ook zet alle lading tegelijk stil.",
          meer: "Dat is hetzelfde idee als bij de stroommeter: in een enkele kring is het overal hetzelfde." }
      ]
    }
  ]
};

/* ============ 2. geleiders (4.1.3, 4.1.4) ============ */
window.__TOPICS["geleiders"] = {
  id: "geleiders", emoji: "🔌", titel: "H4 · Geleiders en isolatoren",
  kort: "Metalen (en koolstof) laten stroom gemakkelijk door; rubber, glas, de meeste plastic en lucht houden hem tegen.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Een <b>geleider</b> is een stof waar stroom <b>gemakkelijk</b> doorheen gaat. Een <b>isolator</b> laat stroom <b>niet of heel slecht</b> door.",
        "<b>Alle metalen</b> zijn geleiders: koper, aluminium, ijzer, lood, staal. Isolatoren zijn bijvoorbeeld <b>rubber</b>, <b>glas</b>, de meeste soorten <b>plastic</b> en <b>lucht</b>.",
        "Een snoer is slim gebouwd: binnenin <b>koperdraad</b> (daar loopt de stroom door), buitenom <b>plastic</b> (zodat jij geen stroom krijgt). Een stekker heeft ook allebei: metalen pinnen en een plastic huls.",
        "Zo test je het: maak een gat in de kring en zet het voorwerp in dat gat. Brandt het lampje, dan is het een geleider. Blijft het uit, dan is het een isolator."
      ],
      regel: "Metaal geleidt; rubber, glas, plastic en lucht isoleren.",
      voorbeelden: [
        { en: "paperclip (staal) in het gat", nl: "lampje brandt: geleider", let: "<b>let op</b>: staal is een metaal." },
        { en: "gum (rubber) in het gat", nl: "lampje blijft uit: isolator", let: "<b>let op</b>: ook buigzaam rubber geleidt niet." },
        { en: "snoer", nl: "koper binnen, plastic buiten", let: "<b>let op</b>: één voorwerp, twee soorten stof." }
      ],
      vragen: [
        { t: "sleep", opgave: "Sleep elke stof naar het goede bakje.",
          chips: [ { t: "koper", bak: "g" }, { t: "aluminium", bak: "g" }, { t: "ijzer", bak: "g" }, { t: "staal", bak: "g" }, { t: "rubber", bak: "i" }, { t: "glas", bak: "i" }, { t: "plastic", bak: "i" }, { t: "lucht", bak: "i" } ],
          bakjes: [ { id: "g", label: "Geleider", som: "laat stroom gemakkelijk door" }, { id: "i", label: "Isolator", som: "laat stroom niet of slecht door" } ],
          w: "Alle metalen geleiden. Rubber, glas, plastic en lucht isoleren.",
          meer: "Twijfel je bij een vaste stof? Is het een metaal, dan geleidt het." },
        { t: "mc", q: "Wat is een isolator?",
          o: ["een stof die stroom niet doorlaat", "een stof die stroom opslaat", "een stof die stroom versnelt", "een stof die zelf stroom maakt"],
          a: "een stof die stroom niet doorlaat",
          fout: {
            "een stof die stroom opslaat": "Opslaan doet een batterij of accu. Een isolator houdt stroom alleen tegen.",
            "een stof die stroom versnelt": "Een isolator doet het omgekeerde: er gaat (bijna) geen stroom doorheen.",
            "een stof die zelf stroom maakt": "Een stof maakt geen stroom. Daar heb je een spanningsbron voor, zoals een batterij."
          },
          w: "Isolator = laat stroom niet of heel slecht door.",
          meer: "Het woord komt van 'isoleren': apart houden. Het plastic houdt de stroom apart van jouw hand." },
        { t: "mc", q: "Waarom zit er koper in een snoer?",
          o: ["koper geleidt heel goed", "koper is fijn buigzaam", "koper houdt stroom tegen", "koper maakt het snoer zwaar"],
          a: "koper geleidt heel goed",
          fout: {
            "koper is fijn buigzaam": "Buigzaam is handig, maar rubber is ook buigzaam en geleidt niet. Koper zit erin omdat de stroom er goed doorheen gaat.",
            "koper houdt stroom tegen": "Andersom: koper is een metaal en dus een geleider. Tegenhouden doet het plastic eromheen.",
            "koper maakt het snoer zwaar": "Zwaar is juist niet handig. De reden is dat koper een van de beste geleiders is."
          },
          w: "Door het koper loopt de stroom; het is een heel goede geleider.",
          meer: "Koper en aluminium geleiden beter dan ijzer en lood." },
        { t: "mc", q: "Waarom zit er plastic om het koper van een snoer?",
          o: ["zodat jij geen stroom krijgt", "zodat de stroom sneller gaat", "zodat het koper stroom maakt", "zodat de lading niet opraakt"],
          a: "zodat jij geen stroom krijgt",
          fout: {
            "zodat de stroom sneller gaat": "Plastic is een isolator: daar gaat geen stroom doorheen, dus het maakt de stroom niet sneller.",
            "zodat het koper stroom maakt": "Koper maakt geen stroom; het laat stroom door. Stroom komt van de spanningsbron.",
            "zodat de lading niet opraakt": "Lading raakt nooit op: hij gaat rond. Het plastic is er voor jouw veiligheid."
          },
          w: "Het plastic is een isolator: het houdt de stroom in het koper en weg van jou.",
          meer: "Is het plastic kapot en zie je kaal koper? Dan is het snoer gevaarlijk." },
        { t: "gap", q: "Alle ___ zijn geleiders.", a: "metalen|metaal", soepel: true,
          w: "Alle metalen geleiden, het ene alleen beter dan het andere.",
          meer: "Koper, aluminium, ijzer, lood en staal: allemaal metaal, allemaal geleider." },
        { t: "mc", q: "Je zet een gum van rubber in het gat van de stroomkring. Wat doet het lampje?",
          o: ["het blijft uit", "het brandt fel", "het brandt een beetje", "het knippert"],
          a: "het blijft uit",
          fout: {
            "het brandt fel": "Fel branden lukt met een goede geleider, zoals koper. Rubber is een isolator.",
            "het brandt een beetje": "Rubber laat vrijwel niets door, dus je ziet het lampje niet eens gloeien.",
            "het knippert": "Knipperen doet een lampje niet uit zichzelf door een gum. Rubber houdt de stroom tegen: uit."
          },
          w: "Rubber is een isolator: de kring blijft open.",
          meer: "Daarom hebben gereedschappen voor elektriciens rubberen handvatten." },
        { t: "mc", q: "Storm en haar moeder kopen in de stad een nieuwe föhn. Welk deel van de stekker is een geleider?",
          o: ["de metalen pinnen", "de plastic huls", "het rubber om het snoer", "het kartonnen doosje"],
          a: "de metalen pinnen",
          fout: {
            "de plastic huls": "Plastic is een isolator. Aan de huls pak je de stekker vast, juist omdat er geen stroom door gaat.",
            "het rubber om het snoer": "Rubber isoleert. Het zit eromheen om jou te beschermen.",
            "het kartonnen doosje": "Karton is geen metaal en geen deel van de stekker. Het geleidt ook niet."
          },
          w: "De metalen pinnen gaan het stopcontact in: daar loopt de stroom door.",
          meer: "Een stekker bestaat uit geleiders (pinnen) én isolatoren (huls)." },
        { t: "vb", opgave: "Uitgewerkt voorbeeld: is een aluminium blikje een geleider of een isolator?",
          stappen: [
            { toon: "Stap 1: van welke stof is het?", uitleg: "Van aluminium." },
            { toon: "Stap 2: is dat een metaal?", uitleg: "Ja, aluminium is een metaal." },
            { toon: "Stap 3: regel toepassen", uitleg: "Alle metalen zijn geleiders." },
            { toon: "Conclusie: geleider", uitleg: "Zet je het (op een kaal stukje) in het gat van de kring, dan brandt het lampje." }
          ],
          waarom: { q: "Waarom is het blikje een geleider?",
            o: ["omdat aluminium een metaal is", "omdat het blikje hard is", "omdat het blikje hol is"],
            a: "omdat aluminium een metaal is" },
          fout: {
            "omdat het blikje hard is": "Hard zegt niets: glas is ook hard en isoleert. Het gaat om de stof.",
            "omdat het blikje hol is": "Of iets hol of massief is, maakt niet uit. Het aluminium zelf geleidt."
          },
          w: "Kijk naar de stof: metaal geleidt.",
          meer: "Zit er verf of lak op het blikje, dan moet je op een kaal stukje metaal meten: verf isoleert." },
        { t: "mc", q: "Welke stof is een isolator?",
          o: ["glas", "koper", "staal", "lood"],
          a: "glas",
          fout: {
            "koper": "Koper is een metaal en zelfs een van de beste geleiders.",
            "staal": "Staal is een metaal, dus een geleider. Een stalen paperclip laat het lampje branden.",
            "lood": "Lood geleidt slechter dan koper, maar het is een metaal en dus toch een geleider."
          },
          w: "Glas is geen metaal en laat geen stroom door: een isolator.",
          meer: "Rubber, glas, de meeste plastic en lucht zijn isolatoren." },
        { t: "gap", q: "Een schakelaar die uit staat heeft ___ tussen de contactjes, en dat isoleert.", a: "lucht", soepel: true,
          w: "Uit = lucht ertussen. Lucht is een isolator.",
          meer: "Daaruit leer je dat lucht geen stroom doorlaat: anders ging een lamp nooit uit." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Niet elk metaal geleidt even goed. <b>Koper</b> en <b>aluminium</b> geleiden beter dan <b>ijzer</b> en <b>lood</b>. Daarom zijn snoeren van koper.",
        "<b>Koolstof</b> is een uitzondering: het is <b>geen metaal</b>, maar het geleidt toch. Het grafiet in je <b>potlood</b> is koolstof. Teken je met een zacht potlood een dikke streep, dan kan er een beetje stroom door.",
        "Vuistregel: is een <b>vaste stof geen metaal</b>, dan is het <b>bijna altijd</b> een isolator: hout, papier, rubber, glas, plastic. Koolstof is de bekende uitzondering.",
        "En lucht? Die is geen vaste stof, maar wel een goede <b>isolator</b>. Dat zie je aan de schakelaar: uit = lucht ertussen = lampje uit."
      ],
      regel: "Metaal geleidt (koper en aluminium het best), koolstof ook; andere vaste stoffen en lucht isoleren.",
      voorbeelden: [
        { en: "koperdraad en ijzerdraad, even dik", nl: "bij koper brandt het lampje feller", let: "<b>let op</b>: allebei metaal, allebei geleider." },
        { en: "potloodstreep", nl: "koolstof: geen metaal, wel geleider", let: "<b>let op</b>: de uitzondering op de vuistregel." },
        { en: "houten liniaal", nl: "geen metaal, dus isolator", let: "<b>let op</b>: zo werkt de vuistregel." }
      ],
      vragen: [
        { t: "mc", q: "Welk metaal geleidt het best?",
          o: ["koper", "ijzer", "lood", "staal"],
          a: "koper",
          fout: {
            "ijzer": "IJzer geleidt wel, maar slechter dan koper en aluminium.",
            "lood": "Lood is een metaal en geleidt, maar veel slechter dan koper.",
            "staal": "Staal geleidt (het is een metaal), maar snoeren maak je niet voor niets van koper."
          },
          w: "Koper (en aluminium) geleiden beter dan ijzer en lood.",
          meer: "Daarom is de draad in elk snoer van koper." },
        { t: "mc", q: "Storm tekent met een zacht potlood een dikke streep en legt die in het gat van de kring. Het lampje gloeit zwak. Hoe kan dat?",
          o: ["grafiet is koolstof, en dat geleidt", "het papier geleidt de stroom door", "het potlood heeft een metalen kern", "de stroom springt over door de lucht"],
          a: "grafiet is koolstof, en dat geleidt",
          fout: {
            "het papier geleidt de stroom door": "Papier is geen metaal en isoleert. Zonder streep blijft het lampje uit.",
            "het potlood heeft een metalen kern": "De stift in een potlood is grafiet, geen metaal. Grafiet is koolstof.",
            "de stroom springt over door de lucht": "Lucht is een isolator. Bij een gewone batterij springt er niets over."
          },
          w: "Koolstof (grafiet) is geen metaal, maar geleidt toch.",
          meer: "Het gloeit zwak: koolstof geleidt veel slechter dan koper. Een dikke, donkere streep werkt het best." },
        { t: "sleep", opgave: "Sleep elke stof naar het goede bakje.",
          chips: [ { t: "lood", bak: "m" }, { t: "staal", bak: "m" }, { t: "ijzer", bak: "m" }, { t: "potloodgrafiet", bak: "k" }, { t: "hout", bak: "i" }, { t: "papier", bak: "i" }, { t: "rubber", bak: "i" }, { t: "glas", bak: "i" }, { t: "lucht", bak: "i" } ],
          bakjes: [ { id: "m", label: "Metaal", som: "geleider" }, { id: "k", label: "Geen metaal, wel geleider", som: "de uitzondering" }, { id: "i", label: "Isolator", som: "laat (bijna) geen stroom door" } ],
          w: "Metalen geleiden, koolstof is de uitzondering, de rest isoleert.",
          meer: "Vuistregel: een vaste stof die geen metaal is, is bijna altijd een isolator." },
        { t: "mc", q: "Waarom is de draad in een snoer van koper en niet van lood?",
          o: ["koper geleidt beter dan lood", "lood is een isolator", "koper is geen echt metaal", "lood geleidt alleen als het warm is"],
          a: "koper geleidt beter dan lood",
          fout: {
            "lood is een isolator": "Lood is een metaal, dus een geleider. Alleen een veel slechtere dan koper.",
            "koper is geen echt metaal": "Koper is wel een metaal, en juist daarom geleidt het.",
            "lood geleidt alleen als het warm is": "Lood geleidt gewoon, ook koud. Het geleidt alleen slechter dan koper."
          },
          w: "Allebei metaal, maar koper geleidt veel beter.",
          meer: "Volgorde uit het boek: koper en aluminium beter dan ijzer en lood." },
        { t: "mc", q: "Je vindt een onbekende vaste stof. Het is zeker geen metaal. Wat is hij het waarschijnlijkst?",
          o: ["een isolator", "een goede geleider", "een spanningsbron", "een slechte batterij"],
          a: "een isolator",
          fout: {
            "een goede geleider": "Goed geleiden doen metalen. Een vaste stof die geen metaal is, isoleert bijna altijd.",
            "een spanningsbron": "Een stof is geen spanningsbron. Daar heb je een batterij, accu of zonnecel voor.",
            "een slechte batterij": "Een batterij is een apparaat, geen stof. De vraag is of de stof stroom doorlaat."
          },
          w: "Vuistregel: vaste stof en geen metaal = bijna altijd een isolator.",
          meer: "'Bijna', want koolstof is de uitzondering." },
        { t: "gap", q: "Het grafiet in een potlood is ___, en dat geleidt.", a: "koolstof", soepel: true,
          w: "Grafiet is koolstof: geen metaal, wel een geleider.",
          meer: "Koolstof is de uitzondering op de vuistregel 'geen metaal = isolator'." },
        { t: "mc", q: "Iemand zegt: 'Glas is keihard, dus het geleidt.' Wat klopt?",
          o: ["glas isoleert, hard zegt niets", "glas geleidt alleen als het dik is", "hard glas geleidt, dun glas niet", "dat klopt, harde stoffen geleiden"],
          a: "glas isoleert, hard zegt niets",
          fout: {
            "glas geleidt alleen als het dik is": "Dik of dun: glas blijft een isolator. Het gaat om de stof.",
            "hard glas geleidt, dun glas niet": "Er is geen 'hard glas' dat geleidt. Glas isoleert altijd bij een batterij.",
            "dat klopt, harde stoffen geleiden": "Dat is De Hardgeleider. Tegenvoorbeeld: glas is hard en isoleert, koperdraad is zacht en buigzaam en geleidt."
          },
          w: "Of een stof geleidt, hangt af van de stof, niet van hoe hard hij is.",
          meer: "Hard en isolator: glas, hard plastic. Zacht en geleider: koperdraad, aluminiumfolie." },
        { t: "mc", q: "Welke combinatie zit er in een snoer?",
          o: ["koper binnen, plastic buiten", "plastic binnen, koper buiten", "rubber binnen, glas buiten", "ijzer binnen, koper buiten"],
          a: "koper binnen, plastic buiten",
          fout: {
            "plastic binnen, koper buiten": "Dan zou je stroom krijgen als je het snoer vastpakt. De geleider zit binnen.",
            "rubber binnen, glas buiten": "Twee isolatoren: dan kan de stroom nergens doorheen.",
            "ijzer binnen, koper buiten": "Twee geleiders en geen bescherming: gevaarlijk. En koper is juist de beste geleider voor binnen."
          },
          w: "Geleider binnen (koper), isolator buiten (plastic).",
          meer: "Zo gaat de stroom door het koper en blijft hij weg van je hand." },
        { t: "mc", q: "Waarom hebben tangen voor elektriciens rubberen of plastic handvatten?",
          o: ["dat isoleert, zo krijg je geen stroom", "rubber leidt de stroom naar de grond", "rubber maakt het metaal een isolator", "rubber laat de stroom sneller gaan"],
          a: "dat isoleert, zo krijg je geen stroom",
          fout: {
            "rubber leidt de stroom naar de grond": "Rubber leidt helemaal niets: het is een isolator.",
            "rubber maakt het metaal een isolator": "Het metaal van de tang blijft een geleider. Het rubber zit alleen tussen het metaal en je hand.",
            "rubber laat de stroom sneller gaan": "Een isolator laat juist (bijna) niets door."
          },
          w: "Het handvat is een isolator tussen het metaal en jouw hand.",
          meer: "Net als het plastic om een snoer en de huls van een stekker." },
        { t: "gap", q: "Lucht laat geen stroom door. Lucht is dus een goede ___.", a: "isolator", soepel: true,
          w: "Lucht is een isolator.",
          meer: "Bewijs: een open schakelaar is lucht tussen de contactjes, en dan brandt het lampje niet." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "<b>De Hardgeleider</b> denkt: 'wat hard is, geleidt'. Botsing: <b>glas</b> is keihard en isoleert, een <b>koperdraad</b> is buigzaam en geleidt. Hard of zacht, groot of klein: het gaat om de <b>stof</b>.",
        "Denkfout 'lucht geleidt': als lucht geleidde, zou een lamp nooit uitgaan. Een open schakelaar is gewoon lucht tussen twee contactjes.",
        "Een voorwerp is vaak van meer stoffen gemaakt. Een stekker: metalen pinnen (geleider) in een plastic huls (isolator). Kijk dus <b>welk deel</b> van het voorwerp de kring raakt.",
        "Geleiden is een schaal, geen aan-uitknop: koper heel goed, ijzer minder, koolstof zwak, rubber bijna niets. Dat zie je aan hoe fel het lampje brandt."
      ],
      regel: "Kijk naar de stof, niet naar hoe hard of groot iets is; en kijk welk deel van het voorwerp de kring raakt.",
      voorbeelden: [
        { en: "glazen staafje (hard)", nl: "isolator", let: "<b>let op</b>: hard is geen geleider." },
        { en: "stekker", nl: "pinnen geleiden, huls isoleert", let: "<b>let op</b>: waar raak je hem aan?" },
        { en: "ijzerdraad tegen koperdraad", nl: "koper: lampje feller", let: "<b>let op</b>: geleiden is een schaal." }
      ],
      vragen: [
        { t: "mc", q: "In het gat van de kring zet je eerst een koperdraadje (zacht en buigzaam) en daarna een glazen staafje (keihard). Wat zie je?",
          o: ["koper: lampje aan, glas: lampje uit", "koper: lampje uit, glas: lampje aan", "allebei aan, het zijn vaste stoffen", "allebei uit, ze zijn allebei te dun"],
          a: "koper: lampje aan, glas: lampje uit",
          fout: {
            "koper: lampje uit, glas: lampje aan": "Dat is De Hardgeleider. Hard zegt niets: glas isoleert, koper (een metaal) geleidt.",
            "allebei aan, het zijn vaste stoffen": "Vaste stof zegt niets. De vuistregel is juist: vaste stof en geen metaal = bijna altijd isolator.",
            "allebei uit, ze zijn allebei te dun": "Een dun koperdraadje geleidt prima: de draad in een snoer is ook dun."
          },
          w: "Koper is een metaal en geleidt; glas isoleert, hoe hard ook.",
          meer: "Hard of zacht is geen test. De stof bepaalt het." },
        { t: "mc", q: "Stel dat lucht een geleider was. Wat zou er dan gebeuren?",
          o: ["een lamp zou nooit meer uitgaan", "een lamp zou nooit meer aangaan", "lampjes zouden nooit meer feller gaan", "batterijen zouden nooit meer leeg raken"],
          a: "een lamp zou nooit meer uitgaan",
          fout: {
            "een lamp zou nooit meer aangaan": "Andersom: dan was elke kring altijd dicht, ook met de schakelaar open.",
            "lampjes zouden nooit meer feller gaan": "Feller of zwakker is niet het punt. Het punt is dat je de kring niet meer open kunt maken.",
            "batterijen zouden nooit meer leeg raken": "Batterijen raken leeg omdat hun energie wordt omgezet. Dat verandert niet door de lucht."
          },
          w: "Een schakelaar werkt alleen omdat lucht isoleert. Geleidde lucht, dan was 'uit' nooit uit.",
          meer: "Daarom concluderen we uit de schakelaar dat lucht een isolator is." },
        { t: "mc", q: "Storm en haar moeder vinden in een winkel een metalen haarspeld met een plastic laagje erom. Thuis zet Storm de krokodillenbekjes op het plastic laagje. Het lampje blijft uit. Waarom?",
          o: ["het plastic laagje isoleert", "metaal in een speld geleidt niet", "de speld is te klein voor stroom", "haarspelden zijn van glas"],
          a: "het plastic laagje isoleert",
          fout: {
            "metaal in een speld geleidt niet": "Alle metalen geleiden, ook in een speld. Maar de bekjes raken het metaal niet.",
            "de speld is te klein voor stroom": "Grootte maakt niet uit: ook een kort stukje metaal geleidt.",
            "haarspelden zijn van glas": "De speld is van metaal, met plastic eromheen. Het plastic zit tussen de bekjes en het metaal."
          },
          w: "De bekjes raken alleen het plastic, en plastic isoleert.",
          meer: "Krab een stukje plastic weg en zet de bekjes op het kale metaal: dan brandt het lampje." },
        { t: "mc", q: "Een stukje aluminiumfolie is heel dun en licht. Is het een geleider?",
          o: ["ja, aluminium is een metaal", "nee, het is veel te dun", "nee, het is veel te licht", "alleen als je het opfrommelt"],
          a: "ja, aluminium is een metaal",
          fout: {
            "nee, het is veel te dun": "Dun of dik: aluminium blijft een metaal. Ook de koperdraadjes in een snoer zijn dun.",
            "nee, het is veel te licht": "Licht of zwaar zegt niets over geleiden. Het gaat om de stof.",
            "alleen als je het opfrommelt": "Plat of gefrommeld: het is aluminium en het geleidt."
          },
          w: "Aluminium is een metaal en een van de beste geleiders, ook als dunne folie.",
          meer: "Dun, licht, zacht: het maakt niet uit. Kijk naar de stof." },
        { t: "open", q: "Leg uit hoe een schakelaar laat zien dat lucht een isolator is.", punten: 2,
          modelantwoord: "Staat de schakelaar uit, dan zit er lucht tussen de geleidende contactjes. Het lampje brandt dan niet: de kring is open. Er gaat dus geen stroom door de lucht, en dus is lucht een isolator.",
          sleutelwoorden: [ { moet: ["lucht"], syn: ["luchtlaagje", "ruimte"] }, { moet: ["open"], syn: ["gat", "onderbroken", "brandt niet", "geen stroom", "uit"] } ],
          rubric: ["Bij 'uit' zit er lucht tussen de contactjes", "Het lampje brandt niet / de kring is open, dus lucht laat geen stroom door"],
          w: "Uit = lucht ertussen = lampje uit. Dus lucht laat geen stroom door.",
          meer: "Noem allebei: wat er tussen de contactjes zit (lucht) en wat je ziet (lampje uit, kring open)." },
        { t: "sleep", opgave: "Welk deel raakt de kring? Geleider of isolator?",
          chips: [ { t: "metalen pin van een stekker", bak: "g" }, { t: "plastic huls van een stekker", bak: "i" }, { t: "koperdraad in een snoer", bak: "g" }, { t: "plastic om een snoer", bak: "i" }, { t: "punt van een potloodstift", bak: "g" }, { t: "houten buitenkant van een potlood", bak: "i" }, { t: "rubber handvat van een tang", bak: "i" }, { t: "metalen bek van een tang", bak: "g" } ],
          bakjes: [ { id: "g", label: "Geleider", som: "het lampje brandt" }, { id: "i", label: "Isolator", som: "het lampje blijft uit" } ],
          w: "Eén voorwerp kan geleiders én isolatoren hebben. Kijk naar het deel dat de kring raakt.",
          meer: "Potlood: de stift (koolstof) geleidt, het hout eromheen isoleert." },
        { t: "mc", q: "Welke uitspraak klopt?",
          o: ["koolstof is geen metaal, maar geleidt", "wat geen metaal is, isoleert altijd", "lood geleidt beter dan koper", "staal is hard, dus isoleert het"],
          a: "koolstof is geen metaal, maar geleidt",
          fout: {
            "wat geen metaal is, isoleert altijd": "Bijna altijd, niet altijd. Koolstof (potloodgrafiet) is de uitzondering.",
            "lood geleidt beter dan koper": "Andersom: koper en aluminium geleiden beter dan ijzer en lood.",
            "staal is hard, dus isoleert het": "Staal is een metaal en geleidt. Hard of zacht zegt niets."
          },
          w: "Koolstof is de uitzondering: geen metaal, wel geleider.",
          meer: "Daarom staat er in de vuistregel 'bijna altijd'." },
        { t: "mc", q: "Je test een ijzerdraad en een koperdraad van dezelfde lengte en dikte in het gat van de kring. Wat zie je?",
          o: ["bij koper brandt het lampje feller", "bij ijzer brandt het lampje feller", "het brandt even fel, allebei metaal", "bij ijzer blijft het lampje uit"],
          a: "bij koper brandt het lampje feller",
          fout: {
            "bij ijzer brandt het lampje feller": "IJzer geleidt slechter dan koper. Dus bij ijzer brandt hij zwakker.",
            "het brandt even fel, allebei metaal": "Allebei geleider, maar niet even goed. Geleiden is een schaal.",
            "bij ijzer blijft het lampje uit": "IJzer is een metaal en geleidt wel. Het lampje brandt, alleen iets minder fel."
          },
          w: "Koper geleidt beter dan ijzer: het lampje brandt feller.",
          meer: "Volgorde: koper en aluminium beter dan ijzer en lood. Koolstof nog zwakker." },
        { t: "mc", q: "Waarom mag je een snoer met een kapotte plastic laag en kaal koper niet aanraken?",
          o: ["het kale koper geleidt naar jou", "koper wordt heet als je het aanraakt", "het plastic is nu een geleider", "je vingers houden de stroom tegen"],
          a: "het kale koper geleidt naar jou",
          fout: {
            "koper wordt heet als je het aanraakt": "Het gevaar is niet de warmte, maar dat er stroom door je lichaam kan gaan.",
            "het plastic is nu een geleider": "Plastic blijft een isolator. Het probleem is dat het er niet meer omheen zit.",
            "je vingers houden de stroom tegen": "Je lichaam houdt stroom niet goed tegen: daarom is het juist gevaarlijk."
          },
          w: "De isolator is weg: het kale koper kan stroom naar jou laten lopen.",
          meer: "Bij het lichtnet (230 V) is dat levensgevaarlijk. Kapot snoer? Stekker eruit en niet gebruiken." },
        { t: "mc", q: "De vuistregel 'vaste stof en geen metaal = isolator' geldt bijna altijd. Welke stof uit deze les is de uitzondering?",
          o: ["koolstof (grafiet)", "glas (van een ruit)", "rubber (van een gum)", "hout (van een liniaal)"],
          a: "koolstof (grafiet)",
          fout: {
            "glas (van een ruit)": "Glas is geen metaal en isoleert: het volgt de vuistregel gewoon.",
            "rubber (van een gum)": "Rubber isoleert, precies zoals de vuistregel zegt.",
            "hout (van een liniaal)": "Hout is geen metaal en isoleert: geen uitzondering."
          },
          w: "Koolstof is geen metaal en geleidt toch.",
          meer: "Je kent het van je potlood: de stift is grafiet, en dat is koolstof." }
      ]
    }
  ]
};

/* ============ 3. stroomsterkte (4.1.5, 4.2.4) ============ */
window.__TOPICS["stroomsterkte"] = {
  id: "stroomsterkte", emoji: "🎯", titel: "H4 · Stroomsterkte meten",
  kort: "Stroomsterkte is hoeveel lading er per seconde voorbijkomt, in ampère; je meet hem met een stroommeter IN de kring, en in één rondje is hij overal gelijk.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "<b>Stroomsterkte</b> is hoeveel lading er <b>per seconde</b> op één punt van de kring voorbijkomt. Meer lading per seconde = een grotere stroomsterkte.",
        "Vergelijk het met een opgeblazen ballon die leegloopt: hoeveel lucht er per seconde uit stroomt. Veel lucht per seconde = een grote 'stroomsterkte', en dan is de ballon snel leeg.",
        "De eenheid is de <b>ampère (A)</b>. Kleine stromen meet je in <b>milliampère (mA)</b>: <b>1 A = 1000 mA</b>, dus 0,250 A = 250 mA.",
        "Je meet met een <b>stroommeter</b>, ook wel <b>ampèremeter</b>. Het symbool is een cirkel met een A erin. Je neemt hem <b>op in de kring</b>: de stroom moet erdoorheen."
      ],
      regel: "Stroomsterkte = lading per seconde, in ampère; de stroommeter zet je IN de kring.",
      voorbeelden: [
        { en: "0,250 A", nl: "= 250 mA (× 1000)", let: "<b>let op</b>: kleinere eenheid, dus een groter getal." },
        { en: "stroommeter", nl: "in de kring, de stroom gaat erdoorheen", let: "<b>let op</b>: niet ernaast." },
        { en: "ballon", nl: "lucht per seconde eruit = stroomsterkte", let: "<b>let op</b>: hoe strak hij staat is de spanning." }
      ],
      vragen: [
        { t: "mc", q: "Wat is stroomsterkte?",
          o: ["hoeveel lading er per seconde langskomt", "hoe hard de batterij de lading duwt", "hoeveel energie het lampje per uur opmaakt", "hoe lang de batterij nog meegaat"],
          a: "hoeveel lading er per seconde langskomt",
          fout: {
            "hoe hard de batterij de lading duwt": "Dat is spanning (in volt). Stroomsterkte is wat er door die duw per seconde voorbijkomt.",
            "hoeveel energie het lampje per uur opmaakt": "Het lampje zet energie om, maar dat is geen stroomsterkte. Stroomsterkte telt lading per seconde.",
            "hoe lang de batterij nog meegaat": "Dat hangt er wel mee samen, maar stroomsterkte meet je op één moment: lading per seconde."
          },
          w: "Stroomsterkte = hoeveel lading er per seconde op één punt voorbijkomt.",
          meer: "Het woordje 'per' is belangrijk: per seconde." },
        { t: "gap", q: "De eenheid van stroomsterkte is de ___.", a: "ampère|ampere|A", soepel: true,
          w: "Stroomsterkte meet je in ampère (A).",
          meer: "Kleine stromen in milliampère (mA): 1 A = 1000 mA." },
        { t: "mc", q: "Hoe heet een stroommeter nog meer?",
          o: ["ampèremeter", "voltmeter", "thermometer", "spanningsmeter"],
          a: "ampèremeter",
          fout: {
            "voltmeter": "Een voltmeter meet spanning, in volt. Stroom meet je in ampère.",
            "thermometer": "Een thermometer meet temperatuur, geen stroom.",
            "spanningsmeter": "Een spanningsmeter (voltmeter) meet de duw van de batterij. Stroom meet je met een ampèremeter."
          },
          w: "Stroomsterkte in ampère, dus: ampèremeter.",
          meer: "Spanning in volt, dus: voltmeter. Zo onthoud je ze allebei." },
        { t: "bouw", q: "Reken om: 0,250 A = ... mA (alleen het getal)", a: "250",
          w: "0,250 × 1000 = 250 mA.",
          meer: "Van A naar mA: × 1000. De eenheid wordt kleiner, het getal groter." },
        { t: "bouw", q: "Reken om: 1,5 A = ... mA (alleen het getal)", a: "1500",
          w: "1,5 × 1000 = 1500 mA.",
          meer: "Controle: mA is een kleine eenheid, dus het getal moet groter worden dan 1,5." },
        { t: "mc", q: "Hoe sluit je een stroommeter aan?",
          o: ["in de kring: de stroom gaat erdoorheen", "naast het lampje, aan beide kanten ervan", "los op tafel, hij meet het draadloos", "alleen met één draad aan de pluspool"],
          a: "in de kring: de stroom gaat erdoorheen",
          fout: {
            "naast het lampje, aan beide kanten ervan": "Zo sluit je een spanningsmeter aan. Een stroommeter moet de stroom zelf door zich heen krijgen.",
            "los op tafel, hij meet het draadloos": "Een schoolstroommeter meet niets op afstand. Hij moet echt in het rondje zitten.",
            "alleen met één draad aan de pluspool": "Met één draad is er geen rondje door de meter. De stroom moet er aan de ene kant in en aan de andere kant uit."
          },
          w: "Stroommeter = IN de kring (in serie): de stroom gaat erdoorheen.",
          meer: "Je maakt de kring ergens open en zet de meter in dat gat." },
        { t: "mc", q: "Welk symbool hoort bij de stroommeter?",
          o: ["een cirkel met een A erin", "een cirkel met een V erin", "een cirkel met een kruis erin", "een lange en een korte streep"],
          a: "een cirkel met een A erin",
          fout: {
            "een cirkel met een V erin": "V staat voor volt: dat is de spanningsmeter.",
            "een cirkel met een kruis erin": "Een cirkel met een kruis is het symbool van een lampje.",
            "een lange en een korte streep": "Een lange en een korte streep is het symbool van een batterij (spanningsbron)."
          },
          w: "A van ampère: een cirkel met een A.",
          meer: "Spanningsmeter: cirkel met V. Lampje: cirkel met een kruis." },
        { t: "mc", q: "In de ballon-vergelijking: wat hoort bij een grote stroomsterkte?",
          o: ["veel lucht per seconde eruit", "een heel grote ballon", "een ballon die strak staat", "een ballon met een knoop erin"],
          a: "veel lucht per seconde eruit",
          fout: {
            "een heel grote ballon": "Groot zegt hoeveel lucht erin zit, niet hoeveel er per seconde uitkomt.",
            "een ballon die strak staat": "Strak staan is de druk: dat hoort bij spanning, niet bij stroomsterkte.",
            "een ballon met een knoop erin": "Met een knoop komt er niets uit: dat is een stroomsterkte van 0, net als een open kring."
          },
          w: "Stroomsterkte = hoeveel er per seconde voorbijkomt: veel lucht per seconde.",
          meer: "Spanning = hoe hard de ballon duwt. Stroomsterkte = hoeveel er per seconde uitstroomt." },
        { t: "vb", opgave: "Uitgewerkt voorbeeld: reken 0,08 A om naar mA.",
          stappen: [
            { toon: "Stap 1: welke kant op?", uitleg: "Van A naar mA: naar een kleinere eenheid." },
            { toon: "Stap 2: keer of gedeeld?", uitleg: "Kleinere eenheid = groter getal, dus × 1000." },
            { toon: "Stap 3: uitrekenen", uitleg: "0,08 × 1000 = 80." },
            { toon: "Antwoord: 80 mA", uitleg: "Controle: 80 is groter dan 0,08. Klopt." }
          ],
          waarom: { q: "Waarom vermenigvuldig je met 1000?",
            o: ["1 A is 1000 mA, dus meer stukjes", "milli is groter dan een ampère", "bij omrekenen is het altijd × 1000"],
            a: "1 A is 1000 mA, dus meer stukjes" },
          fout: {
            "milli is groter dan een ampère": "Andersom: een milliampère is een duizendste ampère, dus veel kleiner.",
            "bij omrekenen is het altijd × 1000": "Van mA naar A is het juist ÷ 1000. Kijk altijd welke kant je op gaat."
          },
          w: "Eén ampère past 1000 keer in milliampère's, dus het getal wordt 1000 keer zo groot.",
          meer: "Vergelijk: 1 meter = 1000 millimeter. Zelfde 'milli'." },
        { t: "mc", q: "Een lader geeft 2000 mA. Hoeveel ampère is dat?",
          o: ["2 A", "20 A", "0,2 A", "2 000 000 A"],
          a: "2 A",
          fout: {
            "20 A": "Je deelt dan door 100. Van mA naar A deel je door 1000: 2000 ÷ 1000 = 2.",
            "0,2 A": "Dat is door 10 000 gedeeld. 2000 ÷ 1000 = 2 A.",
            "2 000 000 A": "Dat is de verkeerde kant op (× 1000). Ampère is de grotere eenheid, dus het getal wordt kleiner."
          },
          w: "2000 mA ÷ 1000 = 2 A.",
          meer: "Van mA naar A: ÷ 1000. Grotere eenheid = kleiner getal." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "In een enkele kring is de stroomsterkte <b>overal even groot</b>. Meter links van het lampje: <b>0,30 A</b>. Meter rechts: ook <b>0,30 A</b>. Er gaat evenveel lading het lampje in als er aan de andere kant uitkomt.",
        "Denk aan de bolletjes in een gesloten buis: komen er op één plek 30 per seconde langs, dan overal. Anders zouden ze zich ergens ophopen of zou er ergens een gat vallen.",
        "Een stroommeter heeft <b>meetbereiken</b>, bijvoorbeeld <b>5 A</b>, <b>0,5 A</b> en <b>0,05 A</b>. Het <b>rode snoer</b> zit aan het gekozen bereik. Het bereik bepaalt wat de schaal waard is: de wijzer helemaal uit = het bereik.",
        "Weet je niet hoe groot de stroom is? <b>Begin bij het grootste bereik</b> (5 A), zodat de meter niet beschadigt. Slaat de wijzer bijna niet uit, dan kies je een kleiner bereik en lees je nauwkeuriger af."
      ],
      regel: "In één rondje is de stroom overal gelijk; kies eerst het grootste bereik en lees af wat de schaal bij dát bereik waard is.",
      voorbeelden: [
        { en: "links 0,30 A, rechts 0,30 A", nl: "overal hetzelfde in één rondje", let: "<b>let op</b>: het lampje maakt geen stroom op." },
        { en: "bereik 0,5 A, wijzer halverwege", nl: "0,25 A", let: "<b>let op</b>: helemaal uit = 0,5 A." },
        { en: "onbekende stroom", nl: "eerst 5 A, dan kleiner", let: "<b>let op</b>: te klein bereik kan de meter beschadigen." }
      ],
      vragen: [
        { t: "mc", q: "Storm meet 0,30 A tussen de batterij en het lampje. Daarna zet ze de meter tussen het lampje en de andere pool. Wat meet ze?",
          o: ["0,30 A", "0,20 A", "0 A", "0,60 A"],
          a: "0,30 A",
          fout: {
            "0,20 A": "Dat is De Stroomvreter: alsof het lampje er 0,10 A van opmaakt. Lading gaat niet op: 0,30 A erin, 0,30 A eruit.",
            "0 A": "Dan zou alle lading in het lampje blijven. Hij gaat er gewoon doorheen: 0,30 A.",
            "0,60 A": "Er komt geen stroom bij. In één rondje is het overal hetzelfde: 0,30 A."
          },
          w: "In één rondje is de stroomsterkte overal gelijk: ook ná het lampje 0,30 A.",
          meer: "Kernzin: energie wordt omgezet, lading niet." },
        { t: "mc", q: "Waarom maakt het niet uit of je de stroommeter links of rechts van het lampje zet?",
          o: ["er gaat evenveel lading in als eruit", "de meter meet altijd alleen de batterij", "links en rechts zijn bij stroom hetzelfde", "het lampje laat geen lading door"],
          a: "er gaat evenveel lading in als eruit",
          fout: {
            "de meter meet altijd alleen de batterij": "De meter meet de lading die door hém heen gaat, op die plek. Dat is overal in het rondje evenveel.",
            "links en rechts zijn bij stroom hetzelfde": "Links en rechts zijn echt twee plekken. Het getal is alleen gelijk omdat er geen lading verloren gaat.",
            "het lampje laat geen lading door": "Het lampje laat de lading wel door, anders brandde hij niet. En dus is het aan beide kanten evenveel."
          },
          w: "Lading hoopt niet op en verdwijnt niet: links en rechts dezelfde stroom.",
          meer: "Bolletjes in een buis: per seconde komen er overal evenveel langs." },
        { t: "mc", q: "Je weet niet hoe groot de stroom is. Welk meetbereik kies je eerst?",
          o: ["5 A", "0,5 A", "0,05 A", "maakt niet uit"],
          a: "5 A",
          fout: {
            "0,5 A": "Is de stroom groter dan 0,5 A, dan slaat de wijzer door. Begin bij het grootste bereik.",
            "0,05 A": "Dat is het kleinste bereik. Bij een grote stroom slaat de wijzer door en kan de meter stuk.",
            "maakt niet uit": "Het maakt wel uit: een te klein bereik kan de meter beschadigen."
          },
          w: "Begin bij het grootste bereik (5 A), daarna zo nodig kleiner.",
          meer: "Een kleiner bereik is daarna nauwkeuriger, omdat de wijzer dan verder uitslaat." },
        { t: "mc", q: "Het rode snoer zit bij 0,5 A. De wijzer staat helemaal aan het eind van de schaal. Hoeveel stroom is dat?",
          o: ["0,5 A", "5 A", "0,05 A", "50 A"],
          a: "0,5 A",
          fout: {
            "5 A": "5 A zou het zijn bij het bereik 5 A. Het rode snoer zit bij 0,5 A.",
            "0,05 A": "Dat is een ander, kleiner bereik. Hier is het bereik 0,5 A.",
            "50 A": "Zo'n groot bereik heeft deze meter niet. Helemaal uit = het gekozen bereik = 0,5 A."
          },
          w: "Helemaal uit = het gekozen bereik: 0,5 A.",
          meer: "Het bereik is de grootste waarde die de meter met dat snoer kan meten." },
        { t: "velden", q: "De wijzer staat precies halverwege de schaal. Wat lees je af bij elk bereik? (in A)",
          velden: [ { label: "bereik 5 A", a: "2,5" }, { label: "bereik 0,5 A", a: "0,25" }, { label: "bereik 0,05 A", a: "0,025" } ],
          w: "Halverwege = de helft van het bereik: 2,5 A, 0,25 A en 0,025 A.",
          meer: "Zelfde wijzerstand, ander bereik, ander getal. Kijk dus altijd eerst waar het rode snoer zit." },
        { t: "sequence", q: "Zet de stappen om de stroom te meten in de goede volgorde.",
          stappen: ["schakelaar uit", "één snoer losmaken, zodat er een opening is", "stroommeter in die opening zetten, rood snoer op 5 A", "schakelaar aan en aflezen", "wijzer slaat weinig uit? kleiner bereik kiezen"],
          w: "Eerst de kring openen, dan de meter erin, beginnen bij het grootste bereik.",
          meer: "Zo zit de meter echt IN het rondje, en je beschermt hem door met 5 A te beginnen." },
        { t: "gap", q: "Een stroommeter zet je ___ de kring, zodat de stroom erdoorheen gaat.", a: "in", soepel: true,
          w: "Stroommeter = IN de kring (in serie).",
          meer: "Een spanningsmeter zet je juist naast (over) het onderdeel." },
        { t: "mc", q: "Waarom begin je bij het grootste meetbereik?",
          o: ["anders kan de meter kapotgaan", "dan lees je het nauwkeurigst af", "dan gaat de stroom sneller rond", "dan hoeft het rode snoer er niet in"],
          a: "anders kan de meter kapotgaan",
          fout: {
            "dan lees je het nauwkeurigst af": "Andersom: het grootste bereik is het minst nauwkeurig. Daarom stap je daarna terug naar een kleiner bereik.",
            "dan gaat de stroom sneller rond": "Het bereik verandert de stroom niet. Het verandert alleen wat de schaal waard is.",
            "dan hoeft het rode snoer er niet in": "Het rode snoer gaat altijd naar het gekozen bereik, ook bij 5 A."
          },
          w: "Bij een te klein bereik slaat de wijzer door en kan de meter stuk.",
          meer: "Grootste bereik eerst = veilig. Daarna kleiner = nauwkeurig." },
        { t: "mc", q: "Wat betekent 'meetbereik 0,05 A'?",
          o: ["de meter meet tot 0,05 A", "de meter meet vanaf 0,05 A", "elk streepje is 0,05 A", "de stroom is altijd 0,05 A"],
          a: "de meter meet tot 0,05 A",
          fout: {
            "de meter meet vanaf 0,05 A": "Andersom: 0,05 A is het maximum. De schaal begint bij 0.",
            "elk streepje is 0,05 A": "0,05 A is de hele schaal. Elk streepje is dus maar een klein stukje daarvan.",
            "de stroom is altijd 0,05 A": "Het bereik is een instelling van de meter, niet de stroom in de kring."
          },
          w: "Het bereik is het maximum: wijzer helemaal uit = 0,05 A (50 mA).",
          meer: "0,05 A = 50 mA: handig voor kleine stroompjes." },
        { t: "mc", q: "Welke stroom is het grootst?",
          o: ["0,4 A", "250 mA", "45 mA", "0,04 A"],
          a: "0,4 A",
          fout: {
            "250 mA": "Groot getal, kleine eenheid. 250 mA = 0,25 A, en dat is minder dan 0,4 A.",
            "45 mA": "45 mA = 0,045 A. Veel kleiner dan 0,4 A.",
            "0,04 A": "0,04 A = 40 mA. Dat is tien keer zo klein als 0,4 A (400 mA)."
          },
          w: "Zet alles in mA: 400, 250, 45 en 40. De grootste is 0,4 A.",
          meer: "Vergelijk altijd in dezelfde eenheid. Een groot getal in mA kan toch een kleine stroom zijn." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "<b>De Stroomvreter</b>: 54% van de leerlingen denkt vooraf dat het lampje stroom opmaakt, zodat er ná het lampje minder overblijft. Meet het: vóór <b>0,30 A</b>, ná <b>0,30 A</b>. Hetzelfde getal.",
        "Wat gaat er dan wel op? <b>Energie</b>. De batterij geeft de lading een duw; in het lampje wordt die energie omgezet in licht en warmte. De lading zelf gaat door en komt terug bij de batterij. Kernzin: <b>energie wordt omgezet, lading niet</b>.",
        "In ons model: de pomp (batterij) duwt de bolletjes rond. In het lampje geven ze hun duw af, maar er verdwijnt geen bolletje. Daarom komen er overal evenveel per seconde langs.",
        "Raakt de batterij leeg, dan kan de pomp minder hard duwen. De stroom wordt dan kleiner, maar <b>overal tegelijk</b>: vóór en ná het lampje blijven de meters gelijk.",
        "Instinker bij het aflezen: dezelfde wijzerstand is iets anders bij een ander bereik. Halverwege is 2,5 A bij 5 A, maar 25 mA bij 0,05 A."
      ],
      regel: "Vóór en ná het lampje is de stroom gelijk: energie wordt omgezet, lading niet.",
      voorbeelden: [
        { en: "vóór 0,30 A, ná 0,30 A", nl: "het lampje maakt geen stroom op", let: "<b>let op</b>: wat opgaat is energie." },
        { en: "bijna lege batterij", nl: "vóór 0,20 A, ná 0,20 A", let: "<b>let op</b>: kleiner, maar nog steeds gelijk." },
        { en: "300 mA en 0,30 A", nl: "precies dezelfde stroom", let: "<b>let op</b>: eerst dezelfde eenheid." }
      ],
      vragen: [
        { t: "mc", q: "Vóór het lampje meet je 0,24 A. Een klasgenoot voorspelt: 'Ná het lampje meet je 0,10 A, want het lampje heeft er 0,14 A van opgemaakt.' Wat meet je echt?",
          o: ["0,24 A", "0,10 A", "0,14 A", "0 A"],
          a: "0,24 A",
          fout: {
            "0,10 A": "Dat is De Stroomvreter. Het lampje maakt geen lading op: wat erin gaat, komt eruit. Ook ná het lampje 0,24 A.",
            "0,14 A": "0,14 A is wat de klasgenoot denkt dat 'opgaat'. Er gaat geen lading op, alleen energie.",
            "0 A": "Bij 0 A zou alle lading in het lampje blijven en zou hij meteen uitgaan. De lading gaat erdoor: 0,24 A."
          },
          w: "Vóór en ná het lampje is de stroom gelijk: 0,24 A.",
          meer: "Energie wordt omgezet, lading niet." },
        { t: "mc", q: "Wat zet het lampje om in licht en warmte?",
          o: ["energie", "lading", "stroomsterkte", "ampères"],
          a: "energie",
          fout: {
            "lading": "Lading gaat door het lampje en komt terug bij de batterij. Kernzin: energie wordt omgezet, lading niet.",
            "stroomsterkte": "Stroomsterkte is een getal (lading per seconde), geen 'iets' dat omgezet wordt. Vóór en ná het lampje is hij gelijk.",
            "ampères": "Ampère is een eenheid, geen stof of energie. Er verdwijnen geen ampères in het lampje."
          },
          w: "Het lampje zet energie om, de lading gaat er gewoon doorheen.",
          meer: "De batterij geeft de lading energie mee; in het lampje wordt die afgegeven als licht en warmte." },
        { t: "open", q: "Leg uit waarom een stroommeter ná het lampje hetzelfde aanwijst als vóór het lampje.", punten: 2,
          modelantwoord: "Het lampje maakt geen lading op: alle lading die het lampje in gaat, komt er aan de andere kant weer uit. Wat het lampje wel omzet is energie (in licht en warmte). Daarom komt er vóór en ná het lampje evenveel lading per seconde langs.",
          sleutelwoorden: [ { moet: ["lading"], syn: ["bolletjes", "stroom"] }, { moet: ["energie"], syn: ["omgezet", "licht", "warmte"] } ],
          rubric: ["Er gaat geen lading verloren: evenveel erin als eruit", "Wat het lampje omzet is energie, niet lading"],
          w: "Lading gaat niet op, energie wordt omgezet. Dus vóór en ná evenveel lading per seconde.",
          meer: "Noem allebei: de lading (blijft) en de energie (wordt omgezet)." },
        { t: "mc", q: "De batterij raakt bijna leeg. Wat zie je aan de stroommeters vóór en ná het lampje?",
          o: ["allebei worden ze tegelijk kleiner", "alleen de meter ná wordt kleiner", "alleen de meter vóór wordt kleiner", "ze blijven allebei gelijk aan het begin"],
          a: "allebei worden ze tegelijk kleiner",
          fout: {
            "alleen de meter ná wordt kleiner": "Dat is De Stroomvreter. De meters blijven gelijk aan elkaar: allebei bijvoorbeeld van 0,30 A naar 0,20 A.",
            "alleen de meter vóór wordt kleiner": "Er is geen plek waar de lading 'eerst' minder wordt. Alle lading beweegt tegelijk.",
            "ze blijven allebei gelijk aan het begin": "Een bijna lege batterij duwt minder hard, dus er komt minder lading per seconde langs."
          },
          w: "Minder duw = minder stroom, maar overal in het rondje tegelijk.",
          meer: "Wat op raakt is de energie van de batterij, niet de lading." },
        { t: "bouw", q: "Bereik 0,05 A. De wijzer staat precies halverwege. Hoeveel mA is dat? (alleen het getal)", a: "25",
          w: "De helft van 0,05 A = 0,025 A = 25 mA.",
          meer: "Eerst het bereik halveren (0,025 A), dan × 1000 voor mA." },
        { t: "mc", q: "Je meet met bereik 5 A en de wijzer komt nauwelijks van de 0 af. Wat doe je?",
          o: ["een kleiner bereik kiezen", "de meter naast het lampje zetten", "een tweede lampje erbij zetten", "het rode snoer aan de min zetten"],
          a: "een kleiner bereik kiezen",
          fout: {
            "de meter naast het lampje zetten": "Een stroommeter hoort IN de kring. Naast het lampje meet je niet de stroom.",
            "een tweede lampje erbij zetten": "Dan verander je de schakeling, niet de meting. Je wilt deze stroom nauwkeuriger aflezen.",
            "het rode snoer aan de min zetten": "Het rode snoer gaat naar het gekozen bereik. Je zet het op 0,5 A of 0,05 A."
          },
          w: "Weinig uitslag? Kies 0,5 A of 0,05 A, dan lees je nauwkeuriger af.",
          meer: "Eerst groot (veilig), dan kleiner (nauwkeurig)." },
        { t: "mc", q: "Iemand zet de stroommeter naast het lampje, met aan elke kant van het lampje een draad, in plaats van in de kring. Wat is er fout?",
          o: ["de stroom moet erdoorheen, in de kring", "een stroommeter werkt alleen bij de pluspool", "naast het lampje meet hij dezelfde stroom", "het lampje maakt dan meer stroom op"],
          a: "de stroom moet erdoorheen, in de kring",
          fout: {
            "een stroommeter werkt alleen bij de pluspool": "Hij werkt op elke plek in het rondje, ook bij de minpool. Het gaat erom dat hij IN de kring zit.",
            "naast het lampje meet hij dezelfde stroom": "Naast het lampje gaat de stroom niet als één rondje door de meter. Zo sluit je een spanningsmeter aan, geen stroommeter.",
            "het lampje maakt dan meer stroom op": "Een lampje maakt nooit stroom op, waar de meter ook zit. Energie wordt omgezet, lading niet."
          },
          w: "Stroommeter IN de kring (in serie); naast het onderdeel is voor de spanningsmeter.",
          meer: "Ezelsbruggetje: stroom moet je vangen, dus de meter in de weg zetten." },
        { t: "sleep", opgave: "Klopt het, of is het een denkfout?",
          chips: [ { t: "vóór en ná het lampje allebei 0,30 A", bak: "k" }, { t: "het lampje maakt stroom op", bak: "d" }, { t: "energie wordt omgezet, lading niet", bak: "k" }, { t: "ná het lampje is de stroom kleiner", bak: "d" }, { t: "250 mA is meer dan 0,3 A", bak: "d" }, { t: "1 A = 1000 mA", bak: "k" } ],
          bakjes: [ { id: "k", label: "Klopt", som: "zo werkt stroomsterkte" }, { id: "d", label: "Denkfout", som: "De Stroomvreter of een omreken-fout" } ],
          w: "Overal gelijk in één rondje; energie op, lading niet; vergelijk in dezelfde eenheid.",
          meer: "250 mA = 0,25 A, dus minder dan 0,3 A." },
        { t: "mc", q: "Twee even volle ballonnen lopen leeg. Bij welke is de 'stroomsterkte' het grootst?",
          o: ["de ballon die in 2 s leeg is", "de ballon die in 10 s leeg is", "de ballon die het grootst was", "de ballon met het dikste rubber"],
          a: "de ballon die in 2 s leeg is",
          fout: {
            "de ballon die in 10 s leeg is": "Dezelfde hoeveelheid lucht in meer tijd: minder lucht per seconde. Dus een kleinere 'stroomsterkte'.",
            "de ballon die het grootst was": "Ze zijn even vol. Het gaat om hoeveel er per seconde uitkomt.",
            "de ballon met het dikste rubber": "Dik rubber zegt iets over de druk (spanning), niet direct over lucht per seconde."
          },
          w: "Dezelfde lucht in 2 s in plaats van 10 s: 5 keer zoveel per seconde.",
          meer: "Stroomsterkte = hoeveel per seconde. Sneller leeg = grotere stroomsterkte." },
        { t: "mc", q: "In één kring wijst meter 1 300 mA aan en meter 2 0,30 A. Een klasgenoot zegt: 'Die verschillen enorm.' Klopt dat?",
          o: ["nee, 300 mA is precies 0,30 A", "ja, 300 is veel meer dan 0,30", "ja, mA is een ander soort stroom", "nee, maar dat is toeval"],
          a: "nee, 300 mA is precies 0,30 A",
          fout: {
            "ja, 300 is veel meer dan 0,30": "Je vergelijkt dan getallen in verschillende eenheden. 300 mA ÷ 1000 = 0,30 A: precies gelijk.",
            "ja, mA is een ander soort stroom": "mA en A zijn dezelfde grootheid (stroomsterkte), alleen een andere eenheid.",
            "nee, maar dat is toeval": "Geen toeval: in één rondje is de stroom overal gelijk. Dat zie je hier in twee eenheden."
          },
          w: "300 mA = 0,30 A: dezelfde stroom, zoals je in één rondje verwacht.",
          meer: "Eerst omrekenen naar dezelfde eenheid, dan pas vergelijken." }
      ]
    }
  ]
};


/* ===== onderwerpen (deel D) ===== */

/* ===================================================================== */
/* 1. SPANNING                                                            */
/* ===================================================================== */
window.__TOPICS["spanning"] = {
  id: "spanning", emoji: "🔋", titel: "H4 · Spanning en spanningsbronnen",
  kort: "Spanning is de duw van de spanningsbron op de lading (in volt); je meet hem met een spanningsmeter over het onderdeel, batterijen in serie tellen op en tot 24 V is veilig.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Zonder <b>spanningsbron</b> geen stroom. Bekende spanningsbronnen zijn de <b>batterij</b>, de <b>accu</b> (zoals in een auto of scooter), de <b>dynamo</b> en de <b>zonnecel</b> (de panelen op daken). Een lampje, snoer of schakelaar is géén spanningsbron: die hebben juist een bron nodig.",
        "Wat is <b>spanning</b>? Denk aan een ballon. Blaas je hem ver op, dan staat het rubber strak: <b>hoge spanning</b>. Half vol is de spanning lager, leeg is er <b>geen spanning</b>. Spanning is de <b>duw</b> die de lading door de kring drukt. Een batterij is als een <b>pomp</b> die het drukverschil steeds weer terugzet: daarom blijft de duw gelijk.",
        "De eenheid van spanning is de <b>volt (V)</b>. Op een batterij staat bijvoorbeeld 1,5 V, 9 V of 12 V. Kleine spanningen schrijf je in <b>millivolt (mV)</b>: <b>1 V = 1000 mV</b>.",
        "Spanning meet je met een <b>spanningsmeter</b> (ook <b>voltmeter</b>). In een schema is dat een <b>cirkel met een V</b>. Je sluit hem aan op de <b>pluspool en de minpool</b> van de batterij, of op de twee kanten van een lampje. Hij komt dus <b>over</b> (naast) het onderdeel, niet in de kring. Een stroommeter zet je juist wél in de kring."
      ],
      regel: "Spanning is de duw op de lading, in volt (V); je meet hem met een spanningsmeter die je over het onderdeel zet (op plus en min).",
      voorbeelden: [
        { en: "ballon ver opgeblazen", nl: "hoge spanning: grote duw", let: "<b>let op</b>: spanning is de duw, niet de hoeveelheid lading die voorbijkomt." },
        { en: "1,5 V = 1500 mV", nl: "van V naar mV: × 1000", let: "<b>let op</b>: kleine eenheid, dus een groter getal." },
        { en: "spanningsmeter op plus en min", nl: "de meter staat naast de batterij", let: "<b>let op</b>: de stroommeter zit IN de kring, de spanningsmeter ERNAAST." }
      ],
      vragen: [
        { t: "mc", q: "Welke van deze is <b>geen</b> spanningsbron?",
          o: ["zonnecel", "dynamo", "lampje", "accu"], a: "lampje",
          fout: {
            "zonnecel": "Een zonnecel zet licht om en levert zo spanning: dat is wél een spanningsbron. Denk aan de panelen op daken.",
            "dynamo": "Een dynamo levert spanning zodra hij draait (bijvoorbeeld door te fietsen): wél een spanningsbron.",
            "accu": "Een accu is een oplaadbare spanningsbron, zoals in een auto (12 V)."
          },
          w: "Een lampje levert geen spanning, het heeft juist een spanningsbron nodig om te branden.",
          meer: "Spanningsbronnen uit het boek: batterij, accu, dynamo en zonnecel. Lampjes, snoeren en schakelaars zijn onderdelen die de bron nodig hebben." },

        { t: "gap", q: "De eenheid van spanning is de ___.", a: "volt|V|volts", soepel: true,
          w: "Spanning meet je in volt, met het symbool V.",
          meer: "Stroomsterkte is in ampère (A), spanning in volt (V). Verwar ze niet: een batterij van 1,5 V zegt niets over hoeveel ampère er loopt." },

        { t: "mc", q: "Wat is <b>spanning</b>?",
          o: ["de duw die de lading door de kring drukt", "de lading die per seconde voorbijkomt", "de lading die in het lampje wordt opgebruikt", "de hoeveelheid koperdraad in het snoer"],
          a: "de duw die de lading door de kring drukt",
          fout: {
            "de lading die per seconde voorbijkomt": "Dat is de stroomsterkte (in ampère). Spanning is de duw die ervoor zorgt dat die lading gaat bewegen.",
            "de lading die in het lampje wordt opgebruikt": "Lading wordt nergens opgebruikt: vóór en na een lampje meet je allebei 0,3 A. Energie wordt omgezet, lading niet.",
            "de hoeveelheid koperdraad in het snoer": "Het koper is de geleider waar de lading doorheen gaat. Met spanning heeft de hoeveelheid draad niets te maken."
          },
          w: "Spanning is de duw van de spanningsbron op de lading.",
          meer: "In het ballonmodel: hoe harder de ballon geblazen is, hoe groter de duw. De batterij is een pomp die die duw steeds weer op peil brengt." },

        { t: "mc", q: "In het ballonmodel: welke ballon heeft de <b>hoogste</b> spanning?",
          o: ["een ver opgeblazen ballon", "een half volle ballon", "een lege ballon", "een ballon die net leeg is gelopen"],
          a: "een ver opgeblazen ballon",
          fout: {
            "een half volle ballon": "Half vol staat het rubber minder strak: de duw (spanning) is lager dan bij een ver opgeblazen ballon.",
            "een lege ballon": "Een lege ballon duwt helemaal niet: geen spanning.",
            "een ballon die net leeg is gelopen": "Leeggelopen betekent: de duw is weg. De spanning is dan juist 0."
          },
          w: "Hoe verder opgeblazen, hoe strakker het rubber en hoe groter de duw: hoge spanning.",
          meer: "Een batterij is zo'n ballon met een pomp erin: de pomp houdt de ballon steeds even vol, dus de spanning blijft gelijk tot de batterij leeg is." },

        { t: "mc", q: "Hoe sluit je een spanningsmeter aan om de spanning van een batterij te meten?",
          o: ["op de pluspool en de minpool", "in de kring, tussen batterij en lampje", "alleen op de pluspool", "alleen op de minpool"],
          a: "op de pluspool en de minpool",
          fout: {
            "in de kring, tussen batterij en lampje": "Zo zet je een stroommeter neer. Een spanningsmeter komt over (naast) de batterij: één snoer op plus, één op min.",
            "alleen op de pluspool": "Spanning is een verschil in duw tussen twee punten. Met één aansluiting kan de meter geen verschil meten.",
            "alleen op de minpool": "Met één snoer meet je niets: spanning meet je altijd tussen twee punten, plus en min."
          },
          w: "De spanningsmeter verbind je met de pluspool en de minpool: hij staat naast de batterij.",
          meer: "Ballon: je vergelijkt de druk binnen met de druk buiten. Daar heb je twee punten voor nodig. Daarom heeft de meter twee snoeren op twee kanten." },

        { t: "gap", q: "1 V = ___ mV.", a: "1000|1.000", soepel: true,
          w: "1 volt is 1000 millivolt.",
          meer: "Milli betekent een duizendste. Net als 1 A = 1000 mA en 1 L = 1000 mL." },

        { t: "sleep", opgave: "Spanningsbron of niet?",
          chips: [ {t:"batterij", bak:"b"}, {t:"accu", bak:"b"}, {t:"dynamo", bak:"b"}, {t:"zonnecel", bak:"b"},
                   {t:"lampje", bak:"n"}, {t:"schakelaar", bak:"n"}, {t:"snoer", bak:"n"}, {t:"stroommeter", bak:"n"} ],
          bakjes: [ {id:"b", label:"Spanningsbron", som:"levert de duw"},
                    {id:"n", label:"Geen spanningsbron", som:"heeft een bron nodig"} ],
          w: "Een spanningsbron levert de duw. De rest gebruikt, geleidt of meet alleen.",
          meer: "Vraag bij elk onderdeel: kan een lampje hierop branden zonder iets anders? Batterij ja, snoer nee." },

        { t: "mc", q: "Hoe ziet het symbool van een <b>spanningsmeter</b> eruit?",
          o: ["een cirkel met een V", "een cirkel met een A", "een cirkel met een kruis", "een cirkel met een M"],
          a: "een cirkel met een V",
          fout: {
            "een cirkel met een A": "A staat voor ampère: dat is de stroommeter. De spanningsmeter meet volt, dus V.",
            "een cirkel met een kruis": "Een cirkel met een kruis is een lampje.",
            "een cirkel met een M": "Een cirkel met een M is een motor."
          },
          w: "Spanningsmeter = cirkel met een V (van volt).",
          meer: "Ezelsbruggetje: de letter in de cirkel is de eenheid die de meter meet. V voor volt, A voor ampère." },

        { t: "vb", opgave: "Een batterij van 1,5 V ligt los op tafel. Er zit niets aan vast. Hoeveel spanning heeft hij, en hoeveel stroom loopt er?",
          stappen: [
            { toon: "Spanning: 1,5 V", uitleg: "Zet je een spanningsmeter op de plus en de min, dan lees je 1,5 V af. De duw is er gewoon." },
            { toon: "Stroom: 0 A", uitleg: "Er is geen gesloten kring. De lading kan nergens rond, dus er komt per seconde niets voorbij." },
            { toon: "Ballon: wel druk, geen stroming", uitleg: "Het is als een opgeblazen ballon die je dichtknijpt: het rubber duwt hard, maar er stroomt geen lucht uit." }
          ],
          waarom: { q: "Waarom loopt er 0 A terwijl de batterij 1,5 V heeft?",
            o: ["Er is geen gesloten kring, dus de lading kan niet rondgaan", "Een batterij is leeg zolang hij niet in een kring zit", "Spanning en stroom zijn hetzelfde, dus ze zijn allebei 0"],
            a: "Er is geen gesloten kring, dus de lading kan niet rondgaan" },
          fout: {
            "Een batterij is leeg zolang hij niet in een kring zit": "Dan zou de spanningsmeter 0 V aanwijzen. Hij wijst 1,5 V aan: de batterij is vol, alleen is de kring niet dicht.",
            "Spanning en stroom zijn hetzelfde, dus ze zijn allebei 0": "Dat is de Spanningsstromer! Spanning is de duw (1,5 V), stroom is wat er per seconde voorbijkomt (0 A). Twee verschillende dingen."
          },
          w: "Spanning is de duw, stroom is beweging. Zonder gesloten kring is er wel duw, maar geen beweging.",
          meer: "Pas als je een lampje aansluit met twee snoeren, gaat de lading rond en loopt er stroom." },

        { t: "mc", q: "Een blokbatterij van 9 V ligt in de la. Wat klopt?",
          o: ["Hij heeft 9 V, maar er loopt nog geen stroom", "Er loopt 9 A stroom door de batterij", "Hij heeft 0 V, want er loopt geen stroom", "Er loopt een kleine stroom van 9 mA"],
          a: "Hij heeft 9 V, maar er loopt nog geen stroom",
          fout: {
            "Er loopt 9 A stroom door de batterij": "Volt is geen ampère. De 9 V is de duw. Er is geen gesloten kring, dus de stroom is 0 A.",
            "Hij heeft 0 V, want er loopt geen stroom": "Dan zou een spanningsmeter 0 V geven, maar hij geeft 9 V. Geen stroom betekent niet: geen spanning. Een dichtgeknepen ballon duwt ook.",
            "Er loopt een kleine stroom van 9 mA": "Er loopt helemaal niets: de kring is niet gesloten. En 9 mA heeft niets met 9 V te maken."
          },
          w: "De spanning (9 V) is er altijd, ook zonder kring. Stroom loopt pas in een gesloten kring.",
          meer: "Baas De Spanningsstromer denkt dat spanning en stroom hetzelfde zijn. Tegenvoorbeeld: losse batterij 9 V, toch 0 A." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Een <b>condensator</b> lijkt op een ballon zonder pomp: je kunt er lading in opslaan, maar als die wegloopt, <b>daalt de spanning</b>. Een lampje op een condensator wordt steeds zwakker en gaat snel uit. Hij levert <b>geen constante spanning</b>, dus het is geen goede spanningsbron.",
        "Een batterij levert wél een constante spanning: er komt steeds nieuwe lading vrij uit <b>stoffen</b> in de batterij. Als die stoffen op zijn, is de batterij leeg. Een <b>gewone batterij</b> gebruik je één keer. Een <b>herbruikbare batterij</b> of <b>accu</b> kun je <b>opladen</b>: je laat de stroom <b>in omgekeerde richting</b> lopen, en de oorspronkelijke stoffen komen terug.",
        "Batterijen <b>in serie</b>: de <b>pluspool van de ene tegen de minpool van de andere</b>. Dan <b>tel je de spanningen op</b>: 2 × 1,5 V = 3,0 V. Heb je een lampje voor 9 V en alleen batterijen van 1,2 V? 7 stuks = 8,4 V, 8 stuks = 9,6 V. Precies 9 V kan niet. Kies 8,4 V, want 9,6 V is te veel voor het lampje.",
        "Ook een spanningsmeter heeft <b>meetbereiken</b>, bijvoorbeeld 30 V, 15 V en 3 V. Aan het rode snoer zie je welk bereik gekozen is. Kies een bereik dat groter is dan wat je verwacht, maar niet onnodig groot.",
        "Het <b>stopcontact</b> levert <b>230 V</b>: de <b>netspanning</b>. Dat is <b>wisselspanning</b>. Een batterij levert <b>gelijkspanning</b>."
      ],
      regel: "Batterijen in serie (plus tegen min): tel de spanningen op; een stopcontact geeft 230 V wisselspanning, een batterij gelijkspanning.",
      voorbeelden: [
        { en: "4 × 1,5 V in serie", nl: "4 × 1,5 = 6,0 V", let: "<b>let op</b>: alleen als plus steeds tegen min zit." },
        { en: "9 V-lampje, batterijen van 1,2 V", nl: "7 stuks = 8,4 V, 8 stuks = 9,6 V: kies 7", let: "<b>let op</b>: liever iets te weinig dan te veel, anders kan het lampje doorbranden." },
        { en: "opladen", nl: "de stroom gaat de andere kant op door de accu", let: "<b>let op</b>: een gewone batterij kun je niet opladen." }
      ],
      vragen: [
        { t: "mc", q: "Waarom is een <b>condensator</b> geen goede spanningsbron?",
          o: ["Zijn spanning zakt terwijl hij leegloopt", "Hij kan helemaal geen lading in zich opslaan", "Hij levert altijd een veel te hoge spanning", "Hij werkt alleen op het stopcontact"],
          a: "Zijn spanning zakt terwijl hij leegloopt",
          fout: {
            "Hij kan helemaal geen lading in zich opslaan": "Juist wel: een condensator slaat lading op, net als een ballon lucht. Het probleem is dat de spanning daalt als die lading wegloopt.",
            "Hij levert altijd een veel te hoge spanning": "Nee, zijn spanning wordt juist steeds lager. Een lampje erop wordt zwakker en gaat snel uit.",
            "Hij werkt alleen op het stopcontact": "Een condensator zit in allerlei elektronica, ook op batterijen. Zijn zwakte is dat hij geen constante spanning levert."
          },
          w: "Een condensator levert geen constante spanning: als de lading wegloopt, daalt de spanning.",
          meer: "Ballon zonder pomp: hij loopt leeg en duwt steeds minder. Een batterij is een ballon mét pomp: de duw blijft gelijk." },

        { t: "bouw", q: "In een zaklamp zitten drie batterijen van 1,5 V in serie. Hoeveel volt is dat samen? (alleen het getal)", a: "4,5",
          w: "In serie tel je op: 1,5 + 1,5 + 1,5 = 4,5 V.",
          meer: "Of korter: 3 × 1,5 V = 4,5 V. Dat werkt alleen als steeds de plus tegen de min zit." },

        { t: "mc", q: "Hoe zet je twee batterijen <b>in serie</b>?",
          o: ["plus van de ene tegen min van de andere", "plus tegen plus, zodat ze samen harder duwen", "min tegen min, zodat de duw niet verdwijnt", "naast elkaar, alle plussen aan één draad"],
          a: "plus van de ene tegen min van de andere",
          fout: {
            "plus tegen plus, zodat ze samen harder duwen": "Dan duwen ze tegen elkaar in, als twee pompen die tegen elkaar blazen. De spanningen tellen dan niet op.",
            "min tegen min, zodat de duw niet verdwijnt": "Ook dan staan ze tegen elkaar in. Alleen plus tegen min stapelt de duw.",
            "naast elkaar, alle plussen aan één draad": "Dat is naast elkaar (parallel) zetten. Dan tel je de spanningen niet op. In serie zet je ze achter elkaar, plus tegen min."
          },
          w: "In serie: de pluspool van de ene batterij tegen de minpool van de volgende.",
          meer: "Kijk maar in een afstandsbediening: de ene batterij ligt met de bolle kant (plus) tegen de platte kant (min) van de andere." },

        { t: "stap", opgave: "Je hebt een lampje voor 9 V en alleen oplaadbare batterijen van 1,2 V. Hoeveel batterijen zet je in serie?",
          stappen: [
            { prompt: "Hoeveel volt geven 7 batterijen samen? (alleen het getal)", a: "8,4", hints: ["In serie tel je op: aantal × spanning van één.", "7 × 1,2", "8,4 V"] },
            { prompt: "Hoeveel volt geven 8 batterijen samen? (alleen het getal)", a: "9,6", hints: ["Zelfde manier, nu met 8.", "8 × 1,2", "9,6 V"] },
            { prompt: "Hoeveel batterijen kies je? (alleen het getal)", a: "7", hints: ["Precies 9 V kan niet (9 / 1,2 = 7,5).", "Welke is niet te veel voor het lampje?", "7 batterijen, 8,4 V"] }
          ],
          w: "8,4 V is iets te weinig, 9,6 V is te veel. Kies 7 batterijen: 8,4 V.",
          meer: "Te veel spanning kan een lampje laten doorbranden. Iets te weinig maakt hem alleen een beetje zwakker." },

        { t: "mc", q: "Bij het 9 V-lampje kies je 7 batterijen van 1,2 V (8,4 V) en niet 8 (9,6 V). Waarom?",
          o: ["9,6 V is te hoog: het lampje kan doorbranden", "Met 8 batterijen wordt de stroom 0 A", "Een lampje werkt alleen op een oneven aantal batterijen", "Bij 8 batterijen heffen de spanningen elkaar op"],
          a: "9,6 V is te hoog: het lampje kan doorbranden",
          fout: {
            "Met 8 batterijen wordt de stroom 0 A": "Er loopt wel stroom, zelfs meer dan het lampje aankan. Het gevaar is te veel, niet te weinig.",
            "Een lampje werkt alleen op een oneven aantal batterijen": "Het aantal maakt niet uit, alleen de totale spanning. 2 batterijen in een afstandsbediening werkt prima.",
            "Bij 8 batterijen heffen de spanningen elkaar op": "In serie (plus tegen min) tellen spanningen altijd op: 8 × 1,2 = 9,6 V. Er heft niets op."
          },
          w: "9,6 V is meer dan het lampje aankan. 8,4 V is iets minder: dan brandt hij net wat zwakker, maar veilig.",
          meer: "Vuistregel: kom zo dicht mogelijk bij de goede spanning, maar ga er niet overheen." },

        { t: "mc", q: "Wat gebeurt er als je een herbruikbare batterij <b>oplaadt</b>?",
          o: ["De stroom loopt omgekeerd en de stoffen komen terug", "Er wordt nieuwe lading in gepompt, want de oude is op", "De batterij krijgt nieuwe stoffen via de stekker", "De spanning wordt verdubbeld, zodat hij langer meegaat"],
          a: "De stroom loopt omgekeerd en de stoffen komen terug",
          fout: {
            "Er wordt nieuwe lading in gepompt, want de oude is op": "Lading raakt nooit op: ze gaat alleen rond. Wat opraakt zijn de stoffen in de batterij. Bij opladen komen die stoffen terug.",
            "De batterij krijgt nieuwe stoffen via de stekker": "Door een snoer komen geen stoffen. De stroom die omgekeerd loopt, verandert de stoffen die er al in zitten terug.",
            "De spanning wordt verdubbeld, zodat hij langer meegaat": "Een opgeladen batterij van 1,2 V is weer gewoon 1,2 V. Hij is alleen weer vol."
          },
          w: "Opladen = de stroom in omgekeerde richting door de batterij laten lopen. De oorspronkelijke stoffen komen dan terug.",
          meer: "Bij een gewone batterij kunnen de veranderingen niet terug. Daarom gooi je die na gebruik weg (in de batterijbak!)." },

        { t: "gap", q: "De spanning van het stopcontact (230 V) heet de ___.", a: "netspanning|net spanning", soepel: true,
          w: "De spanning van de stopcontacten in huis is de netspanning: 230 V.",
          meer: "Het 'net' is het elektriciteitsnet dat alle huizen verbindt. De meeste apparaten in huis zijn gemaakt voor 230 V." },

        { t: "mc", q: "Wat levert een stopcontact in huis?",
          o: ["wisselspanning van 230 V", "gelijkspanning van 230 V", "wisselspanning van 24 V", "gelijkspanning van 12 V"],
          a: "wisselspanning van 230 V",
          fout: {
            "gelijkspanning van 230 V": "230 V klopt, maar het stopcontact geeft wisselspanning. Gelijkspanning komt uit een batterij of accu.",
            "wisselspanning van 24 V": "Wisselspanning klopt, maar 24 V is de grens van veilig. Het stopcontact is 230 V en dus juist gevaarlijk.",
            "gelijkspanning van 12 V": "12 V gelijkspanning is een auto-accu. Het stopcontact geeft veel meer: 230 V wisselspanning."
          },
          w: "Stopcontact: 230 V wisselspanning. Batterij: gelijkspanning.",
          meer: "In een schema: wisselspanning is een golfje (~), gelijkspanning een rechte lijn met een stippellijn eronder." },

        { t: "mc", q: "Je wilt een blokbatterij van 9 V meten. Je spanningsmeter heeft de bereiken 30 V, 15 V en 3 V. Welk bereik kies je het best?",
          o: ["15 V", "3 V", "30 V", "9 V"], a: "15 V",
          fout: {
            "3 V": "9 V past niet in een bereik van 3 V: de wijzer slaat uit tot voorbij het einde van de schaal.",
            "30 V": "Dat kan wel, maar dan gebruik je maar een klein stukje van de schaal en lees je minder precies af. 15 V is groot genoeg en preciezer.",
            "9 V": "Die bereiken heeft deze meter niet. Je kiest uit 30 V, 15 V of 3 V."
          },
          w: "Kies het kleinste bereik dat nog groter is dan wat je verwacht: 15 V.",
          meer: "Het rode snoer zit in het gekozen bereik. Twijfel je? Begin bij het grootste bereik en stap dan omlaag." },

        { t: "bouw", q: "Een knoopcel levert 3 V. Hoeveel millivolt is dat? (alleen het getal)", a: "3000",
          w: "3 V × 1000 = 3000 mV.",
          meer: "Van V naar mV is van groot naar klein: het getal wordt groter, × 1000. Controle: een kleine eenheid geeft een groot getal." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Is een spanningsbron <b>veilig</b>? Niet de spanning zelf doet pijn, maar de <b>stroom die door je lichaam gaat</b>. Hoe hoger de spanning, hoe groter die stroom kan worden. Vuistregel: <b>tot 24 V is veilig</b> om aan te raken.",
        "Veilig: knoopcel en staafbatterij (1,5 tot 3 V), oplaadbare batterij (1,2 V), blokbatterij (9 V), auto- of scooteraccu (12 V) en boormachine-accu (14,4 tot 18 V). Let op bij de <b>accu</b>: aanraken mag, maar maak <b>geen kortsluiting</b> (plus en min met een draad verbinden), dan wordt die draad gloeiend heet. <b>Onveilig</b>: het stopcontact (<b>230 V, levensgevaarlijk</b>) en de bovenleiding van de trein (1500 V en meer).",
        "Je telefoon werkt op 5 V, een laptop op ± 19 V. Op 230 V zouden ze kapotgaan. Daarom zit er een <b>adapter</b> tussen: het blokje van je oplader. Daarin zit een <b>transformator</b> die 230 V omzet naar de lage spanning. Op het blokje staat bijvoorbeeld: <b>input 230 V, output 5 V</b>.",
        "Baas <b>De Spanningsstromer</b> denkt dat spanning en stroom hetzelfde zijn. Tegenbewijs: een losse batterij heeft 1,5 V, maar er loopt 0 A. Net als een dichtgeknepen ballon: wel druk, geen stroming. Spanning is de duw, stroom ontstaat pas als de kring dicht is."
      ],
      regel: "Tot 24 V is veilig, 230 V is levensgevaarlijk; een adapter met transformator zet 230 V om naar de lage spanning van je apparaat.",
      voorbeelden: [
        { en: "auto-accu 12 V", nl: "veilig om aan te raken", let: "<b>let op</b>: nooit plus en min met een draad verbinden (kortsluiting)." },
        { en: "input 230 V, output 5 V", nl: "de adapter zet de netspanning om naar 5 V voor je telefoon", let: "<b>let op</b>: in de adapter zit een transformator." },
        { en: "zaklamp uit: 3 V en 0 A", nl: "duw is er, beweging niet", let: "<b>let op</b>: volt en ampère zijn twee verschillende dingen." }
      ],
      vragen: [
        { t: "sleep", opgave: "Veilig om aan te raken of onveilig?",
          chips: [ {t:"knoopcel 3 V", bak:"v"}, {t:"blokbatterij 9 V", bak:"v"}, {t:"auto-accu 12 V", bak:"v"},
                   {t:"boormachine-accu 18 V", bak:"v"}, {t:"stopcontact 230 V", bak:"o"}, {t:"bovenleiding trein 1500 V", bak:"o"} ],
          bakjes: [ {id:"v", label:"Veilig", som:"tot 24 V"},
                    {id:"o", label:"Onveilig", som:"boven 24 V"} ],
          w: "De grens is 24 V. Alles tot en met de boormachine-accu (18 V) is veilig, het stopcontact en de bovenleiding niet.",
          meer: "Bij de auto-accu wel opletten: aanraken mag, kortsluiting maken niet. Dan wordt de draad gloeiend heet." },

        { t: "mc", q: "Wat is bij elektriciteit eigenlijk het gevaar voor je lichaam?",
          o: ["de stroom die er door je lichaam heen gaat", "de spanning, ook als er niets loopt", "de lading die in je lichaam achterblijft", "het plastic om het snoer heen"],
          a: "de stroom die er door je lichaam heen gaat",
          fout: {
            "de spanning, ook als er niets loopt": "Een spanning zonder stroom doet niets: een losse batterij van 9 V in je hand voel je niet. Spanning is gevaarlijk omdat hoge spanning een grote stroom door je lichaam kan duwen.",
            "de lading die in je lichaam achterblijft": "Lading blijft niet achter, ze gaat rond. Het gevaar is de stroom die op dat moment door je heen gaat.",
            "het plastic om het snoer heen": "Het plastic is een isolator: het beschermt je juist tegen de stroom."
          },
          w: "Het gevaar is de stroom door je lichaam. Hoe hoger de spanning, hoe groter die stroom kan worden.",
          meer: "Daarom de vuistregel: tot 24 V is de duw te klein om een gevaarlijke stroom door je lichaam te krijgen." },

        { t: "mc", q: "De polen van een auto-accu (12 V) mag je aanraken. Wat mag je <b>nooit</b> doen?",
          o: ["de polen kortsluiten met een draad", "de accu met droge handen aanraken", "de spanning meten met een voltmeter", "de accu opladen met een oplader"],
          a: "de polen kortsluiten met een draad",
          fout: {
            "de accu met droge handen aanraken": "12 V is onder de 24 V, dus aanraken is veilig. Het gevaar zit in kortsluiting, niet in je handen.",
            "de spanning meten met een voltmeter": "Een voltmeter over de plus en min zetten is precies hoe je spanning meet. Dat is veilig.",
            "de accu opladen met een oplader": "Een accu is juist gemaakt om op te laden: de stroom loopt dan de andere kant op en de stoffen komen terug."
          },
          w: "Kortsluiting (plus en min direct met een draad verbinden) laat een enorme stroom lopen: de draad wordt gloeiend heet.",
          meer: "De spanning van 12 V is veilig voor je lichaam, maar een accu kan heel veel stroom leveren als er niets tussen zit." },

        { t: "mc", q: "Wat zit er in de adapter van een oplader dat 230 V omzet naar 5 V?",
          o: ["een transformator", "een condensator", "een kleine accu", "een voltmeter"],
          a: "een transformator",
          fout: {
            "een condensator": "Een condensator slaat lading op en levert geen constante spanning. Het omzetten van 230 V naar 5 V doet een transformator.",
            "een kleine accu": "Een accu is een spanningsbron, geen omzetter. De adapter haalt zijn energie uit het stopcontact.",
            "een voltmeter": "Een voltmeter (spanningsmeter) meet alleen, hij verandert niets aan de spanning."
          },
          w: "In de adapter zit een transformator: die zet de netspanning om naar de lage spanning van het apparaat.",
          meer: "Op het blokje lees je het af: input 230 V (wat erin gaat), output 5 V (wat eruit komt)." },

        { t: "mc", q: "Op een adapter staat: <b>input 230 V, output 5 V</b>. Wat betekent dat?",
          o: ["Hij krijgt 230 V uit het stopcontact en geeft 5 V af", "Hij krijgt 5 V uit het stopcontact en geeft 230 V af", "Je telefoon kan op 230 V en op 5 V werken", "Hij laat 230 A door en houdt 5 A over"],
          a: "Hij krijgt 230 V uit het stopcontact en geeft 5 V af",
          fout: {
            "Hij krijgt 5 V uit het stopcontact en geeft 230 V af": "Andersom! Input is wat erin gaat: het stopcontact geeft 230 V. Output is wat eruit komt: 5 V voor je telefoon.",
            "Je telefoon kan op 230 V en op 5 V werken": "Je telefoon werkt alleen op 5 V. Op 230 V gaat hij kapot. Daarom is de adapter er.",
            "Hij laat 230 A door en houdt 5 A over": "V is volt (spanning), geen ampère (stroom). Het gaat over de duw: 230 V erin, 5 V eruit."
          },
          w: "Input = wat erin gaat (230 V uit het stopcontact). Output = wat eruit komt (5 V naar je telefoon).",
          meer: "Bij een laptop staat er vaak output ± 19 V. Elk apparaat heeft zijn eigen spanning nodig." },

        { t: "mc", q: "Een zaklamp met batterijen van samen 3 V staat <b>uit</b> (schakelaar open). Wat meet je?",
          o: ["over de batterijen 3 V, in de kring 0 A", "over de batterijen 0 V, in de kring 0 A", "over de batterijen 3 V, in de kring 3 A", "over de batterijen 0 V, in de kring 3 A"],
          a: "over de batterijen 3 V, in de kring 0 A",
          fout: {
            "over de batterijen 0 V, in de kring 0 A": "De stroom klopt (0 A, de kring is open), maar de batterijen houden hun duw: de spanningsmeter geeft 3 V.",
            "over de batterijen 3 V, in de kring 3 A": "De spanning klopt, maar met een open schakelaar kan de lading niet rond: 0 A. En volt is toch geen ampère.",
            "over de batterijen 0 V, in de kring 3 A": "Allebei omgedraaid. Er is wel duw (3 V) maar geen beweging (0 A), net als een dichtgeknepen ballon."
          },
          w: "De duw van 3 V blijft, maar de open schakelaar houdt de lading tegen: 0 A.",
          meer: "Spanning en stroom zijn twee dingen. Schakelaar dicht: dan pas gaat er stroom lopen en brandt de lamp." },

        { t: "open", q: "Leg uit waarom een batterij van 1,5 V die los in je la ligt wel spanning heeft, maar geen stroom levert. Gebruik het ballonmodel.", punten: 2,
          modelantwoord: "Spanning is de duw van de batterij: die is er altijd, dus je meet 1,5 V. Stroom is lading die rondgaat, en dat kan alleen in een gesloten kring. Los in de la is er geen kring, dus 0 A. Net als een dichtgeknepen ballon: wel druk, maar er stroomt geen lucht.",
          sleutelwoorden: [ {moet:["spanning"], syn:["duw","druk","volt"]}, {moet:["kring"], syn:["gesloten","rondje","rond","dicht"]}, {moet:["ballon"], syn:["dichtgeknepen","dichtknijpen","lucht"]} ],
          rubric: ["Spanning is de duw en die is er ook zonder kring (1,5 V)", "Stroom is bewegende lading en vraagt een gesloten kring; vergelijking met de dichtgeknepen ballon"],
          w: "Spanning = duw (er altijd), stroom = beweging (alleen in een gesloten kring).",
          meer: "Gebruik in je antwoord twee kanten: wat spanning is én wat stroom nodig heeft. Dan heb je beide punten." },

        { t: "mc", q: "Waarom kun je je telefoon niet rechtstreeks op 230 V aansluiten?",
          o: ["Hij werkt op 5 V en zou kapotgaan", "Dan loopt er te weinig stroom om op te laden", "Een stopcontact levert te weinig spanning", "Een telefoon heeft geen pluspool en minpool"],
          a: "Hij werkt op 5 V en zou kapotgaan",
          fout: {
            "Dan loopt er te weinig stroom om op te laden": "Juist te veel: 230 V is 46 keer zo veel duw als de 5 V die je telefoon nodig heeft.",
            "Een stopcontact levert te weinig spanning": "Andersom: 230 V is veel meer dan 5 V. Daarom moet de adapter de spanning omlaag brengen.",
            "Een telefoon heeft geen pluspool en minpool": "Ook in je telefoon zit een accu met een plus en een min. Het probleem is de veel te hoge spanning."
          },
          w: "Je telefoon werkt op 5 V. 230 V is veel te veel: daarom zit er een adapter met transformator tussen.",
          meer: "Een laptop werkt op ± 19 V. Ook die heeft zijn eigen adapter." },

        { t: "bouw", q: "Een boormachine-accu van 18 V bestaat uit cellen van 3,6 V die in serie staan. Hoeveel cellen zijn dat? (alleen het getal)", a: "5",
          w: "18 / 3,6 = 5 cellen. Controle: 5 × 3,6 = 18 V.",
          meer: "In serie tel je op, dus andersom deel je: totale spanning / spanning van één cel = aantal cellen." },

        { t: "mc", q: "Storm koopt met haar moeder een nieuwe oplader. Op het doosje staat <b>output 5 V</b>. Wat vertelt die 5 V?",
          o: ["hoe hard de oplader de lading duwt", "hoeveel lading er per seconde naar je telefoon gaat", "hoeveel lading er in de oplader zit", "hoeveel uur het opladen ongeveer duurt"],
          a: "hoe hard de oplader de lading duwt",
          fout: {
            "hoeveel lading er per seconde naar je telefoon gaat": "Dat is de stroomsterkte, in ampère. Die staat er vaak ook op (bijvoorbeeld 2 A), maar volt is de duw.",
            "hoeveel lading er in de oplader zit": "Een adapter slaat geen lading op, hij zet alleen de spanning om. En volt meet de duw, niet een hoeveelheid lading.",
            "hoeveel uur het opladen ongeveer duurt": "Tijd meet je in uren of seconden, niet in volt. 5 V zegt alleen hoe groot de duw is."
          },
          w: "Volt is de eenheid van spanning: de duw op de lading.",
          meer: "Niet in de val van De Spanningsstromer lopen: volt (duw) en ampère (lading per seconde) zijn twee verschillende dingen." }
      ]
    }
  ]
};

/* ===================================================================== */
/* 2. SCHAKELINGEN                                                        */
/* ===================================================================== */
window.__TOPICS["schakelingen"] = {
  id: "schakelingen", emoji: "🔀", titel: "H4 · Schakelschema's: serie en parallel",
  kort: "Een schakelschema tekent een schakeling met vaste symbolen; in serie zit alles in één kring (één kapot, alles uit), parallel heeft elk apparaat een eigen kring op de bron, zoals in huis.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "Een <b>schakelschema</b> is een overzichtelijke tekening van een schakeling met vaste <b>symbolen</b>. Een <b>snoer</b> is een rechte lijn. Een <b>batterij</b> is een <b>lange dunne streep (pluspool)</b> naast een <b>korte dikke streep (minpool)</b>.",
        "Cirkels met iets erin: een <b>lampje</b> is een cirkel met een <b>kruis</b>, een <b>spanningsmeter</b> een cirkel met een <b>V</b>, een <b>stroommeter</b> een cirkel met een <b>A</b> en een <b>motor</b> een cirkel met een <b>M</b>. Een <b>bel</b> is een halve cirkel (koepel) op een lijn, een <b>led</b> een driehoekje met een streep en twee pijltjes naar buiten (licht), een <b>stopcontact</b> twee rondjes met een streepje.",
        "Een <b>schakelaar</b> is een lijntje met een klepje: <b>schuin = open</b> (lamp uit), <b>plat = dicht</b> (lamp aan). <b>Gelijkspanning</b> (batterij) teken je als een rechte lijn met een stippellijn eronder, <b>wisselspanning</b> (stopcontact) als een golfje <b>~</b>.",
        "Twee manieren om te schakelen. <b>Serie</b>: alles achter elkaar in <b>één kring</b>, <b>zonder vertakking</b>. <b>Parallel</b>: de schakeling <b>vertakt</b> zich, elk lampje zit in een eigen kring op de bron. Een vertakking herken je aan een punt waar drie draden samenkomen."
      ],
      regel: "Serie = één kring zonder vertakking; parallel = vertakt, elk apparaat een eigen kring op de bron.",
      voorbeelden: [
        { en: "cirkel met een kruis", nl: "lampje", let: "<b>let op</b>: cirkel met V = spanningsmeter, met A = stroommeter, met M = motor." },
        { en: "lange dunne streep + korte dikke streep", nl: "batterij: lang = plus, kort = min", let: "<b>let op</b>: de lange streep is de plus, ook al is hij dunner." },
        { en: "klepje schuin", nl: "schakelaar open: kring onderbroken", let: "<b>let op</b>: open betekent dat de lamp UIT is." }
      ],
      vragen: [
        { t: "mc", q: "Welk symbool hoort bij een <b>lampje</b>?",
          o: ["een cirkel met een kruis", "een cirkel met een A", "een cirkel met een M", "een cirkel met een V"],
          a: "een cirkel met een kruis",
          fout: {
            "een cirkel met een A": "A staat voor ampère: dat is de stroommeter.",
            "een cirkel met een M": "M staat voor motor.",
            "een cirkel met een V": "V staat voor volt: dat is de spanningsmeter."
          },
          w: "Een lampje teken je als een cirkel met een kruis erin.",
          meer: "Zie het kruis als de gloeidraad die gaat gloeien. Een letter in de cirkel betekent een meter of een motor." },

        { t: "mc", q: "In het symbool van een batterij: welke streep is de <b>pluspool</b>?",
          o: ["de lange dunne streep", "de korte dikke streep", "de streep aan de linkerkant", "de streep aan de rechterkant"],
          a: "de lange dunne streep",
          fout: {
            "de korte dikke streep": "De korte dikke streep is de minpool. Dik voelt als 'meer', maar het is andersom.",
            "de streep aan de linkerkant": "Je kunt het symbool alle kanten op draaien. Kijk naar de lengte, niet naar links of rechts.",
            "de streep aan de rechterkant": "Links of rechts zegt niets: een schema mag gedraaid zijn. De lange streep is de plus."
          },
          w: "Lange dunne streep = plus, korte dikke streep = min.",
          meer: "Ezelsbruggetje: van de lange streep kun je een plusje maken door er een klein streepje door te zetten. Van de korte gaat dat niet." },

        { t: "sleep", opgave: "Wat doet het onderdeel van dit symbool?",
          chips: [ {t:"cirkel met een V", bak:"m"}, {t:"cirkel met een A", bak:"m"},
                   {t:"cirkel met een kruis", bak:"z"}, {t:"cirkel met een M", bak:"z"}, {t:"halve cirkel op een lijn", bak:"z"},
                   {t:"lijntje met een klepje", bak:"r"} ],
          bakjes: [ {id:"m", label:"Meet iets", som:"meter"},
                    {id:"z", label:"Zet energie om", som:"licht, beweging, geluid"},
                    {id:"r", label:"Zet de kring open of dicht", som:"schakelaar"} ],
          w: "V en A zijn meters. Kruis (lampje), M (motor) en de koepel (bel) zetten energie om. Het klepje is de schakelaar.",
          meer: "Een lampje maakt licht, een motor beweging, een bel geluid. De meters veranderen niets, ze kijken alleen." },

        { t: "gap", q: "Een overzichtelijke tekening van een schakeling met vaste symbolen heet een ___.", a: "schakelschema|schema", soepel: true,
          w: "Dat is een schakelschema.",
          meer: "Bij een proef bouw je de schakeling met het schema ernaast, zodat je kunt nagaan of alles op de goede plek zit." },

        { t: "mc", q: "Hoe ziet een <b>open</b> schakelaar eruit in een schema?",
          o: ["het klepje staat schuin omhoog", "het klepje ligt plat op de lijn", "er staat een kruis in een cirkel", "er staat een golfje naast"],
          a: "het klepje staat schuin omhoog",
          fout: {
            "het klepje ligt plat op de lijn": "Plat betekent dicht: de geleidende delen raken elkaar en de kring is gesloten.",
            "er staat een kruis in een cirkel": "Dat is het symbool van een lampje.",
            "er staat een golfje naast": "Een golfje (~) betekent wisselspanning."
          },
          w: "Open = klepje schuin: er zit lucht tussen, de kring is onderbroken.",
          meer: "Lucht is een isolator. Daarom gaat de lamp uit als het klepje omhoog staat." },

        { t: "mc", q: "Welk symbool betekent <b>wisselspanning</b>?",
          o: ["een golfje ~", "een rechte lijn met een stippellijn eronder", "een cirkel met een V", "twee rondjes met een streepje"],
          a: "een golfje ~",
          fout: {
            "een rechte lijn met een stippellijn eronder": "Dat is gelijkspanning, zoals uit een batterij.",
            "een cirkel met een V": "Dat is de spanningsmeter: die meet spanning, het is zelf geen spanning.",
            "twee rondjes met een streepje": "Dat is het stopcontact. Het stopcontact geeft wel wisselspanning, maar het symbool voor wisselspanning is het golfje."
          },
          w: "Wisselspanning = golfje (~). Gelijkspanning = rechte lijn met stippellijn.",
          meer: "Het golfje laat zien dat de spanning steeds heen en weer wisselt. Dat doet het stopcontact." },

        { t: "mc", q: "Wat is een <b>serieschakeling</b>?",
          o: ["één kring, alles achter elkaar", "elk lampje een eigen kring op de bron", "een schakeling met twee of meer batterijen", "een kring waarin de stroom zich splitst"],
          a: "één kring, alles achter elkaar",
          fout: {
            "elk lampje een eigen kring op de bron": "Dat is een parallelschakeling.",
            "een schakeling met twee of meer batterijen": "Batterijen kun je in serie zetten, maar een serieschakeling gaat over hoe de onderdelen verbonden zijn: achter elkaar in één rondje.",
            "een kring waarin de stroom zich splitst": "Splitsen gebeurt bij een vertakking, en dat is juist parallel."
          },
          w: "Serie: alle onderdelen achter elkaar in één stroomkring, zonder vertakkingen.",
          meer: "Volg met je vinger de draad vanaf de plus. Kom je nergens een splitsing tegen voordat je bij de min bent? Dan is het serie." },

        { t: "gap", q: "In een parallelschakeling ___ de schakeling zich: elk lampje krijgt een eigen kring.", a: "vertakt|splitst", soepel: true,
          w: "Parallel = vertakt.",
          meer: "Een vertakkingspunt is een plek waar één draad zich in twee (of meer) draden splitst." },

        { t: "vb", opgave: "Drie lampjes staan in serie op een batterij. Lampje 2 (in het midden) brandt door. Wat gebeurt er met lampje 1 en lampje 3?",
          stappen: [
            { toon: "Serie = één kring", uitleg: "De lading moet door alle drie de lampjes heen om rond te komen." },
            { toon: "Lampje 2 kapot = gat in de kring", uitleg: "Een doorgebrand lampje werkt als een open schakelaar: de kring is onderbroken." },
            { toon: "Alles tegelijk uit", uitleg: "De lading kan nergens meer rond: overal 0 A. Lampje 1 en 3 gaan allebei uit, ook lampje 1 dat 'ervoor' zit." }
          ],
          waarom: { q: "Waarom gaat ook lampje 1 uit, dat vóór het kapotte lampje zit?",
            o: ["De lading gaat overal tegelijk rond: stopt hij op één plek, dan stopt hij overal", "Lampje 1 krijgt de stroom pas nadat lampje 2 hem heeft doorgegeven", "Lampje 1 gaat juist feller branden, omdat lampje 2 niets meer gebruikt"],
            a: "De lading gaat overal tegelijk rond: stopt hij op één plek, dan stopt hij overal" },
          fout: {
            "Lampje 1 krijgt de stroom pas nadat lampje 2 hem heeft doorgegeven": "Dit is De Volger. Stroom is geen estafette. De bolletjes lading zitten al overal in de draad en bewegen allemaal tegelijk, als een ketting.",
            "Lampje 1 gaat juist feller branden, omdat lampje 2 niets meer gebruikt": "Met een gat in de kring loopt er nergens stroom, dus lampje 1 kan helemaal niet branden."
          },
          w: "In serie gaat bij één kapot lampje alles tegelijk uit, waar het kapotte lampje ook zit.",
          meer: "Denk aan een fietsketting: houd je hem op één plek vast, dan staat hij overal stil." },

        { t: "mc", q: "Twee lampjes staan in serie. Je draait het <b>tweede</b> lampje los. Wat doet het eerste?",
          o: ["Het gaat uit", "Het blijft gewoon branden", "Het gaat feller branden", "Het gaat zwakker branden"],
          a: "Het gaat uit",
          fout: {
            "Het blijft gewoon branden": "Dat denkt De Volger: 'het eerste lampje merkt niet wat het tweede doet'. Maar in serie is er maar één kring. Gat erin, dan staat alles stil: 0 A.",
            "Het gaat feller branden": "Er loopt helemaal geen stroom meer: de kring is open. Dan kan niets branden.",
            "Het gaat zwakker branden": "Niet een beetje minder: helemaal niets. De kring is open, dus 0 A door elk lampje."
          },
          w: "Losdraaien maakt een gat in de enige kring: het eerste lampje gaat ook uit.",
          meer: "Daarom is serie niet handig voor lampen: één kapot, alles uit." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "In een <b>serieschakeling</b> gaat alles aan of alles uit. Gaat er één lampje stuk, dan is de kring verbroken en gaan <b>alle</b> lampjes uit. Een <b>schakelaar</b> zet je juist wel <b>in serie</b> met het apparaat dat je wilt bedienen: schakelaar open, kring open, lamp uit.",
        "In een <b>parallelschakeling</b> is elk lampje <b>rechtstreeks op de spanningsbron</b> aangesloten. Bij drie lampjes zijn er dus <b>drie stroomkringen</b>. Brandt er één door, dan <b>blijven de andere branden</b>: hun eigen kring is nog dicht.",
        "Omdat elk lampje zijn eigen kring heeft, kun je met een eigen schakelaar per tak <b>elk lampje apart</b> aan- en uitzetten.",
        "Schema lezen: begin bij de pluspool en volg de draad met je vinger. Splitst hij ergens? Dan is het (gedeeltelijk) parallel. Kom je zonder splitsing via alle onderdelen bij de min? Dan is het serie."
      ],
      regel: "Serie: één kapot, alles uit (schakelaar in serie met wat hij bedient); parallel: elk een eigen kring, één kapot en de rest blijft branden.",
      voorbeelden: [
        { en: "lichtsnoer: één lampje kapot, alles donker", nl: "de lampjes staan in serie", let: "<b>let op</b>: zoek dan het ene kapotte lampje." },
        { en: "drie lampjes parallel", nl: "drie stroomkringen", let: "<b>let op</b>: elke kring loopt van de bron door één lampje terug naar de bron." },
        { en: "schakelaar per tak", nl: "elk lampje apart aan en uit", let: "<b>let op</b>: dat kan alleen bij parallel." }
      ],
      vragen: [
        { t: "mc", q: "Drie lampjes staan <b>parallel</b>. Lampje B brandt door. Wat doen lampje A en C?",
          o: ["Ze blijven gewoon even fel branden", "Ze gaan allebei uit", "Alleen A gaat uit", "Ze gaan zwakker branden"],
          a: "Ze blijven gewoon even fel branden",
          fout: {
            "Ze gaan allebei uit": "Dat gebeurt in serie. Parallel heeft elk lampje een eigen kring op de bron. De kringen van A en C zijn nog dicht.",
            "Alleen A gaat uit": "A en C hebben elk hun eigen kring. B kapot maakt alleen de kring van B open.",
            "Ze gaan zwakker branden": "Ze krijgen elk nog steeds de volle duw van de batterij in hun eigen kring. Ze branden even fel als eerst."
          },
          w: "Parallel: elke tak is een eigen kring. B kapot raakt A en C niet.",
          meer: "Zo staan ook de lampen in je huis: brandt de lamp in de keuken door, dan blijft het licht in je kamer gewoon aan." },

        { t: "mc", q: "Waar zet je een schakelaar die één lamp aan en uit moet zetten?",
          o: ["in serie met die lamp", "parallel naast die lamp", "alleen vlak bij de minpool", "aan de pluspool, nooit aan de min"],
          a: "in serie met die lamp",
          fout: {
            "parallel naast die lamp": "Dan gaat de lading bij een dichte schakelaar om de lamp heen, door de schakelaar. Dat is kortsluiting. Een schakelaar hoort in serie met zijn lamp.",
            "alleen vlak bij de minpool": "Waar in de kring hij zit, maakt niet uit, zolang hij maar in dezelfde kring zit als de lamp (in serie).",
            "aan de pluspool, nooit aan de min": "Plus of min maakt niet uit. In serie is er één kring, dus open = overal 0 A."
          },
          w: "Een schakelaar zet je in serie met het apparaat dat hij bedient.",
          meer: "In serie: schakelaar open, de enige kring is onderbroken, lamp uit. Schakelaar dicht, kring gesloten, lamp aan." },

        { t: "sleep", opgave: "Hoort dit bij serie of bij parallel?",
          chips: [ {t:"één lampje kapot, alles uit", bak:"s"}, {t:"geen vertakkingen", bak:"s"}, {t:"schakelaar met de lamp die hij bedient", bak:"s"},
                   {t:"lampjes achter elkaar in één rondje", bak:"s"},
                   {t:"elk lampje een eigen kring", bak:"p"}, {t:"elk lampje apart aan en uit", bak:"p"}, {t:"stopcontacten in huis", bak:"p"},
                   {t:"remlicht en koplamp van een auto", bak:"p"} ],
          bakjes: [ {id:"s", label:"Serie", som:"één kring"},
                    {id:"p", label:"Parallel", som:"vertakt"} ],
          w: "Serie: één kring, alles samen aan of uit. Parallel: vertakt, elk apparaat los.",
          meer: "De schakelaar is de plek waar serie juist handig is: hij moet de kring van zijn lamp kunnen openen." },

        { t: "mc", q: "Hoeveel stroomkringen zijn er als drie lampjes <b>parallel</b> op één batterij staan?",
          o: ["drie", "één", "twee", "zes"], a: "drie",
          fout: {
            "één": "Eén kring is serie. Parallel heeft elk lampje een eigen kring: van de bron, door dat ene lampje, terug naar de bron.",
            "twee": "Tel de lampjes: elk lampje is rechtstreeks op de bron aangesloten, dus elk heeft een eigen kring. Drie lampjes, drie kringen.",
            "zes": "Je telt per lampje één kring (heen en terug samen), niet elk snoer apart."
          },
          w: "Elk lampje rechtstreeks op de bron = een eigen kring. Drie lampjes, drie kringen.",
          meer: "Volg met je vinger: vanaf de plus kun je drie verschillende rondjes maken, elk door één lampje." },

        { t: "mc", q: "Storm hangt met haar moeder een lichtsnoer op in haar kamer. Eén lampje gaat kapot en het hele snoer is donker. Hoe zijn de lampjes geschakeld?",
          o: ["in serie", "parallel", "op een te lage spanning", "met een kapotte schakelaar"],
          a: "in serie",
          fout: {
            "parallel": "Parallel zouden de andere lampjes blijven branden: elk heeft een eigen kring.",
            "op een te lage spanning": "Te weinig spanning maakt alle lampjes zwakker, maar ze gaan niet uit precies op het moment dat er één kapotgaat.",
            "met een kapotte schakelaar": "Het snoer werkte tot dat ene lampje kapotging. Dan is dat lampje het gat in de kring, niet de schakelaar."
          },
          w: "Eén kapot, alles uit: dat is serie.",
          meer: "Tip: bij zo'n snoer zoek je het ene kapotte lampje. Vervang je dat, dan branden ze weer allemaal." },

        { t: "sequence", q: "Je bouwt een serieschakeling met een batterij, een schakelaar en twee lampjes. Zet de draden in de goede volgorde, beginnend bij de pluspool.",
          stappen: ["draad van de pluspool naar de schakelaar", "draad van de schakelaar naar lampje 1", "draad van lampje 1 naar lampje 2", "draad van lampje 2 terug naar de minpool"],
          w: "In serie zit alles achter elkaar in één rondje: plus, schakelaar, lampje 1, lampje 2, min.",
          meer: "De laatste draad terug naar de minpool vergeten is een veelgemaakte fout: zonder die draad is de kring niet gesloten." },

        { t: "mc", q: "In een schema splitst de draad van de pluspool zich bij een punt in twee draden. Elke draad gaat door een eigen lampje. Daarna komen ze weer samen en gaan terug naar de min. Wat is dit?",
          o: ["een parallelschakeling", "een serieschakeling", "een kortsluiting", "een open kring"],
          a: "een parallelschakeling",
          fout: {
            "een serieschakeling": "In serie splitst niets. Hier is een vertakkingspunt: dus parallel.",
            "een kortsluiting": "Kortsluiting is plus en min verbinden zonder iets ertussen. Hier zit in elke tak een lampje.",
            "een open kring": "Beide takken lopen door tot de min, dus de kringen zijn gesloten."
          },
          w: "Een vertakking waarbij elke tak een eigen lampje heeft = parallel.",
          meer: "Het punt waar de draad splitst heet het vertakkingspunt. Daar splitst ook de stroom." },

        { t: "gap", q: "Een lamp heeft twee schakelaars die in serie staan. Om de lamp te laten branden, moeten er ___ dicht zijn.", a: "twee|2|allebei|beide|beiden", soepel: true,
          w: "In serie moeten alle schakelaars dicht zijn: één open en de kring is onderbroken.",
          meer: "Zo werkt bijvoorbeeld een veiligheidsschakeling: pas als beide knoppen dicht zijn, gaat het apparaat aan." },

        { t: "mc", q: "Twee lampjes staan parallel, elk met een eigen schakelaar. Je zet schakelaar 1 open. Wat gebeurt er?",
          o: ["Lampje 1 uit, lampje 2 blijft aan", "Allebei de lampjes gaan uit", "Lampje 2 uit, lampje 1 blijft aan", "Lampje 1 uit, lampje 2 gaat feller"],
          a: "Lampje 1 uit, lampje 2 blijft aan",
          fout: {
            "Allebei de lampjes gaan uit": "Dat zou in serie gebeuren. Hier heeft elk lampje een eigen kring, en schakelaar 1 opent alleen de kring van lampje 1.",
            "Lampje 2 uit, lampje 1 blijft aan": "Andersom. Schakelaar 1 zit in de tak van lampje 1, dus die gaat uit.",
            "Lampje 1 uit, lampje 2 gaat feller": "Lampje 2 krijgt nog steeds dezelfde duw van de batterij in zijn eigen kring. Het brandt even fel als eerst."
          },
          w: "Elke schakelaar bedient alleen de tak waar hij in zit.",
          meer: "Zo werken de lichtknoppen in huis: elke knop zit in serie met zijn eigen lamp, en de lampen staan parallel." },

        { t: "mc", q: "Waarom is een serieschakeling niet handig voor de lampen in je huis?",
          o: ["Gaat er één kapot, dan zit je overal in het donker", "Dan krijgt elke lamp juist veel te veel spanning", "Een serieschakeling kan niet op 230 V werken", "In serie kunnen lampen niet zonder adapter"],
          a: "Gaat er één kapot, dan zit je overal in het donker",
          fout: {
            "Dan krijgt elke lamp juist veel te veel spanning": "In serie moeten de lampen de duw juist samen delen. Te veel is het probleem niet.",
            "Een serieschakeling kan niet op 230 V werken": "Ook op 230 V kun je iets in serie zetten. Het nadeel is dat alles tegelijk uitgaat als er één kapotgaat.",
            "In serie kunnen lampen niet zonder adapter": "Een adapter heeft niets te maken met serie of parallel. Hij zet alleen 230 V om naar een lagere spanning."
          },
          w: "In serie: één lamp kapot, kring open, alle lampen uit.",
          meer: "Daarnaast kun je in serie de lampen niet apart aan- en uitzetten. Dat zijn precies de redenen dat in huis alles parallel staat." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Alle <b>stopcontacten en lampen in huis</b> staan <b>parallel</b>. Drie redenen: elk apparaat krijgt de <b>volle netspanning van 230 V</b>, je kunt elk apparaat <b>apart aan- en uitzetten</b>, en gaat er één stuk, dan <b>blijven de andere werken</b>. Ook de lampen van een auto (knipperlicht, remlicht, koplamp) staan parallel.",
        "Baas <b>De Volger</b> denkt dat stroom als een estafette gaat: 'het eerste lampje merkt niet wat het tweede doet'. Fout: de lading zit al overal in de draad en beweegt overal tegelijk, als een fietsketting. Daarom gaat in serie bij één kapot lampje <b>alles tegelijk</b> uit, ook het lampje dat 'ervoor' zit.",
        "Instinker: een schakeling kan deels serie en deels parallel zijn. Zit een lampje of schakelaar in het <b>onvertakte deel</b> (vóór de splitsing), dan gaat alle stroom erdoor: kapot of open = <b>alles uit</b>. Zit hij in een <b>tak</b>, dan gaat alleen die tak uit.",
        "Werkwijze: volg vanaf de plus de draad. Vraag bij elk onderdeel: loopt <b>alle</b> lading hierdoorheen (onvertakt deel), of maar een deel (een tak)?"
      ],
      regel: "In huis staat alles parallel (volle 230 V, apart aan en uit, één kapot en de rest werkt); een onderdeel in het onvertakte deel stopt bij een onderbreking alles.",
      voorbeelden: [
        { en: "6 lampen parallel op 230 V", nl: "elke lamp krijgt 230 V", let: "<b>let op</b>: niet 230 / 6. Parallel krijgt elke tak de volle spanning." },
        { en: "lampje vóór de splitsing kapot", nl: "alles uit", let: "<b>let op</b>: alle lading moest door dat lampje." },
        { en: "remlicht links kapot", nl: "remlicht rechts en koplampen werken nog", let: "<b>let op</b>: autolampen staan parallel." }
      ],
      vragen: [
        { t: "open", q: "Leg uit waarom de stopcontacten en lampen in huis parallel geschakeld zijn. Noem twee redenen.", punten: 2,
          modelantwoord: "Parallel heeft elk apparaat een eigen kring op de netspanning. Daardoor krijgt elk apparaat de volle 230 V, kun je elk apparaat apart aan- en uitzetten, en blijven de andere werken als er één kapotgaat.",
          sleutelwoorden: [ {moet:["230"], syn:["volle spanning","netspanning","hele spanning"]}, {moet:["apart"], syn:["los","eigen schakelaar","aan en uit","aanzetten","uitzetten"]}, {moet:["kapot"], syn:["stuk","doorbrandt","blijven werken","blijft werken"]} ],
          rubric: ["Eén reden: volle 230 V per apparaat, of elk apparaat apart aan en uit", "Tweede reden: gaat er één stuk, dan blijven de andere werken (of een andere van de drie redenen)"],
          w: "Volle 230 V per apparaat, apart aan en uit, en één kapot betekent niet alles kapot.",
          meer: "Noem twee van de drie redenen in hele zinnen. 'Omdat het handig is' is niet genoeg: zeg wát er handig aan is." },

        { t: "mc", q: "Anna zegt: 'In serie krijgt het eerste lampje de stroom het eerst. Als het laatste lampje kapotgaat, blijft het eerste nog branden.' Wat klopt?",
          o: ["Alles gaat tegelijk uit: de lading stopt overal tegelijk", "Het eerste lampje blijft branden tot de batterij leeg is", "Het eerste brandt nog even na, het laatste is meteen uit", "Alleen het laatste gaat uit, want daar zit het gat"],
          a: "Alles gaat tegelijk uit: de lading stopt overal tegelijk",
          fout: {
            "Het eerste lampje blijft branden tot de batterij leeg is": "Dit is De Volger. Er is maar één kring. Met een gat erin kan de lading nergens rond, dus ook door het eerste lampje loopt 0 A.",
            "Het eerste brandt nog even na, het laatste is meteen uit": "De lading staat overal tegelijk stil, net als een fietsketting die je op één plek vastpakt. Er is geen 'even na'.",
            "Alleen het laatste gaat uit, want daar zit het gat": "Waar het gat zit, maakt in serie niet uit: het is de enige kring, dus alles gaat uit."
          },
          w: "In serie stopt de lading overal tegelijk als de kring ergens open is.",
          meer: "De bolletjes lading zitten al in de hele draad. Ze schuiven samen op, of ze staan samen stil." },

        { t: "mc", q: "Bij een auto brandt het linker remlicht door. Wat doen het rechter remlicht en de koplampen?",
          o: ["Ze blijven werken", "Ze gaan allemaal uit", "Alleen de koplampen gaan uit", "Ze branden allemaal feller"],
          a: "Ze blijven werken",
          fout: {
            "Ze gaan allemaal uit": "Dat zou in serie gebeuren. Autolampen staan parallel: elke lamp heeft een eigen kring op de accu.",
            "Alleen de koplampen gaan uit": "De koplampen zitten in een eigen kring, los van het remlicht. Die merken niets.",
            "Ze branden allemaal feller": "Elke lamp krijgt de volle 12 V van de accu in zijn eigen kring, net als eerst. Ze branden even fel."
          },
          w: "Autolampen staan parallel: één kapot, de rest werkt gewoon.",
          meer: "Handig, want met één kapot remlicht zien anderen nog steeds dat je remt." },

        { t: "mc", q: "Een lamp staat in serie met schakelaar S. Die twee samen staan parallel met een bel. Je zet S open. Wat gebeurt er?",
          o: ["De lamp gaat uit, de bel blijft rinkelen", "De lamp en de bel stoppen allebei", "De bel stopt, de lamp blijft branden", "De lamp blijft aan, de bel rinkelt harder"],
          a: "De lamp gaat uit, de bel blijft rinkelen",
          fout: {
            "De lamp en de bel stoppen allebei": "De bel zit in een eigen tak, zonder S. Zijn kring blijft dicht.",
            "De bel stopt, de lamp blijft branden": "Andersom: S zit in de tak van de lamp. Die tak gaat open.",
            "De lamp blijft aan, de bel rinkelt harder": "S open betekent: de kring van de lamp is onderbroken, dus de lamp gaat uit. De bel krijgt dezelfde duw als eerst."
          },
          w: "S zit in de tak van de lamp: alleen die tak gaat open.",
          meer: "Vraag bij een schakelaar altijd: in welke kring zit hij? Alleen die kring kan hij openen." },

        { t: "mc", q: "Drie lampjes staan parallel. In het onvertakte deel, vlak bij de batterij, zit één schakelaar. Hij gaat open. Wat gebeurt er?",
          o: ["Alle drie de lampjes gaan uit", "Alleen het dichtstbijzijnde lampje gaat uit", "Alle lampjes blijven branden", "Alleen het verste lampje blijft branden"],
          a: "Alle drie de lampjes gaan uit",
          fout: {
            "Alleen het dichtstbijzijnde lampje gaat uit": "De schakelaar zit vóór de splitsing. Alle lading voor alle takken moet erdoor. Open = alles uit.",
            "Alle lampjes blijven branden": "Parallel blijven lampjes branden als een ándere tak opengaat. Maar deze schakelaar zit in het deel waar alle stroom doorheen moet.",
            "Alleen het verste lampje blijft branden": "Afstand maakt niet uit. Wat telt: zit het onderdeel in het onvertakte deel (alles) of in een tak (alleen die tak)?"
          },
          w: "Een schakelaar in het onvertakte deel bedient alles tegelijk.",
          meer: "Zo werkt de hoofdschakelaar in de meterkast: zet je die uit, dan is het hele huis stroomloos." },

        { t: "sleep", opgave: "Welk onderdeel hoort bij dit symbool?",
          chips: [ {t:"cirkel met een M", bak:"mo"}, {t:"halve cirkel (koepel) op een lijn", bak:"be"},
                   {t:"driehoekje met streep en twee pijltjes naar buiten", bak:"le"}, {t:"twee rondjes met een streepje", bak:"st"} ],
          bakjes: [ {id:"mo", label:"Motor", som:"beweging"}, {id:"be", label:"Bel", som:"geluid"},
                    {id:"le", label:"Led", som:"licht"}, {id:"st", label:"Stopcontact", som:"230 V"} ],
          w: "M = motor, koepel = bel, driehoek met pijltjes = led, twee rondjes = stopcontact.",
          meer: "De pijltjes bij de led wijzen naar buiten: daar komt licht uit. De twee rondjes zijn de twee gaatjes van het stopcontact." },

        { t: "mc", q: "Schema: van de pluspool gaat de draad eerst door lampje A. Daarna splitst hij naar lampje B en lampje C, die weer samenkomen en terug gaan naar de min. Lampje A brandt door. Wat gebeurt er?",
          o: ["Alle drie gaan uit", "Alleen A gaat uit", "B en C gaan feller branden", "Alleen B blijft branden"],
          a: "Alle drie gaan uit",
          fout: {
            "Alleen A gaat uit": "Instinker! A zit in het onvertakte deel: alle lading voor B en C moet eerst door A. A kapot = gat in het stuk dat iedereen nodig heeft.",
            "B en C gaan feller branden": "Er komt helemaal geen lading meer bij B en C, want die moest door A. Ze gaan uit.",
            "Alleen B blijft branden": "B en C zitten allebei achter A. Zonder A is er voor geen van beide een gesloten kring."
          },
          w: "A zit vóór de splitsing (onvertakt). A kapot betekent alles uit.",
          meer: "Volg met je vinger: is er een weg van plus naar min die níet door A gaat? Nee. Dan gaat alles uit." },

        { t: "mc", q: "Zelfde schema: eerst lampje A, dan een splitsing naar B en C. Nu brandt lampje <b>B</b> door. Wat gebeurt er?",
          o: ["A en C blijven branden", "Alle drie gaan uit", "Alleen A blijft branden", "Alleen C blijft branden"],
          a: "A en C blijven branden",
          fout: {
            "Alle drie gaan uit": "B zit in een tak. Er is nog een weg van plus naar min: door A en dan door C. Die kring is dicht.",
            "Alleen A blijft branden": "Als C uit zou gaan, kon de lading na A nergens meer heen. Juist doordat C nog werkt, brandt A ook.",
            "Alleen C blijft branden": "De lading voor C komt eerst door A. Brandt C, dan loopt er ook stroom door A."
          },
          w: "B zit in een tak. De kring plus, A, C, min is nog dicht: A en C blijven branden.",
          meer: "Ze branden wel iets anders fel dan eerst, maar dat hoef je niet te kunnen beredeneren. Belangrijk: ze blijven aan." },

        { t: "mc", q: "Storm tekent een schema voor haar werkstuk: twee lampjes, een batterij en één schakelaar. Ze wil elk lampje apart aan en uit kunnen zetten. Wat moet ze doen?",
          o: ["elk lampje een eigen tak met eigen schakelaar", "de schakelaar tussen de twee lampjes in zetten", "een tweede batterij in serie erbij zetten", "de lampjes in serie zetten met de schakelaar ervoor"],
          a: "elk lampje een eigen tak met eigen schakelaar",
          fout: {
            "de schakelaar tussen de twee lampjes in zetten": "Staan de lampjes in serie, dan zet die schakelaar ze altijd samen aan en uit. Waar hij in het rondje zit, maakt niet uit.",
            "een tweede batterij in serie erbij zetten": "Meer batterijen geven meer spanning, maar je kunt de lampjes dan nog steeds niet apart bedienen.",
            "de lampjes in serie zetten met de schakelaar ervoor": "In serie is er één kring: één schakelaar zet alles tegelijk aan of uit. Apart kan alleen parallel."
          },
          w: "Apart bedienen kan alleen parallel: elk lampje een eigen tak, met een schakelaar in serie in die tak.",
          meer: "Ze heeft dus twee schakelaars nodig, één per tak. Precies zoals de lichtknoppen thuis." },

        { t: "bouw", q: "In huis hangen 6 lampen parallel op het stopcontact van 230 V. Hoeveel volt krijgt elke lamp? (alleen het getal)", a: "230",
          w: "Parallel krijgt elke tak de volle spanning: elke lamp 230 V.",
          meer: "Instinker: niet 230 / 6 doen. Elke lamp zit rechtstreeks op het net, dus elke lamp krijgt de volle duw." }
      ]
    }
  ]
};

/* ===================================================================== */
/* 3. STROOM REDENEREN                                                    */
/* ===================================================================== */
window.__TOPICS["stroom-redeneren"] = {
  id: "stroom-redeneren", emoji: "🧮", titel: "H4 · Stroomsterkte beredeneren",
  kort: "Eerst kijken of er een vertakking is: in serie is de stroomsterkte overal gelijk, parallel is het totaal de som van de takken en loopt dat totaal in het onvertakte deel.",
  niveaus: [
    {
      n: 1, naam: "Brons",
      uitleg: [
        "<b>Stap 1</b>: is het serie of parallel? Zoek een <b>vertakking</b>: een punt waar een draad zich splitst.",
        "<b>Serie</b>: de stroomsterkte is <b>overal even groot</b>. Meet je vóór het lampje 0,3 A, dan meet je erna ook 0,3 A. De lading gaat niet op in het lampje. <b>Energie wordt omgezet, lading niet.</b> Denk aan bolletjes lading die overal tegelijk rondgaan.",
        "<b>Parallel</b>: bij het <b>splitsingspunt</b> verdeelt de stroom zich over de takken. Wat binnenkomt, gaat er ook weer uit. Dus: <b>totale stroomsterkte = de takken bij elkaar opgeteld</b>.",
        "Het totaal loopt in het <b>onvertakte deel</b>: bij de batterij, vóór de splitsing en na het punt waar de takken weer samenkomen. Twee gelijke lampjes: door A 1,5 A, door B ook 1,5 A, totaal 3 A."
      ],
      regel: "Serie: overal dezelfde stroomsterkte; parallel: totaal = som van de takken, en dat totaal loopt in het onvertakte deel.",
      voorbeelden: [
        { en: "serie: vóór het lampje 0,3 A", nl: "na het lampje ook 0,3 A", let: "<b>let op</b>: het lampje maakt geen stroom op." },
        { en: "parallel: takken 0,2 A en 0,3 A", nl: "totaal 0,5 A", let: "<b>let op</b>: het totaal meet je bij de batterij." },
        { en: "twee gelijke lampjes parallel, A 1,5 A", nl: "B ook 1,5 A, totaal 3 A", let: "<b>let op</b>: gelijke lampjes krijgen evenveel." }
      ],
      vragen: [
        { t: "mc", q: "Twee lampjes staan in serie. Vóór het eerste lampje meet je 0,3 A. Wat meet je ná het tweede lampje?",
          o: ["0,3 A", "0,15 A", "0,6 A", "0 A"], a: "0,3 A",
          fout: {
            "0,15 A": "Dat is De Stroomvreter: 'elk lampje maakt een stukje stroom op'. Maar lading gaat niet op. Wat een lampje instroomt, stroomt er ook weer uit: overal 0,3 A.",
            "0,6 A": "Optellen doe je bij parallel (de takken). In serie is er maar één kring: overal dezelfde 0,3 A.",
            "0 A": "Dan zou alle lading verdwenen zijn, maar beide lampjes branden. Lading gaat rond en komt terug bij de batterij: 0,3 A."
          },
          w: "In serie is de stroomsterkte overal gelijk: 0,3 A.",
          meer: "Kernzin: energie wordt omgezet (in licht en warmte), lading niet. Er komt evenveel lading per seconde terug als er vertrekt." },

        { t: "mc", q: "Je moet de stroomsterkte in een schakeling beredeneren. Wat doe je eerst?",
          o: ["eerst kijken of er een vertakking is", "alle stroomsterktes optellen", "de spanning van de batterij delen", "het aantal lampjes tellen"],
          a: "eerst kijken of er een vertakking is",
          fout: {
            "alle stroomsterktes optellen": "Optellen klopt alleen bij parallel. Bij serie zou je zo een te groot getal krijgen. Eerst weten wat het is.",
            "de spanning van de batterij delen": "Spanning delen helpt je niet om de stroom te vinden. Eerst: serie of parallel?",
            "het aantal lampjes tellen": "Het aantal lampjes zegt nog niet of ze in serie of parallel staan. Zoek een vertakking."
          },
          w: "Stap 1: is er een vertakking? Zo nee, serie. Zo ja, parallel.",
          meer: "Daarna pas de regel: serie = overal gelijk, parallel = takken optellen." },

        { t: "mc", q: "Waarom is de stroomsterkte ná een lampje net zo groot als ervoor?",
          o: ["Lading gaat niet op, alleen energie wordt omgezet", "Het lampje maakt zelf nieuwe lading aan", "De batterij duwt de verbruikte stroom terug", "Een lampje gebruikt alleen stroom als het fel brandt"],
          a: "Lading gaat niet op, alleen energie wordt omgezet",
          fout: {
            "Het lampje maakt zelf nieuwe lading aan": "Een lampje maakt geen lading. Het zet energie om in licht en warmte. De lading stroomt er alleen doorheen.",
            "De batterij duwt de verbruikte stroom terug": "Er is geen verbruikte stroom. De lading wordt niet opgebruikt, dus er hoeft niets terug geduwd te worden.",
            "Een lampje gebruikt alleen stroom als het fel brandt": "Een lampje gebruikt nooit lading, of het nu fel of zwak brandt. Vóór en na meet je altijd hetzelfde."
          },
          w: "Lading wordt niet opgebruikt. Wat het lampje gebruikt, is energie.",
          meer: "Vergelijk met een fietsketting: de ketting gaat rond en wordt niet korter, maar jij levert wel energie aan de fiets." },

        { t: "bouw", q: "Twee lampjes staan parallel. Door tak 1 gaat 0,2 A, door tak 2 gaat 0,3 A. Hoe groot is de totale stroomsterkte? (alleen het getal, in A)", a: "0,5",
          w: "Parallel: totaal = som van de takken: 0,2 + 0,3 = 0,5 A.",
          meer: "Dat totaal loopt in het onvertakte deel, bij de batterij." },

        { t: "mc", q: "Waar loopt in een parallelschakeling de <b>totale</b> stroomsterkte?",
          o: ["in het onvertakte deel bij de batterij", "in de tak met het felste lampje", "in elke tak, net als bij de batterij", "alleen in de laatste tak"],
          a: "in het onvertakte deel bij de batterij",
          fout: {
            "in de tak met het felste lampje": "Een tak krijgt altijd maar een deel van het totaal. Het totaal loopt daar waar alle takken nog samen zijn.",
            "in elke tak, net als bij de batterij": "Dat is de misvatting 'parallel = overal gelijk'. Bij de splitsing verdeelt de stroom zich: elke tak krijgt een deel.",
            "alleen in de laatste tak": "De laatste tak is gewoon een tak met zijn eigen deel. Het totaal zit vóór de splitsing (en na het samenkomen)."
          },
          w: "Het totaal loopt in het onvertakte deel: vóór de splitsing en na het samenkomen.",
          meer: "Een stroommeter vlak bij de batterij meet dus altijd het totaal." },

        { t: "vb", opgave: "Twee gelijke lampjes A en B staan parallel. Door lampje A gaat 1,5 A. Hoeveel gaat er door B, en hoe groot is het totaal?",
          stappen: [
            { toon: "Parallel: er is een vertakking", uitleg: "Elk lampje zit in een eigen tak." },
            { toon: "Gelijke lampjes: B ook 1,5 A", uitleg: "Gelijke lampjes krijgen evenveel stroom." },
            { toon: "Totaal = 1,5 + 1,5 = 3 A", uitleg: "Alles wat door de takken gaat, komt samen in het onvertakte deel." }
          ],
          waarom: { q: "Waarom is het totaal 3 A en niet 1,5 A?",
            o: ["Bij de splitsing gaat alles wat binnenkomt verder, verdeeld over twee takken", "In een parallelschakeling is de stroom overal even groot", "De batterij levert altijd 3 A, wat je er ook aan hangt"],
            a: "Bij de splitsing gaat alles wat binnenkomt verder, verdeeld over twee takken" },
          fout: {
            "In een parallelschakeling is de stroom overal even groot": "Dat geldt voor serie. Parallel verdeelt de stroom zich. Als het totaal 1,5 A was, kreeg elk lampje maar 0,75 A.",
            "De batterij levert altijd 3 A, wat je er ook aan hangt": "Dat is De Constante Kraan. De batterij levert een vaste spanning. Hoeveel stroom er loopt, hangt af van de schakeling: met één lampje was het 1,5 A."
          },
          w: "Totaal = som van de takken: 1,5 + 1,5 = 3 A.",
          meer: "Splitsingsregel: wat binnenkomt, gaat eruit. 3 A komt binnen, 1,5 A gaat naar A en 1,5 A naar B." },

        { t: "mc", q: "Drie gelijke lampjes staan parallel. In het onvertakte deel meet je 0,9 A. Hoeveel gaat er door één lampje?",
          o: ["0,3 A", "0,9 A", "2,7 A", "0,45 A"], a: "0,3 A",
          fout: {
            "0,9 A": "Dat is 'parallel = overal gelijk'. Dan zou het totaal 3 × 0,9 = 2,7 A moeten zijn, maar je meet 0,9 A. Elke tak krijgt een derde.",
            "2,7 A": "Je hebt vermenigvuldigd. 0,9 A is al het totaal; dat verdeel je over drie takken: 0,9 / 3 = 0,3 A.",
            "0,45 A": "Je hebt door 2 gedeeld, maar er zijn drie gelijke takken: 0,9 / 3 = 0,3 A."
          },
          w: "Gelijke lampjes: elke tak = totaal / aantal takken = 0,9 / 3 = 0,3 A.",
          meer: "Controle: 0,3 + 0,3 + 0,3 = 0,9 A. Klopt." },

        { t: "mc", q: "Wat is de regel bij een <b>splitsingspunt</b>?",
          o: ["wat binnenkomt, gaat er ook weer uit", "de stroom wordt daar een beetje opgebruikt", "elke tak krijgt de volle stroom van de batterij", "de stroom kiest altijd maar één tak"],
          a: "wat binnenkomt, gaat er ook weer uit",
          fout: {
            "de stroom wordt daar een beetje opgebruikt": "Lading gaat nergens op, ook niet bij een splitsing. Komt er 0,5 A binnen, dan gaat er samen 0,5 A uit.",
            "elke tak krijgt de volle stroom van de batterij": "Dan zou er meer uitgaan dan binnenkomt. 0,6 A binnen kan niet 0,6 A + 0,6 A uit worden.",
            "de stroom kiest altijd maar één tak": "De stroom verdeelt zich over alle takken die een gesloten kring vormen. Daarom branden alle lampjes."
          },
          w: "Bij een splitsing: in = uit. De takken samen zijn even groot als wat er binnenkwam.",
          meer: "Net als een snelweg die splitst: het aantal auto's per minuut vóór de splitsing is gelijk aan beide wegen erna samen." },

        { t: "sleep", opgave: "Hoe groot is de stroom op deze plek?",
          chips: [ {t:"vóór en na een lampje in serie", bak:"z"}, {t:"tussen twee lampjes in serie", bak:"z"},
                   {t:"in het onvertakte deel van een parallelschakeling", bak:"t"}, {t:"waar de takken weer samenkomen", bak:"t"},
                   {t:"in één tak van een parallelschakeling", bak:"d"}, {t:"door één van drie gelijke lampjes parallel", bak:"d"} ],
          bakjes: [ {id:"z", label:"Zelfde als overal", som:"serie"},
                    {id:"t", label:"Het totaal", som:"som van de takken"},
                    {id:"d", label:"Een deel van het totaal", som:"één tak"} ],
          w: "Serie: overal hetzelfde. Parallel: het totaal in het onvertakte deel, een deel in elke tak.",
          meer: "Waar de takken samenkomen, komt alle stroom weer bij elkaar: daar loopt weer het totaal." },

        { t: "gap", q: "In een serieschakeling is de stroomsterkte overal even ___.", a: "groot|gelijk|veel|sterk", soepel: true,
          w: "In serie is de stroomsterkte overal even groot.",
          meer: "Waar je ook meet (vóór, tussen of na de lampjes), je krijgt hetzelfde getal." }
      ]
    },
    {
      n: 2, naam: "Zilver",
      uitleg: [
        "Weet je het totaal en alle takken op één na? Dan is de laatste tak <b>het verschil</b>. Voorbeeld: totaal 300 mA, twee takken 50 mA en 90 mA. Derde tak: 300 − 50 − 90 = <b>160 mA</b>.",
        "Bij <b>gelijke lampjes</b> parallel krijgt elke tak hetzelfde deel: <b>totaal / aantal takken</b>. Vier gelijke lampjes en 2 A totaal: elk 0,5 A.",
        "Een meter op de <b>rail</b> tussen twee vertakkingen meet de stroom van <b>alle takken die verderop liggen</b>. De takken die al zijn afgetakt, tellen niet meer mee.",
        "Let op de eenheden. Staat de ene tak in mA en de andere in A? Reken eerst alles om naar dezelfde eenheid: 0,25 A = 250 mA.",
        "Snoertje kapot (contact los) in een <b>tak</b>? Dan gaat alleen dat lampje uit, en het totaal wordt kleiner. Kapot in het <b>onvertakte deel</b>? Dan gaat alles uit."
      ],
      regel: "Ontbrekende tak = totaal min de andere takken; een meter op de rail meet alle takken die verderop liggen.",
      voorbeelden: [
        { en: "totaal 300 mA, takken 50 en 90 mA", nl: "derde tak 300 − 50 − 90 = 160 mA", let: "<b>let op</b>: eerst de bekende takken optellen, dan aftrekken." },
        { en: "150 mA + 0,25 A", nl: "150 mA + 250 mA = 400 mA", let: "<b>let op</b>: eerst dezelfde eenheid." },
        { en: "meter op de rail na de eerste aftakking", nl: "meet de takken die nog komen", let: "<b>let op</b>: de eerste tak is al 'afgeslagen'." }
      ],
      vragen: [
        { t: "stap", opgave: "In een parallelschakeling met drie takken is de totale stroomsterkte 300 mA. Door tak 1 gaat 50 mA, door tak 2 gaat 90 mA. Hoeveel gaat er door tak 3?",
          stappen: [
            { prompt: "Tel de bekende takken op. (alleen het getal, in mA)", a: "140", hints: ["Tak 1 + tak 2", "50 + 90", "140 mA"] },
            { prompt: "Trek dat af van het totaal. (alleen het getal, in mA)", a: "160", hints: ["Totaal − bekende takken", "300 − 140", "160 mA"] }
          ],
          w: "Tak 3 = 300 − 50 − 90 = 160 mA.",
          meer: "Controle: 50 + 90 + 160 = 300 mA. Klopt met het totaal." },

        { t: "bouw", q: "Vier gelijke lampjes staan parallel. De totale stroomsterkte is 2 A. Hoeveel gaat er door één lampje? (alleen het getal, in A)", a: "0,5",
          w: "Gelijke lampjes: 2 / 4 = 0,5 A per lampje.",
          meer: "Controle: 4 × 0,5 = 2 A." },

        { t: "mc", q: "Drie lampjes parallel naast elkaar: A dichtbij de batterij, dan B, dan C. Takken: A 0,2 A, B 0,3 A, C 0,1 A. Een meter staat op de rail tussen de aftakking van A en die van B. Wat meet hij?",
          o: ["0,4 A", "0,6 A", "0,2 A", "0,1 A"], a: "0,4 A",
          fout: {
            "0,6 A": "Dat is het totaal, maar A is al afgetakt vóór de meter. De meter ziet alleen de lading voor B en C: 0,3 + 0,1 = 0,4 A.",
            "0,2 A": "Dat is de stroom door A. Die is al afgeslagen. De meter staat in het stuk waar de lading voor B en C doorheen gaat.",
            "0,1 A": "Dat is alleen C. Maar B ligt ook verderop: 0,3 + 0,1 = 0,4 A."
          },
          w: "Een meter op de rail meet alle takken die verderop liggen: B + C = 0,3 + 0,1 = 0,4 A.",
          meer: "Volg de lading: na de aftakking van A gaat alleen nog de lading voor B en C verder over de rail." },

        { t: "mc", q: "Een parallelschakeling met twee takken. In het onvertakte deel loopt 0,6 A. Door tak 1 gaat 0,4 A. Hoeveel gaat er door tak 2?",
          o: ["0,2 A", "0,4 A", "0,6 A", "1,0 A"], a: "0,2 A",
          fout: {
            "0,4 A": "Dat zou alleen kloppen als de lampjes gelijk zijn, maar dan was het totaal 0,8 A. Het verschil is 0,6 − 0,4 = 0,2 A.",
            "0,6 A": "Dat is 'parallel = overal gelijk'. Dan zou het totaal 0,4 + 0,6 = 1,0 A zijn. Maar het totaal is 0,6 A.",
            "1,0 A": "Je hebt opgeteld. 0,6 A is al het totaal; de takken samen moeten 0,6 A zijn: 0,6 − 0,4 = 0,2 A."
          },
          w: "Tak 2 = totaal − tak 1 = 0,6 − 0,4 = 0,2 A.",
          meer: "Controle: 0,4 + 0,2 = 0,6 A." },

        { t: "velden", q: "Twee gelijke lampjes staan parallel. De totale stroomsterkte is 0,8 A. Vul in.",
          velden: [ {label:"door lampje 1 (A)", a:"0,4"}, {label:"door lampje 2 (A)", a:"0,4"}, {label:"waar de takken weer samenkomen (A)", a:"0,8"} ],
          w: "Gelijke lampjes: elk 0,8 / 2 = 0,4 A. Waar de takken samenkomen, loopt weer het totaal: 0,8 A.",
          meer: "De stroom splitst bij het ene vertakkingspunt en komt bij het andere weer samen." },

        { t: "mc", q: "Sanne zegt: 'Bij parallel is de stroom net als bij serie overal gelijk.' Het totaal is 1,2 A en er zijn drie gelijke takken. Wat klopt?",
          o: ["Sanne niet: elke tak 0,4 A, samen 1,2 A", "Sanne wel: elke tak krijgt 1,2 A", "Sanne niet: elke tak krijgt 3,6 A", "Sanne niet: alleen tak 1 krijgt stroom"],
          a: "Sanne niet: elke tak 0,4 A, samen 1,2 A",
          fout: {
            "Sanne wel: elke tak krijgt 1,2 A": "Dan zou er 3 × 1,2 = 3,6 A uit de splitsing komen, terwijl er 1,2 A binnenkomt. Dat kan niet: in = uit.",
            "Sanne niet: elke tak krijgt 3,6 A": "Dat is drie keer het totaal. De takken samen zijn het totaal: 1,2 / 3 = 0,4 A per tak.",
            "Sanne niet: alleen tak 1 krijgt stroom": "Alle takken vormen een gesloten kring, dus in elke tak loopt stroom. Bij gelijke takken evenveel."
          },
          w: "Parallel verdeelt de stroom zich: 1,2 / 3 = 0,4 A per tak.",
          meer: "'Overal gelijk' is de regel voor serie. Parallel geldt: totaal = som van de takken." },

        { t: "mc", q: "Twee takken parallel: door de ene gaat 150 mA, door de andere 0,25 A. Hoe groot is het totaal?",
          o: ["400 mA", "150,25 mA", "175 mA", "0,40 mA"], a: "400 mA",
          fout: {
            "150,25 mA": "Je hebt mA en A zomaar opgeteld. Eerst omrekenen: 0,25 A = 250 mA. Dan 150 + 250 = 400 mA.",
            "175 mA": "0,25 A is geen 25 mA. Van A naar mA is × 1000: 0,25 A = 250 mA. Totaal 400 mA.",
            "0,40 mA": "Het getal klopt in ampère (0,40 A), maar niet in mA. 0,40 A = 400 mA."
          },
          w: "Eerst dezelfde eenheid: 0,25 A = 250 mA. Dan 150 + 250 = 400 mA.",
          meer: "Controle: een kleine eenheid geeft een groot getal. 400 mA = 0,4 A." },

        { t: "mc", q: "Drie lampjes staan parallel, door elk gaat 0,2 A. In de tak van lampje 2 schiet een snoertje los. Wat meet de stroommeter bij de batterij nu?",
          o: ["0,4 A", "0,6 A", "0 A", "0,2 A"], a: "0,4 A",
          fout: {
            "0,6 A": "Dat was het totaal met drie takken. Nu doet tak 2 niet meer mee. Er blijft 0,2 + 0,2 = 0,4 A over.",
            "0 A": "Het snoertje zit in een tak, niet in het onvertakte deel. Lampje 1 en 3 hebben nog een gesloten kring.",
            "0,2 A": "Er werken nog twee lampjes, niet één: 0,2 + 0,2 = 0,4 A."
          },
          w: "Alleen tak 2 valt weg. Totaal = 0,2 + 0,2 = 0,4 A.",
          meer: "Lampje 1 en 3 merken er niets van: ze branden even fel en houden elk 0,2 A." },

        { t: "sequence", q: "Zet het stappenplan voor stroomsterkte beredeneren in de goede volgorde.",
          stappen: ["Zoek of er een vertakking is", "Bepaal: serie of parallel", "Pas de regel toe: serie overal gelijk, parallel takken optellen", "Controleer: komt bij elke splitsing evenveel binnen als eruit?"],
          w: "Eerst kijken (vertakking?), dan kiezen (serie of parallel), dan rekenen, dan controleren.",
          meer: "De controle is je vangnet: tel de takken op en vergelijk met het totaal." },

        { t: "mc", q: "Een stroommeter staat waar de takken weer samenkomen, vlak voor de minpool. Door de takken gaat 0,1 A en 0,3 A. Wat meet hij?",
          o: ["0,4 A", "0,3 A", "0,1 A", "0,2 A"], a: "0,4 A",
          fout: {
            "0,3 A": "Dat is alleen de grootste tak. Waar de takken samenkomen, komt alle stroom weer bij elkaar: 0,1 + 0,3 = 0,4 A.",
            "0,1 A": "De stroom is na de lampjes niet minder geworden. Lading gaat niet op: samen weer 0,4 A.",
            "0,2 A": "Je hebt het gemiddelde genomen. Bij het samenkomen tel je op: 0,1 + 0,3 = 0,4 A."
          },
          w: "Waar de takken samenkomen, loopt weer het totaal: 0,4 A.",
          meer: "Het totaal vóór de splitsing en na het samenkomen is precies even groot. Er gaat onderweg niets verloren." }
      ]
    },
    {
      n: 3, naam: "Goud",
      uitleg: [
        "Baas <b>De Constante Kraan</b> denkt dat een batterij altijd evenveel stroom levert. Fout: een batterij levert een vaste <b>spanning</b> (de duw). De <b>schakeling bepaalt de stroom</b>.",
        "In het ballonmodel: de pomp houdt de druk gelijk. Maak je een extra opening (een extra lampje parallel), dan stroomt er door die opening ook lucht, en door de andere openingen evenveel als eerst. Het <b>totaal stijgt</b>. Haal je een opening weg, dan <b>daalt het totaal</b>.",
        "Dus bij parallel: draai je een lampje los, dan <b>branden de andere even fel</b> (ze krijgen dezelfde duw) en <b>daalt de totale stroom</b>. Zet je er een lampje bij, dan stijgt het totaal en raakt de batterij sneller leeg.",
        "Instinker in serie: een snoertje kapot, waar dan ook? Dan is de enige kring open: <b>overal 0 A</b>, ook in het stuk vóór het kapotte snoer."
      ],
      regel: "Een batterij levert een vaste spanning, de schakeling bepaalt de stroom: parallel een lampje los, dan branden de andere even fel en daalt het totaal.",
      voorbeelden: [
        { en: "twee lampjes parallel van 0,3 A, één los", nl: "de ander houdt 0,3 A, het totaal gaat van 0,6 A naar 0,3 A", let: "<b>let op</b>: het totaal blijft niet 0,6 A." },
        { en: "derde lampje erbij parallel", nl: "het totaal stijgt met de stroom van dat lampje", let: "<b>let op</b>: de batterij is dan sneller leeg." },
        { en: "serie, snoertje los", nl: "overal 0 A", let: "<b>let op</b>: ook vóór het kapotte stuk." }
      ],
      vragen: [
        { t: "mc", q: "Twee gelijke lampjes staan parallel, door elk gaat 0,3 A, totaal 0,6 A. Je draait er één los. Wat meet je nu bij de batterij?",
          o: ["0,3 A", "0,6 A", "0,15 A", "0 A"], a: "0,3 A",
          fout: {
            "0,6 A": "Dat is De Constante Kraan: 'de batterij levert altijd evenveel'. De batterij levert een vaste spanning. Er is één tak minder, dus het totaal is 0,3 A.",
            "0,15 A": "Het overgebleven lampje krijgt dezelfde duw als eerst, dus ook dezelfde 0,3 A. Er wordt niets gehalveerd.",
            "0 A": "Het andere lampje zit in een eigen kring die nog dicht is. Daar blijft 0,3 A lopen."
          },
          w: "Het overgebleven lampje houdt 0,3 A. Het totaal daalt van 0,6 A naar 0,3 A.",
          meer: "De batterij is geen kraan met een vaste stroom. Hij duwt met een vaste spanning; hoeveel er stroomt, hangt af van hoeveel takken er zijn." },

        { t: "mc", q: "Twee gelijke lampjes staan parallel op een batterij. Je draait er één los. Hoe fel brandt het andere?",
          o: ["net zo fel", "twee keer zo fel", "half zo fel", "het gaat ook uit"], a: "net zo fel",
          fout: {
            "twee keer zo fel": "De Constante Kraan zou zeggen: de stroom van het losse lampje gaat nu naar het andere. Maar de batterij duwt met dezelfde spanning, dus het lampje krijgt dezelfde stroom als eerst.",
            "half zo fel": "Het lampje zit nog steeds rechtstreeks op de batterij en krijgt de volle duw. Het verandert niet.",
            "het gaat ook uit": "Dat zou in serie gebeuren. Parallel heeft het lampje een eigen kring die dicht blijft."
          },
          w: "Even fel: het krijgt dezelfde spanning en dus dezelfde stroom als eerst.",
          meer: "Zo werken de lampen thuis: doe je de lamp in de gang uit, dan wordt de lamp in je kamer niet ineens feller." },

        { t: "gap", q: "Een batterij levert een vaste ___. Hoeveel stroom er loopt, bepaalt de schakeling.", a: "spanning|duw", soepel: true,
          w: "Een batterij levert een vaste spanning (de duw). De stroom hangt af van de schakeling.",
          meer: "Op een batterij staat daarom een aantal volt (1,5 V), geen aantal ampère." },

        { t: "open", q: "Leg uit waarom bij een parallelschakeling de totale stroom kleiner wordt als je één lampje losdraait, terwijl de andere lampjes even fel blijven branden.", punten: 2,
          modelantwoord: "De batterij levert een vaste spanning. Elk lampje zit in een eigen tak en krijgt die volle spanning, dus de andere lampjes houden dezelfde stroom en branden even fel. De totale stroom is de som van de takken; er is één tak minder, dus het totaal wordt kleiner.",
          sleutelwoorden: [ {moet:["spanning"], syn:["duw","volt"]}, {moet:["tak"], syn:["takken","eigen kring","vertakking"]}, {moet:["som"], syn:["optellen","opgeteld","bij elkaar","minder takken"]} ],
          rubric: ["De andere lampjes krijgen nog dezelfde spanning in hun eigen tak, dus dezelfde stroom (even fel)", "Totaal = som van de takken; er valt een tak weg, dus het totaal daalt"],
          w: "Vaste spanning per tak, dus de andere lampjes veranderen niet. Totaal = som, en er is een tak minder.",
          meer: "Gebruik in je uitleg de woorden spanning, tak en optellen. Dan laat je zien dat je De Constante Kraan hebt verslagen." },

        { t: "mc", q: "Twee lampjes staan parallel, door elk gaat 0,2 A. Je zet er een derde, gelijk lampje parallel bij. Wat meet je nu in het onvertakte deel?",
          o: ["0,6 A", "0,4 A", "0,2 A", "0,13 A"], a: "0,6 A",
          fout: {
            "0,4 A": "Dat is De Constante Kraan: de batterij zou de 0,4 A over drie lampjes verdelen. Maar elk lampje krijgt de volle spanning en dus 0,2 A. Totaal 3 × 0,2 = 0,6 A.",
            "0,2 A": "Dat is de stroom door één lampje. Het totaal in het onvertakte deel is de som: 0,2 + 0,2 + 0,2 = 0,6 A.",
            "0,13 A": "Je hebt 0,4 A over drie lampjes verdeeld. Maar het nieuwe lampje neemt niets af van de andere: elk houdt 0,2 A."
          },
          w: "Elk lampje houdt 0,2 A. Er komt een tak bij, dus het totaal wordt 0,6 A.",
          meer: "Meer lampjes parallel betekent meer totale stroom. De batterij is dan sneller leeg." },

        { t: "mc", q: "Storm laadt haar telefoon op en zet in haar kamer ook een lamp aan. Allebei zitten ze parallel op het net. Wat gebeurt er met de stroom in de draad naar de meterkast?",
          o: ["Die wordt juist groter", "Die blijft gelijk", "Die wordt kleiner", "Die wordt 0 A"], a: "Die wordt juist groter",
          fout: {
            "Die blijft gelijk": "Dat is De Constante Kraan. Het net levert een vaste spanning. Elk extra apparaat is een extra tak, en de takken tellen op.",
            "Die wordt kleiner": "Er komt een tak bij, geen tak af. De som van de takken wordt dus groter.",
            "Die wordt 0 A": "Zolang er apparaten aan staan, loopt er stroom. Bij elk apparaat dat je aanzet, komt er stroom bij."
          },
          w: "Elk extra apparaat parallel is een extra tak: de totale stroom wordt groter.",
          meer: "Daarom kun je niet eindeloos veel apparaten op één groep aansluiten: de totale stroom door die draad wordt dan te groot." },

        { t: "mc", q: "Drie lampjes staan in serie, er loopt 0,2 A. Tussen lampje 2 en lampje 3 schiet een snoertje los. Wat meet een stroommeter vóór lampje 1?",
          o: ["0 A", "0,2 A", "0,1 A", "0,6 A"], a: "0 A",
          fout: {
            "0,2 A": "Dat is De Volger: 'vóór het gat merkt het niets'. Maar in serie is er maar één kring. Is die open, dan staat de lading overal stil: 0 A.",
            "0,1 A": "Niet een beetje minder, maar helemaal niets. De kring is open.",
            "0,6 A": "Optellen hoort bij parallel. En met een open kring loopt er helemaal niets."
          },
          w: "Serie, kring ergens open: overal 0 A.",
          meer: "Alle lampjes gaan uit. Waar het snoertje loszit, maakt niet uit: het is de enige kring." },

        { t: "mc", q: "Vier gelijke lampjes staan parallel naast elkaar, totaal 1,2 A. Een meter staat op de rail, net ná de aftakking van het eerste lampje. Wat meet hij?",
          o: ["0,9 A", "1,2 A", "0,3 A", "0,6 A"], a: "0,9 A",
          fout: {
            "1,2 A": "Dat is het totaal, maar het eerste lampje is al afgetakt. De meter ziet nog drie takken: 3 × 0,3 = 0,9 A.",
            "0,3 A": "Dat is de stroom door één lampje. Over de rail gaat de lading voor alle drie de lampjes die nog komen: 0,9 A.",
            "0,6 A": "Je telt twee takken, maar er liggen er nog drie verderop: 3 × 0,3 = 0,9 A."
          },
          w: "Per lampje 1,2 / 4 = 0,3 A. Na de eerste aftakking gaan er nog drie: 0,9 A.",
          meer: "Tip: tel de takken die nog voor je liggen, niet de takken die je al voorbij bent." },

        { t: "bouw", q: "Een parallelschakeling met drie takken: totaal 0,75 A. Twee takken zijn 200 mA en 350 mA. Hoeveel mA gaat er door de derde tak? (alleen het getal, in mA)", a: "200",
          w: "0,75 A = 750 mA. Derde tak: 750 − 200 − 350 = 200 mA.",
          meer: "Eerst alles in dezelfde eenheid. Controle: 200 + 350 + 200 = 750 mA = 0,75 A." },

        { t: "mc", q: "Welke uitspraak over een batterij in een schakeling klopt?",
          o: ["Hij duwt met vaste spanning, de lampjes bepalen de stroom", "Hij geeft altijd dezelfde stroom, hoeveel lampjes er ook zijn", "Hoe meer lampjes parallel, hoe minder stroom hij levert", "In elke tak loopt de volle stroom van de batterij"],
          a: "Hij duwt met vaste spanning, de lampjes bepalen de stroom",
          fout: {
            "Hij geeft altijd dezelfde stroom, hoeveel lampjes er ook zijn": "Dat is De Constante Kraan. Tegenvoorbeeld: één lampje 0,3 A, twee lampjes parallel 0,6 A. De stroom verandert, de spanning niet.",
            "Hoe meer lampjes parallel, hoe minder stroom hij levert": "Andersom: elk extra lampje parallel is een extra tak, en het totaal is de som. Meer lampjes, meer stroom.",
            "In elke tak loopt de volle stroom van de batterij": "Dat is 'parallel = overal gelijk'. Elke tak krijgt een deel; de takken samen zijn het totaal."
          },
          w: "De batterij levert een vaste spanning; de schakeling bepaalt hoeveel stroom er loopt.",
          meer: "Daarom staat er op een batterij een aantal volt, en geen aantal ampère." }
      ]
    }
  ]
};


/* =========================================================================
   LEERSTOF: 14 onderwerpen x 3 niveaus, in de volgorde van het leerplan.
   ========================================================================= */
window.LEERSTOF = ["vakken", "methode", "grootheid", "massa-gewicht", "volume", "dichtheid", "drijven", "omrekenen",
  "stroomkring", "geleiders", "stroomsterkte", "spanning", "schakelingen", "stroom-redeneren"].map(id => window.__TOPICS[id]);
delete window.__TOPICS;

/* =========================================================================
   OVERZICHT: "Mijn formulekaart" (de kaart bij de leerdoelenkaart) als
   beslis-kaart: wat voor woord is het, welke kant reken je om, welke meter waar.
   ========================================================================= */
window.OVERZICHT = {
  titel: "Mijn formulekaart",
  tegelTekst: "Grootheid, symbool, eenheid, omrekenen en welke meter waar. Alles van de formulekaart in één overzicht",
  intro: "Dit is de formulekaart van de toetsweek, als kaart die je kunt aftikken. Twijfel je bij een vraag? " +
         "Zoek de tak die erbij hoort: wat voor woord is het, welke kant reken je om, of welke meter zet je waar.",
  kaart: [
    { id: "woord", label: "WAT VOOR WOORD IS DIT?", kop: true, kleur: "brand", kinderen: [
      { id: "meetwaarde", label: "het kale GETAL", regel: "meetwaarde" },
      { id: "eenheid", label: "past ACHTER een getal", regel: "eenheid" },
      { id: "grootheid", label: "wat je MEET", regel: "grootheid (met symbool)" }
    ]},
    { id: "om", label: "OMREKENEN: WELKE KANT OP?", kop: true, kleur: "plum", kinderen: [
      { id: "groot-klein", label: "GROOT → KLEIN", regel: "keer 1000, getal groter" },
      { id: "klein-groot", label: "KLEIN → GROOT", regel: "gedeeld door 1000, getal kleiner" },
      { id: "gratis", label: "1 mL = 1 cm³", regel: "niets doen" }
    ]},
    { id: "elek", label: "ELEKTRICITEIT: WELKE REGEL?", kop: true, kleur: "brand", kinderen: [
      { id: "meters", label: "WELKE METER WAAR?", regel: "A in de kring, V ernaast" },
      { id: "serie", label: "SERIE", regel: "stroom overal gelijk, batterijen optellen" },
      { id: "parallel", label: "PARALLEL", regel: "takken optellen" }
    ]}
  ],
  stappen: [
    { kop: "De formulekaart", pad: ["woord"],
      uitleg: [
        "<div style='overflow-x:auto;max-width:100%'><table style='font-size:.82rem;border-collapse:collapse'><tr><th>grootheid</th><th>symbool</th><th>eenheid</th><th>formule / omrekenen</th></tr>" +
        "<tr><td>tijd</td><td>t</td><td>seconde (s)</td><td>1 min = 60 s</td></tr>" +
        "<tr><td>lengte</td><td>l</td><td>meter (m), cm</td><td>1 m = 100 cm</td></tr>" +
        "<tr><td>massa</td><td>m</td><td>kilogram (kg), gram (g)</td><td>1 kg = 1000 g</td></tr>" +
        "<tr><td>gewicht</td><td>F</td><td>newton (N)</td><td>op aarde 1 kg ≈ 10 N</td></tr>" +
        "<tr><td>volume</td><td>V</td><td>cm³, dm³, L, mL</td><td>1 L = 1 dm³ = 1000 cm³ · 1 mL = 1 cm³</td></tr>" +
        "<tr><td>dichtheid</td><td>ρ</td><td>g/cm³</td><td>ρ = m / V</td></tr>" +
        "<tr><td>stroomsterkte</td><td>I</td><td>ampère (A), mA</td><td>1 A = 1000 mA</td></tr>" +
        "<tr><td>spanning</td><td>U</td><td>volt (V), mV</td><td>1 V = 1000 mV · in serie: optellen</td></tr></table></div>",
        "Volume: blok = l × b × h · cilinder = π × r × r × h · onderdompelen = eindstand − beginstand."
      ],
      vb: [{ en: "De stroomsterkte is 0,25 A", let: "grootheid stroomsterkte (I) · meetwaarde 0,25 · eenheid ampère" }] },

    { kop: "De test: past het achter een getal?", pad: ["woord", "eenheid"],
      uitleg: [
        "In elke meting zitten drie dingen. In <b>0,25 A</b>: de meetwaarde <b>0,25</b>, de eenheid <b>ampère</b> en de grootheid <b>stroomsterkte</b>.",
        "De test die altijd werkt: <b>\"25 meter\" kan, \"25 lengte\" niet.</b> Wat achter een getal past, is de eenheid.",
        "Pas op met de letters: <b>V</b> is het symbool van volume, maar ook de eenheid volt. Kijk of het achter een getal staat."
      ],
      vb: [{ en: "9 V op een blokbatterij", let: "hier staat V achter een getal, dus het is de eenheid volt" }],
      check: { q: "Welk woord is een eenheid?", o: ["ampère", "stroomsterkte", "stroommeter"], a: "ampère",
        goed: "Ja: '0,3 ampère' kan, '0,3 stroomsterkte' niet.",
        fout: { "stroomsterkte": "dat is de grootheid: wat je meet.", "stroommeter": "dat is het meetinstrument." } } },

    { kop: "Groot naar klein: keer 1000", pad: ["om", "groot-klein"],
      uitleg: [
        "Ga je naar een <b>kleinere</b> eenheid, dan heb je er <b>meer</b> van nodig: <b>keer 1000</b>, het getal wordt groter.",
        "De komma schuift drie plaatsen naar rechts: 0,250 A = <b>250 mA</b> · 0,53 kg = 530 g · 4 L = 4000 mL.",
        "Uitkomstcheck: een kleine eenheid hoort bij een groot getal."
      ],
      vb: [{ en: "0,032 A = 32 mA", let: "naar mA (kleiner), dus het getal wordt groter" }],
      check: { q: "0,6 A = … mA?", o: ["600", "0,0006", "60"], a: "600",
        goed: "Klopt: keer 1000, komma drie naar rechts.",
        fout: { "0,0006": "je deelde in plaats van keer te doen. Naar mA (kleiner) hoort een groter getal.", "60": "je schoof maar twee plaatsen. Duizend heeft drie nullen." } } },

    { kop: "Klein naar groot: gedeeld door 1000", pad: ["om", "klein-groot"],
      uitleg: [
        "Ga je naar een <b>grotere</b> eenheid, dan heb je er minder van nodig: <b>gedeeld door 1000</b>.",
        "De komma schuift drie plaatsen naar links: 450 mV = <b>0,45 V</b> · 37 mA = 0,037 A · 2013 g = 2,013 kg.",
        "Niet de verkeerde kant op: 250 mA is géén 250 000 A. Dat is meer dan een bliksemflits."
      ],
      vb: [{ en: "1282 mA = 1,282 A", let: "naar A (groter), dus het getal wordt kleiner" }],
      check: { q: "37 mA = … A?", o: ["0,037", "37 000", "3,7"], a: "0,037",
        goed: "Ja: gedeeld door 1000, komma drie naar links.",
        fout: { "37 000": "je deed keer 1000. Naar A (groter) moet het getal kleiner worden.", "3,7": "je schoof maar één plaats. Het zijn er drie." } } },

    { kop: "De gratis omrekening: 1 mL = 1 cm³", pad: ["om", "gratis"],
      uitleg: [
        "Een milliliter is precies even groot als een kubieke centimeter. Zelfde ruimte, ander woord.",
        "De maatcilinder leest mL af en de dichtheid gaat in g/cm³: je mag het getal direct overnemen.",
        "Het rijtje: <b>1 L = 1 dm³ = 1000 mL = 1000 cm³</b>."
      ],
      vb: [{ en: "Maatcilinder leest 45 mL", let: "dat is 45 cm³, zonder rekenwerk" }],
      check: { q: "De maatcilinder leest 60 mL. Hoeveel cm³ is dat?", o: ["60 cm³", "0,06 cm³", "60 000 cm³"], a: "60 cm³",
        goed: "Precies, mL en cm³ zijn gelijk.",
        fout: { "0,06 cm³": "je rekende naar liter. Van mL naar cm³ hoef je niets te doen.", "60 000 cm³": "keer 1000 hoort bij L naar mL, niet hier." } } },

    { kop: "Stroommeter IN de kring, spanningsmeter ERNAAST", pad: ["elek", "meters"],
      uitleg: [
        "De <b>stroommeter</b> (A) telt hoeveel lading er per seconde langskomt. Daarom moet de lading <b>erdoorheen</b>: je zet hem <b>in de kring</b> (in serie).",
        "De <b>spanningsmeter</b> (V) meet de duw tussen twee punten. Hij komt <b>naast</b> het onderdeel, met één snoer aan elke kant (parallel).",
        "Meetbereik: het rode snoer zit in het gekozen bereik (5 A, 0,5 A, 0,05 A of 30 V, 15 V, 3 V). De volle uitslag is dat bereik. Twijfel? Begin bij het grootste."
      ],
      vb: [{ en: "A: in het rondje · V: over het lampje", let: "A van achter elkaar, V van voor- en achterkant" }],
      check: { q: "Hoe sluit je een spanningsmeter aan op een lampje?", o: ["Over het lampje, aan beide kanten", "In de kring, achter het lampje", "Alleen aan de pluspool"], a: "Over het lampje, aan beide kanten",
        goed: "Ja, de spanningsmeter komt ernaast: hij vergelijkt de twee kanten.",
        fout: { "In de kring, achter het lampje": "zo sluit je een stroommeter aan. De spanningsmeter komt ernaast.", "Alleen aan de pluspool": "met één snoer heb je geen twee punten om te vergelijken; er moeten twee snoeren aan." } } },

    { kop: "Serie: één rondje", pad: ["elek", "serie"],
      uitleg: [
        "In een <b>serieschakeling</b> zit alles achter elkaar in één kring, zonder vertakkingen.",
        "De <b>stroomsterkte is overal even groot</b>: vóór, tussen en ná de lampjes. Het lampje maakt geen lading op; energie wordt omgezet, lading niet.",
        "Eén lampje kapot? Dan is het rondje open en gaat <b>alles</b> uit. <b>Batterijen in serie</b> (plus tegen min): tel de spanningen op, 4 × 1,5 V = 6,0 V."
      ],
      vb: [{ en: "Vóór het lampje 0,30 A", let: "dan ná het lampje ook 0,30 A" }],
      check: { q: "In een serieschakeling meet je vóór de lampjes 120 mA. Wat meet je erna?", o: ["120 mA", "60 mA", "0 mA"], a: "120 mA",
        goed: "Klopt, in één kring is de stroom overal gelijk.",
        fout: { "60 mA": "de lampjes maken geen lading op. Wat erin gaat, komt eruit.", "0 mA": "dan zou er na de lampjes niets meer stromen, terwijl de lading gewoon het rondje afmaakt." } } },

    { kop: "Parallel: takken optellen", pad: ["elek", "parallel"],
      uitleg: [
        "In een <b>parallelschakeling</b> vertakt de draad: elk lampje heeft een eigen kring op de batterij.",
        "Bij het splitsingspunt verdeelt de stroom zich. <b>Totaal = de takken bij elkaar opgeteld</b>. Gelijke lampjes: elke tak krijgt totaal : aantal.",
        "Eén lampje kapot? De andere branden even fel door, en het totaal wordt kleiner. Zo staat alles in huis: elk apparaat 230 V en apart aan en uit."
      ],
      vb: [{ en: "300 mA totaal, takken 50 mA en 90 mA", let: "derde tak = 300 − 50 − 90 = 160 mA" }],
      check: { q: "Twee gelijke lampjes parallel, elk 1,5 A. Hoeveel gaat er door de batterij?", o: ["3 A", "1,5 A", "0,75 A"], a: "3 A",
        goed: "Ja: 1,5 + 1,5 = 3 A.",
        fout: { "1,5 A": "dat is per tak. Bij de batterij komen beide takken samen.", "0,75 A": "je deelde, maar bij parallel tel je de takken op." } } }
  ]
};

/* =========================================================================
   MIXVRAGEN: verwarbare paren door elkaar (komen in de proeftoets).
   ========================================================================= */
window.MIXVRAGEN = [
  { t: "mc", q: "Op de maan is je ... zes keer zo klein. Wat hoort op de puntjes?", o: ["gewicht", "massa", "volume", "dichtheid"], a: "gewicht",
    fout: { "massa": "je massa (de hoeveelheid stof, in kg) blijft overal hetzelfde. Er gaat niets van je af.", "volume": "je bent op de maan niet kleiner: je neemt evenveel ruimte in.", "dichtheid": "je bestaat nog uit dezelfde stof, dus de dichtheid blijft gelijk." },
    w: "Gewicht (N) hangt af van hoe hard de maan of aarde trekt; massa (kg) niet.", meer: "Astronaut van 60 kg: op aarde ± 600 N, op de maan ± 100 N, en overal 60 kg." },
  { t: "mc", q: "In welke eenheid druk je het <b>gewicht</b> uit?", o: ["newton", "kilogram", "gram", "liter"], a: "newton",
    fout: { "kilogram": "kilogram is de eenheid van massa. Gewicht is een kracht.", "gram": "ook een eenheid van massa.", "liter": "liter is een eenheid van volume." },
    w: "Gewicht is een kracht, en kracht meet je in newton (N).", meer: "Op aarde hoort bij 1 kg ongeveer 10 N." },
  { t: "mc", q: "Is <b>volt</b> een grootheid of een eenheid?", o: ["Een eenheid", "Een grootheid", "Een meetinstrument", "Een meetwaarde"], a: "Een eenheid",
    fout: { "Een grootheid": "de grootheid is spanning. Volt is de maat waarin je spanning uitdrukt: '9 volt' kan.", "Een meetinstrument": "het instrument is de spanningsmeter (voltmeter).", "Een meetwaarde": "een meetwaarde is altijd een getal." },
    w: "'9 volt' kan, dus volt is een eenheid.", meer: "Setje: spanning (U) → volt (V) → spanningsmeter." },
  { t: "mc", q: "Is <b>stroomsterkte</b> een grootheid of een eenheid?", o: ["Een grootheid", "Een eenheid", "Een meetinstrument", "Een spanningsbron"], a: "Een grootheid",
    fout: { "Een eenheid": "'0,5 stroomsterkte' kan niet. De eenheid is ampère.", "Een meetinstrument": "het instrument is de stroommeter.", "Een spanningsbron": "een spanningsbron is bijvoorbeeld een batterij." },
    w: "Stroomsterkte is wat je meet: een grootheid.", meer: "Setje: stroomsterkte (I) → ampère (A) → stroommeter." },
  { t: "mc", q: "Een losse batterij ligt in de la. Wat klopt?", o: ["Er is spanning, maar geen stroom", "Er is stroom, maar geen spanning", "Er is spanning en stroom", "Er is geen spanning en geen stroom"], a: "Er is spanning, maar geen stroom",
    fout: { "Er is stroom, maar geen spanning": "precies omgekeerd. Zonder gesloten kring kan er geen lading rondgaan.", "Er is spanning en stroom": "stroom is bewegende lading, en die beweegt alleen in een gesloten kring.", "Er is geen spanning en geen stroom": "de spanning (de duw) is er wel: 1,5 V. Net als een dichtgeknepen ballon: druk, maar geen stroming." },
    w: "Spanning = de duw, stroom = bewegende lading in een gesloten kring.", meer: "Een losse AA-batterij: 1,5 V en 0 A." },
  { t: "mc", q: "Wat meet je in <b>volt</b>?", o: ["De duw van de spanningsbron", "Hoeveel lading per seconde langskomt", "Hoeveel lading er in de batterij zit", "Hoe snel het lampje brandt"], a: "De duw van de spanningsbron",
    fout: { "Hoeveel lading per seconde langskomt": "dat is de stroomsterkte, in ampère.", "Hoeveel lading er in de batterij zit": "dat meet je niet in volt. Spanning is de duw, niet de voorraad.", "Hoe snel het lampje brandt": "een lampje brandt niet 'snel'. Volt gaat over de duw op de lading." },
    w: "Spanning (volt) is de duw; stroomsterkte (ampère) is hoeveel er per seconde voorbijkomt.", meer: "Ballon: hoe strak hij staat is de spanning, hoeveel lucht er per seconde uitstroomt is de stroom." },
  { t: "mc", q: "Drie lampjes, en als je er één losdraait gaan de andere twee <b>ook uit</b>. Wat voor schakeling is het?", o: ["Een serieschakeling", "Een parallelschakeling", "Het kan allebei zijn", "Geen van de twee kan dat"], a: "Een serieschakeling",
    fout: { "Een parallelschakeling": "bij parallel heeft elk lampje een eigen kring; de andere zouden blijven branden.", "Het kan allebei zijn": "nee: alleen bij serie onderbreekt één lampje het hele rondje.", "Geen van de twee kan dat": "bij serie gebeurt dit juist altijd." },
    w: "Serie = één kring: één lampje los en het hele rondje is open.", meer: "Daarom staan lampen in huis parallel." },
  { t: "mc", q: "Waar is de stroomsterkte <b>overal even groot</b>?", o: ["In een serieschakeling", "In een parallelschakeling", "In allebei", "In geen van beide"], a: "In een serieschakeling",
    fout: { "In een parallelschakeling": "bij parallel splitst de stroom: bij de batterij loopt de som van de takken.", "In allebei": "parallel = stroom overal gelijk is een bekende valkuil. Daar tel je de takken op.", "In geen van beide": "in een serieschakeling is hij wel overal gelijk: er is maar één weg." },
    w: "Serie: één weg, dus overal dezelfde stroom.", meer: "Parallel: totaal = tak 1 + tak 2 + …" },
  { t: "mc", q: "Welke meter zet je <b>in de kring</b>, zodat de stroom erdoorheen moet?", o: ["De stroommeter", "De spanningsmeter", "Allebei", "Geen van beide"], a: "De stroommeter",
    fout: { "De spanningsmeter": "de spanningsmeter komt ernaast, over het onderdeel heen.", "Allebei": "alleen de stroommeter. De spanningsmeter vergelijkt twee punten en staat ernaast.", "Geen van beide": "de stroommeter moet wél in de kring: hij telt de lading die erdoorheen gaat." },
    w: "Stroommeter in serie, spanningsmeter parallel.", meer: "A van achter elkaar (in de rij), V van voor- en achterkant (ernaast)." },
  { t: "mc", q: "Je wilt de spanning van een batterij meten. Waar sluit je de spanningsmeter op aan?", o: ["Op de plus- en de minpool", "Alleen op de pluspool", "Tussen batterij en lampje, in de kring", "Op de draad naar het lampje"], a: "Op de plus- en de minpool",
    fout: { "Alleen op de pluspool": "een spanningsmeter heeft twee punten nodig om te vergelijken.", "Tussen batterij en lampje, in de kring": "zo zet je een stroommeter neer.", "Op de draad naar het lampje": "dan vergelijk je twee punten op dezelfde draad, en daartussen zit geen spanning." },
    w: "Spanning meet je over iets heen: tussen de twee polen.", meer: "Rood snoer aan de plus, zwart aan de min." },
  { t: "mc", q: "Een stuk <b>glas</b> is hard en stevig. Is het een geleider?", o: ["Nee, het is een isolator", "Ja, harde stoffen geleiden", "Ja, maar alleen een beetje", "Alleen als het nat is"], a: "Nee, het is een isolator",
    fout: { "Ja, harde stoffen geleiden": "hard zegt niets over geleiden. Glas is geen metaal en isoleert.", "Ja, maar alleen een beetje": "glas laat geen stroom door: het is een goede isolator.", "Alleen als het nat is": "dan geleidt hooguit het water erop, niet het glas zelf." },
    w: "Metalen geleiden; een vaste stof die geen metaal is, isoleert bijna altijd.", meer: "Uitzondering: koolstof (potloodgrafiet) is geen metaal en geleidt wel." },
  { t: "mc", q: "Welke van deze vier is een <b>geleider</b>?", o: ["Potloodstift", "Rubber", "Lucht", "Plastic"], a: "Potloodstift",
    fout: { "Rubber": "rubber is een isolator, daarom zijn snoeren en handschoenen ermee bekleed.", "Lucht": "lucht isoleert: daarom is een open schakelaar uit.", "Plastic": "de meeste plastics isoleren, daarom zit plastic om het koper van een snoer." },
    w: "Potloodstift is grafiet (koolstof): geen metaal, toch een geleider.", meer: "Probeer het: een potloodstift in het gat van een stroomkring laat het lampje (zwak) branden." }
];

/* =========================================================================
   BEGRIPPEN: alle begrippen-tabellen uit de brontekst, per paragraaf.
   Item = [omschrijving, begrip, [extra goedgekeurde antwoorden]]
   ========================================================================= */
window.BEGRIPPEN = {
  "H1-1": { emoji: "🧪", titel: "§1.1 Een nieuw vak", items: [
    ["het opdoen van kennis en het toepassen van die kennis in het dagelijks leven", "wetenschap"],
    ["wetenschap die de natuur bestudeert", "natuurwetenschap"],
    ["schoolvak dat de levende natuur bestudeert", "biologie"],
    ["schoolvak dat tijdelijke veranderingen in de niet-levende natuur bestudeert", "natuurkunde"],
    ["schoolvak dat blijvende veranderingen in de niet-levende natuur bestudeert", "scheikunde"],
    ["foto's gemaakt met röntgenstraling, veel gebruikt om breuken in botten op te sporen", "röntgenfoto's", ["rontgenfoto's", "röntgenfotos", "rontgenfotos", "röntgenfoto"]]
  ]},
  "H1-2": { emoji: "🔎", titel: "§1.2 Onderzoeken", items: [
    ["het doen van onderzoek volgens een aantal vaste stappen", "wetenschappelijke methode"],
    ["wat je wilt ontdekken tijdens het onderzoek", "onderzoeksvraag"],
    ["voorlopig antwoord; de uitkomst die je vooraf voorspelt", "hypothese"],
    ["onderdeel van je lichaam waarmee je kunt waarnemen", "zintuig"],
    ["gereedschap om te meten", "meetinstrument"],
    ["getal dat bij de meting wordt bepaald", "meetwaarde"],
    ["maat waarin je iets uitdrukt", "eenheid"],
    ["eigenschap die je kunt meten", "grootheid"],
    ["stof waarmee je de aanwezigheid van een andere stof kunt aantonen", "indicator"]
  ]},
  "H2": { emoji: "⚖️", titel: "§2.3 en §2.4 Massa, volume en dichtheid", items: [
    ["maat die aangeeft uit hoeveel stof een voorwerp bestaat", "massa"],
    ["de kracht waarmee een voorwerp op een ondergrond drukt of aan een ophangpunt trekt (in newton)", "gewicht"],
    ["maat voor de ruimte die een voorwerp of stof inneemt", "volume"],
    ["methode om het volume van een voorwerp met een onregelmatige vorm te bepalen", "onderdompelmethode"],
    ["de massa van 1 cm³ van een stof", "dichtheid"],
    ["eigenschap waaraan je een stof kunt herkennen (dichtheid is er een)", "stofeigenschap"]
  ]},
  "H4-1": { emoji: "🔁", titel: "§4.1 Een stroomkring maken", items: [
    ["gesloten rondje van spanningsbron, snoeren en apparaten waardoor een stroom loopt", "stroomkring"],
    ["het 'iets' dat beweegt in een stroomkring; elektrische stroom is bewegende ...", "lading"],
    ["stof waar een elektrische stroom gemakkelijk doorheen kan lopen", "geleider"],
    ["stof die een elektrische stroom niet of heel slecht doorlaat", "isolator"],
    ["onderdeel waarmee je de stroom aan- en uitzet (kring sluiten of openen)", "schakelaar"],
    ["meetinstrument voor de stroomsterkte (ampèremeter)", "stroommeter", ["ampèremeter", "amperemeter"]],
    ["hoeveel lading er per seconde op een punt van de kring voorbijkomt; in ampère (A)", "stroomsterkte"]
  ]},
  "H4-2": { emoji: "🔋", titel: "§4.2 Spanningsbronnen", items: [
    ["iets dat een constante spanning levert, zodat er een stroom kan lopen: batterij, accu, dynamo, zonnecel", "spanningsbron"],
    ["de 'duw' van de spanningsbron op de lading; in volt (V)", "spanning"],
    ["meetinstrument voor spanning (voltmeter); sluit je aan op de plus- en minpool", "spanningsmeter", ["voltmeter"]],
    ["de spanning van het stopcontact in huis: 230 V", "netspanning"],
    ["onderdeel dat lading opslaat, maar geen constante spanning levert", "condensator"],
    ["blokje (oplader) tussen stopcontact en apparaat dat 230 V omzet naar een lagere spanning", "adapter", ["oplader"]],
    ["onderdeel in de adapter dat de spanning omzet, bijvoorbeeld van 230 V naar 5 V", "transformator"],
    ["batterijen zo geschakeld: pluspool van de ene tegen de minpool van de andere; de spanningen tellen op", "in serie (batterijen)", ["in serie", "serie"]]
  ]},
  "H4-3": { emoji: "💡", titel: "§4.3 Schakelingen", items: [
    ["manier waarop lampen, schakelaars, snoeren en spanningsbronnen verbonden zijn", "schakeling"],
    ["tekening van een schakeling waarin elk onderdeel een vast symbool heeft", "schakelschema"],
    ["schakeling zonder vertakkingen: één stroomkring, alles achter elkaar", "serieschakeling"],
    ["schakeling met vertakkingen: elk apparaat in een eigen stroomkring op de bron", "parallelschakeling"],
    ["de stroomsterkte in het onvertakte deel van een parallelschakeling (de som van de takken)", "totale stroomsterkte"]
  ]}
};

window.AANMOEDIGING = {
  goed: ["Top!", "Goed bezig, Storm!", "Yes, gelukt!", "Knap hoor!", "Precies goed!", "Scherp gezien!", "Zo, die zit!"],
  bijna: ["Bijna!", "Net niet, geeft niks.", "Dat hoort erbij, kijk even waarom.", "Bijna goed!", "Je zit er dichtbij."],
  levelup: ["Level omhoog! 🚀", "Je gaat naar een hoger niveau!", "Knap, door naar het volgende! ✨"],
  leveldown: ["We pakken het even rustiger aan.", "Even een stapje terug, dan zit het straks vast.", "Geen probleem, we bouwen het opnieuw op."],
  stapelklaar: ["Stapel klaar! 🎉", "Lekker gedaan, Storm! 🌟", "Helemaal af! 💪"]
};


/* =========================================================================
   GENERATORS: parametrische vraag-sjablonen per onderwerp x niveau.
   Elke functie levert een VERS vraagobject met willekeurige getallen, zodat
   elke ronde anders is. Een ronde = 2 vaste vragen + 3 uit deze generatoren.

   Meetinstrumenten en schakelschema's worden als inline SVG in q.q getekend
   (de engine rendert q.q als HTML): elke ronde een andere stand, een ander
   meetbereik of een andere schakeling.

   Reken-types (bouw/stap/velden) worden numeriek nagekeken door math.js
   equiv(). Antwoorden zijn daarom PUUR NUMERIEK met NL-komma; de eenheid staat
   in de vraag of het veld-label (een meegetypte eenheid mag, zie de engine).
   Elk object heeft w + meer, elke mc heeft per foute optie een fout-uitleg.
   Verifieer met: node build/check-natuurkunde.mjs (in deze app-map)
   ========================================================================= */
(function () {
  const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rond = (x, n) => Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
  const schud = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const KLEIN = s => "<br><span style='font-size:.9rem;opacity:.75'>(" + s + ")</span>";

  /* getal naar Nederlandse notatie (komma, geen drijfkomma-ruis) */
  function nl(x) {
    let s = String(rond(x, 6));
    if (s.indexOf("e") >= 0) s = x.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
    return s.replace(".", ",");
  }
  /* mc-bouwer: opties = goed + fouten (object optie -> uitleg) */
  function mc(q, goed, fouten, w, meer) {
    return { t: "mc", q: q, o: [goed].concat(Object.keys(fouten)), a: goed, fout: fouten, w: w, meer: meer };
  }

  /* dichtheden uit tabel 1 van het boek (g/cm³) */
  const STOFFEN = [
    ["alcohol", 0.80], ["aluminium", 2.7], ["benzine", 0.72], ["glas", 2.6],
    ["goud", 19.3], ["ijs", 0.92], ["ijzer", 7.9], ["keukenzout", 2.2],
    ["koper", 8.96], ["kwik", 13.5], ["lood", 11.3], ["messing", 8.5],
    ["perspex", 1.2], ["staal", 7.8], ["suiker", 1.6], ["terpentine", 0.84],
    ["vurenhout", 0.58], ["water", 1.0], ["zilver", 10.5], ["zink", 7.2]
  ];
  const EENDEC = STOFFEN.filter(s => Number.isInteger(rond(s[1] * 10, 6)));
  const DRIJVERS = STOFFEN.filter(s => s[1] < 1.0);
  const ZINKERS = STOFFEN.filter(s => s[1] > 1.0);

  /* =====================================================================
     SVG: maatcilinder, weegschaal, blok, cilindervorm
     ===================================================================== */
  function svgCilinder(max, major, perStreep, waarde, opts) {
    opts = opts || {};
    const n = Math.round(max / perStreep);
    /* de schaal moet TELBAAR zijn: ~7 px per streepje, dus de buis groeit mee */
    const span = Math.min(430, Math.max(190, n * 7));
    const W = 146, xL = 26, xR = 90, yTop = 42, yBot = yTop + span, H = yBot + 44;
    const y = v => yBot - (v / max) * (yBot - yTop);
    let ticks = "";
    for (let i = 0; i <= n; i++) {
      const v = rond(i * perStreep, 6), yy = y(v);
      const maj = Math.abs(v / major - Math.round(v / major)) < 1e-9;
      ticks += '<line x1="' + (xR - (maj ? 22 : 11)) + '" y1="' + yy.toFixed(1) + '" x2="' + xR + '" y2="' + yy.toFixed(1) +
               '" stroke="#64748b" stroke-width="' + (maj ? 1.6 : 0.9) + '"/>';
      /* getallen BUITEN de buis, anders lopen ze onder het water door */
      if (maj && v > 0) ticks += '<text x="' + (xR + 7) + '" y="' + (yy + 4).toFixed(1) + '" font-size="12" fill="#475569">' + nl(v) + '</text>';
    }
    const yw = y(waarde);
    const men = 'M ' + xL + ' ' + (yw - 5).toFixed(1) + ' Q ' + ((xL + xR) / 2) + ' ' + (yw + 4).toFixed(1) + ' ' + xR + ' ' + (yw - 5).toFixed(1);
    const voorwerp = opts.voorwerp ? '<ellipse cx="' + ((xL + xR) / 2) + '" cy="' + (yBot - 22) + '" rx="17" ry="13" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>' : "";
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="maatcilinder" style="display:block;margin:6px auto">' +
      '<rect x="' + xL + '" y="' + yw.toFixed(1) + '" width="' + (xR - xL) + '" height="' + (yBot - yw).toFixed(1) + '" fill="#bfdbfe" opacity="0.85"/>' + voorwerp +
      '<path d="' + men + '" fill="none" stroke="#3b82f6" stroke-width="1.6"/>' +
      '<line x1="' + xL + '" y1="' + yw.toFixed(1) + '" x2="' + xR + '" y2="' + yw.toFixed(1) + '" stroke="#2563eb" stroke-width="1.2" stroke-dasharray="3 3"/>' +
      '<path d="M ' + xL + ' ' + yTop + ' L ' + xL + ' ' + yBot + ' L ' + xR + ' ' + yBot + ' L ' + xR + ' ' + yTop + '" fill="none" stroke="#334155" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M ' + (xL - 8) + ' ' + (yBot + 16) + ' L ' + (xR + 8) + ' ' + (yBot + 16) + ' L ' + (xR - 2) + ' ' + yBot + ' L ' + (xL + 2) + ' ' + yBot + ' Z" fill="#e2e8f0" stroke="#334155" stroke-width="1.6" stroke-linejoin="round"/>' +
      ticks + '<text x="' + (xR + 7) + '" y="' + (yTop - 10) + '" font-size="12" fill="#334155" font-weight="700">mL</text></svg>';
  }
  function svgOnderdompel(max, major, per, begin, eind) {
    return '<div style="display:flex;gap:10px;justify-content:center;align-items:flex-end;flex-wrap:wrap">' +
      '<div style="text-align:center"><div style="font-size:.85rem;color:#475569;font-weight:700">beginstand</div>' + svgCilinder(max, major, per, begin) + '</div>' +
      '<div style="text-align:center"><div style="font-size:.85rem;color:#475569;font-weight:700">eindstand</div>' + svgCilinder(max, major, per, eind, { voorwerp: true }) + '</div></div>';
  }
  function svgWeegschaal(gram) {
    return '<svg viewBox="0 0 190 96" width="190" height="96" role="img" aria-label="weegschaal" style="display:block;margin:6px auto">' +
      '<rect x="6" y="30" width="178" height="52" rx="10" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>' +
      '<rect x="24" y="8" width="142" height="26" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/>' +
      '<rect x="46" y="44" width="98" height="28" rx="5" fill="#0f172a"/>' +
      '<text x="95" y="65" text-anchor="middle" font-size="19" fill="#4ade80" font-family="monospace">' + nl(gram) + '</text>' +
      '<text x="160" y="66" text-anchor="middle" font-size="12" fill="#334155" font-weight="700">g</text></svg>';
  }
  /* rechthoekig blok in schuine projectie, met maten */
  function svgBlok(l, b, h) {
    const s = 120 / Math.max(l, b, h, 1);
    const L = l * s, B = b * s * 0.5, Hh = h * s, x0 = 30, y0 = 30 + B + Hh;
    const W = Math.round(x0 + L + B + 70), H = Math.round(y0 + 34);
    const p = (pts, f) => '<polygon points="' + pts.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ') + '" fill="' + f + '" stroke="#334155" stroke-width="1.6" stroke-linejoin="round"/>';
    const voor = [[x0, y0], [x0 + L, y0], [x0 + L, y0 - Hh], [x0, y0 - Hh]];
    const top = [[x0, y0 - Hh], [x0 + L, y0 - Hh], [x0 + L + B, y0 - Hh - B], [x0 + B, y0 - Hh - B]];
    const zij = [[x0 + L, y0], [x0 + L + B, y0 - B], [x0 + L + B, y0 - Hh - B], [x0 + L, y0 - Hh]];
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="blok" style="display:block;margin:6px auto;max-width:100%;height:auto">' +
      p(voor, "#fde68a") + p(top, "#fef3c7") + p(zij, "#fcd34d") +
      '<text x="' + (x0 + L / 2) + '" y="' + (y0 + 20) + '" text-anchor="middle" font-size="13" fill="#334155">' + nl(l) + ' cm</text>' +
      '<text x="' + (x0 + L + B + 8) + '" y="' + (y0 - B - Hh / 2 + 4) + '" font-size="13" fill="#334155">' + nl(h) + ' cm</text>' +
      '<text x="' + (x0 + L + B / 2 + 8) + '" y="' + (y0 - B / 2 + 14) + '" font-size="13" fill="#334155">' + nl(b) + ' cm</text></svg>';
  }
  /* cilinder (blikje) met diameter of straal en hoogte */
  function svgCilVorm(maat, h, isDiameter) {
    const W = 230, H = 210, cx = 90, rx = 56, ry = 16, yT = 40, yB = 170;
    const pijl = isDiameter
      ? '<line x1="' + (cx - rx) + '" y1="' + yT + '" x2="' + (cx + rx) + '" y2="' + yT + '" stroke="#dc2626" stroke-width="2"/>' +
        '<text x="' + cx + '" y="' + (yT - 22) + '" text-anchor="middle" font-size="13" fill="#dc2626" font-weight="700">diameter ' + nl(maat) + ' cm</text>'
      : '<line x1="' + cx + '" y1="' + yT + '" x2="' + (cx + rx) + '" y2="' + yT + '" stroke="#dc2626" stroke-width="2"/>' +
        '<text x="' + cx + '" y="' + (yT - 22) + '" text-anchor="middle" font-size="13" fill="#dc2626" font-weight="700">straal ' + nl(maat) + ' cm</text>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="cilinder" style="display:block;margin:6px auto">' +
      '<path d="M ' + (cx - rx) + ' ' + yT + ' L ' + (cx - rx) + ' ' + yB + ' A ' + rx + ' ' + ry + ' 0 0 0 ' + (cx + rx) + ' ' + yB + ' L ' + (cx + rx) + ' ' + yT + '" fill="#bae6fd" stroke="#334155" stroke-width="1.8"/>' +
      '<ellipse cx="' + cx + '" cy="' + yT + '" rx="' + rx + '" ry="' + ry + '" fill="#e0f2fe" stroke="#334155" stroke-width="1.8"/>' +
      '<circle cx="' + cx + '" cy="' + yT + '" r="2.5" fill="#334155"/>' + pijl +
      '<line x1="' + (cx + rx + 18) + '" y1="' + yT + '" x2="' + (cx + rx + 18) + '" y2="' + yB + '" stroke="#334155" stroke-width="1.4"/>' +
      '<text x="' + (cx + rx + 24) + '" y="' + ((yT + yB) / 2 + 4) + '" font-size="13" fill="#334155">' + nl(h) + ' cm</text></svg>';
  }

  /* =====================================================================
     SVG: stroommeter en spanningsmeter met meetbereiken (zoals in het boek)
     Stroommeter: één schaal 0 tot 5; bussen 5 A, 0,5 A en 0,05 A.
     Spanningsmeter: één schaal 0 tot 30; bussen 30 V, 15 V en 3 V.
     Het rode snoer zit in het gekozen bereik: VOLLE UITSLAG = HET BEREIK.
     u = stand van de wijzer in schaaldelen (0..max).
     ===================================================================== */
  const METER = {
    A: { max: 5, nummerStap: 1, tick: 0.2, bereiken: [5, 0.5, 0.05], eenheid: "A", naam: "stroommeter" },
    V: { max: 30, nummerStap: 5, tick: 1, bereiken: [30, 15, 3], eenheid: "V", naam: "spanningsmeter" }
  };
  function svgMeter(soort, bereik, u) {
    const M = METER[soort], cx = 115, cy = 146, R = 100, A0 = 55 * Math.PI / 180;
    const ang = v => -A0 + 2 * A0 * (v / M.max);
    const pt = (v, r) => [cx + r * Math.sin(ang(v)), cy - r * Math.cos(ang(v))];
    let s = '<svg viewBox="0 0 300 196" width="300" height="196" role="img" aria-label="' + M.naam + '" style="display:block;margin:6px auto;max-width:100%;height:auto">' +
      '<rect x="4" y="4" width="292" height="170" rx="14" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>' +
      '<rect x="18" y="14" width="196" height="146" rx="6" fill="#fff" stroke="#334155" stroke-width="1.6"/>';
    const n = Math.round(M.max / M.tick);
    for (let i = 0; i <= n; i++) {
      const v = rond(i * M.tick, 6), maj = Math.abs(v / M.nummerStap - Math.round(v / M.nummerStap)) < 1e-9;
      const a = pt(v, R), b = pt(v, R - (maj ? 13 : 7));
      s += '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="#334155" stroke-width="' + (maj ? 1.8 : 1) + '"/>';
      if (maj) { const t = pt(v, R + 10); s += '<text x="' + t[0].toFixed(1) + '" y="' + (t[1] + 3).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#334155">' + nl(v) + '</text>'; }
    }
    const tip = pt(u, R - 4);
    s += '<text x="' + cx + '" y="' + (cy - 30) + '" text-anchor="middle" font-size="22" font-weight="700" fill="#334155">' + soort + '</text>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + tip[0].toFixed(1) + '" y2="' + tip[1].toFixed(1) + '" stroke="#dc2626" stroke-width="2.2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#334155"/>';
    M.bereiken.forEach((bk, i) => {
      const y = 36 + i * 34, gekozen = Math.abs(bk - bereik) < 1e-12;
      s += '<text x="250" y="' + (y + 4) + '" text-anchor="end" font-size="12" font-weight="700" fill="#334155">' + nl(bk) + ' ' + M.eenheid + '</text>' +
        '<circle cx="266" cy="' + y + '" r="8" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"/>';
      if (gekozen) s += '<path d="M 266 ' + y + ' C 300 ' + y + ' 296 ' + (y + 60) + ' 290 196" fill="none" stroke="#dc2626" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="266" cy="' + y + '" r="5" fill="#fff"/>';
    });
    s += '<text x="250" y="144" text-anchor="end" font-size="12" font-weight="700" fill="#334155">0</text>' +
      '<circle cx="266" cy="140" r="8" fill="#0f172a"/><path d="M 266 140 C 280 160 270 180 262 196" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/></svg>';
    return s;
  }
  const BEREIK_UITLEG = "Kijk eerst in welk bereik het rode snoer zit: de volle uitslag (helemaal rechts op de schaal) is dan precies dat bereik.";

  /* aflees-vraag; uitAntw = "basis" (A of V) of "milli" (mA of mV) */
  function afleesVraag(soort, bereik, uitAntw) {
    const M = METER[soort];
    const stappen = Math.round(M.max / M.tick);
    const k = ri(Math.round(stappen * 0.12), stappen - 2), u = rond(k * M.tick, 6);
    const waarde = rond(u * bereik / M.max, 6);
    const milli = uitAntw === "milli";
    const eenh = milli ? "m" + M.eenheid : M.eenheid;
    const antw = milli ? rond(waarde * 1000, 6) : waarde;
    const factor = rond(bereik / M.max, 6);
    return {
      t: "bouw",
      q: "Hoeveel " + (soort === "A" ? "stroom" : "spanning") + " geeft deze " + M.naam + " aan? Antwoord in <b>" + eenh + "</b>." +
         KLEIN("kijk eerst waar het rode snoer zit; alleen het getal") + svgMeter(soort, bereik, u),
      a: nl(antw),
      w: "Het rode snoer zit in het bereik " + nl(bereik) + " " + M.eenheid + ", dus de volle uitslag is " + nl(bereik) + " " + M.eenheid + ".",
      meer: "De wijzer staat op " + nl(u) + " van de " + nl(M.max) + " op de schaal. Met bereik " + nl(bereik) + " " + M.eenheid +
            " is elk schaaldeel " + nl(factor) + " " + M.eenheid + " waard: " + nl(u) + " × " + nl(factor) + " = " + nl(waarde) + " " + M.eenheid +
            (milli ? " = " + nl(antw) + " " + eenh + " (keer 1000, want mA is kleiner)." : ".") + " " + BEREIK_UITLEG
    };
  }

  /* =====================================================================
     SVG: schakelschema's
     wires = lijnen; comps = onderdelen die over de draad heen getekend worden
     (met een witte achtergrond, zodat de draad 'onder' het symbool doorloopt).
     ===================================================================== */
  const INK = "#334155";
  function teken(W, H, wires, comps) {
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="schakelschema" style="display:block;margin:8px auto;max-width:100%;height:auto">' +
      '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#fff"/>';
    wires.forEach(pl => { s += '<polyline points="' + pl.map(p => p[0] + ',' + p[1]).join(' ') + '" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>'; });
    comps.forEach(c => { s += comp(c); });
    return s + '</svg>';
  }
  function lbl(x, y, t, anchor, kleur) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" font-size="12.5" font-weight="700" fill="' + (kleur || INK) + '">' + t + '</text>';
  }
  function comp(c) {
    const x = c.x, y = c.y, h = c.o !== "v";
    const lx = h ? x : x + 17, ly = h ? y - 17 : y + 4, la = h ? "middle" : "start";
    switch (c.k) {
      case "lamp": {
        const d = 7.8;
        return '<circle cx="' + x + '" cy="' + y + '" r="11" fill="#fff" stroke="' + INK + '" stroke-width="2.2"/>' +
          '<line x1="' + (x - d) + '" y1="' + (y - d) + '" x2="' + (x + d) + '" y2="' + (y + d) + '" stroke="' + INK + '" stroke-width="2"/>' +
          '<line x1="' + (x - d) + '" y1="' + (y + d) + '" x2="' + (x + d) + '" y2="' + (y - d) + '" stroke="' + INK + '" stroke-width="2"/>' +
          (c.label ? lbl(lx, ly, c.label, la) : "");
      }
      case "meter":
        return '<circle cx="' + x + '" cy="' + y + '" r="11" fill="#fff" stroke="' + INK + '" stroke-width="2.2"/>' +
          lbl(x, y + 4.5, c.letter || "A") + (c.label ? lbl(h ? x : x + 17, h ? y - 17 : y + 4, c.label, la, "#1d4ed8") : "");
      case "switch": {
        const mask = h ? '<rect x="' + (x - 13) + '" y="' + (y - 4) + '" width="26" height="8" fill="#fff"/>' : '<rect x="' + (x - 4) + '" y="' + (y - 13) + '" width="8" height="26" fill="#fff"/>';
        const p1 = h ? [x - 12, y] : [x, y + 12], p2 = h ? [x + 12, y] : [x, y - 12];
        const eind = c.open ? (h ? [x + 10, y - 12] : [x - 12, y - 10]) : p2;
        return mask + '<circle cx="' + p1[0] + '" cy="' + p1[1] + '" r="2.6" fill="' + INK + '"/><circle cx="' + p2[0] + '" cy="' + p2[1] + '" r="2.6" fill="' + INK + '"/>' +
          '<line x1="' + p1[0] + '" y1="' + p1[1] + '" x2="' + eind[0] + '" y2="' + eind[1] + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>' +
          (c.label ? lbl(h ? x : x + 17, h ? y - 17 : y + 4, c.label, la) : "");
      }
      case "bat": {
        /* lange dunne streep = pluspool, korte dikke streep = minpool */
        if (h) return '<rect x="' + (x - 6) + '" y="' + (y - 16) + '" width="12" height="32" fill="#fff"/>' +
          '<line x1="' + (x - 4) + '" y1="' + (y - 14) + '" x2="' + (x - 4) + '" y2="' + (y + 14) + '" stroke="' + INK + '" stroke-width="2"/>' +
          '<line x1="' + (x + 4) + '" y1="' + (y - 7) + '" x2="' + (x + 4) + '" y2="' + (y + 7) + '" stroke="' + INK + '" stroke-width="5"/>' +
          lbl(x - 10, y - 16, "+", "middle") + (c.label ? lbl(x, y + 30, c.label) : "");
        return '<rect x="' + (x - 16) + '" y="' + (y - 6) + '" width="32" height="12" fill="#fff"/>' +
          '<line x1="' + (x - 14) + '" y1="' + (y - 4) + '" x2="' + (x + 14) + '" y2="' + (y - 4) + '" stroke="' + INK + '" stroke-width="2"/>' +
          '<line x1="' + (x - 7) + '" y1="' + (y + 4) + '" x2="' + (x + 7) + '" y2="' + (y + 4) + '" stroke="' + INK + '" stroke-width="5"/>' +
          lbl(x - 20, y - 4, "+", "middle") + (c.label ? lbl(x - 22, y + 18, c.label, "end") : "");
      }
      case "break":
        return (h ? '<rect x="' + (x - 6) + '" y="' + (y - 4) + '" width="12" height="8" fill="#fff"/>' : '<rect x="' + (x - 4) + '" y="' + (y - 6) + '" width="8" height="12" fill="#fff"/>') +
          '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="16" font-weight="800" fill="#dc2626">×</text>' +
          (c.label ? lbl(h ? x : x + 14, h ? y + 22 : y + 4, c.label, h ? "middle" : "start", "#dc2626") : "");
      case "gat":
        return '<rect x="' + (x - 18) + '" y="' + (y - 5) + '" width="36" height="10" fill="#fff"/>' +
          '<circle cx="' + (x - 16) + '" cy="' + y + '" r="3" fill="' + INK + '"/><circle cx="' + (x + 16) + '" cy="' + y + '" r="3" fill="' + INK + '"/>' +
          '<rect x="' + (x - 12) + '" y="' + (y - 5) + '" width="24" height="10" rx="3" fill="' + (c.kleur || "#fbbf24") + '" stroke="' + INK + '" stroke-width="1.2"/>' +
          lbl(x, y + 24, c.label || "");
      case "punt":
        return '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#7c3aed"/>' + lbl(x + (c.dx || 9), y + (c.dy || -8), c.label, "start", "#7c3aed");
    }
    return "";
  }
  /* serie: batterij links, onderdelen boven (links naar rechts), optioneel onder */
  function serieSchema(boven, onder) {
    const W = 320, H = 190, xL = 34, xR = 290, yT = 46, yB = 160;
    const wires = [[[xL, yT], [xR, yT], [xR, yB], [xL, yB], [xL, yT]]];
    const comps = [{ k: "bat", x: xL, y: (yT + yB) / 2, o: "v" }];
    const zet = (lijst, y) => lijst.forEach((c, i) => comps.push(Object.assign({ x: Math.round(xL + (xR - xL) * (i + 1) / (lijst.length + 1)), y: y, o: "h" }, c)));
    zet(boven, yT); if (onder) zet(onder.map(c => Object.assign({}, c, { below: true })), yB);
    comps.forEach(c => { if (c.below && c.label && c.k !== "break") c.labelOnder = true; });
    return teken(W, H, wires, comps.map(c => c.labelOnder ? Object.assign({}, c, { o: "h" }) : c));
  }
  /* parallel: batterij links, takken verticaal tussen bovenrail en onderrail.
     takken[i] = {lamp:"L1", sw:{open}, brk:true, meter:"A2 = …", gat:{…}}
     hoofd = onderdelen in de hoofdstroom (bovenrail links van de eerste tak)
     rail = [{na:i, meter:"…"}]: meter op de bovenrail tussen tak i en tak i+1 */
  function parSchema(takken, hoofd, rail, punten) {
    const k = takken.length, xL = 34, x0 = 120, dx = 78, yT = 40, yB = 176, W = Math.max(300, x0 + dx * (k - 1) + 70), H = 200;
    const xs = takken.map((_, i) => x0 + dx * i), xEnd = xs[k - 1];
    const wires = [[[xL, yT], [xEnd, yT]], [[xL, yB], [xEnd, yB]], [[xL, yT], [xL, yB]]];
    xs.forEach(x => wires.push([[x, yT], [x, yB]]));
    const comps = [{ k: "bat", x: xL, y: (yT + yB) / 2, o: "v" }];
    (hoofd || []).forEach((c, i) => comps.push(Object.assign({ x: 78, y: i === 0 ? yT : yB, o: "h" }, c)));
    takken.forEach((t, i) => {
      const x = xs[i];
      if (t.sw) comps.push({ k: "switch", x: x, y: 74, o: "v", open: t.sw.open });
      if (t.gat) comps.push(Object.assign({ k: "gat", x: x, y: 74 }, t.gat));
      comps.push({ k: "lamp", x: x, y: 112, o: "v", label: t.lamp });
      if (t.meter) comps.push({ k: "meter", x: x, y: 148, o: "v", letter: "A", label: t.meter });
      if (t.brk) comps.push({ k: "break", x: x, y: 150, o: "v" });
    });
    (rail || []).forEach(r => comps.push({ k: "meter", x: Math.round((xs[r.na] + xs[r.na + 1]) / 2), y: yT, o: "h", letter: "A", label: r.meter }));
    (punten || []).forEach(p => comps.push(Object.assign({ k: "punt" }, p)));
    return teken(W, H, wires, comps);
  }
  const L = i => "L" + (i + 1);
  function lijstNaam(arr) {
    if (!arr.length) return "Geen enkel lampje";
    if (arr.length === 1) return "Alleen " + arr[0];
    return arr.slice(0, -1).join(", ") + " en " + arr[arr.length - 1];
  }
  /* alle opties voor "welke lampjes branden" bij n lampjes, goed + 3 plausibele fouten */
  function brandOpties(n, brandend) {
    const alle = []; for (let i = 0; i < n; i++) alle.push(L(i));
    const kand = [[], alle.slice()];
    alle.forEach(x => { kand.push([x]); kand.push(alle.filter(y => y !== x)); });
    const goed = lijstNaam(brandend);
    const uniek = []; kand.forEach(c => { const s = c.length === n && n > 1 ? (n === 2 ? "Allebei" : "Alle " + (n === 3 ? "drie" : n)) : lijstNaam(c); if (uniek.indexOf(s) < 0) uniek.push(s); });
    const goedLabel = brandend.length === n && n > 1 ? (n === 2 ? "Allebei" : "Alle " + (n === 3 ? "drie" : n)) : goed;
    return { goed: goedLabel, fout: schud(uniek.filter(s => s !== goedLabel)).slice(0, 3) };
  }

  /* =====================================================================
     OMREKENEN
     ===================================================================== */
  const GROOT = { kg: "g", L: "mL", A: "mA", V: "mV", "dm³": "cm³" };
  /* naar = null: de andere eenheid van het paar */
  const ANDER = { kg: "g", g: "kg", L: "mL", mL: "L", A: "mA", mA: "A", V: "mV", mV: "V", "dm³": "cm³", "cm³": "dm³" };
  function omreken(waarde, van, naar) {
    naar = naar || ANDER[van];
    const omlaag = GROOT[van] === naar;              // groot -> klein: keer 1000
    const antwoord = rond(omlaag ? waarde * 1000 : waarde / 1000, 6);
    return {
      t: "bouw",
      q: "Reken om: <b>" + nl(waarde) + " " + van + " = ___ " + naar + "</b>" + KLEIN("alleen het getal"),
      a: nl(antwoord),
      w: omlaag ? van + " is groter dan " + naar + ", dus keer 1000: het getal wordt groter."
                : van + " is kleiner dan " + naar + ", dus gedeeld door 1000: het getal wordt kleiner.",
      meer: nl(waarde) + (omlaag ? " × 1000 = " : " : 1000 = ") + nl(antwoord) + " " + naar + ". De komma schuift drie plaatsen naar " +
            (omlaag ? "rechts" : "links") + ". Check: een kleine eenheid hoort bij een groot getal, een grote eenheid bij een klein getal."
    };
  }
  const PAREN = [["kg", "g"], ["L", "mL"], ["A", "mA"], ["V", "mV"]];
  function omrekenMc() {
    const p = pick(PAREN), omlaag = Math.random() < 0.5;
    const v = omlaag ? rond(ri(11, 990) / 1000, 3) : ri(12, 980);
    const van = omlaag ? p[0] : p[1], naar = omlaag ? p[1] : p[0];
    const goedG = omlaag ? rond(v * 1000, 6) : rond(v / 1000, 6);
    const verkeerdeKant = omlaag ? rond(v / 1000, 9) : rond(v * 1000, 6);
    const tweePlaatsen = omlaag ? rond(v * 100, 6) : rond(v / 100, 6);
    const goed = nl(goedG) + " " + naar, f = {};
    f[nl(verkeerdeKant) + " " + naar] = "dat is de verkeerde kant op. Van " + van + " naar " + naar + " is " + (omlaag ? "groot naar klein, dus het getal moet groter worden" : "klein naar groot, dus het getal moet kleiner worden") + ".";
    f[nl(tweePlaatsen) + " " + naar] = "je schoof de komma maar twee plaatsen. Duizend heeft drie nullen, dus drie plaatsen.";
    f[nl(v) + " " + naar] = "je veranderde alleen de eenheid. Een andere eenheid betekent ook een ander getal (behalve bij mL en cm³).";
    return mc("Welke omrekening klopt? <b>" + nl(v) + " " + van + " = …</b>", goed, f,
      nl(v) + " " + van + " = " + goed + ".",
      "Uitkomstcheck: " + (omlaag ? naar + " is een kleinere eenheid, dus je hebt er méér van nodig." : naar + " is een grotere eenheid, dus je hebt er minder van nodig."));
  }

  /* =====================================================================
     DATA voor begrips-generatoren
     ===================================================================== */
  const SETJES = [
    { g: "lengte", s: "l", e: "meter (m)", i: "liniaal of meetlint" },
    { g: "massa", s: "m", e: "kilogram (kg)", i: "weegschaal" },
    { g: "volume", s: "V", e: "kubieke centimeter (cm³)", i: "maatcilinder" },
    { g: "tijd", s: "t", e: "seconde (s)", i: "stopwatch" },
    { g: "temperatuur", s: "T", e: "graden Celsius (°C)", i: "thermometer" },
    { g: "stroomsterkte", s: "I", e: "ampère (A)", i: "stroommeter" },
    { g: "spanning", s: "U", e: "volt (V)", i: "spanningsmeter" },
    { g: "gewicht", s: "F", e: "newton (N)", i: "veerunster" }
  ];
  const ZINNEN = [
    ["De lengte van het voetbalveld is 105 meter", "105", "meter", "lengte"],
    ["De massa van de jas die Storm met haar moeder kocht is 850 gram", "850", "gram", "massa"],
    ["Het volume van het pak melk is 1 liter", "1", "liter", "volume"],
    ["De stroomsterkte door het lampje is 0,25 ampère", "0,25", "ampère", "stroomsterkte"],
    ["De spanning van de blokbatterij is 9 volt", "9", "volt", "spanning"],
    ["De temperatuur van het zwembad is 27 graden Celsius", "27", "graden Celsius", "temperatuur"],
    ["De wedstrijd van Blauw Geel duurt 70 minuten", "70", "minuten", "tijd"],
    ["Het gewicht van de tas is 40 newton", "40", "newton", "gewicht"]
  ];
  const MATERIALEN = [
    ["koper", true, "koper is een metaal, en metalen geleiden. Koper zit binnenin elk snoer."],
    ["aluminium", true, "aluminium is een metaal en geleidt zelfs heel goed, net als koper."],
    ["staal", true, "staal is een metaal, dus een geleider (een paperclip werkt in het gat)."],
    ["ijzer", true, "ijzer is een metaal. Het geleidt iets minder goed dan koper, maar het geleidt wel."],
    ["lood", true, "lood is een metaal, dus een geleider, al geleidt het minder goed dan koper."],
    ["potloodstift (grafiet)", true, "grafiet is koolstof. Geen metaal, maar het geleidt toch: de uitzondering."],
    ["rubber", false, "rubber is geen metaal: een isolator. Daarom hebben elektriciens rubberen handschoenen."],
    ["glas", false, "glas is hard, maar geen metaal: een isolator. Hard zijn zegt niets over geleiden."],
    ["plastic", false, "de meeste plastics zijn isolatoren. Daarom zit er plastic om het koper van een snoer."],
    ["lucht", false, "lucht is een isolator. Daarom gaat het lampje uit als de schakelaar open staat."],
    ["hout", false, "droog hout is geen metaal en isoleert."],
    ["papier", false, "papier is geen metaal: een isolator."]
  ];
  const BRONNEN = [
    ["een knoopcel", 3, true], ["een staafbatterij (AA)", 1.5, true], ["een oplaadbare batterij", 1.2, true],
    ["een blokbatterij", 9, true], ["de accu van een scooter", 12, true], ["de accu van een snoerloze boormachine", 18, true],
    ["het stopcontact", 230, false], ["de bovenleiding van de trein", 1500, false], ["een hoogspanningsmast", 150000, false]
  ];

  window.GENERATORS = {

    /* ================= GROOTHEID ================= */
    grootheid_n1: [
      () => {
        const s = pick(SETJES), f = {};
        schud(SETJES.filter(x => x !== s)).slice(0, 3).forEach(x => { f[x.e] = x.e + " is de eenheid van " + x.g + ", niet van " + s.g + "."; });
        return mc("Welke eenheid hoort bij de grootheid <b>" + s.g + "</b>?", s.e, f, "Bij " + s.g + " hoort de eenheid " + s.e + ".",
          "Leer de setjes: " + s.g + " → " + s.e + " → " + s.i + ". Test: '25 " + s.e.split(" ")[0] + "' kan, '25 " + s.g + "' niet.");
      },
      () => {
        const z = pick(ZINNEN), wat = pick(["meetwaarde", "eenheid", "grootheid"]);
        const goed = wat === "meetwaarde" ? z[1] : wat === "eenheid" ? z[2] : z[3];
        const f = {};
        if (wat !== "meetwaarde") f[z[1]] = z[1] + " is het kale getal: de meetwaarde.";
        if (wat !== "eenheid") f[z[2]] = z[2] + " staat achter het getal: dat is de eenheid.";
        if (wat !== "grootheid") f[z[3]] = z[3] + " is wat er gemeten wordt: de grootheid.";
        return mc("'" + z[0] + ".' Wat is hier de <b>" + wat + "</b>?", goed, f,
          "Meetwaarde = het getal, eenheid = wat achter het getal staat, grootheid = wat je meet.",
          "In deze zin: meetwaarde " + z[1] + ", eenheid " + z[2] + ", grootheid " + z[3] + ".");
      }
    ],
    grootheid_n2: [
      () => {
        const s = pick(SETJES), f = {};
        schud(SETJES.filter(x => x !== s)).slice(0, 3).forEach(x => { f[x.i] = "met een " + x.i + " meet je " + x.g + ", niet " + s.g + "."; });
        return mc("Met welk meetinstrument meet je de <b>" + s.g + "</b>?", s.i, f, "De " + s.g + " meet je met een " + s.i + ".",
          "Setje: " + s.g + " → " + s.e + " → " + s.i + ".");
      },
      () => {
        const s = pick(SETJES.filter(x => x.g !== "temperatuur")), f = {};
        schud(SETJES.filter(x => x !== s && x.g !== "temperatuur")).slice(0, 3).forEach(x => { f[x.s] = x.s + " is het symbool van " + x.g + "."; });
        return mc("Wat is het <b>symbool</b> van de grootheid " + s.g + " op de formulekaart?", s.s, f, "Het symbool van " + s.g + " is " + s.s + ".",
          "Pas op: het symbool van de grootheid is iets anders dan de eenheid. Stroomsterkte heeft symbool I en eenheid A; spanning heeft symbool U en eenheid V.");
      }
    ],
    grootheid_n3: [
      () => {
        const s = pick(SETJES.filter(x => x.g !== "temperatuur")), ander = pick(SETJES.filter(x => x !== s && x.g !== "temperatuur"));
        const getal = ri(2, 95), eenh = s.e.split(" ")[0], f = {};
        const goed = "De " + s.g + " is " + getal + " " + eenh + ".";
        f["De " + s.g + " is " + getal + "."] = "er staat geen eenheid achter het getal. " + getal + " wat? Zonder eenheid is een meting niet af.";
        f["De " + eenh + " is " + getal + " " + s.g + "."] = "grootheid en eenheid zijn omgedraaid. '" + getal + " " + s.g + "' kan niet: achter een getal hoort een eenheid.";
        f["De " + s.g + " is " + getal + " " + ander.e.split(" ")[0] + "."] = ander.e.split(" ")[0] + " is de eenheid van " + ander.g + ", niet van " + s.g + ".";
        return mc("Welke zin is natuurkundig <b>helemaal goed</b>?", goed, f,
          "Grootheid, dan het getal (meetwaarde), dan de eenheid die bij die grootheid hoort.",
          "Setje: " + s.g + " → " + s.e + ". 'Ik weeg 52' is dus niet goed: je mist de eenheid (en eigenlijk bedoel je je massa).");
      },
      () => {
        const s = pick(SETJES.filter(x => x.g === "stroomsterkte" || x.g === "spanning" || x.g === "massa" || x.g === "gewicht"));
        const ander = s.g === "stroomsterkte" ? SETJES[6] : s.g === "spanning" ? SETJES[5] : s.g === "massa" ? SETJES[7] : SETJES[1];
        const f = {};
        f[ander.e] = ander.e + " is de eenheid van " + ander.g + ". " + s.g + " en " + ander.g + " zijn twee verschillende dingen.";
        f[s.g] = "dat is de grootheid zelf, geen eenheid. '25 " + s.g + "' kan niet.";
        f[s.i] = "dat is het meetinstrument, niet de eenheid.";
        return mc("Welke eenheid gebruik je voor <b>" + s.g + "</b>? Let op de instinker.", s.e, f,
          s.g + " druk je uit in " + s.e + ".",
          "Deze twee worden vaak verwisseld: massa (kg) en gewicht (N), en stroomsterkte (A) en spanning (V).");
      }
    ],

    /* ================= MASSA EN GEWICHT ================= */
    "massa-gewicht_n1": [
      () => {
        const kg = ri(2, 80);
        return { t: "bouw", q: "Een tas heeft een massa van <b>" + kg + " kg</b>. Hoe groot is het gewicht op aarde in newton?" + KLEIN("op aarde hoort bij 1 kg ongeveer 10 N; alleen het getal"),
          a: String(kg * 10), w: "Op aarde: gewicht in N ≈ massa in kg × 10.",
          meer: kg + " × 10 = " + (kg * 10) + " N. Massa (kg) is hoeveel stof er is, gewicht (N) is hoe hard de tas op de grond drukt." };
      },
      () => {
        const g = ri(1, 5) * 1000 + ri(0, 9) * 100;
        return { t: "bouw", q: "Storm weegt een stapel nieuwe kleren op de keukenweegschaal: <b>" + nl(g) + " g</b>. Hoeveel kg is de massa?" + KLEIN("alleen het getal"),
          a: nl(rond(g / 1000, 6)), w: "g naar kg is klein naar groot: gedeeld door 1000.",
          meer: nl(g) + " : 1000 = " + nl(rond(g / 1000, 6)) + " kg. Een weegschaal geeft de massa in g of kg." };
      }
    ],
    "massa-gewicht_n2": [
      () => {
        const kg = pick([30, 36, 42, 48, 54, 60, 66]);
        const f = {};
        f[nl(kg / 6) + " kg"] = "op de maan is je GEWICHT zes keer zo klein, maar je massa niet. Er is niets van je af gegaan.";
        f[nl(kg * 10) + " kg"] = "dat is je gewicht op aarde in newton (" + (kg * 10) + " N), en dan nog met de verkeerde eenheid.";
        f[nl(kg * 6) + " kg"] = "op de maan wordt niets groter: de aarde trekt minder, dus je gewicht wordt kleiner en je massa blijft gelijk.";
        return mc("Een astronaut heeft op aarde een massa van <b>" + kg + " kg</b>. Wat is haar <b>massa</b> op de maan?", kg + " kg", f,
          "Massa is de hoeveelheid stof. Die is overal even groot.",
          "Wat wél verandert is het gewicht: op aarde ± " + (kg * 10) + " N, op de maan ± " + nl(kg * 10 / 6) + " N, zes keer zo klein.");
      },
      () => {
        const kg = pick([30, 36, 42, 48, 54, 60]);
        return { t: "velden", q: "Een astronaut van <b>" + kg + " kg</b> gaat naar de maan. Op de maan is het gewicht ongeveer zes keer zo klein.",
          velden: [{ label: "gewicht op aarde (N)", a: String(kg * 10) }, { label: "massa op de maan (kg)", a: String(kg) }, { label: "gewicht op de maan (N)", a: nl(kg * 10 / 6) }],
          w: "Massa blijft gelijk, gewicht wordt zes keer zo klein.",
          meer: "Aarde: " + kg + " × 10 = " + (kg * 10) + " N. Maan: massa nog steeds " + kg + " kg, gewicht " + (kg * 10) + " : 6 = " + nl(kg * 10 / 6) + " N." };
      }
    ],
    "massa-gewicht_n3": [
      () => {
        const N = ri(5, 90) * 10;
        return { t: "bouw", q: "Een zak zwemspullen hangt aan een veerunster die <b>" + N + " N</b> aangeeft (op aarde). Wat is de massa in kg?" + KLEIN("alleen het getal"),
          a: nl(N / 10), w: "Terugrekenen: massa in kg ≈ gewicht in N : 10.",
          meer: N + " : 10 = " + nl(N / 10) + " kg. Let op de eenheid: newton is gewicht (kracht), kilogram is massa." };
      },
      () => {
        const kg = pick([42, 48, 54, 60, 66]);
        return { t: "velden", q: "Een personenweegschaal meet eigenlijk hoe hard je drukt en rekent dat om naar kg zoals op aarde. Iemand van <b>" + kg + " kg</b> gaat er op de maan op staan.",
          velden: [{ label: "echte massa op de maan (kg)", a: String(kg) }, { label: "wat de weegschaal aangeeft (kg)", a: String(kg / 6) }],
          w: "De massa blijft " + kg + " kg, maar ze drukt zes keer zo zacht, dus de weegschaal geeft zes keer zo weinig aan.",
          meer: "De weegschaal 'denkt' dat ze op aarde staat: " + kg + " : 6 = " + (kg / 6) + " kg op het schermpje. Haar massa is niet veranderd: daarom zeggen we in de natuurkunde niet 'ik weeg " + kg + " kilo' maar 'mijn massa is " + kg + " kg'." };
      }
    ],

    /* ================= VOLUME (incl. aflezen) ================= */
    volume_n1: [
      () => {
        const l = ri(2, 8), b = ri(1, 6), h = ri(1, 6);
        return { t: "bouw", q: "Wat is het volume van dit blok in cm³?" + KLEIN("alleen het getal") + svgBlok(l, b, h),
          a: String(l * b * h), w: "volume = lengte × breedte × hoogte.",
          meer: l + " × " + b + " × " + h + " = " + (l * b * h) + " cm³. Je vult het blok in gedachten met " + (l * b * h) + " blokjes van 1 cm³." };
      },
      () => {
        const waarde = ri(6, 46);
        return { t: "bouw", q: "Hoeveel <b>mL</b> water zit er in deze maatcilinder?" + KLEIN("elk klein streepje is 1 mL; alleen het getal") + svgCilinder(50, 10, 1, waarde),
          a: String(waarde), w: "Tussen twee genummerde streepjes liggen 10 vakjes, dus elk streepje is 1 mL.",
          meer: "Begin bij het genummerde streepje eronder en tel de streepjes erbij op: " + waarde + " mL. Lees af op ooghoogte, bij het vlakke deel." };
      },
      () => {
        const begin = ri(2, 6) * 10, vol = ri(5, 35), eind = begin + vol;
        return { t: "bouw", q: "Onderdompelmethode: beginstand <b>" + begin + " mL</b>, eindstand <b>" + eind + " mL</b>. Wat is het volume van de steen in cm³?" + KLEIN("alleen het getal"),
          a: String(vol), w: "volume = eindstand − beginstand.",
          meer: eind + " − " + begin + " = " + vol + " mL = " + vol + " cm³. Het water stijgt precies zoveel als de ruimte die de steen inneemt." };
      }
    ],
    volume_n2: [
      () => {
        const per = pick([2, 5]), max = per === 2 ? 100 : 250, major = per === 2 ? 10 : 50;
        const waarde = ri(3, Math.round(max / per) - 3) * per;
        return { t: "bouw", q: "Hoeveel <b>mL</b> zit er in deze maatcilinder?" + KLEIN("zoek eerst uit hoeveel één streepje waard is; alleen het getal") + svgCilinder(max, major, per, waarde),
          a: String(waarde), w: "Tussen twee genummerde streepjes liggen " + (major / per) + " vakjes, dus elk streepje is " + per + " mL.",
          meer: major + " : " + (major / per) + " = " + per + " mL per streepje. Je leest " + waarde + " mL af. Minder vakjes betekent dat elk streepje méér waard is." };
      },
      () => {
        const r = ri(2, 5), h = ri(4, 12), v = Math.round(3.14 * r * r * h);
        return { t: "bouw", q: "Bereken het volume van deze cilinder in cm³. Neem π = 3,14 en <b>rond af op een heel getal</b>." + KLEIN("alleen het getal") + svgCilVorm(r, h, false),
          a: String(v), w: "volume = π × straal × straal × hoogte.",
          meer: "3,14 × " + r + " × " + r + " × " + h + " = " + nl(rond(3.14 * r * r * h, 2)) + ", afgerond " + v + " cm³. Hier staat de straal er al; bij een diameter deel je eerst door 2." };
      },
      () => {
        const l10 = ri(15, 80), b = ri(1, 5), h = ri(1, 5), l = rond(l10 / 10, 1), v = rond(l * b * h, 2);
        return { t: "bouw", q: "Een gum is <b>" + nl(l) + " cm</b> bij <b>" + b + " cm</b> bij <b>" + h + " cm</b>. Wat is het volume in cm³?" + KLEIN("alleen het getal"),
          a: nl(v), w: "Ook met kommagetallen: lengte × breedte × hoogte.", meer: nl(l) + " × " + b + " × " + h + " = " + nl(v) + " cm³." };
      }
    ],
    volume_n3: [
      () => {
        const d = pick([4, 6, 8, 10]), h = ri(5, 15), r = d / 2, v = Math.round(3.14 * r * r * h);
        return { t: "velden", q: "Een blikje heeft deze maten. Neem π = 3,14 en <b>rond het volume af op een heel getal</b>." + svgCilVorm(d, h, true),
          velden: [{ label: "straal (cm)", a: String(r) }, { label: "volume (cm³)", a: String(v) }],
          w: "Eerst de diameter halveren: straal = " + d + " : 2 = " + r + " cm. Dan π × r × r × h.",
          meer: "3,14 × " + r + " × " + r + " × " + h + " = " + nl(rond(3.14 * r * r * h, 2)) + " ≈ " + v + " cm³. Reken je met de diameter (" + d + "), dan wordt je antwoord 4 keer te groot: " + Math.round(3.14 * d * d * h) + " cm³. Dat is de Diameterdief." };
      },
      () => {
        const begin = ri(3, 6) * 10, vol = ri(2, 6) * 5;
        return { t: "bouw", q: "Een steen gaat in de maatcilinder. Bepaal het <b>volume van de steen</b> in cm³." + KLEIN("zoek eerst uit hoeveel één streepje waard is; alleen het getal") + svgOnderdompel(100, 10, 5, begin, begin + vol),
          a: String(vol), w: "Elk streepje is 10 : 2 = 5 mL. volume = eindstand − beginstand.",
          meer: "Beginstand " + begin + " mL, eindstand " + (begin + vol) + " mL: " + (begin + vol) + " − " + begin + " = " + vol + " mL = " + vol + " cm³." };
      },
      () => {
        const l = ri(1, 3), b = ri(1, 3), h = ri(4, 9), vol = l * b * h, begin = ri(3, 6) * 10;
        return { t: "stap", opgave: "Een staafje van " + l + " × " + b + " × " + h + " cm gaat in een maatcilinder waar het water op " + begin + " mL staat. Bereken het volume en daarna de eindstand.",
          stappen: [
            { prompt: "Volume van het staafje in cm³", a: String(vol), hints: ["volume = lengte × breedte × hoogte", l + " × " + b + " = " + (l * b), (l * b) + " × " + h + " = " + vol] },
            { prompt: "Eindstand van het water in mL", a: String(begin + vol), hints: ["Het water stijgt met precies het volume van het staafje", "1 cm³ = 1 mL", begin + " + " + vol + " = " + (begin + vol)] }],
          w: "eindstand = beginstand + volume.", meer: "Het staafje duwt " + vol + " mL water omhoog: van " + begin + " naar " + (begin + vol) + " mL." };
      }
    ],

    /* ================= DICHTHEID ================= */
    dichtheid_n1: [
      () => {
        const stof = pick(EENDEC), vol = pick([2, 4, 5, 10, 20]), massa = rond(stof[1] * vol, 2);
        return { t: "bouw", q: "Een voorwerp heeft een massa van <b>" + nl(massa) + " g</b> en een volume van <b>" + vol + " cm³</b>. Wat is de dichtheid in g/cm³?" + KLEIN("alleen het getal"),
          a: nl(stof[1]), w: "dichtheid = massa / volume.",
          meer: nl(massa) + " : " + vol + " = " + nl(stof[1]) + " g/cm³: in élk blokje van 1 cm³ zit " + nl(stof[1]) + " gram. Volgens tabel 1 kan het " + stof[0] + " zijn." };
      },
      () => {
        const stof = pick(EENDEC), n = pick([3, 4, 5, 8]), massa = rond(stof[1] * n, 2);
        return { t: "bouw", q: "Je verdeelt een blokje van <b>" + n + " cm³</b> in gedachten in " + n + " blokjes van 1 cm³. Het hele blokje heeft een massa van <b>" + nl(massa) + " g</b>. Hoeveel gram zit er in één blokje?" + KLEIN("alleen het getal"),
          a: nl(stof[1]), w: "Verdelen: de massa delen door het aantal blokjes van 1 cm³.",
          meer: nl(massa) + " : " + n + " = " + nl(stof[1]) + " g per cm³. Dát is de dichtheid: gram PER kubieke centimeter." };
      }
    ],
    dichtheid_n2: [
      () => {
        const stof = pick(EENDEC.filter(s => s[1] !== 1.0)), vol = pick([5, 10, 20, 25]), massa = rond(stof[1] * vol, 2);
        const anderen = schud(STOFFEN.filter(s => s[0] !== stof[0] && Math.abs(s[1] - stof[1]) > 0.05)).slice(0, 3);
        const f = {}; anderen.forEach(s => { f[s[0]] = s[0] + " heeft " + nl(s[1]) + " g/cm³ in tabel 1. Jij moet eerst uitrekenen: " + nl(massa) + " : " + vol + " = " + nl(stof[1]) + "."; });
        return mc("Een voorwerp heeft een massa van <b>" + nl(massa) + " g</b> en een volume van <b>" + vol + " cm³</b>. Van welke stof is het? (tabel 1)", stof[0], f,
          nl(massa) + " : " + vol + " = " + nl(stof[1]) + " g/cm³, en dat is " + stof[0] + ".", "Eerst de dichtheid uitrekenen, dan opzoeken. Raden aan de massa alleen gaat mis: zwaar zegt niets zonder volume.");
      },
      () => {
        const stof = pick(EENDEC), z = pick([2, 3, 4, 5]), vol = z * z * z, massa = rond(stof[1] * vol, 2);
        return { t: "velden", q: "Een kubus met ribben van <b>" + z + " cm</b> heeft een massa van <b>" + nl(massa) + " g</b>. Bereken eerst het volume en dan de dichtheid.",
          velden: [{ label: "volume (cm³)", a: String(vol) }, { label: "dichtheid (g/cm³)", a: nl(stof[1]) }],
          w: "Eerst volume = l × b × h, dan dichtheid = massa / volume.",
          meer: z + " × " + z + " × " + z + " = " + vol + " cm³ en " + nl(massa) + " : " + vol + " = " + nl(stof[1]) + " g/cm³ (" + stof[0] + ")." };
      },
      () => {
        const stof = pick(EENDEC), begin = ri(2, 5) * 10, vol = pick([10, 20, 25]), massa = rond(stof[1] * vol, 2);
        return { t: "stap", opgave: "Een voorwerp met een massa van " + nl(massa) + " g wordt ondergedompeld. Beginstand " + begin + " mL, eindstand " + (begin + vol) + " mL. Bereken de dichtheid.",
          stappen: [
            { prompt: "Volume in cm³", a: String(vol), hints: ["volume = eindstand − beginstand", (begin + vol) + " − " + begin, "= " + vol + " (1 mL = 1 cm³)"] },
            { prompt: "Dichtheid in g/cm³", a: nl(stof[1]), hints: ["dichtheid = massa / volume", nl(massa) + " : " + vol, "= " + nl(stof[1])] }],
          w: "Eerst het volume uit de twee standen, dan pas delen.", meer: "Volume " + vol + " cm³, dichtheid " + nl(massa) + " : " + vol + " = " + nl(stof[1]) + " g/cm³ (" + stof[0] + ")." };
      }
    ],
    dichtheid_n3: [
      () => {
        const stof = pick(STOFFEN.filter(s => Number.isInteger(rond(s[1] * 100, 6)))), volDm = pick([2, 4, 5, 10, 20]), kg = rond(stof[1] * volDm, 3);
        return { t: "stap", opgave: "Een voorwerp heeft een massa van " + nl(kg) + " kg en een volume van " + volDm + " dm³. Bereken de dichtheid in g/cm³.",
          stappen: [
            { prompt: "Massa in gram", a: nl(rond(kg * 1000, 3)), hints: ["kg naar g: keer 1000", nl(kg) + " × 1000", "= " + nl(rond(kg * 1000, 3))] },
            { prompt: "Volume in cm³", a: String(volDm * 1000), hints: ["dm³ naar cm³: ook keer 1000", volDm + " × 1000", "= " + (volDm * 1000)] },
            { prompt: "Dichtheid in g/cm³", a: nl(stof[1]), hints: ["dichtheid = massa / volume", nl(rond(kg * 1000, 3)) + " : " + (volDm * 1000), "= " + nl(stof[1])] }],
          w: "Eerst allebei omrekenen naar g en cm³, dan pas delen.", meer: "Zo komt de eenheid g/cm³ eruit. Volgens tabel 1 is dit " + stof[0] + "." };
      },
      () => {
        const stof = pick(EENDEC), vol = pick([4, 6, 10, 20]), massa = rond(stof[1] * vol, 2);
        return { t: "velden", q: "Een blok heeft een massa van <b>" + nl(massa) + " g</b> en een volume van <b>" + vol + " cm³</b>. Het wordt <b>doormidden gezaagd</b>. Vul in voor één helft:",
          velden: [{ label: "massa (g)", a: nl(rond(massa / 2, 3)) }, { label: "volume (cm³)", a: nl(vol / 2) }, { label: "dichtheid (g/cm³)", a: nl(stof[1]) }],
          w: "Massa én volume halveren, dus de dichtheid blijft hetzelfde.",
          meer: "Heel: " + nl(massa) + " : " + vol + " = " + nl(stof[1]) + ". Half: " + nl(rond(massa / 2, 3)) + " : " + nl(vol / 2) + " = " + nl(stof[1]) + ". Dichtheid is een stofeigenschap: half zo groot is NIET half zo dicht." };
      },
      () => {
        const stof = pick(EENDEC), l = ri(2, 5), b = ri(2, 5), h = ri(2, 5), vol = l * b * h, massa = rond(stof[1] * vol, 2);
        return { t: "velden", q: "Dit blok heeft een massa van <b>" + nl(massa) + " g</b>." + svgBlok(l, b, h),
          velden: [{ label: "volume (cm³)", a: String(vol) }, { label: "dichtheid (g/cm³)", a: nl(stof[1]) }],
          w: "Eerst volume = l × b × h, daarna massa / volume.", meer: l + " × " + b + " × " + h + " = " + vol + " cm³ en " + nl(massa) + " : " + vol + " = " + nl(stof[1]) + " g/cm³, dus " + stof[0] + "." };
      }
    ],

    /* ================= DRIJVEN ================= */
    drijven_n1: [
      () => {
        const drijft = Math.random() < 0.5, d = drijft ? rond(ri(20, 97) / 100, 2) : rond(ri(105, 1900) / 100, 2);
        const f = drijft
          ? { "Zinken": "zinken gebeurt bij een dichtheid groter dan 1,0. " + nl(d) + " is juist kleiner.", "Zweven": "zweven is alleen bij precies 1,0 g/cm³." }
          : { "Drijven": "drijven gebeurt bij een dichtheid kleiner dan 1,0. " + nl(d) + " is juist groter.", "Zweven": "zweven is alleen bij precies 1,0 g/cm³." };
        return mc("Een stof heeft een dichtheid van <b>" + nl(d) + " g/cm³</b>. Wat doet die stof in water?", drijft ? "Drijven" : "Zinken", f,
          nl(d) + " is " + (drijft ? "kleiner" : "groter") + " dan 1,0, dus " + (drijft ? "drijven" : "zinken") + ".", "Leg het getal naast 1,0 (water): kleiner drijft, groter zinkt, gelijk zweeft.");
      },
      () => {
        const stof = pick(STOFFEN.filter(s => s[1] !== 1.0)), drijft = stof[1] < 1.0;
        const f = drijft ? { "Zinken": nl(stof[1]) + " is kleiner dan 1,0, dus het blijft drijven.", "Zweven": "daarvoor moet de dichtheid precies 1,0 zijn." }
                         : { "Drijven": nl(stof[1]) + " is groter dan 1,0, dus het zakt naar de bodem.", "Zweven": "daarvoor moet de dichtheid precies 1,0 zijn." };
        return mc("Wat doet <b>" + stof[0] + "</b> (" + nl(stof[1]) + " g/cm³) in water?", drijft ? "Drijven" : "Zinken", f,
          nl(stof[1]) + " naast 1,0: " + (drijft ? "kleiner, dus drijven" : "groter, dus zinken") + ".", "'Zwaar' telt niet: een olietanker van 100 000 000 kg drijft en een muntje van 5 g zinkt. Alleen de dichtheid telt.");
      }
    ],
    drijven_n2: [
      () => {
        const vl = pick([["alcohol", 0.80], ["terpentine", 0.84], ["kwik", 13.5], ["benzine", 0.72]]);
        const stof = pick(STOFFEN.filter(s => s[0] !== vl[0] && Math.abs(s[1] - vl[1]) > 0.03 && s[1] > 0.3));
        const drijft = stof[1] < vl[1];
        const f = drijft ? { "Zinken": nl(stof[1]) + " is kleiner dan " + nl(vl[1]) + " (" + vl[0] + "), dus het drijft.", "Zweven": "zweven alleen als de dichtheden precies gelijk zijn." }
                         : { "Drijven": nl(stof[1]) + " is groter dan " + nl(vl[1]) + " (" + vl[0] + "), dus het zinkt.", "Zweven": "zweven alleen als de dichtheden precies gelijk zijn." };
        return mc("Een stukje <b>" + stof[0] + "</b> (" + nl(stof[1]) + " g/cm³) gaat in <b>" + vl[0] + "</b> (" + nl(vl[1]) + " g/cm³). Wat doet het?", drijft ? "Drijven" : "Zinken", f,
          "Vergelijk met de vloeistof, niet met water: " + nl(stof[1]) + (drijft ? " < " : " > ") + nl(vl[1]) + ".",
          "In een andere vloeistof is het ijkpunt de dichtheid van díe vloeistof. IJs (0,92) drijft op water maar zinkt in alcohol (0,80); zelfs ijzer (7,9) drijft op kwik (13,5).");
      },
      () => {
        const stof = pick(STOFFEN.filter(s => s[1] > 0.5 && s[1] < 3 && s[1] !== 1.0)), drijft = stof[1] < 1.0;
        const goed = "Nee, de dichtheid blijft " + nl(stof[1]), f = {};
        f["Ja, een groter blok is zwaarder"] = "zwaarder wel, maar het volume groeit even hard mee. De dichtheid blijft " + nl(stof[1]) + " g/cm³, dus er gebeurt hetzelfde.";
        f["Ja, als het twee keer zo groot is"] = "twee keer zo groot is twee keer de massa en twee keer het volume: de dichtheid blijft " + nl(stof[1]) + ".";
        return mc("Een blokje <b>" + stof[0] + "</b> (" + nl(stof[1]) + " g/cm³) " + (drijft ? "drijft" : "zinkt") + ". Iemand zegt: 'Een veel groter blok " + stof[0] + " " + (drijft ? "zinkt" : "drijft") + " wel.' Klopt dat?", goed, f,
          "Dichtheid is een stofeigenschap: de hoeveelheid doet er niet toe.", "Een hele boomstam drijft net zo goed als een houten blokje, en een klein loden kogeltje zinkt net zo goed als een groot loden blok.");
      }
    ],
    drijven_n3: [
      () => {
        const drijft = Math.random() < 0.5, vol = pick([10, 20, 25, 50]), d = drijft ? rond(ri(40, 96) / 100, 2) : rond(ri(104, 300) / 100, 2), massa = rond(d * vol, 2);
        const f = drijft ? { "Zinken": "reken eerst: " + nl(massa) + " : " + vol + " = " + nl(d) + " g/cm³, kleiner dan 1,0, dus het drijft.", "Zweven": "de dichtheid is " + nl(d) + ", niet precies 1,0." }
                         : { "Drijven": "reken eerst: " + nl(massa) + " : " + vol + " = " + nl(d) + " g/cm³, groter dan 1,0, dus het zinkt.", "Zweven": "de dichtheid is " + nl(d) + ", niet precies 1,0." };
        return mc("Een voorwerp heeft een massa van <b>" + nl(massa) + " g</b> en een volume van <b>" + vol + " cm³</b>. Wat doet het in water?", drijft ? "Drijven" : "Zinken", f,
          nl(massa) + " : " + vol + " = " + nl(d) + " g/cm³, " + (drijft ? "kleiner" : "groter") + " dan 1,0.", "Eerst rekenen, dan beslissen. " + nl(massa) + " gram alleen zegt niets zonder het volume.");
      },
      () => {
        const vol = pick([10, 20, 25, 50]);
        let d = rond(ri(40, 260) / 100, 2); if (d === 1) d = 1.05;   /* nooit precies 1,0: dan zou zweven ook goed zijn */
        const massa = rond(d * vol, 2);
        return { t: "velden", q: "Een voorwerp heeft een massa van <b>" + nl(massa) + " g</b> en een volume van <b>" + vol + " cm³</b>. Bereken de dichtheid en beslis wat het doet in water.",
          velden: [{ label: "dichtheid (g/cm³)", a: nl(d) }, { label: "1 = drijft, 2 = zinkt", a: d < 1.0 ? "1" : "2" }],
          w: nl(massa) + " : " + vol + " = " + nl(d) + " g/cm³, dus het " + (d < 1.0 ? "drijft" : "zinkt") + ".", meer: "Water is 1,0 g/cm³; " + nl(d) + " is " + (d < 1.0 ? "kleiner" : "groter") + "." };
      },
      () => {
        const g = pick([["helium", 0.000178], ["koolstofdioxide", 0.00198], ["waterdamp", 0.00060]]), stijgt = g[1] < 0.001293;
        const f = stijgt ? { "Zakt naar de grond": nl(g[1]) + " is kleiner dan 0,001293 (lucht), dus de ballon stijgt juist op." }
                         : { "Stijgt op": nl(g[1]) + " is groter dan 0,001293 (lucht), dus de ballon zakt." };
        return mc("Een ballon is gevuld met <b>" + g[0] + "</b> (" + nl(g[1]) + " g/cm³). Lucht is 0,001293 g/cm³. Wat doet de ballon?", stijgt ? "Stijgt op" : "Zakt naar de grond", f,
          nl(g[1]) + " is " + (stijgt ? "kleiner" : "groter") + " dan 0,001293.", "Dezelfde regel als bij water, nu met lucht als ijkpunt.");
      }
    ],

    /* ================= OMREKENEN ================= */
    omrekenen_n1: [
      () => omreken(ri(2, 12), "kg", "g"),
      () => omreken(ri(2, 9) * 1000, "mL", "L"),
      () => omreken(ri(2, 9), "A", "mA"),
      () => omreken(ri(2, 9) * 1000, "mV", "V")
    ],
    omrekenen_n2: [
      () => omreken(rond(ri(11, 995) / 100, 2), pick(["kg", "L"]), null) ,
      () => omreken(ri(11, 999), pick(["g", "mL"]), null),
      () => omreken(rond(ri(1, 999) / 1000, 3), "A", "mA"),
      () => omreken(ri(3, 1500), "mA", "A"),
      () => omreken(ri(5, 4500), "mV", "V")
    ],
    omrekenen_n3: [
      () => omrekenMc(),
      () => omreken(ri(2, 40), "dm³", "cm³"),
      () => omreken(rond(ri(1, 99) / 1000, 3), pick(["A", "V", "kg"]), null),
      () => {
        const v = ri(12, 95);
        return { t: "bouw", q: "Een maatcilinder leest <b>" + v + " mL</b> af. Hoeveel <b>cm³</b> is dat?" + KLEIN("alleen het getal"),
          a: String(v), w: "1 mL = 1 cm³, dus het getal blijft hetzelfde.", meer: "Milliliter en kubieke centimeter zijn dezelfde ruimte met een andere naam. Je mag " + v + " mL dus direct als " + v + " cm³ in de dichtheidsformule zetten." };
      },
      () => {
        const mA = ri(105, 950);
        let I2 = rond(ri(10, 95) / 100, 2);
        if (Math.abs(I2 * 1000 - mA) < 1) I2 = rond(I2 + 0.05, 2);
        const meer1 = mA / 1000 > I2;
        return { t: "velden", q: "Door lampje 1 loopt <b>" + mA + " mA</b>, door lampje 2 <b>" + nl(I2) + " A</b>. Welk lampje krijgt de meeste stroom? Reken eerst om naar dezelfde eenheid.",
          velden: [{ label: "lampje 1 in A", a: nl(mA / 1000) }, { label: "meeste stroom: lampje 1 of 2", a: meer1 ? "1" : "2" }],
          w: "mA naar A: gedeeld door 1000. Vergelijk pas als de eenheden gelijk zijn.",
          meer: mA + " mA : 1000 = " + nl(mA / 1000) + " A, en dat is " + (meer1 ? "meer" : "minder") + " dan " + nl(I2) + " A. Een groot getal in mA kan dus best minder stroom zijn dan een klein getal in A." };
      }
    ],

    /* ================= STROOMKRING ================= */
    stroomkring_n1: [
      () => {
        const geval = pick(["dicht", "open", "los", "dicht"]);
        const boven = [{ k: "lamp", label: "L" }];
        if (geval === "dicht" || geval === "open") boven.push({ k: "switch", open: geval === "open" });
        const onder = geval === "los" ? [{ k: "break", label: "draad los" }] : [];
        const brandt = geval === "dicht";
        const f = {};
        if (brandt) f["Nee, het lampje is uit"] = "de schakelaar is dicht (plat getekend) en er zit nergens een onderbreking: de kring is gesloten.";
        else f["Ja, het lampje brandt"] = geval === "open" ? "de schakelaar staat open (schuin getekend). Daar zit lucht tussen, en lucht is een isolator." : "de draad is los: de lading kan het rondje niet meer maken.";
        return mc("Brandt het lampje in deze schakeling?" + serieSchema(boven, onder), brandt ? "Ja, het lampje brandt" : "Nee, het lampje is uit", f,
          brandt ? "Gesloten kring: de lading kan rondgaan, het lampje brandt." : "Open kring: de lading kan niet rondgaan, dus het lampje brandt niet.",
          "Volg met je vinger het rondje van de pluspool, door het lampje, terug naar de minpool. Kom je ergens niet verder (open schakelaar, losse draad), dan is de kring open.");
      }
    ],
    stroomkring_n2: [
      () => {
        const n = pick([2, 3]), plek = ri(0, n), boven = [];
        for (let i = 0; i < n; i++) boven.push({ k: "lamp", label: L(i) });
        const open = Math.random() < 0.6;
        boven.splice(plek, 0, { k: "switch", open: open });
        const o = brandOpties(n, open ? [] : Array.from({ length: n }, (_, i) => L(i)));
        const f = {}; o.fout.forEach(x => { f[x] = open ? "in een serieschakeling is er maar één kring. Staat de schakelaar open, dan stopt de lading OVERAL tegelijk, ook bij lampjes vóór de schakelaar." : "de schakelaar is dicht en er is geen onderbreking, dus de lading gaat overal rond en alle lampjes branden."; });
        return mc("Welke lampjes branden?" + serieSchema(boven), o.goed, f,
          open ? "Eén kring en die is open: geen enkel lampje brandt." : "De kring is gesloten: alle lampjes branden.",
          "De lading staat niet in een rij te wachten: alle bolletjes bewegen tegelijk, als een ketting. Breek je de ketting ergens, dan staat alles stil (De Volger denkt dat het eerste lampje nog brandt).");
      }
    ],

    /* ================= GELEIDERS ================= */
    geleiders_n1: [
      () => {
        const m = pick(MATERIALEN), f = {};
        f[m[1] ? "Isolator" : "Geleider"] = m[2];
        return mc("Is <b>" + m[0] + "</b> een geleider of een isolator?", m[1] ? "Geleider" : "Isolator", f, m[2],
          "Vuistregel: metalen geleiden; een vaste stof die geen metaal is, is bijna altijd een isolator. De uitzondering is koolstof (grafiet).");
      }
    ],
    geleiders_n2: [
      () => {
        const m = pick(MATERIALEN.filter(x => x[0] !== "lucht"));
        const schema = serieSchema([{ k: "lamp", label: "L" }, { k: "gat", label: m[0], kleur: m[1] ? "#94a3b8" : "#fde68a" }]);
        const f = {}; f[m[1] ? "Nee, het lampje blijft uit" : "Ja, het lampje gaat branden"] = m[2];
        return mc("Je legt <b>" + m[0] + "</b> in het gat van deze stroomkring. Wat gebeurt er?" + schema, m[1] ? "Ja, het lampje gaat branden" : "Nee, het lampje blijft uit", f,
          m[1] ? m[0] + " is een geleider: de kring is weer gesloten." : m[0] + " is een isolator: de kring blijft open.", m[2]);
      }
    ],
    geleiders_n3: [
      () => {
        const g = pick(MATERIALEN.filter(x => x[1])), iso = schud(MATERIALEN.filter(x => !x[1])).slice(0, 3);
        const f = {}; iso.forEach(x => { f[x[0]] = x[2]; });
        return mc("Je wilt een kapotte stroomkring repareren met wat je in je etui vindt. Welk materiaal laat de stroom door?", g[0], f, g[2],
          "Zoek het metaal of de koolstof. Hard (glas) of buigzaam (rubber) zegt niets: alleen of het een geleider is.");
      },
      () => {
        if (Math.random() < 0.5) {
          const iso = pick(MATERIALEN.filter(x => !x[1] && x[0] !== "lucht")), met = schud(MATERIALEN.filter(x => x[1])).slice(0, 3), f = {};
          met.forEach(x => { f[x[0]] = x[2]; });
          return mc("Drie van deze vier laten stroom door. Welke is de <b>isolator</b>?", iso[0], f, iso[2],
            "Metalen en grafiet (koolstof) geleiden; de rest van de vaste stoffen isoleert bijna altijd.");
        }
        const goed = pick(["koper", "aluminium"]), slecht = schud(["ijzer", "lood"]);
        const f = {}; f[slecht[0]] = slecht[0] + " geleidt wel, maar minder goed dan koper en aluminium."; f[slecht[1]] = slecht[1] + " geleidt ook, maar minder goed dan koper en aluminium."; f["rubber"] = "rubber is een isolator, dat geleidt helemaal niet.";
        return mc("Welk materiaal geleidt het <b>best</b>?", goed, f, "Koper en aluminium geleiden beter dan ijzer en lood.",
          "Daarom zijn snoeren van koper en hoogspanningskabels vaak van aluminium (dat is ook nog licht).");
      }
    ],

    /* ================= STROOMSTERKTE ================= */
    stroomsterkte_n1: [
      () => afleesVraag("A", 5, "basis"),
      () => {
        const I = rond(ri(5, 95) / 100, 2), voor = Math.random() < 0.5;
        return { t: "bouw", q: "Een stroommeter " + (voor ? "vóór" : "ná") + " het lampje geeft <b>" + nl(I) + " A</b> aan. Wat geeft een stroommeter " + (voor ? "ná" : "vóór") + " het lampje aan (in A)?" + KLEIN("alleen het getal") +
             serieSchema([{ k: "meter", letter: "A", label: voor ? nl(I) + " A" : "?" }, { k: "lamp", label: "L" }, { k: "meter", letter: "A", label: voor ? "?" : nl(I) + " A" }]),
          a: nl(I), w: "In één stroomkring is de stroomsterkte overal even groot.",
          meer: "Het lampje maakt geen lading op: er gaat evenveel lading het lampje in als eruit komt, dus ook ná het lampje " + nl(I) + " A. Energie wordt omgezet in licht, lading niet. (De Stroomvreter denkt dat er na het lampje minder over is.)" };
      },
      () => omreken(ri(2, 9), "A", "mA")
    ],
    stroomsterkte_n2: [
      () => afleesVraag("A", 0.5, "basis"),
      () => omreken(rond(ri(1, 999) / 1000, 3), "A", "mA"),
      () => omreken(ri(3, 1500), "mA", "A")
    ],
    stroomsterkte_n3: [
      () => afleesVraag("A", pick([0.05, 0.5]), "milli"),
      () => {
        const I = pick([rond(ri(6, 45) / 1000, 3), rond(ri(60, 450) / 1000, 3), rond(ri(6, 45) / 10, 1)]);
        const goedB = I < 0.05 ? 0.05 : I < 0.5 ? 0.5 : 5;
        const f = {};
        [5, 0.5, 0.05].filter(b => b !== goedB).forEach(b => {
          f[nl(b) + " A"] = b < I ? "dat bereik is te klein: " + nl(I) + " A is meer dan " + nl(b) + " A, de wijzer slaat door en de meter kan kapotgaan." : "dat kan wel, maar de wijzer komt dan bijna niet van zijn plaats. Een kleiner bereik dat nog past, leest veel nauwkeuriger.";
        });
        return mc("Je verwacht een stroom van ongeveer <b>" + nl(I) + " A</b> (" + nl(rond(I * 1000, 3)) + " mA). Welk meetbereik kies je het best?", nl(goedB) + " A", f,
          "Het kleinste bereik waar " + nl(I) + " A nog in past: " + nl(goedB) + " A.", "Weet je het niet? Begin dan bij het grootste bereik (5 A) en ga kleiner zolang de wijzer niet doorslaat.");
      }
    ],

    /* ================= SPANNING ================= */
    spanning_n1: [
      () => {
        const U = pick([1.2, 1.5, 1.5]), n = ri(2, 6);
        return { t: "bouw", q: "Je zet <b>" + n + " batterijen van " + nl(U) + " V</b> in serie (pluspool tegen minpool). Hoeveel volt is dat samen?" + KLEIN("alleen het getal"),
          a: nl(rond(n * U, 2)), w: "Batterijen in serie: tel de spanningen op.", meer: n + " × " + nl(U) + " = " + nl(rond(n * U, 2)) + " V. Elke batterij duwt een stukje harder mee, zoals pompen die achter elkaar staan." };
      },
      () => {
        const b = pick(BRONNEN), f = {};
        f[b[2] ? "Onveilig" : "Veilig"] = b[2] ? nl(b[1]) + " V is minder dan 24 V. Aanraken kan geen kwaad, al moet je bij een accu oppassen voor kortsluiting." : nl(b[1]) + " V is veel meer dan 24 V: dan kan er een gevaarlijke stroom door je lichaam gaan.";
        return mc("Is <b>" + b[0] + "</b> (" + nl(b[1]) + " V) veilig om aan te raken?", b[2] ? "Veilig" : "Onveilig", f,
          "Tot 24 V is veilig; daarboven niet.", "Niet de spanning zelf doet pijn, maar de stroom die door je lichaam gaat. Hoe hoger de spanning, hoe groter die stroom kan worden.");
      },
      () => afleesVraag("V", 30, "basis")
    ],
    spanning_n2: [
      () => {
        const U = pick([1.2, 1.5]), n = ri(2, 8), tot = rond(U * n, 2);
        return { t: "bouw", q: "Een apparaatje werkt op <b>" + nl(tot) + " V</b>. Hoeveel batterijen van <b>" + nl(U) + " V</b> zet je in serie?" + KLEIN("alleen het getal"),
          a: String(n), w: "Aantal = totale spanning : spanning per batterij.", meer: nl(tot) + " : " + nl(U) + " = " + n + " batterijen. Check: " + n + " × " + nl(U) + " = " + nl(tot) + " V." };
      },
      () => afleesVraag("V", 15, "basis"),
      () => omreken(ri(50, 4500), "mV", "V"),
      () => {
        const out = pick([5, 5, 12, 19]), app = out === 5 ? "telefoon" : out === 12 ? "lampje van de tekenlamp" : "laptop", f = {};
        f["230 V"] = "230 V is wat er IN gaat, uit het stopcontact. Dan zou de " + app + " kapotgaan.";
        f[(out * 2) + " V"] = "de adapter verandert de spanning naar precies wat het apparaat nodig heeft, niet meer.";
        f["24 V"] = "24 V is de veiligheidsgrens, geen vaste uitgang van een adapter.";
        return mc("Op de adapter van een " + app + " staat: <b>input 230 V</b>, output ... . De " + app + " werkt op " + out + " V. Welke spanning komt er uit de adapter?", out + " V", f,
          "De transformator in de adapter zet 230 V om naar de " + out + " V die het apparaat nodig heeft.", "Input = wat erin gaat (netspanning 230 V), output = wat eruit komt (de lage spanning voor het apparaat).");
      }
    ],
    spanning_n3: [
      () => {
        const U = pick([1.2, 1.5]), doel = pick(U === 1.2 ? [9, 5, 7, 4] : [8, 5, 10, 4]);
        const n = Math.floor(doel / U + 1e-9), exact = Math.abs(n * U - doel) < 1e-9;
        if (exact) return null;
        return { t: "velden", q: "Een lampje is gemaakt voor <b>" + doel + " V</b>. Je hebt alleen batterijen van <b>" + nl(U) + " V</b>. Precies " + doel + " V lukt niet. Hoeveel batterijen zet je in serie zonder dat het te veel wordt, en hoeveel volt is dat?",
          velden: [{ label: "aantal batterijen", a: String(n) }, { label: "spanning (V)", a: nl(rond(n * U, 2)) }],
          w: doel + " : " + nl(U) + " = " + nl(rond(doel / U, 3)) + ", geen heel getal. Kies het aantal eronder, anders gaat het lampje kapot.",
          meer: n + " × " + nl(U) + " = " + nl(rond(n * U, 2)) + " V en " + (n + 1) + " × " + nl(U) + " = " + nl(rond((n + 1) * U, 2)) + " V. Die laatste is meer dan " + doel + " V: te veel voor het lampje." };
      },
      () => afleesVraag("V", 3, pick(["basis", "milli"])),
      () => {
        const U = pick([rond(ri(4, 28) / 10, 1), ri(4, 14), ri(16, 28)]);
        const goedB = U <= 3 ? 3 : U <= 15 ? 15 : 30, f = {};
        [30, 15, 3].filter(b => b !== goedB).forEach(b => { f[b + " V"] = b < U ? b + " V is te klein voor " + nl(U) + " V: de wijzer slaat door." : "dat past wel, maar de wijzer komt minder ver en je leest minder nauwkeurig af."; });
        return mc("Je wilt een spanning van ongeveer <b>" + nl(U) + " V</b> meten. Welk bereik kies je?", goedB + " V", f,
          "Het kleinste bereik waar " + nl(U) + " V nog in past.", "Spanningsmeter aansluiten over het onderdeel (op beide kanten), niet in de kring. En bij twijfel eerst het grootste bereik.");
      },
      () => {
        const U = pick([1.5, 4.5, 9, 12]), f = {};
        f[nl(U) + " V en " + nl(rond(U / 10, 2)) + " A"] = "zonder gesloten kring kan de lading niet rondgaan, dus de stroomsterkte is 0 A.";
        f["0 V en 0 A"] = "de spanning is er wel: de batterij duwt nog steeds, alleen kan er niets stromen. Net als een dichtgeknepen ballon: wel druk, geen stroming.";
        f["0 V en " + nl(rond(U / 10, 2)) + " A"] = "precies omgekeerd. Een losse batterij heeft spanning, maar er loopt geen stroom.";
        return mc("Er zit een losse batterij van <b>" + nl(U) + " V</b> in je la, nergens op aangesloten. Wat is de spanning, en hoeveel stroom loopt er?", nl(U) + " V en 0 A", f,
          "Spanning = de duw, die is er altijd. Stroom = bewegende lading, die is er alleen in een gesloten kring.", "Spanning en stroom zijn twee verschillende dingen (De Spanningsstromer verwart ze). Een batterij levert een vaste spanning; hoeveel stroom er loopt, bepaalt de schakeling.");
      }
    ],

    /* ================= SCHAKELINGEN (schema's als SVG) ================= */
    schakelingen_n1: [
      () => {
        const par = Math.random() < 0.5, n = pick([2, 3]);
        let svg;
        if (par) { const t = []; for (let i = 0; i < n; i++) t.push({ lamp: L(i) }); svg = parSchema(t); }
        else { const b = []; for (let i = 0; i < n; i++) b.push({ k: "lamp", label: L(i) }); svg = serieSchema(b); }
        const f = {};
        f[par ? "Een serieschakeling" : "Een parallelschakeling"] = par ? "de draad vertakt zich: elk lampje heeft een eigen weg naar de batterij. Dat is parallel." : "er is geen enkele vertakking: alles zit achter elkaar in één rondje. Dat is serie.";
        return mc("Wat voor schakeling is dit?" + svg, par ? "Een parallelschakeling" : "Een serieschakeling", f,
          par ? "Er zijn vertakkingen, dus parallel." : "Geen vertakkingen, één kring: serie.", "Zoek de punten waar de draad zich splitst. Splitst hij nergens, dan is het serie.");
      },
      () => {
        const n = ri(2, 4), par = Math.random() < 0.7, t = [];
        for (let i = 0; i < n; i++) t.push(par ? { lamp: L(i) } : { k: "lamp", label: L(i) });
        const kringen = par ? n : 1;
        return { t: "bouw", q: "Hoeveel <b>stroomkringen</b> kun je in deze schakeling aanwijzen?" + KLEIN("alleen het getal") + (par ? parSchema(t) : serieSchema(t)),
          a: String(kringen), w: par ? "Bij parallel heeft elk lampje een eigen kring via de batterij." : "Geen vertakkingen: alles zit in één rondje.",
          meer: par ? "Volg vanaf de batterij elk mogelijk rondje: er gaat er één door elk lampje, dus " + n + " kringen. Bij een serieschakeling is er altijd maar één."
                    : "Hoeveel lampjes er ook achter elkaar zitten, in een serieschakeling is er maar één stroomkring. Daarom gaan ze ook allemaal tegelijk uit." };
      }
    ],
    schakelingen_n2: [
      () => {
        const n = pick([2, 3]), t = []; for (let i = 0; i < n; i++) t.push({ lamp: L(i) });
        const inHoofd = Math.random() < 0.3, k = ri(0, n - 1);
        let brandend;
        if (inHoofd) brandend = [];
        else { t[k].sw = { open: true }; brandend = t.map((x, i) => i === k ? null : L(i)).filter(Boolean); }
        const svg = parSchema(t, inHoofd ? [{ k: "switch", open: true }] : null);
        const o = brandOpties(n, brandend), f = {};
        o.fout.forEach(x => { f[x] = inHoofd ? "de open schakelaar zit in het onvertakte deel, waar ALLE stroom doorheen moet. Dan is elke kring open." : "de open schakelaar zit alleen in de tak van " + L(k) + ". De andere takken hebben hun eigen kring via de batterij en blijven branden."; });
        return mc("De schakelaar staat open. Welke lampjes branden?" + svg, o.goed, f,
          inHoofd ? "Schakelaar in de hoofdstroom open: alles uit." : "Alleen de tak met de open schakelaar gaat uit.",
          "Bij parallel bedient een schakelaar alleen wat in zijn eigen stroomkring zit. Zo werkt het in huis: elke lamp een eigen schakelaar.");
      },
      () => {
        const par = Math.random() < 0.5, n = 3, k = ri(0, 2);
        let svg;
        if (par) { const t = []; for (let i = 0; i < n; i++) t.push({ lamp: L(i) }); svg = parSchema(t); }
        else { const b = []; for (let i = 0; i < n; i++) b.push({ k: "lamp", label: L(i) }); svg = serieSchema(b); }
        const brandend = par ? [0, 1, 2].filter(i => i !== k).map(L) : [];
        const o = brandOpties(n, brandend), f = {};
        o.fout.forEach(x => { f[x] = par ? "de andere lampjes zitten in hun eigen kring op de batterij en merken niets van het kapotte lampje." : "dit is een serieschakeling: één kring. Is " + L(k) + " kapot, dan is het rondje overal onderbroken, ook voor de lampjes ervoor."; });
        return mc("Lampje <b>" + L(k) + "</b> brandt door. Welke lampjes branden nog?" + svg, o.goed, f,
          par ? "Parallel: de andere lampjes blijven branden." : "Serie: alles gaat tegelijk uit.",
          "Dit is precies waarom in huis alles parallel staat: gaat er één lamp kapot, dan blijven de rest en de koelkast gewoon werken.");
      }
    ],
    schakelingen_n3: [
      () => {
        const t = [{ lamp: "L1" }, { lamp: "L2" }, { lamp: "L3" }], xs = [120, 198, 276];
        const punten = [{ x: 78, y: 40, label: "a", dy: 18 }].concat(xs.map((x, i) => ({ x: x, y: 150, label: "bcd"[i] })));
        const geval = ri(0, 3), lampUit = geval === 0 ? "alle drie de lampjes zijn uit" : "alleen " + L(geval - 1) + " is uit, de andere twee branden";
        const goed = "Bij punt " + "abcd"[geval], f = {};
        "abcd".split("").forEach((p, i) => { if (i !== geval) f["Bij punt " + p] = i === 0 ? "bij a gaat ALLE stroom langs. Een breuk daar zet alle lampjes uit." : "bij " + p + " zit de tak van " + L(i - 1) + ". Een breuk daar zet alleen " + L(i - 1) + " uit."; });
        return mc("In deze schakeling is één draadje kapot: " + lampUit + ". Waar zit de breuk?" + parSchema(t, null, null, punten), goed, f,
          geval === 0 ? "Alles uit betekent: de breuk zit in het onvertakte deel (a)." : "Eén lampje uit betekent: de breuk zit in de tak van dat lampje.",
          "Redeneer per stroomkring: welke kringen werken nog? De breuk zit in het stuk dat alleen bij de kapotte kring hoort.");
      },
      () => {
        const n = 3, t = [{ lamp: "L1" }, { lamp: "L2" }, { lamp: "L3" }], k = ri(0, 2);
        t[k].brk = true;
        const brandend = [0, 1, 2].filter(i => i !== k).map(L), o = brandOpties(n, brandend), f = {};
        o.fout.forEach(x => { f[x] = "de breuk (rode ×) zit in de tak van " + L(k) + ". Alleen die kring is open; de andere takken lopen gewoon via de batterij rond."; });
        return mc("Bij de rode × is de draad kapot. Welke lampjes branden?" + parSchema(t), o.goed, f,
          "Alleen het lampje in de kapotte tak gaat uit.", "Een breuk in een tak raakt alleen die tak. Een breuk in het onvertakte deel (bij de batterij) zet alles uit.");
      }
    ],

    /* ================= STROOM REDENEREN ================= */
    "stroom-redeneren_n1": [
      () => {
        const I = ri(12, 480), wie = ri(1, 2);
        const boven = [{ k: "meter", letter: "A", label: "A1 = " + I + " mA" }, { k: "lamp", label: "L1" }, { k: "lamp", label: "L2" }];
        const onder = [{ k: "meter", letter: "A", label: "A2 = ?" }];
        return { t: "bouw", q: "Wat geeft stroommeter <b>A2</b> aan, in mA?" + KLEIN("alleen het getal") + serieSchema(boven, onder),
          a: String(I), w: "Serieschakeling: de stroomsterkte is overal even groot.",
          meer: "Er is maar één kring, dus door A1, L1, L2 en A2 gaat dezelfde lading per seconde: " + I + " mA. Twee lampjes maken samen geen lading op." };
      },
      () => {
        const I = rond(ri(10, 90) / 100, 2), f = {};
        f["Kleiner dan " + nl(I) + " A"] = "het lampje maakt geen lading op. Wat erin gaat, komt eruit: ook " + nl(I) + " A.";
        f["Groter dan " + nl(I) + " A"] = "er komt nergens lading bij. In één kring is de stroom overal gelijk.";
        f["0 A, alles is opgebruikt"] = "dan zou het lampje maar heel even branden. Er gaat geen lading op, alleen energie wordt omgezet.";
        return mc("Tussen de pluspool en het lampje meet je <b>" + nl(I) + " A</b>. Wat meet je tussen het lampje en de minpool?", "Ook " + nl(I) + " A", f,
          "In één stroomkring is de stroomsterkte overal even groot.", "Energie wordt omgezet in licht, lading niet. Denk aan een ketting die rondgaat: overal gaan evenveel schakels per seconde voorbij.");
      }
    ],
    "stroom-redeneren_n2": [
      () => {
        const n = pick([2, 3]), I = []; for (let i = 0; i < n; i++) I.push(ri(5, 60) * 10);
        const tot = I.reduce((a, b) => a + b, 0), t = I.map((x, i) => ({ lamp: L(i), meter: x + " mA" }));
        return { t: "bouw", q: "Hoe groot is de <b>totale stroomsterkte</b> bij de batterij, in mA?" + KLEIN("alleen het getal") + parSchema(t, [{ k: "meter", letter: "A", label: "? mA" }]),
          a: String(tot), w: "Parallel: totaal = de takken bij elkaar opgeteld.",
          meer: I.join(" + ") + " = " + tot + " mA. Bij het splitsingspunt verdeelt de stroom zich, en wat binnenkomt gaat er ook weer uit." };
      },
      () => {
        const n = 3, I = [ri(3, 20) * 10, ri(3, 20) * 10, ri(3, 20) * 10], tot = I[0] + I[1] + I[2], k = ri(0, 2);
        const t = I.map((x, i) => ({ lamp: L(i), meter: i === k ? "?" : x + " mA" }));
        return { t: "bouw", q: "De totale stroomsterkte is <b>" + tot + " mA</b>. Hoeveel mA gaat er door " + L(k) + "?" + KLEIN("alleen het getal") + parSchema(t, [{ k: "meter", letter: "A", label: tot + " mA" }]),
          a: String(I[k]), w: "De ontbrekende tak = totaal min de andere takken.",
          meer: tot + " − " + I.filter((_, i) => i !== k).join(" − ") + " = " + I[k] + " mA. Controle: " + I.join(" + ") + " = " + tot + " mA." };
      },
      () => {
        const par = Math.random() < 0.5, I = rond(ri(10, 60) / 100, 2), f = {};
        if (par) {
          f["Ook " + nl(I) + " A"] = "dat geldt voor serie. Hier vertakt de stroom: door de batterij gaat de stroom van beide takken samen.";
          f["De helft: " + nl(rond(I / 2, 3)) + " A"] = "omgekeerd: niet de tak is de helft van het totaal, het totaal is de som van de takken.";
          return mc("Twee <b>gelijke</b> lampjes staan <b>parallel</b>. Door elk lampje gaat " + nl(I) + " A. Hoeveel stroom gaat er door de batterij?", nl(rond(2 * I, 2)) + " A", f,
            "Totaal = " + nl(I) + " + " + nl(I) + " = " + nl(rond(2 * I, 2)) + " A.", "Parallel = stroom overal gelijk is een valkuil. Bij parallel is de SPANNING per tak gelijk; de stromen tel je op.");
        }
        f[nl(rond(2 * I, 2)) + " A"] = "optellen hoort bij parallel. In serie is er maar één weg, dus overal dezelfde stroom.";
        f["De helft: " + nl(rond(I / 2, 3)) + " A"] = "de stroom wordt niet verdeeld over de lampjes: alle lading gaat door allebei.";
        return mc("Twee lampjes staan <b>in serie</b>. Door het eerste lampje gaat " + nl(I) + " A. Hoeveel stroom gaat er door de batterij?", "Ook " + nl(I) + " A", f,
          "Serie: overal dezelfde stroomsterkte.", "Eén kring, één weg: elke plek krijgt dezelfde lading per seconde.");
      }
    ],
    "stroom-redeneren_n3": [
      () => {
        const n = pick([2, 3, 4]), per = ri(4, 30) * 10, tot = per * n;
        return { t: "bouw", q: "<b>" + n + " gelijke lampjes</b> staan parallel. De totale stroomsterkte is <b>" + tot + " mA</b>. Hoeveel mA gaat er door één lampje?" + KLEIN("alleen het getal"),
          a: String(per), w: "Gelijke lampjes krijgen elk hetzelfde deel: totaal : aantal.", meer: tot + " : " + n + " = " + per + " mA per lampje. Controle: " + n + " × " + per + " = " + tot + " mA." };
      },
      () => {
        const I = [ri(4, 25) * 10, ri(4, 25) * 10, ri(4, 25) * 10], tot = I[0] + I[1] + I[2];
        const t = I.map((x, i) => ({ lamp: L(i), meter: x + " mA" }));
        return { t: "velden", q: "Stroommeter <b>A</b> staat op de bovenrail tussen de tak van L1 en de tak van L2. Vul in." + parSchema(t, [{ k: "meter", letter: "A", label: "totaal" }], [{ na: 0, meter: "A" }]),
          velden: [{ label: "totaal bij de batterij (mA)", a: String(tot) }, { label: "meter A (mA)", a: String(I[1] + I[2]) }],
          w: "Bij de batterij loopt de som van alle takken; meter A meet alleen de takken die na hem komen (L2 en L3).",
          meer: "Totaal: " + I.join(" + ") + " = " + tot + " mA. Bij de splitsing van L1 gaat " + I[0] + " mA die tak in, dus door A gaat " + tot + " − " + I[0] + " = " + (I[1] + I[2]) + " mA (= " + I[1] + " + " + I[2] + ")." };
      },
      () => {
        const n = pick([3, 4]), per = ri(5, 30) * 10;
        return { t: "velden", q: "<b>" + n + " gelijke lampjes</b> staan parallel op een batterij; door elk lampje gaat <b>" + per + " mA</b>. Je draait één lampje los.",
          velden: [{ label: "stroom door een ander lampje (mA)", a: String(per) }, { label: "totale stroom nu (mA)", a: String(per * (n - 1)) }],
          w: "De andere lampjes merken niets: ze houden " + per + " mA. Het totaal wordt één tak minder.",
          meer: "Vóór: " + n + " × " + per + " = " + (n * per) + " mA. Na: " + (n - 1) + " × " + per + " = " + (per * (n - 1)) + " mA. De batterij levert geen vaste stroom (De Constante Kraan), maar een vaste spanning: de schakeling bepaalt hoeveel stroom er loopt." };
      }
    ]
  };

})();
