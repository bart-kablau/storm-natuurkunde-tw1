'use strict';
/* =========================================================================
   SPEELLES Natuurkunde toetsweek 1 (havo 2, Nova NaSk 1-2): H1 §1.1-1.2, H2 §2.3-2.4, H4 §4.1-4.3
   Inhoud van dit hoofdstuk. Engine (engine.js) en bouwstenen (natuurkunde/, biologie/)
   komen uit tools/speelles-engine via sync.mjs. Bron (leidend): ../../02-verwerkt/brontekst.md,
   aanpak en misvattingen: ../../02-verwerkt/leerplan.md. Les-id = onderwerp-id in de oefen-app.
   Familie B: voorspel -> bekijk -> verklaar, met voorspel-inzet (XP voor verklaren,
   een foute voorspelling = een valkuil-kaart). Album = lab-logboek.
   ========================================================================= */

nkDefs(); bioDefs();

/* ---------- helpers ---------- */
const Q = (vraag, goed, fouten, w, klein, beeld) => ({ t: 'mc', vraag, klein, beeld, w, opties: [{ t: goed, goed: true }, ...fouten.map(([t, fout, mis]) => ({ t, fout, mis }))] });
const toon = (tekst, visual, p, extra = {}) => ({ t: 'toon', tekst, visual, p, ...extra });
const uitleg = (tekst, groot) => ({ t: 'toon', tekst, groot, wacht: false });
const snap = (id, vraag, bewijs, anders, dieper, herhaal = 1) => ({ t: 'snap', id, vraag, bewijs, anders, dieper, herhaal });
const baas = (naam, beeld, denkfout, tekst, pool) => ({ t: 'baas', naam, beeld, hp: 5, denkfout, tekst, pool });
const kaart = (titel, beeld, kern, punten) => toon('Je inzichtkaart van deze les. Tik erop om hem om te draaien.', 'inzichtkaart', { titel, beeld, kern, punten }, { hint: 'Draai de kaart om.' });
const ob = m => `<svg viewBox="0 0 100 100" aria-hidden="true">${m}</svg>`;
const zet = (m, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${m}</g>`;
const T = (x, y, t, o) => NK.tekst(x, y, t, o);
const tafel = inhoud => `<rect width="320" height="200" rx="16" fill="url(#nk-hout)"/><ellipse cx="100" cy="36" rx="120" ry="28" fill="#fff" opacity=".14"/><ellipse cx="160" cy="186" rx="130" ry="8" fill="#000" opacity=".1"/>` + inhoud;
const kringBinnen = def => NK.kring.markup(def, NK.kring.los(def), {}).s;
const kringBeeld = (def, schema, alt) => NK.kringSvg(def, { schema, alt });
const pijl = (x1, y1, x2, y2, k = '#EA580C') => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${k}" stroke-width="3" stroke-linecap="round"/><path d="M${x2} ${y2} l${(x1 - x2) > 0 ? 8 : -8} -6 M${x2} ${y2} l${(x1 - x2) > 0 ? 8 : -8} 6" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`;

/* ---------- scènes voor 'poe' (320 x 200) ---------- */
const glas = (inhoud, x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="40" cy="104" rx="36" ry="6" fill="#000" opacity=".15"/>${inhoud}<path d="M6 10 L14 100 H66 L74 10Z" fill="url(#nk-glas)" stroke="#8CC6E8" stroke-width="2"/><path d="M14 18 L20 92" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/></g>`;
const water = (y = 40) => `<path d="M${6 + (y - 10) * 8 / 90} ${y} L14 100 H66 L${74 - (y - 10) * 8 / 90} ${y}Z" fill="#F7C58A" opacity=".85"/><path d="M${6 + (y - 10) * 8 / 90} ${y} H${74 - (y - 10) * 8 / 90}" stroke="#fff" stroke-width="1.5" opacity=".7"/>`;
const SC = {
  ijsVoor: tafel(glas(water(44) + zet(NK.obj.ijsblok(), 4, 18, .42) + zet(NK.obj.ijsblok(), 30, 26, .38), 120, 50) + T(160, 30, 'ijsblokjes in je limonade', { s: 12 })),
  ijsNa: tafel(glas(water(34), 40, 54) + glas(water(44) + zet(NK.obj.ijsblok(), 4, 18, .42) + zet(NK.obj.ijsblok(), 30, 26, .38), 200, 54) + pijl(128, 96, 192, 96) + T(160, 82, 'in de vriezer', { s: 11 }) + T(80, 40, 'gesmolten', { s: 11 }) + T(240, 40, 'weer ijs!', { s: 11 })),
  houtVoor: tafel(zet(NK.obj.houtblok(), 110, 60, 1) + `<path d="M150 70 C140 50 150 36 160 22 C162 40 178 44 172 66 C168 52 160 56 162 70Z" fill="#FF9A1A" opacity=".9"/><path d="M156 70 C152 58 158 50 162 42 C164 52 170 56 166 68Z" fill="#FFE27A"/>` + T(160, 182, 'hout dat verbrandt', { s: 12 })),
  houtNa: tafel(`<ellipse cx="90" cy="140" rx="46" ry="12" fill="#6E6A70"/><ellipse cx="90" cy="134" rx="34" ry="10" fill="#9A949C"/><path d="M70 120 C64 100 80 92 74 76 M96 118 C92 104 104 96 100 82" stroke="#B9B3B8" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>` + T(90, 172, 'as en rook', { s: 12 }) + pijl(150, 120, 200, 120) + zet(NK.obj.houtblok(), 200, 70, .8) + `<path d="M196 70 L290 160 M290 70 L196 160" stroke="#DB5A4A" stroke-width="6" stroke-linecap="round" opacity=".85"/>` + T(246, 182, 'terug naar hout? kan niet', { s: 11 })),
  broodVoor: tafel(`<g transform="translate(70 70)"><path d="M10 70 C10 58 22 54 90 54 C158 54 170 58 170 70 C170 92 158 98 90 98 C22 98 10 92 10 70Z" fill="#E8C48E" stroke="#C99260" stroke-width="2"/><path d="M22 72 C22 64 34 62 90 62 C146 62 158 64 158 72 C158 86 146 90 90 90 C34 90 22 86 22 72Z" fill="#FFF6E2"/></g>` +
    `<g transform="translate(170 6)" filter="url(#nk-schaduw)"><rect x="0" y="10" width="30" height="46" rx="5" fill="#8A4A1A" opacity=".92"/><rect x="5" y="2" width="20" height="10" rx="3" fill="#2E3440"/><path d="M15 56 V74" stroke="#C9850A" stroke-width="4"/><path d="M15 80 C11 86 11 90 15 92 C19 90 19 86 15 80Z" fill="#C98A2A"/></g>` + T(160, 188, 'jodium (bruingeel) boven een witte boterham', { s: 11 })),
  broodNa: tafel(`<g transform="translate(70 70)"><path d="M10 70 C10 58 22 54 90 54 C158 54 170 58 170 70 C170 92 158 98 90 98 C22 98 10 92 10 70Z" fill="#E8C48E" stroke="#C99260" stroke-width="2"/><path d="M22 72 C22 64 34 62 90 62 C146 62 158 64 158 72 C158 86 146 90 90 90 C34 90 22 86 22 72Z" fill="#FFF6E2"/><ellipse cx="96" cy="76" rx="26" ry="10" fill="#1E2A6E"/><ellipse cx="88" cy="73" rx="8" ry="3" fill="#5A6AC0" opacity=".8"/></g>` + T(160, 188, 'donkerblauw: er zit zetmeel in', { s: 12, k: '#1E2A6E' })),
  weegVoor: tafel(zet(NK.obj.weegschaal().replace('52 kg', '52'), 100, 20, 1.2) + T(160, 30, 'Storm leest af: 52', { s: 12 })),
  weegNa: tafel(zet(NK.obj.weegschaal(), 100, 20, 1.2) + T(118, 186, 'meetwaarde 52', { s: 11, k: '#1E5A86' }) + T(206, 186, 'eenheid kg', { s: 11, k: '#C2410C' }) + T(160, 30, 'grootheid: massa', { s: 12, k: '#5E2750' })),
  fietsVoor: tafel(`<g transform="translate(40 50)" stroke="url(#nk-alu)" stroke-width="9" fill="none" stroke-linecap="round"><path d="M10 90 L50 30 L100 30 L120 90 M50 30 L70 90 L120 90 M70 90 L10 90"/></g>` + T(100, 168, 'aluminium frame: 1500 g', { s: 11 }) +
    `<g transform="translate(200 70)" stroke="url(#nk-staal)" stroke-width="7" fill="none" stroke-linecap="round"><path d="M0 30 C20 0 60 0 80 30 M40 10 V60"/></g>` + T(240, 168, 'stalen stuur: 600 g', { s: 11 })),
  fietsNa: tafel(zet(NK.obj.blokje({ label: '' }), 50, 50, 1) + T(100, 172, 'aluminium 1 cm³: 2,7 g', { s: 11 }) + zet(NK.obj.blokje({ kleur: 'url(#nk-staal)', zijk: '#6E7783', top: '#F6F8FA' }), 170, 50, 1) + T(220, 172, 'staal 1 cm³: 7,8 g', { s: 11 }) + T(160, 28, 'eerlijk vergelijken: van elk 1 cm³', { s: 12, k: '#5E2750' })),
  telVoor: tafel(zet(NK.obj.stopcontact(), 40, 40, 1.1) + zet(NK.obj.telefoon(), 190, 40, 1.1) + `<path d="M150 96 C160 120 180 120 196 96" stroke="#2E3440" stroke-width="4" fill="none"/>` + T(95, 168, 'stopcontact: 230 V', { s: 11 }) + T(245, 168, 'telefoon: 5 V', { s: 11 })),
  telNa: tafel(zet(NK.obj.telefoon({ kapot: true }), 20, 40, 1) + T(70, 160, 'rechtstreeks: kapot', { s: 11, k: '#B42A1E' }) + zet(NK.obj.stopcontact(), 130, 70, .6) + zet(NK.obj.adapter(), 180, 56, .8) + zet(NK.obj.telefoon({ laad: true }), 244, 44, .8) + T(230, 160, 'met adapter: laadt op', { s: 11, k: '#1F7A50' })),
};

/* ---------- schakelingen ---------- */
const K_LEEG = { vb: '0 0 320 200', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 164, cellen: 2 }, { id: 'L', soort: 'lamp', x: 160, y: 72, label: 'lampje' }], draden: [] };
const K_EEN = { ...K_LEEG, draden: [['B.p', 'L.b', { boog: true }]] };
const K_PLUS = { ...K_LEEG, draden: [['B.p', 'L.b', { boog: true }], ['B.p', 'L.a', { via: [[220, 120], [110, 120]] }]] };
const K_RONDJE = { ...K_LEEG, draden: [['B.p', 'L.b', { boog: true }], ['L.a', 'B.n', { boog: true }]] };
const K_SCHAKEL = (dicht = false) => ({ vb: '0 0 320 200', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 170, cellen: 2 }, { id: 'L', soort: 'lamp', x: 170, y: 54, label: 'lampje' }, { id: 'S', soort: 'schakelaar', x: 40, y: 112, rot: 90, dicht, label: 'schakelaar' }],
  draden: [['B.p', 'L.b', { via: [[284, 170], [284, 54]] }], ['L.a', 'S.a', { via: [[40, 54]] }], ['S.b', 'B.n', { via: [[40, 170]] }]] });
const K_METER = { vb: '0 0 320 210', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 178, cellen: 2 }, { id: 'L', soort: 'lamp', x: 160, y: 62 },
  { id: 'P1', soort: 'plek', x: 284, y: 120, rot: 90 }, { id: 'P2', soort: 'plek', x: 36, y: 120, rot: 90 }, { id: 'P3', soort: 'plek', x: 232, y: 178 }, { id: 'PO', soort: 'plekOver', over: 'L', af: 34 }],
  draden: [['B.p', 'P3.a'], ['P3.b', 'P1.b', { via: [[284, 178]] }], ['P1.a', 'L.b', { via: [[284, 62]] }], ['L.a', 'P2.a', { via: [[36, 62]] }], ['P2.b', 'B.n', { via: [[36, 178]] }]] };
const K_VMETER = { vb: '0 0 320 210', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 172, cellen: 3 }, { id: 'L', soort: 'lamp', x: 160, y: 70 },
  { id: 'VO', soort: 'plekOver', over: 'L', af: 34 }, { id: 'VB', soort: 'plekOver', over: 'B', af: -34 }, { id: 'P1', soort: 'plek', x: 284, y: 122, rot: 90 }],
  draden: [['B.p', 'P1.b', { via: [[284, 172]] }], ['P1.a', 'L.b', { via: [[284, 70]] }], ['L.a', 'B.n', { via: [[36, 70], [36, 172]] }]] };
const K_SERIE2M = { vb: '0 0 320 210', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 178, cellen: 2 }, { id: 'L1', soort: 'lamp', x: 96, y: 62, label: 'lampje 1' }, { id: 'L2', soort: 'lamp', x: 224, y: 62, label: 'lampje 2' },
  { id: 'P1', soort: 'plek', x: 284, y: 120, rot: 90 }, { id: 'P2', soort: 'plek', x: 160, y: 62 }, { id: 'P3', soort: 'plek', x: 36, y: 120, rot: 90 }],
  draden: [['B.p', 'P1.b', { via: [[284, 178]] }], ['P1.a', 'L2.b', { via: [[284, 62]] }], ['L2.a', 'P2.b'], ['P2.a', 'L1.b'], ['L1.a', 'P3.a', { via: [[36, 62]] }], ['P3.b', 'B.n', { via: [[36, 178]] }]] };
const K_BOUWSCHEMA = { vb: '0 0 320 200', onderdelen: [{ id: 'B', soort: 'batterij', x: 160, y: 164, cellen: 2 }, { id: 'S', soort: 'schakelaar', x: 84, y: 64, label: 'schakelaar' }, { id: 'L', soort: 'lamp', x: 236, y: 64, label: 'lampje' }], draden: [] };
const K_SERIE = NK.serieDef({ n: 2, cellen: 2 });
const K_PAR = NK.parallelDef({ Rs: [6, 6], cellen: 2, meters: false, totaal: false });
const K_PAR3 = NK.parallelDef({ Rs: [6, 6, 6], cellen: 2 });

/* ---------- symbolen voor 'koppel' (200 x 120, schema op papier) ---------- */
const papier = inhoud => `<rect width="200" height="120" rx="14" fill="url(#nk-papier)"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M${i * 16 + 8} 0 V120" stroke="#CFE3F2" stroke-width=".6"/>`).join('') + inhoud;
const SYM = {
  batterij: papier(`<path d="M30 60 H94 M106 60 H170" stroke="#2B1726" stroke-width="3"/><rect x="92" y="48" width="5" height="24" fill="#2B1726"/><rect x="104" y="34" width="2.4" height="52" fill="#2B1726"/><text x="114" y="34" font-size="16" fill="#2B1726">+</text>`),
  lampje: papier(`<path d="M30 60 H82 M118 60 H170" stroke="#2B1726" stroke-width="3"/><circle cx="100" cy="60" r="18" fill="#fff" stroke="#2B1726" stroke-width="3"/><path d="M87 47 L113 73 M113 47 L87 73" stroke="#2B1726" stroke-width="3"/>`),
  schakelaar: papier(`<path d="M30 60 H82 M118 60 H170" stroke="#2B1726" stroke-width="3"/><circle cx="82" cy="60" r="4" fill="#fff" stroke="#2B1726" stroke-width="2.4"/><circle cx="118" cy="60" r="4" fill="#fff" stroke="#2B1726" stroke-width="2.4"/><path d="M85 58 L114 38" stroke="#2B1726" stroke-width="3" stroke-linecap="round"/>`),
  stroommeter: papier(`<path d="M30 60 H82 M118 60 H170" stroke="#2B1726" stroke-width="3"/><circle cx="100" cy="60" r="18" fill="#fff" stroke="#2B1726" stroke-width="3"/><text x="100" y="68" font-size="22" text-anchor="middle" fill="#2B1726" font-weight="700">A</text>`),
  spanningsmeter: papier(`<path d="M30 60 H82 M118 60 H170" stroke="#2B1726" stroke-width="3"/><circle cx="100" cy="60" r="18" fill="#fff" stroke="#2B1726" stroke-width="3"/><text x="100" y="68" font-size="22" text-anchor="middle" fill="#2B1726" font-weight="700">V</text>`),
  motor: papier(`<path d="M30 60 H82 M118 60 H170" stroke="#2B1726" stroke-width="3"/><circle cx="100" cy="60" r="18" fill="#fff" stroke="#2B1726" stroke-width="3"/><text x="100" y="68" font-size="22" text-anchor="middle" fill="#2B1726" font-weight="700">M</text>`),
};

/* ---------- valkuilen: N = H1/H2, E = elektriciteit (H4) ---------- */
const VALKUILEN = {
  N1: ['Natuurkunde = apparaten', 'natuurkunde gaat over alles met een stekker'],
  N2: ['Tijdelijk en blijvend omgedraaid', 'smeltend ijs is scheikunde'],
  N3: ['Botten laten röntgen door', 'op de foto zijn de botten zwart'],
  N4: ['Röntgen is onschadelijk', 'van een baby maak je gewoon een röntgenfoto'],
  N5: ['Proeven mag een beetje', 'een klein likje kan geen kwaad'],
  N6: ['Ruiken zonder opletten', 'diep snuiven boven de beker'],
  N7: ['Hypothese = conclusie', 'de hypothese is wat je gemeten hebt'],
  N8: ['Stappen door elkaar', 'eerst het experiment, dan pas de vraag'],
  N9: ['Een indicator kleurt altijd', 'jodium maakt alles blauw'],
  N10: ['Grootheid en eenheid verwisseld', '25 lengte'],
  N11: ['Getal zonder eenheid', 'ik weeg 52'],
  N12: ['Massa = gewicht', 'massa en gewicht zijn hetzelfde'],
  N13: ['Minder massa op de maan', 'op de maan heb je maar 10 kg massa'],
  N14: ['Gewicht in kilogram', 'mijn gewicht is 52 kg'],
  N15: ['Diameter als straal', 'een blikje van 6 cm breed: r = 6 cm'],
  N16: ['Bij de rand aflezen', 'aflezen waar het water langs het glas omhoog kruipt'],
  N17: ['Eén streepje = 1', 'elk streepje is 1 mL'],
  N18: ['Eindstand = volume', 'de steen is 78 mL'],
  N19: ['Groot is dicht', 'een groot blok heeft een grote dichtheid'],
  N20: ['Halve blok, halve dichtheid', 'doorzagen halveert de dichtheid'],
  N21: ['Zwaar zinkt', 'een olietanker moet zinken'],
  N22: ['Altijd met water vergelijken', 'ijs drijft overal'],
  N23: ['Omrekenen de verkeerde kant op', '250 mA = 250 000 A'],
  N24: ['Liter en cm³ los van elkaar', '1 liter = 1 cm³'],
  N25: ['Eenheden niet omgerekend', 'dichtheid = 13,65 : 21 met kg en dm³'],
  E1: ['Eén draad is genoeg', 'één draad naar het lampje is genoeg'],
  E2: ['Stroom raakt op', 'ná het lampje is er minder stroom'],
  E3: ['Botsende stromen', 'uit + en uit − komt stroom die in het lampje botst'],
  E4: ['Eén voor één', 'het eerste lampje merkt niets van het tweede'],
  E5: ['De batterij levert vaste stroom', 'lampje los: de andere krijgen meer'],
  E6: ['Spanning = stroom', 'een losse batterij geeft 1,5 A'],
  E7: ['Stroommeter naast het lampje', 'stroommeter over het lampje zetten'],
  E8: ['Spanningsmeter in de kring', 'spanningsmeter in de draad zetten'],
  E9: ['Parallel is overal gelijk', 'elke tak heeft dezelfde stroom als het totaal'],
  E10: ['Lucht geleidt', 'de stroom springt over de open schakelaar'],
  E11: ['Hard = geleider', 'glas geleidt, want het is hard'],
  E12: ['Alleen koper geleidt', 'staal en aluminium geleiden niet'],
  E13: ['Spanningen niet optellen', 'drie batterijen van 1,5 V geven 1,5 V'],
  E14: ['Netspanning onderschat', '230 V is ook veilig'],
  E15: ['De adapter maakt stroom', 'de adapter geeft extra stroom'],
  E16: ['Lading raakt op', 'kring open: de lading is op'],
  E17: ['Serie: de rest blijft branden', 'in serie één lampje los, de rest brandt'],
  E18: ['Open en dicht verwisseld', 'schakelaar open = lampje aan'],
  E19: ['A en V verwisseld', 'een cirkel met V meet de stroom'],
  E21: ['Meetbereik vergeten', 'rood snoer op 0,5 A, toch 40 A aflezen'],
  E22: ['Kapotte tak: alles uit', 'een kapot snoertje in één tak zet alles uit'],
};

/* ---------- bazen (elk is één denkfout, met knipperen en ademen) ---------- */
const BAAS = {
  apparaten: NK.baas({ vorm: 'blok', kleur: '#C9CED6', kleur2: '#6E7783', extra: '<path d="M100 70 C112 72 116 86 108 96" stroke="#2E3440" stroke-width="4" fill="none"/><rect x="102" y="94" width="14" height="10" rx="2" fill="#2E3440"/><path d="M106 104 v6 M112 104 v6" stroke="url(#nk-staal)" stroke-width="2.4"/><circle cx="44" cy="20" r="5" fill="#DB5A4A"/><path d="M44 25 V36" stroke="#6E7783" stroke-width="3"/>' }),
  proever: NK.baas({ vorm: 'blob', kleur: '#9BEA9E', kleur2: '#2E7A45', mond: 'open', extra: '<path d="M56 92 C56 104 66 106 66 96" fill="#F28C9E" stroke="#C25468" stroke-width="1.5"/><g transform="translate(86 8)"><rect x="0" y="10" width="18" height="26" rx="4" fill="#8A4A1A" opacity=".9"/><rect x="3" y="4" width="12" height="7" rx="2" fill="#2E3440"/><path d="M9 36 v6" stroke="#C9850A" stroke-width="3"/></g>' }),
  verwisselaar: NK.baas({ vorm: 'blob', kleur: '#D7B4EA', kleur2: '#5E2750', extra: '<g transform="rotate(-12 30 30)"><rect x="6" y="18" width="44" height="18" rx="5" fill="#fff" stroke="#5E2750" stroke-width="2"/><text x="28" y="31" font-size="11" text-anchor="middle" fill="#5E2750" font-weight="700">lengte</text></g><g transform="rotate(10 92 30)"><rect x="76" y="20" width="32" height="18" rx="5" fill="#fff" stroke="#EA580C" stroke-width="2"/><text x="92" y="33" font-size="11" text-anchor="middle" fill="#EA580C" font-weight="700">25</text></g>' }),
  maanlicht: NK.baas({ vorm: 'ballon', kleur: '#E6E6EA', kleur2: '#7E7E8C', iris: '#2F7FB8', extra: '<circle cx="38" cy="64" r="6" fill="#9A9AA6" opacity=".6"/><circle cx="84" cy="74" r="8" fill="#9A9AA6" opacity=".55"/><circle cx="70" cy="22" r="4" fill="#9A9AA6" opacity=".6"/>' }),
  diameter: NK.baas({ vorm: 'druppel', kleur: '#7FD0F0', kleur2: '#1E5A86', extra: '<path d="M14 104 H106" stroke="#EA580C" stroke-width="4"/><path d="M14 98 V110 M106 98 V110" stroke="#EA580C" stroke-width="4"/><text x="60" y="100" font-size="11" text-anchor="middle" fill="#C2410C" font-weight="800">r = d ?</text>' }),
  grootdicht: NK.baas({ vorm: 'blok', kleur: '#E8B878', kleur2: '#8A5A2E', iris: '#5A3A00', extra: '<text x="60" y="16" font-size="12" text-anchor="middle" fill="#8A5A2E" font-weight="800">ZO GROOT!</text>' }),
  zwaarzinkt: NK.baas({ vorm: 'blob', kleur: '#9AA3AE', kleur2: '#3E444E', iris: '#1E5A86', extra: '<g transform="translate(82 66)" stroke="url(#nk-staal)" stroke-width="5" fill="none" stroke-linecap="round"><path d="M14 0 V40 M0 30 C4 44 24 44 28 30 M6 8 H22"/><circle cx="14" cy="-4" r="5"/></g>' }),
  komma: NK.baas({ vorm: 'blob', kleur: '#FFB27A', kleur2: '#C2410C', extra: '<path d="M98 20 C108 20 110 36 98 44 C104 34 96 32 92 30 C90 24 94 20 98 20Z" fill="#3D1B33"/><text x="24" y="26" font-size="12" fill="#C2410C" font-weight="800">× 1000?</text>' }),
  eendraad: NK.baas({ vorm: 'lamp', kleur: '#FFF3B0', kleur2: '#C99A10', iris: '#3A6FB0', extra: '<path d="M60 104 C60 114 84 114 96 110 C108 106 112 112 116 116" stroke="#D93A3A" stroke-width="5" fill="none" stroke-linecap="round"/>' }),
  hardgeleider: NK.baas({ vorm: 'blok', kleur: '#CFEFFF', kleur2: '#2F7FB8', iris: '#123E66', extra: '<path d="M100 10 L90 30 H100 L88 52" stroke="#F4B740" stroke-width="4" fill="none" stroke-linejoin="round"/>' }),
  stroomvreter: NK.baas({ vorm: 'blob', kleur: '#FFE27A', kleur2: '#C98A10', mond: 'open', iris: '#7A3A16', extra: [[44, 98], [56, 106], [70, 100], [100, 92], [108, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="url(#nk-lading)" stroke="#8A5A00" stroke-width=".8"/>`).join('') }),
  spanningsstromer: NK.baas({ vorm: 'ballon', kleur: '#FFB3A6', kleur2: '#A8241A', extra: '<rect x="50" y="100" width="20" height="10" rx="3" fill="url(#nk-staal)"/><text x="96" y="22" font-size="12" fill="#A8241A" font-weight="800">1,5 A?</text>' }),
  volger: NK.baas({ vorm: 'lamp', kleur: '#DDE3EA', kleur2: '#6E7783', iris: '#3D1B33', extra: '<path d="M4 60 H22 M16 54 L22 60 L16 66 M98 60 H116 M110 54 L116 60 L110 66" stroke="#EA580C" stroke-width="3.4" fill="none" stroke-linecap="round"/>' }),
  kraan: NK.baas({ vorm: 'batterij', kleur: '#646B78', kleur2: '#14171C', licht: '#9AA3AE', iris: '#3A6FB0', extra: '<path d="M94 40 H110 V52" stroke="url(#nk-staal)" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M110 56 C106 62 106 66 110 68 C114 66 114 62 110 56Z" fill="#7FD0F0"/><rect x="88" y="32" width="10" height="16" rx="3" fill="url(#nk-rood)"/>' }),
};

/* ---------- lab-logboek (album): één ontdekking per les ---------- */
const LOGBOEK = {
  rontgenfoto: { naam: 'Röntgenfoto', svg: NK.obj.rontgenfoto(), sub: 'Botten houden straling tegen: wit.', waar: 'Vakken en röntgen' },
  jodium: { naam: 'Jodium-proef', svg: NK.obj.jodium(), sub: 'Donkerblauw = zetmeel.', waar: 'Onderzoeken' },
  meetlint: { naam: '25 meter', svg: NK.obj.meetlint(), sub: 'Meetwaarde + eenheid.', waar: 'Grootheid en eenheid' },
  astronaut: { naam: 'Astronaut', svg: NK.obj.astronaut(), sub: 'Massa blijft, gewicht verandert.', waar: 'Massa en gewicht' },
  maatcilinder: { naam: 'Maatcilinder', svg: NK.obj.maatcilinder(), sub: 'Op ooghoogte, vlakke deel.', waar: 'Volume' },
  blokje: { naam: 'Blokje van 1 cm³', svg: NK.obj.blokje(), sub: 'Dichtheid = gram per cm³.', waar: 'Dichtheid' },
  tanker: { naam: 'Olietanker', svg: NK.obj.tanker(), sub: 'Zwaar, en toch drijft hij.', waar: 'Drijven en zinken' },
  trap: { naam: 'Eenhedentrap', svg: NK.obj.trap(), sub: 'Kleine eenheid, groot getal.', waar: 'Omrekenen' },
  lampje: { naam: 'Gesloten kring', svg: NK.obj.lampje(), sub: 'Een rondje: dan brandt hij.', waar: 'Stroomkring' },
  potlood: { naam: 'Potloodstift', svg: NK.obj.potlood(), sub: 'Koolstof geleidt.', waar: 'Geleiders' },
  stroommeter: { naam: 'Stroommeter', svg: NK.obj.stroommeter(), sub: 'Overal hetzelfde getal.', waar: 'Stroomsterkte' },
  ballon: { naam: 'Ballon en pomp', svg: NK.obj.ballon(), sub: 'Spanning is de duw.', waar: 'Spanning' },
  schema: { naam: 'Schakelschema', svg: NK.obj.schema(), sub: 'Symbolen in plaats van tekeningen.', waar: 'Schakelingen' },
  splitsing: { naam: 'Splitsing', svg: NK.obj.splitsing(), sub: 'Totaal = de takken samen.', waar: 'Stroom beredeneren' },
};

/* =========================================================================
   H1 NATUURWETENSCHAPPEN
   ========================================================================= */
const H1 = [
  { id: 'vakken', titel: 'Natuurkunde of scheikunde?', sub: '§1.1 · drie vakken en röntgen', bol: ob(NK.obj.ijsblok()), orgs: ['rontgenfoto'],
    stappen: [
      toon('Hoi Storm! Ik ben <b>Vonk</b>, jouw labmaatje. In dit lab voorspel je eerst, dan kijk je, dan verklaar je. Een foute voorspelling is geen probleem: dan vind je een valkuil. We beginnen met ijs in je limonade.', 'poe', {
        beeld: SC.ijsVoor, vraag: 'IJs smelt in je glas. Welk vak bestudeert dat?', beeldNa: SC.ijsNa,
        keuzes: [{ t: 'natuurkunde', goed: true }, { t: 'scheikunde', mis: 'N2' }, { t: 'biologie', mis: 'N1' }],
        uitleg: 'Water blijft water. Zet je het in de vriezer, dan wordt het weer ijs. Je kunt het <b>terugdraaien</b>: een <b>tijdelijke</b> verandering. Dat is <b>natuurkunde</b>.',
        verklaar: { vraag: 'Waarom hoort smelten bij natuurkunde?', opties: [
          { t: 'Het blijft dezelfde stof en je kunt het terugdraaien', goed: true },
          { t: 'Er is een apparaat voor nodig: de vriezer', fout: 'Natuurkunde gaat niet over apparaten. Ook een ijspegel die in de zon smelt is natuurkunde.', mis: 'N1' },
          { t: 'Het verandert van vorm, dus het is een nieuwe stof', fout: 'Ijs en water zijn allebei water. Een nieuwe stof ontstaat bij scheikunde.', mis: 'N2' }], w: 'Natuurkunde: tijdelijke veranderingen in de niet-levende natuur.' } }),
      toon('Sorteer: welk vak hoort bij deze verandering? Stel jezelf steeds de vraag: <b>leeft het?</b> En zo niet: <b>kun je het terugdraaien?</b>', 'sorteer', {
        bakken: [{ id: 'bio', naam: 'Biologie', sub: 'levende natuur' }, { id: 'nat', naam: 'Natuurkunde', sub: 'tijdelijk' }, { id: 'sch', naam: 'Scheikunde', sub: 'blijvend' }],
        kaarten: [
          { t: 'Een spijker roest', bak: 'sch', w: 'Roest is een nieuwe stof: blijvend.', fout: 'Van roest kun je geen spijker meer maken: er is een andere stof ontstaan. Scheikunde.', mis: 'N2' },
          { t: 'Kaarsvet smelt', bak: 'nat', w: 'Afkoelen en het is weer vast: tijdelijk.', fout: 'Smelten kun je terugdraaien: natuurkunde.', mis: 'N2' },
          { t: 'Hout verbrandt', bak: 'sch', w: 'As en rook worden nooit meer hout: blijvend.', fout: 'Uit as maak je geen hout meer: scheikunde.', mis: 'N2' },
          { t: 'Je hart klopt sneller als linksvoor in de wedstrijd', bak: 'bio', w: 'Jouw lichaam leeft: biologie.', fout: 'Je lichaam is levende natuur: biologie.' },
          { t: 'De Eiffeltoren wordt in de zomer 30 cm langer', bak: 'nat', w: 'In de winter krimpt hij weer: tijdelijk.', fout: 'Hij krimpt weer als het kouder wordt: natuurkunde.', mis: 'N2' },
          { t: 'Water verdampt uit het zwembad', bak: 'nat', w: 'Waterdamp kan weer water worden: tijdelijk.', fout: 'Verdampen is een verandering van toestand: natuurkunde.', mis: 'N2' },
          { t: 'Een koperen dak wordt groen', bak: 'sch', w: 'Oxideren: er ontstaat een nieuwe stof.', fout: 'Het groen is een nieuwe stof (oxideren): scheikunde.', mis: 'N2' },
          { t: 'Een bliksemflits', bak: 'nat', w: 'Elektriciteit in de lucht: natuurkunde, zonder apparaat.', fout: 'Bliksem leeft niet en er ontstaat geen nieuwe stof: natuurkunde.', mis: 'N1' },
        ], na: 'Biologie = wat leeft. Natuurkunde = <b>tijdelijk</b>. Scheikunde = <b>blijvend</b>, want dan ontstaat een andere stof.' }),
      snap('v-tijdelijk', 'Snap je het verschil tussen <b>natuurkunde</b> en <b>scheikunde</b>?',
        [[Q('Je smelt chocolade om op een taart te tekenen. Welk vak?', 'natuurkunde', [['scheikunde', 'De chocolade blijft chocolade: als hij afkoelt wordt hij weer hard. Tijdelijk.', 'N2'], ['biologie', 'Chocolade leeft niet.']], 'Smelten is tijdelijk: natuurkunde.')],
          [Q('Een brood wordt in de oven bruin en knapperig. Welk vak?', 'scheikunde', [['natuurkunde', 'Het bruine korstje kun je niet terug veranderen in deeg: er zijn nieuwe stoffen ontstaan.', 'N2'], ['biologie', 'Het gaat om de verandering van de stof, niet om iets dat leeft.']], 'Blijvend = scheikunde.')]],
        [[toon('Andere manier: de <b>terugdraai-test</b>. Voorspel: kun je van as weer hout maken?', 'poe', { beeld: SC.houtVoor, beeldNa: SC.houtNa, vraag: 'Het hout is verbrand. Kun je van de as weer hout maken?',
          keuzes: [{ t: 'Nee, nooit meer', goed: true }, { t: 'Ja, als je het lang genoeg laat liggen', mis: 'N2' }],
          uitleg: 'Nee. Er zijn <b>andere stoffen</b> ontstaan: as en rook. Niet terug te draaien = <b>blijvend</b> = scheikunde. Smelten wel terug te draaien = tijdelijk = natuurkunde.' })],
         [uitleg('Nog een manier: zet het in een tabel. <b>Leeft het?</b> Biologie. <b>Niet levend, en terug te draaien?</b> Natuurkunde. <b>Niet levend, en er ontstaat een andere stof?</b> Scheikunde.', 'leeft het? → biologie<br>terugdraaien kan → natuurkunde<br>nieuwe stof → scheikunde<small>IJs → water → ijs: natuurkunde. Hout → as: scheikunde.</small>')]],
        [uitleg('Waarom dat verschil? Bij natuurkunde verandert de <b>vorm</b> of de <b>toestand</b> (vast, vloeibaar, gas), maar de stof blijft hetzelfde. Bij scheikunde ontstaan <b>andere stoffen met andere eigenschappen</b>: as ziet er anders uit, ruikt anders en brandt niet meer zoals hout. Natuurwetenschappen gaan ook over <b>natuurverschijnselen</b>: onweer, aardbevingen, vulkanen.', 'zelfde stof → natuurkunde<br>andere stof → scheikunde')]),
      toon('Nu iets heel anders: <b>röntgenstraling</b>, in 1895 ontdekt door Röntgen. Onzichtbaar, en het gaat dwars door papier en je huid. Voorspel eerst, schuif dan de bron over de hand.', 'rontgen', {
        inzet: { vraag: 'Welke kleur krijgen de botten op de röntgenfoto?', keuzes: [{ t: 'wit', goed: true }, { t: 'zwart', mis: 'N3' }, { t: 'je ziet ze niet', mis: 'N3' }] },
        verklaar: { vraag: 'Waarom zijn de botten wit?', opties: [
          { t: 'Botten houden de straling tegen, dus daar wordt de foto niet zwart', goed: true },
          { t: 'Botten geven zelf licht', fout: 'Botten geven geen licht. Ze houden de straling tegen.' },
          { t: 'De straling gaat het makkelijkst door botten', fout: 'Andersom: door huid en spieren gaat het makkelijk. Botten houden het tegen.', mis: 'N3' }], w: 'Veel tegengehouden = wit. Bijna niets tegengehouden = donker.' } }, { hint: 'Voorspel en schuif de bron helemaal over de hand.' }),
      snap('v-rontgen', 'Snap je hoe een <b>röntgenfoto</b> werkt?',
        [[Q('Op een röntgenfoto van een voet zie je een fel wit schroefje. Wat zegt dat over metaal?', 'Metaal houdt röntgenstraling goed tegen', [['Metaal laat de straling makkelijk door', 'Dan zou het donker zijn. Wit = tegengehouden.', 'N3'], ['Het schroefje is warm', 'Warmte zie je niet op een röntgenfoto.']], 'Wit op de foto = veel straling tegengehouden.')],
          [Q('Waarom maakt een arts van een ongeboren baby een echo en geen röntgenfoto?', 'Röntgenstraling is schadelijk, een echo (geluid) niet', [['Een echo is scherper', 'Het gaat om veiligheid: röntgenstraling kan het kind schaden.', 'N4'], ['Röntgen werkt niet bij baby’s', 'Het werkt wel, maar het is schadelijk.', 'N4'], ['Een echo is goedkoper', 'Het gaat om veiligheid.', 'N4']], 'Artsen gebruiken röntgen zo weinig mogelijk.')]],
        [[uitleg('Andere manier: denk aan je <b>schaduw</b> in de zon. Waar jij in de weg staat, komt geen licht. Röntgenstraling gaat door je huid heen, maar <b>botten staan in de weg</b>. Op de foto is het omgekeerd van een schaduw: waar straling is tegengehouden, blijft de foto <b>wit</b>.', `<svg viewBox="0 0 100 100" width="150" aria-hidden="true">${NK.obj.rontgenfoto()}</svg><small>tegengehouden = wit · doorgelaten = donker</small>`)],
         [toon('Nog een manier: sorteer wat <b>wit</b> wordt en wat <b>donker</b> wordt op de foto.', 'sorteer', { bakken: [{ id: 'wit', naam: 'Wit', sub: 'houdt straling tegen' }, { id: 'donker', naam: 'Donker', sub: 'laat straling door' }],
           kaarten: [{ t: 'bot', bak: 'wit', w: 'Botten houden de straling tegen.', fout: 'Botten houden de straling juist tegen: wit.', mis: 'N3' }, { t: 'huid', bak: 'donker', w: 'De straling gaat er bijna ongehinderd door.', fout: 'Huid laat de straling door: donker.', mis: 'N3' }, { t: 'een metalen schroef', bak: 'wit', w: 'Metaal houdt de straling goed tegen.', fout: 'Metaal houdt veel tegen: wit.' }, { t: 'spieren', bak: 'donker', w: 'Spieren laten bijna alles door.', fout: 'Spieren laten de straling door: donker.', mis: 'N3' }, { t: 'een tand', bak: 'wit', w: 'Tanden zijn hard, net als bot: wit.', fout: 'Tanden houden veel tegen: wit.' }, { t: 'lucht naast je hand', bak: 'donker', w: 'Lucht houdt niets tegen.', fout: 'Lucht houdt niets tegen: helemaal donker.' }] })]],
        [uitleg('Waarom zo voorzichtig? Röntgenstraling kan cellen in je lichaam beschadigen. Daarom krijg je er zo weinig mogelijk van, en gaat de assistent achter een scherm staan. Een <b>echo</b> werkt met geluidsgolven: niet schadelijk, dus goed voor een ongeboren kind.', 'röntgen: handig, maar schadelijk<br>echo: geluid, niet schadelijk')]),
      kaart('Drie natuurwetenschappen', NK.obj.rontgenfoto(), 'Natuurkunde: tijdelijk. Scheikunde: blijvend. Biologie: wat leeft.', ['Tijdelijk = terug te draaien (smelten, uitzetten).', 'Blijvend = er ontstaat een andere stof (roesten, verbranden).', 'Röntgenfoto: botten houden straling tegen en worden wit.', 'Röntgen is schadelijk: bij een ongeboren kind een echo.']),
      baas('De Apparatenman', BAAS.apparaten, 'Natuurkunde gaat over alles met een stekker of een apparaat.', 'De Apparatenman denkt dat natuurkunde over stekkers gaat. Laat zien dat jij het echte verschil kent. Fout kost jou niks.', [
        Q('Een plas bevriest in de winter. Welk vak?', 'natuurkunde', [['scheikunde', 'Bevriezen kun je terugdraaien: tijdelijk.', 'N2'], ['geen vak, er is geen apparaat', 'Natuurkunde gaat ook over de natuur zonder apparaten.', 'N1']], 'Verandering van toestand: natuurkunde.'),
        Q('Een appel wordt bruin als je hem doorsnijdt. Welk vak?', 'scheikunde', [['natuurkunde', 'Het bruin wordt nooit meer wit: er is een andere stof ontstaan.', 'N2'], ['biologie', 'Het gaat om de verandering van de stof.']], 'Blijvend = scheikunde.'),
        Q('Wat bestudeert natuurkunde?', 'tijdelijke veranderingen in de niet-levende natuur', [['alles met apparaten en stroom', 'Ook smeltend ijs en bliksem zijn natuurkunde.', 'N1'], ['blijvende veranderingen', 'Dat is scheikunde.', 'N2'], ['de levende natuur', 'Dat is biologie.']], 'Tijdelijk en niet-levend.'),
        Q('Een metalen staaf wordt warm en daardoor langer. Welk vak?', 'natuurkunde', [['scheikunde', 'Hij krimpt weer als hij afkoelt: tijdelijk.', 'N2'], ['biologie', 'Een staaf leeft niet.']], 'Uitzetten is tijdelijk.'),
        Q('Op een röntgenfoto zijn de botten ...', 'wit, want ze houden de straling tegen', [['zwart, want de straling gaat erdoorheen', 'Andersom: botten houden de straling tegen.', 'N3'], ['onzichtbaar', 'Ze zijn juist goed te zien: wit.', 'N3']], 'Tegengehouden = wit.'),
        Q('Waarom geen röntgenfoto van een ongeboren baby?', 'Röntgenstraling is schadelijk', [['Dan zie je de baby niet', 'Je ziet wel iets, maar het is schadelijk.', 'N4'], ['Het mag wel, het is onschadelijk', 'Röntgenstraling is schadelijk voor je lichaam.', 'N4']], 'Daarom een echo.'),
        Q('Een kaars brandt. Het kaarsvet verdwijnt. Welk vak?', 'scheikunde', [['natuurkunde, want het smelt alleen', 'Smelten is tijdelijk, maar verbranden maakt nieuwe stoffen (rook, gassen). Je krijgt het vet niet terug.', 'N2'], ['biologie', 'Een kaars leeft niet.']], 'Verbranden is blijvend.'),
        Q('Welke is natuurkunde?', 'zonnepanelen die elektriciteit maken', [['een spijker die roest', 'Roesten is blijvend: scheikunde.', 'N2'], ['een plant die groeit', 'Groeien hoort bij wat leeft: biologie.']], 'Elektriciteit opwekken hoort bij natuurkunde.'),
      ]),
    ] },

  { id: 'methode', titel: 'Onderzoeken als een wetenschapper', sub: '§1.2 · methode, veilig waarnemen, indicator', bol: ob(NK.obj.jodium()), orgs: ['jodium'],
    stappen: [
      toon('Een onderzoek gaat altijd in dezelfde stappen: de <b>wetenschappelijke methode</b>. Zet ze in de goede volgorde.', 'stappenrij', {
        vraag: 'Onderzoeksvraag: <i>drijft een appel in water?</i> Wat doe je eerst, en wat daarna?', mis: 'N8',
        stappen: [
          { t: 'Onderzoeksvraag opstellen', w: 'Je begint met wat je wilt ontdekken.' },
          { t: 'Hypothese bedenken: een voorlopig antwoord', w: 'Vóór je iets test, schrijf je op wat je denkt dat er gebeurt.' },
          { t: 'Experiment bedenken', w: 'Pas als je weet wat je verwacht, bedenk je een proef die het antwoord geeft.' },
          { t: 'Experiment uitvoeren', w: 'Nu ga je het echt doen.' },
          { t: 'Meetresultaten weergeven in een tabel of grafiek', w: 'Wat je gemeten hebt, zet je overzichtelijk op een rij.' },
          { t: 'Onderzoeksvraag beantwoorden (conclusie)', w: 'Als laatste: het antwoord, en of je hypothese klopte.' },
        ], goed: '<b>Helemaal goed!</b> Vraag → hypothese → experiment bedenken → uitvoeren → resultaten → conclusie.' }),
      snap('m-hypothese', 'Snap je wat een <b>hypothese</b> is?',
        [[Q('Onderzoeksvraag: "Drijft een appel in water?" Wat is een hypothese?', 'Ik denk dat de appel drijft', [['De appel drijft, dat zag ik', 'Dat is een resultaat: dat weet je pas ná het experiment. Een hypothese is een voorlopig antwoord vooraf.', 'N7'], ['Drijft een appel in water?', 'Dat is de onderzoeksvraag zelf.'], ['Doe een appel in een bak water', 'Dat is het experiment.']], 'Hypothese = voorlopig antwoord, vóór het experiment.')],
          [Q('Storm denkt: "Met een zwemband blijf ik makkelijker drijven." Ze test het in het zwembad. Wat was dit zinnetje?', 'haar hypothese', [['haar conclusie', 'Een conclusie komt pas na het testen.', 'N7'], ['haar onderzoeksvraag', 'Een vraag eindigt met een vraagteken: "Drijf ik makkelijker met een zwemband?"'], ['haar meetresultaat', 'Ze heeft nog niets gemeten.']], 'Wat je vooraf verwacht, is de hypothese.')]],
        [[toon('Andere manier: sorteer de zinnen van een onderzoek naar zetmeel in brood.', 'sorteer', { bakken: [{ id: 'v', naam: 'Onderzoeksvraag' }, { id: 'h', naam: 'Hypothese' }, { id: 'c', naam: 'Conclusie' }], kaarten: [
          { t: 'Zit er zetmeel in een witte boterham?', bak: 'v', w: 'Een vraag: wat wil je weten?', fout: 'Dit is een vraag: de onderzoeksvraag.' },
          { t: 'Ik denk dat er geen zetmeel in zit', bak: 'h', w: 'Een verwachting vooraf.', fout: '"Ik denk dat ..." is een voorlopig antwoord: de hypothese.', mis: 'N7' },
          { t: 'Er zit wél zetmeel in: de hypothese klopte niet', bak: 'c', w: 'Het antwoord na het experiment.', fout: 'Dit weet je pas na de proef: de conclusie.', mis: 'N7' }] })],
         [uitleg('Nog een manier: een <b>detective</b>. Eerst de vraag: wie heeft het gedaan? Dan een vermoeden: "ik denk de tuinman" (de <b>hypothese</b>). Dan bewijs zoeken (het <b>experiment</b>). Pas daarna weet je het zeker (de <b>conclusie</b>). Een vermoeden mag fout zijn.', 'vraag → vermoeden → bewijs → antwoord<small>Het vermoeden is de hypothese.</small>')]],
        [uitleg('Waarom schrijf je de hypothese vóór het experiment op? Anders pas je hem achteraf aan aan wat je zag, en leer je niets. Een hypothese die fout blijkt is geen mislukking: in het boek dacht de leerling dat er geen zetmeel in brood zit, en ontdekte dat het wél zo was.', 'een foute hypothese = een ontdekking')]),
      toon('Waarnemen doe je met je <b>zintuigen</b>. Maar in het lab mag niet alles. Sorteer: wat mag altijd, wat alleen voorzichtig, wat nooit?', 'sorteer', {
        bakken: [{ id: 'ja', naam: 'Mag altijd' }, { id: 'voor', naam: 'Alleen voorzichtig' }, { id: 'nooit', naam: 'Nooit' }],
        kaarten: [
          { t: 'Kijken welke kleur een vloeistof heeft', bak: 'ja', w: 'Zien mag altijd.', fout: 'Kijken mag altijd.' },
          { t: 'Luisteren of het bruist', bak: 'ja', w: 'Horen mag altijd.', fout: 'Horen mag altijd.' },
          { t: 'Voelen of een stof korrelig is', bak: 'ja', w: 'Voelen mag (met de goede spullen).', fout: 'Voelen mag.' },
          { t: 'Ruiken aan de damp', bak: 'voor', w: 'Wuif de damp voorzichtig naar je neus. Sommige dampen zijn giftig.', fout: 'Ruiken mag alleen voorzichtig: wuiven, niet snuiven.', mis: 'N6' },
          { t: 'Proeven of iets zout is', bak: 'nooit', w: 'Proeven mag nooit: sommige stoffen zijn giftig.', fout: 'Proeven mag nooit in het lab.', mis: 'N5' },
          { t: 'Een heel klein likje nemen', bak: 'nooit', w: 'Ook een likje is proeven: nooit.', fout: 'Ook een klein beetje proeven mag niet.', mis: 'N5' },
        ], na: 'Zien, horen, voelen: altijd. Ruiken: voorzichtig. Proeven: <b>nooit</b>.' }),
      toon('Nu een <b>indicator</b>: een stof die van kleur verandert als een andere stof er is. Jodium is bruingeel. Voorspel eerst.', 'poe', {
        beeld: SC.broodVoor, beeldNa: SC.broodNa, vraag: 'Je druppelt jodium op een witte boterham. Wat zie je?',
        keuzes: [{ t: 'de plek wordt donkerblauw', goed: true }, { t: 'het blijft bruingeel', mis: 'N9' }, { t: 'de boterham lost op' }],
        uitleg: 'Donkerblauw! Er zit <b>zetmeel</b> in brood. Jodium is de <b>indicator voor zetmeel</b>.',
        verklaar: { vraag: 'Wat doet een indicator?', opties: [
          { t: 'Hij verandert van kleur als een bepaalde stof aanwezig is', goed: true },
          { t: 'Hij maakt zetmeel', fout: 'Het zetmeel zat er al in. De indicator laat het alleen zien.', mis: 'N9' },
          { t: 'Hij kleurt alles blauw', fout: 'Alleen bij zetmeel. Op suiker blijft jodium bruingeel.', mis: 'N9' }], w: 'Indicator: stof waarmee je de aanwezigheid van een andere stof aantoont.' } }),
      snap('m-indicator', 'Snap je wat een <b>indicator</b> doet?',
        [[Q('Je druppelt jodium op een suikerklontje. Het blijft bruingeel. Conclusie?', 'Er zit geen zetmeel in', [['Er zit wel zetmeel in', 'Bij zetmeel wordt jodium donkerblauw. Het bleef bruingeel.', 'N9'], ['De jodium is kapot', 'De jodium werkt prima: er is gewoon geen zetmeel.'], ['Suiker is een indicator', 'Jodium is hier de indicator.']], 'Geen kleurverandering = de stof is er niet.')],
          [Q('Het blaaspijpje van de politie was ook een indicator. Wat toonde het aan?', 'alcohol', [['zetmeel', 'Zetmeel toon je aan met jodium.'], ['suiker', 'Dat is een andere indicator.'], ['snelheid', 'Snelheid is geen stof.']], 'Er zijn indicatoren voor suiker, alcohol, zetmeel, koolstofdioxide.')]],
        [[toon('Andere manier: doe de proef in gedachten. Wordt het blauw met jodium?', 'sorteer', { bakken: [{ id: 'b', naam: 'Wordt blauw', sub: 'zetmeel' }, { id: 'g', naam: 'Blijft bruingeel', sub: 'geen zetmeel' }], kaarten: [
          { t: 'aardappel', bak: 'b', w: 'Aardappel zit vol zetmeel.', fout: 'Aardappel zit vol zetmeel: blauw.' }, { t: 'pasta', bak: 'b', w: 'Pasta is van meel: zetmeel.', fout: 'Pasta bevat zetmeel: blauw.' },
          { t: 'suiker', bak: 'g', w: 'Suiker is geen zetmeel.', fout: 'Suiker is geen zetmeel: bruingeel.', mis: 'N9' }, { t: 'water', bak: 'g', w: 'Geen zetmeel.', fout: 'In water zit geen zetmeel.', mis: 'N9' },
          { t: 'witte rijst', bak: 'b', w: 'Rijst bevat veel zetmeel.', fout: 'Rijst bevat zetmeel: blauw.' }, { t: 'keukenzout', bak: 'g', w: 'Zout is geen zetmeel.', fout: 'Zout bevat geen zetmeel.', mis: 'N9' }] })],
         [uitleg('Nog een manier: een indicator is een <b>verklikker</b>. Hij zegt niet hoeveel, alleen: "ja, die stof is er" (kleur verandert) of "nee" (kleur blijft). Elke indicator verklikt maar één soort stof.', 'jodium + zetmeel → donkerblauw<small>jodium zonder zetmeel → blijft bruingeel</small>')]],
        [uitleg('In het boek dacht de leerling: "geen zetmeel in brood" (hypothese). Het werd blauw, dus de conclusie was: wél zetmeel, de hypothese was niet juist. Zo werkt de methode: de proef beslist, niet wat je vooraf dacht.', 'de proef beslist')]),
      kaart('Onderzoeken', NK.obj.jodium(), 'Vraag → hypothese → experiment → resultaten → conclusie. Proeven mag nooit.', ['Hypothese = voorlopig antwoord vóór het experiment.', 'Zien, horen, voelen mag; ruiken voorzichtig; proeven nooit.', 'Indicator: verandert van kleur bij een bepaalde stof.', 'Jodium + zetmeel = donkerblauw.']),
      baas('De Proever', BAAS.proever, 'Een klein likje kan geen kwaad, en de hypothese schrijf je achteraf op.', 'De Proever wil overal aan likken. Versla hem met veilig en slim onderzoek. Fout kost jou niks.', [
        Q('Mag je in het lab proeven, als het maar een heel klein beetje is?', 'Nee, nooit', [['Ja, een klein likje', 'Ook een klein beetje kan giftig zijn.', 'N5'], ['Alleen bij suiker', 'In het lab weet je nooit zeker wat erin zit.', 'N5']], 'Proeven mag nooit.'),
        Q('Hoe ruik je veilig aan een stof?', 'De damp voorzichtig naar je neus wuiven', [['Diep snuiven boven de beker', 'Sommige dampen zijn giftig en beschadigen je longen.', 'N6'], ['Ruiken mag nooit', 'Ruiken mag wel, maar voorzichtig.']], 'Wuiven, niet snuiven.'),
        Q('Wat komt direct na de onderzoeksvraag?', 'de hypothese', [['het experiment uitvoeren', 'Eerst schrijf je op wat je verwacht.', 'N8'], ['de conclusie', 'De conclusie is de laatste stap.', 'N8']], 'Vraag, dan hypothese.'),
        Q('Wat is de laatste stap van de wetenschappelijke methode?', 'de onderzoeksvraag beantwoorden', [['de hypothese bedenken', 'Die komt vroeg.', 'N8'], ['het experiment bedenken', 'Dat is stap 3.', 'N8']], 'De conclusie.'),
        Q('Wat is een hypothese?', 'een voorlopig antwoord op de onderzoeksvraag', [['het eindantwoord na de proef', 'Dat is de conclusie.', 'N7'], ['de vraag die je onderzoekt', 'Dat is de onderzoeksvraag.']], 'Je verwacht resultaat, vooraf.'),
        Q('Jodium wordt donkerblauw op een stuk kaas. Wat weet je?', 'Er zit zetmeel in', [['Er zit suiker in', 'Jodium toont zetmeel aan, niet suiker.', 'N9'], ['Er zit geen zetmeel in', 'Blauw betekent juist: wél zetmeel.', 'N9']], 'Blauw = zetmeel.'),
        Q('Welke kleur heeft jodium zonder zetmeel?', 'bruingeel', [['donkerblauw', 'Alleen met zetmeel wordt het donkerblauw.', 'N9'], ['kleurloos', 'Jodium is bruingeel.']], 'Bruingeel.'),
        Q('Je hypothese blijkt niet te kloppen. Wat nu?', 'Prima: dat is ook een uitkomst', [['Je past de hypothese achteraf aan', 'Dan klopt je onderzoek niet meer. De hypothese schrijf je vooraf op.', 'N7'], ['Het onderzoek is mislukt', 'Een foute hypothese is een ontdekking.', 'N7']], 'De proef beslist.'),
      ]),
    ] },

  { id: 'grootheid', titel: 'Grootheid, eenheid, meetwaarde', sub: '§1.2 · meten', bol: ob(NK.obj.meetlint()), orgs: ['meetlint'],
    stappen: [
      toon('Storm staat op de weegschaal en zegt: "Ik weeg 52." In de natuurkunde is dat niet goed genoeg. Voorspel wat er mist.', 'poe', {
        beeld: SC.weegVoor, beeldNa: SC.weegNa, vraag: 'Wat mist er aan "Ik weeg 52"?',
        keuzes: [{ t: 'de eenheid: kg', goed: true }, { t: 'niks, 52 is genoeg', mis: 'N11' }, { t: 'het woord lengte', mis: 'N10' }],
        uitleg: '<b>52</b> is de <b>meetwaarde</b> (het getal), <b>kg</b> is de <b>eenheid</b> (de maat), <b>massa</b> is de <b>grootheid</b> (wat je meet).',
        verklaar: { vraag: 'Waarom moet de eenheid erachter?', opties: [
          { t: 'Zonder eenheid weet je niet hoe groot het is: 52 gram of 52 kilogram?', goed: true },
          { t: 'Omdat het netter staat', fout: 'Het gaat om de betekenis: 52 gram is iets heel anders dan 52 kilogram.', mis: 'N11' },
          { t: 'Omdat 52 de grootheid is', fout: '52 is de meetwaarde. De grootheid is massa.', mis: 'N10' }], w: 'Een eenheid staat altijd achter het getal.' } }),
      toon('Sorteer: is het een <b>grootheid</b> (wat meet je?), een <b>eenheid</b> (in welke maat?) of een <b>meetwaarde</b> (het getal)?', 'sorteer', {
        bakken: [{ id: 'g', naam: 'Grootheid', sub: 'wat je meet' }, { id: 'e', naam: 'Eenheid', sub: 'de maat' }, { id: 'm', naam: 'Meetwaarde', sub: 'het getal' }],
        kaarten: [
          { t: 'lengte', bak: 'g', w: 'Iets wat je kunt meten.', fout: 'Lengte is een eigenschap die je meet: grootheid. "25 lengte" kan niet.', mis: 'N10' },
          { t: 'meter', bak: 'e', w: '"25 meter" kan: een eenheid.', fout: 'Meter zet je achter een getal: eenheid.', mis: 'N10' },
          { t: '25', bak: 'm', w: 'Het getal dat je meet.', fout: '25 is het getal: de meetwaarde.' },
          { t: 'tijd', bak: 'g', w: 'Een eigenschap die je meet.', fout: 'Tijd meet je: grootheid.', mis: 'N10' },
          { t: 'seconde', bak: 'e', w: '"60 seconden" kan.', fout: 'Seconde staat achter een getal: eenheid.', mis: 'N10' },
          { t: 'massa', bak: 'g', w: 'De hoeveelheid stof: grootheid.', fout: 'Massa meet je: grootheid.', mis: 'N10' },
          { t: 'kilogram', bak: 'e', w: 'De maat voor massa.', fout: '"52 kilogram" kan: eenheid.', mis: 'N10' },
          { t: 'volume', bak: 'g', w: 'De ruimte die iets inneemt.', fout: 'Volume meet je: grootheid.', mis: 'N10' },
          { t: 'liter', bak: 'e', w: 'De maat voor volume.', fout: '"2 liter" kan: eenheid.', mis: 'N10' },
          { t: '1,5', bak: 'm', w: 'Een getal.', fout: '1,5 is een getal: meetwaarde.' },
        ], na: 'Test: kun je er "25" voor zetten? <b>25 meter</b> kan, dus meter is een eenheid. <b>25 lengte</b> kan niet, dus lengte is een grootheid.' }),
      snap('g-test', 'Snap je het verschil tussen <b>grootheid</b> en <b>eenheid</b>?',
        [[Q('"Het zwembad is 25 meter lang." Wat is de grootheid?', 'lengte', [['meter', 'Meter is de eenheid: die staat achter het getal.', 'N10'], ['25', '25 is de meetwaarde.'], ['zwembad', 'Het zwembad is het voorwerp, niet de eigenschap.']], 'Wat meet je? De lengte.')],
          [Q('Welke zin is natuurkundig goed?', 'De wedstrijd duurt 60 minuten', [['De wedstrijd duurt 60 tijd', 'Tijd is een grootheid. Achter een getal zet je een eenheid.', 'N10'], ['De wedstrijd duurt 60', 'Zonder eenheid: 60 seconden? 60 minuten?', 'N11'], ['De wedstrijd duurt 60 lengte', 'Lengte is een grootheid, en de verkeerde ook nog.', 'N10']], 'Getal + eenheid.')]],
        [[toon('Andere manier: de <b>25-test</b>. Kun je zeggen "25 ..."? Dan is het een eenheid.', 'sorteer', { bakken: [{ id: 'ja', naam: '"25 ..." kan', sub: 'eenheid' }, { id: 'nee', naam: '"25 ..." kan niet', sub: 'grootheid' }], kaarten: [
          { t: 'centimeter', bak: 'ja', w: '25 centimeter.', fout: '"25 centimeter" kan: eenheid.', mis: 'N10' }, { t: 'temperatuur', bak: 'nee', w: '"25 temperatuur" kan niet.', fout: '"25 temperatuur" zeg je niet. Wel 25 graden.', mis: 'N10' },
          { t: 'gram', bak: 'ja', w: '25 gram.', fout: '"25 gram" kan: eenheid.', mis: 'N10' }, { t: 'lengte', bak: 'nee', w: '"25 lengte" kan niet.', fout: '"25 lengte" kan niet: grootheid.', mis: 'N10' },
          { t: 'minuut', bak: 'ja', w: '25 minuten.', fout: '"25 minuten" kan: eenheid.', mis: 'N10' }, { t: 'massa', bak: 'nee', w: '"25 massa" kan niet.', fout: '"25 massa" kan niet: grootheid.', mis: 'N10' }] })],
         [uitleg('Nog een manier: drie vragen. <b>Wat</b> meet je? De grootheid. <b>In welke maat</b>? De eenheid. <b>Hoeveel</b>? De meetwaarde.', '52 kg<small>hoeveel? 52 = meetwaarde · in welke maat? kg = eenheid · wat? massa = grootheid</small>')]],
        [uitleg('Elke grootheid heeft eigen eenheden. Tijd: seconden, minuten, uren, dagen. Lengte: mm, cm, m, km. Een tijd kun je nooit in meters uitdrukken. Daarom is de eenheid ook een controle: staat er kg, dan ging het om massa.', 'grootheid → eigen eenheden')]),
      toon('Vetgedrukt = uit je hoofd. Maak de drie definities af.', 'gatentekst', { term: 'Meten', zin: 'Een grootheid is een [eigenschap] die je kunt meten. Een eenheid is de [maat] waarin je iets uitdrukt. De meetwaarde is het [getal].', extra: ['apparaat', 'woord', 'kilogram'], fout: { apparaat: 'Een apparaat om te meten heet een meetinstrument.', kilogram: 'Kilogram is een voorbeeld van een eenheid, geen definitie.' }, mis: { kilogram: 'N10' } }),
      snap('g-instrument', 'Snap je waarom je <b>meet</b> en welk <b>meetinstrument</b> je pakt?',
        [[Q('Met welk meetinstrument meet je massa, en in welke eenheid?', 'weegschaal, in kilogram', [['liniaal, in centimeter', 'Een liniaal meet lengte.'], ['weegschaal, in liter', 'Liter is een eenheid van volume.', 'N10'], ['maatcilinder, in gram', 'Een maatcilinder meet volume.']], 'Massa: weegschaal, gram of kilogram.')],
          [Q('Je ziet dat een elastiekje langer wordt als je er een blokje aan hangt. Waarom ga je dan nog meten?', 'Met je ogen zie je niet nauwkeurig hoevéél langer', [['Kijken mag niet', 'Kijken mag altijd, maar het is niet nauwkeurig.'], ['Meten is sneller', 'Het gaat om nauwkeurig, niet om snel.'], ['Ogen liegen altijd', 'Ze zijn niet nauwkeurig, maar liegen niet.']], 'Zintuigen zijn niet nauwkeurig: daarom een meetinstrument.')]],
        [[toon('Andere manier: koppel het meetinstrument aan wat het meet.', 'sorteer', { bakken: [{ id: 'l', naam: 'Lengte' }, { id: 'm', naam: 'Massa' }, { id: 't', naam: 'Tijd' }], kaarten: [
          { t: 'liniaal', bak: 'l', w: 'Meet lengte in cm.', fout: 'Een liniaal meet lengte.' }, { t: 'weegschaal', bak: 'm', w: 'Meet massa.', fout: 'Een weegschaal meet massa.' }, { t: 'stopwatch', bak: 't', w: 'Meet tijd in seconden.', fout: 'Een stopwatch meet tijd.' },
          { t: 'meetlint', bak: 'l', w: 'Meet lengte in m.', fout: 'Een meetlint meet lengte.' }, { t: 'keukenweegschaal', bak: 'm', w: 'Meet massa in gram.', fout: 'Ook dit meet massa.' }, { t: 'klok', bak: 't', w: 'Meet tijd.', fout: 'Een klok meet tijd.' }] })],
         [uitleg('Nog een manier: je zintuigen zeggen <b>dát</b> iets verandert, een meetinstrument zegt <b>hoeveel</b>. Je voelt dat het water warm is, de thermometer zegt 37 °C.', 'zintuig: dát · meetinstrument: hoeveel')]],
        [uitleg('Een meetinstrument is gereedschap om te meten. Elk instrument meet één grootheid, en toont het in een eenheid. Een weegschaal meet massa in kg; een maatcilinder volume in mL.', 'meetinstrument = gereedschap om te meten')]),
      kaart('Meten', NK.obj.meetlint(), '25 meter: 25 = meetwaarde, meter = eenheid, lengte = grootheid.', ['Grootheid: eigenschap die je kunt meten.', 'Eenheid: de maat, altijd achter het getal.', 'Meetwaarde: het getal.', '25-test: "25 meter" kan, "25 lengte" niet.']),
      baas('De Verwisselaar', BAAS.verwisselaar, 'Grootheid en eenheid zijn hetzelfde: "25 lengte" kan prima.', 'De Verwisselaar gooit grootheid en eenheid door elkaar. Zet hem recht. Fout kost jou niks.', [
        Q('Wat is de eenheid in "3 uur"?', 'uur', [['tijd', 'Tijd is de grootheid.', 'N10'], ['3', '3 is de meetwaarde.']], 'Uur staat achter het getal.'),
        Q('Wat is de grootheid in "250 mL"?', 'volume', [['mL', 'mL is de eenheid.', 'N10'], ['250', 'Dat is de meetwaarde.']], 'mL is een maat voor volume.'),
        Q('Welke zin is goed?', 'De kast is 2 meter hoog', [['De kast is 2 lengte hoog', 'Lengte is een grootheid.', 'N10'], ['De kast is 2 hoog', 'Er mist een eenheid.', 'N11']], 'Getal + eenheid.'),
        Q('Wat is een meetwaarde?', 'het getal dat je bij de meting bepaalt', [['de maat waarin je iets uitdrukt', 'Dat is een eenheid.', 'N10'], ['de eigenschap die je meet', 'Dat is een grootheid.', 'N10']], 'Het getal.'),
        Q('Welke is een grootheid?', 'temperatuur', [['graden Celsius', 'Dat is een eenheid.', 'N10'], ['kilogram', 'Dat is een eenheid.', 'N10']], 'Temperatuur meet je.'),
        Q('"Ik weeg 52." Wat is er fout?', 'De eenheid mist', [['Er is niks fout', 'Zonder eenheid weet je niet hoe groot het is.', 'N11'], ['52 moet een grootheid zijn', '52 is de meetwaarde.', 'N10']], 'Zeg: 52 kg.'),
        Q('Welke eenheid hoort bij lengte?', 'centimeter', [['seconde', 'Seconde hoort bij tijd.'], ['liter', 'Liter hoort bij volume.']], 'mm, cm, m, km.'),
        Q('Wat meet je met een maatcilinder?', 'volume', [['massa', 'Massa meet je met een weegschaal.'], ['lengte', 'Lengte meet je met een liniaal.']], 'Volume, in mL.'),
      ]),
    ] },
];

/* =========================================================================
   H2 STOFFEN: massa, volume, dichtheid, drijven, omrekenen
   ========================================================================= */
const TABEL = [['alcohol', .80], ['aluminium', 2.7], ['glas', 2.6], ['goud', 19.3], ['ijs', .92], ['ijzer', 7.9], ['koper', 8.96], ['lood', 11.3], ['messing', 8.5], ['staal', 7.8], ['zilver', 10.5], ['zink', 7.2], ['water', 1.0], ['vurenhout', .58]];
const VW = {
  kurk: { naam: 'Een kurk', m: 12, V: 50, beeld: NK.obj.kurk() },
  muntje: { naam: 'Een muntje', m: 7.5, V: .84, beeld: NK.obj.munt(), w: 'Klein en licht, en toch zinkt hij: het gaat om de dichtheid.' },
  tanker: { naam: 'Een olietanker', m: 60000, V: 100000, beeld: `<g filter="url(#nk-schaduw)"><path d="M6 58 H94 L84 80 H16Z" fill="url(#nk-rood)"/><path d="M6 58 H94 L92 63 H8Z" fill="#2E3440"/><rect x="62" y="36" width="22" height="22" rx="2" fill="url(#nk-pak)"/><rect x="66" y="40" width="14" height="6" rx="1" fill="url(#nk-vizier)"/><rect x="70" y="24" width="6" height="12" fill="#2E3440"/></g>`, w: 'Massa in ton en volume in m³ geeft hetzelfde getal als g en cm³. De boot is van staal, maar zit vol lucht: gemiddeld 0,6 g/cm³.' },
  ijs: { naam: 'Een ijsblok', m: 46, V: 50, beeld: NK.obj.ijsblok() },
  appel: { naam: 'Een appel', m: 170, V: 200, beeld: NK.obj.appel() },
  ring: { naam: 'Een gouden ring', m: 3.86, V: .2, beeld: NK.obj.ring() },
  vis: { naam: 'Een vis', m: 100, V: 100, beeld: `<g filter="url(#nk-schaduw)"><path d="M14 50 L2 36 L5 50 L2 64Z" fill="#E07A3A"/><path d="M10 50 C24 30 60 28 80 40 C88 45 92 48 94 50 C92 52 88 55 80 60 C60 72 24 70 10 50Z" fill="url(#nk-plastic)"/><path d="M28 56 C46 62 64 60 80 54" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/></g>` + NK.oog(80, 47, 4, { lid: '#5DB4EA' }) },
  hout: { naam: 'Een blokje vurenhout', m: 29, V: 50, beeld: NK.obj.houtblok() },
  steen: { naam: 'Een steen', m: 135, V: 50, beeld: NK.obj.steen() },
};
const H2 = [
  { id: 'massa-gewicht', titel: 'Massa en gewicht', sub: '§2.3 · kilogram en newton', bol: ob(NK.obj.astronaut()), orgs: ['astronaut'],
    stappen: [
      toon('Mensen zeggen "ik weeg 60 kilo". Maar in de natuurkunde zijn <b>massa</b> en <b>gewicht</b> twee verschillende dingen. We reizen met een astronaut naar de maan.', 'maanweger', {
        massa: 60, inzet: { vraag: 'Een astronaut heeft op aarde 60 kg massa. Hoeveel massa heeft ze op de maan?', keuzes: [{ t: 'nog steeds 60 kg', goed: true }, { t: 'ongeveer 10 kg', mis: 'N13' }, { t: '0 kg, ze zweeft', mis: 'N13' }] },
        verklaar: { vraag: 'Waarom blijft haar massa gelijk?', opties: [
          { t: 'Er is niets van haar af gegaan: massa is de hoeveelheid stof', goed: true },
          { t: 'De maan trekt minder, dus is er minder stof', fout: 'De maan trekt minder hard: dan verandert het gewicht, niet de hoeveelheid stof.', mis: 'N12' },
          { t: 'Op de maan meet je massa in newton', fout: 'Massa is altijd in kg. Gewicht is in newton.', mis: 'N14' }], w: 'Massa (kg) = hoeveel stof. Gewicht (N) = hoe hard je drukt.' } }, { hint: 'Voorspel en reis naar alle drie de plekken.' }),
      snap('mg-verschil', 'Snap je het verschil tussen <b>massa</b> en <b>gewicht</b>?',
        [[Q('Storm neemt haar voetbal mee naar Mars. Wat gebeurt er met de massa van de bal?', 'die blijft hetzelfde', [['kleiner, want Mars trekt minder hard', 'Mars trekt minder hard: dat verandert het gewicht (newton), niet de massa.', 'N13'], ['groter', 'Er komt geen leer of lucht bij.'], ['nul', 'De bal is er nog helemaal.', 'N13']], 'Massa = hoeveelheid stof, overal gelijk.')],
          [Q('In welke eenheid meet je gewicht?', 'newton (N)', [['kilogram (kg)', 'Kilogram is de eenheid van massa. Gewicht is een kracht: newton.', 'N14'], ['gram (g)', 'Ook gram is massa.', 'N14'], ['liter (L)', 'Liter is volume.']], 'Gewicht is een kracht, in newton.')]],
        [[uitleg('Andere manier: een <b>rugzak</b>. Op de maan zit er precies evenveel in (zelfde <b>massa</b>), maar hij drukt veel minder hard op je schouders (kleiner <b>gewicht</b>). Hij voelt lichter, maar er is niets uit gehaald.', 'zelfde inhoud = zelfde massa<br>drukt minder hard = kleiner gewicht')],
         [uitleg('Nog een manier: twee meetinstrumenten. Een <b>balans</b> vergelijkt twee massa’s: een zak suiker van 1 kg tegen een gewichtje van 1 kg is op de maan nog steeds in evenwicht, want beide drukken zes keer minder hard. Een <b>weegschaal</b> meet hoe hard je drukt en zou op de maan maar 10 kg aangeven. Die meet dus eigenlijk gewicht.', 'balans: massa, overal gelijk<br>weegschaal: hoe hard je drukt')]],
        [uitleg('Gewicht ontstaat doordat de aarde (of de maan) aan je trekt. De maan is veel kleiner en trekt zes keer minder hard. Daarom is je gewicht daar zes keer zo klein, en kun je er zo hoog springen. Op aarde hoort bij 1 kg ongeveer 10 N.', 'aarde: 1 kg ≈ 10 N<br>maan: 1 kg ≈ 1,6 N')]),
      toon('Sorteer: gaat dit over <b>massa</b> of over <b>gewicht</b>?', 'sorteer', {
        bakken: [{ id: 'm', naam: 'Massa', sub: 'kg, hoeveel stof' }, { id: 'g', naam: 'Gewicht', sub: 'N, hoe hard je drukt' }],
        kaarten: [
          { t: '60 kg', bak: 'm', w: 'Kilogram = massa.', fout: 'kg is de eenheid van massa.', mis: 'N14' },
          { t: '600 N', bak: 'g', w: 'Newton = gewicht.', fout: 'N is de eenheid van gewicht.', mis: 'N14' },
          { t: 'de hoeveelheid stof', bak: 'm', w: 'Dat is massa.', fout: 'Hoeveelheid stof = massa.', mis: 'N12' },
          { t: 'de kracht op de ondergrond', bak: 'g', w: 'Dat is gewicht.', fout: 'Een kracht = gewicht.', mis: 'N12' },
          { t: 'wordt kleiner op de maan', bak: 'g', w: 'Gewicht hangt af van waar je bent.', fout: 'Massa verandert niet; gewicht wel.', mis: 'N13' },
          { t: 'overal even groot', bak: 'm', w: 'Massa blijft overal gelijk.', fout: 'Gewicht verandert; massa blijft.', mis: 'N13' },
        ], na: '<b>Massa</b> in kg blijft overal gelijk. <b>Gewicht</b> in N hangt af van waar je bent.' }),
      snap('mg-reken', 'Snap je hoe je van <b>massa</b> naar <b>gewicht</b> gaat?',
        [[Q('Op aarde hoort bij 1 kg ongeveer 10 N. Wat is het gewicht van een tas van 5 kg?', '50 N', [['5 N', 'Per kg is het ongeveer 10 N: 5 × 10.'], ['0,5 N', 'Je deelde. Het is 5 × 10.'], ['5 kg', 'Dat is de massa. Gewicht is in newton.', 'N14']], '5 × 10 = 50 N.')],
          [Q('Op de maan is je gewicht ongeveer zes keer zo klein. Een astronaut weegt op aarde 600 N. Op de maan?', 'ongeveer 100 N', [['600 N', 'Dan zou de maan even hard trekken als de aarde.'], ['3600 N', 'Zes keer zo klein, niet zes keer zo groot.'], ['10 kg', 'Haar massa blijft 60 kg. En gewicht is in N.', 'N13']], '600 : 6 = 100 N.')]],
        [[uitleg('Andere manier: een rijtje. Op aarde: <b>1 kg → 10 N</b>, 2 kg → 20 N, 5 kg → 50 N, 60 kg → 600 N. Elke kilogram drukt met 10 N.', '1 kg → 10 N<br>5 kg → 50 N<br>60 kg → 600 N<small>op de maan: 6 keer minder</small>')],
         [toon('Nog een manier: kijk zelf naar de weegschaal onder de astronaut.', 'maanweger', { massa: 50 }, { hint: 'Tik op de maan en op Mars.' })]],
        [uitleg('Op Mars trekt het ongeveer 3,7 N per kg. Dezelfde astronaut van 60 kg drukt daar met 222 N. Haar massa: nog steeds 60 kg. Het enige wat verandert is hoe hard de planeet trekt.', '60 kg op Mars: 60 × 3,7 = 222 N')]),
      kaart('Massa en gewicht', NK.obj.astronaut(), 'Massa (kg) = hoeveel stof, overal gelijk. Gewicht (N) = hoe hard je drukt, hangt af van de plek.', ['Op aarde: 1 kg ≈ 10 N.', 'Op de maan is je gewicht ongeveer 6 keer zo klein.', 'Een balans meet massa, een weegschaal eigenlijk hoe hard je drukt.']),
      baas('De Maanlichte', BAAS.maanlicht, 'Op de maan ben je lichter, dus heb je minder massa.', 'De Maanlichte zweeft rond en denkt dat er op de maan stof van je af gaat. Versla hem. Fout kost jou niks.', [
        Q('Wat is massa?', 'de hoeveelheid stof in een voorwerp', [['de kracht waarmee je op de grond drukt', 'Dat is gewicht.', 'N12'], ['hoe groot iets is', 'Dat is volume.']], 'In kg of g.'),
        Q('Wat is gewicht?', 'de kracht waarmee een voorwerp op de ondergrond drukt', [['de hoeveelheid stof', 'Dat is massa.', 'N12'], ['hoe zwaar iets in kg is', 'Kg is massa. Gewicht is in newton.', 'N14']], 'In newton.'),
        Q('Een astronaut van 70 kg op de maan. Massa?', '70 kg', [['ongeveer 12 kg', 'Dat zou een zesde zijn. Massa verandert niet.', 'N13'], ['0 kg', 'Ze is er nog helemaal.', 'N13']], 'Massa blijft.'),
        Q('Gewicht van 3 kg op aarde?', 'ongeveer 30 N', [['3 N', 'Per kg ongeveer 10 N.'], ['30 kg', 'Gewicht is in N, niet in kg.', 'N14']], '3 × 10.'),
        Q('Waar is je gewicht het kleinst?', 'op de maan', [['op aarde', 'De aarde trekt het hardst van deze drie.'], ['overal gelijk', 'Gewicht hangt af van de plek. Massa niet.', 'N12']], 'De maan trekt zes keer minder hard.'),
        Q('"Ik weeg 52 kilo." Wat bedoel je natuurkundig?', 'Mijn massa is 52 kg', [['Mijn gewicht is 52 kg', 'Gewicht is in newton.', 'N14'], ['Mijn gewicht is 52 N', 'Dat zou heel licht zijn: 52 kg geeft ongeveer 520 N.']], 'Dagelijks "wegen" = massa.'),
        Q('Welke eenheid hoort bij gewicht?', 'newton', [['kilogram', 'Dat is massa.', 'N14'], ['liter', 'Dat is volume.']], 'Newton.'),
        Q('Je neemt een zak chips mee naar Mars. Wat verandert?', 'alleen het gewicht', [['alleen de massa', 'Massa blijft gelijk.', 'N13'], ['allebei', 'Er gaat geen chips verloren: alleen het gewicht verandert.', 'N12']], 'Gewicht hangt af van de planeet.'),
      ]),
    ] },

  { id: 'volume', titel: 'Volume meten en berekenen', sub: '§2.3 · maatcilinder, blok, cilinder, onderdompelen', bol: ob(NK.obj.maatcilinder()), orgs: ['maatcilinder'],
    stappen: [
      toon('Volume van een vloeistof meet je met een <b>maatcilinder</b>. Twee dingen zijn lastig: hoeveel is één streepje, en waar kijk je? Lees zelf af.', 'aflezen', { instrument: 'maatcilinder', rondes: 2, eenheid: 'mL', misMeniscus: 'N16', misStreepje: 'N17' }, { hint: 'Maak beide metingen af.' }),
      snap('vo-aflezen', 'Snap je hoe je een maatcilinder <b>afleest</b>?',
        [[Q('Tussen 10 en 20 mL zitten 5 stapjes. Hoeveel is één streepje?', '2 mL', [['1 mL', 'Dan zouden er 10 stapjes zitten.', 'N17'], ['5 mL', 'Er zitten 5 stapjes, dus 10 : 5.', 'N17'], ['10 mL', 'Dat is van getal tot getal.', 'N17']], '10 : 5 = 2 mL per streepje.')],
          [Q('Je kijkt van boven schuin op de maatcilinder. Wat gebeurt er?', 'Je leest een verkeerde (te hoge) waarde af', [['Niks, van boven zie je het best', 'Van boven kijk je schuin langs de schaal en lees je te hoog af.', 'N16'], ['Je leest altijd 1 mL te weinig af', 'Hoeveel het scheelt hangt af van hoe schuin.'], ['Het water zakt', 'Het water blijft staan; alleen je blik is scheef.']], 'Op ooghoogte, bij het vlakke deel.')]],
        [[uitleg('Andere manier: tel de <b>ruimtes</b>, niet de streepjes. Van 10 naar 20 zijn het 5 sprongetjes: 10 : 5 = 2 per sprongetje. Net als bij een liniaal: daar zijn het er 10 per cm, dus 1 mm per streepje.', '10 → 20 in 5 sprongen<br>één sprong = 2 mL')],
         [toon('Nog een manier: doe nog een meting, rustig.', 'aflezen', { instrument: 'maatcilinder', rondes: 1, eenheid: 'mL', misMeniscus: 'N16', misStreepje: 'N17' })]],
        [uitleg('Waarom het vlakke deel? Water kruipt een beetje langs het glas omhoog: de rand wordt hol. Het echte niveau is het vlakke midden. En op ooghoogte, omdat de schaal vóór de vloeistof zit: kijk je schuin, dan zie je het niveau bij een ander streepje.', 'vlakke deel + ooghoogte')]),
      toon('Nu een rechthoekig voorwerp. Volume = hoeveel blokjes van 1 cm³ erin passen. Voorspel eerst.', 'blokbouwer', { modus: 'blok', start: [4, 3, 2],
        inzet: { vraag: 'Hoeveel blokjes van 1 cm³ passen in een doos van 4 × 3 × 2 cm?', keuzes: [{ t: '24', goed: true }, { t: '9', mis: null }, { t: '12' }] },
        doel: { V: 30, h: 2 } }, { hint: 'Vul de doos en bouw dan een blok van 30 cm³.' }),
      toon('En een <b>cilinder</b>, zoals een blikje? Ook stapels: alleen is het grondvlak een cirkel. Let op de straal.', 'blokbouwer', { modus: 'cilinder', d: 6, hoogte: 10, misDiameter: 'N15' }),
      toon('Een steen heeft een rare vorm: die kun je niet meten met een liniaal. Dan de <b>onderdompelmethode</b>.', 'aflezen', { instrument: 'maatcilinder', rondes: 1, dompel: true, eenheid: 'mL', misMeniscus: 'N16', misStreepje: 'N17', misDompel: 'N18', cilinders: [{ max: 100, groot: 10, k: 5 }, { max: 50, groot: 10, k: 5 }, { max: 100, groot: 20, k: 4 }] }),
      snap('vo-reken', 'Snap je hoe je een <b>volume berekent</b>?',
        [[Q('Een doos is 5,0 cm lang, 3,0 cm breed en 4,0 cm hoog. Volume?', '60 cm³', [['12 cm³', 'Je telde op (5 + 3 + 4). Volume is vermenigvuldigen.'], ['20 cm³', 'Dat is maar één vlak (5 × 4). Keer de derde zijde.'], ['60 cm²', 'cm² is oppervlakte. Volume is in cm³.']], 'l × b × h = 5,0 × 3,0 × 4,0 = 60 cm³.')],
          [Q('Een kaars is een cilinder: 4 cm breed (diameter) en 10 cm hoog. Welke berekening klopt?', '3,14 × 2 × 2 × 10', [['3,14 × 4 × 4 × 10', 'Dat is met de diameter: 4 keer te groot.', 'N15'], ['4 × 4 × 10', 'Je vergat π en gebruikte de diameter.', 'N15'], ['3,14 × 4 × 10', 'Het is straal × straal, en de straal is 2.', 'N15']], 'π × r × r × h, met r = 2 cm.')],
          [Q('Beginstand 52 mL, eindstand 78 mL. Volume van de schroef?', '26 cm³', [['78 cm³', 'Dat is water + schroef.', 'N18'], ['130 cm³', 'Optellen telt het water dubbel.', 'N18'], ['52 cm³', 'Dat is alleen het water.', 'N18']], '78 − 52 = 26 cm³ (1 mL = 1 cm³).')]],
        [[uitleg('Andere manier: <b>laag voor laag</b>. Eén laag van 4 × 3 = 12 blokjes. Twee lagen: 24. Daarom l × b × h: de bodem (l × b) keer het aantal lagen (h). Bij een cilinder net zo: de cirkel (π × r × r) keer de hoogte.', 'bodem × hoogte<small>blok: l × b × h · cilinder: π × r × r × h</small>')],
         [toon('Nog een manier: reken nog een blikje uit, stap voor stap.', 'blokbouwer', { modus: 'cilinder', d: 8, hoogte: 5, misDiameter: 'N15' })]],
        [uitleg('Waarom eerst de beginstand, en niet de steen eruit halen en dan meten? Omdat er water aan de steen blijft hangen: dan klopt het water van "eerst" niet meer. Drijft het voorwerp, zoals hout? Duw het met een dunne naald helemaal onder water.', 'volume = eindstand − beginstand')]),
      kaart('Volume', NK.obj.maatcilinder(), 'Blok: l × b × h. Cilinder: π × r × r × h. Rare vorm: eindstand − beginstand.', ['Aflezen: op ooghoogte, het vlakke deel.', 'Eerst tellen: hoeveel is één streepje?', 'Straal = halve diameter.', '1 mL = 1 cm³.']),
      baas('De Diameterdief', BAAS.diameter, 'De straal en de diameter zijn hetzelfde, en het volume van de steen is gewoon de eindstand.', 'De Diameterdief steelt de helft van je straal. Pak hem! Fout kost jou niks.', [
        Q('Een blikje is 8 cm breed. Wat is de straal?', '4 cm', [['8 cm', 'Dat is de diameter.', 'N15'], ['16 cm', 'De straal is kleiner: de helft.', 'N15']], 'Straal = diameter : 2.'),
        Q('Je rekent met de diameter in plaats van de straal. Hoe groot wordt je volume?', '4 keer te groot', [['2 keer te groot', 'Je gebruikt hem twee keer (r × r), dus 2 × 2 = 4.', 'N15'], ['precies goed', 'Nee: de diameter is twee keer zo groot als de straal.', 'N15']], 'r × r wordt 2r × 2r = 4 × zo groot.'),
        Q('Volume van een blok van 2 × 3 × 5 cm?', '30 cm³', [['10 cm³', 'Je telde op.'], ['30 cm²', 'Volume is in cm³.']], '2 × 3 × 5.'),
        Q('Beginstand 40 mL, eindstand 55 mL. Volume van het voorwerp?', '15 cm³', [['55 cm³', 'Dat is water + voorwerp.', 'N18'], ['95 cm³', 'Niet optellen: aftrekken.', 'N18']], '55 − 40.'),
        Q('Waar lees je een maatcilinder af?', 'op ooghoogte, bij het vlakke deel', [['bij de rand die omhoog kruipt', 'Daar is het water hoger dan het echte niveau.', 'N16'], ['van bovenaf', 'Dan kijk je schuin.', 'N16']], 'Ooghoogte, vlakke deel.'),
        Q('Tussen 0 en 50 mL zitten 10 stapjes. Eén streepje?', '5 mL', [['1 mL', 'Dan waren het 50 stapjes.', 'N17'], ['10 mL', '50 : 10 = 5.', 'N17']], '50 : 10 = 5 mL.'),
        Q('1 mL is gelijk aan ...', '1 cm³', [['1 dm³', '1 dm³ = 1 L.', 'N24'], ['10 cm³', 'Precies 1 cm³.', 'N24']], 'mL = cm³.'),
        Q('Volume van een cilinder met r = 3 cm en h = 10 cm? (π ≈ 3,14)', '282,6 cm³', [['94,2 cm³', 'Je vergat één keer de straal: 3,14 × 3 × 3 × 10.'], ['1130,4 cm³', 'Dat is met de diameter (6): 4 keer te groot.', 'N15']], '3,14 × 3 × 3 × 10.'),
      ]),
    ] },

  { id: 'dichtheid', titel: 'Dichtheid: gram per blokje', sub: '§2.4 · dichtheid en stofeigenschap', bol: ob(NK.obj.blokje()), orgs: ['blokje'],
    stappen: [
      toon('"Aluminium is een lichte stof." Hoe weet je dat eigenlijk? Kijk naar dit fietsframe en dit stuur, en voorspel.', 'poe', {
        beeld: SC.fietsVoor, beeldNa: SC.fietsNa, vraag: 'Het aluminium frame weegt 1500 g, het stalen stuur 600 g. Is aluminium dus zwaarder dan staal?',
        keuzes: [{ t: 'dat kun je zo niet zeggen', goed: true }, { t: 'ja, aluminium is zwaarder', mis: 'N19' }, { t: 'ja, want het frame is groter', mis: 'N19' }],
        uitleg: 'Het frame is veel groter: er zit meer stof in. <b>Eerlijk vergelijken</b> doe je met blokjes van precies <b>1 cm³</b>: aluminium 2,7 g, staal 7,8 g. Aluminium is ongeveer drie keer zo licht.',
        verklaar: { vraag: 'Waarom vergelijk je blokjes van precies 1 cm³?', opties: [
          { t: 'Dan heb je van elke stof evenveel ruimte: een eerlijke vergelijking', goed: true },
          { t: 'Omdat kleine blokjes makkelijker te wegen zijn', fout: 'Het gaat om eerlijk: evenveel volume van elke stof.' },
          { t: 'Omdat grote voorwerpen altijd een grote dichtheid hebben', fout: 'Groot of klein maakt voor de dichtheid niet uit.', mis: 'N19' }], w: 'De massa van 1 cm³ heet de dichtheid.' } }),
      toon('Je hebt niet per se een blokje van 1 cm³ nodig: je kunt een groter blok <b>in gedachten verdelen</b>. Hier een staafje messing.', 'blokjeslab', { blok: { l: 2, b: 2, h: 1, m: 34 }, tabel: TABEL,
        kleur: { top: '#FFF2AE', links: 'url(#nk-goud)', rechts: '#9A6A08', rand: '#6E4A00' },
        inzet: { vraag: 'Je zaagt het staafje doormidden. Wat wordt de dichtheid van één helft?', keuzes: [{ t: 'blijft 8,5 g/cm³', goed: true }, { t: 'de helft: 4,25 g/cm³', mis: 'N20' }, { t: 'het dubbele', mis: 'N20' }] } }),
      snap('d-per', 'Snap je wat <b>dichtheid</b> is, en waarom hij niet verandert als je zaagt?',
        [[Q('Een blokje van 5 cm³ heeft een massa van 40 g. Wat is de dichtheid?', '8 g/cm³', [['200 g/cm³', 'Je vermenigvuldigde. Dichtheid = massa : volume.'], ['0,125 g/cm³', 'Andersom gedeeld: massa : volume.'], ['40 g/cm³', 'Dat is de massa van het hele blok, niet van 1 cm³.']], '40 : 5 = 8 g per cm³.')],
          [Q('Je zaagt een blok ijzer (7,9 g/cm³) in drie stukken. Dichtheid van één stuk?', '7,9 g/cm³', [['2,6 g/cm³', 'Massa én volume worden een derde, dus de dichtheid blijft.', 'N20'], ['23,7 g/cm³', 'Je verdeelt het blok, niet de stof.', 'N20'], ['dat kun je niet weten', 'Het is nog steeds ijzer: 7,9 g/cm³.']], 'Dichtheid is een stofeigenschap.')]],
        [[uitleg('Andere manier: het woord <b>per</b>. In een zak zitten 10 dezelfde snoepjes, samen 50 g: 5 g <b>per</b> snoepje. Een zak met 20 van die snoepjes weegt 100 g, maar per snoepje blijft het 5 g. Dichtheid is gram <b>per</b> cm³: hoe groot je blok ook is, elk blokje van 1 cm³ weegt hetzelfde.', '50 g : 10 = 5 g per snoepje<br>100 g : 20 = 5 g per snoepje')],
         [toon('Nog een manier: verdeel zelf een blok aluminium.', 'blokjeslab', { blok: { l: 2, b: 2, h: 2, m: 21.6 }, tabel: TABEL })]],
        [uitleg('Waarom is dichtheid een <b>stofeigenschap</b>? Massa en volume kun je veranderen door meer of minder stof te nemen. Maar elk blokje aluminium van 1 cm³ heeft <b>altijd</b> 2,7 g. Daaraan herken je de stof, net zoals aan kleur of geur.', 'massa en volume: hangt af van hoeveel<br>dichtheid: hoort bij de stof')]),
      snap('d-reken', 'Snap je hoe je met dichtheid <b>een stof herkent</b>?',
        [[Q('Een blokje meet 4,0 × 4,0 × 4,0 cm en heeft een massa van 723 g. Welke stof? (lood 11,3 · zilver 10,5 · staal 7,8)', 'lood', [['zilver', 'Reken uit: 4 × 4 × 4 = 64 cm³. 723 : 64 = 11,3.'], ['staal', '723 : 64 = 11,3 g/cm³: dat is lood.'], ['dat kan niet zonder het te zien', 'Juist met de dichtheid kun je het herkennen.']], 'V = 64 cm³, ρ = 723 : 64 = 11,3 g/cm³: lood.')],
          [Q('Een boomstam: 13,65 kg en 21 dm³. Wat doe je eerst?', 'omrekenen naar gram en cm³', [['meteen 13,65 : 21', 'Dan krijg je kg per dm³. Reken eerst om naar g en cm³.', 'N25'], ['21 : 13,65', 'Andersom gedeeld, en niet omgerekend.', 'N25'], ['het volume keer de massa', 'Dichtheid is delen.']], '13 650 g : 21 000 cm³ = 0,65 g/cm³.')]],
        [[uitleg('Andere manier: de vaste rekenvorm. <b>Gegevens</b>: m = 723 g, V = 4,0 × 4,0 × 4,0 = 64 cm³. <b>Gevraagd</b>: ρ. <b>Uitwerking</b>: ρ = m : V = 723 : 64 = 11,3 g/cm³. Dan in de tabel: lood.', 'gegevens → gevraagd → uitwerking<small>ρ = m : V, met de eenheid erachter</small>')],
         [toon('Nog een manier: maak de definitie zelf af. Dit is vetgedrukt in je lijst.', 'gatentekst', { term: 'Dichtheid', zin: 'De [massa] van 1 [cm³] van een stof.', extra: ['volume', 'gewicht', 'liter'], fout: { volume: 'Het volume is juist vast: 1 cm³. Wat weeg je?', gewicht: 'Gewicht is in newton. Hier gaat het om massa in gram.', liter: 'Het gaat om 1 cm³.' }, mis: { gewicht: 'N12' } })]],
        [uitleg('Gram per cm³ werkt alleen als je massa in <b>g</b> en volume in <b>cm³</b> hebt. Staat er kg of dm³ (of L), reken dan eerst om. 1 kg = 1000 g, 1 dm³ = 1000 cm³.', 'eerst omrekenen, dan delen')], 2),
      kaart('Dichtheid', NK.obj.blokje(), 'Dichtheid = de massa van 1 cm³ van een stof. ρ = m : V, in g/cm³.', ['Zagen verandert de dichtheid niet: stofeigenschap.', 'Eerlijk vergelijken: blokjes van 1 cm³.', 'Massa in g, volume in cm³: anders eerst omrekenen.', 'Met de tabel herken je de stof.']),
      baas('Groot-Is-Dicht', BAAS.grootdicht, 'Een groot voorwerp heeft een grote dichtheid, en een half blok een halve.', 'Groot-Is-Dicht denkt dat groter ook dichter is. Laat zien dat het om gram per cm³ gaat. Fout kost jou niks.', [
        Q('Een grote en een kleine gouden munt. Welke heeft de grootste dichtheid?', 'ze zijn gelijk', [['de grote', 'Groter is meer goud, maar per cm³ is het hetzelfde.', 'N19'], ['de kleine', 'Allebei goud: 19,3 g/cm³.', 'N19']], 'Zelfde stof, zelfde dichtheid.'),
        Q('Dichtheid van 30 g en 10 cm³?', '3 g/cm³', [['300 g/cm³', 'Delen, niet vermenigvuldigen.'], ['0,33 g/cm³', 'Massa : volume, niet andersom.']], '30 : 10.'),
        Q('Je halveert een blok staal. De dichtheid ...', 'blijft 7,8 g/cm³', [['wordt 3,9 g/cm³', 'Massa en volume halveren allebei.', 'N20'], ['wordt 15,6 g/cm³', 'Hij blijft gelijk.', 'N20']], 'Stofeigenschap.'),
        Q('Wat is de dichtheid van een stof?', 'de massa van 1 cm³ van die stof', [['de massa van het voorwerp', 'Dat hangt af van hoe groot het is.', 'N19'], ['het volume van 1 g', 'Andersom: gram per cm³.']], 'Gram per cm³.'),
        Q('Waarom is dichtheid een stofeigenschap?', 'Hij hoort bij de stof en verandert niet als je meer of minder neemt', [['Omdat hij van de vorm afhangt', 'Vorm maakt niet uit.', 'N19'], ['Omdat zware dingen een grote dichtheid hebben', 'Zwaar zegt niets: een groot blok hout is zwaar maar niet dicht.', 'N19']], 'Je herkent er de stof aan.'),
        Q('Een ring: 26,25 g en 2,5 cm³. Welke stof? (zilver 10,5 · goud 19,3)', 'zilver', [['goud', '26,25 : 2,5 = 10,5: zilver.'], ['dat kan niet', 'Reken het uit: 10,5 g/cm³.']], '26,25 : 2,5 = 10,5.'),
        Q('Een plank: 2 kg en 4 dm³. Wat is de eerste stap?', 'omrekenen: 2000 g en 4000 cm³', [['2 : 4 = 0,5 en klaar', 'Toevallig klopt het getal, maar je moet de eenheden omrekenen naar g en cm³.', 'N25'], ['4 : 2 = 2 g/cm³', 'Andersom gedeeld.']], '2000 : 4000 = 0,5 g/cm³.'),
        Q('Aluminium (2,7) en staal (7,8): welke is "lichter"?', 'aluminium, per cm³', [['staal', 'Per cm³ is staal zwaarder.'], ['dat hangt af van hoe groot', 'Per cm³ vergelijken: aluminium is lichter.', 'N19']], 'Ongeveer 3 keer zo licht.'),
      ]),
    ] },

  { id: 'drijven', titel: 'Drijven, zweven, zinken', sub: '§2.4 · vergelijk met de vloeistof', bol: ob(NK.obj.tanker()), orgs: ['tanker'],
    stappen: [
      toon('In het zwembad drijf je makkelijk. Maar waarom drijft het ene voorwerp en zinkt het andere? Voorspel elke keer, dan zie je het.', 'zinkdrijf', {
        mis: 'N21', rondes: [
          { vloeistof: { naam: 'Water', rho: 1.0, kleur: 'water' }, voorwerpen: [VW.kurk, VW.muntje, VW.tanker, VW.vis, VW.ring] },
          { vloeistof: { naam: 'Alcohol', rho: .8, kleur: 'alcohol' }, voorwerpen: [{ ...VW.ijs, mis: 'N22', w: 'In water drijft ijs, maar alcohol is minder dicht dan ijs!' }, VW.kurk] }],
        verklaar: { vraag: 'Waarom drijft een tanker van staal en zinkt een klein muntje?', opties: [
          { t: 'Het gaat om de dichtheid, niet om hoe zwaar of groot iets is', goed: true },
          { t: 'Grote dingen drijven altijd', fout: 'Een groot rotsblok zinkt. Het gaat om de dichtheid.', mis: 'N19' },
          { t: 'Staal drijft, goud niet', fout: 'Een blok staal zinkt (7,8 g/cm³). De tanker zit vol lucht.', mis: 'N21' }], w: 'Vergelijk de dichtheid van het voorwerp met die van de vloeistof.' } }, { hint: 'Doe alle voorwerpen, ook in alcohol.' }),
      snap('dr-regel', 'Snap je hoe je voorspelt of iets <b>drijft</b>, <b>zweeft</b> of <b>zinkt</b>?',
        [[Q('Een blokje vurenhout heeft een dichtheid van 0,58 g/cm³. Wat doet het in water?', 'drijven', [['zinken, want hout is zwaar', 'Zwaar of licht zegt niets. 0,58 is kleiner dan 1,0.', 'N21'], ['zweven', 'Zweven is precies 1,0.'], ['dat hangt af van hoe groot het blok is', 'Groot of klein maakt niet uit.', 'N19']], '0,58 < 1,0: drijven.')],
          [Q('Een plastic speelgoedje: 30 g en 25 cm³. Wat doet het in water?', 'zinken (1,2 g/cm³)', [['drijven, plastic drijft altijd', 'Reken het uit: 30 : 25 = 1,2. Groter dan 1,0.', 'N21'], ['zweven', 'Dan moest het precies 1,0 zijn.']], '30 : 25 = 1,2 > 1,0: zinkt.')]],
        [[uitleg('Andere manier: <b>twee getallen vergelijken</b>. Links het voorwerp, rechts de vloeistof. <b>Kleiner</b>: het drijft. <b>Groter</b>: het zinkt. <b>Gelijk</b>: het zweeft. Meer hoef je niet te weten.', 'voorwerp < vloeistof → drijft<br>voorwerp > vloeistof → zinkt<br>gelijk → zweeft')],
         [toon('Nog een manier: probeer het zelf nog eens.', 'zinkdrijf', { mis: 'N21', rondes: [{ vloeistof: { naam: 'Water', rho: 1.0, kleur: 'water' }, voorwerpen: [VW.steen, VW.hout, VW.appel] }] })]],
        [uitleg('Waarom drijft een tanker? Hij is van staal (7,8 g/cm³), maar binnenin zit heel veel lucht. Neem je de hele boot samen, dan is de massa gedeeld door het volume kleiner dan 1,0. Daarom zinkt een boot met een gat erin: dan komt er water in plaats van lucht.', 'staal + veel lucht = gemiddeld minder dicht')]),
      snap('dr-vloeistof', 'Snap je dat je moet vergelijken met de <b>vloeistof waar het in zit</b>?',
        [[Q('IJs (0,92 g/cm³) in alcohol (0,80 g/cm³)?', 'het zinkt', [['het drijft, ijs drijft altijd', 'In water wel. Maar alcohol is minder dicht dan ijs.', 'N22'], ['het zweeft', 'Dan moesten ze precies gelijk zijn.']], '0,92 > 0,80: zinkt.')],
          [Q('Een ei (1,05 g/cm³) zinkt in water. Je lost veel zout op: het water wordt 1,1 g/cm³. Wat doet het ei nu?', 'het gaat drijven', [['het zinkt nog steeds', 'Vergelijk opnieuw: 1,05 is nu kleiner dan 1,1.', 'N22'], ['het zweeft', 'Het is niet precies gelijk.']], 'Zout water is dichter: het ei drijft.')]],
        [[toon('Andere manier: kijk wat er gebeurt in zout water.', 'zinkdrijf', { mis: 'N22', rondes: [{ vloeistof: { naam: 'Zout water', rho: 1.1, kleur: 'zout' }, voorwerpen: [{ naam: 'Een ei', m: 63, V: 60, beeld: `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="56" rx="24" ry="30" fill="url(#nk-pak)"/></g><ellipse cx="42" cy="42" rx="7" ry="10" fill="#fff" opacity=".8"/>`, w: 'In gewoon water zou dit ei zinken.' }, VW.vis] }] })],
         [uitleg('Nog een manier: de regel zegt niet "vergelijk met water", maar "vergelijk met <b>de vloeistof</b>". Water is 1,0, alcohol 0,80, zout water meer dan 1,0. Kijk dus altijd eerst: in welke vloeistof zit het?', 'eerst: welke vloeistof?<br>dan: groter of kleiner?')]],
        [uitleg('Daarom drijf je in de Dode Zee bijna vanzelf: dat water is zo zout dat het veel dichter is dan je lichaam. In een zwembad zweef je ongeveer: met lucht in je longen drijf je net, met lege longen zak je langzaam.', 'zout water: alles drijft makkelijker')], 2),
      kaart('Drijven en zinken', NK.obj.tanker(), 'Kleiner dan de vloeistof: drijft. Groter: zinkt. Gelijk: zweeft.', ['Water: 1,0 g/cm³.', 'Zwaar of groot zegt niets.', 'Vergelijk altijd met de vloeistof waar het in zit.']),
      baas('Zwaar-Zinkt', BAAS.zwaarzinkt, 'Wat zwaar is, zinkt. Wat licht is, drijft.', 'Zwaar-Zinkt sleept een anker mee en denkt dat zwaar altijd zinkt. Versla hem met dichtheid. Fout kost jou niks.', [
        Q('Wat doet een voorwerp van 0,7 g/cm³ in water?', 'drijven', [['zinken', '0,7 is kleiner dan 1,0.', 'N21'], ['zweven', 'Niet precies 1,0.']], 'Kleiner: drijft.'),
        Q('Een enorme boomstam van 500 kg (0,65 g/cm³). In water?', 'drijft', [['zinkt, want hij is zwaar', 'Zwaar zegt niets: 0,65 < 1,0.', 'N21'], ['zweeft', 'Niet 1,0.']], 'Dichtheid telt.'),
        Q('Een piepklein loodkorreltje (11,3 g/cm³). In water?', 'zinkt', [['drijft, het is licht', 'Licht zegt niets: 11,3 > 1,0.', 'N21'], ['zweeft', 'Veel groter dan 1,0.']], 'Groter: zinkt.'),
        Q('Wanneer zweeft een voorwerp?', 'als de dichtheid gelijk is aan die van de vloeistof', [['als het heel licht is', 'Licht zegt niets.', 'N21'], ['als het half onder water zit', 'Dat is drijven.']], 'Precies gelijk.'),
        Q('IJs (0,92) in water (1,0)?', 'drijft', [['zinkt', '0,92 < 1,0.'], ['zweeft', 'Niet gelijk.']], 'IJsbergen drijven.'),
        Q('IJs (0,92) in alcohol (0,80)?', 'zinkt', [['drijft, ijs drijft altijd', 'Vergelijk met alcohol: 0,92 > 0,80.', 'N22'], ['zweeft', 'Niet gelijk.']], 'Vergelijk met de vloeistof.'),
        Q('Waarom drijft een olietanker?', 'de hele boot is gemiddeld minder dicht dan water, door alle lucht erin', [['staal drijft', 'Een blok staal zinkt.', 'N21'], ['hij is zo groot', 'Groot zegt niets.', 'N19']], 'Gemiddeld minder dan 1,0.'),
        Q('Een voorwerp van 45 g en 50 cm³ in water?', 'drijft (0,9 g/cm³)', [['zinkt', '45 : 50 = 0,9, kleiner dan 1,0.', 'N21'], ['zweeft', '0,9 is niet 1,0.']], '45 : 50 = 0,9.'),
      ]),
    ] },

  { id: 'omrekenen', titel: 'Eenheden omrekenen', sub: 'formulekaart · × of : 1000', bol: ob(NK.obj.trap()), orgs: ['trap'],
    stappen: [
      toon('Omrekenen is een trap. <b>Omlaag</b> naar een kleinere eenheid: × 1000. <b>Omhoog</b> naar een grotere: : 1000. Kijk hoe de komma hopt.', 'ladder', { mis: 'N23', opgaven: [
        { w: 21, van: 'kg', naar: 'g' }, { w: 7.2, van: 'g', naar: 'kg' }, { w: 4, van: 'L', naar: 'mL', trap: ['L', 'mL'] }, { w: 250, van: 'mA', naar: 'A', trap: ['A', 'mA'] }, { w: 4500, van: 'mV', naar: 'V', trap: ['V', 'mV'] }] }, { hint: 'Doe alle vijf de opgaven.' }),
      snap('o-richting', 'Snap je <b>welke kant</b> je op rekent?',
        [[Q('Hoeveel mA is 0,250 A?', '250 mA', [['0,000250 mA', 'Van A naar mA is naar een kleinere eenheid: het getal wordt groter, × 1000.', 'N23'], ['2,50 mA', 'De komma maar één plaats. Het zijn er drie.'], ['25 mA', 'Twee plaatsen. Het zijn er drie.']], '× 1000: 250 mA.')],
          [Q('Hoeveel L is 540 mL?', '0,54 L', [['540 000 L', 'Van mL naar L is naar een grotere eenheid: het getal wordt kleiner.', 'N23'], ['5,4 L', 'Komma maar twee plaatsen.'], ['54 L', 'Eén plaats. Het zijn er drie.']], ': 1000 = 0,54 L.')]],
        [[uitleg('Andere manier: <b>geld</b>. 1 euro = 100 cent. Een cent is klein, dus je hebt er veel van nodig: 2 euro = 200 cent. Zo ook: 1 kg = 1000 g. In de kleine eenheid is het getal <b>groot</b>. Controle: <b>kleine eenheid = groot getal</b>.', '2 euro = 200 cent<br>2 kg = 2000 g<small>kleine eenheid, groot getal</small>')],
         [toon('Nog een manier: één opgave, rustig.', 'ladder', { mis: 'N23', opgaven: [{ w: 67, van: 'mL', naar: 'L', trap: ['L', 'mL'] }, { w: .005, van: 'kg', naar: 'g' }] })]],
        [uitleg('Waarom altijd 1000? Milli betekent "een duizendste": 1 mA is een duizendste ampère, 1 mV een duizendste volt, 1 mL een duizendste liter. Kilo betekent "duizend": 1 kg = 1000 g.', 'milli = : 1000 · kilo = × 1000')]),
      snap('o-brug', 'Snap je de brug tussen <b>liter</b> en <b>cm³</b>?',
        [[Q('Hoeveel cm³ is 1 liter?', '1000 cm³', [['1 cm³', 'Dat is 1 mL.', 'N24'], ['100 cm³', '1 L = 1000 mL = 1000 cm³.', 'N24'], ['10 cm³', '1 L = 1 dm³ = 10 × 10 × 10 cm³.', 'N24']], '1 L = 1 dm³ = 1000 cm³.')],
          [Q('Een pak melk van 1 L is ongeveer een doos van 10 × 10 × 10 cm. Hoeveel mL is dat?', '1000 mL', [['30 mL', 'Volume is vermenigvuldigen: 10 × 10 × 10 = 1000 cm³.'], ['100 mL', 'Het is 1000 cm³, en 1 cm³ = 1 mL.', 'N24']], '1000 cm³ = 1000 mL.')]],
        [[uitleg('Andere manier: een <b>suikerklontje</b> is ongeveer 1 cm³: precies 1 mL. Een kubus van 10 × 10 × 10 cm past 1000 klontjes: 1000 cm³ = 1 dm³ = 1 liter.', '1 mL = 1 cm³<br>1 L = 1 dm³ = 1000 cm³')],
         [uitleg('Nog een manier: liter en mL gebruik je alleen bij <b>vloeistoffen</b>. Bij een steen of een doos zeg je cm³ of dm³. Maar ze zijn precies even groot: 250 mL water is 250 cm³.', 'vloeistof: mL · voorwerp: cm³<small>zelfde getal</small>')]],
        [uitleg('Dit heb je nodig bij de onderdompelmethode (mL aflezen, cm³ antwoorden) en bij dichtheid (volume in cm³). Een boomstam van 21 dm³ is 21 000 cm³.', '21 dm³ = 21 000 cm³')], 2),
      kaart('Mijn formulekaart', NK.obj.trap(), 'Grote eenheid naar kleine: × 1000. Kleine naar grote: : 1000.', ['1 kg = 1000 g · 1 L = 1000 mL', '1 A = 1000 mA · 1 V = 1000 mV', '1 L = 1 dm³ = 1000 cm³ · 1 mL = 1 cm³', 'Controle: kleine eenheid = groot getal.']),
      baas('De Kommaschuiver', BAAS.komma, 'Bij omrekenen maakt het niet uit welke kant je op schuift.', 'De Kommaschuiver schuift de komma overal heen. Laat zien dat jij de goede kant op gaat. Fout kost jou niks.', [
        Q('3,5 kg = ... g', '3500 g', [['0,0035 g', 'Naar een kleinere eenheid: het getal wordt groter.', 'N23'], ['350 g', 'Drie plaatsen, niet twee.']], '× 1000.'),
        Q('800 g = ... kg', '0,8 kg', [['800 000 kg', 'Naar een grotere eenheid: kleiner getal.', 'N23'], ['8 kg', 'Drie plaatsen.']], ': 1000.'),
        Q('1,34 L = ... mL', '1340 mL', [['0,00134 mL', 'Naar mL wordt het groter.', 'N23'], ['134 mL', 'Drie plaatsen.']], '× 1000.'),
        Q('8645 mL = ... L', '8,645 L', [['8 645 000 L', 'Naar L wordt het kleiner.', 'N23'], ['86,45 L', 'Drie plaatsen.']], ': 1000.'),
        Q('0,05 A = ... mA', '50 mA', [['0,00005 mA', 'Naar mA wordt het groter.', 'N23'], ['5 mA', 'Drie plaatsen.']], '× 1000.'),
        Q('1500 mV = ... V', '1,5 V', [['1 500 000 V', 'Naar V wordt het kleiner.', 'N23'], ['15 V', 'Drie plaatsen.']], ': 1000.'),
        Q('0,6 L = ... cm³', '600 cm³', [['0,6 cm³', '1 L = 1000 cm³.', 'N24'], ['6 cm³', '0,6 × 1000.', 'N24']], '0,6 L = 600 mL = 600 cm³.'),
        Q('Welke controle helpt bij omrekenen?', 'kleine eenheid = groot getal', [['grote eenheid = groot getal', 'Andersom: 1 kg = 1000 g.', 'N23'], ['het getal blijft gelijk', 'Het getal verandert, de hoeveelheid niet.']], '250 mA = 0,25 A.'),
      ]),
    ] },
];

/* =========================================================================
   H4 ELEKTRICITEIT
   ========================================================================= */
const H4 = [
  { id: 'stroomkring', titel: 'Een lampje laten branden', sub: '§4.1 · gesloten stroomkring en lading', bol: ob(NK.obj.lampje()), orgs: ['lampje'],
    stappen: [
      toon('Een batterij, een lampje en losse draadjes. Leg zelf de draadjes tot het lampje brandt. Tik op een oranje rondje en dan op een ander. Voorspel eerst.', 'stroomkring', {
        kring: K_LEEG, oplossing: [['B.p', 'L.b'], ['L.a', 'B.n']], wissel: true, misEen: 'E1',
        inzet: { vraag: 'Hoeveel draadjes heb je minstens nodig om het lampje te laten branden?', keuzes: [{ t: '1 draadje', mis: 'E1' }, { t: '2 draadjes', goed: true }, { t: '3 draadjes' }] },
        verklaar: { vraag: 'Waarom zijn er twee draadjes nodig?', opties: [
          { t: 'De lading moet een rondje kunnen maken: van de ene pool door het lampje naar de andere pool', goed: true },
          { t: 'Uit elke pool komt stroom, en die botst in het lampje', fout: 'Er botst niets. De lading gaat één kant op rond, overal tegelijk.', mis: 'E3' },
          { t: 'Eén draad brengt de stroom, de tweede is reserve', fout: 'Met één draad brandt hij niet: de lading moet terug naar de batterij.', mis: 'E1' }], w: 'Een gesloten stroomkring: een rondje zonder onderbreking.' } }, { hint: 'Laat het lampje branden.' }),
      snap('k-rond', 'Snap je wanneer een lampje <b>brandt</b>?',
        [[Q('Brandt het lampje in deze tekening?', 'Nee: er loopt maar één draad, de lading kan niet rond', [['Ja, de draad zit aan de pluspool', 'De lading moet ook terug naar de minpool.', 'E1'], ['Ja, maar zwak', 'Zonder rondje loopt er helemaal niets.', 'E1']], 'Een stroomkring moet gesloten zijn.', null, kringBeeld(K_EEN, false, 'Eén draad naar het lampje'))],
          [Q('En dit lampje? Beide draden zitten aan de pluspool.', 'Nee: de lading moet van de ene pool naar de andere', [['Ja, twee draden is genoeg', 'Twee draden, maar allebei aan dezelfde pool: geen rondje.', 'E1'], ['Ja, dubbel zo fel', 'Er loopt niets: geen verschil tussen de twee kanten.']], 'Van + door het lampje naar −.', null, kringBeeld(K_PLUS, false, 'Twee draden aan dezelfde pool'))]],
        [[uitleg('Andere manier: denk aan een <b>fietsketting</b>. De lading zit overal in de draden, zoals de schakels overal in de ketting zitten. Duwt de batterij, dan beweegt alles tegelijk. Maar alleen als de ketting <b>rond</b> is. Een kapotte ketting, of maar één draad: alles staat stil.', 'rond = alles beweegt<br>niet rond = alles staat stil')],
         [toon('Nog een manier: bouw het nu als <b>schema</b>.', 'stroomkring', { kring: K_LEEG, oplossing: [['B.p', 'L.b'], ['L.a', 'B.n']], weergave: 'schema', wissel: true, misEen: 'E1' })]],
        [uitleg('De lading wordt niet door de batterij gemaakt: hij zit al in de draden en in het lampje. De batterij <b>duwt</b> hem rond. Daarom gaat een lampje meteen aan als je de kring sluit, ook als de draad heel lang is: alle lading begint tegelijk te bewegen.', 'lading zit er al · de batterij duwt')]),
      toon('Nu met een <b>schakelaar</b>. Tik erop om hem dicht te zetten.', 'stroomkring', { kring: K_SCHAKEL(false), bouw: false, sluit: ['S'],
        start: 'De kring is bijna rond, maar de schakelaar staat open. Tik op de schakelaar.',
        goed: '<b>Licht!</b> Schakelaar dicht: twee metalen delen raken elkaar, de kring is <b>gesloten</b>.',
        verklaar: { vraag: 'Wat zit er tussen de metalen delen als de schakelaar open is?', opties: [
          { t: 'lucht, en lucht is een isolator', goed: true },
          { t: 'niks: de stroom springt eroverheen', fout: 'Dan zou het lampje ook bij een open schakelaar branden.', mis: 'E10' },
          { t: 'een geleider', fout: 'Dan zou de stroom erdoor gaan. Het is lucht: een isolator.', mis: 'E10' }], w: 'Schakelaar open = kring open = lampje uit.' } }, { hint: 'Zet de schakelaar dicht.' }),
      snap('k-lading', 'Snap je wat <b>lading</b> doet als je de kring opent?',
        [[Q('De schakelaar gaat open. Wat gebeurt er met de lading in de draden?', 'die is er nog, maar staat stil', [['die is op', 'Lading raakt niet op: hij staat stil omdat de kring open is.', 'E16'], ['die stroomt terug in de batterij', 'Er stroomt niets meer.'], ['die blijft rondstromen', 'Zonder gesloten kring kan hij niet rond.', 'E18']], 'Elektrische stroom = bewegende lading.')],
          [Q('Welke onderdelen heeft een eenvoudige stroomkring?', 'spanningsbron, snoeren, lampje en vaak een schakelaar', [['alleen een batterij en een lampje', 'Je hebt ook snoeren nodig om rond te komen.', 'E1'], ['een stopcontact en een lampje', 'Een stopcontact is ook een spanningsbron, maar zonder snoeren gaat het niet.']], 'Bron, snoeren, apparaat, schakelaar.')]],
        [[uitleg('Andere manier: <b>wind</b>. De lucht zie je niet bewegen, wel het effect: windmolens draaien. Lading zie je ook niet, wel het effect: het lampje brandt. Is er geen wind, dan is de lucht er nog wel, maar staat stil. Zo ook de lading bij een open kring.', 'geen wind: lucht staat stil<br>open kring: lading staat stil')],
         [toon('Nog een manier: zet de schakelaar open en dicht en kijk naar de bolletjes.', 'stroomkring', { kring: K_SCHAKEL(true), bouw: false, sluit: [], goed: '<b>Kijk naar de bolletjes:</b> dicht = ze bewegen, open = ze staan stil maar zijn er nog.' })]],
        [uitleg('Elektrische stroom is <b>bewegende lading</b>. Onderbreek je de kring, dan valt de beweging stil. De lading is er nog wel, maar kan niet meer rond. Daarom zeggen we niet "de stroom is op", maar "de kring is open".', 'stroom = bewegende lading')]),
      kaart('Gesloten stroomkring', NK.obj.lampje(), 'Een lampje brandt alleen in een gesloten kring: van de ene pool, door het lampje, naar de andere pool.', ['Onderdelen: spanningsbron, snoeren, lampje, schakelaar.', 'Stroom = bewegende lading.', 'Schakelaar open: lucht ertussen, kring open.']),
      baas('De Eéndraad', BAAS.eendraad, 'Eén draad naar het lampje is genoeg.', 'De Eéndraad sleept één losse draad achter zich aan. Laat zien dat het een rondje moet zijn. Fout kost jou niks.', [
        Q('Wat is nodig om een lampje te laten branden?', 'een gesloten stroomkring', [['één draad naar de pluspool', 'De lading moet ook terug.', 'E1'], ['een lampje met veel stroom erin', 'Zonder rondje loopt er niets.', 'E16']], 'Een rondje zonder onderbreking.'),
        Q('Hoeveel aansluitingen heeft een lampje?', 'twee', [['één', 'Er zijn er twee: één erin, één eruit.', 'E1'], ['geen', 'Kijk naar het fitting: twee contacten.']], 'De lading gaat erin en eruit.'),
        Q('Uit de plus- en de minpool komt stroom die in het lampje botst. Klopt dat?', 'Nee, de lading gaat één kant op rond', [['Ja, daarom gaat het branden', 'Er botst niets. Overal gaat dezelfde stroom één kant op.', 'E3'], ['Alleen bij een grote batterij', 'Nooit.', 'E3']], 'Lading gaat rond.'),
        Q('De schakelaar is open. Brandt het lampje?', 'nee', [['ja', 'Open = er zit lucht tussen: de kring is open.', 'E18'], ['ja, maar zwak', 'Er loopt helemaal niets.', 'E10']], 'Open = uit.'),
        Q('Wat is elektrische stroom?', 'bewegende lading', [['lading die opraakt', 'Lading raakt niet op.', 'E16'], ['de batterij', 'De batterij duwt de lading.']], 'Bewegende lading.'),
        Q('Wat is een spanningsbron?', 'bijvoorbeeld een batterij: hij duwt de lading rond', [['een lampje', 'Een lampje gebruikt energie.'], ['een snoer', 'Een snoer verbindt.']], 'Batterij, accu, dynamo, zonnecel.'),
        Q('Brandt dit lampje?', 'ja, het is een gesloten kring', [['nee, er zijn maar twee draden', 'Twee draden is genoeg als het een rondje is.', 'E1'], ['nee, de lading botst', 'Er botst niets.', 'E3']], 'Van + door het lampje naar −.', null, kringBeeld(K_RONDJE, false, 'Een gesloten kring')),
      ]),
    ] },

  { id: 'geleiders', titel: 'Geleiders en isolatoren', sub: '§4.1 · wat laat stroom door?', bol: ob(NK.obj.potlood()), orgs: ['potlood'],
    stappen: [
      toon('In deze kring zit een <b>gat</b>. Klem er een materiaal in. Voorspel elke keer: laat het de stroom door?', 'gattest', {
        materialen: [
          { naam: 'Koperdraad', teken: 'koper', geleider: true, mis: 'E12', w: 'Koper is een metaal en geleidt heel goed. Daarom zit het in elk snoer.' },
          { naam: 'Potloodstift', teken: 'potlood', geleider: true, R: 6, mis: 'E11', w: 'Ja! De stift is grafiet, dat is koolstof: geen metaal, en toch een geleider. Het lampje brandt zwakker: koolstof geleidt minder goed dan koper. Teken je met potlood, dan teken je dus met een geleider.' },
          { naam: 'Gum (rubber)', teken: 'rubber', geleider: false, mis: 'E11', w: 'Rubber is een isolator.' },
          { naam: 'Glazen staafje', teken: 'glas', geleider: false, mis: 'E11', w: 'Glas is hard, maar geen metaal: een isolator.' },
          { naam: 'Plastic liniaal', teken: 'plastic', geleider: false, mis: 'E11', w: 'De meeste plastics zijn isolatoren.' },
          { naam: 'Niks (lucht)', teken: 'lucht', geleider: false, mis: 'E10', w: 'Lucht is een isolator. Precies wat er in een open schakelaar zit.' },
          { naam: 'Stalen spijker', teken: 'staal', geleider: true, mis: 'E12', w: 'Staal is een metaal: geleider.' },
          { naam: 'Aluminiumfolie', teken: 'alu', geleider: true, mis: 'E12', w: 'Aluminium is een metaal en geleidt goed.' },
          { naam: 'Houten stokje', teken: 'hout', geleider: false, mis: 'E11', w: 'Hout is geen metaal: isolator.' },
        ],
        verklaar: { vraag: 'Wat hebben de geleiders gemeen?', opties: [
          { t: 'Het zijn metalen, en koolstof geleidt ook', goed: true },
          { t: 'Het zijn harde stoffen', fout: 'Glas is ook hard, en dat is een isolator.', mis: 'E11' },
          { t: 'Ze zijn allemaal van koper', fout: 'Staal en aluminium geleiden ook: alle metalen.', mis: 'E12' }], w: 'Geen metaal? Dan bijna altijd een isolator (koolstof is de uitzondering).' } }, { hint: 'Test alle materialen.' }),
      snap('ge-voorspel', 'Snap je hoe je voorspelt of iets een <b>geleider</b> is?',
        [[Q('Je klemt een gouden ring in het gat. Gaat het lampje branden?', 'ja, goud is een metaal', [['nee, alleen koper geleidt', 'Alle metalen geleiden.', 'E12'], ['alleen als de ring dik is', 'Dun of dik: metaal geleidt.'], ['nee, goud is te duur', 'Prijs doet er niet toe.']], 'Metaal = geleider.')],
          [Q('Een glazen knikker: geleider of isolator?', 'isolator', [['geleider, want glas is hard', 'Hard zegt niets. Glas is geen metaal.', 'E11'], ['geleider, want het is doorzichtig', 'Doorzichtig zegt ook niets.', 'E11']], 'Geen metaal: isolator.')]],
        [[toon('Andere manier: sorteer zonder kring, alleen met de regel.', 'sorteer', { bakken: [{ id: 'g', naam: 'Geleider' }, { id: 'i', naam: 'Isolator' }], kaarten: [
          { t: 'een zilveren ketting', bak: 'g', w: 'Zilver is een metaal.', fout: 'Zilver is een metaal: geleider.', mis: 'E12' }, { t: 'een rubberen bal', bak: 'i', w: 'Rubber isoleert.', fout: 'Rubber is een isolator.', mis: 'E11' },
          { t: 'een ijzeren sleutel', bak: 'g', w: 'IJzer is een metaal.', fout: 'IJzer geleidt.', mis: 'E12' }, { t: 'een stenen tegel', bak: 'i', w: 'Steen is geen metaal.', fout: 'Steen is hard, maar geen metaal.', mis: 'E11' },
          { t: 'grafiet uit een potlood', bak: 'g', w: 'Koolstof: de uitzondering.', fout: 'Koolstof is geen metaal, maar geleidt wel.' }, { t: 'een plastic beker', bak: 'i', w: 'Plastic isoleert.', fout: 'Plastic is een isolator.' }] })],
         [uitleg('Nog een manier: kijk in een <b>snoer</b>. Binnenin koper: daar loopt de stroom door (geleider). Buitenom plastic: daar loopt geen stroom (isolator), zodat jij het veilig kunt vastpakken. Een stekker is net zo: metalen pinnen, plastic eromheen.', 'binnen koper (geleider)<br>buiten plastic (isolator)')]],
        [uitleg('Het ene metaal geleidt beter dan het andere: koper en aluminium beter dan ijzer en lood. Daarom zijn snoeren van koper. Koolstof is geen metaal, maar geleidt toch, alleen minder goed: daarom brandde het lampje met de potloodstift zwakker.', 'koper, aluminium: heel goed<br>ijzer, lood: minder<br>koolstof: een beetje')]),
      snap('ge-lucht', 'Snap je waarom <b>lucht</b> een isolator is?',
        [[Q('Waarom gaat het lampje uit als je de schakelaar opent?', 'Er komt lucht tussen de metalen delen, en lucht is een isolator', [['De stroom raakt op', 'Lading raakt niet op.', 'E16'], ['De lucht neemt de stroom over', 'Lucht laat de stroom niet door.', 'E10']], 'Lucht isoleert.')],
          [Q('Waarom zit er plastic om een snoer?', 'Plastic is een isolator: zo krijg jij geen stroom als je het aanraakt', [['Zodat de stroom sneller gaat', 'De stroom loopt door het koper, het plastic beschermt.'], ['Plastic geleidt beter dan koper', 'Andersom: plastic isoleert.', 'E11']], 'Isolatie beschermt.')]],
        [[toon('Andere manier: test alleen lucht en koper, en kijk naar de bolletjes.', 'gattest', { vast: true, materialen: [{ naam: 'Niks (lucht)', teken: 'lucht', geleider: false, mis: 'E10', w: 'De bolletjes staan stil: lucht laat niets door.' }, { naam: 'Koperdraad', teken: 'koper', geleider: true, mis: 'E12', w: 'Nu bewegen ze: de kring is gesloten.' }] })],
         [uitleg('Nog een manier: als lucht een geleider was, zou een schakelaar nooit kunnen werken. Uit = er zit een stukje lucht tussen. Omdat het lampje dan uitgaat, weet je: <b>lucht isoleert</b>.', 'schakelaar uit → lucht ertussen → lampje uit')]],
        [uitleg('Bij heel hoge spanningen, zoals bij bliksem, kan er toch een vonk door de lucht springen. Bij een batterij of stopcontact in huis gebeurt dat niet: daar is lucht een goede isolator.', 'gewone spanning: lucht isoleert')], 2),
      kaart('Geleiders en isolatoren', NK.obj.potlood(), 'Geleider: stroom gaat er gemakkelijk door (alle metalen, koolstof). Isolator: niet of heel slecht (rubber, glas, plastic, lucht).', ['Alle metalen geleiden: koper, aluminium, staal, ijzer.', 'Koolstof (potloodstift) geleidt ook.', 'Geen metaal? Bijna altijd een isolator.', 'Lucht is een isolator.']),
      baas('De Hardgeleider', BAAS.hardgeleider, 'Alles wat hard is, geleidt. En lucht laat stroom door.', 'De Hardgeleider is van glas en denkt dat hij stroom doorlaat. Versla hem. Fout kost jou niks.', [
        Q('Is glas een geleider?', 'nee, een isolator', [['ja, het is hard', 'Hard zegt niets.', 'E11'], ['alleen als het nat is', 'Glas zelf is een isolator.']], 'Glas isoleert.'),
        Q('Welke is een geleider?', 'aluminium', [['rubber', 'Isolator.', 'E11'], ['glas', 'Isolator.', 'E11']], 'Metaal.'),
        Q('Welke is een isolator?', 'plastic', [['staal', 'Staal is een metaal: geleider.', 'E12'], ['koper', 'Koper is de beste geleider van deze.', 'E12']], 'De meeste plastics isoleren.'),
        Q('Is lucht een geleider?', 'nee, lucht is een isolator', [['ja, de stroom springt erdoor', 'Dan zou een open schakelaar niet werken.', 'E10'], ['soms, bij een batterij', 'Bij een batterij isoleert lucht.', 'E10']], 'Lucht isoleert.'),
        Q('Geleidt een stalen spijker?', 'ja', [['nee, alleen koper', 'Alle metalen geleiden.', 'E12'], ['nee, staal is hard', 'Hard zegt niets: staal is een metaal.', 'E11']], 'Staal is een metaal.'),
        Q('Potloodstift (grafiet) in het gat. Het lampje ...', 'brandt, maar zwakker', [['blijft uit, het is geen metaal', 'Koolstof is de uitzondering: het geleidt.'], ['brandt feller dan met koper', 'Koolstof geleidt minder goed dan koper.']], 'Koolstof geleidt een beetje.'),
        Q('Waarom is een snoer van koper met plastic eromheen?', 'koper geleidt de stroom, plastic beschermt jou', [['plastic geleidt, koper beschermt', 'Andersom.', 'E11'], ['allebei voor de stroom', 'Plastic laat geen stroom door.', 'E11']], 'Geleider binnen, isolator buiten.'),
      ]),
    ] },

  { id: 'stroomsterkte', titel: 'Stroomsterkte meten', sub: '§4.1 · ampère, stroommeter, overal gelijk', bol: ob(NK.obj.stroommeter()), orgs: ['stroommeter'],
    stappen: [
      toon('Met een <b>stroommeter</b> meet je hoeveel lading er per seconde langskomt: de <b>stroomsterkte</b>, in ampère (A). Zet de meter op verschillende plekken. Voorspel eerst.', 'meterplek', {
        kring: K_METER, meter: 'A', min: 3,
        plekken: [{ id: 'P1', label: 'vóór het lampje' }, { id: 'P2', label: 'ná het lampje' }, { id: 'P3', label: 'bij de pluspool' },
          { id: 'PO', label: 'naast het lampje', fout: 'Een stroommeter <b>naast</b> het lampje is een bijna-kortsluiting: de stroom gaat door de meter in plaats van door het lampje, en het lampje gaat uit. Een stroommeter hoort <b>in</b> de kring.', mis: 'E7' }],
        inzet: { vraag: 'Vóór het lampje wijst de meter 0,50 A aan. Wat wijst hij ná het lampje aan?', keuzes: [{ t: 'ook 0,50 A', goed: true }, { t: 'minder: het lampje maakt stroom op', mis: 'E2' }, { t: 'meer' }] },
        uitkomst: 'Overal <b>hetzelfde</b> getal. Het lampje maakt geen lading op: wat erin gaat, komt eruit.',
        verklaar: { vraag: 'Waarom is de stroom overal in de kring gelijk?', opties: [
          { t: 'Er gaat evenveel lading het lampje in als eruit: lading raakt niet op', goed: true },
          { t: 'Het lampje maakt wel stroom op, maar maar een heel klein beetje', fout: 'De meter laat precies hetzelfde zien: er raakt niets op.', mis: 'E2' },
          { t: 'De stroom komt van twee kanten en botst in het midden', fout: 'Er botst niets: de lading gaat één kant op rond.', mis: 'E3' }], w: 'De stroomsterkte is op elke plek in een enkele kring even groot.' } }, { hint: 'Meet op drie plekken in de kring.' }),
      snap('ss-gelijk', 'Snap je dat de stroom <b>overal even groot</b> is, en waar de meter hoort?',
        [[Q('Een kring met één lampje. Bij de pluspool meet je 0,3 A. Bij de minpool?', '0,3 A', [['0 A, alles is opgebruikt', 'Lading raakt niet op in het lampje.', 'E2'], ['0,15 A', 'Het lampje halveert de stroom niet.', 'E2'], ['0,6 A', 'Er komt niets bij.']], 'Overal gelijk.')],
          [Q('Waar zet je een stroommeter?', 'in de kring, zodat de stroom erdoorheen gaat', [['naast het lampje', 'Dan maak je bijna kortsluiting om het lampje heen.', 'E7'], ['maakt niet uit, ook los ernaast', 'Los ernaast meet hij niets.']], 'In de kring (in serie).')]],
        [[uitleg('Andere manier: het <b>draaihek bij de winkel</b>. Ga je met je moeder kleren shoppen, dan tel je bij de ingang hoeveel mensen er per minuut naar binnen gaan. Bij de uitgang komen er net zoveel per minuut naar buiten: er verdwijnt niemand in de winkel. Zo is het met lading in het lampje.', 'ingang: 20 per minuut<br>uitgang: 20 per minuut<small>niemand verdwijnt</small>')],
         [toon('Nog een manier: meet nog eens, nu met twee lampjes achter elkaar.', 'meterplek', { kring: K_SERIE2M, meter: 'A', min: 3, plekken: [{ id: 'P1', label: 'vóór lampje 2' }, { id: 'P2', label: 'tussen de lampjes' }, { id: 'P3', label: 'ná lampje 1' }], uitkomst: 'Ook met twee lampjes: <b>overal hetzelfde</b>. Wel minder dan met één lampje: twee lampjes houden meer tegen.' })]],
        [uitleg('Wat gaat er dan wél op? <b>Energie</b>. De batterij geeft energie mee, het lampje zet die om in licht en warmte. De lading is de bezorger, de energie het pakketje: de bezorger komt terug, het pakketje blijft bij het lampje.', 'lading: komt terug<br>energie: wordt licht en warmte')]),
      toon('Een echte stroommeter heeft vaak een <b>wijzer</b> en meerdere <b>meetbereiken</b>. Het rode snoer laat zien welk bereik gekozen is. Lees af.', 'aflezen', { instrument: 'meter', soort: 'A', bereiken: [5, .5, .05], schaal: 50, rondes: 2, misBereik: 'E21' }, { hint: 'Doe beide metingen.' }),
      snap('ss-eenheid', 'Snap je wat <b>stroomsterkte</b> is en hoe je hem opschrijft?',
        [[Q('Hoeveel mA is 0,05 A?', '50 mA', [['0,00005 mA', 'Naar mA wordt het getal groter: × 1000.', 'N23'], ['5 mA', 'Drie plaatsen, niet twee.']], '0,05 × 1000 = 50 mA.')],
          [Q('Wat is stroomsterkte?', 'hoeveel lading er per seconde langs een punt komt', [['hoe hard de batterij duwt', 'Dat is spanning.', 'E6'], ['hoeveel energie het lampje maakt', 'Het gaat om lading per seconde.'], ['hoe dik de draad is', 'Daar gaat het niet om.']], 'Lading per seconde, in ampère.')]],
        [[uitleg('Andere manier: een <b>ballon</b> die leegloopt (zoals in het boek). De stroomsterkte is hoeveel lucht er per seconde uitkomt. Veel lucht per seconde: grote stroomsterkte, de ballon is snel leeg.', 'veel per seconde = grote stroomsterkte')],
         [toon('Nog een manier: reken om op de trap.', 'ladder', { mis: 'N23', opgaven: [{ w: .25, van: 'A', naar: 'mA', trap: ['A', 'mA'] }, { w: 80, van: 'mA', naar: 'A', trap: ['A', 'mA'] }] })]],
        [uitleg('Waarom meetbereiken? Een kleine stroom op het 5 A-bereik geeft bijna geen uitslag: dan kies je 0,05 A en lees je veel preciezer af. Kijk eerst naar het rode snoer: de hele schaal is dan zoveel ampère.', 'rood snoer → bereik → wat is de schaal waard?')]),
      kaart('Stroomsterkte', NK.obj.stroommeter(), 'Stroomsterkte = lading per seconde, in ampère (A). In een kring overal even groot.', ['Stroommeter IN de kring.', '1 A = 1000 mA.', 'Kijk naar het rode snoer: welk bereik?', 'Er raakt geen lading op, wel energie.']),
      baas('De Stroomvreter', BAAS.stroomvreter, 'Het lampje eet stroom op: ná het lampje is er minder.', 'De Stroomvreter schrokt lading-bolletjes naar binnen. Laat zien dat er niks opraakt. Fout kost jou niks.', [
        Q('Vóór het lampje 0,4 A. Ná het lampje?', '0,4 A', [['minder dan 0,4 A', 'Lading raakt niet op.', 'E2'], ['0 A', 'Dan zou het lampje alles opeten.', 'E2']], 'Overal gelijk.'),
        Q('Wat zet een lampje om in licht en warmte?', 'energie', [['lading', 'De lading gaat gewoon verder rond.', 'E2'], ['stroom', 'De stroom blijft even groot.', 'E2']], 'Energie, geen lading.'),
        Q('In welke eenheid meet je stroomsterkte?', 'ampère', [['volt', 'Volt is spanning.', 'E6'], ['newton', 'Newton is kracht.']], 'A.'),
        Q('Je zet de stroommeter naast het lampje. Wat gebeurt er?', 'het lampje gaat uit en de meter geeft een veel te grote waarde', [['de meter meet gewoon de stroom', 'Naast het lampje gaat de stroom om het lampje heen.', 'E7'], ['niks', 'Het lampje gaat uit.', 'E7']], 'Stroommeter hoort IN de kring.'),
        Q('Bereik 0,5 A, wijzer op 30 van de 50. Stroomsterkte?', '0,3 A', [['30 A', 'De hele schaal is maar 0,5 A.', 'E21'], ['3 A', 'Dat hoort bij bereik 5 A.', 'E21']], '30/50 van 0,5 = 0,3 A.'),
        Q('Wat is stroomsterkte?', 'hoeveel lading per seconde voorbijkomt', [['de duw van de batterij', 'Dat is spanning.', 'E6'], ['hoeveel lading er in totaal in de draad zit', 'Het gaat om per seconde.']], 'Lading per seconde.'),
        Q('250 mA = ... A', '0,25 A', [['250 000 A', 'Naar A wordt het kleiner.', 'N23'], ['2,5 A', 'Drie plaatsen.']], ': 1000.'),
        Q('Wat zegt een stroommeter bij de minpool vergeleken met de pluspool?', 'precies hetzelfde', [['minder', 'Er raakt niets op.', 'E2'], ['de helft', 'Er raakt niets op.', 'E2']], 'Eén kring: overal gelijk.'),
      ]),
    ] },

  { id: 'spanning', titel: 'Spanning: de duw', sub: '§4.2 · volt, serie, veilig, adapter', bol: ob(NK.obj.ballon()), orgs: ['ballon'],
    stappen: [
      toon('<b>Spanning</b> is de duw op de lading, in volt (V). Denk aan een ballon die duwt, en de batterijen als pomp die de ballon vol houdt. Het ventiel is de schakelaar. Voorspel eerst.', 'ballonpomp', {
        cel: 1.5, start: 1, max: 6, min: 3,
        inzet: { vraag: 'De ballon staat strak (spanning!), maar het ventiel is dicht. Hoeveel stroom loopt er?', keuzes: [{ t: '0 A: er stroomt niets', goed: true }, { t: 'nog steeds stroom, want er is spanning', mis: 'E6' }, { t: 'juist extra veel' }] },
        verklaar: { vraag: 'Een losse batterij heeft 1,5 V. Loopt er dan stroom?', opties: [
          { t: 'Nee: spanning is de duw, stroom loopt pas in een gesloten kring', goed: true },
          { t: 'Ja, 1,5 A', fout: '1,5 V is de duw, geen stroom. Zonder kring: 0 A.', mis: 'E6' },
          { t: 'Ja, een beetje', fout: 'Zonder gesloten kring loopt er niets.', mis: 'E6' }], w: 'Spanning (V) en stroomsterkte (A) zijn twee verschillende dingen.' } }, { hint: 'Probeer meer batterijen en het ventiel open en dicht.' }),
      snap('sp-optellen', 'Snap je wat er gebeurt als je batterijen <b>in serie</b> zet?',
        [[Q('Drie batterijen van 1,5 V in serie. Spanning?', '4,5 V', [['1,5 V', 'In serie tellen de spanningen op.', 'E13'], ['3,0 V', 'Dat zijn er twee. Hier drie.', 'E13'], ['0,5 V', 'Je deelde. Het is optellen.', 'E13']], '1,5 + 1,5 + 1,5 = 4,5 V.')],
          [Q('Hoe zet je batterijen in serie?', 'pluspool van de ene tegen de minpool van de andere', [['plus tegen plus', 'Dan duwen ze tegen elkaar in.'], ['het maakt niet uit hoe', 'Het moet plus tegen min.']], 'Plus tegen min: de duwen tellen op.')]],
        [[uitleg('Andere manier: <b>pompen achter elkaar</b>. Elke batterij is een pomp die de lading een duw geeft. Zet je drie pompen achter elkaar, dan krijgt de lading drie duwen. Daarom <b>tel je de spanningen op</b>.', '1,5 V + 1,5 V + 1,5 V = 4,5 V')],
         [toon('Nog een manier: stapel zelf, en kijk naar de spanningsmeter.', 'ballonpomp', { cel: 1.5, start: 1, max: 6, min: 3 })]],
        [uitleg('Een afstandsbediening heeft twee staafbatterijen van 1,5 V: samen 3,0 V. Vier in serie: 6,0 V. Met oplaadbare batterijen van 1,2 V gaat het net zo, alleen met 1,2 per stuk.', 'n batterijen × spanning per stuk')]),
      toon('Een <b>spanningsmeter</b> meet de duw tussen twee punten. Zet hem op de goede plek.', 'meterplek', { kring: K_VMETER, meter: 'V', min: 2,
        plekken: [{ id: 'VB', label: 'over de batterij', w: 'De duw van de batterij: 4,5 V.' }, { id: 'VO', label: 'over het lampje', w: 'Over het lampje meet je ook 4,5 V: daar wordt de duw gebruikt.' },
          { id: 'P1', label: 'in de draad', fout: 'Een spanningsmeter <b>in</b> de draad laat bijna geen stroom door: het lampje gaat uit, en hij meet gewoon de batterij. Een spanningsmeter hoort <b>ernaast</b>, aan twee kanten van het onderdeel.', mis: 'E8' }],
        uitkomst: 'Een spanningsmeter zet je <b>ernaast</b>: aan de plus- en de minkant. Een stroommeter zet je juist <b>in</b> de kring.' }, { hint: 'Meet over de batterij en over het lampje.' }),
      toon('Een lampje is gemaakt voor <b>9 V</b>. Je hebt alleen oplaadbare batterijen van <b>1,2 V</b>. Hoeveel zet je in serie? Niet boven de 9 V, anders brandt het lampje door.', 'ballonpomp', { taak: 'doel', doel: { U: 9, cel: 1.2 }, start: 4, max: 9, ventiel: false,
        inzet: { vraag: 'Hoeveel batterijen van 1,2 V?', keuzes: [{ t: '7 (8,4 V)', goed: true }, { t: '8 (9,6 V)' }, { t: '9 (10,8 V)', mis: 'E13' }] } }, { hint: 'Stapel en druk op Check.' }),
      toon('Niet elke spanning is veilig. De vuistregel uit de les: <b>tot 24 V is veilig</b> om aan te raken. Sorteer.', 'sorteer', {
        bakken: [{ id: 'v', naam: 'Veilig', sub: 'tot 24 V' }, { id: 'o', naam: 'Onveilig', sub: 'meer dan 24 V' }],
        kaarten: [
          { t: 'knoopcel (3 V)', org: NK.obj.knoopcel(), bak: 'v', w: '3 V is veilig.', fout: '3 V is ver onder de 24 V.' },
          { t: 'staafbatterij (1,5 V)', org: NK.obj.batterijAA(), bak: 'v', w: 'Veilig.', fout: '1,5 V is veilig.' },
          { t: 'blokbatterij (9 V)', org: NK.obj.blokbatterij(), bak: 'v', w: 'Veilig.', fout: '9 V is onder de 24 V.' },
          { t: 'accu van een scooter (12 V)', org: NK.obj.accu(), bak: 'v', w: 'Veilig om aan te raken, maar maak geen kortsluiting: dan wordt de draad gloeiend heet.', fout: '12 V is onder de 24 V: veilig om aan te raken.' },
          { t: 'accu van een boormachine (18 V)', org: NK.obj.boormachine(), bak: 'v', w: 'Veilig.', fout: '18 V is onder de 24 V.' },
          { t: 'stopcontact (230 V)', org: NK.obj.stopcontact(), bak: 'o', w: 'Levensgevaarlijk.', fout: '230 V is levensgevaarlijk!', mis: 'E14' },
          { t: 'bovenleiding van de trein (1500 V)', org: NK.obj.hoogspanning(), bak: 'o', w: 'Heel gevaarlijk.', fout: '1500 V is extreem gevaarlijk.', mis: 'E14' },
        ], na: 'Niet de spanning zelf doet pijn, maar de <b>stroom door je lichaam</b>. Hoe hoger de spanning, hoe groter die stroom kan worden.' }),
      toon('Na het winkelen met je moeder is je telefoon bijna leeg. Hij werkt op 5 V, het stopcontact geeft 230 V. Voorspel.', 'poe', {
        beeld: SC.telVoor, beeldNa: SC.telNa, vraag: 'Wat gebeurt er als je de telefoon rechtstreeks op 230 V zet?',
        keuzes: [{ t: 'hij gaat kapot', goed: true }, { t: 'hij laadt sneller op', mis: 'E15' }, { t: 'er gebeurt niets' }],
        uitleg: 'Kapot: 230 V is veel te veel. Daarom zit er een <b>adapter</b> tussen, het blokje van je oplader. Daarin zit een <b>transformator</b> die 230 V omzet naar 5 V. Op de adapter staat: <i>input 230 V, output 5 V</i>.',
        verklaar: { vraag: 'Wat doet de transformator in de adapter?', opties: [
          { t: 'Hij zet de netspanning (230 V) om naar een lagere spanning (5 V)', goed: true },
          { t: 'Hij maakt extra stroom, zodat het sneller laadt', fout: 'Hij maakt geen stroom: hij zet de spanning om.', mis: 'E15' },
          { t: 'Hij slaat lading op, zoals een batterij', fout: 'Dat doet een accu. De adapter zet spanning om.' }], w: 'Adapter = oplader: 230 V naar de lage spanning van het apparaat.' } }),
      snap('sp-veilig', 'Snap je wat <b>veilig</b> is en wat een <b>adapter</b> doet?',
        [[Q('Welke spanningsbron is onveilig om aan te raken?', 'het stopcontact (230 V)', [['de accu van een scooter (12 V)', '12 V is onder de 24 V.', 'E14'], ['een blokbatterij (9 V)', '9 V is veilig.'], ['de accu van een boormachine (18 V)', '18 V is onder de 24 V.']], 'Boven de 24 V: onveilig.')],
          [Q('Op de oplader van een laptop staat: input 230 V, output 19 V. Wat betekent dat?', 'Hij zet 230 V uit het stopcontact om naar 19 V voor de laptop', [['Hij maakt van 19 V 230 V', 'Andersom: van de netspanning naar lager.', 'E15'], ['De laptop krijgt 230 V', 'Dan gaat hij kapot. Hij krijgt 19 V.']], 'Input = erin, output = eruit.')]],
        [[uitleg('Andere manier: stel de spanning voor als een <b>trap</b>. 1,5 V: een opstapje. 12 V: een paar treden. 24 V: de grens. 230 V: een flatgebouw. Van zo hoog kan de stroom door je lichaam gevaarlijk groot worden.', '1,5 V · 9 V · 12 V · 18 V veilig<br>24 V grens<br>230 V levensgevaarlijk')],
         [uitleg('Nog een manier: lees een oplader zoals een recept. <b>Input</b> = wat erin gaat (230 V uit de muur). <b>Output</b> = wat eruit komt (5 V voor je telefoon). Daartussen zit de transformator die het omzet.', 'input 230 V → transformator → output 5 V')]],
        [uitleg('Het stopcontact geeft <b>wisselspanning</b>, een batterij <b>gelijkspanning</b>. De officiële norm noemt een droge huid veilig tot ongeveer 50 V wisselspanning, maar met een natte huid veel minder: daarom houden we in de les 24 V aan.', 'stopcontact: wisselspanning<br>batterij: gelijkspanning')]),
      kaart('Spanning', NK.obj.ballon(), 'Spanning = de duw op de lading, in volt (V). In serie tellen spanningen op.', ['Spanningsmeter: aan de plus- en minpool (ernaast).', 'Spanning zonder kring: wel V, geen A.', 'Tot 24 V veilig, 230 V levensgevaarlijk.', 'Adapter: transformator van 230 V naar bijvoorbeeld 5 V.']),
      baas('De Spanningsstromer', BAAS.spanningsstromer, 'Spanning en stroom zijn hetzelfde: een losse batterij van 1,5 V geeft 1,5 A.', 'De Spanningsstromer is een strakke ballon die denkt dat druk hetzelfde is als stromen. Versla hem. Fout kost jou niks.', [
        Q('Een losse batterij van 9 V ligt op tafel. Stroom?', '0 A', [['9 A', 'Spanning is geen stroom.', 'E6'], ['een beetje', 'Zonder kring: niets.', 'E6']], 'Geen kring, geen stroom.'),
        Q('In welke eenheid meet je spanning?', 'volt', [['ampère', 'Ampère is stroomsterkte.', 'E6'], ['newton', 'Newton is kracht.']], 'V.'),
        Q('Hoe sluit je een spanningsmeter aan?', 'aan de plus- en minpool, ernaast', [['in de kring, in de draad', 'Dan blokkeert hij de stroom: het lampje gaat uit.', 'E8'], ['maakt niet uit', 'Het maakt wel uit: ernaast.', 'E8']], 'Spanningsmeter over het onderdeel.'),
        Q('Vier batterijen van 1,5 V in serie?', '6,0 V', [['1,5 V', 'Optellen.', 'E13'], ['4,0 V', '4 × 1,5 = 6,0.', 'E13']], '4 × 1,5 = 6,0 V.'),
        Q('Is een auto-accu (12 V) veilig om aan te raken?', 'ja, onder de 24 V', [['nee, alle accu’s zijn gevaarlijk', 'Aanraken kan, maar maak geen kortsluiting.'], ['alleen met handschoenen', '12 V is veilig om aan te raken.']], 'Onder de 24 V.'),
        Q('Wat is de netspanning in huis?', '230 V', [['24 V', 'Dat is de veiligheidsgrens.'], ['12 V', 'Dat is een accu.']], 'Stopcontact: 230 V.'),
        Q('Wat zit er in een adapter?', 'een transformator die de spanning omzet', [['een extra batterij', 'Een adapter zet spanning om.', 'E15'], ['een stroommeter', 'Die zit er niet in.']], 'Transformator.'),
        Q('Is een condensator een goede spanningsbron?', 'nee, hij levert geen constante spanning', [['ja, net als een batterij', 'Een lampje op een condensator wordt steeds zwakker.'], ['ja, hij maakt lading', 'Hij slaat lading op en loopt leeg.']], 'Batterij: constant. Condensator: zakt in.'),
      ]),
    ] },

  { id: 'schakelingen', titel: 'Schema’s, serie en parallel', sub: '§4.3 · symbolen, serie of parallel, thuis', bol: ob(NK.obj.schema()), orgs: ['schema'],
    stappen: [
      toon('In een <b>schakelschema</b> teken je elk onderdeel met een vast <b>symbool</b>. Welk onderdeel is dit?', 'koppel', {
        labels: ['batterij', 'lampje', 'schakelaar', 'stroommeter', 'spanningsmeter', 'motor'],
        items: [
          { beeld: SYM.batterij, alt: 'symbool batterij', goed: 'batterij', w: 'Lange dunne streep = pluspool, korte dikke = minpool.', fout: { lampje: 'Een lampje is een cirkel met een kruis.' } },
          { beeld: SYM.lampje, alt: 'symbool lampje', goed: 'lampje', w: 'Cirkel met een kruis.', fout: { motor: 'Een motor is een cirkel met een M.' } },
          { beeld: SYM.schakelaar, alt: 'symbool schakelaar', goed: 'schakelaar', w: 'Een klepje: schuin = open.', fout: { batterij: 'Een batterij heeft twee strepen.' } },
          { beeld: SYM.stroommeter, alt: 'symbool stroommeter', goed: 'stroommeter', w: 'A = ampère = stroommeter.', fout: { spanningsmeter: 'V is de spanningsmeter. A staat voor ampère: stroom.' }, mis: 'E19' },
          { beeld: SYM.spanningsmeter, alt: 'symbool spanningsmeter', goed: 'spanningsmeter', w: 'V = volt = spanningsmeter.', fout: { stroommeter: 'A is de stroommeter. V staat voor volt: spanning.' }, mis: 'E19' },
          { beeld: SYM.motor, alt: 'symbool motor', goed: 'motor', w: 'Cirkel met een M.', fout: { lampje: 'Een lampje heeft een kruis.' } },
        ], na: 'Een schema is overzichtelijker dan een tekening: elk onderdeel heeft één vast symbool.' }),
      toon('Nu twee schakelingen: <b>serie</b> (alles achter elkaar) en <b>parallel</b> (met vertakkingen). Wissel tussen echt en schema, en draai een lampje los. Voorspel eerst.', 'schemabouwer', {
        kringen: [{ naam: 'Serie', kring: K_SERIE, los: 'In serie: <b>alles uit</b>. Er is maar één kring, en die is nu onderbroken.' }, { naam: 'Parallel', kring: K_PAR, los: 'Parallel: het andere lampje <b>blijft branden</b>, even fel. Het heeft zijn eigen kring.' }],
        inzet: { vraag: 'In een lichtslinger in serie draai je één lampje los. Wat doen de andere?', keuzes: [{ t: 'die gaan ook uit', goed: true }, { t: 'die blijven branden', mis: 'E17' }, { t: 'die gaan feller branden', mis: 'E4' }] },
        uitkomst: 'Serie: één kring, één lampje los = alles uit. Parallel: elk lampje een eigen kring.',
        verklaar: { vraag: 'Waarom staan lampen en stopcontacten in huis parallel?', opties: [
          { t: 'Elk krijgt de volle 230 V, je kunt ze apart aan en uit zetten, en gaat er één stuk dan werken de andere door', goed: true },
          { t: 'Dan gebruiken ze minder stroom', fout: 'Daar gaat het niet om. Het gaat om apart aan en uit, en doorwerken.' },
          { t: 'Zo is het makkelijker aan te leggen', fout: 'Het gaat om het gebruik: los aan en uit, en de volle spanning.' }], w: 'Ook de lampen van een auto staan parallel.' } }, { hint: 'Bekijk beide schakelingen echt én als schema, en draai in elk een lampje los.' }),
      snap('s-serie-par', 'Snap je het verschil tussen <b>serie</b> en <b>parallel</b>?',
        [[Q('Hoe herken je een parallelschakeling in een schema?', 'Er zit een vertakking in: de stroom kan meerdere wegen', [['Er zitten twee lampjes in', 'Twee lampjes kan ook in serie.'], ['De lampjes staan naast elkaar op het papier', 'Het gaat om de draden, niet om waar ze getekend staan.'], ['Er is een schakelaar', 'Een schakelaar zegt niets over serie of parallel.']], 'Vertakking = parallel.', null, kringBeeld(K_PAR, true, 'Schema met twee lampjes'))],
          [Q('In de keuken gaat de waterkoker kapot. Wat gebeurt er met de koelkast?', 'Die blijft werken, want alles in huis is parallel', [['Die gaat ook uit', 'Dat zou in serie zo zijn. In huis is alles parallel.', 'E17'], ['Die gaat harder koelen', 'Elk apparaat krijgt gewoon 230 V.', 'E5']], 'Parallel: elk apparaat een eigen kring.')]],
        [[toon('Andere manier: bekijk alleen de parallelschakeling, en draai ze om de beurt los.', 'schemabouwer', { kringen: [{ naam: 'Parallel', kring: K_PAR, los: 'Het andere lampje brandt door: eigen kring.' }] })],
         [uitleg('Nog een manier: <b>de weg naar school</b>. Serie: er is maar één weg. Ligt er een boom over de weg, dan komt niemand er meer langs. Parallel: er zijn meerdere wegen naast elkaar. Is er één afgesloten, dan neem je gewoon een andere.', 'serie = één weg<br>parallel = meerdere wegen')]],
        [uitleg('Valt het je op? Twee lampjes in serie branden <b>zwakker</b> dan in parallel. In serie moet de lading door allebei, dus komt er minder stroom. In parallel krijgt elk lampje de volle spanning van de batterij.', 'serie: zwakker · parallel: elk volle spanning')]),
      toon('Teken nu zelf een schema: batterij, schakelaar en lampje <b>in serie</b>. Leg de draden en zet daarna de schakelaar dicht.', 'stroomkring', { kring: K_BOUWSCHEMA, oplossing: [['B.p', 'L.b'], ['L.a', 'S.b'], ['S.a', 'B.n']], sluit: ['S'], weergave: 'schema', wissel: true, misEen: 'E1',
        goed: '<b>Klopt!</b> Eén kring zonder vertakking: <b>serie</b>. De schakelaar staat in serie met het lampje, dus hij zet het lampje aan en uit.' }, { hint: 'Leg de draden en sluit de schakelaar.' }),
      snap('s-schakelaar', 'Snap je hoe een <b>schakelaar</b> in een schema werkt?',
        [[Q('Je wilt één lamp aan en uit zetten. Waar zet je de schakelaar?', 'in serie met die lamp, in dezelfde kring', [['parallel naast de lamp', 'Dan maak je kortsluiting om de lamp heen als je hem dichtdoet.'], ['het maakt niet uit', 'Hij moet in de kring van die lamp.']], 'In serie met wat je wilt schakelen.')],
          [Q('Staat de schakelaar in dit schema open of dicht?', 'open: het lampje is uit', [['dicht: het lampje brandt', 'Het klepje staat schuin: open.', 'E18'], ['dat kun je niet zien', 'Schuin klepje = open, plat = dicht.']], 'Schuin = open.', null, kringBeeld(K_SCHAKEL(false), true, 'Schema met schakelaar'))]],
        [[uitleg('Andere manier: het symbool lijkt op een <b>ophaalbrug</b>. Brug omhoog (schuin): niemand kan erover, de kring is open. Brug omlaag (plat): de weg is dicht, de lading kan erover.', 'schuin = open = uit<br>plat = dicht = aan')],
         [toon('Nog een manier: koppel de symbolen nog eens.', 'koppel', { labels: ['schakelaar', 'lampje', 'stroommeter'], items: [
           { beeld: SYM.schakelaar, alt: 'schakelaar open', goed: 'schakelaar', w: 'Schuin klepje: open.' }, { beeld: SYM.lampje, alt: 'lampje kruis', goed: 'lampje', w: 'Cirkel met kruis.' }, { beeld: SYM.stroommeter, alt: 'meter met A', goed: 'stroommeter', w: 'A = ampère.', mis: 'E19' }] })]],
        [uitleg('In huis heeft elke lamp een eigen schakelaar in zijn eigen tak. Zo zet je de lamp in de keuken uit zonder dat de lamp in de kamer uitgaat. Dat kan alleen omdat alles parallel staat.', 'elke tak een eigen schakelaar')]),
      kaart('Schakelingen', NK.obj.schema(), 'Serie: alles achter elkaar, één kring. Parallel: vertakkingen, elk een eigen kring.', ['Serie: één lampje los = alles uit.', 'Parallel: de rest brandt door.', 'In huis: alles parallel (volle 230 V, apart aan en uit).', 'Schakelaar in serie met wat je wilt schakelen.']),
      baas('De Volger', BAAS.volger, 'Het eerste lampje merkt niet wat het tweede doet.', 'De Volger denkt dat stroom lampje voor lampje langsgaat. Laat zien hoe het echt zit. Fout kost jou niks.', [
        Q('Serie, drie lampjes. Lampje 3 gaat kapot. Lampje 1?', 'gaat ook uit', [['blijft branden, het zit vooraan', 'In serie is er één kring: alles uit.', 'E4'], ['gaat feller branden', 'De kring is onderbroken.', 'E4']], 'Eén kring.'),
        Q('Parallel, twee lampjes. Eén gaat kapot. De ander?', 'blijft even fel branden', [['gaat uit', 'Parallel: eigen kring.', 'E17'], ['gaat feller branden', 'Hij krijgt gewoon dezelfde spanning.', 'E5']], 'Eigen kring.'),
        Q('Welk symbool is een lampje?', 'een cirkel met een kruis', [['een cirkel met een A', 'Dat is een stroommeter.', 'E19'], ['een lange en een korte streep', 'Dat is een batterij.']], 'Kruis.'),
        Q('Welk symbool hoort bij de spanningsmeter?', 'een cirkel met een V', [['een cirkel met een A', 'A is de stroommeter.', 'E19'], ['een cirkel met een M', 'M is een motor.']], 'V = volt.'),
        Q('Waarom staan de lampen van een auto parallel?', 'zodat ze los van elkaar werken', [['zodat ze allemaal tegelijk aangaan', 'Je wilt juist het knipperlicht los aan.'], ['zodat ze minder stroom gebruiken', 'Het gaat om los werken.']], 'Knipperlicht, remlicht, koplamp: los.'),
        Q('Wat is een serieschakeling?', 'alles achter elkaar in één kring, zonder vertakkingen', [['elk apparaat een eigen kring', 'Dat is parallel.'], ['een schakeling met een schakelaar', 'Een schakelaar zegt niets over serie.']], 'Eén kring.'),
        Q('Wat is een parallelschakeling?', 'een schakeling met vertakkingen', [['een schakeling met twee batterijen', 'Het gaat om vertakkingen.'], ['alles achter elkaar', 'Dat is serie.']], 'Vertakt.'),
        Q('Is dit serie of parallel?', 'serie', [['parallel', 'Er is maar één weg rond: geen vertakking.', 'E4'], ['allebei', 'Eén kring zonder vertakking: serie.']], 'Volg de draad met je vinger.', null, kringBeeld(K_SERIE, true, 'Schema met twee lampjes')),
      ]),
    ] },

  { id: 'stroom-redeneren', titel: 'Stroom beredeneren', sub: '§4.3 · serie gelijk, parallel optellen', bol: ob(NK.obj.splitsing()), orgs: ['splitsing'],
    stappen: [
      toon('Drie lampjes <b>parallel</b>, met een meter in elke tak en één bij de batterij. Draai een lampje los en kijk naar álle meters. Voorspel eerst.', 'splitser', {
        modus: 'som', kring: K_PAR3, min: 2,
        inzet: { vraag: 'Je draait lampje 2 los. Wat doen lampje 1 en 3?', keuzes: [{ t: 'ze branden even fel door', goed: true }, { t: 'ze gaan feller branden', mis: 'E5' }, { t: 'ze gaan ook uit', mis: 'E17' }] },
        verklaar: { vraag: 'Waarom wordt het totaal kleiner als je een lampje losdraait?', opties: [
          { t: 'Elke tak trekt zijn eigen stroom: met een tak minder is de som kleiner', goed: true },
          { t: 'De batterij levert altijd evenveel, dus de andere krijgen meer', fout: 'Dan zouden ze feller worden. De batterij geeft een vaste spanning; de schakeling bepaalt de stroom.', mis: 'E5' },
          { t: 'De stroom raakt op in de losse tak', fout: 'Er raakt niets op. Er loopt gewoon niets meer door die tak.', mis: 'E2' }], w: 'Totaal = de takken bij elkaar opgeteld.' } }, { hint: 'Draai lampjes los en weer vast.' }),
      snap('r-som', 'Snap je hoe de stroom zich <b>splitst</b>?',
        [[Q('Parallel: tak 1 = 0,4 A, tak 2 = 0,6 A. Totale stroomsterkte?', '1,0 A', [['0,6 A', 'Dat is één tak.', 'E9'], ['0,5 A', 'Het gemiddelde. Het is de som.', 'E9'], ['0,2 A', 'Het verschil. Het is optellen.']], '0,4 + 0,6 = 1,0 A.')],
          [Q('Totaal 300 mA. Twee takken: 50 mA en 90 mA. De derde tak?', '160 mA', [['440 mA', 'Je telde alles op. Trek de takken van het totaal af.'], ['300 mA', 'Dat is het totaal.', 'E9'], ['100 mA', 'Een derde klopt alleen bij gelijke lampjes.', 'E9']], '300 − 50 − 90 = 160 mA.')]],
        [[uitleg('Andere manier: <b>kassa’s in de winkel</b>. Bij de ingang komen 30 mensen per minuut binnen. Ze verdelen zich over drie kassa’s: 10, 12 en 8 per minuut. Bij de uitgang komen ze samen: weer 30. Wat binnenkomt, gaat er ook weer uit.', '30 = 10 + 12 + 8<small>totaal = som van de takken</small>')],
         [toon('Nog een manier: vul zelf de ontbrekende meter in.', 'splitser', { modus: 'raad', rondes: 1, mA: true, cellen: 2, sets: [[3, 6], [6, 12], [3, 6, 12], [6, 6, 6]] })]],
        [uitleg('Waar de takken samenkomen, komt alle stroom weer bij elkaar: daar loopt weer het totaal. Een meter op de "rail" tussen twee vertakkingen meet de stroom van alle takken die verderop liggen.', 'splitsen → takken → samenkomen')]),
      toon('Nu jij: welke waarde hoort bij de meter met het <b>?</b>', 'splitser', { modus: 'raad', rondes: 2, mA: true, cellen: 2, sets: [[3, 6], [6, 12], [3, 12], [6, 6, 6], [3, 6, 12], [12, 12, 6]] }, { hint: 'Doe beide rondes.' }),
      snap('r-serie', 'Snap je hoe je een stroomvraag <b>aanpakt</b>?',
        [[Q('Serie, twee lampjes. Vóór lampje 1 meet je 0,25 A. Tussen de lampjes?', '0,25 A', [['0,125 A', 'In serie is de stroom overal gelijk.', 'E2'], ['0,5 A', 'Er komt niets bij.'], ['0 A', 'Er raakt niets op.', 'E2']], 'Serie: overal gelijk.')],
          [Q('Hoe begin je bij een vraag over stroomsterkte?', 'eerst kijken: serie of parallel?', [['meteen alles optellen', 'Optellen doe je alleen bij parallel.', 'E9'], ['alle meters zijn altijd gelijk', 'Alleen in serie.', 'E9']], 'Serie: gelijk. Parallel: optellen.')]],
        [[toon('Andere manier: meet zelf in een serieschakeling.', 'meterplek', { kring: K_SERIE2M, meter: 'A', min: 3, plekken: [{ id: 'P1', label: 'vóór lampje 2' }, { id: 'P2', label: 'tussen de lampjes' }, { id: 'P3', label: 'ná lampje 1' }], uitkomst: 'Serie: overal hetzelfde.' })],
         [uitleg('Nog een manier: een stappenplan. <b>1.</b> Is er een vertakking? <b>2.</b> Nee: serie, overal dezelfde stroom. <b>3.</b> Ja: parallel, het totaal is de som van de takken. Ontbreekt er een tak? Totaal min de andere takken.', '1. vertakking?<br>2. nee → overal gelijk<br>3. ja → optellen')]],
        [uitleg('De batterij levert een <b>vaste spanning</b>, geen vaste stroom. Hoeveel stroom er loopt, bepaalt de schakeling. Daarom stijgt het totaal als je een tak bijplaatst, en daalt het als je er één losdraait.', 'vaste spanning · de schakeling bepaalt de stroom')]),
      toon('Laatste klus: ergens zit een <b>kapot snoertje</b>. Kijk welke lampjes nog branden, en tik op de draad die stuk is.', 'splitser', { modus: 'kapot', rondes: 2, cellen: 2, misKapot: 'E22', sets: [[6, 6, 6]] }, { hint: 'Vind beide kapotte snoertjes.' }),
      kaart('Stroom beredeneren', NK.obj.splitsing(), 'Serie: overal dezelfde stroom. Parallel: totaal = som van de takken.', ['Eerst: is er een vertakking?', 'Ontbrekende tak: totaal min de andere takken.', 'Kapot in een tak: alleen die tak uit.', 'Kapot in het onvertakte deel: alles uit.']),
      baas('De Constante Kraan', BAAS.kraan, 'Een batterij geeft altijd evenveel stroom, hoe je de lampjes ook schakelt.', 'De Constante Kraan denkt dat er altijd evenveel stroom uit de batterij komt. Versla hem met redeneren. Fout kost jou niks.', [
        Q('Parallel, drie gelijke lampjes, totaal 1,5 A. Stroom door één lampje?', '0,5 A', [['1,5 A', 'Dat is het totaal.', 'E9'], ['4,5 A', 'Je vermenigvuldigde. Verdeel over drie.']], '1,5 : 3 = 0,5 A.'),
        Q('Je draait in een parallelschakeling een lampje los. Het totaal ...', 'wordt kleiner', [['blijft gelijk', 'De batterij levert geen vaste stroom.', 'E5'], ['wordt groter', 'Er doet een tak minder mee.', 'E5']], 'Minder takken, kleinere som.'),
        Q('Totaal 0,9 A. Tak 1: 0,3 A, tak 2: 0,2 A. Tak 3?', '0,4 A', [['0,9 A', 'Dat is het totaal.', 'E9'], ['1,4 A', 'Aftrekken, niet optellen.']], '0,9 − 0,3 − 0,2 = 0,4 A.'),
        Q('Serie: overal 0,2 A. Je zet er een lampje bij. De stroom ...', 'wordt kleiner, maar is nog steeds overal gelijk', [['blijft 0,2 A', 'Meer lampjes in serie houden meer tegen.', 'E5'], ['wordt na elk lampje kleiner', 'In serie is het overal gelijk.', 'E2']], 'Meer weerstand, minder stroom.'),
        Q('Kapot snoertje in het onvertakte deel. Wat gebeurt er?', 'alle lampjes gaan uit', [['alleen het eerste lampje gaat uit', 'Door het onvertakte deel komt alle stroom.', 'E4'], ['niks', 'Alle stroom gaat door dat stuk.']], 'Alles uit.'),
        Q('Kapot snoertje in één tak. Wat gebeurt er?', 'alleen het lampje in die tak gaat uit', [['alles gaat uit', 'De andere takken hebben een eigen kring.', 'E22'], ['de andere gaan feller', 'Ze krijgen dezelfde spanning.', 'E5']], 'Alleen die tak.'),
        Q('Wat levert een batterij constant?', 'spanning', [['stroom', 'De stroom hangt af van de schakeling.', 'E5'], ['lading', 'Lading zit al in de draden.', 'E16']], 'Vaste spanning.'),
        Q('Parallel: in welk deel is de stroom het grootst?', 'in het onvertakte deel bij de batterij', [['in de eerste tak', 'Elke tak heeft maar een deel.', 'E9'], ['overal gelijk', 'Dat is serie.', 'E9']], 'Daar komt alles langs.'),
      ]),
    ] },
];

/* ---------- gids, merk en inzichtkaarten ---------- */
const MERK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 L5 13 H11 L10 22 L19 10 H13 Z" fill="#fff"/></svg>`;
const FORMULE = [['tijd', 't', 'seconde (s)', '1 min = 60 s'], ['lengte', 'l', 'meter (m), centimeter (cm)', '1 m = 100 cm'], ['massa', 'm', 'kilogram (kg), gram (g)', '1 kg = 1000 g'], ['gewicht', 'F', 'newton (N)', 'op aarde 1 kg ≈ 10 N'],
  ['volume', 'V', 'cm³, dm³, L, mL', '1 L = 1 dm³ = 1000 cm³ · 1 mL = 1 cm³ · blok l × b × h · cilinder π × r × r × h · eind − begin'], ['dichtheid', 'ρ', 'g/cm³', 'ρ = m : V'],
  ['stroomsterkte', 'I', 'ampère (A), milliampère (mA)', '1 A = 1000 mA'], ['spanning', 'U', 'volt (V), millivolt (mV)', '1 V = 1000 mV · in serie optellen']];
const tabelKaart = (rijen) => h('div', { class: 'tabwrap' }, h('table', { class: 'tab' }, h('tr', {}, ['Grootheid', 'Symbool', 'Eenheid', 'Formule / omrekenen'].map(x => h('th', {}, x))), rijen.map(r => h('tr', {}, r.map(x => h('td', {}, x))))));
function labStrook(S) {
  const al = [...H1, ...H2, ...H4], n = al.filter(l => S.sterren[l.id]).length;
  return h('div', { class: 'p', style: 'margin:0 0 4px', html: `Lab-logboek: <b>${Object.keys(S.orgs).filter(k => LOGBOEK[k]).length} van ${Object.keys(LOGBOEK).length}</b> ontdekkingen · lessen gehaald: <b>${n} van ${al.length}</b>` });
}

/* =========================================================================
   START
   ========================================================================= */
Speelles.start({
  key: 'storm_nk_tw1_speelles_v1',
  titel: 'Natuurkunde Speelles',
  merk: 'Natuurkunde TW1', merkIcoon: MERK, gids: NK.gids,
  hallo: { titel: 'Hoi Storm! Welkom in het lab.', tekst: 'Je voorspelt eerst, dan kijk je, dan verklaar je. Een foute voorspelling is geen fout: het is een vondst voor je valkuilen-album.' },
  loop: '<span><b>Voorspel</b> en zet in</span><span><b>Bekijk</b> wat er gebeurt</span><span><b>Verklaar</b> het verschil</span><span><b>Snap je het?</b> Bewijs het</span><span>Baas verslaan</span>',
  niveaus: [[0, 'Labstagiair'], [80, 'Waarnemer'], [200, 'Meetmeester'], [350, 'Dichtheidsdetective'], [520, 'Stroomkringbouwer'], [720, 'Schakel-expert'], [950, 'Labhoofd']],
  valkuilen: VALKUILEN,
  organismen: LOGBOEK,
  albumNaam: 'Lab-logboek', albumIcoon: ob(NK.obj.maatcilinder()),
  albumTekst: 'Elke les levert één ontdekking op voor je lab-logboek.',
  kaartBoven: labStrook,
  expedities: [
    { id: 'h1', titel: 'H1 Natuurwetenschappen', sub: '§1.1 en §1.2 · vakken, onderzoeken, meten', bol: ob(NK.obj.rontgenfoto()), lessen: H1 },
    { id: 'h2', titel: 'H2 Stoffen', sub: '§2.3 en §2.4 · massa, volume, dichtheid', bol: ob(NK.obj.blokje()), lessen: H2 },
    { id: 'h4', titel: 'H4 Elektriciteit', sub: '§4.1 tot en met §4.3 · kring, stroom, spanning, schakelingen', bol: ob(NK.obj.lampje()), lessen: H4 },
  ],
  inzicht: [
    { id: 'formule', titel: 'Mijn formulekaart', icoon: ob(NK.obj.trap()), dicht: 'Haal Massa, Volume, Dichtheid en Omrekenen',
      tekst: 'De formulekaart die bij je leerdoelenkaart hoort. Omrekenen: grote eenheid naar kleine = × 1000, kleine naar grote = : 1000.',
      open: S => ['massa-gewicht', 'volume', 'dichtheid', 'omrekenen'].every(id => S.sterren[id]),
      bouw: s => s.append(tabelKaart(FORMULE)) },
    { id: 'stroom', titel: 'De stroomkaart', icoon: ob(NK.obj.splitsing()), dicht: 'Haal Stroomsterkte, Spanning, Schakelingen en Stroom beredeneren',
      tekst: 'Alles over elektriciteit op één kaart.',
      open: S => ['stroomsterkte', 'spanning', 'schakelingen', 'stroom-redeneren'].every(id => S.sterren[id]),
      bouw: s => s.append(h('div', { class: 'inzicht' }, [
        ['Gesloten kring', 'Van de ene pool, door het lampje, naar de andere pool.', NK.obj.lampje()],
        ['Stroomsterkte (A)', 'Lading per seconde. Stroommeter IN de kring. Serie: overal gelijk.', NK.obj.stroommeter()],
        ['Spanning (V)', 'De duw. Spanningsmeter ERNAAST. Batterijen in serie: optellen.', NK.obj.ballon()],
        ['Parallel', 'Totaal = som van de takken. In huis staat alles parallel.', NK.obj.splitsing()],
        ['Veilig', 'Tot 24 V veilig. 230 V levensgevaarlijk. Adapter: 230 V naar laag.', NK.obj.stopcontact()],
      ].map(([b, t, svg]) => h('div', { class: 'tree' }, h('div', { html: ob(svg) }), h('div', {}, h('b', {}, b), h('span', {}, t)))))) },
  ],
  terug: { href: '../', label: 'Oefen-app', sub: 'Alle onderwerpen oefenen' },
  spreekFilter: s => s.replace(/cm³/g, 'kubieke centimeter').replace(/dm³/g, 'kubieke decimeter').replace(/ρ/g, 'dichtheid').replace(/π/g, 'pi').replace(/−/g, 'min').replace(/ mA\b/g, ' milliampère').replace(/ mV\b/g, ' millivolt').replace(/(\d) A\b/g, '$1 ampère').replace(/(\d) V\b/g, '$1 volt'),
});
