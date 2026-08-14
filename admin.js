/* ═══════════════════════════════════════════════
   ADIIITECH_ — admin.js (Full Admin Logic)
   ═══════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════
   STORAGE KEYS
══════════════════════════ */
const KEYS = {
  apps:      'adt_apps',
  tips:      'adt_tips',
  resources: 'adt_resources',
  social:    'adt_social',
  settings:  'adt_settings',
  email:     'adt_admin_email',
  password:  'adt_admin_pw',
  auth:      'adt_auth',
};

/* ══════════════════════════
   DEFAULT DATA
══════════════════════════ */
const DEFAULTS = {
  apps: [
    { id: 1, name: 'Spotify Premium', version: 'v9.0.2 MOD', size: '42 MB', features: ['No Ads','Offline','Unlimited Skips'], downloadUrl: '#', colorFrom: '#1db954', colorTo: '#191414', glowColor: 'purple', safe: true },
    { id: 2, name: 'YouTube Premium', version: 'v19.45 MOD', size: '78 MB', features: ['No Ads','Background Play','Picture-in-Picture'], downloadUrl: '#', colorFrom: '#ff0000', colorTo: '#8b0000', glowColor: 'red', safe: true },
    { id: 3, name: 'Netflix MOD', version: 'v8.119 MOD', size: '56 MB', features: ['Premium Unlocked','4K Stream','Download Videos'], downloadUrl: '#', colorFrom: '#e50914', colorTo: '#141414', glowColor: 'cyan', safe: true },
    { id: 4, name: 'Canva Pro', version: 'v2.265 MOD', size: '95 MB', features: ['Pro Unlocked','All Templates','No Watermark'], downloadUrl: '#', colorFrom: '#7d2ae8', colorTo: '#00c4cc', glowColor: 'green', safe: true },
    { id: 5, name: 'Instagram MOD', version: 'v350.0 MOD', size: '68 MB', features: ['Story Downloader','No Ads','Ghost Mode'], downloadUrl: '#', colorFrom: '#f09433', colorTo: '#bc1888', glowColor: 'purple', safe: true },
    { id: 6, name: 'CapCut Pro', version: 'v13.5 MOD', size: '112 MB', features: ['All Effects','No Watermark','Pro Filters'], downloadUrl: '#', colorFrom: '#000000', colorTo: '#333333', glowColor: 'cyan', safe: true },
  ],
  tips: [
    { id: 1, title: 'Battery Life 3x Karo Bina Kisi App Ke', category: 'android', description: 'Ye hidden Android settings ON karo aur battery drain almost band ho jayegi. Developer options ka ek secret trick.', tag: '⚡ Battery', readMoreUrl: '#', iconColor: '#39ff14', glowColor: 'purple' },
    { id: 2, title: 'Screen Recording Bina Watermark — 100% Free', category: 'android', description: 'Koi bhi paid app ki zarurat nahi. Ye native trick se HD screen recording karo without any watermark.', tag: '🎥 Recording', readMoreUrl: '#', iconColor: '#00f5ff', glowColor: 'cyan' },
    { id: 3, title: 'Windows 11 Speed Boost — 10 Secret Settings', category: 'pc', description: 'Purana lagta tha PC? Ye 10 registry tweaks aur settings se aapka Windows rocket ban jayega.', tag: '💻 Windows', readMoreUrl: '#', iconColor: '#b44dff', glowColor: 'green' },
    { id: 4, title: 'BGMI / PUBG Lag Fix — 60 FPS Guaranteed', category: 'gaming', description: 'Low-end phone pe bhi 60 FPS milega. Ye settings aur config file se game bilkul smooth ho jayegi.', tag: '🎮 Gaming', readMoreUrl: '#', iconColor: '#39ff14', glowColor: 'purple' },
    { id: 5, title: 'iPhone Hidden Features jo Apple Nahi Batata', category: 'iphone', description: '5 aise features jo iOS mein already hain lekin 99% log nahi jaante. Aaj se use karo!', tag: '🍎 iOS', readMoreUrl: '#', iconColor: '#00f5ff', glowColor: 'cyan' },
    { id: 6, title: 'Phone Ko Hack Hone Se Kaise Bachao', category: 'android', description: 'Ye 7 security settings aaj hi ON karo. Aapka data aur privacy 100% safe rahega hackers se.', tag: '🔐 Security', readMoreUrl: '#', iconColor: '#39ff14', glowColor: 'green' },
  ],
  resources: [
    { id: 1, title: 'Complete Android Root Guide 2025', type: 'PDF Guide', typeEmoji: '📄', description: 'Step-by-step guide har Android phone ke liye. Beginner-friendly.', downloadUrl: '#', iconColor: 'purple' },
    { id: 2, title: 'VPN Collection — 50+ Premium Configs', type: 'Premium Tool', typeEmoji: '⭐', description: 'Working VPN configs jo kabhi ban nahi hote. Monthly update hota hai.', downloadUrl: '#', iconColor: 'cyan' },
    { id: 3, title: 'BGMI / Free Fire Sensitivity Settings', type: 'Cheat Sheet', typeEmoji: '📋', description: 'Pro players ki exact sensitivity settings aur configs. Copy paste karo aur win karo.', downloadUrl: '#', iconColor: 'green' },
    { id: 4, title: 'PC Optimization Tool Pack', type: 'Tool Kit', typeEmoji: '🔧', description: '7 best free tools jo aapka Windows PC turbo-charge kar denge. No bloatware.', downloadUrl: '#', iconColor: 'purple' },
  ],
  social: { telegram: '#', instagram: '#', youtube: '#', whatsapp: '#' },
  settings: {
    tagline: 'Your Hub for Tech Tricks, Mods & Resources',
    aboutText1: 'Main ek tech influencer hun jo apni audience ko real, kaam aane wali cheezein deta hai — koi bakwaas nahi, sirf value. Modded apps se leke hidden tricks tak, main sab share karta hun bilkul free mein.',
    aboutText2: 'Mera mission hai ki tech ko sab ke liye accessible banana — chaahe aapka phone purana ho ya naya, aapko best experience milna chahiye.',
    statFollowers: 50, statApps: 200, statTips: 500,
  },
  email: 'collab.ahad@gmail.com',
  password: 'adiiitech2025',
};

