/* ═══════════════════════════════════════════════
   ADIIITECH_ — script.js (Dynamic + Particles)
   ═══════════════════════════════════════════════ */

/* ══════════════════════════
   DEFAULT DATA (same as admin.js)
══════════════════════════ */
const SITE_KEYS = {
  apps: 'adt_apps', tips: 'adt_tips', resources: 'adt_resources',
  social: 'adt_social', settings: 'adt_settings',
};

const SITE_DEFAULTS = {
  apps: [
    { id:1, name:'Spotify Premium', version:'v9.0.2 MOD', size:'42 MB', features:['No Ads','Offline','Unlimited Skips'], downloadUrl:'#', colorFrom:'#1db954', colorTo:'#191414', glowColor:'purple', safe:true },
    { id:2, name:'YouTube Premium', version:'v19.45 MOD', size:'78 MB', features:['No Ads','Background Play','Picture-in-Picture'], downloadUrl:'#', colorFrom:'#ff0000', colorTo:'#8b0000', glowColor:'red', safe:true },
    { id:3, name:'Netflix MOD', version:'v8.119 MOD', size:'56 MB', features:['Premium Unlocked','4K Stream','Download Videos'], downloadUrl:'#', colorFrom:'#e50914', colorTo:'#141414', glowColor:'cyan', safe:true },
    { id:4, name:'Canva Pro', version:'v2.265 MOD', size:'95 MB', features:['Pro Unlocked','All Templates','No Watermark'], downloadUrl:'#', colorFrom:'#7d2ae8', colorTo:'#00c4cc', glowColor:'green', safe:true },
    { id:5, name:'Instagram MOD', version:'v350.0 MOD', size:'68 MB', features:['Story Downloader','No Ads','Ghost Mode'], downloadUrl:'#', colorFrom:'#f09433', colorTo:'#bc1888', glowColor:'purple', safe:true },
    { id:6, name:'CapCut Pro', version:'v13.5 MOD', size:'112 MB', features:['All Effects','No Watermark','Pro Filters'], downloadUrl:'#', colorFrom:'#000000', colorTo:'#333333', glowColor:'cyan', safe:true },
  ],
  tips: [
    { id:1, title:'Battery Life 3x Karo Bina Kisi App Ke', category:'android', description:'Ye hidden Android settings ON karo aur battery drain almost band ho jayegi. Developer options ka ek secret trick.', tag:'⚡ Battery', readMoreUrl:'#', iconColor:'#39ff14', glowColor:'purple' },
    { id:2, title:'Screen Recording Bina Watermark — 100% Free', category:'android', description:'Koi bhi paid app ki zarurat nahi. Ye native trick se HD screen recording karo without any watermark.', tag:'🎥 Recording', readMoreUrl:'#', iconColor:'#00f5ff', glowColor:'cyan' },
    { id:3, title:'Windows 11 Speed Boost — 10 Secret Settings', category:'pc', description:'Purana lagta tha PC? Ye 10 registry tweaks aur settings se aapka Windows rocket ban jayega.', tag:'💻 Windows', readMoreUrl:'#', iconColor:'#b44dff', glowColor:'green' },
    { id:4, title:'BGMI / PUBG Lag Fix — 60 FPS Guaranteed', category:'gaming', description:'Low-end phone pe bhi 60 FPS milega. Ye settings aur config file se game bilkul smooth ho jayegi.', tag:'🎮 Gaming', readMoreUrl:'#', iconColor:'#39ff14', glowColor:'purple' },
    { id:5, title:'iPhone Hidden Features jo Apple Nahi Batata', category:'iphone', description:'5 aise features jo iOS mein already hain lekin 99% log nahi jaante. Aaj se use karo!', tag:'🍎 iOS', readMoreUrl:'#', iconColor:'#00f5ff', glowColor:'cyan' },
    { id:6, title:'Phone Ko Hack Hone Se Kaise Bachao', category:'android', description:'Ye 7 security settings aaj hi ON karo. Aapka data aur privacy 100% safe rahega hackers se.', tag:'🔐 Security', readMoreUrl:'#', iconColor:'#39ff14', glowColor:'green' },
  ],
  resources: [
    { id:1, title:'Complete Android Root Guide 2025', type:'PDF Guide', typeEmoji:'📄', description:'Step-by-step guide har Android phone ke liye. Beginner-friendly.', downloadUrl:'#', iconColor:'purple' },
    { id:2, title:'VPN Collection — 50+ Premium Configs', type:'Premium Tool', typeEmoji:'⭐', description:'Working VPN configs jo kabhi ban nahi hote. Monthly update hota hai.', downloadUrl:'#', iconColor:'cyan' },
    { id:3, title:'BGMI / Free Fire Sensitivity Settings', type:'Cheat Sheet', typeEmoji:'📋', description:'Pro players ki exact sensitivity settings aur configs. Copy paste karo aur win karo.', downloadUrl:'#', iconColor:'green' },
    { id:4, title:'PC Optimization Tool Pack', type:'Tool Kit', typeEmoji:'🔧', description:'7 best free tools jo aapka Windows PC turbo-charge kar denge. No bloatware.', downloadUrl:'#', iconColor:'purple' },
  ],
  social: { telegram:'#', instagram:'#', youtube:'#', whatsapp:'#' },
  settings: {
    tagline:'Your Hub for Tech Tricks, Mods & Resources',
    aboutText1:'Main ek tech influencer hun jo apni audience ko real, kaam aane wali cheezein deta hai — koi bakwaas nahi, sirf value. Modded apps se leke hidden tricks tak, main sab share karta hun bilkul free mein.',
    aboutText2:'Mera mission hai ki tech ko sab ke liye accessible banana — chaahe aapka phone purana ho ya naya, aapko best experience milna chahiye.',
    statFollowers:50, statApps:200, statTips:500,
  },
};

