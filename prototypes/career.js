// Shared career data and HTML overlay helpers for the three prototype directions.
// Heights/weights are an illustrative design scale, not a metric.
export const STOPS = [
  { id: 'exeter', name: 'University of Exeter', short: 'Exeter', role: 'BA Anthropology', when: '2017–2020', place: 'Exeter', proof: 'Curated artefacts for the John Douglas Museum', weight: 1.0, lines: ['people'] },
  { id: 'ucl', name: 'UCL', short: 'UCL', role: 'MSc Digital Anthropology', when: '2020–2021', place: 'London', proof: 'Thesis on diasporic media networks', weight: 1.3, lines: ['people'] },
  { id: 'echobox', name: 'Echobox', short: 'Echobox', role: 'Business Development Executive', when: '2022', place: 'London', proof: 'AI newsroom optimisation with The Associated Press', weight: 1.7, lines: ['gtm', 'build', 'people'] },
  { id: 'cloudflare', name: 'Cloudflare', short: 'Cloudflare', role: 'Enterprise BDR', when: '2022–2026', place: 'London', proof: '143% avg. quota · 4× Top Outbound BDR', weight: 2.6, lines: ['gtm', 'build', 'people'] },
  { id: 'google', name: 'Google', short: 'Google', role: 'Account Strategist', when: '2026–now', place: 'Dublin', proof: '100.2% revenue run rate · 90% adoption', weight: 3.2, lines: ['gtm', 'ads', 'build'], here: true },
  { id: 'auditor', name: 'Tag & Consent Auditor', short: 'Side project', role: 'Chrome extension I built', when: '2026', place: 'Prototype · in testing', proof: 'Audits tags and Consent Mode in one click', weight: 1.4, lines: ['ads', 'build'] },
];

export const LINES = {
  gtm: { name: 'Go-to-market' },
  ads: { name: 'Ads & measurement' },
  build: { name: 'Build & AI' },
  people: { name: 'People & research' },
};

// Labels that follow 3D anchor points.
export function makeLabels(layer, render) {
  const els = STOPS.map((s, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'tag';
    el.dataset.id = s.id;
    el.innerHTML = render(s, i);
    layer.appendChild(el);
    return el;
  });
  return {
    els,
    update(THREE, camera, anchors, w, h) {
      const v = new THREE.Vector3();
      anchors.forEach((a, i) => {
        v.copy(a).project(camera);
        const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
        const el = els[i];
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        el.style.visibility = v.z < 1 ? 'visible' : 'hidden';
      });
    },
  };
}

// Bottom timeline rail: the readable index of the visualisation.
export function makeRail(rail, onPick) {
  rail.innerHTML = STOPS.map(s => `<button type="button" data-id="${s.id}"><span>${s.when}</span><b>${s.short}</b></button>`).join('');
  const btns = [...rail.querySelectorAll('button')];
  btns.forEach(b => b.addEventListener('click', () => onPick(b.dataset.id)));
  return {
    set(id) { btns.forEach(b => b.classList.toggle('on', b.dataset.id === id)); },
  };
}

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ease(t) { return 1 - Math.pow(1 - t, 4); }