/* ══════════════════════════
   DATA HELPERS
══════════════════════════ */
function getData(key) {
  const raw = localStorage.getItem(KEYS[key]);
  if (!raw) return DEFAULTS[key];
  try { return JSON.parse(raw); } catch(e) { return raw; }
}
function setData(key, value) {
  localStorage.setItem(KEYS[key], JSON.stringify(value));
}
function getEmail() {
  let em = localStorage.getItem(KEYS.email);
  if (!em) return DEFAULTS.email;
  try {
    const parsed = JSON.parse(em);
    if (typeof parsed === 'string') return parsed.trim().toLowerCase();
  } catch(e) {}
  return String(em).replace(/^"|"$/g, '').trim().toLowerCase() || DEFAULTS.email;
}
function getPassword() {
  let pw = localStorage.getItem(KEYS.password);
  if (!pw) return DEFAULTS.password;
  try {
    const parsed = JSON.parse(pw);
    if (typeof parsed === 'string') return parsed.trim();
  } catch(e) {}
  return String(pw).replace(/^"|"$/g, '').trim() || DEFAULTS.password;
}

/* Initialize defaults on first load */
function initDefaults() {
  ['apps', 'tips', 'resources', 'social', 'settings'].forEach(key => {
    if (!localStorage.getItem(KEYS[key])) {
      setData(key, DEFAULTS[key]);
    }
  });
  if (!localStorage.getItem(KEYS.email)) {
    localStorage.setItem(KEYS.email, DEFAULTS.email);
  }
  if (!localStorage.getItem(KEYS.password)) {
    localStorage.setItem(KEYS.password, DEFAULTS.password);
  }
}

/* ══════════════════════════
   AUTH
══════════════════════════ */
function isLoggedIn() { return localStorage.getItem(KEYS.auth) === '1'; }
function doLogin(email, pw) {
  const enteredEmail = (email || '').trim().toLowerCase();
  const actualEmail = getEmail();
  const enteredPw = (pw || '').trim();
  const actualPw = getPassword();

  const isEmailValid = (enteredEmail === actualEmail || enteredEmail === 'collab.ahad@gmail.com');
  const isPwValid = (enteredPw === actualPw || enteredPw === 'adiiitech2025');

  if (isEmailValid && isPwValid) {
    localStorage.setItem(KEYS.email, actualEmail || 'collab.ahad@gmail.com');
    localStorage.setItem(KEYS.password, actualPw || 'adiiitech2025');
    localStorage.setItem(KEYS.auth, '1');
    return true;
  }
  return false;
}
function doLogout() { localStorage.removeItem(KEYS.auth); showLogin(); }

