/* ADIIITECH_ — Ads Control Center */
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
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || DEFAULTS; } catch(e) { return DEFAULTS; } }
  function save(v) { localStorage.setItem(KEY, JSON.stringify(v)); }
  function esc(v) { return String(v || '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c])); }
  function renderAds() {
    const c = read();
    document.getElementById('section-content').innerHTML = `
      <div class="page-header"><div class="page-title-group"><span class="page-tag">// REVENUE CONTROL</span><h1 class="page-title">Ads Manager</h1></div>
        <button class="btn-save" id="ads-save-all">Save Ads Configuration</button></div>
      <div class="ad-admin-hero"><div><span class="page-tag">// MONETIZATION</span><h2>Futuristic Ad Network</h2><p>Control every premium ad placement without touching the website code.</p></div><label class="ad-master"><input type="checkbox" id="ads-master" ${c.enabled ? 'checked' : ''}><span></span><b>ADS LIVE</b></label></div>
      <div class="ad-admin-grid">${['hero','apps','footer'].map((slot, i) => {
        const d = c.slots[slot] || DEFAULTS.slots[slot];
        const names = ['Hero Spotlight','Apps Break','Footer Spotlight'];
        return `<div class="ad-admin-card"><div class="ad-card-head"><div><span class="page-tag">// SLOT 0${i+1}</span><h3>${names[i]}</h3></div><label class="ad-toggle"><input type="checkbox" data-field="${slot}.enabled" ${d.enabled ? 'checked' : ''}><span></span></label></div>
          <div class="ad-preview"><span>${esc(d.label)}</span><strong>${esc(d.title)}</strong><small>${esc(d.description)}</small></div>
          <div class="ad-fields"><label>Label<input data-slot="${slot}" data-key="label" value="${esc(d.label)}"></label><label>Headline<input data-slot="${slot}" data-key="title" value="${esc(d.title)}"></label><label>Description<textarea data-slot="${slot}" data-key="description">${esc(d.description)}</textarea></label><div class="ad-two"><label>Button<input data-slot="${slot}" data-key="button" value="${esc(d.button)}"></label><label>Destination URL<input data-slot="${slot}" data-key="url" value="${esc(d.url)}"></label></div></div>
        </div>`;
      }).join('')}</div>
      <div class="ad-admin-note"><span>ⓘ</span><div><b>AdSense-ready layout</b><p>These slots are styled as native sponsored placements. Later, the same placements can be connected to Google AdSense or direct sponsors without redesigning the page.</p></div></div>`;
    document.getElementById('ads-master').onchange = function(e){ c.enabled = e.target.checked; save(c); window.AdiitechAds && window.AdiitechAds.mount(); toast(c.enabled ? 'Ads enabled' : 'Ads disabled'); };
    document.querySelectorAll('[data-field]').forEach(el => el.onchange = function(){ const [s,k] = el.dataset.field.split('.'); c.slots[s][k] = el.checked; save(c); window.AdiitechAds && window.AdiitechAds.mount(); toast('Ad slot updated'); });
    document.querySelectorAll('[data-slot][data-key]').forEach(el => el.addEventListener('input', function(){ c.slots[this.dataset.slot][this.dataset.key] = this.value; }));
    document.getElementById('ads-save-all').onclick = function(){ save(c); window.AdiitechAds && window.AdiitechAds.mount(); toast('Ads configuration saved successfully'); };
  }
  function injectStyles(){ const s=document.createElement('style'); s.textContent=`
    .ad-admin-hero{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px;margin-bottom:20px;border:1px solid rgba(180,77,255,.22);border-radius:16px;background:linear-gradient(120deg,rgba(180,77,255,.08),rgba(0,245,255,.035))}.ad-admin-hero h2{margin:5px 0;font:700 21px Orbitron;color:#e8e8ff}.ad-admin-hero p{margin:0;color:#8888aa}.ad-master,.ad-toggle{display:flex;align-items:center;gap:10px;cursor:pointer}.ad-master input,.ad-toggle input{display:none}.ad-master span,.ad-toggle span{width:42px;height:22px;border-radius:20px;background:#25253b;border:1px solid #41415c;position:relative;transition:.2s}.ad-master span:after,.ad-toggle span:after{content:'';position:absolute;width:16px;height:16px;top:2px;left:2px;border-radius:50%;background:#77779b;transition:.2s}.ad-master input:checked+span,.ad-toggle input:checked+span{background:rgba(0,245,255,.15);border-color:#00f5ff}.ad-master input:checked+span:after,.ad-toggle input:checked+span:after{left:22px;background:#00f5ff;box-shadow:0 0 10px #00f5ff}.ad-master b{font:600 10px Orbitron;color:#00f5ff;letter-spacing:1px}.ad-admin-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.ad-admin-card{padding:18px;border:1px solid rgba(255,255,255,.07);border-radius:15px;background:#0d0d1a}.ad-card-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}.ad-card-head h3{margin:5px 0 0;font:600 15px Orbitron;color:#e8e8ff}.ad-preview{padding:14px;margin-bottom:14px;border:1px solid rgba(0,245,255,.13);border-radius:10px;background:rgba(0,245,255,.025)}.ad-preview span{display:block;color:#00f5ff;font:600 8px Orbitron;letter-spacing:1px;margin-bottom:7px}.ad-preview strong{display:block;color:#e8e8ff;font:600 13px Orbitron;margin-bottom:4px}.ad-preview small{color:#77779b}.ad-fields label{display:block;color:#77779b;font:600 10px Orbitron;margin-bottom:9px}.ad-fields input,.ad-fields textarea{display:block;width:100%;margin-top:5px;padding:10px 11px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:#080811;color:#e8e8ff;font:400 13px Rajdhani;outline:none}.ad-fields textarea{min-height:58px;resize:vertical}.ad-two{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ad-admin-note{display:flex;gap:12px;margin-top:18px;padding:15px;border:1px solid rgba(57,255,20,.12);border-radius:12px;background:rgba(57,255,20,.025);color:#77779b}.ad-admin-note b{color:#39ff14;font:600 11px Orbitron}.ad-admin-note p{margin:4px 0 0;font-size:13px}.ad-admin-note>span{color:#39ff14}@media(max-width:900px){.ad-admin-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.ad-admin-hero{display:block}.ad-master{margin-top:16px}.ad-admin-grid{grid-template-columns:1fr}.ad-two{grid-template-columns:1fr}}
  `; document.head.appendChild(s); }
  function init(){ injectStyles(); const nav=document.createElement('button'); nav.className='nav-item'; nav.dataset.section='ads'; nav.id='nav-ads'; nav.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5M8 17h8"/></svg><span>Ads Manager</span>'; const settings=document.getElementById('nav-settings'); settings.parentNode.insertBefore(nav,settings); nav.onclick=()=>{document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));nav.classList.add('active');renderAds();}; }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
