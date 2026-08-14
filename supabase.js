/* ═════════════════════════════════════════════════════════════════════════════
   ADIIITECH_ — Supabase Cloud Database Client
   ═════════════════════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://bshisdrwmjqbourieirs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_F_KthVMC24zf-Sj9CmGj1Q_LmtEEHt8';

let supabaseClient = null;

if (window.supabase && typeof window.supabase.createClient === 'function') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('⚡ Supabase Cloud Connected successfully.');
  } catch (err) {
    console.warn('⚠️ Supabase init error:', err);
  }
}

const SupabaseDB = {
  isAvailable() { return !!supabaseClient; },

  async getApps() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient.from('apps').select('*').order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(a => ({
        id: a.id, name: a.name, version: a.version, size: a.size,
        features: typeof a.features === 'string' ? JSON.parse(a.features) : (a.features || []),
        downloadUrl: a.download_url, colorFrom: a.color_from, colorTo: a.color_to,
        glowColor: a.glow_color, safe: a.safe !== false
      }));
    } catch (e) { console.warn('Supabase getApps failed, fallback to local:', e.message); return null; }
  },

  async addApp(app) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('apps').insert([{
      name: app.name, version: app.version, size: app.size, features: app.features || [],
      download_url: app.downloadUrl || '#', color_from: app.colorFrom || '#b44dff',
      color_to: app.colorTo || '#191414', glow_color: app.glowColor || 'purple', safe: app.safe !== false
    }]).select();
    if (error) throw error; return data && data[0];
  },

  async updateApp(id, app) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('apps').update({
      name: app.name, version: app.version, size: app.size, features: app.features || [],
      download_url: app.downloadUrl || '#', color_from: app.colorFrom, color_to: app.colorTo,
      glow_color: app.glowColor, safe: app.safe !== false
    }).eq('id', id).select();
    if (error) throw error; return data && data[0];
  },

  async deleteApp(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('apps').delete().eq('id', id);
    if (error) throw error; return true;
  },

  async getTips() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient.from('tips').select('*').order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(t => ({ id: t.id, title: t.title, category: t.category, tag: t.tag,
        description: t.description, readMoreUrl: t.read_more_url, iconColor: t.icon_color, glowColor: t.glow_color }));
    } catch (e) { console.warn('Supabase getTips failed, fallback to local:', e.message); return null; }
  },

  async addTip(tip) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('tips').insert([{
      title: tip.title, category: tip.category, tag: tip.tag, description: tip.description,
      read_more_url: tip.readMoreUrl || '#', icon_color: tip.iconColor || '#00f5ff', glow_color: tip.glowColor || 'purple'
    }]).select();
    if (error) throw error; return data && data[0];
  },

  async updateTip(id, tip) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('tips').update({
      title: tip.title, category: tip.category, tag: tip.tag, description: tip.description,
      read_more_url: tip.readMoreUrl || '#', icon_color: tip.iconColor, glow_color: tip.glowColor
    }).eq('id', id).select();
    if (error) throw error; return data && data[0];
  },

  async deleteTip(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('tips').delete().eq('id', id);
    if (error) throw error; return true;
  },

  async getResources() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient.from('resources').select('*').order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(r => ({ id: r.id, title: r.title, type: r.type, typeEmoji: r.type_emoji,
        description: r.description, downloadUrl: r.download_url, iconColor: r.icon_color }));
    } catch (e) { console.warn('Supabase getResources failed, fallback to local:', e.message); return null; }
  },

  async addResource(r) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('resources').insert([{
      title: r.title, type: r.type, type_emoji: r.typeEmoji, description: r.description,
      download_url: r.downloadUrl || '#', icon_color: r.iconColor || 'purple'
    }]).select();
    if (error) throw error; return data && data[0];
  },

  async updateResource(id, r) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('resources').update({
      title: r.title, type: r.type, type_emoji: r.typeEmoji, description: r.description,
      download_url: r.downloadUrl || '#', icon_color: r.iconColor
    }).eq('id', id).select();
    if (error) throw error; return data && data[0];
  },

  async deleteResource(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('resources').delete().eq('id', id);
    if (error) throw error; return true;
  },

  async getSettings() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient.from('settings').select('*').eq('id', 'site_config').single();
      if (error) throw error;
      if (!data) return null;
      return { tagline: data.tagline, aboutText1: data.about_text1, aboutText2: data.about_text2,
        statFollowers: data.stat_followers, statApps: data.stat_apps, statTips: data.stat_tips,
        social: typeof data.social === 'string' ? JSON.parse(data.social) : (data.social || {}),
        email: data.admin_email || 'collab.ahad@gmail.com', password: data.admin_password || 'adiiitech2025' };
    } catch (e) { console.warn('Supabase getSettings failed, fallback to local:', e.message); return null; }
  },

  async saveSettings(s) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient.from('settings').upsert({
      id: 'site_config', tagline: s.tagline, about_text1: s.aboutText1, about_text2: s.aboutText2,
      stat_followers: s.statFollowers, stat_apps: s.statApps, stat_tips: s.statTips, social: s.social,
      admin_email: s.email, admin_password: s.password, updated_at: new Date().toISOString()
    }).select();
    if (error) throw error; return data && data[0];
  }
};

window.SupabaseDB = SupabaseDB;

/* ═════════════════════════════════════════════════════════════════════════════
   ADIIITECH_ — PROFESSIONAL AD SYSTEM
   ═════════════════════════════════════════════════════════════════════════════ */