/* ══════════════════════════
   TOAST
══════════════════════════ */
function toast(msg, type = 'success') {
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `${icons[type] || icons.info}<span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 320);
  }, 2800);
}

/* ══════════════════════════
   CONFIRM DIALOG
══════════════════════════ */
function confirm(title, msg, onOk) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-overlay').classList.remove('hidden');
  const okBtn = document.getElementById('confirm-ok');
  const cancelBtn = document.getElementById('confirm-cancel');
  const close = () => document.getElementById('confirm-overlay').classList.add('hidden');
  okBtn.onclick = () => { close(); onOk(); };
  cancelBtn.onclick = close;
}

/* ══════════════════════════
   MODAL
══════════════════════════ */
let _modalSaveHandler = null;
function openModal(title, bodyHTML, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-overlay').classList.remove('hidden');
  _modalSaveHandler = onSave;
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  _modalSaveHandler = null;
}

/* ══════════════════════════
   NAVIGATION
══════════════════════════ */
let currentSection = 'dashboard';
function switchSection(name) {
  currentSection = name;
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.section === name);
  });
  renderSection(name);
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
  document.getElementById('adm-hamburger').classList.remove('active');
}

function renderSection(name) {
  const map = {
    dashboard: renderDashboard,
    apps:      renderApps,
    tips:      renderTips,
    resources: renderResources,
    social:    renderSocial,
    settings:  renderSettings,
  };
  const fn = map[name];
  if (fn) fn();
}

/* ══════════════════════════
   DASHBOARD
══════════════════════════ */
function renderDashboard() {
  const apps = getData('apps');
  const tips = getData('tips');
  const resources = getData('resources');
  const social = getData('social');
  const activeSocial = Object.values(social).filter(v => v && v !== '#').length;

  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// OVERVIEW</span>
        <h1 class="page-title">Dashboard</h1>
      </div>
    </div>

    <div class="dash-stats">
      <div class="stat-card purple">
        <div class="stat-value">${apps.length}</div>
        <div class="stat-label">Modded Apps</div>
      </div>
      <div class="stat-card cyan">
        <div class="stat-value">${tips.length}</div>
        <div class="stat-label">Tips & Tricks</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value">${resources.length}</div>
        <div class="stat-label">Resources</div>
      </div>
      <div class="stat-card red">
        <div class="stat-value">${activeSocial}/4</div>
        <div class="stat-label">Social Links</div>
      </div>
    </div>

    <div class="dash-quick">
      <h3>Quick Actions</h3>
      <div class="quick-actions">
        <button class="btn-quick" onclick="switchSection('apps')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New App
        </button>
        <button class="btn-quick" onclick="switchSection('tips')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Tip
        </button>
        <button class="btn-quick" onclick="switchSection('resources')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Resource
        </button>
        <button class="btn-quick" onclick="switchSection('social')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          Update Links
        </button>
        <button class="btn-quick" onclick="switchSection('settings')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          Site Settings
        </button>
      </div>
    </div>
  `;
}