function getSiteData(key) {
  const raw = localStorage.getItem(SITE_KEYS[key]);
  return raw ? JSON.parse(raw) : SITE_DEFAULTS[key];
}

/* ══════════════════════════
   RENDER APPS
══════════════════════════ */
function renderApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;
  const apps = getSiteData('apps');

  const appIconSVG = `<svg viewBox="0 0 24 24" fill="none" width="36" height="36"><rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.1)"/><text x="5" y="17" font-size="13" font-weight="900" fill="white" font-family="Arial">A</text></svg>`;

  grid.innerHTML = apps.map(app => `
    <div class="card app-card" id="app-card-${app.id}">
      <div class="card-glow ${app.glowColor || 'purple'}"></div>
      <div class="app-icon-wrap" style="background: linear-gradient(135deg, ${escHtml(app.colorFrom||'#b44dff')}, ${escHtml(app.colorTo||'#000')});">
        ${appIconSVG}
      </div>
      <div class="app-info">
        <h3 class="app-name">${escHtml(app.name)}</h3>
        <span class="app-version">${escHtml(app.version)}</span>
      </div>
      <div class="app-features">
        ${(app.features||[]).map(f => `<span class="feat-tag">${escHtml(f)}</span>`).join('')}
      </div>
      <div class="app-meta">
        <span class="app-size">📦 ${escHtml(app.size)}</span>
        ${app.safe !== false ? '<span class="app-safe">✅ Safe &amp; Tested</span>' : ''}
      </div>
      <a href="${escHtml(app.downloadUrl||'#')}" class="btn btn-download" id="download-app-${app.id}" ${app.downloadUrl && app.downloadUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Download APK
      </a>
    </div>
  `).join('');
}

