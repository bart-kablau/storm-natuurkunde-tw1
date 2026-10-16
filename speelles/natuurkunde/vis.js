'use strict';
/* =========================================================================
   NATUURKUNDE: bouwstenen (canoniek: tools/speelles-engine/natuurkunde/vis.js)
   Elke bouwsteen: VIS.naam = (podium, p, api) => opruim?   (contract: engine.js)
   Familie B: Voorspel -> Bekijk -> Verklaar. Signatuur = voorspel-inzet:
     - p.inzet {vraag, keuzes:[{t, goed, mis}]} zet eerst een voorspelling vast;
       een foute voorspelling spot de valkuil (mis) = een kaart in het album.
     - p.verklaar {vraag, opties:[{t, goed, fout, mis}], w} na de waarneming;
       XP komt voor het verklaren (8 in één keer, anders 3), niet voor gokken.
   Vereist engine.js en natuurkunde/teken.js (NK). Alles in deze IIFE is lokaal;
   alleen VIS.<naam> wordt toegevoegd. Inhoud komt altijd via p.
   ========================================================================= */
(() => {
  /* ---------- gedeelde hulpjes ---------- */
  const fbEl = () => h('div', { class: 'feedback', 'aria-live': 'polite' });
  const zegNK = (el, soort, html) => { el.className = 'feedback ' + soort; el.innerHTML = html; };
  const svgVan = (inhoud, viewBox = '0 0 100 100', extra = '') => `<svg viewBox="${viewBox}" class="svgvis" aria-hidden="true" ${extra}>${inhoud}</svg>`;
  const kloon = o => JSON.parse(JSON.stringify(o));
  const g2 = (x, d) => NK.getal(x, d);
  const naarBeeld = el => { try { if (el && el.scrollIntoView && !minderBeweging()) setTimeout(() => el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 60); } catch (e) {} };
  const voegToe = (ouder, el) => { ouder.append(el); naarBeeld(el); return el; };
  const knopje = (label, fn, cls = '') => { const b = h('button', { class: 'knop klein ' + cls, type: 'button' }, label); b.addEventListener('click', fn); return b; };
  let defsKlaar = false;
  const defs = () => { if (!defsKlaar) { nkDefs(); defsKlaar = true; } };

  /* voorspel-inzet: chips, één keuze, daarna vast */
  function inzet(cfg, opVast) {
    const el = h('div', { class: 'nk-inzet' }, h('div', { class: 'nk-inzet-kop' }, h('span', { class: 'nk-fiche', 'aria-hidden': 'true' }, 'XP'), h('span', { html: '<b>Voorspel eerst.</b> ' + cfg.vraag })));
    const chips = h('div', { class: 'chips' }); let keuze = null;
    cfg.keuzes.forEach((k, i) => {
      const b = h('button', { class: 'chip', type: 'button', html: k.t }); b._goed = !!k.goed;
      b.addEventListener('click', () => { if (keuze) return; keuze = k; chips.querySelectorAll('.chip').forEach(c => { c.disabled = c !== b; c.classList.toggle('aan', c === b); }); el.classList.add('vast'); opVast && opVast(k, i); });
      chips.append(b);
    });
    const tip = h('div', { class: 'minis', hidden: true }, 'Je voorspelling staat vast. Fout zitten is winst: dan vind je een valkuil.');
    chips.addEventListener('click', () => { if (keuze) tip.hidden = false; });
    el.append(chips, tip);
    return { el, get keuze() { return keuze; } };
  }
  function oordeel(k, api) {
    if (!k) return '';
    if (k.goed) return '<b>Je voorspelling klopte.</b> ';
    if (k.mis) api.spot(k.mis);
    return '<b>Je voorspelde iets anders. Mooi: nu zie je waar het botst.</b> ';
  }
  /* verklaar: meerkeuze binnen de bouwsteen (klassen nk-optie, zodat de engine-test hem niet als mc ziet) */
  function verklaar(cfg, api, klaar) {
    const el = h('div', { class: 'nk-verklaar' }, h('div', { class: 'nk-verklaar-kop', html: '<span class="nk-vk-label">Verklaar</span> ' + cfg.vraag }));
    const lijst = h('div', { class: 'nk-opties' }), f = fbEl(); let fout = 0, af = false;
    (cfg.vast ? cfg.opties : shuffle(cfg.opties)).forEach(o => {
      const b = h('button', { class: 'nk-optie', type: 'button', html: o.t }); b._goed = !!o.goed;
      b.addEventListener('click', () => {
        if (af || b.disabled) return;
        if (o.goed) { af = true; b.classList.add('goed'); lijst.querySelectorAll('button').forEach(x => x.disabled = true); api.geefXP(fout ? 3 : 8, b); zegNK(f, 'goed', '<b>' + (fout ? 'Ja, zo zit het.' : 'Goed verklaard!') + '</b> ' + (cfg.w || '')); klaar && klaar(); }
        else { fout++; b.classList.add('fout'); b.disabled = true; zegNK(f, 'fout', '<b>Nog niet.</b> ' + (o.fout || 'Kijk nog eens naar wat je zag.')); if (o.mis) api.spot(o.mis); }
      });
      lijst.append(b);
    });
    el.append(lijst, f);
    return el;
  }
  /* afronden: eventueel verklaren, dan klaar */
  function afronden(vis, p, api, extraHtml) {
    if (p.verklaar) voegToe(vis, verklaar(p.verklaar, api, () => api.klaar(p.na)));
    else api.klaar(p.na || extraHtml);
  }

  /* ---------- stroomkring-weergave met bewegende lading-bolletjes ---------- */
  function kringView(def, opts = {}) {
    defs();
    const svg = sv('svg', { viewBox: def.vb || '0 0 320 200', class: 'svgvis nk-kring-svg', role: 'img', 'aria-label': opts.alt || 'Stroomkring' });
    const V = { def, opl: null, schema: !!opts.schema, segs: [], dots: [], raf: 0, laatste: 0, svg, el: h('div', { class: 'nk-kring' }, svg) };
    V.teken = () => {
      V.opl = NK.kring.los(V.def);
      const { s, segs } = NK.kring.markup(V.def, V.opl, { ...opts, schema: V.schema });
      svg.innerHTML = s;
      const laag = svg.querySelector('.nk-dots') || svg.appendChild(sv('g', { class: 'nk-dots' }));
      const hulp = sv('g', { opacity: 0, 'pointer-events': 'none' }); svg.append(hulp);
      V.segs = segs.map(sg => { const p = sv('path', { d: sg.d }); hulp.append(p); let L = 0; try { L = p.getTotalLength(); } catch (e) {} const I = Math.abs(sg.I) < 1e-4 ? 0 : Math.sign(sg.I) * Math.min(Math.abs(sg.I), 3); return { p, I, L }; });
      V.dots = [];
      V.segs.forEach(sg => { if (sg.L < 4) return; const n = Math.max(1, Math.round(sg.L / 14)); for (let k = 0; k < n; k++) { const c = sv('circle', { r: V.schema ? 2.3 : 2.9, class: 'nk-dot' }); laag.append(c); V.dots.push({ c, sg, u: (k + .5) / n }); } });
      plaats(0);
      opts.naTeken && opts.naTeken(V);
    };
    function plaats(dt) {
      V.dots.forEach(d => {
        if (dt) d.u = ((d.u + d.sg.I * 60 * dt / d.sg.L) % 1 + 1) % 1;
        const pt = d.sg.p.getPointAtLength(d.u * d.sg.L); d.c.setAttribute('cx', pt.x.toFixed(1)); d.c.setAttribute('cy', pt.y.toFixed(1));
      });
    }
    const lus = t => { const dt = V.laatste ? Math.min(.05, (t - V.laatste) / 1000) : 0; V.laatste = t; if (!minderBeweging()) plaats(dt); V.raf = requestAnimationFrame(lus); };
    V.start = () => { cancelAnimationFrame(V.raf); V.laatste = 0; V.raf = requestAnimationFrame(lus); };
    V.stop = () => cancelAnimationFrame(V.raf);
    return V;
  }
  const weergaveKnoppen = (V, opNa) => {
    const wrap = h('div', { class: 'chips nk-weergave', role: 'group', 'aria-label': 'Weergave' });
    [['echt', 'Echt'], ['schema', 'Schema']].forEach(([w, l]) => {
      const b = h('button', { class: 'chip' + ((w === 'schema') === V.schema ? ' aan' : ''), type: 'button', 'data-weergave': w }, l);
      b.addEventListener('click', () => { V.schema = w === 'schema'; wrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('aan', c === b)); V.teken(); opNa && opNa(w); });
      wrap.append(b);
    });
    return wrap;
  };
  const meterWaarde = (v, soort, mA, dec) => soort === 'V' ? g2(v, dec ?? 1) + ' V' : (mA ? g2(v * 1000, 0) + ' mA' : g2(v, dec ?? 2) + ' A');

  /* =========================================================================
     STROOMKRING: zelf draadjes leggen tot het lampje brandt (tik twee aansluitingen,
     of sleep van de ene naar de andere). Tik een draad om hem weg te halen, tik de
     schakelaar om hem open of dicht te zetten. Lading-bolletjes zitten overal en
     bewegen alleen in een gesloten kring.
     p.kring (def), p.oplossing [[a,b]...] (voor de test en de hint), p.doel 'aan'|'alle',
     p.weergave 'echt'|'schema', p.wissel (echt/schema-knop), p.losdraai (lampjes los te draaien),
     p.misKort, p.misOpen (alleen spotten als ze het echt fout doet), p.inzet, p.verklaar, p.goed, p.na
     ========================================================================= */
  VIS.stroomkring = (pod, p, api) => {
    const def = kloon(p.kring);
    def.draden = (def.draden || []).map(d => Array.isArray(d) ? { a: d[0], b: d[1], ...(d[2] || {}), vast: true } : { ...d, vast: true });
    const V = kringView(def, { aansluit: p.bouw !== false, draadTik: true, tikbaar: true, schema: p.weergave === 'schema' });
    const f = fbEl(), status = h('div', { class: 'nk-status' }), vis = h('div', { class: 'vis' });
    let gekozen = null, klaarGemeld = false, vast = !p.inzet, iz = null, sleepVan = null, sleepLijn = null, negeerKlik = false;
    const lampen = def.onderdelen.filter(c => c.soort === 'lamp'), B = def.onderdelen.find(c => c.soort === 'batterij');
    const markeer = () => V.svg.querySelectorAll('[data-t]').forEach(t => t.classList.toggle('gekozen', t.dataset.t === gekozen));
    function legDraad(a, b) {
      if (a === b) return;
      if (def.draden.some(d => (d.a === a && d.b === b) || (d.a === b && d.b === a))) return;
      def.draden.push({ a, b, boog: true });
    }
    function diagnose() {
      const zelfde = NK.kring.verbonden(def);
      for (const l of lampen) {
        const aP = zelfde(l.id + '.a', B.id + '.p'), aN = zelfde(l.id + '.a', B.id + '.n'), bP = zelfde(l.id + '.b', B.id + '.p'), bN = zelfde(l.id + '.b', B.id + '.n');
        if ((aP && bP) || (aN && bN)) return '<b>Beide kanten van het lampje zitten aan dezelfde pool.</b> De lading moet <b>van de ene pool</b> door het lampje <b>naar de andere pool</b> kunnen.';
        if ((aP || aN || bP || bN) && !((aP && bN) || (aN && bP))) {
          return '<b>Eén draad is niet genoeg.</b> Kijk naar het lampje: het heeft <b>twee</b> aansluitingen. De lading die erin gaat, moet er aan de andere kant weer uit en terug naar de batterij. Zonder rondje staat alle lading stil.';
        }
      }
      const open = def.onderdelen.filter(c => c.soort === 'schakelaar' && !c.dicht);
      if (open.length) {
        const proef = kloon(def); proef.onderdelen.forEach(c => { if (c.soort === 'schakelaar') c.dicht = true; });
        const o = NK.kring.los(proef);
        if (lampen.some(l => o.lamp[l.id].aan)) { if (p.misOpen) api.spot(p.misOpen); return '<b>Bijna rond!</b> Maar de schakelaar staat <b>open</b>: er zit lucht tussen de twee metalen delen, en lucht is een isolator. Tik op de schakelaar.'; }
      }
      return def.draden.some(d => !d.vast) ? 'Nog geen rondje. Volg met je vinger de weg van de <b>+</b> van de batterij, door het lampje, naar de <b>−</b>.' : (p.start || 'Tik op een aansluiting (oranje rondje) en dan op een andere. Zo leg je een draad.');
    }
    function check() {
      V.teken(); markeer();
      const aan = lampen.filter(l => V.opl.lamp[l.id].aan);
      status.innerHTML = lampen.length === 1 ? (aan.length ? '<b class="aan">Het lampje brandt</b>' : 'Het lampje is uit') : `<b class="${aan.length ? 'aan' : ''}">${aan.length} van de ${lampen.length} lampjes branden</b>`;
      if (V.opl.kort) { zegNK(f, 'fout', '<b>Kortsluiting!</b> De lading gaat door de draad meteen terug naar de batterij, zonder door het lampje. De stroom wordt heel groot en de draad wordt heet. Tik op die draad om hem weg te halen.'); if (p.misKort) api.spot(p.misKort); return; }
      const doelOk = p.doel === 'alle' ? aan.length === lampen.length : aan.length > 0;
      if (doelOk) {
        zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + (p.goed || '<b>Hij brandt!</b> Een <b>gesloten stroomkring</b>: van de ene pool, door het lampje, terug naar de andere pool. Kijk: de lading gaat overal tegelijk rond, ook in de batterij.'));
        if (!klaarGemeld) { klaarGemeld = true; afronden(vis, p, api); }
        return;
      }
      zegNK(f, 'info', diagnose());
    }
    const punt = e => { const pt = V.svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const m = V.svg.getScreenCTM(); return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 }; };
    V.svg.addEventListener('pointerdown', e => {
      const t = e.target.closest('[data-t]'); if (!t || !vast) return;
      sleepVan = t.dataset.t; const [x, y] = NK.kring.bouw(def).pos(sleepVan);
      sleepLijn = sv('line', { x1: x, y1: y, x2: x, y2: y, class: 'nk-sleeplijn' }); V.svg.append(sleepLijn);
      try { V.svg.setPointerCapture(e.pointerId); } catch (x) {}
    });
    V.svg.addEventListener('pointermove', e => { if (!sleepLijn) return; const q = punt(e); sleepLijn.setAttribute('x2', q.x); sleepLijn.setAttribute('y2', q.y); });
    const eindSleep = e => {
      if (!sleepLijn) return; sleepLijn.remove(); sleepLijn = null;
      const doel = document.elementsFromPoint(e.clientX, e.clientY).map(x => x.closest && x.closest('[data-t]')).find(Boolean);
      if (doel && doel.dataset.t !== sleepVan) { legDraad(sleepVan, doel.dataset.t); gekozen = null; negeerKlik = true; setTimeout(() => negeerKlik = false, 50); check(); }
      sleepVan = null;
    };
    V.svg.addEventListener('pointerup', eindSleep); V.svg.addEventListener('pointercancel', () => { if (sleepLijn) sleepLijn.remove(); sleepLijn = null; });
    V.svg.addEventListener('click', e => {
      if (negeerKlik) return;
      if (!vast) { zegNK(f, 'info', 'Zet eerst je voorspelling in, hierboven.'); return; }
      const t = e.target.closest('[data-t]'), d = e.target.closest('[data-draad]'), c = e.target.closest('.nk-tikbaar');
      if (t) { const key = t.dataset.t; if (!gekozen) { gekozen = key; markeer(); zegNK(f, 'info', 'Tik nu op de aansluiting waar de draad heen moet.'); return; } if (gekozen === key) { gekozen = null; markeer(); return; } legDraad(gekozen, key); gekozen = null; check(); return; }
      if (d) { const i = +d.dataset.draad; if (def.draden[i].vast) { zegNK(f, 'info', 'Die draad hoort bij de proef. Haal alleen je eigen draden weg.'); return; } def.draden.splice(i, 1); check(); return; }
      if (c) { const comp = def.onderdelen.find(x => x.id === c.dataset.comp); if (!comp) return; if (comp.soort === 'schakelaar') { comp.dicht = !comp.dicht; check(); } else if (comp.soort === 'lamp' && p.losdraai) { comp.los = !comp.los; check(); } }
    });
    const wis = knopje('Haal mijn draden weg', () => { def.draden = def.draden.filter(d => d.vast); gekozen = null; check(); }, 'zacht');
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', p.start || 'Probeer het nu. Tik op een oranje rondje en daarna op een ander.'); }); vis.append(iz.el); }
    vis.append(V.el, status, h('div', { class: 'vis-knoppen' }, p.wissel ? weergaveKnoppen(V, () => markeer()) : null, p.bouw !== false ? wis : null), f);
    pod.append(vis);
    check(); if (!p.inzet) zegNK(f, 'info', p.start || diagnose()); else zegNK(f, 'info', 'Zet eerst je voorspelling in.');
    V.start();
    return () => V.stop();
  };

  /* =========================================================================
     GATTEST: een materiaal in het gat van de kring klemmen. Brandt het lampje?
     p.materialen [{id, naam, teken (NK.kring.MATERIAAL), geleider, R?, w, mis}]
     p.kring (optioneel, met een onderdeel soort 'gat'), p.vraag, p.verklaar
     ========================================================================= */
  const GAT_KRING = { vb: '0 0 320 200', onderdelen: [
    { id: 'B', soort: 'batterij', x: 90, y: 160, cellen: 2 }, { id: 'L', soort: 'lamp', x: 160, y: 56, label: 'lampje' },
    { id: 'G', soort: 'gat', x: 236, y: 160, label: 'het gat' }],
    draden: [['B.p', 'G.a'], ['G.b', 'L.b', { via: [[292, 160], [292, 56]] }], ['L.a', 'B.n', { via: [[28, 56], [28, 160]] }]] };
  VIS.gattest = (pod, p, api) => {
    const def = kloon(p.kring || GAT_KRING), G = def.onderdelen.find(c => c.soort === 'gat'), L = def.onderdelen.find(c => c.soort === 'lamp');
    const V = kringView(def, {});
    const mats = p.vast ? p.materialen.slice() : shuffle(p.materialen); let k = 0, iz = null;
    const kaart = h('div', { class: 'nk-matkaart' }), f = fbEl(), log = h('div', { class: 'nk-log' }), teller = h('div', { class: 'minis' }), vis = h('div', { class: 'vis' });
    const zet = knopje('Klem hem in het gat', () => klem()); zet.disabled = true;
    const volgende = knopje('Volgende materiaal', () => { k++; volgende.remove(); toonMat(); }, 'zacht');
    function toonMat() {
      const m = mats[k]; G.mat = null; V.teken();
      teller.textContent = `Materiaal ${k + 1} van ${mats.length}`;
      kaart.innerHTML = '';
      kaart.append(h('div', { class: 'nk-mat-ic', html: svgVan(`<rect x="4" y="30" width="92" height="40" rx="12" fill="url(#nk-papier)"/><g transform="translate(50 50) scale(2.6)">${(NK.kring.MATERIAAL[m.teken] || NK.kring.MATERIAAL.koper)()}</g>`) }), h('b', {}, m.naam));
      iz = inzet({ vraag: p.vraag || `Laat <b>${m.naam.toLowerCase()}</b> de stroom door?`, keuzes: [{ t: 'Ja, geleider', goed: m.geleider, mis: m.geleider ? null : m.mis }, { t: 'Nee, isolator', goed: !m.geleider, mis: m.geleider ? m.mis : null }] }, () => { zet.disabled = false; });
      kaart.append(iz.el); zet.disabled = true;
    }
    function klem() {
      const m = mats[k]; if (!iz.keuze || zet.disabled) return; zet.disabled = true;
      G.mat = { naam: m.naam, geleider: m.geleider, R: m.R, teken: m.teken }; V.teken();
      const aan = V.opl.lamp[L.id].aan;
      zegNK(f, iz.keuze.goed ? 'goed' : 'fout', oordeel(iz.keuze, api) + (aan ? '<b>Het lampje brandt:</b> ' : '<b>Het lampje blijft uit:</b> ') + (m.w || ''));
      log.append(h('div', { class: 'nk-logrij ' + (m.geleider ? 'ja' : 'nee') }, h('span', {}, m.naam), h('b', {}, m.geleider ? 'geleider' : 'isolator')));
      if (k < mats.length - 1) voegToe(vis.querySelector('.vis-knoppen'), volgende);
      else afronden(vis, p, api);
    }
    vis.append(V.el, teller, kaart, h('div', { class: 'vis-knoppen' }, zet), f, log);
    pod.append(vis); toonMat(); V.start();
    return () => V.stop();
  };

  /* =========================================================================
     METERPLEK: tik een plek om de meter daar te zetten. Een 'plek' zit IN de draad
     (de stroom gaat erdoorheen), een 'plekOver' zit NAAST een onderdeel.
     p.kring (met plek/plekOver-onderdelen), p.meter 'A'|'V', p.mA,
     p.plekken [{id, label, w?, fout?, mis?}] (fout = verkeerde plek met uitleg),
     p.min (aantal goede plekken), p.inzet, p.uitkomst, p.verklaar
     ========================================================================= */
  VIS.meterplek = (pod, p, api) => {
    const def = kloon(p.kring), soort = p.meter || 'A';
    const plekken = def.onderdelen.filter(c => c.soort === 'plek' || c.soort === 'plekOver');
    plekken.forEach(c => { c.mA = p.mA; c.dec = p.dec; });
    const info = Object.fromEntries((p.plekken || []).map(x => [x.id, x]));
    const V = kringView(def, { plekMarkers: true });
    const gezien = new Map(); let vast = !p.inzet, iz = null, klaarGemeld = false;
    const tabel = h('div', { class: 'nk-metingen' }), f = fbEl(), vis = h('div', { class: 'vis' });
    const goedePlekken = plekken.filter(x => !(info[x.id] || {}).fout);
    function zetMeter(id) {
      plekken.forEach(c => c.inhoud = c.id === id ? soort : null); V.teken();
      const I = info[id] || {}, v = V.opl.meter[id] ?? 0, w = meterWaarde(v, soort, p.mA, p.dec);
      if (I.fout) { zegNK(f, 'fout', `<b>${I.label || 'Deze plek'}: ${V.opl.kort ? 'kortsluiting!' : w}</b> ${I.fout}`); if (I.mis) api.spot(I.mis); return; }
      gezien.set(id, w);
      tabel.innerHTML = ''; goedePlekken.forEach(c => { const x = info[c.id] || {}; tabel.append(h('div', { class: 'nk-meting' + (gezien.has(c.id) ? '' : ' leeg') }, h('span', {}, x.label || c.id), h('b', {}, gezien.get(c.id) || '?'))); });
      zegNK(f, 'info', `<b>${I.label || 'Hier'}:</b> de meter wijst <b>${w}</b> aan. ` + (I.w || ''));
      if (!klaarGemeld && gezien.size >= Math.min(p.min ?? goedePlekken.length, goedePlekken.length)) {
        klaarGemeld = true;
        zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + (p.uitkomst || ''));
        afronden(vis, p, api);
      }
    }
    V.svg.addEventListener('click', e => { const pl = e.target.closest('[data-plek]'); if (!pl) return; if (!vast) { zegNK(f, 'info', 'Zet eerst je voorspelling in.'); return; } zetMeter(pl.dataset.plek); });
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', 'Tik nu op een oranje plek om de meter daar te zetten.'); }); vis.append(iz.el); }
    vis.append(V.el, h('div', { class: 'minis' }, soort === 'A' ? 'Oranje rondje = een plek voor de stroommeter. Tik erop.' : 'Oranje rondje = een plek voor de spanningsmeter. Tik erop.'), tabel, f);
    pod.append(vis); V.teken(); V.start();
    goedePlekken.forEach(c => { const x = info[c.id] || {}; tabel.append(h('div', { class: 'nk-meting leeg' }, h('span', {}, x.label || c.id), h('b', {}, '?'))); });
    if (!p.inzet) zegNK(f, 'info', 'Tik op een oranje plek om de meter daar te zetten.');
    return () => V.stop();
  };

  /* =========================================================================
     BALLONPOMP: spanning = de duw (druk in de ballon), stroomsterkte = hoeveel lading
     per seconde voorbijkomt. De batterijen zijn de pomp: elke batterij in serie duwt
     extra (spanningen tellen op). Het ventiel is de schakelaar: dicht = wel druk, geen stroom.
     p.cel (1,5), p.start (1), p.max (8), p.R (6, het lampje), p.taak 'ontdek'|'doel',
     p.doel {U, cel} (zoveel mogelijk zonder erboven), p.min, p.inzet, p.verklaar
     ========================================================================= */
  VIS.ballonpomp = (pod, p, api) => {
    defs();
    const cel = p.doel?.cel ?? p.cel ?? 1.5, R = p.R ?? 6, max = p.max ?? 8;
    let n = p.start ?? 1, open = p.open ?? false, gezienN = new Set([n]), gezienV = new Set([open]), klaarGemeld = false, vast = !p.inzet, iz = null, raf = 0, fase = 0, laatste = 0;
    const wrap = h('div', { class: 'nk-pomp' }), svg = sv('svg', { viewBox: '0 0 320 230', class: 'svgvis', role: 'img', 'aria-label': 'Ballon en pomp' });
    const f = fbEl(), vis = h('div', { class: 'vis' }), lees = h('div', { class: 'nk-uitlees' });
    const PAD = 'M84 64 H150 C176 64 186 64 206 64 H256 C276 64 282 76 282 96 V178 C282 198 270 206 250 206 H96 C84 206 70 206 70 196';
    function teken() {
      const U = n * cel, I = open ? U / R : 0, rb = Math.min(56, 16 + U * 3.2);
      wrap.dataset.n = n;
      const hoog = 26 * n, top = 200 - hoog;
      let s = `<rect width="320" height="230" rx="16" fill="url(#nk-hout)"/><ellipse cx="110" cy="40" rx="140" ry="40" fill="#fff" opacity=".12"/>`;
      s += `<path d="${PAD}" stroke="#7FA6C2" stroke-width="14" fill="none" stroke-linecap="round" opacity=".55"/><path d="${PAD}" stroke="#DDF1FF" stroke-width="9" fill="none" stroke-linecap="round" opacity=".9"/><path d="${PAD}" stroke="#fff" stroke-width="2" fill="none" opacity=".8" transform="translate(-1 -2)"/>`;
      s += `<g class="nk-pompdots"></g>`;
      /* batterijen (pomp) */
      for (let i = 0; i < n; i++) { const y = 200 - (i + 1) * 26; s += `<g filter="url(#nk-schaduw)"><rect x="52" y="${y + 2}" width="36" height="22" rx="4" fill="url(#nk-batt)"/><rect x="52" y="${y + 2}" width="36" height="7" rx="3" fill="url(#nk-batt-kop)"/><rect x="64" y="${y - 1}" width="12" height="4" rx="1.5" fill="url(#nk-alu)"/><text x="70" y="${y + 20}" font-size="7.5" text-anchor="middle" fill="#fff" font-weight="700">${g2(cel, 1)} V</text></g>`; }
      s += `<path d="M70 ${top} V64 H84" stroke="#D93A3A" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      /* spanningsmeter over de stapel */
      s += `<path d="M48 ${top + 4} H30 V100 M48 196 H30 V140" stroke="#D93A3A" stroke-width="2" fill="none"/><path d="M30 140 V196 H48" stroke="#2E3440" stroke-width="2" fill="none"/>` +
        `<g filter="url(#nk-schaduw)"><rect x="8" y="100" width="44" height="40" rx="6" fill="url(#nk-meter)"/><rect x="13" y="106" width="34" height="14" rx="2" fill="url(#nk-lcd)"/><text x="30" y="116.6" font-size="8.5" text-anchor="middle" fill="#1E2A1A" font-weight="700" font-family="ui-monospace,Consolas,monospace">${g2(U, 1)} V</text><text x="30" y="133" font-size="9" text-anchor="middle" fill="#3D2A00" font-weight="800">V</text></g>`;
      /* ballon = de druk */
      s += `<g class="nk-ballon" style="transform:scale(1);transform-origin:150px 64px"><path d="M150 64 V${64 - 6}" stroke="#A8241A" stroke-width="3"/><ellipse cx="150" cy="${58 - rb * .95}" rx="${rb * .86}" ry="${rb}" fill="url(#nk-ballon)" filter="url(#nk-schaduw)"/><ellipse cx="${150 - rb * .35}" cy="${58 - rb * 1.35}" rx="${rb * .2}" ry="${rb * .32}" fill="#fff" opacity=".5" transform="rotate(18 ${150 - rb * .35} ${58 - rb * 1.35})"/></g>`;
      s += NK.tekst(150, Math.max(14, 58 - rb * 2 - 4), 'druk = spanning', { s: 10 });
      /* ventiel = schakelaar */
      s += `<g class="nk-ventiel" data-ventiel="1" style="cursor:pointer"><rect x="196" y="52" width="22" height="24" rx="5" fill="url(#nk-staal)" filter="url(#nk-schaduw)"/><circle cx="207" cy="44" r="9" fill="url(#nk-rood)"/><path d="M207 44 L${open ? 207 : 216} ${open ? 35 : 44}" stroke="#fff" stroke-width="3" stroke-linecap="round"/><rect x="186" y="30" width="42" height="56" fill="transparent"/></g>` + NK.tekst(207, 98, open ? 'ventiel open' : 'ventiel dicht', { s: 10 });
      /* lampje */
      const gl = Math.min(1.2, (I / .5) ** 2);
      s += `<g transform="translate(282 130) rotate(90)">${I > .03 ? `<circle cx="0" cy="-25" r="${24 + 12 * Math.min(1, gl)}" fill="url(#nk-gloei)" opacity="${Math.min(1, .35 + gl * .6)}"/>` : ''}<circle cx="0" cy="-25" r="12" fill="url(#nk-glas)" stroke="#9CC7E0" stroke-width="1.2"/>${I > .03 ? `<circle cx="0" cy="-25" r="11" fill="#FFE680" opacity="${Math.min(.85, gl * .7)}"/>` : ''}<rect x="-6" y="-14" width="12" height="10" rx="2" fill="url(#nk-alu)"/></g>`;
      /* stroommeter in de buis */
      s += `<g filter="url(#nk-schaduw)"><rect x="150" y="190" width="50" height="32" rx="6" fill="url(#nk-meter)"/><rect x="155" y="195" width="40" height="13" rx="2" fill="url(#nk-lcd)"/><text x="175" y="205" font-size="8.5" text-anchor="middle" fill="#1E2A1A" font-weight="700" font-family="ui-monospace,Consolas,monospace">${g2(I, 2)} A</text><text x="175" y="218" font-size="8.5" text-anchor="middle" fill="#3D2A00" font-weight="800">A</text></g>`;
      svg.innerHTML = s;
      const pad = sv('path', { d: PAD }); const laag = svg.querySelector('.nk-pompdots'); svg.append(sv('g', { opacity: 0 }, pad));
      const L = pad.getTotalLength(), N = Math.round(L / 15);
      wrap._dots = Array.from({ length: N }, (_, k) => { const c = sv('circle', { r: 3, class: 'nk-dot' }); laag.append(c); return { c, u: k / N }; }); wrap._pad = pad; wrap._L = L; wrap._I = I;
      plaatsDots(0);
      lees.innerHTML = `<span>Batterijen: <b>${n}</b> × ${g2(cel, 1)} V</span><span>Spanning: <b>${g2(U, 1)} V</b></span><span>Stroom: <b>${g2(I, 2)} A</b></span>`;
      knopMin.disabled = n <= 1; knopPlus.disabled = n >= max;
      ventielKnop.textContent = open ? 'Doe het ventiel dicht' : 'Zet het ventiel open';
    }
    function plaatsDots(dt) { (wrap._dots || []).forEach(d => { if (dt) d.u = (d.u + wrap._I * 60 * dt / wrap._L) % 1; const pt = wrap._pad.getPointAtLength(d.u * wrap._L); d.c.setAttribute('cx', pt.x.toFixed(1)); d.c.setAttribute('cy', pt.y.toFixed(1)); }); }
    const lus = t => { const dt = laatste ? Math.min(.05, (t - laatste) / 1000) : 0; laatste = t; if (!minderBeweging()) plaatsDots(dt); raf = requestAnimationFrame(lus); };
    function gewijzigd() {
      teken(); gezienN.add(n); gezienV.add(open);
      const U = n * cel;
      if (p.taak !== 'doel') {
        zegNK(f, 'info', open ? `Ventiel open: de ballon duwt de lading rond. <b>${g2(U, 1)} V</b> duw geeft <b>${g2(U / R, 2)} A</b>.` : `Ventiel dicht: de ballon staat strak (<b>${g2(U, 1)} V</b>), maar er stroomt niets: <b>0 A</b>. Spanning zonder stroom kan dus.`);
        if (!klaarGemeld && gezienN.size >= (p.min ?? 3) && gezienV.size >= 2) { klaarGemeld = true; zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + (p.uitkomst || 'Meer batterijen in serie = meer duw = meer spanning. Ventiel dicht = wel spanning, geen stroom.')); afronden(vis, p, api); }
      }
    }
    const knopMin = knopje('− batterij', () => { if (!vast) return; if (n > 1) { n--; gewijzigd(); } }, 'zacht');
    const knopPlus = knopje('+ batterij', () => { if (!vast) return; if (n < max) { n++; gewijzigd(); } }, 'zacht');
    const ventielKnop = knopje('Zet het ventiel open', () => { if (!vast) return; open = !open; gewijzigd(); }, 'zacht');
    svg.addEventListener('click', e => { if (e.target.closest('[data-ventiel]')) ventielKnop.click(); });
    const check = p.taak === 'doel' ? knopje('Check', () => {
      const doelN = Math.floor(p.doel.U / cel + 1e-9), U = n * cel;
      if (n === doelN) { zegNK(f, 'goed', `<b>Ja!</b> ${n} × ${g2(cel, 1)} V = <b>${g2(U, 1)} V</b>. ` + (Math.abs(U - p.doel.U) < 1e-9 ? 'Precies goed.' : `Precies ${g2(p.doel.U, 1)} V kan niet (${g2(p.doel.U, 1)} : ${g2(cel, 1)} = ${g2(p.doel.U / cel, 1)}). Eén batterij meer geeft ${g2((n + 1) * cel, 1)} V: te veel voor het lampje.`)); if (!klaarGemeld) { klaarGemeld = true; check.disabled = true; afronden(vis, p, api); } }
      else if (U > p.doel.U) { zegNK(f, 'fout', `<b>${g2(U, 1)} V is meer dan ${g2(p.doel.U, 1)} V.</b> Dan brandt het lampje door. Haal er een batterij af.`); if (p.misBoven) api.spot(p.misBoven); }
      else zegNK(f, 'fout', `<b>${g2(U, 1)} V.</b> Er kan nog een batterij bij zonder dat je boven de ${g2(p.doel.U, 1)} V komt.`);
    }) : null;
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', p.taak === 'doel' ? `Stapel nu de batterijen van ${g2(cel, 1)} V. Zo dicht mogelijk bij ${g2(p.doel.U, 1)} V, maar niet erboven.` : 'Probeer nu: meer of minder batterijen, en het ventiel open en dicht.'); }); vis.append(iz.el); }
    wrap.append(svg);
    vis.append(wrap, lees, h('div', { class: 'vis-knoppen' }, knopMin, knopPlus, p.ventiel === false ? null : ventielKnop, check), f);
    pod.append(vis); teken(); raf = requestAnimationFrame(lus);
    zegNK(f, 'info', p.inzet ? 'Zet eerst je voorspelling in.' : (p.taak === 'doel' ? `Stapel batterijen van ${g2(cel, 1)} V tot zo dicht mogelijk bij ${g2(p.doel.U, 1)} V, niet erboven. Druk dan op Check.` : 'Zet het ventiel open en dicht, en stapel batterijen.'));
    return () => cancelAnimationFrame(raf);
  };

  /* =========================================================================
     SCHEMABOUWER: dezelfde schakeling als echte opstelling en als schakelschema
     (knop Echt/Schema). Tik een lampje om het los te draaien.
     p.kringen [{naam, kring, los (uitleg na losdraaien), vast?}], p.start 'echt'|'schema',
     p.inzet, p.verklaar ; klaar = elke schakeling in beide weergaven gezien en een lampje losgedraaid
     ========================================================================= */
  VIS.schemabouwer = (pod, p, api) => {
    const K = p.kringen.map(k => ({ ...k, def: kloon(k.kring), weergaven: new Set(), losGedaan: false }));
    let i = 0, vast = !p.inzet, iz = null, klaarGemeld = false;
    const V = kringView(K[0].def, { tikbaar: true, schema: p.start === 'schema' });
    const f = fbEl(), vis = h('div', { class: 'vis' }), status = h('div', { class: 'nk-status' });
    const kies = h('div', { class: 'chips' }, K.length > 1 ? K.map((k, j) => { const b = h('button', { class: 'chip' + (j === 0 ? ' aan' : ''), type: 'button', 'data-kring': j }, k.naam); b.addEventListener('click', () => { i = j; kies.querySelectorAll('.chip').forEach(c => c.classList.toggle('aan', c === b)); V.def = K[i].def; ververs(); }); return b; }) : null);
    function ververs() {
      V.teken(); K[i].weergaven.add(V.schema ? 'schema' : 'echt');
      const lampen = K[i].def.onderdelen.filter(c => c.soort === 'lamp'), aan = lampen.filter(l => V.opl.lamp[l.id].aan).length;
      status.innerHTML = `<b>${K[i].naam}</b>: ${aan} van de ${lampen.length} lampjes branden`;
      if (!klaarGemeld && K.every(k => k.weergaven.size >= 2 && k.losGedaan)) { klaarGemeld = true; zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + (p.uitkomst || 'Je hebt beide schakelingen bekeken, echt en als schema.')); afronden(vis, p, api); }
    }
    V.svg.addEventListener('click', e => {
      const c = e.target.closest('.nk-tikbaar'); if (!c) return;
      if (!vast) { zegNK(f, 'info', 'Zet eerst je voorspelling in.'); return; }
      const comp = K[i].def.onderdelen.find(x => x.id === c.dataset.comp); if (!comp) return;
      if (comp.soort === 'lamp') { comp.los = !comp.los; if (comp.los) K[i].losGedaan = true; }
      else if (comp.soort === 'schakelaar') comp.dicht = !comp.dicht;
      V.teken();
      const lampen = K[i].def.onderdelen.filter(x => x.soort === 'lamp'), aan = lampen.filter(l => V.opl.lamp[l.id].aan).length;
      if (comp.soort === 'lamp') zegNK(f, comp.los ? 'info' : 'goed', comp.los ? (K[i].los || '') + ` Nu branden er ${aan} van de ${lampen.length}.` : 'Weer vastgedraaid.');
      ververs();
    });
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', 'Tik nu op een lampje om het los te draaien. Wissel ook tussen echt en schema.'); }); vis.append(iz.el); }
    vis.append(kies, V.el, status, weergaveKnoppen(V, () => ververs()), f);
    pod.append(vis); ververs(); V.start();
    if (!p.inzet) zegNK(f, 'info', 'Tik op een lampje om het los te draaien. Wissel ook tussen echt en schema.');
    return () => V.stop();
  };

  /* =========================================================================
     SPLITSER: parallelschakeling met meters in elke tak en in het onvertakte deel.
     p.modus 'som' (lampjes losdraaien, totaal = som), 'raad' (ontbrekende meter invullen)
            of 'kapot' (welke draad is stuk?); p.Rs, p.cellen, p.mA, p.rondes, p.inzet, p.verklaar
     ========================================================================= */
  VIS.splitser = (pod, p, api) => {
    const modus = p.modus || 'som', f = fbEl(), vis = h('div', { class: 'vis' }), som = h('div', { class: 'nk-som' }), vraag = h('div', { class: 'nk-af-vraag' });
    let V = null, ronde = 0, toggles = 0, vast = !p.inzet, iz = null, klaarGemeld = false, eersteFout = true;
    const fmtI = v => p.mA ? g2(v * 1000, 0) + ' mA' : g2(v, 2) + ' A';
    function somTekst() {
      const t = V.def.onderdelen.filter(c => /^A\d$/.test(c.id)).map(c => V.opl.meter[c.id] || 0), tot = V.opl.meter.AT || 0;
      som.innerHTML = t.map((x, j) => `<span>tak ${j + 1}: <b>${fmtI(x)}</b></span>`).join('<i>+</i>') + `<i>=</i><span class="tot">totaal: <b>${fmtI(tot)}</b></span>`;
    }
    function nieuwe() {
      if (modus === 'som') { V = kringView(p.kring ? kloon(p.kring) : NK.parallelDef({ Rs: p.Rs || [6, 6, 6], cellen: p.cellen ?? 4, mA: p.mA }), { tikbaar: true }); return; }
      const opties = p.sets || [[4, 6], [6, 12], [4, 12], [6, 6, 6], [4, 6, 12], [12, 12, 6]];
      const Rs = pick(opties), def = NK.parallelDef({ Rs, cellen: p.cellen ?? 4, mA: p.mA, meters: modus === 'raad' });
      if (modus === 'kapot') {
        const kand = def.draden.map((d, j) => j).filter(j => { const d = def.draden[j]; return !(/^J\d\.k$/.test(d.a) && /^J\d\.k$/.test(d.b)) && !(/^K\d\.k$/.test(d.a) && /^K\d\.k$/.test(d.b)); });
        const j = pick(kand); def.draden[j].kapot = true; def._kapot = j;
      }
      V = kringView(def, { draadTik: modus === 'kapot', tikbaar: false });
    }
    const patroon = d => { const o = NK.kring.los(d); return d.onderdelen.filter(c => c.soort === 'lamp').map(l => o.lamp[l.id].aan ? 1 : 0).join(''); };
    function toonRonde() {
      if (V) { V.stop(); V.el.remove(); }
      nieuwe(); vis.insertBefore(V.el, vis.firstChild.nextSibling || null);
      if (modus === 'som') { V.teken(); somTekst(); V.start(); return; }
      if (modus === 'raad') {
        const meters = V.def.onderdelen.filter(c => c.soort === 'meterA'), weg = pick(meters); weg.verborgen = true; V.teken(); V.start();
        const goed = V.opl.meter[weg.id], takken = meters.filter(c => c.id !== 'AT').map(c => V.opl.meter[c.id]), tot = V.opl.meter.AT;
        let fout = weg.id === 'AT' ? [[takken[0], 'Dat is één tak. In het onvertakte deel komen <b>alle</b> takken samen: tel ze op.', 'E9'], [Math.max(...takken) * takken.length + .5, 'Te veel: tel gewoon de takken bij elkaar op.'], [takken.reduce((a, b) => a + b, 0) / takken.length, 'Dat is het gemiddelde. Het totaal is de <b>som</b> van de takken.', 'E9']]
          : [[tot, 'Dat is het totaal. Door één tak gaat maar een deel van de stroom.', 'E9'], [tot + takken.filter((x, j) => meters.filter(c => c.id !== 'AT')[j].id !== weg.id).reduce((a, b) => a + b, 0), 'Je telde op. Bij een ontbrekende tak trek je de andere takken van het totaal <b>af</b>.'], [takken.filter((x, j) => meters.filter(c => c.id !== 'AT')[j].id !== weg.id)[0], 'Dat geldt alleen als de lampjes gelijk zijn. Reken het uit: totaal min de andere takken.', 'E9']];
        const gezienW = new Set([goed.toFixed(4)]); fout = fout.filter(([w]) => { const k = w.toFixed(4); if (gezienW.has(k) || w <= 0) return false; gezienW.add(k); return true; });
        vraag.innerHTML = '';
        vraag.append(h('div', { class: 'nk-vraagtekst', html: `Ronde ${ronde + 1} van ${p.rondes ?? 2}. Wat wijst de meter met het <b>?</b> aan?` }));
        const chips = h('div', { class: 'chips' });
        shuffle([[goed, null, null, true], ...fout]).forEach(([w, uitleg, mis, ok]) => {
          const b = h('button', { class: 'chip', type: 'button' }, fmtI(w)); b._goed = !!ok;
          b.addEventListener('click', () => {
            if (ok) { b.classList.add('gedaan'); chips.querySelectorAll('.chip').forEach(c => c.disabled = true); weg.verborgen = false; V.teken(); api.geefXP(eersteFout ? 4 : 2, b); zegNK(f, 'goed', `<b>Ja, ${fmtI(goed)}.</b> ` + (weg.id === 'AT' ? 'Het totaal is de som van de takken.' : 'Totaal min de andere takken.')); volgendeRonde(); }
            else { eersteFout = false; b.classList.add('fout'); b.disabled = true; zegNK(f, 'fout', '<b>Nog niet.</b> ' + uitleg); if (mis) api.spot(mis); }
          });
          chips.append(b);
        });
        vraag.append(chips); somTekst(); som.hidden = true;
        return;
      }
      /* kapot */
      V.teken(); V.start();
      const echt = patroon(V.def);
      vraag.innerHTML = '';
      vraag.append(h('div', { class: 'nk-vraagtekst', html: `Ronde ${ronde + 1} van ${p.rondes ?? 2}. Er zit ergens een <b>kapot snoertje</b>. ${echt.includes('1') ? 'Sommige lampjes branden nog.' : 'Alle lampjes zijn uit.'} Tik op de draad die stuk is.` }));
      V.svg.querySelectorAll('[data-draad]').forEach(el => { const j = +el.dataset.draad; const proef = kloon(V.def); proef.draden.forEach(d => d.kapot = false); proef.draden[j].kapot = true; el._goed = patroon(proef) === echt && j !== -1; });
      const klikKapot = e => {
        const el = e.target.closest('[data-draad]'); if (!el) return;
        const j = +el.dataset.draad, proef = kloon(V.def); proef.draden.forEach(d => d.kapot = false); proef.draden[j].kapot = true;
        if (patroon(proef) === echt) { V.svg.removeEventListener('click', klikKapot); api.geefXP(eersteFout ? 4 : 2, el); zegNK(f, 'goed', echt.includes('1') ? '<b>Gevonden.</b> Hij zit in een <b>tak</b>: alleen het lampje in die tak gaat uit, de andere takken hebben hun eigen kring.' : '<b>Gevonden.</b> Hij zit in het <b>onvertakte deel</b>: daar komt alle stroom langs, dus alles gaat uit.'); volgendeRonde(); }
        else { eersteFout = false; zegNK(f, 'fout', '<b>Dan zou er iets anders gebeuren.</b> ' + (patroon(proef).includes('1') ? 'Een draad in een tak breken laat alleen díe tak uitgaan.' : 'Een draad in het onvertakte deel breken laat álles uitgaan.') + ' Kijk welke lampjes nog branden.'); if (p.misKapot) api.spot(p.misKapot); }
      };
      V.svg.addEventListener('click', klikKapot);
    }
    function volgendeRonde() {
      ronde++;
      if (ronde >= (p.rondes ?? 2)) { if (!klaarGemeld) { klaarGemeld = true; afronden(vis, p, api); } return; }
      vraag.append(knopje('Volgende schakeling', () => { toonRonde(); }));
    }
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', modus === 'som' ? 'Tik nu op een lampje om het los te draaien. Kijk naar alle meters.' : ''); }); vis.append(iz.el); }
    else vis.append(h('div'));
    vis.append(som, vraag, f);
    pod.append(vis);
    toonRonde();
    if (modus === 'som') {
      V.svg.addEventListener('click', e => {
        const c = e.target.closest('.nk-tikbaar'); if (!c) return;
        if (!vast) { zegNK(f, 'info', 'Zet eerst je voorspelling in.'); return; }
        const comp = V.def.onderdelen.find(x => x.id === c.dataset.comp); if (!comp || comp.soort !== 'lamp') return;
        comp.los = !comp.los; toggles++; V.teken(); somTekst();
        const aan = V.def.onderdelen.filter(x => x.soort === 'lamp' && V.opl.lamp[x.id].aan).length;
        zegNK(f, 'info', comp.los ? `Lampje los. De andere ${aan} branden <b>even fel</b> door: elke tak zit rechtstreeks op de batterij. Het <b>totaal</b> wordt kleiner, want er doet een tak minder mee.` : 'Weer vast: het totaal gaat weer omhoog.');
        if (!klaarGemeld && toggles >= (p.min ?? 2)) { klaarGemeld = true; zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + (p.uitkomst || 'Totaal = de takken bij elkaar opgeteld. Een lampje los: de andere branden gewoon door, het totaal daalt.')); afronden(vis, p, api); }
      });
      zegNK(f, 'info', p.inzet ? 'Zet eerst je voorspelling in.' : 'Tik op een lampje om het los te draaien.');
    }
    return () => V && V.stop();
  };

  /* =========================================================================
     AFLEZEN: meetinstrument met een willekeurige schaal (zelf getekend in SVG).
     p.instrument 'maatcilinder' (met meniscus en ooghoogte-schuif; p.dompel = steen erin)
                  of 'meter' (wijzer + meetbereik; p.soort 'A'|'V', p.bereiken, p.schaal)
     p.rondes, p.eenheid ('mL' of 'cm³'), p.misMeniscus, p.misStreepje, p.misDompel, p.misBereik
     ========================================================================= */
  const CILINDERS = [{ max: 50, groot: 10, k: 5 }, { max: 50, groot: 10, k: 10 }, { max: 100, groot: 20, k: 4 }, { max: 100, groot: 10, k: 5 }, { max: 250, groot: 50, k: 5 }, { max: 25, groot: 5, k: 5 }, { max: 200, groot: 50, k: 10 }];
  VIS.aflezen = (pod, p, api) => {
    defs();
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: p.instrument === 'meter' ? '0 0 320 190' : '0 0 320 260', class: 'svgvis nk-afleesbeeld', role: 'img', 'aria-label': p.instrument === 'meter' ? 'Meter met wijzer' : 'Maatcilinder' });
    const vraag = h('div', { class: 'nk-af-vraag' }), f = fbEl();
    let ronde = 0, klaarGemeld = false, eersteFout = true;
    const E = p.eenheid || 'mL';
    function stelVraag(tekst, opties, opGoed) {
      const blok = h('div', { class: 'nk-af-stap' }, h('div', { class: 'nk-vraagtekst', html: tekst }));
      const chips = h('div', { class: 'chips' }); let af = false;
      const zien = new Set();
      shuffle(opties.filter(o => { const k = String(o.t); if (zien.has(k)) return false; zien.add(k); return true; })).forEach(o => {
        const b = h('button', { class: 'chip', type: 'button', html: o.t }); b._goed = !!o.goed;
        b.addEventListener('click', () => {
          if (af || b.disabled) return;
          if (o.goed) { af = true; blok.classList.add('af'); b.classList.add('gedaan'); chips.querySelectorAll('.chip').forEach(c => c.disabled = true); api.geefXP(eersteFout ? 3 : 1, b); zegNK(f, 'goed', '<b>Ja.</b> ' + (o.w || '')); opGoed(); }
          else { eersteFout = false; b.classList.add('fout'); b.disabled = true; zegNK(f, 'fout', '<b>Nog niet.</b> ' + (o.fout || '')); if (o.mis) api.spot(o.mis); }
        });
        chips.append(b);
      });
      blok.append(chips); voegToe(vraag, blok); return blok;
    }
    /* ---- maatcilinder ---- */
    function cilinderRonde() {
      const C0 = pick(p.cilinders || CILINDERS), streep = C0.groot / C0.k, aantal = Math.round(C0.max / streep);
      const top = 26, bodem = 236, x0 = 140, x1 = 196, y = v => bodem - v / C0.max * (bodem - top);
      let s0 = rnd(Math.round(aantal * .28), Math.round(aantal * (p.dompel ? .55 : .82))), niveau = s0 * streep, oogY = 24, opHoogte = false, dompelFase = 0, steenV = 0;
      const tekenC = () => {
        const yv = y(niveau);
        let s = `<rect width="320" height="260" rx="16" fill="url(#nk-hout)"/><ellipse cx="160" cy="250" rx="70" ry="6" fill="#000" opacity=".15"/>`;
        s += `<rect x="${x0 - 14}" y="${bodem}" width="${x1 - x0 + 28}" height="12" rx="5" fill="url(#nk-plastic)"/>`;
        s += `<path d="M${x0 + 2} ${yv - 6} C${x0 + 10} ${yv} ${x1 - 10} ${yv} ${x1 - 2} ${yv - 6} V${bodem - 3} H${x0 + 2}Z" fill="url(#nk-water)"/><path d="M${x0 + 2} ${yv - 6} C${x0 + 10} ${yv} ${x1 - 10} ${yv} ${x1 - 2} ${yv - 6}" stroke="#2F7FB8" stroke-width="1.4" fill="none"/>`;
        if (dompelFase >= 2) s += `<path d="M${(x0 + x1) / 2 - 14} ${bodem - 4} C${(x0 + x1) / 2 - 18} ${bodem - 20} ${(x0 + x1) / 2 + 2} ${bodem - 28} ${(x0 + x1) / 2 + 14} ${bodem - 18} C${(x0 + x1) / 2 + 20} ${bodem - 10} ${(x0 + x1) / 2 + 8} ${bodem - 2} ${(x0 + x1) / 2 - 14} ${bodem - 4}Z" fill="url(#nk-lood)"/>`;
        s += `<rect x="${x0}" y="${top - 12}" width="${x1 - x0}" height="${bodem - top + 12}" rx="5" fill="url(#nk-glas)" stroke="#8CC6E8" stroke-width="2"/><path d="M${x0 + 6} ${top} V${bodem - 6}" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`;
        for (let i = 0; i <= aantal; i++) {
          const v = i * streep, yy = y(v), groot = Math.abs(v / C0.groot - Math.round(v / C0.groot)) < 1e-9, half = C0.k % 2 === 0 && Math.abs((v / (C0.groot / 2)) - Math.round(v / (C0.groot / 2))) < 1e-9;
          s += `<path d="M${x1 - 2} ${yy.toFixed(1)} H${x1 - (groot ? 22 : half ? 15 : 10)}" stroke="#123E66" stroke-width="${groot ? 1.6 : 1}"/>`;
          if (groot && v > 0) s += `<text x="${x1 + 6}" y="${(yy + 4).toFixed(1)}" font-size="11" fill="#123E66" font-weight="700">${NK.kort(v)}</text>`;
        }
        s += NK.tekst(x1 + 6, top - 16, E, { s: 10 });
        /* oog + kijklijn (parallax: schaal voor, vloeistof dieper) */
        if (dompelFase !== 1) {
          const D = 100, d = 26, kruis = oogY + (yv - oogY) * D / (D + d);
          const schijn = Math.max(0, Math.min(C0.max, Math.round((bodem - kruis) / (bodem - top) * C0.max / streep) * streep));
          s += `<path d="M48 ${oogY} L${(x0 + x1) / 2} ${yv}" stroke="#EA580C" stroke-width="1.6" stroke-dasharray="5 4"/><path d="M${x1 - 26} ${kruis.toFixed(1)} H${x1 + 2}" stroke="#EA580C" stroke-width="2.6"/>`;
          s += `<g transform="translate(36 ${oogY})" filter="url(#nk-schaduw)"><path d="M-16 0 C-8 -10 8 -10 16 0 C8 10 -8 10 -16 0Z" fill="#fff" stroke="#5A4A55" stroke-width="1.4"/><circle r="6" fill="#3A6FB0"/><circle r="3" fill="#1A0E14"/><circle cx="2" cy="-2" r="1.3" fill="#fff"/></g>`;
          s += NK.tekst(36, oogY + 24, 'je oog', { s: 9.5 });
          if (!opHoogte) s += NK.tekst(98, Math.min(250, Math.max(14, kruis - 8)), 'je ziet ' + NK.kort(schijn), { s: 10, k: '#C2410C' });
        }
        svg.innerHTML = s;
      };
      const schuif = h('input', { type: 'range', min: 18, max: 246, step: 1, value: oogY, class: 'nk-oog-schuif', 'aria-label': 'Ooghoogte' });
      const schuifWrap = h('div', { class: 'schuif nk-oogrij' }, h('label', {}, 'Ooghoogte'), schuif, h('output', {}, 'hoog'));
      schuif._doel = Math.round(y(niveau));
      const stap2 = () => {
        zegNK(f, 'info', 'Schuif je oog op <b>ooghoogte</b>: precies even hoog als het vlakke deel van het water.');
        voegToe(vraag, schuifWrap); schuif.focus?.();
      };
      schuif.addEventListener('input', () => {
        oogY = +schuif.value; schuifWrap.lastChild.textContent = oogY < y(niveau) - 6 ? 'te hoog' : oogY > y(niveau) + 6 ? 'te laag' : 'goed';
        tekenC();
        if (!opHoogte && Math.abs(oogY - y(niveau)) <= 6) {
          opHoogte = true; schuif.disabled = true; tekenC(); zegNK(f, 'goed', '<b>Op ooghoogte!</b> Nu zie je het vlakke deel zonder scheef kijken.');
          stap3();
        }
      });
      const stap3 = () => {
        const v = niveau;
        stelVraag(p.dompel ? `Wat is de <b>beginstand</b>?` : `Wat lees je af?`, [
          { t: NK.kort(v) + ' ' + E, goed: true, w: p.dompel ? 'Dat is de beginstand. Laat nu de steen zakken.' : 'Op ooghoogte, bij het vlakke deel van het water.' },
          { t: NK.kort(v + streep) + ' ' + E, fout: 'Dat is de rand die langs het glas omhoog kruipt. Lees het <b>vlakke deel</b> af.', mis: p.misMeniscus },
          { t: NK.kort(Math.max(0, v - streep)) + ' ' + E, fout: 'Eén streepje te laag. Tel de streepjes vanaf het getal eronder nog eens.', mis: p.misStreepje },
          streep !== 1 ? { t: NK.kort(Math.round(v / streep) % C0.k + Math.floor(v / C0.groot) * C0.groot) + ' ' + E, fout: `Je telde elk streepje als 1. Hier is één streepje <b>${NK.kort(streep)}</b> ${E}.`, mis: p.misStreepje } : null,
        ].filter(Boolean), () => { if (p.dompel) stap4(); else eindeRonde(); });
      };
      const stap4 = () => {
        const b = knopje('Laat de steen zakken', () => {
          b.remove(); dompelFase = 1; steenV = rnd(3, Math.max(4, Math.min(12, aantal - s0 - 2))) * streep;
          const start = niveau, doel = niveau + steenV, t0 = performance.now(), duur = minderBeweging() ? 1 : 900;
          const anim = t => { const u = Math.min(1, (t - t0) / duur); niveau = start + (doel - start) * (1 - Math.pow(1 - u, 3)); dompelFase = u < 1 ? 1 : 2; tekenC(); if (u < 1) requestAnimationFrame(anim); else { niveau = doel; oogY = Math.round(y(niveau)); tekenC(); stap5(start, doel); } };
          requestAnimationFrame(anim);
        });
        voegToe(vraag, b);
      };
      const stap5 = (begin, eind) => {
        stelVraag('Het water steeg. Wat is nu de <b>eindstand</b>?', [
          { t: NK.kort(eind) + ' ' + E, goed: true, w: 'De eindstand.' },
          { t: NK.kort(eind + streep) + ' ' + E, fout: 'Bovenkant van de bolling. Lees het vlakke deel af.', mis: p.misMeniscus },
          { t: NK.kort(eind - streep) + ' ' + E, fout: 'Eén streepje te laag.', mis: p.misStreepje },
        ], () => stelVraag(`Wat is het <b>volume van de steen</b>?`, [
          { t: NK.kort(eind - begin) + ' cm³', goed: true, w: `eindstand − beginstand = ${NK.kort(eind)} − ${NK.kort(begin)} = <b>${NK.kort(eind - begin)} cm³</b> (1 mL = 1 cm³).` },
          { t: NK.kort(eind) + ' cm³', fout: 'Dat is de eindstand: steen <b>plus</b> water. Trek het water van eerst eraf.', mis: p.misDompel },
          { t: NK.kort(begin) + ' cm³', fout: 'Dat is alleen het water van eerst.', mis: p.misDompel },
          { t: NK.kort(eind + begin) + ' cm³', fout: 'Optellen telt het water dubbel. Het verschil is de steen.', mis: p.misDompel },
        ], eindeRonde));
      };
      tekenC(); svg.dataset.niveau = niveau;
      stelVraag(`Kijk naar de getallen. Hoeveel ${E} is <b>één streepje</b>?`, [
        { t: NK.kort(streep) + ' ' + E, goed: true, w: `Tussen ${NK.kort(C0.groot)} en ${NK.kort(2 * C0.groot)} zitten ${C0.k} stapjes: ${NK.kort(C0.groot)} : ${C0.k} = ${NK.kort(streep)}.` },
        { t: '1 ' + E, goed: streep === 1, fout: `Tel de stapjes tussen twee getallen: ${C0.k} stapjes voor ${NK.kort(C0.groot)} ${E}.`, mis: p.misStreepje },
        { t: NK.kort(C0.groot) + ' ' + E, fout: 'Dat is de afstand tussen twee getallen, niet één streepje.', mis: p.misStreepje },
        { t: NK.kort(2 * streep) + ' ' + E, fout: 'Dat zijn twee stapjes. Tel de ruimtes tussen twee getallen en deel.', mis: p.misStreepje },
      ], stap2);
    }
    /* ---- wijzermeter met meetbereik ---- */
    function meterRonde() {
      const soort = p.soort || 'A', bereiken = p.bereiken || (soort === 'A' ? [5, .5, .05] : [30, 15, 3]), smax = p.schaal || 50, groot = smax / 5;
      const bereik = pick(bereiken), stand = rnd(3, 24) * smax / 25, waarde = stand / smax * bereik;
      const hoek = v => -50 + v / smax * 100;
      const pt = (a, r) => [160 + r * Math.sin(a * Math.PI / 180), 150 - r * Math.cos(a * Math.PI / 180)];
      const lab = b => (soort === 'A' ? NK.kort(b) + ' A' : NK.kort(b) + ' V');
      let s = `<rect width="320" height="190" rx="16" fill="url(#nk-hout)"/><g filter="url(#nk-schaduw)"><rect x="40" y="10" width="240" height="172" rx="16" fill="url(#nk-meter)"/></g><rect x="52" y="20" width="216" height="110" rx="10" fill="#FFFDF4" stroke="#C29210" stroke-width="1.5"/>`;
      for (let i = 0; i <= 25; i++) { const v = i * smax / 25, a = hoek(v), [xa, ya] = pt(a, 96), [xb, yb] = pt(a, i % 5 === 0 ? 82 : 88); s += `<path d="M${xa.toFixed(1)} ${ya.toFixed(1)} L${xb.toFixed(1)} ${yb.toFixed(1)}" stroke="#2B1726" stroke-width="${i % 5 === 0 ? 1.8 : 1}"/>`; if (i % 5 === 0) { const [xt, yt] = pt(a, 72); s += `<text x="${xt.toFixed(1)}" y="${(yt + 4).toFixed(1)}" font-size="11" text-anchor="middle" fill="#2B1726" font-weight="700">${NK.kort(v)}</text>`; } }
      const [xn, yn] = pt(hoek(stand), 98);
      s += `<path d="M160 150 L${xn.toFixed(1)} ${yn.toFixed(1)}" stroke="#D93A3A" stroke-width="2.4" stroke-linecap="round"/><circle cx="160" cy="150" r="6" fill="#2E3440"/><text x="160" y="124" font-size="18" text-anchor="middle" fill="#2B1726" font-weight="700">${soort}</text>`;
      const bus = ['COM', ...bereiken];
      bus.forEach((b, j) => { const x = 70 + j * (180 / (bus.length - 1)); s += `<circle cx="${x}" cy="158" r="8" fill="#2E3440" stroke="#8A939E" stroke-width="2"/><text x="${x}" y="177" font-size="9.5" text-anchor="middle" fill="#3D2A00" font-weight="800">${j ? lab(b) : 'COM'}</text>`; if (j === 0) s += `<path d="M${x} 158 C${x - 10} 186 ${x - 30} 190 ${x - 40} 192" stroke="#2E3440" stroke-width="5" fill="none"/>`; if (b === bereik) s += `<path d="M${x} 158 C${x + 10} 186 ${x + 30} 190 ${x + 40} 192" stroke="#D93A3A" stroke-width="5" fill="none"/><circle cx="${x}" cy="158" r="5" fill="#D93A3A"/>`; });
      svg.innerHTML = s;
      stelVraag('Waar zit het <b>rode snoer</b>? Welk meetbereik is gekozen?', bereiken.map(b => ({ t: lab(b), goed: b === bereik, w: `Het bereik is ${lab(b)}: de hele schaal (${NK.kort(smax)}) is dan ${lab(b)}.`, fout: 'Kijk waar het rode snoer in zit. Het zwarte zit altijd in COM.', mis: p.misBereik })), () => {
        const w = v => (soort === 'A' ? NK.kort(v) + ' A' : NK.kort(v) + ' V');
        stelVraag(`De wijzer staat op <b>${NK.kort(stand)}</b> van de ${NK.kort(smax)}. Hoeveel is het echt?`, [
          { t: w(waarde), goed: true, w: `${NK.kort(stand)} van de ${NK.kort(smax)} = ${NK.kort(stand / smax)} deel van ${lab(bereik)} = <b>${w(waarde)}</b>.` },
          { t: w(stand), fout: `Dat is het getal op de schaal. Bij bereik ${lab(bereik)} is de hele schaal maar ${lab(bereik)}.`, mis: p.misBereik },
          ...bereiken.filter(b => b !== bereik).map(b => ({ t: w(stand / smax * b), fout: `Dat hoort bij bereik ${lab(b)}. Het rode snoer zit in ${lab(bereik)}.`, mis: p.misBereik })),
        ], eindeRonde);
      });
      void groot;
    }
    function eindeRonde() {
      ronde++;
      if (ronde >= (p.rondes ?? 2)) { if (!klaarGemeld) { klaarGemeld = true; afronden(vis, p, api); } return; }
      voegToe(vraag, knopje('Volgende meting', () => { vraag.innerHTML = ''; f.className = 'feedback'; f.innerHTML = ''; start(); }));
    }
    const start = () => (p.instrument === 'meter' ? meterRonde() : cilinderRonde());
    vis.append(svg, vraag, f); pod.append(vis); start();
  };

  /* =========================================================================
     BLOKBOUWER: volume als blokjes van 1 cm³.
     p.modus 'blok': l, b, h met knoppen, p.start [l,b,h], p.inzet (voorspel het aantal blokjes
                     van de startdoos), p.doel {V, h?} (bouw dit volume) ;
     p.modus 'cilinder': p.d, p.hoogte (cm); diameter -> straal -> pi x r x r x h ; p.misDiameter
     ========================================================================= */
  function iso(l, b, hh, { s = 14, ox = 160, oy = 150, top = '#FFE6A6', links = 'url(#nk-batt-kop)', rechts = '#B98A1A', tot = Infinity, rand = '#7A5200' } = {}) {
    const P = (x, y, z) => [ox + (x - y) * s * .87, oy + (x + y) * s * .5 - z * s];
    let out = '', n = 0;
    const cubes = [];
    for (let z = 0; z < hh; z++) for (let y = 0; y < b; y++) for (let x = 0; x < l; x++) cubes.push([x, y, z]);
    cubes.sort((a, c) => (a[2] - c[2]) || ((a[0] + a[1]) - (c[0] + c[1])));
    cubes.forEach(([x, y, z]) => {
      if (n++ >= tot) return;
      const a = P(x, y, z + 1), bR = P(x + 1, y, z + 1), c = P(x + 1, y + 1, z + 1), d = P(x, y + 1, z + 1), e = P(x + 1, y, z), f2 = P(x + 1, y + 1, z), g = P(x, y + 1, z);
      const pts = arr => arr.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
      out += `<polygon points="${pts([a, bR, c, d])}" fill="${top}" stroke="${rand}" stroke-width=".6"/><polygon points="${pts([d, c, f2, g])}" fill="${links}" stroke="${rand}" stroke-width=".6"/><polygon points="${pts([c, bR, e, f2])}" fill="${rechts}" stroke="${rand}" stroke-width=".6"/>`;
    });
    return out;
  }
  function isoDoos(l, b, hh, { s = 14, ox = 160, oy = 150 } = {}) {
    const P = (x, y, z) => [ox + (x - y) * s * .87, oy + (x + y) * s * .5 - z * s], q = a => a[0].toFixed(1) + ' ' + a[1].toFixed(1);
    const A = P(0, 0, 0), Bq = P(l, 0, 0), Cq = P(l, b, 0), D = P(0, b, 0), A2 = P(0, 0, hh), B2 = P(l, 0, hh), C2 = P(l, b, hh), D2 = P(0, b, hh);
    return `<path d="M${q(D)} L${q(Cq)} L${q(Bq)} L${q(B2)} L${q(A2)} L${q(D2)}Z" fill="#fff" fill-opacity=".35" stroke="#5A4A55" stroke-width="1.6" stroke-dasharray="5 4"/><path d="M${q(D2)} L${q(C2)} L${q(B2)} M${q(C2)} L${q(Cq)}" stroke="#5A4A55" stroke-width="1.6" stroke-dasharray="5 4" fill="none"/>` +
      NK.tekst((Bq[0] + Cq[0]) / 2 + 12, (Bq[1] + Cq[1]) / 2 + 12, b + ' cm', { s: 11 }) + NK.tekst((D[0] + Cq[0]) / 2 - 12, (D[1] + Cq[1]) / 2 + 14, l + ' cm', { s: 11 }) + NK.tekst(D[0] - 10, (D[1] + D2[1]) / 2, hh + ' cm', { s: 11, a: 'end' });
  }
  VIS.blokbouwer = (pod, p, api) => {
    defs();
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 220', class: 'svgvis', role: 'img', 'aria-label': 'Blokjes van 1 cm³' }), f = fbEl(), vraag = h('div', { class: 'nk-af-vraag' });
    const ach = `<rect width="320" height="220" rx="16" fill="url(#nk-hout)"/><ellipse cx="160" cy="40" rx="150" ry="36" fill="#fff" opacity=".12"/>`;
    if (p.modus === 'cilinder') {
      const d = p.d ?? pick([4, 6, 8, 10]), hh = p.hoogte ?? pick([5, 10, 12]), r = d / 2, pi = 3.14;
      let eersteFout = true;
      const teken = (toonR, groot) => {
        const R0 = 64, cx = 160, ty = 52, hpx = 110;
        let s = ach + `<ellipse cx="${cx}" cy="${ty + hpx}" rx="${R0}" ry="20" fill="#000" opacity=".12" transform="translate(4 8)"/>`;
        s += `<path d="M${cx - R0} ${ty} V${ty + hpx} A${R0} 20 0 0 0 ${cx + R0} ${ty + hpx} V${ty}Z" fill="url(#nk-alu)"/><path d="M${cx - R0 + 10} ${ty + 8} V${ty + hpx}" stroke="#fff" stroke-width="6" opacity=".6"/><path d="M${cx + R0 - 14} ${ty + 6} V${ty + hpx + 6}" stroke="#6E7783" stroke-width="10" opacity=".25"/>`;
        s += `<ellipse cx="${cx}" cy="${ty}" rx="${R0}" ry="20" fill="#F2F5F8" stroke="#98A2AE" stroke-width="1.5"/>`;
        if (groot) s += `<ellipse cx="${cx}" cy="${ty}" rx="${R0 * 2}" ry="40" fill="#DB5A4A" fill-opacity=".14" stroke="#DB5A4A" stroke-width="2" stroke-dasharray="6 4"/>` + NK.tekst(cx, ty - 46, 'straal = diameter: 4 keer zo groot!', { s: 11, k: '#B42A1E' });
        s += `<path d="M${cx - R0} ${ty} H${cx + R0}" stroke="#2F7FB8" stroke-width="2.4"/>` + NK.tekst(cx - R0 / 2, ty - 6, 'd = ' + d + ' cm', { s: 11, k: '#1E5A86' });
        if (toonR) s += `<path d="M${cx} ${ty} H${cx + R0}" stroke="#EA580C" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${ty}" r="3.4" fill="#EA580C"/>` + NK.tekst(cx + R0 / 2, ty + 16, 'r = ' + NK.kort(r) + ' cm', { s: 11, k: '#C2410C' });
        s += `<path d="M${cx + R0 + 16} ${ty} V${ty + hpx}" stroke="#5A4A55" stroke-width="1.6"/><path d="M${cx + R0 + 11} ${ty} H${cx + R0 + 21} M${cx + R0 + 11} ${ty + hpx} H${cx + R0 + 21}" stroke="#5A4A55" stroke-width="1.6"/>` + NK.tekst(cx + R0 + 22, ty + hpx / 2 + 4, 'h = ' + hh + ' cm', { s: 11, a: 'start' });
        svg.innerHTML = s;
      };
      teken(false, false);
      const vraagStap = (tekst, opties, opGoed) => {
        const blok = h('div', { class: 'nk-af-stap' }, h('div', { class: 'nk-vraagtekst', html: tekst })), chips = h('div', { class: 'chips' }); let af = false;
        shuffle(opties).forEach(o => { const b = h('button', { class: 'chip', type: 'button', html: o.t }); b._goed = !!o.goed; b.addEventListener('click', () => { if (af || b.disabled) return; if (o.goed) { af = true; b.classList.add('gedaan'); chips.querySelectorAll('.chip').forEach(c => c.disabled = true); api.geefXP(eersteFout ? 3 : 1, b); zegNK(f, 'goed', '<b>Ja.</b> ' + (o.w || '')); opGoed(); } else { eersteFout = false; b.classList.add('fout'); b.disabled = true; zegNK(f, 'fout', '<b>Nog niet.</b> ' + o.fout); if (o.mis) api.spot(o.mis); if (o.groot) teken(false, true); } }); chips.append(b); });
        blok.append(chips); voegToe(vraag, blok);
      };
      const V1 = pi * r * r * hh, Vd = pi * d * d * hh;
      vraagStap(`Het blikje is <b>${d} cm</b> breed (dat is de diameter). Wat is de <b>straal</b>?`, [
        { t: NK.kort(r) + ' cm', goed: true, w: 'De straal is de halve diameter: van het midden naar de rand.' },
        { t: d + ' cm', fout: 'Dat is de diameter, dwars door het midden. De straal is de <b>helft</b>.', mis: p.misDiameter, groot: true },
        { t: 2 * d + ' cm', fout: 'Andersom: de straal is kleiner dan de diameter, de helft.', mis: p.misDiameter },
      ], () => {
        teken(true, false);
        vraagStap(`Volume = π × r × r × h. Wat komt eruit? (π ≈ 3,14)`, [
          { t: g2(V1, V1 % 1 ? 1 : 0) + ' cm³', goed: true, w: `3,14 × ${NK.kort(r)} × ${NK.kort(r)} × ${hh} = <b>${g2(V1, 1)} cm³</b>.` },
          { t: g2(Vd, 0) + ' cm³', fout: 'Hier rekende je met de diameter: dan wordt het 4 keer te groot.', mis: p.misDiameter },
          { t: g2(pi * r * hh, 1) + ' cm³', fout: 'Je vergat één keer de straal: het is r × r.' },
          { t: g2(r * r * hh, 0) + ' cm³', fout: 'Je vergat π. Een cirkel is kleiner dan een vierkant van r × r × 4, daarom × 3,14.' },
        ], () => afronden(vis, p, api));
      });
      vis.append(svg, vraag, f); pod.append(vis); return;
    }
    let [l, b, hh] = p.start || [3, 2, 2], gevuld = !p.inzet, vast = !p.inzet, iz = null, klaarGemeld = false, wijzigingen = 0;
    const formule = h('div', { class: 'nk-formule' }), wrap = h('div', { class: 'nk-blokbouw' });
    const tekenB = (tot) => {
      wrap.dataset.dims = [l, b, hh].join(',');
      const s = Math.min(24, 200 / (l + b + hh)), oy = 112 + (hh * s - (l + b) * s * .5) / 2;
      svg.innerHTML = ach + (gevuld ? iso(l, b, hh, { s, oy, tot }) : '') + isoDoos(l, b, hh, { s, oy });
      formule.innerHTML = gevuld ? `lengte × breedte × hoogte = ${l} × ${b} × ${hh} = <b>${l * b * hh} blokjes</b> van 1 cm³ = <b>${l * b * hh} cm³</b>` : `Een doos van ${l} × ${b} × ${hh} cm. Hoeveel blokjes van 1 cm³ passen erin?`;
    };
    const rij = (as, naam) => { const out = h('output', {}, ''); const r = h('div', { class: 'nk-stapper' }, h('span', {}, naam), knopje('−', () => zet(as, -1), 'zacht'), out, knopje('+', () => zet(as, 1), 'zacht')); r.querySelectorAll('button')[0].dataset.as = as; r.querySelectorAll('button')[0].dataset.d = '-1'; r.querySelectorAll('button')[1].dataset.as = as; r.querySelectorAll('button')[1].dataset.d = '1'; r._out = out; return r; };
    const rijen = [rij('l', 'lengte'), rij('b', 'breedte'), rij('h', 'hoogte')];
    const outs = () => { rijen[0]._out.textContent = l + ' cm'; rijen[1]._out.textContent = b + ' cm'; rijen[2]._out.textContent = hh + ' cm'; };
    function zet(as, d) {
      if (!vast || !gevuld) return;
      if (p.doel?.h && as === 'h') { zegNK(f, 'info', `De hoogte moet ${p.doel.h} cm blijven.`); return; }
      if (as === 'l') l = Math.max(1, Math.min(6, l + d)); if (as === 'b') b = Math.max(1, Math.min(6, b + d)); if (as === 'h') hh = Math.max(1, Math.min(6, hh + d));
      wijzigingen++; outs(); tekenB();
      if (!p.doel && !klaarGemeld && wijzigingen >= (p.min ?? 3)) { klaarGemeld = true; afronden(vis, p, api); }
    }
    const check = p.doel ? knopje('Check', () => {
      if (!gevuld) return;
      const V = l * b * hh;
      if (V === p.doel.V && (!p.doel.h || hh === p.doel.h)) { zegNK(f, 'goed', `<b>Ja!</b> ${l} × ${b} × ${hh} = ${V} cm³.`); if (!klaarGemeld) { klaarGemeld = true; check.disabled = true; afronden(vis, p, api); } }
      else zegNK(f, 'fout', `<b>${l} × ${b} × ${hh} = ${V} cm³.</b> ${V > p.doel.V ? 'Te veel.' : 'Te weinig.'} Je zoekt ${p.doel.V} cm³.`);
    }) : null;
    const vul = knopje('Vul de doos met blokjes', () => {
      vul.remove(); gevuld = true; const totaal = l * b * hh; let n = 0;
      const stap = () => { n = Math.min(totaal, n + Math.max(1, Math.ceil(totaal / 14))); tekenB(n); if (n < totaal) setTimeout(stap, minderBeweging() ? 0 : 70); else { tekenB(); zegNK(f, iz && iz.keuze && !iz.keuze.goed ? 'fout' : 'goed', oordeel(iz && iz.keuze, api) + `Eén laag is ${l} × ${b} = ${l * b} blokjes. Er zijn ${hh} lagen: ${l * b} × ${hh} = <b>${totaal} cm³</b>.` + (p.doel ? ` Bouw nu een blok van <b>${p.doel.V} cm³</b>${p.doel.h ? ` met een hoogte van ${p.doel.h} cm` : ''}.` : '')); if (!p.doel) { klaarGemeld = true; afronden(vis, p, api); } else voegToe(vis, h('div', { class: 'nk-stappers' }, rijen, check)); } };
      stap();
    });
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; voegToe(vis.querySelector('.vis-knoppen'), vul); }); vis.append(iz.el); }
    wrap.append(svg); vis.append(wrap, formule, h('div', { class: 'vis-knoppen' }), f);
    pod.append(vis); outs(); tekenB();
    if (!p.inzet) { gevuld = true; tekenB(); vis.append(h('div', { class: 'nk-stappers' }, rijen, check)); }
  };

  /* =========================================================================
     BLOKJESLAB: een blok in gedachten verdelen in blokjes van 1 cm³ (dichtheid = gram per
     blokje), daarna doorzagen (dichtheid blijft), en de stof opzoeken.
     p.blok {l, b, h, m, stof}, p.tabel [[stof, rho]], p.inzet (over doorzagen), p.misHalf, p.verklaar
     ========================================================================= */
  VIS.blokjeslab = (pod, p, api) => {
    defs();
    const B = p.blok, V = B.l * B.b * B.h, rho = B.m / V;
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 220', class: 'svgvis', role: 'img', 'aria-label': 'Blok' }), f = fbEl(), info = h('div', { class: 'nk-formule' }), knoppen = h('div', { class: 'vis-knoppen' });
    const kl = p.kleur || { top: '#F2F5F8', links: 'url(#nk-staal)', rechts: '#7E8792', rand: '#4E5560' };
    const ach = `<rect width="320" height="220" rx="16" fill="url(#nk-hout)"/><ellipse cx="160" cy="40" rx="150" ry="36" fill="#fff" opacity=".12"/>`;
    let fase = 0, iz = null;
    const s = Math.min(26, 170 / (B.l + B.b + B.h));
    const blok = (l, b, hh, ox, oy, grid) => grid ? iso(l, b, hh, { s, ox, oy, ...kl }) : solide(l, b, hh, ox, oy);
    function solide(l, b, hh, ox, oy) {
      const P = (x, y, z) => [ox + (x - y) * s * .87, oy + (x + y) * s * .5 - z * s], pts = arr => arr.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
      return `<polygon points="${pts([P(0, 0, hh), P(l, 0, hh), P(l, b, hh), P(0, b, hh)])}" fill="${kl.top}" stroke="${kl.rand}"/><polygon points="${pts([P(0, b, hh), P(l, b, hh), P(l, b, 0), P(0, b, 0)])}" fill="${kl.links}" stroke="${kl.rand}"/><polygon points="${pts([P(l, b, hh), P(l, 0, hh), P(l, 0, 0), P(l, b, 0)])}" fill="${kl.rechts}" stroke="${kl.rand}"/>`;
    }
    function teken() {
      let t = ach;
      if (fase < 2) { t += fase === 0 ? solide(B.l, B.b, B.h, 160, 150) : blok(B.l, B.b, B.h, 160, 150, true); t += NK.tekst(160, 206, `${B.l} × ${B.b} × ${B.h} cm · ${NK.kort(B.m)} g`, { s: 12 }); if (fase === 1) t += NK.tekst(160, 22, `elk blokje: ${NK.kort(B.m)} : ${V} = ${g2(rho, rho < 10 ? 2 : 1)} g`, { s: 12, k: '#C2410C' }); }
      else { const half = B.l / 2; t += blok(half, B.b, B.h, 100, 150, true) + blok(half, B.b, B.h, 226, 150, true); t += NK.tekst(92, 206, `${NK.kort(B.m / 2)} g · ${V / 2} cm³`, { s: 11 }) + NK.tekst(232, 206, `${NK.kort(B.m / 2)} g · ${V / 2} cm³`, { s: 11 }) + `<path d="M160 30 V200" stroke="#DB5A4A" stroke-width="2" stroke-dasharray="6 4"/>`; }
      svg.innerHTML = t;
    }
    const verdeel = knopje('Verdeel in blokjes van 1 cm³', () => {
      verdeel.remove(); fase = 1; teken();
      info.innerHTML = `${V} blokjes van 1 cm³. In elk blokje: ${NK.kort(B.m)} g : ${V} = <b>${g2(rho, 2)} g</b>. Dat is de <b>dichtheid</b>: <b>${g2(rho, 2)} g/cm³</b> (gram <b>per</b> cm³).`;
      zegNK(f, 'goed', '<b>Dichtheid = de massa van één blokje van 1 cm³.</b> Daarom reken je massa : volume.');
      if (p.inzet) { iz = inzet(p.inzet, () => voegToe(knoppen, zaag)); voegToe(vis, iz.el); vis.append(knoppen); }
      else { vis.append(knoppen); voegToe(knoppen, zaag); }
    });
    const zaag = knopje('Zaag het blok doormidden', () => {
      zaag.remove(); fase = 2; teken();
      info.innerHTML = `Elke helft: ${NK.kort(B.m / 2)} g : ${V / 2} cm³ = <b>${g2(rho, 2)} g/cm³</b>. Massa en volume halveren, de <b>dichtheid blijft</b>.`;
      zegNK(f, iz && iz.keuze && !iz.keuze.goed ? 'fout' : 'goed', oordeel(iz && iz.keuze, api) + 'Elk blokje van 1 cm³ blijft precies hetzelfde blokje, of je nu zaagt of niet. Daarom is dichtheid een <b>stofeigenschap</b>.');
      if (p.tabel) stofVraag(); else afronden(vis, p, api);
    });
    function stofVraag() {
      const blokV = h('div', { class: 'nk-af-stap' }, h('div', { class: 'nk-vraagtekst', html: `Zoek op in de tabel: van welke stof is dit blok? (${g2(rho, 2)} g/cm³)` }));
      const tab = h('div', { class: 'nk-tabel' }, p.tabel.map(([n, r]) => h('span', {}, n, h('b', {}, g2(r, r < 1 || Math.round(r * 100) % 10 ? 2 : 1)))));
      const chips = h('div', { class: 'chips' }); let af = false, fout = 0;
      const juist = p.tabel.reduce((a, c) => Math.abs(c[1] - rho) < Math.abs(a[1] - rho) ? c : a);
      shuffle(p.tabel.slice()).slice(0, 5).concat(p.tabel.slice(0, 5).includes(juist) ? [] : [juist]).filter((x, i, a) => a.indexOf(x) === i).forEach(([n, r]) => {
        const b = h('button', { class: 'chip', type: 'button' }, n); b._goed = n === juist[0];
        b.addEventListener('click', () => { if (af || b.disabled) return; if (n === juist[0]) { af = true; b.classList.add('gedaan'); chips.querySelectorAll('.chip').forEach(c => c.disabled = true); api.geefXP(fout ? 2 : 6, b); zegNK(f, 'goed', `<b>${n}!</b> ${g2(rho, 2)} g/cm³ staat in de tabel bij ${n}. Zo herken je een stof aan zijn dichtheid.`); afronden(vis, p, api); } else { fout++; b.classList.add('fout'); b.disabled = true; zegNK(f, 'fout', `${n} heeft ${g2(r, r < 1 ? 2 : 1)} g/cm³. Dat past niet bij ${g2(rho, 2)}.`); } });
        chips.append(b);
      });
      blokV.append(tab, chips); voegToe(vis, blokV);
    }
    teken(); info.innerHTML = `Een blok van <b>${B.l} × ${B.b} × ${B.h} cm</b> = ${V} cm³, met een massa van <b>${NK.kort(B.m)} g</b>.`;
    vis.append(svg, info, h('div', { class: 'vis-knoppen' }, verdeel), f);
    pod.append(vis);
  };

  /* =========================================================================
     ZINKDRIJF: voorspel per voorwerp drijven, zweven of zinken; dan valt het in de bak
     en verschijnt de dichtheid. Daarna eventueel een andere vloeistof.
     p.rondes [{vloeistof: {naam, rho, kleur: 'water'|'alcohol'|'zout'}, voorwerpen: [{naam, m, V, beeld, mis}]}], p.mis, p.verklaar
     ========================================================================= */
  VIS.zinkdrijf = (pod, p, api) => {
    defs();
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 230', class: 'svgvis', role: 'img', 'aria-label': 'Bak met vloeistof' }), f = fbEl(), kaart = h('div', { class: 'nk-zdkaart' }), knoppen = h('div', { class: 'vis-knoppen' }), log = h('div', { class: 'nk-log' });
    const KL = { water: 'nk-water', alcohol: 'nk-alcohol', zout: 'nk-zout' };
    let r = 0, k = 0, iz = null, klaarGemeld = false;
    const opp = 84, bodem = 206, x0 = 70, x1 = 250;
    function teken(vw, y, fase) {
      const vl = p.rondes[r].vloeistof;
      let s = `<rect width="320" height="230" rx="16" fill="url(#nk-hout)"/><ellipse cx="160" cy="30" rx="150" ry="30" fill="#fff" opacity=".14"/><ellipse cx="160" cy="216" rx="110" ry="7" fill="#000" opacity=".14"/>`;
      s += `<path d="M${x0} ${opp} H${x1} V${bodem} H${x0}Z" fill="url(#${KL[vl.kleur] || 'nk-water'})"/>`;
      s += `<path d="M${x0} ${opp} C${x0 + 30} ${opp - 3} ${x0 + 60} ${opp + 3} ${x0 + 90} ${opp} C${x0 + 120} ${opp - 3} ${x0 + 150} ${opp + 3} ${x1} ${opp}" stroke="#fff" stroke-width="2" fill="none" opacity=".75"/>`;
      if (vw) s += `<g class="nk-zdvw${fase ? ' val' : ''}" style="transform:translateY(${y}px)">${`<g transform="translate(${160 - 32} 0) scale(.64)">${typeof vw.beeld === 'string' ? vw.beeld : ''}</g>`}</g>`;
      s += `<path d="M${x0} 50 V${bodem} H${x1} V50" stroke="#8CC6E8" stroke-width="5" fill="none" opacity=".9" stroke-linejoin="round"/><path d="M${x0 + 4} 56 V${bodem - 6}" stroke="#fff" stroke-width="3" opacity=".6"/>`;
      s += NK.tekst(x1 - 6, bodem - 10, `${vl.naam} · ${g2(vl.rho, vl.rho % 1 ? 2 : 1)} g/cm³`, { s: 10.5, a: 'end' });
      svg.innerHTML = s;
    }
    function toon() {
      const R0 = p.rondes[r], vw = R0.voorwerpen[k];
      teken(vw, -6, false);
      kaart.innerHTML = ''; knoppen.innerHTML = '';
      kaart.append(h('div', { class: 'nk-zd-titel', html: `<b>${vw.naam}</b> <small>${R0.voorwerpen.length > 1 ? `voorwerp ${k + 1} van ${R0.voorwerpen.length}` : ''}</small>` }));
      iz = inzet({ vraag: `Wat doet <b>${vw.naam.toLowerCase()}</b> in ${R0.vloeistof.naam.toLowerCase()}?`, keuzes: ['drijft', 'zweeft', 'zinkt'].map(t => ({ t, goed: t === uitkomst(vw, R0.vloeistof), mis: vw.mis || p.mis })) }, () => laatVallen());
      kaart.append(iz.el);
    }
    const uitkomst = (vw, vl) => { const rho = vw.m / vw.V; return Math.abs(rho - vl.rho) < .005 ? 'zweeft' : rho < vl.rho ? 'drijft' : 'zinkt'; };
    function laatVallen() {
      const R0 = p.rondes[r], vw = R0.voorwerpen[k], rho = vw.m / vw.V, u = uitkomst(vw, R0.vloeistof), hoog = 64;
      const y = u === 'zinkt' ? bodem - hoog - 2 : u === 'zweeft' ? (opp + bodem) / 2 - hoog / 2 : opp - hoog * .86 + Math.min(.95, rho / R0.vloeistof.rho) * 38 + 2;
      teken(vw, -6, false);
      setTimeout(() => { const g = svg.querySelector('.nk-zdvw'); if (g) { g.classList.add('val'); g.style.transform = `translateY(${y}px)`; } }, 40);
      setTimeout(() => {
        const zin = `ρ = m : V = ${NK.kort(vw.m)} : ${NK.kort(vw.V)} = <b>${g2(rho, 2)} g/cm³</b>. ${R0.vloeistof.naam}: ${g2(R0.vloeistof.rho, 2)} g/cm³. ` + (u === 'drijft' ? 'Kleiner, dus het <b>drijft</b>.' : u === 'zinkt' ? 'Groter, dus het <b>zinkt</b>.' : 'Precies even groot, dus het <b>zweeft</b>.');
        zegNK(f, iz.keuze.goed ? 'goed' : 'fout', oordeel(iz.keuze, api) + zin + (vw.w ? ' ' + vw.w : ''));
        log.append(h('div', { class: 'nk-logrij ' + (u === 'zinkt' ? 'nee' : 'ja') }, h('span', {}, `${vw.naam} in ${R0.vloeistof.naam.toLowerCase()}`), h('b', {}, `${g2(rho, 2)} → ${u}`)));
        if (k < R0.voorwerpen.length - 1) voegToe(knoppen, knopje('Volgende voorwerp', () => { k++; toon(); }));
        else if (r < p.rondes.length - 1) voegToe(knoppen, knopje('Wissel de vloeistof: ' + p.rondes[r + 1].vloeistof.naam.toLowerCase(), () => { r++; k = 0; toon(); }));
        else if (!klaarGemeld) { klaarGemeld = true; afronden(vis, p, api); }
      }, minderBeweging() ? 50 : 820);
    }
    vis.append(svg, kaart, knoppen, f, log); pod.append(vis); toon();
  };

  /* =========================================================================
     LADDER: eenheden-trap. Storm kiest × 1000 of : 1000; de stap gaat één trede naar de doeleenheid.
     De komma hopt drie plaatsen (zichtbaar, één hop per keer).
     p.opgaven [{w, van, naar, trap?}], p.trap (standaard ['kg','g']), p.mis
     ========================================================================= */
  VIS.ladder = (pod, p, api) => {
    defs();
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 130', class: 'svgvis', role: 'img', 'aria-label': 'Eenhedentrap' }), getalEl = h('div', { class: 'nk-getal', 'aria-live': 'polite' }), f = fbEl(), knoppen = h('div', { class: 'vis-knoppen' });
    let o = 0, w = 0, idx = 0, trap = [], bezig = false, klaarGemeld = false, eersteFout = true;
    const fmtW = x => x.toLocaleString('nl-NL', { maximumFractionDigits: 6, useGrouping: false });
    function tekenTrap() {
      const n = trap.length, bw = 300 / n;
      let s = `<rect width="320" height="130" rx="14" fill="url(#nk-hout)"/>`;
      trap.forEach((e, i) => { const x = 10 + i * bw, y = 20 + i * (54 / Math.max(1, n - 1)); const hgt = 120 - y; s += `<g filter="url(#nk-schaduw)"><rect x="${x}" y="${y}" width="${bw - 4}" height="${hgt}" rx="4" fill="url(#nk-houtje)"/><rect x="${x}" y="${y}" width="${bw - 4}" height="5" rx="2.5" fill="#F4CF98"/></g>` + NK.tekst(x + bw / 2 - 2, y + 26, e, { s: 16 }); if (i < n - 1) s += NK.tekst(x + bw - 2, y + 10, '× 1000 ↘', { s: 9.5, k: '#C2410C', a: 'start' }); });
      const x = 10 + idx * bw + bw / 2 - 2, y = 20 + idx * (54 / Math.max(1, n - 1));
      s += `<g transform="translate(${x} ${y - 2})"><circle r="9" cy="-9" fill="url(#nk-ballon)" stroke="#A8241A"/><ellipse cx="-3" cy="-12" rx="3" ry="2" fill="#fff" opacity=".7"/></g>`;
      svg.innerHTML = s;
    }
    const zetGetal = (x, e, cls = '') => { getalEl.className = 'nk-getal ' + cls; getalEl.innerHTML = `<b>${fmtW(x)}</b> <span>${e}</span>`; };
    function start() {
      const opg = p.opgaven[o]; trap = opg.trap || p.trap || ['kg', 'g']; w = opg.w; idx = trap.indexOf(opg.van);
      tekenTrap(); zetGetal(w, trap[idx]);
      knoppen.innerHTML = '';
      const keer = knopje('× 1000 (komma 3 naar rechts)', () => stap(1)), deel = knopje(': 1000 (komma 3 naar links)', () => stap(-1));
      keer.dataset.op = '1'; deel.dataset.op = '-1';
      knoppen.append(keer, deel); bijwerken();
      const d = Math.sign(trap.indexOf(opg.naar) - idx);
      zegNK(f, 'info', `Opgave ${o + 1} van ${p.opgaven.length}: zet <b>${fmtW(opg.w)} ${opg.van}</b> om naar <b>${opg.naar}</b>. Je gaat naar een <b>${d > 0 ? 'kleinere' : 'grotere'}</b> eenheid. Keer of delen?`);
    }
    const bijwerken = () => knoppen.querySelectorAll('button').forEach(b => { if (b.dataset.op) b.disabled = bezig; });
    /* op = +1 (× 1000) of -1 (: 1000); de stap gaat altijd één trede richting de doeleenheid */
    async function stap(op) {
      if (bezig) return; const opg = p.opgaven[o], doel = trap.indexOf(opg.naar), d = Math.sign(doel - idx);
      if (!d) return;
      const goed = op === d;
      bezig = true; bijwerken();
      const factor = op > 0 ? 10 : .1;
      for (let i = 0; i < 3; i++) { w = Math.round(w * factor * 1e9) / 1e9; zetGetal(w, i < 2 ? '…' : trap[idx + d], 'hop'); await wacht(minderBeweging() ? 0 : 260); }
      if (!goed) {
        eersteFout = false; idx += d; tekenTrap(); zetGetal(w, trap[idx], 'raar');
        zegNK(f, 'fout', `<b>${fmtW(w)} ${trap[idx]}?</b> Dat kan niet kloppen. ${d > 0 ? 'Naar een <b>kleinere</b> eenheid (zoals mA of g) wordt het getal <b>groter</b>: × 1000.' : 'Naar een <b>grotere</b> eenheid (zoals A of kg) wordt het getal <b>kleiner</b>: : 1000.'} Controle: <b>kleine eenheid = groot getal</b>.`);
        if (p.mis) api.spot(p.mis);
        await wacht(minderBeweging() ? 300 : 1400);
        for (let i = 0; i < 3; i++) w = Math.round(w / factor * 1e9) / 1e9;
        idx -= d; tekenTrap(); zetGetal(w, trap[idx]); bezig = false; bijwerken(); return;
      }
      idx += d; tekenTrap(); zetGetal(w, trap[idx], 'goed');
      if (idx === doel) {
        api.geefXP(eersteFout ? 4 : 2, getalEl);
        zegNK(f, 'goed', `<b>${fmtW(opg.w)} ${opg.van} = ${fmtW(w)} ${opg.naar}.</b> ${d > 0 ? 'Naar een kleinere eenheid: × 1000, het getal wordt groter.' : 'Naar een grotere eenheid: : 1000, de komma gaat drie plaatsen naar links.'}`);
        knoppen.innerHTML = '';
        if (o < p.opgaven.length - 1) voegToe(knoppen, knopje('Volgende opgave', () => { o++; eersteFout = true; bezig = false; start(); }));
        else if (!klaarGemeld) { klaarGemeld = true; afronden(vis, p, api); }
        return;
      }
      bezig = false; bijwerken();
      zegNK(f, 'info', 'Goed zo, nog een trede.');
    }
    vis.append(svg, getalEl, knoppen, f); pod.append(vis); start();
  };

  /* =========================================================================
     MAANWEGER: dezelfde astronaut op de aarde, de maan en Mars. Massa (kg) blijft,
     gewicht (N, hoe hard je drukt) verandert.
     p.massa (60), p.plekken [{id, naam, g}], p.inzet, p.verklaar
     ========================================================================= */
  VIS.maanweger = (pod, p, api) => {
    defs();
    const m = p.massa ?? 60, P = p.plekken || [{ id: 'aarde', naam: 'Aarde', g: 10 }, { id: 'maan', naam: 'Maan', g: 1.6 }, { id: 'mars', naam: 'Mars', g: 3.7 }];
    const vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 210', class: 'svgvis nk-maan', role: 'img', 'aria-label': 'Astronaut' }), f = fbEl(), panel = h('div', { class: 'nk-uitlees' });
    const gezien = new Set(); let vast = !p.inzet, iz = null, klaarGemeld = false, hier = P[0];
    function teken(pl) {
      const lucht = pl.id === 'aarde' ? 'url(#nk-zee)' : pl.id === 'maan' ? 'url(#nk-ruimte)' : '#E9A27A';
      const grond = pl.id === 'aarde' ? 'url(#nk-groen)' : pl.id === 'maan' ? 'url(#nk-maan)' : 'url(#nk-mars)';
      const N = m * pl.g;
      let s = `<rect width="320" height="210" rx="16" fill="${lucht}"/>`;
      if (pl.id === 'aarde') s += `<circle cx="270" cy="34" r="16" fill="#FFE27A"/><g opacity=".9"><ellipse cx="80" cy="40" rx="30" ry="10" fill="#fff"/><ellipse cx="100" cy="34" rx="18" ry="10" fill="#fff"/></g><path d="M0 132 C60 120 120 134 180 124 C240 116 290 126 320 120 V160 H0Z" fill="#9CCB6B" opacity=".7"/>`;
      if (pl.id === 'maan') s += Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 89) % 320}" cy="${(i * 47) % 120}" r="${i % 4 ? .8 : 1.5}" fill="#fff" opacity=".8"/>`).join('') + `<circle cx="262" cy="40" r="20" fill="url(#nk-aarde)"/><path d="M252 34 C258 28 266 32 266 38 C262 44 254 42 252 34Z" fill="#6FBF4A"/>`;
      if (pl.id === 'mars') s += `<circle cx="60" cy="36" r="10" fill="#FFF3D6" opacity=".9"/><path d="M0 130 C70 116 150 132 230 118 C270 112 300 120 320 116 V160 H0Z" fill="#C2552A" opacity=".55"/>`;
      s += `<path d="M0 150 C80 142 200 156 320 146 V210 H0Z" fill="${grond}"/>` + (pl.id === 'maan' ? `<ellipse cx="60" cy="176" rx="22" ry="6" fill="#8E8E99" opacity=".6"/><ellipse cx="250" cy="186" rx="30" ry="7" fill="#8E8E99" opacity=".6"/>` : '');
      /* weegschaal (meet hoe hard je drukt = gewicht) */
      s += `<g filter="url(#nk-schaduw)"><rect x="96" y="160" width="76" height="16" rx="6" fill="url(#nk-pak)"/><rect x="112" y="163" width="44" height="10" rx="2" fill="url(#nk-lcd)"/></g><text x="134" y="171" font-size="8" text-anchor="middle" fill="#1E2A1A" font-weight="700" font-family="ui-monospace,Consolas,monospace">${g2(N, 0)} N</text>`;
      /* astronaut */
      s += `<g class="nk-astro ${pl.id}"><g filter="url(#nk-schaduw)"><rect x="118" y="132" width="11" height="28" rx="5" fill="url(#nk-pak)"/><rect x="138" y="132" width="11" height="28" rx="5" fill="url(#nk-pak)"/><rect x="114" y="154" width="18" height="8" rx="4" fill="#5A606C"/><rect x="136" y="154" width="18" height="8" rx="4" fill="#5A606C"/>` +
        `<path d="M110 136 C108 104 116 92 134 92 C152 92 160 104 158 136Z" fill="url(#nk-pak)"/><rect x="124" y="104" width="20" height="14" rx="3" fill="#D5DBE2"/><circle cx="129" cy="111" r="2" fill="#EA580C"/><circle cx="137" cy="111" r="2" fill="#1F9E72"/>` +
        `<path d="M110 102 C98 110 96 124 102 130" stroke="url(#nk-pak)" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M158 102 C170 110 172 124 166 130" stroke="url(#nk-pak)" stroke-width="10" fill="none" stroke-linecap="round"/>` +
        `<circle cx="134" cy="72" r="24" fill="url(#nk-pak)"/><rect x="117" y="60" width="34" height="24" rx="12" fill="url(#nk-vizier)"/>` + NK.oog(127, 72, 3.2, { lid: '#3F8FD0', iris: '#5A3A2A' }) + NK.oog(141, 72, 3.2, { lid: '#3F8FD0', iris: '#5A3A2A' }) +
        `<path d="M129 79 C132 81 136 81 139 79" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8"/><ellipse cx="124" cy="64" rx="6" ry="3" fill="#fff" opacity=".65"/></g></g>`;
      /* balans: massa vergelijken met gewichtjes (werkt overal hetzelfde) */
      s += `<g transform="translate(236 104)" filter="url(#nk-schaduw)"><rect x="-4" y="0" width="8" height="46" fill="url(#nk-staal)"/><rect x="-24" y="44" width="48" height="8" rx="3" fill="url(#nk-houtje)"/><path d="M-36 0 H36" stroke="url(#nk-staal)" stroke-width="4" stroke-linecap="round"/><path d="M-36 0 L-44 18 H-28Z M36 0 L28 18 H44Z" fill="none" stroke="#6E7783" stroke-width="1.2"/><rect x="-46" y="18" width="20" height="4" rx="2" fill="url(#nk-staal)"/><rect x="26" y="18" width="20" height="4" rx="2" fill="url(#nk-staal)"/><rect x="-42" y="8" width="12" height="10" rx="2" fill="url(#nk-goud)"/><circle cx="36" cy="12" r="6" fill="url(#nk-pak)"/></g>` + NK.tekst(236, 98, `massa: ${m} kg`, { s: 11 });
      s += NK.tekst(134, 200, `gewicht: ${g2(N, 0)} N`, { s: 11 });
      svg.innerHTML = s;
      panel.innerHTML = `<span>${pl.naam}</span><span>massa: <b>${m} kg</b></span><span>gewicht: <b>${g2(N, 0)} N</b></span><span>${g2(pl.g, 1)} N per kg</span>`;
    }
    const chips = h('div', { class: 'chips' }, P.map(pl => { const b = h('button', { class: 'chip' + (pl === P[0] ? ' aan' : ''), type: 'button', 'data-plek': pl.id }, pl.naam); b.addEventListener('click', () => {
      if (!vast) { zegNK(f, 'info', 'Zet eerst je voorspelling in.'); return; }
      hier = pl; chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('aan', c === b)); teken(pl); gezien.add(pl.id);
      zegNK(f, 'info', `<b>${pl.naam}:</b> er is niets van haar af gegaan, dus de massa blijft <b>${m} kg</b>. Maar ze drukt met <b>${g2(m * pl.g, 0)} N</b> op de weegschaal.` + (pl.id === 'maan' ? ' Zes keer minder hard dan op aarde: daarom kan ze hier zo hoog springen.' : ''));
      if (!klaarGemeld && gezien.size >= P.length) { klaarGemeld = true; zegNK(f, 'goed', (iz ? oordeel(iz.keuze, api) : '') + '<b>Massa</b> (kg) = hoeveel stof, overal gelijk. <b>Gewicht</b> (N) = hoe hard je duwt of trekt, en dat hangt af van waar je bent.'); afronden(vis, p, api); }
    }); return b; }));
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', 'Reis nu af: tik op de maan, op Mars en weer op de aarde.'); }); vis.append(iz.el); }
    gezien.add(P[0].id);
    vis.append(svg, panel, chips, f); pod.append(vis); teken(P[0]);
    if (!p.inzet) zegNK(f, 'info', 'Tik op de maan en op Mars.');
  };

  /* =========================================================================
     RONTGEN: schuif de röntgenbron over de hand. Botten houden straling tegen,
     dus achter de botten blijft de foto licht (wit).
     p.inzet, p.verklaar, p.na
     ========================================================================= */
  let rgNr = 0;
  const HAND = `<path d="M44 150 C40 128 38 116 30 100 C26 92 34 86 40 94 L52 112 L50 62 C50 54 60 54 60 62 L62 100 L64 52 C64 44 74 44 74 52 L76 100 L80 58 C80 50 90 50 90 58 L88 104 L94 72 C94 64 104 64 103 72 L98 120 C96 136 92 146 88 150Z"/>`;
  const BOTTEN = `<path d="M56 148 L56 120 M66 148 L67 118 M76 148 L78 120 M86 148 L90 122 M50 140 L44 120" stroke-width="7"/><path d="M44 116 L38 102 M55 106 L55 84 M55 80 L55 64 M68 104 L68 76 M68 72 L69 54 M79 104 L82 80 M82 76 L84 60 M91 108 L95 90 M95 86 L97 74" stroke-width="5.4"/>`;
  VIS.rontgen = (pod, p, api) => {
    defs();
    const id = 'rg' + (++rgNr), vis = h('div', { class: 'vis' }), svg = sv('svg', { viewBox: '0 0 320 200', class: 'svgvis', role: 'img', 'aria-label': 'Röntgenfoto maken' }), f = fbEl();
    let x = 0, max = 0, vast = !p.inzet, iz = null, klaarGemeld = false;
    function teken() {
      const bx = 20 + x / 100 * 120;
      let s = `<rect width="320" height="200" rx="16" fill="#E9E4EE"/><rect x="0" y="0" width="160" height="200" rx="16" fill="url(#nk-hout)"/>`;
      s += `<rect x="18" y="40" width="128" height="150" rx="6" fill="#26304A"/><rect x="18" y="40" width="128" height="10" rx="5" fill="#3A4566"/>`;
      s += `<g transform="translate(14 32) scale(.82)"><g fill="url(#nk-huid)" stroke="#C98660" stroke-width="1.5">${HAND}</g><g stroke="#FFFFFF" stroke-opacity=".0" stroke-linecap="round" fill="none">${BOTTEN}</g></g>`;
      s += `<path d="M${bx} 26 L${bx - 18} 190 H${bx + 18}Z" fill="#B9E6FF" opacity=".35"/><g transform="translate(${bx} 16)" filter="url(#nk-schaduw)"><rect x="-22" y="-10" width="44" height="18" rx="6" fill="url(#nk-staal)"/><rect x="-6" y="8" width="12" height="6" fill="#5A606C"/><circle cx="-12" cy="-1" r="3" fill="#DB5A4A"/></g>`;
      /* de foto */
      s += `<defs><clipPath id="${id}"><rect x="170" y="10" width="${Math.max(0, max) / 100 * 140}" height="180"/></clipPath></defs>`;
      s += `<rect x="170" y="10" width="140" height="180" rx="8" fill="#0E1424" stroke="#5A6A86" stroke-width="2"/>`;
      s += `<g clip-path="url(#${id})"><g transform="translate(176 22) scale(.86)"><g fill="#5C6782">${HAND}</g><g stroke="#F4F6FA" stroke-linecap="round" fill="none">${BOTTEN}</g></g></g>`;
      s += NK.tekst(240, 200 - 4, 'de röntgenfoto', { s: 10 }) + NK.tekst(82, 196 - 2, 'hand op de fotoplaat', { s: 10 });
      svg.innerHTML = s;
    }
    const schuif = h('input', { type: 'range', min: 0, max: 100, step: 1, value: 0, class: 'nk-rontgen-schuif', 'aria-label': 'Röntgenbron verschuiven' });
    schuif.addEventListener('input', () => {
      if (!vast) { schuif.value = 0; zegNK(f, 'info', 'Zet eerst je voorspelling in.'); return; }
      x = +schuif.value; max = Math.max(max, x); teken();
      if (!klaarGemeld && max >= 96) { klaarGemeld = true; zegNK(f, iz && iz.keuze && !iz.keuze.goed ? 'fout' : 'goed', oordeel(iz && iz.keuze, api) + 'De <b>botten houden de straling tegen</b>, dus daar wordt de foto niet zwart: de botten zijn <b>wit</b>. Spieren en huid laten de straling bijna door: daar wordt de foto donker.'); afronden(vis, p, api); }
    });
    if (p.inzet) { iz = inzet(p.inzet, () => { vast = true; zegNK(f, 'info', 'Schuif de röntgenbron nu langzaam over de hand.'); }); vis.append(iz.el); }
    vis.append(svg, h('div', { class: 'schuif' }, h('label', {}, 'Röntgenbron'), schuif), f); pod.append(vis); teken();
    if (!p.inzet) zegNK(f, 'info', 'Schuif de röntgenbron over de hand.');
  };

  /* =========================================================================
     STAPPENRIJ: zet de stappen in de goede volgorde (slepen of de pijltjes), dan Check.
     p.stappen [{t, w}] in de juiste volgorde, p.vraag, p.mis
     ========================================================================= */
  VIS.stappenrij = (pod, p, api) => {
    const vis = h('div', { class: 'vis' }), lijst = h('ol', { class: 'nk-rij' }), f = fbEl();
    let volgorde = shuffle(p.stappen.map((s, i) => i));
    if (volgorde.every((v, i) => v === i)) volgorde.reverse();
    let klaarGemeld = false;
    function teken() {
      lijst.innerHTML = '';
      volgorde.forEach((si, pos) => {
        const op = h('button', { class: 'nk-rij-knop nk-op', type: 'button', 'aria-label': 'Omhoog' }, '▲'), neer = h('button', { class: 'nk-rij-knop nk-neer', type: 'button', 'aria-label': 'Omlaag' }, '▼');
        op.disabled = pos === 0; neer.disabled = pos === volgorde.length - 1;
        op.addEventListener('click', () => wissel(pos, pos - 1)); neer.addEventListener('click', () => wissel(pos, pos + 1));
        const li = h('li', { class: 'nk-rij-kaart', 'data-i': si }, h('span', { class: 'nk-rij-nr' }, String(pos + 1)), h('span', { class: 'nk-rij-t', html: p.stappen[si].t }), h('span', { class: 'nk-rij-pijlen' }, op, neer));
        sleep(li, pos); lijst.append(li);
      });
    }
    function wissel(a, b) { if (b < 0 || b >= volgorde.length) return; [volgorde[a], volgorde[b]] = [volgorde[b], volgorde[a]]; teken(); }
    function sleep(li, pos) {
      let start = null;
      li.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; start = e.clientY; li.classList.add('sleept'); try { li.setPointerCapture(e.pointerId); } catch (x) {} });
      li.addEventListener('pointermove', e => { if (start == null) return; li.style.transform = `translateY(${e.clientY - start}px)`; });
      const eind = e => { if (start == null) return; const dy = e.clientY - start, hgt = li.offsetHeight + 8, d = Math.round(dy / hgt); start = null; li.classList.remove('sleept'); li.style.transform = ''; if (d) { const doel = Math.max(0, Math.min(volgorde.length - 1, pos + d)); const [x] = volgorde.splice(pos, 1); volgorde.splice(doel, 0, x); teken(); } };
      li.addEventListener('pointerup', eind); li.addEventListener('pointercancel', () => { start = null; li.style.transform = ''; li.classList.remove('sleept'); });
    }
    const check = knopje('Check de volgorde', () => {
      const kaarten = [...lijst.children];
      kaarten.forEach((li, pos) => li.classList.toggle('goed', volgorde[pos] === pos));
      const eerste = volgorde.findIndex((v, pos) => v !== pos);
      if (eerste === -1) { zegNK(f, 'goed', p.goed || '<b>Helemaal goed!</b> Dit is de wetenschappelijke methode.'); if (!klaarGemeld) { klaarGemeld = true; check.disabled = true; api.geefXP(6, check); afronden(vis, p, api); } }
      else { const s = p.stappen[eerste]; zegNK(f, 'fout', `<b>Plek ${eerste + 1} klopt nog niet.</b> Daar hoort: "${s.t}". ${s.w || ''}`); if (p.mis) api.spot(p.mis); }
    });
    vis.append(p.vraag ? h('div', { class: 'nk-vraagtekst', html: p.vraag }) : null, lijst, h('div', { class: 'minis' }, 'Sleep een kaart, of gebruik de pijltjes.'), h('div', { class: 'vis-knoppen' }, check), f);
    pod.append(vis); teken();
  };

  /* =========================================================================
     POE (Voorspel -> Bekijk -> Verklaar), algemeen: een beginbeeld, een voorspelling,
     dan het beeld van wat er echt gebeurt, dan verklaren.
     p.beeld (svg-binnenkant), p.vb, p.vraag, p.keuzes [{t, goed, mis}], p.beeldNa (svg),
     p.uitleg (html na het kijken), p.knop, p.verklaar
     ========================================================================= */
  VIS.poe = (pod, p, api) => {
    defs();
    const vis = h('div', { class: 'vis' }), beeld = h('div', { class: 'nk-poe-beeld', html: svgVan(p.beeld, p.vb || '0 0 320 200') }), f = fbEl(), knoppen = h('div', { class: 'vis-knoppen' });
    const bekijk = knopje(p.knop || 'Bekijk wat er gebeurt', () => {
      bekijk.remove(); beeld.innerHTML = svgVan(typeof p.beeldNa === 'function' ? p.beeldNa(iz.keuze) : p.beeldNa, p.vb || '0 0 320 200'); beeld.classList.remove('wissel'); void beeld.offsetWidth; beeld.classList.add('wissel');
      zegNK(f, iz.keuze.goed ? 'goed' : 'fout', oordeel(iz.keuze, api) + (p.uitleg || ''));
      afronden(vis, p, api);
    }); bekijk.disabled = true;
    const iz = inzet({ vraag: p.vraag, keuzes: p.keuzes }, () => { bekijk.disabled = false; });
    knoppen.append(bekijk);
    vis.append(beeld, iz.el, knoppen, f); pod.append(vis);
  };

  /* =========================================================================
     INZICHTKAART: de kern van de les op één kaart; tik om om te draaien.
     p.titel, p.beeld (svg 100x100 binnenkant), p.kern (html), p.punten [html]
     ========================================================================= */
  VIS.inzichtkaart = (pod, p, api) => {
    defs();
    const kaart = h('button', { class: 'nk-iz-kaart', type: 'button', 'aria-label': 'Draai de inzichtkaart om' });
    kaart.append(h('div', { class: 'nk-iz-voor' }, h('div', { class: 'nk-iz-beeld', html: svgVan(p.beeld || '') }), h('b', {}, p.titel), h('small', {}, 'Tik om de kaart om te draaien')),
      h('div', { class: 'nk-iz-achter' }, h('b', {}, p.titel), h('div', { class: 'nk-iz-kern', html: p.kern }), p.punten ? h('ul', {}, p.punten.map(x => h('li', { html: x }))) : null));
    let om = false;
    kaart.addEventListener('click', () => { kaart.classList.toggle('om'); if (!om) { om = true; api.klaar(p.na || 'Zeg de kernzin één keer hardop. Aan het eind van de les komt je ontdekking in het lab-logboek.'); } });
    pod.append(h('div', { class: 'vis' }, kaart));
  };
})();
