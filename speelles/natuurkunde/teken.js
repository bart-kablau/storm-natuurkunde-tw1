'use strict';
/* =========================================================================
   NATUURKUNDE: tekenbibliotheek + stroomkring-model
   (canoniek: tools/speelles-engine/natuurkunde/teken.js)
   Alles zelf getekend in SVG, drie tonen per vorm (gradients + licht + schaduw),
   licht van linksboven. Eén globale naam: NK (plus nkDefs()).
   - nkDefs()               gedeelde gradients, één keer in de pagina
   - NK.kring.los(def)      rekent een schakeling door (knooppuntmethode, MNA)
   - NK.kring.markup(...)   tekent een schakeling als 'echt' (labtafel) of 'schema'
   - NK.kringSvg(def, o)    los + markup in één <svg>-string (voor mc-beelden)
   - NK.serieDef / NK.parallelDef   kant-en-klare schakelingen
   - NK.obj.<naam>()        voorwerpen in een vak van 100 x 100 (album, kaarten)
   - NK.gids                de gids (Vonk), NK.baas({...}) bazen met idle-beweging
   Natuurkunde die het model garandeert: een batterij levert een vaste spanning,
   de schakeling bepaalt de stroom; stroom is overal in een serie gelijk; bij een
   splitsing is het totaal de som; er raakt nergens lading op.
   ========================================================================= */