/* ══════════════════════════
   RENDER TIPS
══════════════════════════ */
function renderTips() {
  const grid = document.getElementById('tips-grid');
  if (!grid) return;
  const tips = getSiteData('tips');

  const catBadgeClass = cat => ({ android:'android', pc:'pc', gaming:'gaming', iphone:'iphone' }[cat] || 'android');

  grid.innerHTML = tips.map(tip => `
    <div class="card tip-card" data-category="${escHtml(tip.category)}" id="tip-card-${tip.id}">
      <div class="card-glow ${tip.glowColor || 'purple'}"></div>
      <div class="card-badge ${catBadgeClass(tip.category)}">${escHtml(tip.category)}</div>
      <div class="card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="${escHtml(tip.iconColor||'#00f5ff')}" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      </div>
      <h3 class="card-title">${escHtml(tip.title)}</h3>
      <p class="card-text">${escHtml(tip.description)}</p>
      <div class="card-footer">
        <span class="card-tag">${escHtml(tip.tag)}</span>
        <a href="${escHtml(tip.readMoreUrl||'#')}" class="card-link" id="tip-read-${tip.id}" ${tip.readMoreUrl && tip.readMoreUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>Read More →</a>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════
   RENDER RESOURCES
══════════════════════════ */
function renderResources() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;
  const resources = getSiteData('resources');

  grid.innerHTML = resources.map(r => `
    <div class="resource-card" id="res-card-${r.id}">
      <div class="card-glow ${r.iconColor || 'purple'}"></div>
      <div class="res-icon ${r.iconColor || 'purple'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      </div>
      <div class="res-content">
        <span class="res-type">${escHtml(r.typeEmoji||'📄')} ${escHtml(r.type)}</span>
        <h3 class="res-title">${escHtml(r.title)}</h3>
        <p class="res-desc">${escHtml(r.description)}</p>
      </div>
      <a href="${escHtml(r.downloadUrl||'#')}" class="btn btn-res" id="download-res-${r.id}" ${r.downloadUrl && r.downloadUrl !== '#' ? 'target="_blank" rel="noopener"' : ''}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Download Free
      </a>
    </div>
  `).join('');
}

/* ══════════════════════════
   RENDER SOCIAL LINKS
══════════════════════════ */
function renderSocial() {
  const s = getSiteData('social');
  const map = { telegram: '#social-telegram', instagram: '#social-instagram', youtube: '#social-youtube', whatsapp: '#social-whatsapp' };
  Object.keys(map).forEach(key => {
    const el = document.querySelector(map[key]);
    if (el && s[key] && s[key] !== '#') el.href = s[key];
  });
}

/* ══════════════════════════
   RENDER ABOUT / SETTINGS
══════════════════════════ */
function renderSettings() {
  const s = getSiteData('settings');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle && s.tagline) {
    // Keep neon spans but update text around them
  }
  const aboutTexts = document.querySelectorAll('.about-text');
  if (aboutTexts[0] && s.aboutText1) aboutTexts[0].textContent = s.aboutText1;
  if (aboutTexts[1] && s.aboutText2) aboutTexts[1].textContent = s.aboutText2;

  // Update stats
  const statEls = document.querySelectorAll('.stat-number');
  if (statEls[0]) statEls[0].dataset.target = s.statFollowers || 50;
  if (statEls[1]) statEls[1].dataset.target = s.statApps || 200;
  if (statEls[2]) statEls[2].dataset.target = s.statTips || 500;

  // About section stats
  const abtNums = document.querySelectorAll('.abt-num');
  if (abtNums[0]) abtNums[0].textContent = (s.statFollowers || 50) + 'K+';
  if (abtNums[1]) abtNums[1].textContent = (s.statApps || 200) + '+';
  if (abtNums[2]) abtNums[2].textContent = (s.statTips || 500) + '+';
}

function escHtml(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════
   PARTICLE SYSTEM
══════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COLORS = ['#b44dff', '#00f5ff', '#39ff14'];
  const COUNT = 80;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4; this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.1;
    this.life = 0; this.maxLife = Math.random() * 300 + 200;
  };

  function initArr() { particles = []; for (let i=0;i<COUNT;i++){ const p=new Particle(); p.life=Math.random()*p.maxLife; particles.push(p); } }

  function drawConn() {
    for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if (d<120) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(180,77,255,${(1-d/120)*0.1})`; ctx.lineWidth=0.5; ctx.stroke(); }
    }
  }

  function animate() {
    ctx.clearRect(0,0,W,H); drawConn();
    particles.forEach(p => {
      p.life++; if(p.life>p.maxLife) p.reset();
      p.x+=p.speedX; p.y+=p.speedY;
      if(p.x<0||p.x>W) p.speedX*=-1; if(p.y<0||p.y>H) p.speedY*=-1;
      const alpha=p.alpha*Math.min(p.life/30,1)*Math.min((p.maxLife-p.life)/30,1);
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle=p.color; ctx.globalAlpha=alpha; ctx.fill();
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
      g.addColorStop(0,p.color+'30'); g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.globalAlpha=alpha*0.5; ctx.fill(); ctx.globalAlpha=1;
    });
    requestAnimationFrame(animate);
  }
  resize(); initArr(); animate();
  window.addEventListener('resize', ()=>{ resize(); initArr(); });
})();