(function initAdSections() {
  const isPublicSite = location.pathname === '/' || /index\.html$/i.test(location.pathname);
  if (!isPublicSite || document.getElementById('adiiitech-ad-system')) return;

  const style = document.createElement('style');
  style.id = 'adiiitech-ad-system';
  style.textContent = `
    .at-ad-section{position:relative;z-index:2;padding:22px 0 8px}
    .at-ad-wrap{width:min(100% - 32px,1100px);margin:0 auto}
    .at-ad-label{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:9px;color:var(--text-muted);font:600 10px/1 var(--font-display);letter-spacing:2.2px;text-transform:uppercase}
    .at-ad-label::before,.at-ad-label::after{content:'';height:1px;flex:1;max-width:120px;background:linear-gradient(90deg,transparent,var(--border-subtle))}
    .at-ad-label::after{background:linear-gradient(90deg,var(--border-subtle),transparent)}
    .at-ad-box{position:relative;min-height:112px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(180,77,255,.13);border-radius:16px;background:linear-gradient(120deg,rgba(13,13,26,.88),rgba(17,17,39,.58));overflow:hidden;box-shadow:inset 0 0 45px rgba(180,77,255,.025)}
    .at-ad-box::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(0,245,255,.035) 50%,transparent 100%);pointer-events:none}
    .at-ad-box::after{content:'AD';position:absolute;right:14px;top:12px;border:1px solid rgba(255,255,255,.08);border-radius:4px;padding:3px 5px;color:var(--text-muted);font:600 8px var(--font-display);letter-spacing:1px}
    .at-ad-placeholder{position:relative;z-index:1;text-align:center;color:var(--text-muted);font:500 12px var(--font-body);letter-spacing:.8px}
    .at-ad-placeholder strong{display:block;margin-bottom:3px;color:var(--text-secondary);font:600 11px var(--font-display);letter-spacing:1.5px;text-transform:uppercase}
    .at-ad-native{min-height:138px;justify-content:space-between;padding:22px 26px;text-align:left}
    .at-ad-native .at-ad-copy{max-width:690px}
    .at-ad-native .at-ad-kicker{display:inline-flex;align-items:center;gap:7px;color:var(--neon-cyan);font:600 10px var(--font-display);letter-spacing:1.5px;text-transform:uppercase}
    .at-ad-native .at-ad-kicker i{width:6px;height:6px;border-radius:50%;background:var(--neon-cyan);box-shadow:0 0 10px var(--neon-cyan)}
    .at-ad-native h3{margin:7px 0 4px;font:700 clamp(15px,2vw,20px) var(--font-display);color:var(--text-primary)}
    .at-ad-native p{color:var(--text-secondary);font-size:13px;margin:0}
    .at-ad-cta{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;margin-left:20px;padding:10px 16px;border:1px solid rgba(0,245,255,.25);border-radius:9px;color:var(--neon-cyan);font:600 11px var(--font-display);letter-spacing:1px;text-transform:uppercase;background:rgba(0,245,255,.04)}
    .at-ad-cta:hover{background:rgba(0,245,255,.09);box-shadow:0 0 22px rgba(0,245,255,.12)}
    @media(max-width:680px){.at-ad-section{padding:15px 0 4px}.at-ad-wrap{width:min(100% - 20px,1100px)}.at-ad-box{min-height:92px}.at-ad-native{display:block;padding:18px}.at-ad-cta{margin:13px 0 0}.at-ad-label{font-size:8px;letter-spacing:1.7px}}
  `;
  document.head.appendChild(style);

  const makeAd = (id, mode = 'standard', title = '', text = '') => {
    const section = document.createElement('section');
    section.className = 'at-ad-section';
    section.id = id;
    section.setAttribute('aria-label', 'Advertisement');
    section.innerHTML = mode === 'native'
      ? `<div class="at-ad-wrap"><div class="at-ad-label">Sponsored</div><div class="at-ad-box at-ad-native"><div class="at-ad-copy"><span class="at-ad-kicker"><i></i> Partner Spotlight</span><h3>${title}</h3><p>${text}</p></div><a class="at-ad-cta" href="#" aria-label="Sponsored link">Explore <span>→</span></a></div></div>`
      : `<div class="at-ad-wrap"><div class="at-ad-label">Advertisement</div><div class="at-ad-box"><div class="at-ad-placeholder"><strong>AD SPACE</strong>Curated placement • Fast-loading • Mobile optimized</div></div></div>`;
    return section;
  };

  const hero = document.getElementById('home');
  const tips = document.getElementById('tips');
  const apps = document.getElementById('apps');
  const resources = document.getElementById('resources');
  const footer = document.querySelector('footer.footer');

  if (hero && tips) hero.insertAdjacentElement('afterend', makeAd('ad-top', 'native', 'Discover the next tool before everyone else.', 'A premium-looking partner slot designed to blend into the ADIIITECH_ experience.'));
  if (apps && resources) apps.insertAdjacentElement('afterend', makeAd('ad-mid'));
  if (footer) footer.insertAdjacentElement('beforebegin', makeAd('ad-bottom'));

  window.ADIIITECH_ADS = { version: '1.0', slots: ['ad-top', 'ad-mid', 'ad-bottom'], readyForAdSense: true };
})();