function nkDefs() {
  if (document.getElementById('nk-defs')) return;
  const st = (o, c, a = 1) => `<stop offset="${o}" style="stop-color:${c};stop-opacity:${a}"/>`;
  const L = (id, s, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${s.map(a => st(...a)).join('')}</linearGradient>`;
  const R = (id, s, cx = .38, cy = .32, r = .75) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${s.map(a => st(...a)).join('')}</radialGradient>`;
  const defs = [
    L('nk-hout', [[0, '#F6DDB6'], [.55, '#E6BC86'], [1, '#C99260']]),
    L('nk-papier', [[0, '#FFFFFF'], [1, '#F2EEE6']]),
    L('nk-koper', [[0, '#FFD6AE'], [.45, '#DB7A3C'], [1, '#8E4318']]),
    L('nk-koper-h', [[0, '#FFD6AE'], [.45, '#DB7A3C'], [1, '#8E4318']], 1, 0),
    L('nk-staal', [[0, '#F6F8FA'], [.5, '#B6BEC8'], [1, '#6E7783']]),
    L('nk-alu', [[0, '#FFFFFF'], [.5, '#D5DBE2'], [1, '#98A2AE']]),
    L('nk-grafiet', [[0, '#9A9DA3'], [.5, '#4D5056'], [1, '#26282C']]),
    L('nk-rubber', [[0, '#707078'], [.5, '#3C3C43'], [1, '#1E1E22']]),
    L('nk-gum', [[0, '#FFC2CC'], [.5, '#F28C9E'], [1, '#C25468']]),
    L('nk-plastic', [[0, '#C8EBFF'], [.5, '#5DB4EA'], [1, '#2A78B5']]),
    L('nk-glas-s', [[0, '#FFFFFF', .95], [.5, '#D6F1FF', .7], [1, '#8CC6E8', .8]]),
    L('nk-houtje', [[0, '#F4CF98'], [.5, '#CC9254'], [1, '#8E5A2C']]),
    L('nk-batt', [[0, '#646B78'], [.45, '#2F343D'], [1, '#14171C']]),
    L('nk-batt-kop', [[0, '#FFE6A6'], [.5, '#E2A62C'], [1, '#9A6A10']]),
    L('nk-meter', [[0, '#FFEA8A'], [.5, '#F4C430'], [1, '#C29210']]),
    L('nk-lcd', [[0, '#E8F6E0'], [1, '#AFCFA6']]),
    R('nk-glas', [[0, '#FFFFFF', .95], [.6, '#DDF1FF', .55], [1, '#A9D4F0', .55]]),
    R('nk-gloei', [[0, '#FFFBE0', 1], [.35, '#FFE27A', .85], [1, '#FFC940', 0]], .5, .5, .5),
    L('nk-water', [[0, '#C4ECFC', .92], [1, '#3A9AD0', .92]]),
    L('nk-alcohol', [[0, '#EFE8FF', .92], [1, '#9C88D6', .92]]),
    L('nk-zout', [[0, '#D9F2EE', .92], [1, '#5BB5A6', .92]]),
    R('nk-huid', [[0, '#FCDCC2'], [.6, '#ECB28E'], [1, '#C98660']]),
    L('nk-bot', [[0, '#FFFFFF'], [1, '#D6D0C4']]),
    R('nk-maan', [[0, '#F4F4F7'], [.6, '#C4C4CE'], [1, '#7E7E8C']]),
    R('nk-aarde', [[0, '#B6E8FA'], [.55, '#4FA6DA'], [1, '#1E5A94']]),
    R('nk-mars', [[0, '#FFC69A'], [.55, '#E06A36'], [1, '#8E2E12']]),
    R('nk-pak', [[0, '#FFFFFF'], [.6, '#E6EAF0'], [1, '#AEB6C2']]),
    L('nk-vizier', [[0, '#A9E4FF'], [.5, '#3F8FD0'], [1, '#173E73']]),
    L('nk-goud', [[0, '#FFF2AE'], [.5, '#E8B42A'], [1, '#9A6A08']]),
    L('nk-lood', [[0, '#BCC3CD'], [.5, '#6E7682'], [1, '#3E444E']]),
    L('nk-kurk', [[0, '#F2CB94'], [.5, '#C8915A'], [1, '#8A5A2E']]),
    R('nk-ballon', [[0, '#FFC0B4'], [.5, '#F0503C'], [1, '#A8241A']]),
    R('nk-lading', [[0, '#FFF6CC'], [.6, '#F4B740'], [1, '#C9850A']], .35, .3, .8),
    L('nk-ruimte', [[0, '#0B0920'], [1, '#2D2559']]),
    L('nk-zee', [[0, '#7CCBEF'], [1, '#2465A0']]),
    R('nk-lamp', [[0, '#FFFFFF'], [.5, '#FFF3B0'], [1, '#F4C430']]),
    L('nk-bruin', [[0, '#E9C08E'], [.5, '#C48A50'], [1, '#8A5A2E']]),
    L('nk-rood', [[0, '#FF9C8C'], [.5, '#E0402E'], [1, '#9A2016']]),
    L('nk-groen', [[0, '#BFF0B0'], [.5, '#4FB85A'], [1, '#22783A']]),
  ].join('');
  const filt = `<filter id="nk-schaduw" x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="1" dy="2" stdDeviation="1.6" flood-color="#3D1B33" flood-opacity=".26"/></filter>`;
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('id', 'nk-defs'); el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  el.innerHTML = '<defs>' + defs + filt + '</defs>';
  document.body.prepend(el);
}

const NK = (() => {
  /* ---------------- kleine hulpjes ---------------- */
  const getal = (x, d = 2) => (Math.abs(x) < 1e-9 ? 0 : x).toLocaleString('nl-NL', { minimumFractionDigits: d, maximumFractionDigits: d });
  const kort = x => (Math.round(x * 1000) / 1000).toLocaleString('nl-NL', { maximumFractionDigits: 3 });
  const tekst = (x, y, t, { s = 11, k = '#3D1B33', a = 'middle', halo = true, w = 600 } = {}) =>
    `<text x="${x}" y="${y}" font-size="${s}" text-anchor="${a}" font-weight="${w}" fill="${k}"${halo ? ' stroke="#fff" stroke-width="3" paint-order="stroke" stroke-linejoin="round"' : ''}>${t}</text>`;
  const schaduw = (cx, cy, rx, ry = 4, o = .16) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
  /* oog met iris, pupil, twee glimlichtjes en een ooglid dat knippert (CSS .nk-lid) */
  let lidNr = 0;
  const oog = (x, y, r = 5, { iris = '#5A3A2A', lid = '#F2C9A6', fase } = {}) => {
    const d = fase ?? ((lidNr++ * 1.37) % 4).toFixed(2);
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + r * .12}" cy="${y + r * .1}" r="${r * .62}" fill="${iris}"/>` +
      `<circle cx="${x + r * .12}" cy="${y + r * .1}" r="${r * .32}" fill="#1A0E14"/><circle cx="${x + r * .38}" cy="${y - r * .22}" r="${r * .2}" fill="#fff"/>` +
      `<circle cx="${x - r * .18}" cy="${y + r * .34}" r="${r * .1}" fill="#fff" opacity=".8"/>` +
      `<ellipse class="nk-lid" style="animation-delay:-${d}s" cx="${x}" cy="${y - r * .02}" rx="${r * 1.08}" ry="${r * 1.08}" fill="${lid}"/></g>`;
  };

  /* =======================================================================
     STROOMKRING-MODEL
     def = { vb, onderdelen: [{id, soort, x, y, rot, ...}], draden: [['A.b','L1.a', {via, kleur, vast, kapot}]] }
     soorten: batterij (n, p; cellen, cel of U) · lamp (a, b; R, los) · schakelaar (dicht) ·
              meterA · meterV · plek (een stukje draad waar een meter in kan; inhoud 'A'|'V') ·
              plekOver (over: id; een plek NAAST een onderdeel) · gat (mat: {naam, geleider, R, teken}) ·
              motor · knoop (één aansluiting k)
     ======================================================================= */
  const normDraad = d => Array.isArray(d) ? { a: d[0], b: d[1], ...(d[2] || {}) } : d;
  const aansl = c => c.soort === 'batterij' ? ['n', 'p'] : c.soort === 'knoop' ? ['k'] : ['a', 'b'];
  const halve = c => c.w ?? (c.soort === 'batterij' ? 8 + 12 * (c.cellen || 1) : c.soort === 'gat' ? 24 : c.soort === 'knoop' ? 0 : c.soort === 'plek' ? 14 : 20);
  const spanningVan = c => c.U ?? (c.cellen || 1) * (c.cel ?? 1.5);
  function bouw(def) {
    const per = {}; def.onderdelen.forEach(c => per[c.id] = c);
    const pos = (key) => {
      const [id, t] = key.split('.'); const c = per[id];
      if (!c) throw new Error('kring: onbekend onderdeel ' + key);
      if (c.soort === 'plekOver') { const o = per[c.over]; return pos(o.id + '.' + (t === 'a' ? aansl(o)[0] : aansl(o)[1])); }
      if (t === 'k') return [c.x, c.y];
      const w = halve(c), r = (c.rot || 0) * Math.PI / 180, s = (t === 'a' || t === 'n') ? -1 : 1;
      return [c.x + s * w * Math.cos(r), c.y + s * w * Math.sin(r)];
    };
    const sleutel = (key) => { const [id, t] = key.split('.'); const c = per[id]; if (c && c.soort === 'plekOver') { const o = per[c.over]; return o.id + '.' + (t === 'a' ? aansl(o)[0] : aansl(o)[1]); } return key; };
    return { per, pos, sleutel, draden: (def.draden || []).map(normDraad) };
  }
  /* het rekenwerk: Modified Nodal Analysis met kleine weerstanden voor draden */
  function los(def) {
    const B = bouw(def), knoop = {}, lijst = [];
    const ki = key => { const k = B.sleutel(key); if (!(k in knoop)) { knoop[k] = lijst.length; lijst.push(k); } return knoop[k]; };
    const Rs = [], Vs = [];
    def.onderdelen.forEach(c => {
      const t = aansl(c); if (t.length === 2 && c.soort !== 'plekOver') { ki(c.id + '.' + t[0]); ki(c.id + '.' + t[1]); } else if (c.soort === 'knoop') ki(c.id + '.k');
      const a = () => ki(c.id + '.a'), b = () => ki(c.id + '.b');
      const meter = (soort) => Rs.push({ a: a(), b: b(), R: soort === 'A' ? 1e-3 : 1e7, id: c.id, meter: soort });
      switch (c.soort) {
        case 'batterij': Vs.push({ p: ki(c.id + '.p'), n: ki(c.id + '.n'), U: spanningVan(c), id: c.id }); break;
        case 'lamp': if (!c.los) Rs.push({ a: a(), b: b(), R: c.R ?? 6, id: c.id }); break;
        case 'motor': case 'weerstand': Rs.push({ a: a(), b: b(), R: c.R ?? 4, id: c.id }); break;
        case 'schakelaar': if (c.dicht) Rs.push({ a: a(), b: b(), R: 1e-3, id: c.id }); break;
        case 'meterA': meter('A'); break;
        case 'meterV': meter('V'); break;
        case 'plek': if (c.inhoud) meter(c.inhoud); else Rs.push({ a: a(), b: b(), R: 1e-3, id: c.id }); break;
        case 'plekOver': if (c.inhoud) { const o = B.per[c.over], t2 = aansl(o); Rs.push({ a: ki(o.id + '.' + t2[0]), b: ki(o.id + '.' + t2[1]), R: c.inhoud === 'A' ? 1e-3 : 1e7, id: c.id, meter: c.inhoud }); } break;
        case 'gat': if (c.mat && c.mat.geleider) Rs.push({ a: a(), b: b(), R: c.mat.R ?? .01, id: c.id }); break;
      }
    });
    B.draden.forEach((d, i) => { ki(d.a); ki(d.b); if (!d.kapot) Rs.push({ a: ki(d.a), b: ki(d.b), R: 1e-3, draad: i }); });
    const n = lijst.length, uit = { V: {}, I: {}, draad: [], bron: {}, lamp: {}, meter: {}, kort: false, knoop };
    if (!Vs.length || !n) { def.onderdelen.forEach(c => { uit.I[c.id] = 0; if (c.soort === 'lamp') uit.lamp[c.id] = { I: 0, gloed: 0, aan: false }; }); B.draden.forEach((d, i) => uit.draad[i] = 0); return uit; }
    const g = Vs[0].n, idx = new Array(n).fill(-1); let m = 0;
    for (let i = 0; i < n; i++) if (i !== g) idx[i] = m++;
    const N = m + Vs.length, A = Array.from({ length: N }, () => new Float64Array(N)), z = new Float64Array(N);
    const zet = (r, c, v) => { if (r >= 0 && c >= 0) A[r][c] += v; };
    for (let i = 0; i < n; i++) zet(idx[i], idx[i], 1e-9);
    Rs.forEach(e => { const G = 1 / e.R, a = idx[e.a], b = idx[e.b]; zet(a, a, G); zet(b, b, G); zet(a, b, -G); zet(b, a, -G); });
    Vs.forEach((v, j) => { const r = m + j, p = idx[v.p], q = idx[v.n]; zet(p, r, 1); zet(r, p, 1); zet(q, r, -1); zet(r, q, -1); z[r] = v.U; });
    /* Gauss met pivot */
    for (let k = 0; k < N; k++) {
      let best = k; for (let r = k + 1; r < N; r++) if (Math.abs(A[r][k]) > Math.abs(A[best][k])) best = r;
      if (Math.abs(A[best][k]) < 1e-14) continue;
      [A[k], A[best]] = [A[best], A[k]]; [z[k], z[best]] = [z[best], z[k]];
      for (let r = k + 1; r < N; r++) { const f = A[r][k] / A[k][k]; if (!f) continue; for (let c = k; c < N; c++) A[r][c] -= f * A[k][c]; z[r] -= f * z[k]; }
    }
    const x = new Float64Array(N);
    for (let k = N - 1; k >= 0; k--) { let s = z[k]; for (let c = k + 1; c < N; c++) s -= A[k][c] * x[c]; x[k] = Math.abs(A[k][k]) < 1e-14 ? 0 : s / A[k][k]; }
    const V = i => i === g ? 0 : x[idx[i]];
    lijst.forEach((k, i) => uit.V[k] = V(i));
    Rs.forEach(e => {
      const I = (V(e.a) - V(e.b)) / e.R;
      if (e.draad != null) uit.draad[e.draad] = I;
      else { uit.I[e.id] = I; if (e.meter) uit.meter[e.id] = e.meter === 'A' ? Math.abs(I) : Math.abs(V(e.a) - V(e.b)); }
    });
    B.draden.forEach((d, i) => { if (uit.draad[i] == null) uit.draad[i] = 0; });
    Vs.forEach((v, j) => { uit.bron[v.id] = -x[m + j]; uit.I[v.id] = -x[m + j]; if (Math.abs(x[m + j]) > 20) uit.kort = true; });
    def.onderdelen.forEach(c => {
      if (uit.I[c.id] == null) uit.I[c.id] = 0;
      if (c.soort === 'lamp') { const I = Math.abs(uit.I[c.id]), nom = c.Inom ?? .5; uit.lamp[c.id] = { I, gloed: Math.min(1.25, (I / nom) ** 2), aan: I > .03 }; }
    });
    if (uit.kort) Object.values(uit.lamp).forEach(l => { l.aan = l.I > .03; });
    return uit;
  }
  /* welke aansluitingen zijn met geleiders (draden, dichte schakelaar, geleider, meters A) verbonden */
  function verbonden(def) {
    const B = bouw(def), ouder = {};
    const vind = k => { k = B.sleutel(k); if (!(k in ouder)) ouder[k] = k; while (ouder[k] !== k) { ouder[k] = ouder[ouder[k]]; k = ouder[k]; } return k; };
    const een = (a, b) => { ouder[vind(a)] = vind(b); };
    B.draden.forEach(d => { if (!d.kapot) een(d.a, d.b); });
    def.onderdelen.forEach(c => {
      const ab = () => een(c.id + '.a', c.id + '.b');
      if (c.soort === 'schakelaar' && c.dicht) ab();
      if (c.soort === 'meterA' || (c.soort === 'plek' && c.inhoud !== 'V')) ab();
      if (c.soort === 'gat' && c.mat && c.mat.geleider) ab();
    });
    return (a, b) => vind(a) === vind(b);
  }

  /* ---------------- onderdelen tekenen (lokaal, horizontaal, aansluitingen op -w en +w) ---------------- */
  const KAB = ['#D93A3A', '#2E3440', '#2F7FB8', '#1F9E72', '#E07A1F', '#8E5BB0'];
  const leads = (w, x0, kleur = '#8E4318', dik = 2.6) => `<path d="M${-w} 0 H${-x0} M${x0} 0 H${w}" stroke="${kleur}" stroke-width="${dik}" stroke-linecap="round"/>`;
  const MATERIAAL = {
    koper: () => `<rect x="-15" y="-3.5" width="30" height="7" rx="3.5" fill="url(#nk-koper)"/><rect x="-13" y="-2.5" width="26" height="1.5" rx=".75" fill="#fff" opacity=".55"/>`,
    staal: () => `<rect x="-15" y="-2.2" width="27" height="4.4" rx="1" fill="url(#nk-staal)"/><path d="M12 -2.2 L16 0 L12 2.2Z" fill="#8A939E"/><rect x="-17" y="-4.5" width="3.5" height="9" rx="1" fill="url(#nk-staal)"/>`,
    alu: () => `<path d="M-15 -4 L15 -4.5 L14 4 L-15 4.5Z" fill="url(#nk-alu)" stroke="#9AA4AE" stroke-width=".6"/><path d="M-10 -3 L-6 3 M-2 -3.5 L2 3.5 M6 -3 L9 3" stroke="#fff" stroke-width=".8" opacity=".8"/>`,
    potlood: () => `<rect x="-11" y="-3.6" width="22" height="7.2" fill="#F4C430"/><rect x="-11" y="-3.6" width="22" height="2.2" fill="#FFE27A"/><rect x="-11" y="1.6" width="22" height="2" fill="#C99A10"/><path d="M11 -3.6 L16 0 L11 3.6Z" fill="#F2CB94"/><path d="M14.5 -1 L16.4 0 L14.5 1Z" fill="#2B2B30"/><rect x="-15" y="-3.6" width="4" height="7.2" fill="#F28C9E"/><rect x="-12" y="-3.6" width="1.5" height="7.2" fill="#B6BEC8"/><circle cx="-17" cy="0" r="1.3" fill="#2B2B30"/>`,
    grafiet: () => `<rect x="-15" y="-2" width="30" height="4" rx="2" fill="url(#nk-grafiet)"/><rect x="-13" y="-1.4" width="24" height=".9" fill="#fff" opacity=".4"/>`,
    rubber: () => `<rect x="-13" y="-5" width="26" height="10" rx="2.5" fill="url(#nk-gum)"/><rect x="-13" y="-5" width="9" height="10" rx="2" fill="#5DB4EA"/><rect x="-11" y="-4" width="22" height="2" rx="1" fill="#fff" opacity=".45"/>`,
    glas: () => `<rect x="-15" y="-3" width="30" height="6" rx="3" fill="url(#nk-glas-s)" stroke="#8CC6E8" stroke-width=".8"/><rect x="-13" y="-2" width="24" height="1.2" rx=".6" fill="#fff"/>`,
    plastic: () => `<rect x="-15" y="-4.5" width="30" height="9" rx="1.5" fill="url(#nk-plastic)" opacity=".9"/>${[-12, -9, -6, -3, 0, 3, 6, 9, 12].map((x, i) => `<path d="M${x} -4.5 v${i % 2 ? 2.5 : 4}" stroke="#123E66" stroke-width=".7"/>`).join('')}`,
    hout: () => `<rect x="-15" y="-3" width="30" height="6" rx="1.5" fill="url(#nk-houtje)"/><path d="M-12 -1 C-4 -2 4 0 12 -1 M-10 1.5 C-2 .5 6 2 13 1" stroke="#8E5A2C" stroke-width=".6" fill="none" opacity=".7"/>`,
    munt: () => `<ellipse cx="0" cy="0" rx="9" ry="7" fill="url(#nk-goud)" stroke="#9A6A08" stroke-width=".8"/><ellipse cx="0" cy="0" rx="6" ry="4.5" fill="none" stroke="#FFF2AE" stroke-width=".8"/>`,
    lucht: () => '',
    water: () => `<path d="M-9 0 C-9 -6 -4 -7 0 -7 C4 -7 9 -6 9 0 C9 5 5 7 0 7 C-5 7 -9 5 -9 0Z" fill="url(#nk-water)" opacity=".8"/>`,
  };
  function onderdeel(c, opl, schema, opts) {
    const w = halve(c), id = c.id;
    const lampSt = opl.lamp[id] || { gloed: 0, aan: false };
    const meterTxt = () => { const v = opl.meter[id]; if (c.verborgen) return '?'; if (v == null) return '–'; return c.soort === 'meterV' || c.inhoud === 'V' ? getal(v, c.dec ?? 1) + ' V' : (c.mA ? getal(v * 1000, 0) + ' mA' : getal(v, c.dec ?? 2) + ' A'); };
    const isV = c.soort === 'meterV' || c.inhoud === 'V';
    switch (c.soort) {
      case 'batterij': {
        const n = c.cellen || 1, cel = c.cel ?? 1.5;
        if (schema) {
          let s = '', x = -w + 8;
          s += `<path d="M${-w} 0 H${x}" stroke="#2B1726" stroke-width="2.2"/>`;
          for (let i = 0; i < n; i++) { s += `<rect x="${x}" y="-6" width="4.2" height="12" fill="#2B1726"/><rect x="${x + 8}" y="-12" width="1.8" height="24" fill="#2B1726"/>`; if (i < n - 1) s += `<path d="M${x + 9.8} 0 H${x + 12}" stroke="#2B1726" stroke-width="2.2"/>`; x += 12; }
          s += `<path d="M${x - 2.2} 0 H${w}" stroke="#2B1726" stroke-width="2.2"/><text x="${x + 3}" y="-12" font-size="10" fill="#2B1726">+</text>`;
          return s;
        }
        let s = leads(w, w - 6, '#2E3440', 3);
        for (let i = 0; i < n; i++) {
          const x0 = -w + 6 + i * 24;
          s += `<g filter="url(#nk-schaduw)"><rect x="${x0}" y="-8" width="19" height="16" rx="3" fill="url(#nk-batt)"/><rect x="${x0 + 12}" y="-8" width="7" height="16" rx="2" fill="url(#nk-batt-kop)"/>` +
            `<rect x="${x0 + 19}" y="-3.2" width="3.2" height="6.4" rx="1" fill="url(#nk-alu)"/><rect x="${x0 + 1.5}" y="-6.8" width="16" height="2.4" rx="1.2" fill="#fff" opacity=".22"/>` +
            `<text x="${x0 + 6}" y="3" font-size="5.4" text-anchor="middle" fill="#fff" font-weight="700">${getal(cel, 1)}V</text><text x="${x0 + 16}" y="3" font-size="6.5" text-anchor="middle" fill="#5A3A00" font-weight="800">+</text></g>`;
        }
        return s;
      }
      case 'lamp': {
        if (schema) {
          const g = c.los ? 0 : lampSt.gloed;
          return `<path d="M${-w} 0 H-9 M9 0 H${w}" stroke="#2B1726" stroke-width="2.2"/>` + (g > .02 ? `<circle r="15" fill="#FFE27A" opacity="${Math.min(.75, g * .6)}"/>` : '') +
            `<circle r="9" fill="#fff" stroke="#2B1726" stroke-width="2.2"${c.los ? ' stroke-dasharray="3 2.5"' : ''}/><path d="M-6.4 -6.4 L6.4 6.4 M6.4 -6.4 L-6.4 6.4" stroke="#2B1726" stroke-width="2"/>`;
        }
        const g = c.los ? 0 : lampSt.gloed, aan = !c.los && lampSt.aan;
        const lamp = `<rect x="-6" y="-14" width="12" height="10" rx="2" fill="url(#nk-alu)"/><path d="M-6 -11 H6 M-6 -8 H6" stroke="#8A939E" stroke-width=".9"/>` +
          (aan ? `<circle cx="0" cy="-25" r="${22 + 12 * Math.min(1, g)}" fill="url(#nk-gloei)" opacity="${Math.min(1, .35 + g * .65)}"/>` : '') +
          `<circle cx="0" cy="-25" r="12" fill="url(#nk-glas)" stroke="#9CC7E0" stroke-width="1.2"/>` +
          (aan ? `<circle cx="0" cy="-25" r="11" fill="#FFE680" opacity="${Math.min(.85, g * .7)}"/>` : '') +
          `<path d="M-3 -14 L-3 -23 L-1.5 -27 L0 -23 L1.5 -27 L3 -23 L3 -14" stroke="${aan ? '#FF8A00' : '#7A6A60'}" stroke-width="${aan ? 1.6 : 1.1}" fill="none" stroke-linejoin="round"/>` +
          `<ellipse cx="-4.5" cy="-30" rx="4" ry="2.4" fill="#fff" opacity=".85" transform="rotate(-30 -4.5 -30)"/>`;
        return leads(w, 13) + `<g filter="url(#nk-schaduw)"><rect x="-16" y="-5" width="32" height="12" rx="4" fill="url(#nk-rubber)"/><rect x="-15" y="-4.5" width="30" height="3" rx="1.5" fill="#fff" opacity=".14"/>` +
          `<circle cx="-12" cy="1" r="3" fill="url(#nk-staal)"/><circle cx="12" cy="1" r="3" fill="url(#nk-staal)"/></g>` +
          (c.los ? `<g transform="translate(9 -9) rotate(24)">${lamp}</g>` : lamp);
      }
      case 'schakelaar': {
        if (schema) return `<path d="M${-w} 0 H-10 M10 0 H${w}" stroke="#2B1726" stroke-width="2.2"/><circle cx="-10" cy="0" r="2.4" fill="#fff" stroke="#2B1726" stroke-width="1.8"/><circle cx="10" cy="0" r="2.4" fill="#fff" stroke="#2B1726" stroke-width="1.8"/>` +
          (c.dicht ? `<path d="M-8 0 H10" stroke="#2B1726" stroke-width="2.4" stroke-linecap="round"/>` : `<path d="M-8 -1 L7 -11" stroke="#2B1726" stroke-width="2.4" stroke-linecap="round"/>`);
        const end = c.dicht ? [12, -1.5] : [7.6, -13.8];
        return leads(w, 12) + `<g filter="url(#nk-schaduw)"><rect x="-19" y="-4" width="38" height="11" rx="3" fill="url(#nk-houtje)"/><rect x="-18" y="-3.5" width="36" height="2.6" rx="1.3" fill="#fff" opacity=".25"/></g>` +
          `<circle cx="-12" cy="0" r="3.6" fill="url(#nk-koper)"/><circle cx="12" cy="0" r="3.6" fill="url(#nk-koper)"/>` +
          `<path d="M-12 0 L${end[0]} ${end[1]}" stroke="url(#nk-staal)" stroke-width="3.6" stroke-linecap="round"/><path d="M-12 -.8 L${end[0]} ${end[1] - .8}" stroke="#fff" stroke-width="1" opacity=".6" stroke-linecap="round"/>` +
          `<circle cx="${-12 + (end[0] + 12) * .72}" cy="${end[1] * .72}" r="3.3" fill="url(#nk-rood)"/>`;
      }
      case 'meterA': case 'meterV': case 'plek': case 'plekOver': {
        if ((c.soort === 'plek' || c.soort === 'plekOver') && !c.inhoud) {
          if (c.soort === 'plekOver') return '';
          const kab = schema ? `<path d="M${-w} 0 H${w}" stroke="#2B1726" stroke-width="2.2"/>` : `<path d="M${-w} 0 H${w}" stroke="${c.kleur || '#2F7FB8'}" stroke-width="5" stroke-linecap="round"/><path d="M${-w} -.8 H${w}" stroke="#fff" stroke-width="1.4" opacity=".35"/>`;
          return kab + (opts.plekMarkers ? `<g class="nk-plekteken"><circle r="10" fill="#fff" fill-opacity=".85" stroke="#EA580C" stroke-width="2" stroke-dasharray="4 3"/><path d="M-4.5 0 H4.5 M0 -4.5 V4.5" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round"/></g>` : '');
        }
        const letter = isV ? 'V' : 'A';
        if (schema) return `<path d="M${-w} 0 H-10 M10 0 H${w}" stroke="#2B1726" stroke-width="2.2"/><circle r="10" fill="#fff" stroke="#2B1726" stroke-width="2.2"/><text y="4.3" font-size="12.5" text-anchor="middle" fill="#2B1726" font-weight="700">${letter}</text>` +
          (opts.waarden !== false ? `<g transform="rotate(${-(c.rot || 0)})"><rect x="-19" y="-27" width="38" height="13" rx="4" fill="#fff" stroke="#2B1726" stroke-width="1"/><text y="-17.4" font-size="9" text-anchor="middle" fill="#2B1726" font-weight="700">${meterTxt()}</text></g>` : '');
        return leads(w, 14, isV ? '#D93A3A' : '#2E3440', 2.6) + `<g transform="rotate(${-(c.rot || 0)})" filter="url(#nk-schaduw)"><rect x="-16" y="-16" width="32" height="30" rx="5" fill="url(#nk-meter)"/><rect x="-14.5" y="-15" width="29" height="4" rx="2" fill="#fff" opacity=".35"/>` +
          `<rect x="-12" y="-11" width="24" height="12" rx="2" fill="url(#nk-lcd)" stroke="#5E6B55" stroke-width=".8"/><text y="-2.4" font-size="${meterTxt().length > 7 ? 6.4 : 7.4}" text-anchor="middle" fill="#1E2A1A" font-weight="700" font-family="ui-monospace,Consolas,monospace">${opts.waarden === false ? '' : meterTxt()}</text>` +
          `<circle cx="-7" cy="8" r="2.6" fill="#2E3440"/><circle cx="7" cy="8" r="2.6" fill="#D93A3A"/><text y="10.6" font-size="7" text-anchor="middle" fill="#3D2A00" font-weight="800">${letter}</text></g>`;
      }
      case 'gat': {
        const mat = c.mat;
        if (schema) return `<path d="M${-w} 0 H-14 M14 0 H${w}" stroke="#2B1726" stroke-width="2.2"/><circle cx="-14" cy="0" r="2.4" fill="#2B1726"/><circle cx="14" cy="0" r="2.4" fill="#2B1726"/>` +
          (mat && mat.teken !== 'lucht' ? `<rect x="-12" y="-5" width="24" height="10" rx="2" fill="#fff" stroke="#2B1726" stroke-width="1.6"/>` : '');
        const klem = s => `<g transform="scale(${s} 1)"><path d="M${-w} 0 H-19" stroke="#8E4318" stroke-width="2.6"/><path d="M-22 -6 L-12 -3 L-10 -1 L-22 -1Z" fill="url(#nk-rood)"/><path d="M-22 6 L-12 3 L-10 1 L-22 1Z" fill="#B42A1E"/><path d="M-15 -3.6 l1.5 1.6 M-13 -3 l1.5 1.6" stroke="#fff" stroke-width=".7" opacity=".7"/></g>`;
        return klem(1) + klem(-1) + (mat ? `<g filter="url(#nk-schaduw)">${(MATERIAAL[mat.teken] || MATERIAAL.koper)()}</g>` : '') +
          (!mat || mat.teken === 'lucht' ? `<path d="M-6 -3 C-2 -6 2 0 6 -3 M-6 3 C-2 0 2 6 6 3" stroke="#9CC7E0" stroke-width="1" fill="none" opacity=".9"/>` : '');
      }
      case 'motor': {
        if (schema) return `<path d="M${-w} 0 H-10 M10 0 H${w}" stroke="#2B1726" stroke-width="2.2"/><circle r="10" fill="#fff" stroke="#2B1726" stroke-width="2.2"/><text y="4.3" font-size="12" text-anchor="middle" fill="#2B1726" font-weight="700">M</text>`;
        const I = Math.abs(opl.I[id] || 0);
        return leads(w, 13) + `<g filter="url(#nk-schaduw)"><rect x="-13" y="-8" width="22" height="16" rx="4" fill="url(#nk-staal)"/><rect x="-12" y="-7" width="20" height="3" rx="1.5" fill="#fff" opacity=".5"/></g>` +
          `<g class="${I > .03 ? 'nk-draai' : ''}" style="transform-origin:15px 0px;animation-duration:${(0.25 / Math.max(.05, I)).toFixed(2)}s"><path d="M15 0 L15 -12 C19 -12 19 -4 15 0 L15 12 C11 12 11 4 15 0Z" fill="url(#nk-plastic)"/></g><circle cx="15" cy="0" r="2" fill="#2E3440"/>`;
      }
      case 'knoop': return schema ? `<circle r="3.2" fill="#2B1726"/>` : `<circle r="4.6" fill="url(#nk-koper)" stroke="#8E4318" stroke-width=".8"/><circle cx="-1.4" cy="-1.4" r="1.4" fill="#fff" opacity=".6"/>`;
    }
    return '';
  }
  const route = (A, Bp, d) => {
    if (d.boog) { const mx = (A[0] + Bp[0]) / 2, my = (A[1] + Bp[1]) / 2, dx = Bp[0] - A[0], dy = Bp[1] - A[1], L = Math.hypot(dx, dy) || 1, k = Math.min(26, L * .22); return 'M' + A[0].toFixed(1) + ' ' + A[1].toFixed(1) + ' Q' + (mx - dy / L * k).toFixed(1) + ' ' + (my + dx / L * k).toFixed(1) + ' ' + Bp[0].toFixed(1) + ' ' + Bp[1].toFixed(1); }
    const pts = [A, ...(d.via || []), Bp];
    if (!d.via && A[0] !== Bp[0] && A[1] !== Bp[1]) pts.splice(1, 0, d.eerst === 'v' ? [A[0], Bp[1]] : [Bp[0], A[1]]);
    return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  };
  /* de hele schakeling als markup. opts: schema, aansluit (bouwmodus), plekMarkers, waarden, toonKapot, labels */
  function markup(def, opl, opts = {}) {
    const B = bouw(def), schema = !!opts.schema;
    const [, , W, H] = (def.vb || '0 0 320 200').split(' ').map(Number);
    let s = schema
      ? `<rect width="${W}" height="${H}" rx="14" fill="url(#nk-papier)"/>` + Array.from({ length: Math.floor(W / 16) }, (_, i) => `<path d="M${i * 16 + 8} 0 V${H}" stroke="#CFE3F2" stroke-width=".6"/>`).join('') + Array.from({ length: Math.floor(H / 16) }, (_, i) => `<path d="M0 ${i * 16 + 8} H${W}" stroke="#CFE3F2" stroke-width=".6"/>`).join('')
      : `<rect width="${W}" height="${H}" rx="14" fill="url(#nk-hout)"/><path d="M0 ${H * .3} C${W * .3} ${H * .26} ${W * .6} ${H * .34} ${W} ${H * .29} M0 ${H * .72} C${W * .35} ${H * .68} ${W * .7} ${H * .76} ${W} ${H * .7}" stroke="#B9824E" stroke-width="1.2" fill="none" opacity=".35"/><rect width="${W}" height="${H}" rx="14" fill="none" stroke="#B9824E" stroke-width="2" opacity=".5"/><ellipse cx="${W * .3}" cy="${H * .2}" rx="${W * .35}" ry="${H * .14}" fill="#fff" opacity=".12"/>`;
    const segs = [];
    /* draden */
    B.draden.forEach((d, i) => {
      const A = B.pos(d.a), Bp = B.pos(d.b), pad = route(A, Bp, d);
      if (d.kapot && opts.toonKapot) {
        s += `<path d="${pad}" stroke="${schema ? '#2B1726' : (d.kleur || KAB[i % KAB.length])}" stroke-width="${schema ? 2.2 : 5}" fill="none" stroke-dasharray="10 6" opacity=".6"/>`;
      } else if (schema) s += `<path d="${pad}" stroke="#2B1726" stroke-width="2.2" fill="none" stroke-linejoin="round"/>`;
      else {
        const k = d.kleur || (d.a.endsWith('.p') || d.b.endsWith('.p') ? '#D93A3A' : d.a.endsWith('.n') || d.b.endsWith('.n') ? '#2E3440' : KAB[2 + i % 4]);
        s += `<path d="${pad}" stroke="#000" stroke-opacity=".18" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round" transform="translate(1 2)"/><path d="${pad}" stroke="${k}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${pad}" stroke="#fff" stroke-opacity=".38" stroke-width="1.5" fill="none" stroke-linejoin="round" transform="translate(-.6 -1)"/>`;
      }
      if (opts.draadTik) s += `<path class="nk-draadtik" data-draad="${i}" d="${pad}" stroke="transparent" stroke-width="16" fill="none" stroke-linecap="round"/>`;
      segs.push({ d: pad, I: d.kapot ? 0 : (opl.draad[i] || 0) });
    });
    s += '<g class="nk-dots"></g>';
    /* plekOver: hulpdraadjes en meter boven het onderdeel */
    def.onderdelen.filter(c => c.soort === 'plekOver').forEach(c => {
      const o = B.per[c.over], t = aansl(o), A = B.pos(o.id + '.' + t[0]), Bp = B.pos(o.id + '.' + t[1]);
      const off = c.af ?? -30, r = (o.rot || 0) * Math.PI / 180, nx = -Math.sin(r) * -off, ny = Math.cos(r) * off;
      const mx = (A[0] + Bp[0]) / 2 + nx, my = (A[1] + Bp[1]) / 2 + ny;
      c._pos = [mx, my];
      const sterk = !!c.inhoud, kl = schema ? '#2B1726' : '#D93A3A';
      const w2 = 16, p1 = [mx - w2 * Math.cos(r), my - w2 * Math.sin(r)], p2 = [mx + w2 * Math.cos(r), my + w2 * Math.sin(r)];
      const pad1 = `M${A[0]} ${A[1]} L${A[0] + nx} ${A[1] + ny} L${p1[0]} ${p1[1]}`, pad2 = `M${Bp[0]} ${Bp[1]} L${Bp[0] + nx} ${Bp[1] + ny} L${p2[0]} ${p2[1]}`;
      s += `<path d="${pad1} ${pad2.replace('M', 'M')}" stroke="${sterk ? kl : '#EA580C'}" stroke-width="${sterk ? (schema ? 2 : 3) : 1.6}" fill="none" ${sterk ? '' : 'stroke-dasharray="4 3"'} stroke-linejoin="round"/>`;
      if (sterk) { const I = opl.I[c.id] || 0; segs.push({ d: `M${A[0] + nx} ${A[1] + ny} L${Bp[0] + nx} ${Bp[1] + ny}`, I }); }
      s += `<g transform="translate(${mx} ${my}) rotate(${o.rot || 0})" data-comp="${c.id}"${opts.plekMarkers ? ` data-plek="${c.id}"` : ''}>` +
        (sterk ? onderdeel({ ...c, soort: c.inhoud === 'V' ? 'meterV' : 'meterA', w: w2, rot: o.rot }, { ...opl, meter: { [c.id]: opl.meter[c.id] } }, schema, opts)
          : (opts.plekMarkers ? `<g class="nk-plekteken"><circle r="10" fill="#fff" fill-opacity=".9" stroke="#EA580C" stroke-width="2" stroke-dasharray="4 3"/><path d="M-4.5 0 H4.5 M0 -4.5 V4.5" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round"/></g>` : '')) + `</g>`;
    });
    /* onderdelen */
    def.onderdelen.filter(c => c.soort !== 'plekOver').forEach(c => {
      const a = aansl(c);
      if (a.length === 2) {
        const A = B.pos(c.id + '.' + a[0]), Bp = B.pos(c.id + '.' + a[1]);
        let I = c.soort === 'batterij' ? (opl.bron[c.id] || 0) : (opl.I[c.id] || 0);
        if (c.soort === 'lamp' && c.los) I = 0;
        segs.push({ d: `M${A[0]} ${A[1]} L${Bp[0]} ${Bp[1]}`, I, binnen: c.soort });
      }
      const klik = c.klik || (c.soort === 'schakelaar' || c.soort === 'lamp' ? c.id : null);
      s += `<g transform="translate(${c.x} ${c.y}) rotate(${c.rot || 0})" data-comp="${c.id}"${c.soort === 'plek' && opts.plekMarkers ? ` data-plek="${c.id}"` : ''}${klik ? ' class="nk-tikbaar"' : ''}>${onderdeel(c, opl, schema, opts)}` +
        (klik && opts.tikbaar ? `<rect x="${-halve(c) + 4}" y="-26" width="${2 * halve(c) - 8}" height="40" fill="transparent"/>` : '') + `</g>`;
      if (c.label && opts.labels !== false) {
        const vert = Math.abs(((c.rot || 0) % 180)) === 90;
        const lx = c.lx ?? (vert ? c.x + (c.lzijde === 'l' ? -24 : 24) : c.x), ly = c.ly ?? (vert ? c.y + 4 : c.y + (c.soort === 'lamp' && !schema ? 22 : 24));
        s += tekst(lx, ly, c.label, { s: 10.5, a: c.la || (vert ? (c.lzijde === 'l' ? 'end' : 'start') : 'middle') });
      }
      if (c.soort === 'batterij' && opts.labels !== false && !c.label) {
        const vert = Math.abs(((c.rot || 0) % 180)) === 90;
        s += tekst(vert ? c.x + 16 : c.x, vert ? c.y + 4 : c.y + 24, getal(spanningVan(c), 1) + ' V', { s: 10.5, a: vert ? 'start' : 'middle' });
      }
    });
    if (opts.aansluit) {
      def.onderdelen.forEach(c => aansl(c).forEach(t => {
        if (c.soort === 'plekOver') return;
        const key = c.id + '.' + t, [x, y] = B.pos(key);
        s += `<g class="nk-aansl" data-t="${key}"><circle cx="${x}" cy="${y}" r="16" fill="transparent"/><circle class="nk-aansl-ring" cx="${x}" cy="${y}" r="6.5" fill="#fff" stroke="#EA580C" stroke-width="2.2"/><circle cx="${x}" cy="${y}" r="2.2" fill="#EA580C"/></g>`;
      }));
    }
    if (opl.kort) s += `<g><rect x="${W / 2 - 92}" y="6" width="184" height="24" rx="12" fill="#DB5A4A"/>${tekst(W / 2, 22, 'Kortsluiting! De batterij wordt heet.', { s: 11, k: '#fff', halo: false })}</g>`;
    return { s, segs };
  }
  function kringSvg(def, opts = {}) {
    const opl = los(def), { s } = markup(def, opl, { ...opts, aansluit: false });
    return `<svg viewBox="${def.vb || '0 0 320 200'}" class="svgvis" role="img" aria-label="${opts.alt || 'schakeling'}">${s}</svg>`;
  }

  /* ---------------- kant-en-klare schakelingen ---------------- */
  /* serie: batterij onder, lampjes boven; opties: n, cellen, cel, schakelaar (dicht), plekken (meterplekken) */
  function serieDef({ n = 1, cellen = 2, cel = 1.5, schakelaar = null, plekken = false, Rs = null, vb = '0 0 320 210', labels = true } = {}) {
    const on = [{ id: 'B', soort: 'batterij', x: 160, y: 176, cellen, cel }], dr = [];
    const xs = n === 1 ? [160] : n === 2 ? [118, 202] : [92, 160, 228];
    xs.forEach((x, i) => on.push({ id: 'L' + (i + 1), soort: 'lamp', x, y: 64, R: Rs ? Rs[i] : 6, label: labels && n > 1 ? 'lampje ' + (i + 1) : (labels ? 'lampje' : null) }));
    const wB = 8 + 12 * cellen;
    const links = [40, 64], rechts = [280, 64];
    if (schakelaar !== null) on.push({ id: 'S', soort: 'schakelaar', x: 40, y: 118, rot: 90, dicht: !!schakelaar, label: labels ? 'schakelaar' : null, lzijde: 'r' });
    if (plekken) { on.push({ id: 'P1', soort: 'plek', x: 280, y: 118, rot: 90, label: null }); }
    /* rechterkant: B.p -> rechts omhoog -> laatste lamp */
    const laatste = 'L' + n;
    if (plekken) { dr.push(['B.p', 'P1.b', { via: [[280, 176]] }]); dr.push(['P1.a', laatste + '.b', { via: [[280, 64]] }]); }
    else dr.push(['B.p', laatste + '.b', { via: [[280, 176], rechts] }]);
    for (let i = n; i > 1; i--) dr.push(['L' + i + '.a', 'L' + (i - 1) + '.b']);
    if (schakelaar !== null) { dr.push(['L1.a', 'S.a', { via: [links] }]); dr.push(['S.b', 'B.n', { via: [[40, 176]] }]); }
    else dr.push(['L1.a', 'B.n', { via: [links, [40, 176]] }]);
    void wB;
    return { vb, onderdelen: on, draden: dr };
  }
  /* parallel: batterij links, elke tak een rij met (optioneel) een stroommeter en een lampje */
  function parallelDef({ Rs = [6, 6], cellen = 4, cel = 1.5, meters = true, totaal = true, mA = false, labels = true, vb = '0 0 320 210' } = {}) {
    const n = Rs.length, ys = n === 2 ? [74, 138] : n === 3 ? [58, 110, 162] : [50, 90, 130, 170];
    const on = [{ id: 'B', soort: 'batterij', x: 34, y: 116, rot: -90, cellen, cel, label: null }], dr = [];
    const wB = 8 + 12 * cellen, top = 22, bodem = 196;
    if (totaal) { on.push({ id: 'AT', soort: 'meterA', x: 74, y: top, mA, label: null }); dr.push(['B.p', 'AT.a', { via: [[34, top]] }]); }
    ys.forEach((y, i) => {
      const k = i + 1;
      on.push({ id: 'J' + k, soort: 'knoop', x: 112, y }); on.push({ id: 'K' + k, soort: 'knoop', x: 292, y });
      if (meters) on.push({ id: 'A' + k, soort: 'meterA', x: 158, y, mA, label: null });
      on.push({ id: 'L' + k, soort: 'lamp', x: 236, y, R: Rs[i], label: labels ? 'lampje ' + k : null, lx: 250, ly: y - 28, la: 'start' });
      if (meters) { dr.push(['J' + k + '.k', 'A' + k + '.a']); dr.push(['A' + k + '.b', 'L' + k + '.a']); } else dr.push(['J' + k + '.k', 'L' + k + '.a']);
      dr.push(['L' + k + '.b', 'K' + k + '.k']);
      if (k > 1) { dr.push(['J' + (k - 1) + '.k', 'J' + k + '.k']); dr.push(['K' + (k - 1) + '.k', 'K' + k + '.k']); }
    });
    if (totaal) dr.push(['AT.b', 'J1.k', { via: [[112, top]] }]); else dr.push(['B.p', 'J1.k', { via: [[34, top], [112, top]] }]);
    dr.push(['K' + n + '.k', 'B.n', { via: [[292, bodem], [34, bodem]] }]);
    void wB;
    return { vb, onderdelen: on, draden: dr };
  }

  /* =======================================================================
     VOORWERPEN (100 x 100) voor het lab-logboek, kaartjes en zinkdrijf
     ======================================================================= */
  const obj = {
    maatcilinder: ({ vul = .55, kleur = 'url(#nk-water)' } = {}) => {
      const top = 14, bodem = 86, y = bodem - (bodem - top - 6) * vul;
      return schaduw(50, 92, 24) + `<rect x="30" y="86" width="40" height="6" rx="3" fill="url(#nk-plastic)"/>` +
        `<path d="M37 ${y} Q50 ${y + 4} 63 ${y} V84 Q50 88 37 84Z" fill="${kleur}"/>` +
        `<rect x="36" y="10" width="28" height="78" rx="4" fill="url(#nk-glas)" stroke="#8CC6E8" stroke-width="1.6"/>` +
        Array.from({ length: 8 }, (_, i) => `<path d="M57 ${80 - i * 9} H${i % 2 ? 61 : 64}" stroke="#2F5F86" stroke-width="1.2"/>`).join('') +
        `<path d="M40 16 V82" stroke="#fff" stroke-width="2.5" opacity=".7" stroke-linecap="round"/><path d="M34 10 H66" stroke="#8CC6E8" stroke-width="2"/>`;
    },
    blokje: ({ kleur = 'url(#nk-alu)', zijk = '#98A2AE', top = '#FFFFFF', label = '' } = {}) => schaduw(52, 86, 30) +
      `<g filter="url(#nk-schaduw)"><path d="M24 40 L50 28 L78 40 L52 52Z" fill="${top}"/><path d="M24 40 L52 52 V84 L24 72Z" fill="${kleur}"/><path d="M52 52 L78 40 V72 L52 84Z" fill="${zijk}"/></g>` +
      `<path d="M28 42 L50 32" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/>` + (label ? tekst(50, 98, label, { s: 11 }) : ''),
    tanker: () => `<path d="M0 66 H100 V100 H0Z" fill="url(#nk-zee)"/><path d="M0 66 C10 63 20 69 30 66 C40 63 50 69 60 66 C70 63 80 69 90 66 C95 64 98 66 100 66" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>` +
      `<g filter="url(#nk-schaduw)"><path d="M8 54 H92 L84 72 H18Z" fill="url(#nk-rood)"/><path d="M8 54 H92 L90 58 H10Z" fill="#2E3440"/><rect x="62" y="34" width="20" height="20" rx="2" fill="url(#nk-pak)"/><rect x="66" y="38" width="12" height="5" rx="1" fill="url(#nk-vizier)"/><rect x="70" y="24" width="5" height="10" fill="#2E3440"/><path d="M18 50 H58" stroke="#5A606C" stroke-width="3"/></g>` +
      `<path d="M18 72 H84 L82 76 H20Z" fill="#000" opacity=".18"/>`,
    munt: () => schaduw(50, 84, 22, 4) + `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="64" rx="26" ry="10" fill="#9A6A08"/><ellipse cx="50" cy="58" rx="26" ry="10" fill="url(#nk-goud)"/><ellipse cx="50" cy="58" rx="19" ry="7" fill="none" stroke="#FFF2AE" stroke-width="1.6"/>${tekst(50, 62, '1', { s: 11, k: '#7A5200', halo: false })}</g>`,
    kurk: () => schaduw(50, 84, 22) + `<g filter="url(#nk-schaduw)"><path d="M32 40 L68 40 L64 80 L36 80Z" fill="url(#nk-kurk)"/><ellipse cx="50" cy="40" rx="18" ry="6" fill="#F2CB94"/></g>` + [[44, 56], [56, 64], [48, 72], [58, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#8A5A2E" opacity=".6"/>`).join(''),
    ring: () => schaduw(50, 82, 24) + `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="60" rx="26" ry="20" fill="none" stroke="url(#nk-goud)" stroke-width="9"/><path d="M30 50 C38 42 62 42 70 50" stroke="#FFF2AE" stroke-width="2.4" fill="none" opacity=".8"/><path d="M44 36 L50 26 L56 36 L50 42Z" fill="#CFEFFF" stroke="#8CC6E8"/></g>`,
    ijsblok: () => schaduw(50, 84, 26) + `<g filter="url(#nk-schaduw)"><path d="M26 42 L50 32 L76 42 L52 52Z" fill="#F2FBFF" opacity=".95"/><path d="M26 42 L52 52 V80 L26 70Z" fill="#CDEBFA" opacity=".92"/><path d="M52 52 L76 42 V70 L52 80Z" fill="#9FD3F0" opacity=".92"/></g><path d="M32 48 L32 64 M44 58 L46 66" stroke="#fff" stroke-width="2" opacity=".85" stroke-linecap="round"/>`,
    appel: () => schaduw(50, 88, 26) + `<g filter="url(#nk-schaduw)"><path d="M50 34 C38 24 18 30 20 54 C22 76 38 88 50 82 C62 88 78 76 80 54 C82 30 62 24 50 34Z" fill="url(#nk-rood)"/><path d="M50 34 C50 26 52 20 56 16" stroke="#6E4520" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M54 24 C62 16 72 18 74 22 C66 26 60 26 54 24Z" fill="url(#nk-groen)"/></g><ellipse cx="34" cy="46" rx="6" ry="9" fill="#fff" opacity=".4" transform="rotate(20 34 46)"/>`,
    steen: () => schaduw(50, 86, 30) + `<path d="M20 80 C12 62 24 44 44 46 C62 40 84 52 82 70 C82 84 58 86 20 80Z" fill="url(#nk-lood)" filter="url(#nk-schaduw)"/><path d="M32 56 C40 50 52 50 58 52" stroke="#fff" stroke-width="2.4" opacity=".4" fill="none" stroke-linecap="round"/><circle cx="62" cy="68" r="2.6" fill="#3E444E" opacity=".5"/><circle cx="40" cy="70" r="1.8" fill="#3E444E" opacity=".5"/>`,
    houtblok: () => schaduw(52, 86, 30) + `<g filter="url(#nk-schaduw)"><path d="M22 46 L48 36 L80 46 L54 56Z" fill="#F4CF98"/><path d="M22 46 L54 56 V80 L22 70Z" fill="url(#nk-houtje)"/><path d="M54 56 L80 46 V70 L54 80Z" fill="#9A6234"/></g><ellipse cx="50" cy="46" rx="10" ry="3.5" fill="none" stroke="#C99260" stroke-width="1"/><ellipse cx="50" cy="46" rx="5" ry="1.8" fill="none" stroke="#C99260" stroke-width="1"/>`,
    voetbal: () => schaduw(50, 90, 26) + `<g filter="url(#nk-schaduw)"><circle cx="50" cy="56" r="30" fill="#fff" stroke="#C9C4C8" stroke-width="1.5"/><path d="M50 44 L61 52 L57 65 L43 65 L39 52Z" fill="#2B60B8"/><path d="M50 44 V28 M61 52 L76 46 M57 65 L66 79 M43 65 L34 79 M39 52 L24 46" stroke="#5A606C" stroke-width="1.4"/><path d="M42 28 L50 26 L58 28 L56 34 L44 34Z M74 42 L80 52 L76 58 L72 50Z M20 52 L24 42 L28 50 L24 58Z" fill="#F4C430"/></g><ellipse cx="38" cy="40" rx="9" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 38 40)"/>`,
    zwemband: () => schaduw(50, 84, 30) + `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="60" rx="34" ry="20" fill="url(#nk-rood)"/><ellipse cx="50" cy="58" rx="15" ry="8" fill="url(#nk-zee)"/>${[[22, 54], [78, 54], [50, 76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="#fff"/>`).join('')}</g><path d="M26 48 C36 42 62 42 74 48" stroke="#fff" stroke-width="2.4" opacity=".55" fill="none"/>`,
    kaars: () => schaduw(50, 90, 18) + `<g filter="url(#nk-schaduw)"><rect x="38" y="38" width="24" height="50" rx="3" fill="url(#nk-papier)" stroke="#E6DCCB"/><path d="M38 44 C44 48 56 48 62 44" stroke="#E6DCCB" stroke-width="2" fill="none"/></g><path d="M50 38 V30" stroke="#2E3440" stroke-width="1.6"/><path d="M50 12 C56 20 56 28 50 30 C44 28 44 20 50 12Z" fill="url(#nk-gloei)"/><path d="M50 18 C53 23 53 27 50 28 C47 27 47 23 50 18Z" fill="#FF9A1A"/>`,
    rontgenfoto: () => `<rect x="14" y="8" width="72" height="84" rx="6" fill="#141B2C" stroke="#5A6A86" stroke-width="2"/><path d="M40 86 C38 70 36 60 34 50 M48 86 C47 66 46 50 46 30 M56 86 C57 66 58 48 60 28 M64 86 C66 70 68 56 72 42 M36 86 C30 76 24 70 20 64" stroke="#3B4A66" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/>` +
      `<path d="M40 86 C38 72 37 62 35 52 M48 86 C47 68 46 54 46 34 M56 86 C57 68 58 52 60 32 M64 86 C66 72 68 58 71 46 M36 86 C31 78 26 72 22 66" stroke="#F4F6FA" stroke-width="4" stroke-linecap="round" fill="none" stroke-dasharray="11 2.5"/><text x="80" y="18" font-size="7" text-anchor="end" fill="#9FB0CC">L</text>`,
    jodium: () => schaduw(50, 90, 30) + `<g filter="url(#nk-schaduw)"><path d="M10 70 C10 58 22 54 50 54 C78 54 90 58 90 70 C90 82 78 86 50 86 C22 86 10 82 10 70Z" fill="#F4E2C0" stroke="#D9B98A" stroke-width="2"/><path d="M18 70 C18 62 28 60 50 60 C72 60 82 62 82 70 C82 78 72 80 50 80 C28 80 18 78 18 70Z" fill="#FFF8EA"/>` +
      `<ellipse cx="54" cy="70" rx="12" ry="6" fill="#1E2A6E" opacity=".9"/><ellipse cx="50" cy="68" rx="4" ry="2" fill="#5A6AC0" opacity=".8"/></g>` +
      `<g filter="url(#nk-schaduw)"><rect x="60" y="10" width="14" height="22" rx="3" fill="#8A4A1A" opacity=".9"/><rect x="62" y="6" width="10" height="6" rx="2" fill="#2E3440"/><path d="M67 32 V44" stroke="#C9850A" stroke-width="3"/><circle cx="67" cy="50" r="3" fill="#C98A2A"/></g>`,
    meetlint: () => schaduw(50, 88, 30) + `<g filter="url(#nk-schaduw)"><circle cx="34" cy="56" r="24" fill="url(#nk-meter)"/><circle cx="28" cy="46" r="8" fill="#fff" opacity=".35"/><circle cx="34" cy="56" r="8" fill="#2E3440"/><path d="M52 66 H96 V78 H50Z" fill="#FFF2AE" stroke="#C99A10" stroke-width="1"/></g>` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${56 + i * 5} 66 v${i % 2 ? 4 : 7}" stroke="#5A3A00" stroke-width="1"/>`).join('') + tekst(74, 92, '25 m', { s: 11 }),
    astronaut: () => `<circle cx="50" cy="50" r="46" fill="url(#nk-ruimte)"/><circle cx="76" cy="26" r="9" fill="url(#nk-maan)"/>` + schaduw(50, 92, 20, 3, .3) +
      `<g filter="url(#nk-schaduw)"><path d="M30 92 C30 70 38 64 50 64 C62 64 70 70 70 92Z" fill="url(#nk-pak)"/><circle cx="50" cy="44" r="22" fill="url(#nk-pak)"/><rect x="34" y="34" width="32" height="20" rx="10" fill="url(#nk-vizier)"/><ellipse cx="42" cy="39" rx="6" ry="3" fill="#fff" opacity=".7"/><rect x="44" y="74" width="12" height="8" rx="2" fill="#EA580C"/></g>`,
    trap: () => `<path d="M10 86 H90" stroke="#C99260" stroke-width="2"/>` + [['kg', 18, 28], ['g', 42, 50], ['mg', 66, 72]].map(([t, x, y]) => `<g filter="url(#nk-schaduw)"><rect x="${x - 10}" y="${y}" width="34" height="${86 - y}" rx="3" fill="url(#nk-houtje)"/><rect x="${x - 10}" y="${y}" width="34" height="4" rx="2" fill="#F4CF98"/></g>${tekst(x + 7, y + 18, t, { s: 13 })}`).join('') +
      `<path d="M30 20 C40 18 48 24 50 34" stroke="#EA580C" stroke-width="2.6" fill="none" marker-end=""/><path d="M47 30 L50 36 L54 30" stroke="#EA580C" stroke-width="2.6" fill="none"/>${tekst(28, 16, '×1000', { s: 9, k: '#EA580C' })}`,
    lampje: ({ aan = true } = {}) => schaduw(50, 92, 20) + (aan ? `<circle cx="50" cy="40" r="40" fill="url(#nk-gloei)"/>` : '') +
      `<g filter="url(#nk-schaduw)"><rect x="40" y="62" width="20" height="18" rx="3" fill="url(#nk-alu)"/><path d="M40 67 H60 M40 72 H60 M40 77 H60" stroke="#8A939E" stroke-width="1.2"/><path d="M44 80 H56 L52 88 H48Z" fill="#2E3440"/></g>` +
      `<circle cx="50" cy="40" r="24" fill="url(#nk-glas)" stroke="#9CC7E0" stroke-width="2"/>` + (aan ? `<circle cx="50" cy="40" r="22" fill="#FFE680" opacity=".6"/>` : '') +
      `<path d="M45 62 V44 L47 36 L50 44 L53 36 L55 44 V62" stroke="${aan ? '#FF8A00' : '#7A6A60'}" stroke-width="2" fill="none" stroke-linejoin="round"/><ellipse cx="41" cy="30" rx="7" ry="4" fill="#fff" opacity=".85" transform="rotate(-30 41 30)"/>`,
    potlood: () => `<path d="M10 82 C30 74 46 84 62 72" stroke="#4D5056" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      `<g filter="url(#nk-schaduw)" transform="rotate(-40 50 50)"><rect x="18" y="42" width="56" height="16" fill="#F4C430"/><rect x="18" y="42" width="56" height="5" fill="#FFE27A"/><rect x="18" y="54" width="56" height="4" fill="#C99A10"/><path d="M74 42 L88 50 L74 58Z" fill="#F2CB94"/><path d="M83 47 L88 50 L83 53Z" fill="#2B2B30"/><rect x="8" y="42" width="10" height="16" rx="2" fill="#F28C9E"/><rect x="16" y="42" width="3" height="16" fill="#B6BEC8"/></g>` +
      `<path d="M66 20 L70 28 L64 28 L68 36" stroke="#F4B740" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`,
    stroommeter: () => schaduw(50, 92, 28) + `<g filter="url(#nk-schaduw)"><rect x="18" y="14" width="64" height="74" rx="10" fill="url(#nk-meter)"/><rect x="20" y="16" width="60" height="8" rx="4" fill="#fff" opacity=".35"/><rect x="26" y="26" width="48" height="24" rx="4" fill="url(#nk-lcd)" stroke="#5E6B55"/>` +
      `<text x="50" y="43" font-size="12" text-anchor="middle" fill="#1E2A1A" font-weight="700" font-family="ui-monospace,Consolas,monospace">0,25 A</text><circle cx="50" cy="66" r="11" fill="#2E3440"/><path d="M50 66 L56 58" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="34" cy="80" r="4" fill="#2E3440"/><circle cx="66" cy="80" r="4" fill="#D93A3A"/></g>`,
    ballon: () => `<path d="M50 72 C48 80 54 86 50 96" stroke="#9A8A94" stroke-width="1.6" fill="none"/>` + `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="40" rx="26" ry="31" fill="url(#nk-ballon)"/><path d="M46 70 L54 70 L50 76Z" fill="#A8241A"/></g><ellipse cx="40" cy="28" rx="7" ry="11" fill="#fff" opacity=".45" transform="rotate(20 40 28)"/>` +
      `<g transform="translate(60 66) scale(.4)" filter="url(#nk-schaduw)"><rect x="0" y="0" width="52" height="30" rx="5" fill="url(#nk-batt)"/><rect x="34" y="0" width="18" height="30" rx="4" fill="url(#nk-batt-kop)"/><rect x="52" y="9" width="7" height="12" rx="2" fill="url(#nk-alu)"/></g>`,
    schema: () => `<rect x="8" y="8" width="84" height="84" rx="8" fill="url(#nk-papier)" stroke="#CFE3F2"/><path d="M22 30 H78 V74 H22 Z" stroke="#2B1726" stroke-width="2.4" fill="none"/>` +
      `<rect x="40" y="70" width="4" height="10" fill="#2B1726"/><rect x="48" y="66" width="2" height="18" fill="#FFFFFF"/><rect x="48" y="66" width="2" height="18" fill="#2B1726"/><rect x="41" y="72" width="10" height="4" fill="url(#nk-papier)"/>` +
      `<circle cx="50" cy="30" r="9" fill="#fff" stroke="#2B1726" stroke-width="2.4"/><path d="M44 24 L56 36 M56 24 L44 36" stroke="#2B1726" stroke-width="2"/><circle cx="78" cy="52" r="8" fill="#fff" stroke="#2B1726" stroke-width="2.2"/><text x="78" y="56" font-size="10" text-anchor="middle" fill="#2B1726" font-weight="700">A</text>`,
    splitsing: () => `<path d="M8 50 H36 M36 50 C46 50 46 26 60 26 H92 M36 50 H92 M36 50 C46 50 46 74 60 74 H92" stroke="#2F7FB8" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<circle cx="36" cy="50" r="4.5" fill="url(#nk-koper)"/>${tekst(20, 42, '3 A', { s: 11 })}${tekst(78, 20, '1 A', { s: 10 })}${tekst(78, 44, '1 A', { s: 10 })}${tekst(78, 68, '1 A', { s: 10 })}` +
      [[16, 50], [64, 26], [70, 50], [62, 74], [84, 26], [86, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="url(#nk-lading)" stroke="#8A5A00" stroke-width=".5"/>`).join(''),
    telefoon: ({ kapot = false, laad = false } = {}) => schaduw(50, 92, 20) + `<g filter="url(#nk-schaduw)"><rect x="32" y="12" width="36" height="74" rx="7" fill="url(#nk-batt)"/><rect x="35" y="18" width="30" height="58" rx="3" fill="${kapot ? '#2B1726' : 'url(#nk-vizier)'}"/></g>` +
      (laad ? `<rect x="44" y="38" width="12" height="18" rx="2" fill="none" stroke="#9BEA9E" stroke-width="2"/><rect x="46" y="46" width="8" height="8" fill="#9BEA9E"/><path d="M48 36 h4" stroke="#9BEA9E" stroke-width="2"/>` : '') +
      (kapot ? `<path d="M38 24 L50 40 L44 48 L58 66 M50 40 L62 34" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/><path d="M60 8 C66 2 70 8 66 12 M70 14 C78 12 78 20 72 20" stroke="#9A8A94" stroke-width="2" fill="none"/>` : `<ellipse cx="42" cy="26" rx="5" ry="3" fill="#fff" opacity=".35"/>`) + `<circle cx="50" cy="81" r="2" fill="#5A606C"/>`,
    adapter: () => schaduw(50, 90, 24) + `<g filter="url(#nk-schaduw)"><rect x="26" y="30" width="48" height="42" rx="8" fill="url(#nk-pak)"/><rect x="28" y="32" width="44" height="8" rx="4" fill="#fff" opacity=".7"/><rect x="36" y="18" width="5" height="14" rx="2" fill="url(#nk-staal)"/><rect x="59" y="18" width="5" height="14" rx="2" fill="url(#nk-staal)"/></g>` +
      tekst(50, 52, 'in 230 V', { s: 7.5, halo: false, k: '#5A4A55' }) + tekst(50, 63, 'uit 5 V', { s: 7.5, halo: false, k: '#EA580C' }) + `<path d="M50 72 C50 84 62 86 70 92" stroke="#2E3440" stroke-width="3" fill="none"/>`,
    stopcontact: () => `<g filter="url(#nk-schaduw)"><rect x="18" y="18" width="64" height="64" rx="12" fill="url(#nk-pak)"/><circle cx="50" cy="50" r="22" fill="#E6EAF0" stroke="#C9CED6" stroke-width="2"/><circle cx="41" cy="50" r="4" fill="#3A3F4A"/><circle cx="59" cy="50" r="4" fill="#3A3F4A"/><rect x="47" y="28" width="6" height="5" rx="1" fill="url(#nk-staal)"/><rect x="47" y="67" width="6" height="5" rx="1" fill="url(#nk-staal)"/></g><ellipse cx="34" cy="28" rx="10" ry="4" fill="#fff" opacity=".7"/>`,
    batterijAA: () => schaduw(50, 88, 26) + `<g filter="url(#nk-schaduw)" transform="rotate(-20 50 55)"><rect x="18" y="42" width="56" height="26" rx="5" fill="url(#nk-batt)"/><rect x="54" y="42" width="20" height="26" rx="4" fill="url(#nk-batt-kop)"/><rect x="74" y="50" width="7" height="10" rx="2" fill="url(#nk-alu)"/><rect x="20" y="44" width="52" height="5" rx="2.5" fill="#fff" opacity=".2"/>${tekst(36, 59, '1,5 V', { s: 9, k: '#fff', halo: false })}</g>`,
    blokbatterij: () => schaduw(50, 90, 22) + `<g filter="url(#nk-schaduw)"><rect x="30" y="26" width="40" height="60" rx="5" fill="url(#nk-batt)"/><rect x="30" y="26" width="40" height="18" rx="5" fill="url(#nk-batt-kop)"/><rect x="36" y="18" width="10" height="9" rx="2" fill="url(#nk-staal)"/><path d="M56 18 h8 l2 4 l-2 4 h-8 l-2 -4z" fill="url(#nk-staal)"/>${tekst(50, 64, '9 V', { s: 12, k: '#fff', halo: false })}</g>`,
    accu: () => schaduw(50, 90, 34) + `<g filter="url(#nk-schaduw)"><rect x="14" y="36" width="72" height="50" rx="6" fill="url(#nk-rubber)"/><rect x="14" y="36" width="72" height="10" rx="5" fill="#5A606C"/><rect x="24" y="28" width="10" height="9" rx="2" fill="url(#nk-rood)"/><rect x="66" y="28" width="10" height="9" rx="2" fill="#2E3440"/>${tekst(50, 70, '12 V', { s: 13, k: '#fff', halo: false })}</g>`,
    knoopcel: () => schaduw(50, 78, 26) + `<g filter="url(#nk-schaduw)"><ellipse cx="50" cy="62" rx="30" ry="12" fill="#8A939E"/><rect x="20" y="50" width="60" height="12" fill="url(#nk-staal)"/><ellipse cx="50" cy="50" rx="30" ry="12" fill="url(#nk-alu)"/><ellipse cx="50" cy="50" rx="20" ry="7" fill="none" stroke="#fff" stroke-width="1.5"/>${tekst(50, 54, '3 V', { s: 9, halo: false })}</g>`,
    zonnecel: () => schaduw(50, 90, 34) + `<g filter="url(#nk-schaduw)"><path d="M14 74 L30 30 H90 L74 74Z" fill="#1E3A6E"/>${[0, 1, 2].map(i => `<path d="M${30 - i * 5.3 + 0} ${30 + i * 14.7} H${90 - i * 5.3}" stroke="#9FC0EA" stroke-width="1"/>`).join('')}${[0, 1, 2, 3].map(i => `<path d="M${30 + i * 15} 30 L${14 + i * 15} 74" stroke="#9FC0EA" stroke-width="1"/>`).join('')}<path d="M44 74 V88 M60 74 V88" stroke="#8A939E" stroke-width="3"/></g><path d="M34 36 L48 36 L44 46 L30 46Z" fill="#fff" opacity=".25"/>`,
    boormachine: () => schaduw(50, 90, 30) + `<g filter="url(#nk-schaduw)"><path d="M20 30 H70 C78 30 80 46 70 46 H48 L44 82 H30 L32 46 H20Z" fill="url(#nk-groen)"/><rect x="70" y="35" width="20" height="6" rx="2" fill="url(#nk-staal)"/><rect x="26" y="74" width="24" height="14" rx="3" fill="url(#nk-batt)"/>${tekst(38, 85, '18 V', { s: 7.5, k: '#fff', halo: false })}</g>`,
    hoogspanning: () => `<path d="M50 8 L30 92 M50 8 L70 92 M38 60 H62 M34 76 H66 M42 40 H58 M20 28 H80 M26 48 H74" stroke="url(#nk-staal)" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M20 28 C30 34 40 34 50 30 M80 28 C70 34 60 34 50 30" stroke="#2E3440" stroke-width="1.2" fill="none"/><path d="M60 14 L54 24 L60 24 L54 34" stroke="#F4C430" stroke-width="3" fill="none" stroke-linejoin="round"/>`,
    weegschaal: () => schaduw(50, 90, 30) + `<g filter="url(#nk-schaduw)"><rect x="16" y="56" width="68" height="30" rx="8" fill="url(#nk-pak)"/><rect x="30" y="62" width="40" height="14" rx="3" fill="url(#nk-lcd)"/>${tekst(50, 73, '52 kg', { s: 9, halo: false, k: '#1E2A1A' })}</g>`,
  };

  /* =======================================================================
     GIDS (Vonk, een lampje met een veiligheidsbril) en BAZEN (met idle-beweging)
     ======================================================================= */
  const gids = `<svg viewBox="0 0 100 100" aria-hidden="true"><g class="nk-adem">` +
    `<circle cx="50" cy="44" r="40" fill="url(#nk-gloei)" opacity=".55"/>` +
    `<rect x="36" y="70" width="28" height="18" rx="4" fill="url(#nk-alu)"/><path d="M36 75 H64 M36 80 H64 M36 85 H64" stroke="#8A939E" stroke-width="1.4"/><path d="M42 88 H58 L54 95 H46Z" fill="#2E3440"/>` +
    `<circle cx="50" cy="42" r="30" fill="url(#nk-lamp)" stroke="#E0B030" stroke-width="2"/>` +
    `<path d="M24 30 C30 18 70 18 76 30" stroke="#2F7FB8" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="29" y="22" width="18" height="11" rx="5" fill="#BFE6FF" stroke="#2F7FB8" stroke-width="2.4" opacity=".95"/><rect x="53" y="22" width="18" height="11" rx="5" fill="#BFE6FF" stroke="#2F7FB8" stroke-width="2.4" opacity=".95"/>` +
    oog(40, 45, 5.6, { lid: '#FFF0A0', iris: '#3A6FB0' }) + oog(60, 45, 5.6, { lid: '#FFF0A0', iris: '#3A6FB0' }) +
    `<path d="M41 57 C46 63 54 63 59 57" stroke="#B9650E" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="32" cy="54" rx="5" ry="3" fill="#F7A6A0" opacity=".7"/><ellipse cx="68" cy="54" rx="5" ry="3" fill="#F7A6A0" opacity=".7"/>` +
    `<ellipse cx="36" cy="30" rx="6" ry="3.5" fill="#fff" opacity=".8" transform="rotate(-30 36 30)"/></g></svg>`;

  let baasNr = 0;
  /* vorm: 'blob' | 'lamp' | 'blok' | 'druppel' | 'ballon' | 'batterij' ; ogen 1-3 ; extra = svg erboven */
  function baas({ vorm = 'blob', kleur = '#8E5BB0', kleur2 = '#4E2A6A', licht = '#FFFFFF', ogen = 2, iris = '#3D1B33', mond = 'grijns', extra = '', achter = '' } = {}) {
    const id = 'nkb' + (++baasNr), f = `url(#${id})`;
    const grad = `<defs><radialGradient id="${id}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${licht}" stop-opacity=".9"/><stop offset=".25" stop-color="${kleur}"/><stop offset="1" stop-color="${kleur2}"/></radialGradient></defs>`;
    let lijf = '', oy = 56, lid = kleur;
    if (vorm === 'lamp') { lijf = `<rect x="44" y="84" width="32" height="20" rx="4" fill="url(#nk-alu)"/><path d="M44 90 H76 M44 96 H76" stroke="#8A939E" stroke-width="1.6"/><path d="M60 14 C30 14 20 40 28 60 C34 74 44 78 44 86 H76 C76 78 86 74 92 60 C100 40 90 14 60 14Z" fill="${f}" stroke="${kleur2}" stroke-width="2"/>`; oy = 48; }
    else if (vorm === 'blok') { lijf = `<path d="M22 40 L60 22 L100 40 L62 58Z" fill="${kleur}"/><path d="M22 40 L62 58 V108 L22 90Z" fill="${f}"/><path d="M62 58 L100 40 V90 L62 108Z" fill="${kleur2}"/><path d="M28 44 L58 30" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/>`; oy = 74; }
    else if (vorm === 'druppel') { lijf = `<path d="M60 10 C76 36 98 54 98 78 C98 100 80 112 60 112 C40 112 22 100 22 78 C22 54 44 36 60 10Z" fill="${f}" stroke="${kleur2}" stroke-width="2"/>`; oy = 70; }
    else if (vorm === 'ballon') { lijf = `<path d="M60 96 C58 104 64 110 60 118" stroke="#9A8A94" stroke-width="2" fill="none"/><ellipse cx="60" cy="54" rx="40" ry="44" fill="${f}"/><path d="M54 96 H66 L60 104Z" fill="${kleur2}"/>`; oy = 50; }
    else if (vorm === 'batterij') { lijf = `<rect x="26" y="24" width="68" height="86" rx="10" fill="${f}"/><rect x="26" y="24" width="68" height="26" rx="10" fill="url(#nk-batt-kop)"/><rect x="48" y="12" width="24" height="14" rx="4" fill="url(#nk-alu)"/>`; oy = 72; }
    else { lijf = `<path d="M18 104 C8 70 26 26 60 24 C94 26 112 70 102 104 C96 118 24 118 18 104Z" fill="${f}"/>`; oy = 60; }
    if (vorm === 'blok') lid = kleur2;
    const xs = ogen === 1 ? [60] : ogen === 3 ? [44, 60, 76] : [48, 72];
    const ogenSvg = xs.map((x, i) => oog(x, oy - (ogen === 3 && i === 1 ? 6 : 0), ogen === 1 ? 11 : 8, { iris, lid })).join('');
    const wenk = `<path d="M${xs[0] - 9} ${oy - 13} L${xs[0] + 4} ${oy - 9} M${xs[xs.length - 1] + 9} ${oy - 13} L${xs[xs.length - 1] - 4} ${oy - 9}" stroke="${kleur2}" stroke-width="3.4" stroke-linecap="round"/>`;
    const my = oy + 22;
    const mondSvg = mond === 'open' ? `<path d="M46 ${my} C50 ${my + 14} 70 ${my + 14} 74 ${my} Z" fill="#5A1A2A"/><path d="M50 ${my + 1} l3 4 l3 -4 M64 ${my + 1} l3 4 l3 -4" fill="#fff"/>`
      : `<path d="M46 ${my} C52 ${my + 8} 68 ${my + 8} 74 ${my}" stroke="${kleur2}" stroke-width="3.2" fill="#fff"/><path d="M52 ${my + 2} l3 4 l3 -4 M62 ${my + 2} l3 4 l3 -4" fill="#fff" stroke="${kleur2}" stroke-width="1"/>`;
    const glans = vorm === 'blok' ? '' : `<ellipse cx="42" cy="${vorm === 'druppel' ? 52 : 38}" rx="12" ry="6" fill="#fff" opacity=".35" transform="rotate(-25 42 40)"/>`;
    return `<svg viewBox="0 0 120 120" aria-hidden="true" class="nk-baas">${grad}${schaduw(60, 115, 40, 5, .16)}${achter}<g class="nk-adem">${lijf}${glans}${ogenSvg}${wenk}${mondSvg}</g>${extra}</svg>`;
  }

  return { getal, kort, tekst, schaduw, oog, kring: { los, markup, verbonden, bouw, aansl, halve, spanningVan, MATERIAAL }, kringSvg, serieDef, parallelDef, obj, gids, baas };
})();
