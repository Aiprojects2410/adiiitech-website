/* ADIIITECH_ — Futuristic Ad Manager */
(function () {
  'use strict';

  const KEY = 'adt_ads_config';
  const DEFAULTS = {
    enabled: true,
    slots: {
      hero: { enabled: true, label: 'PARTNER SPOTLIGHT', title: 'Your Brand in the Future of Tech', description: 'Premium placement for tools, apps and tech brands.', button: 'EXPLORE', url: '#', type: 'native' },
      apps: { enabled: true, label: 'ADVERTISEMENT', title: 'Power Up Your Tech Stack', description: 'Discover tools worth trying.', button: 'LEARN MORE', url: '#', type: 'native' },
      footer: { enabled: true, label: 'ADVERTISEMENT', title: 'Built for the Next Generation', description: 'A clean, premium ad placement.', button: 'VISIT', url: '#', type: 'native' }
    }
  };

  function getConfig() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return DEFAULTS; }
  }

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>\"]/g, function (c) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;' })[c]; });
  }

  function createSlot(slot, data) {
    if (!data || !data.enabled) return null;
    const el = document.createElement('section');
    el.className = 'ad-section ad-section-' + slot;
    el.innerHTML = `
      <div class="ad-native-card">
        <div class="ad-meta"><span class="ad-pulse"></span><span>${escapeHTML(data.label || 'ADVERTISEMENT')}</span><span class="ad-line"></span><span>SPONSORED</span></div>
        <div class="ad-copy"><h3>${escapeHTML(data.title)}</h3><p>${escapeHTML(data.description)}</p></div>
        <a class="ad-cta" href="${escapeHTML(data.url || '#')}" target="_blank" rel="sponsored noopener">${escapeHTML(data.button || 'EXPLORE')} <span>→</span></a>
      </div>`;
    return el;
  }

  function mount() {
    const config = getConfig();
    document.querySelectorAll('.ad-section').forEach(function (e) { e.remove(); });
    if (!config.enabled) return;

    const hero = document.querySelector('#home');
    const apps = document.querySelector('#apps');
    const footer = document.querySelector('footer.footer');
    const h = createSlot('hero', config.slots.hero);
    const a = createSlot('apps', config.slots.apps);
    const f = createSlot('footer', config.slots.footer);
    if (h && hero) hero.insertAdjacentElement('afterend', h);
    if (a && apps) apps.insertAdjacentElement('afterend', a);
    if (f && footer) footer.insertAdjacentElement('beforebegin', f);
  }

  const style = document.createElement('style');
  style.textContent = `
    .ad-section{position:relative;z-index:2;padding:18px 20px;max-width:1200px;margin:0 auto}
    .ad-native-card{position:relative;display:flex;align-items:center;gap:28px;padding:18px 22px;border:1px solid rgba(0,245,255,.16);border-radius:16px;background:linear-gradient(120deg,rgba(180,77,255,.07),rgba(0,245,255,.035));box-shadow:0 0 28px rgba(180,77,255,.06);overflow:hidden}
    .ad-native-card:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(0,245,255,.035),transparent);pointer-events:none}
    .ad-meta{display:flex;align-items:center;gap:8px;min-width:150px;color:#6d6d91;font:600 10px/1 'Orbitron',sans-serif;letter-spacing:1.5px;white-space:nowrap}
    .ad-pulse{width:6px;height:6px;border-radius:50%;background:#00f5ff;box-shadow:0 0 10px #00f5ff}.ad-line{width:28px;height:1px;background:rgba(0,245,255,.25)}
    .ad-copy{flex:1;min-width:0}.ad-copy h3{margin:0 0 3px;color:#e8e8ff;font:600 16px/1.25 'Orbitron',sans-serif}.ad-copy p{margin:0;color:#77779b;font:400 13px/1.4 'Rajdhani',sans-serif}
    .ad-cta{display:inline-flex;align-items:center;gap:10px;padding:10px 16px;border:1px solid rgba(180,77,255,.45);border-radius:9px;color:#e8e8ff;background:rgba(180,77,255,.11);font:600 11px/1 'Orbitron',sans-serif;letter-spacing:1px;white-space:nowrap;transition:.25s}.ad-cta:hover{transform:translateY(-1px);box-shadow:0 0 18px rgba(180,77,255,.2);border-color:rgba(0,245,255,.55)}
    @media(max-width:700px){.ad-section{padding:12px 14px}.ad-native-card{display:block;padding:16px}.ad-meta{margin-bottom:10px}.ad-copy h3{font-size:14px}.ad-copy p{font-size:12px;margin-bottom:12px}.ad-cta{width:100%;justify-content:center}}
  `;
  document.head.appendChild(style);
  window.AdiitechAds = { mount: mount, getConfig: getConfig, key: KEY };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