/* ══════════════════════════
   NAVBAR
══════════════════════════ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinksEl.classList.toggle('open'); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { hamburger.classList.remove('active'); navLinksEl.classList.remove('open'); }));

/* ══════════════════════════
   ANIMATED COUNTERS
══════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const start = performance.now();
  const duration = 1800;
  function update(now) {
    const p = Math.min((now-start)/duration,1);
    el.textContent = Math.floor((1-Math.pow(1-p,3))*target);
    if(p<1) requestAnimationFrame(update); else el.textContent = target;
  }
  requestAnimationFrame(update);
}
let countersStarted = false;
const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
  }
}, { threshold: 0.5 });
const heroSec = document.getElementById('home');
if (heroSec) heroObs.observe(heroSec);

/* ══════════════════════════
   SCROLL REVEAL
══════════════════════════ */
function initReveal() {
  document.querySelectorAll('.card, .resource-card, .social-card, .section-header, .about-wrap, .hero-badge, .hero-stats, .hero-btns').forEach(el => {
    el.classList.add('reveal');
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), 80); obs.unobserve(e.target); } });
  }, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ══════════════════════════
   FILTER TABS (Tips)
══════════════════════════ */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.tip-card').forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });
}

/* ══════════════════════════
   DOWNLOAD FEEDBACK
══════════════════════════ */
function initDownloadBtns() {
  document.querySelectorAll('.btn-download, .btn-res').forEach(btn => {
    if (btn.href && btn.href !== '#' && !btn.href.endsWith('#')) return; // real link, don't intercept
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const orig = this.innerHTML;
      this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Coming Soon...`;
      this.style.opacity = '0.7';
      setTimeout(() => { this.innerHTML = orig; this.style.opacity = '1'; }, 2000);
    });
  });
}

/* ══════════════════════════
   ACTIVE NAV ON SCROLL
══════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link:not(.nav-cta)');
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) links.forEach(l => {
        l.style.color = l.getAttribute('href')==='#'+e.target.id ? '#00f5ff' : '';
      });
    });
  }, { rootMargin:'-40% 0px -40% 0px' }).forEach ? null : null;
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) links.forEach(l => { l.style.color = l.getAttribute('href')==='#'+e.target.id ? '#00f5ff' : ''; }); });
  }, { rootMargin:'-40% 0px -40% 0px' });
  sections.forEach(s => sObs.observe(s));
}

/* ══════════════════════════
   CURSOR GLOW
══════════════════════════ */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(180,77,255,0.04),transparent 70%);transform:translate(-50%,-50%);transition:left 0.15s ease,top 0.15s ease;will-change:left,top;';
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', e => { cursorGlow.style.left = e.clientX+'px'; cursorGlow.style.top = e.clientY+'px'; });

/* ══════════════════════════
   INIT ALL & SUPABASE CLOUD SYNC
══════════════════════════ */
async function syncFromCloud() {
  if (!window.SupabaseDB) return;
  try {
    const [cloudApps, cloudTips, cloudResources, cloudSettings] = await Promise.all([
      window.SupabaseDB.getApps(),
      window.SupabaseDB.getTips(),
      window.SupabaseDB.getResources(),
      window.SupabaseDB.getSettings()
    ]);

    let changed = false;
    if (cloudApps && cloudApps.length) {
      localStorage.setItem(SITE_KEYS.apps, JSON.stringify(cloudApps));
      renderApps();
      changed = true;
    }
    if (cloudTips && cloudTips.length) {
      localStorage.setItem(SITE_KEYS.tips, JSON.stringify(cloudTips));
      renderTips();
      changed = true;
    }
    if (cloudResources && cloudResources.length) {
      localStorage.setItem(SITE_KEYS.resources, JSON.stringify(cloudResources));
      renderResources();
      changed = true;
    }
    if (cloudSettings) {
      localStorage.setItem(SITE_KEYS.settings, JSON.stringify(cloudSettings));
      if (cloudSettings.social) localStorage.setItem(SITE_KEYS.social, JSON.stringify(cloudSettings.social));
      renderSocial();
      renderSettings();
      changed = true;
    }

    if (changed) {
      initFilters();
      initDownloadBtns();
    }
  } catch (err) {
    console.warn('Cloud sync error (fallback active):', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Instant local render
  renderApps();
  renderTips();
  renderResources();
  renderSocial();
  renderSettings();

  // 2. Init interactions
  initReveal();
  initFilters();
  initDownloadBtns();
  initActiveNav();

  // 3. Background Cloud Sync with Supabase
  syncFromCloud();

  // 4. Secret Admin Shortcut (Ctrl + Shift + A or Triple-click on logo)
  window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      window.location.href = 'admin.html';
    }
  });

  let logoClicks = 0;
  const logo = document.getElementById('nav-logo-link');
  if (logo) {
    logo.addEventListener('click', (e) => {
      logoClicks++;
      if (logoClicks >= 3) {
        e.preventDefault();
        window.location.href = 'admin.html';
      }
      setTimeout(() => { logoClicks = 0; }, 1500);
    });
  }
});