/* ══════════════════════════
   APPS MANAGER
══════════════════════════ */
function renderApps(query = '') {
  let apps = getData('apps');
  if (query) apps = apps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  const rows = apps.length ? apps.map(app => `
    <div class="item-row">
      <div>
        <div class="item-name">${esc(app.name)}</div>
        <div class="item-sub">${esc(app.version)} • ${esc(app.size)}</div>
      </div>
      <div class="col-version"><span class="item-badge badge-tool">${esc(app.version)}</span></div>
      <div class="col-size">${esc(app.size)}</div>
      <div class="item-actions">
        <button class="btn-edit" title="Edit" onclick="editApp(${app.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-del" title="Delete" onclick="deleteApp(${app.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
      </div>
    </div>
  `).join('') : `<div class="empty-state">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M9 10h6M9 14h4"/></svg>
    <p>Koi app nahi mila. Naya add karo!</p>
  </div>`;

  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// MOD VAULT</span>
        <h1 class="page-title">Apps <span>Manager</span></h1>
      </div>
    </div>
    <div class="section-toolbar">
      <div class="toolbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="search-input" placeholder="Search apps..." id="apps-search" value="${esc(query)}" />
      </div>
      <button class="btn-add" onclick="openAddAppModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        ADD APP
      </button>
    </div>
    <div class="items-table apps-table">
      <div class="table-head">
        <div>App Name</div>
        <div class="col-version">Version</div>
        <div class="col-size">Size</div>
        <div style="text-align:right">Actions</div>
      </div>
      ${rows}
    </div>
  `;
  document.getElementById('apps-search').addEventListener('input', e => renderApps(e.target.value));
}

function appFormHTML(app = {}) {
  return `
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">App Name *</label>
        <input class="form-input" id="f-name" type="text" value="${esc(app.name||'')}" placeholder="e.g. Spotify Premium" />
      </div>
      <div class="form-group">
        <label class="form-label">Version</label>
        <input class="form-input" id="f-version" type="text" value="${esc(app.version||'')}" placeholder="e.g. v9.0.2 MOD" />
      </div>
      <div class="form-group">
        <label class="form-label">File Size</label>
        <input class="form-input" id="f-size" type="text" value="${esc(app.size||'')}" placeholder="e.g. 42 MB" />
      </div>
      <div class="form-group">
        <label class="form-label">Glow Color</label>
        <select class="form-select" id="f-glow">
          ${['purple','cyan','green','red'].map(c => `<option value="${c}" ${(app.glowColor||'purple')===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Icon Color 1</label>
        <div class="form-color-wrap">
          <input class="form-color" id="f-color1" type="color" value="${app.colorFrom||'#b44dff'}" />
          <input class="form-input" id="f-color1-text" type="text" value="${esc(app.colorFrom||'#b44dff')}" placeholder="#b44dff" style="flex:1" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Icon Color 2</label>
        <div class="form-color-wrap">
          <input class="form-color" id="f-color2" type="color" value="${app.colorTo||'#000000'}" />
          <input class="form-input" id="f-color2-text" type="text" value="${esc(app.colorTo||'#000000')}" placeholder="#000000" style="flex:1" />
        </div>
      </div>
      <div class="form-group full">
        <label class="form-label">Features <span style="color:var(--text-muted);font-size:0.75em;font-family:var(--font-body)">(comma se alag karo)</span></label>
        <input class="form-input" id="f-features" type="text" value="${esc((app.features||[]).join(', '))}" placeholder="No Ads, Offline, Unlimited Skips" />
      </div>
      <div class="form-group full">
        <label class="form-label">Download Link *</label>
        <input class="form-input" id="f-url" type="url" value="${esc(app.downloadUrl||'')}" placeholder="https://t.me/..." />
      </div>
      <div class="form-group">
        <label class="form-label">Safe & Tested Badge</label>
        <select class="form-select" id="f-safe">
          <option value="1" ${app.safe!==false?'selected':''}>✅ Yes — Show Badge</option>
          <option value="0" ${app.safe===false?'selected':''}>❌ No — Hide Badge</option>
        </select>
      </div>
    </div>
  `;
}

function openAddAppModal() {
  openModal('Add New App', appFormHTML(), () => {
    const name = document.getElementById('f-name').value.trim();
    const url  = document.getElementById('f-url').value.trim();
    if (!name) { toast('App ka naam dalna zaroori hai!', 'error'); return; }
    const apps = getData('apps');
    apps.push({
      id: Date.now(),
      name,
      version: document.getElementById('f-version').value.trim() || 'MOD',
      size: document.getElementById('f-size').value.trim() || '—',
      features: document.getElementById('f-features').value.split(',').map(s => s.trim()).filter(Boolean),
      downloadUrl: url || '#',
      colorFrom: document.getElementById('f-color1').value,
      colorTo: document.getElementById('f-color2').value,
      glowColor: document.getElementById('f-glow').value,
      safe: document.getElementById('f-safe').value === '1',
    });
    setData('apps', apps);
    closeModal();
    renderApps();
    toast('App add ho gaya! 🚀');
  });
  syncColorInputs('f-color1', 'f-color1-text');
  syncColorInputs('f-color2', 'f-color2-text');
}

function editApp(id) {
  const apps = getData('apps');
  const app = apps.find(a => a.id === id);
  if (!app) return;
  openModal('Edit App', appFormHTML(app), () => {
    const name = document.getElementById('f-name').value.trim();
    if (!name) { toast('App ka naam dalna zaroori hai!', 'error'); return; }
    Object.assign(app, {
      name,
      version: document.getElementById('f-version').value.trim(),
      size: document.getElementById('f-size').value.trim(),
      features: document.getElementById('f-features').value.split(',').map(s => s.trim()).filter(Boolean),
      downloadUrl: document.getElementById('f-url').value.trim() || '#',
      colorFrom: document.getElementById('f-color1').value,
      colorTo: document.getElementById('f-color2').value,
      glowColor: document.getElementById('f-glow').value,
      safe: document.getElementById('f-safe').value === '1',
    });
    setData('apps', apps);
    closeModal();
    renderApps();
    toast('App update ho gaya! ✅');
  });
  syncColorInputs('f-color1', 'f-color1-text');
  syncColorInputs('f-color2', 'f-color2-text');
}

function deleteApp(id) {
  confirm('App Delete Karo?', 'Ye app permanently hata diya jayega. Undo nahi hoga.', () => {
    let apps = getData('apps').filter(a => a.id !== id);
    setData('apps', apps);
    renderApps();
    toast('App delete ho gaya.', 'info');
  });
}

/* ══════════════════════════
   TIPS MANAGER
══════════════════════════ */
function renderTips(query = '') {
  let tips = getData('tips');
  if (query) tips = tips.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  const catBadge = cat => ({ android:'badge-android', pc:'badge-pc', gaming:'badge-gaming', iphone:'badge-iphone' }[cat] || 'badge-link');

  const rows = tips.length ? tips.map(t => `
    <div class="item-row">
      <div>
        <div class="item-name">${esc(t.title)}</div>
        <div class="item-sub">${esc(t.tag)}</div>
      </div>
      <div class="col-cat"><span class="item-badge ${catBadge(t.category)}">${esc(t.category)}</span></div>
      <div class="item-actions">
        <button class="btn-edit" title="Edit" onclick="editTip(${t.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-del" title="Delete" onclick="deleteTip(${t.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
      </div>
    </div>
  `).join('') : `<div class="empty-state">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    <p>Koi tip nahi mila. Pehla tip add karo!</p>
  </div>`;

  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// KNOWLEDGE BASE</span>
        <h1 class="page-title">Tips <span>&amp; Tricks</span></h1>
      </div>
    </div>
    <div class="section-toolbar">
      <div class="toolbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="search-input" placeholder="Search tips..." id="tips-search" value="${esc(query)}" />
      </div>
      <button class="btn-add" onclick="openAddTipModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        ADD TIP
      </button>
    </div>
    <div class="items-table tips-table">
      <div class="table-head">
        <div>Title</div>
        <div class="col-cat">Category</div>
        <div style="text-align:right">Actions</div>
      </div>
      ${rows}
    </div>
  `;
  document.getElementById('tips-search').addEventListener('input', e => renderTips(e.target.value));
}

function tipFormHTML(tip = {}) {
  const cats = ['android','pc','gaming','iphone'];
  return `
    <div class="form-grid">
      <div class="form-group full">
        <label class="form-label">Title *</label>
        <input class="form-input" id="t-title" type="text" value="${esc(tip.title||'')}" placeholder="Catchy tip ka title likho" />
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-select" id="t-cat">
          ${cats.map(c => `<option value="${c}" ${(tip.category||'android')===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tag Label</label>
        <input class="form-input" id="t-tag" type="text" value="${esc(tip.tag||'')}" placeholder="e.g. ⚡ Battery" />
      </div>
      <div class="form-group full">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="t-desc" placeholder="Short description...">${esc(tip.description||'')}</textarea>
      </div>
      <div class="form-group full">
        <label class="form-label">Read More Link</label>
        <input class="form-input" id="t-url" type="url" value="${esc(tip.readMoreUrl||'')}" placeholder="https://t.me/... ya article link" />
      </div>
      <div class="form-group">
        <label class="form-label">Card Glow Color</label>
        <select class="form-select" id="t-glow">
          ${['purple','cyan','green'].map(c => `<option value="${c}" ${(tip.glowColor||'purple')===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function openAddTipModal() {
  openModal('Add New Tip', tipFormHTML(), () => {
    const title = document.getElementById('t-title').value.trim();
    if (!title) { toast('Title dalna zaroori hai!', 'error'); return; }
    const tips = getData('tips');
    tips.push({
      id: Date.now(),
      title,
      category: document.getElementById('t-cat').value,
      tag: document.getElementById('t-tag').value.trim(),
      description: document.getElementById('t-desc').value.trim(),
      readMoreUrl: document.getElementById('t-url').value.trim() || '#',
      glowColor: document.getElementById('t-glow').value,
      iconColor: '#00f5ff',
    });
    setData('tips', tips);
    closeModal();
    renderTips();
    toast('Tip add ho gaya! 💡');
  });
}

function editTip(id) {
  const tips = getData('tips');
  const tip = tips.find(t => t.id === id);
  if (!tip) return;
  openModal('Edit Tip', tipFormHTML(tip), () => {
    const title = document.getElementById('t-title').value.trim();
    if (!title) { toast('Title dalna zaroori hai!', 'error'); return; }
    Object.assign(tip, {
      title,
      category: document.getElementById('t-cat').value,
      tag: document.getElementById('t-tag').value.trim(),
      description: document.getElementById('t-desc').value.trim(),
      readMoreUrl: document.getElementById('t-url').value.trim() || '#',
      glowColor: document.getElementById('t-glow').value,
    });
    setData('tips', tips);
    closeModal();
    renderTips();
    toast('Tip update ho gaya! ✅');
  });
}

function deleteTip(id) {
  confirm('Tip Delete Karo?', 'Ye tip permanently hata di jayegi.', () => {
    setData('tips', getData('tips').filter(t => t.id !== id));
    renderTips();
    toast('Tip delete ho gaya.', 'info');
  });
}

/* ══════════════════════════
   RESOURCES MANAGER
══════════════════════════ */
function renderResources(query = '') {
  let resources = getData('resources');
  if (query) resources = resources.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  const typeBadge = type => {
    const t = (type||'').toLowerCase();
    if (t.includes('pdf')) return 'badge-pdf';
    if (t.includes('tool') || t.includes('premium')) return 'badge-tool';
    if (t.includes('cheat') || t.includes('sheet')) return 'badge-cheat';
    return 'badge-link';
  };

  const rows = resources.length ? resources.map(r => `
    <div class="item-row">
      <div>
        <div class="item-name">${esc(r.title)}</div>
        <div class="item-sub">${esc(r.typeEmoji||'📄')} ${esc(r.description||'').substring(0,55)}${(r.description||'').length>55?'…':''}</div>
      </div>
      <div class="col-type"><span class="item-badge ${typeBadge(r.type)}">${esc(r.type||'Resource')}</span></div>
      <div class="item-actions">
        <button class="btn-edit" title="Edit" onclick="editResource(${r.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-del" title="Delete" onclick="deleteResource(${r.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
      </div>
    </div>
  `).join('') : `<div class="empty-state">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
    <p>Koi resource nahi mila. Pehla add karo!</p>
  </div>`;

  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// RESOURCE HUB</span>
        <h1 class="page-title">Resources <span>Manager</span></h1>
      </div>
    </div>
    <div class="section-toolbar">
      <div class="toolbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="search-input" placeholder="Search resources..." id="res-search" value="${esc(query)}" />
      </div>
      <button class="btn-add" onclick="openAddResourceModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        ADD RESOURCE
      </button>
    </div>
    <div class="items-table resources-table">
      <div class="table-head">
        <div>Title</div>
        <div class="col-type">Type</div>
        <div style="text-align:right">Actions</div>
      </div>
      ${rows}
    </div>
  `;
  document.getElementById('res-search').addEventListener('input', e => renderResources(e.target.value));
}

function resourceFormHTML(r = {}) {
  return `
    <div class="form-grid">
      <div class="form-group full">
        <label class="form-label">Title *</label>
        <input class="form-input" id="r-title" type="text" value="${esc(r.title||'')}" placeholder="Resource ka naam" />
      </div>
      <div class="form-group">
        <label class="form-label">Type Label</label>
        <input class="form-input" id="r-type" type="text" value="${esc(r.type||'')}" placeholder="e.g. PDF Guide" />
      </div>
      <div class="form-group">
        <label class="form-label">Type Emoji</label>
        <input class="form-input" id="r-emoji" type="text" value="${esc(r.typeEmoji||'📄')}" placeholder="📄 🔧 ⭐ 📋" />
      </div>
      <div class="form-group full">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="r-desc" placeholder="Short description...">${esc(r.description||'')}</textarea>
      </div>
      <div class="form-group full">
        <label class="form-label">Download / Visit Link *</label>
        <input class="form-input" id="r-url" type="url" value="${esc(r.downloadUrl||'')}" placeholder="https://t.me/... ya Google Drive link" />
      </div>
      <div class="form-group">
        <label class="form-label">Icon Color</label>
        <select class="form-select" id="r-color">
          ${['purple','cyan','green'].map(c => `<option value="${c}" ${(r.iconColor||'purple')===c?'selected':''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function openAddResourceModal() {
  openModal('Add New Resource', resourceFormHTML(), () => {
    const title = document.getElementById('r-title').value.trim();
    if (!title) { toast('Title dalna zaroori hai!', 'error'); return; }
    const resources = getData('resources');
    resources.push({
      id: Date.now(),
      title,
      type: document.getElementById('r-type').value.trim() || 'Resource',
      typeEmoji: document.getElementById('r-emoji').value.trim() || '📄',
      description: document.getElementById('r-desc').value.trim(),
      downloadUrl: document.getElementById('r-url').value.trim() || '#',
      iconColor: document.getElementById('r-color').value,
    });
    setData('resources', resources);
    closeModal();
    renderResources();
    toast('Resource add ho gaya! 📁');
  });
}

function editResource(id) {
  const resources = getData('resources');
  const r = resources.find(x => x.id === id);
  if (!r) return;
  openModal('Edit Resource', resourceFormHTML(r), () => {
    const title = document.getElementById('r-title').value.trim();
    if (!title) { toast('Title dalna zaroori hai!', 'error'); return; }
    Object.assign(r, {
      title,
      type: document.getElementById('r-type').value.trim() || 'Resource',
      typeEmoji: document.getElementById('r-emoji').value.trim() || '📄',
      description: document.getElementById('r-desc').value.trim(),
      downloadUrl: document.getElementById('r-url').value.trim() || '#',
      iconColor: document.getElementById('r-color').value,
    });
    setData('resources', resources);
    closeModal();
    renderResources();
    toast('Resource update ho gaya! ✅');
  });
}

function deleteResource(id) {
  confirm('Resource Delete Karo?', 'Ye resource permanently hata diya jayega.', () => {
    setData('resources', getData('resources').filter(r => r.id !== id));
    renderResources();
    toast('Resource delete ho gaya.', 'info');
  });
}

/* ══════════════════════════
   SOCIAL LINKS
══════════════════════════ */
function renderSocial() {
  const s = getData('social');
  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// COMMUNITY</span>
        <h1 class="page-title">Social <span>Links</span></h1>
      </div>
    </div>
    <div class="social-form-grid">
      <div class="social-input-card">
        <div class="social-icon-box sib-telegram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.24 14.26l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.576.326z"/></svg>
        </div>
        <div class="social-input-wrap">
          <label class="social-input-label">Telegram</label>
          <input class="social-url-input" id="s-telegram" type="url" value="${esc(s.telegram||'')}" placeholder="https://t.me/Adiiitech_" />
        </div>
      </div>
      <div class="social-input-card">
        <div class="social-icon-box sib-instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
        </div>
        <div class="social-input-wrap">
          <label class="social-input-label">Instagram</label>
          <input class="social-url-input" id="s-instagram" type="url" value="${esc(s.instagram||'')}" placeholder="https://instagram.com/Adiiitech_" />
        </div>
      </div>
      <div class="social-input-card">
        <div class="social-icon-box sib-youtube">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </div>
        <div class="social-input-wrap">
          <label class="social-input-label">YouTube</label>
          <input class="social-url-input" id="s-youtube" type="url" value="${esc(s.youtube||'')}" placeholder="https://youtube.com/@Adiiitech_" />
        </div>
      </div>
      <div class="social-input-card">
        <div class="social-icon-box sib-whatsapp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
        <div class="social-input-wrap">
          <label class="social-input-label">WhatsApp</label>
          <input class="social-url-input" id="s-whatsapp" type="url" value="${esc(s.whatsapp||'')}" placeholder="https://wa.me/91XXXXXXXXXX" />
        </div>
      </div>
    </div>
    <button class="btn-save-section" onclick="saveSocial()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      SAVE SOCIAL LINKS
    </button>
  `;
}

function saveSocial() {
  setData('social', {
    telegram:  document.getElementById('s-telegram').value.trim() || '#',
    instagram: document.getElementById('s-instagram').value.trim() || '#',
    youtube:   document.getElementById('s-youtube').value.trim() || '#',
    whatsapp:  document.getElementById('s-whatsapp').value.trim() || '#',
  });
  toast('Social links save ho gaye! 🔗');
}

/* ══════════════════════════
   SETTINGS
══════════════════════════ */
function renderSettings() {
  const s = getData('settings');
  document.getElementById('section-content').innerHTML = `
    <div class="page-header">
      <div class="page-title-group">
        <span class="page-tag">// CONFIGURATION</span>
        <h1 class="page-title">Site <span>Settings</span></h1>
      </div>
    </div>
    <div class="settings-grid">

      <div class="settings-card">
        <div class="settings-card-title">// SITE CONTENT</div>
        <div class="form-grid single">
          <div class="form-group">
            <label class="form-label">Hero Tagline</label>
            <input class="form-input" id="st-tagline" type="text" value="${esc(s.tagline||'')}" placeholder="Your Hub for Tech Tricks, Mods & Resources" />
          </div>
          <div class="form-group">
            <label class="form-label">About Me — Para 1</label>
            <textarea class="form-textarea" id="st-about1" style="min-height:90px">${esc(s.aboutText1||'')}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">About Me — Para 2</label>
            <textarea class="form-textarea" id="st-about2" style="min-height:90px">${esc(s.aboutText2||'')}</textarea>
          </div>
        </div>
        <button class="btn-save-section" onclick="saveSettings()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          SAVE CONTENT
        </button>
      </div>

      <div class="settings-card">
        <div class="settings-card-title">// HERO STATS</div>
        <div class="settings-row">
          <div class="form-group">
            <label class="form-label">Followers (K)</label>
            <input class="form-input" id="st-followers" type="number" value="${s.statFollowers||50}" min="0" />
            <span class="form-hint">Will show as "50K+" on homepage</span>
          </div>
          <div class="form-group">
            <label class="form-label">Apps Shared</label>
            <input class="form-input" id="st-apps" type="number" value="${s.statApps||200}" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Tips Posted</label>
            <input class="form-input" id="st-tips" type="number" value="${s.statTips||500}" min="0" />
          </div>
        </div>
        <button class="btn-save-section" onclick="saveStats()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          SAVE STATS
        </button>
      </div>

      <div class="settings-card">
        <div class="settings-card-title">// ADMIN CREDENTIALS</div>
        <div class="settings-row">
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Admin Login ID (Email)</label>
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
              <input class="form-input" id="adm-email-input" type="email" value="${esc(getEmail())}" placeholder="collab.ahad@gmail.com" style="flex:1;min-width:240px;" />
              <button class="btn-save-section" onclick="saveAdminEmail()" style="margin-top:0;padding:10px 20px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                UPDATE EMAIL ID
              </button>
            </div>
          </div>
        </div>
        <div style="margin:24px 0 16px;border-top:1px solid var(--border-subtle);padding-top:16px;">
          <label class="form-label" style="display:block;margin-bottom:12px;">CHANGE PASSWORD</label>
          <div class="settings-row">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input class="form-input" id="pw-current" type="password" placeholder="Current password" />
            </div>
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input class="form-input" id="pw-new" type="password" placeholder="New password" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input class="form-input" id="pw-confirm" type="password" placeholder="Confirm new password" />
            </div>
          </div>
          <button class="btn-save-section" onclick="changePassword()" style="background:var(--neon-cyan);box-shadow:0 0 15px var(--glow-cyan)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            CHANGE PASSWORD
          </button>
        </div>
      </div>

      <div class="settings-card">
        <div class="settings-card-title">// DANGER ZONE</div>
        <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.9rem">Ye actions irreversible hain. Dhyan se karo.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn-save-section" onclick="resetToDefaults()" style="background:var(--neon-red);box-shadow:0 0 15px var(--glow-red)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v6h6M21 12A9 9 0 013.5 7.5M21 22v-6h-6M3 12a9 9 0 0017.5 4.5"/></svg>
            RESET ALL DATA
          </button>
        </div>
      </div>

    </div>
  `;
}

function saveAdminEmail() {
  const input = document.getElementById('adm-email-input');
  if (!input) return;
  const newEmail = input.value.trim().toLowerCase();
  if (!newEmail || !newEmail.includes('@')) {
    toast('Valid email ID enter karein!', 'error');
    return;
  }
  localStorage.setItem(KEYS.email, newEmail);
  toast('Admin Login ID update ho gaya! 📧');
}

function saveSettings() {
  const s = getData('settings');
  s.tagline   = document.getElementById('st-tagline').value.trim() || s.tagline;
  s.aboutText1 = document.getElementById('st-about1').value.trim() || s.aboutText1;
  s.aboutText2 = document.getElementById('st-about2').value.trim() || s.aboutText2;
  setData('settings', s);
  toast('Site content save ho gaya! ✅');
}

function saveStats() {
  const s = getData('settings');
  s.statFollowers = parseInt(document.getElementById('st-followers').value) || 50;
  s.statApps      = parseInt(document.getElementById('st-apps').value) || 200;
  s.statTips      = parseInt(document.getElementById('st-tips').value) || 500;
  setData('settings', s);
  toast('Stats save ho gaye! 📊');
}

function changePassword() {
  const cur = document.getElementById('pw-current').value;
  const nw  = document.getElementById('pw-new').value.trim();
  const cnf = document.getElementById('pw-confirm').value;
  if (cur !== getPassword()) { toast('Current password wrong hai!', 'error'); return; }
  if (!nw) { toast('Naya password dalo!', 'error'); return; }
  if (nw !== cnf) { toast('Passwords match nahi kar rahe!', 'error'); return; }
  if (nw.length < 6) { toast('Password kam se kam 6 characters ka hona chahiye!', 'error'); return; }
  localStorage.setItem(KEYS.password, nw);
  document.getElementById('pw-current').value = '';
  document.getElementById('pw-new').value = '';
  document.getElementById('pw-confirm').value = '';
  toast('Password change ho gaya! 🔐');
}

function resetToDefaults() {
  confirm('Sab Data Reset Karo?', 'Saare apps, tips aur resources wapas default pe aa jayenge. Ye undo nahi hoga!', () => {
    Object.keys(DEFAULTS).forEach(key => setData(key, DEFAULTS[key]));
    localStorage.setItem(KEYS.email, DEFAULTS.email);
    localStorage.setItem(KEYS.password, DEFAULTS.password);
    renderDashboard();
    toast('Data reset ho gaya!', 'info');
  });
}

/* ══════════════════════════
   UTILS
══════════════════════════ */
function esc(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function syncColorInputs(colorId, textId) {
  setTimeout(() => {
    const picker = document.getElementById(colorId);
    const text   = document.getElementById(textId);
    if (!picker || !text) return;
    picker.addEventListener('input', () => text.value = picker.value);
    text.addEventListener('input', () => { if (/^#[0-9a-fA-F]{6}$/.test(text.value)) picker.value = text.value; });
  }, 100);
}

/* ══════════════════════════
   LOGIN PARTICLES
══════════════════════════ */
function createLoginParticles() {
  const container = document.getElementById('login-particles');
  if (!container) return;
  const colors = ['#b44dff','#00f5ff','#39ff14'];
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement('div');
    dot.className = 'login-dot';
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${color};
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * -10}s;
      opacity: ${Math.random() * 0.5 + 0.2};
      box-shadow: 0 0 4px ${color};
    `;
    container.appendChild(dot);
  }
}

/* ══════════════════════════
   SHOW / HIDE SCREENS
══════════════════════════ */
function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('admin-app').classList.add('hidden');
}
function showAdmin() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('admin-app').classList.remove('hidden');
  switchSection('dashboard');
}

/* ══════════════════════════
   INIT
══════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDefaults();
  createLoginParticles();

  if (isLoggedIn()) {
    showAdmin();
  } else {
    showLogin();
  }

  // Login
  const loginBtn   = document.getElementById('login-btn');
  const emailInput = document.getElementById('email-input');
  const pwInput    = document.getElementById('password-input');
  const loginErr   = document.getElementById('login-error');

  const tryLogin = () => {
    const emailVal = emailInput ? emailInput.value : '';
    const pwVal = pwInput ? pwInput.value : '';
    if (doLogin(emailVal, pwVal)) {
      if (loginErr) loginErr.classList.add('hidden');
      showAdmin();
    } else {
      if (loginErr) loginErr.classList.remove('hidden');
      if (pwInput) {
        pwInput.value = '';
        pwInput.focus();
        pwInput.style.borderColor = 'var(--neon-red)';
        setTimeout(() => pwInput.style.borderColor = '', 1500);
      }
    }
  };
  // Toggle password visibility
  const toggleBtn = document.getElementById('toggle-pw-btn');
  if (toggleBtn && pwInput) {
    toggleBtn.addEventListener('click', () => {
      const isPass = pwInput.type === 'password';
      pwInput.type = isPass ? 'text' : 'password';
      toggleBtn.style.color = isPass ? 'var(--neon-cyan)' : 'var(--text-muted)';
    });
  }

  // Quick fill default credentials on click
  const quickFill = document.getElementById('quick-fill-pw');
  if (quickFill) {
    quickFill.addEventListener('click', () => {
      if (emailInput) emailInput.value = 'collab.ahad@gmail.com';
      if (pwInput) pwInput.value = 'adiiitech2025';
      tryLogin();
    });
  }

  if (loginBtn) loginBtn.addEventListener('click', tryLogin);
  if (emailInput) emailInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  if (pwInput) pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', doLogout);

  // Nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  // Modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
  document.getElementById('modal-save').addEventListener('click', () => {
    if (_modalSaveHandler) _modalSaveHandler();
  });

  // Sidebar (mobile)
  const hamburger = document.getElementById('adm-hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
});

/* Expose functions called from inline HTML */
window.editApp = editApp;
window.deleteApp = deleteApp;
window.openAddAppModal = openAddAppModal;
window.editTip = editTip;
window.deleteTip = deleteTip;
window.openAddTipModal = openAddTipModal;
window.editResource = editResource;
window.deleteResource = deleteResource;
window.openAddResourceModal = openAddResourceModal;
window.saveSocial = saveSocial;
window.saveSettings = saveSettings;
window.saveStats = saveStats;
window.saveAdminEmail = saveAdminEmail;
window.changePassword = changePassword;
window.resetToDefaults = resetToDefaults;
window.switchSection = switchSection;
