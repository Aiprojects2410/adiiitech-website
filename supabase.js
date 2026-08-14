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
  isAvailable() {
    return !!supabaseClient;
  },

  // ── APPS ──
  async getApps() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('apps')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(a => ({
        id: a.id,
        name: a.name,
        version: a.version,
        size: a.size,
        features: typeof a.features === 'string' ? JSON.parse(a.features) : (a.features || []),
        downloadUrl: a.download_url,
        colorFrom: a.color_from,
        colorTo: a.color_to,
        glowColor: a.glow_color,
        safe: a.safe !== false
      }));
    } catch (e) {
      console.warn('Supabase getApps failed, fallback to local:', e.message);
      return null;
    }
  },

  async addApp(app) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('apps')
      .insert([{
        name: app.name,
        version: app.version,
        size: app.size,
        features: app.features || [],
        download_url: app.downloadUrl || '#',
        color_from: app.colorFrom || '#b44dff',
        color_to: app.colorTo || '#191414',
        glow_color: app.glowColor || 'purple',
        safe: app.safe !== false
      }])
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async updateApp(id, app) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('apps')
      .update({
        name: app.name,
        version: app.version,
        size: app.size,
        features: app.features || [],
        download_url: app.downloadUrl || '#',
        color_from: app.colorFrom,
        color_to: app.colorTo,
        glow_color: app.glowColor,
        safe: app.safe !== false
      })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async deleteApp(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('apps').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ── TIPS ──
  async getTips() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('tips')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(t => ({
        id: t.id,
        title: t.title,
        category: t.category,
        tag: t.tag,
        description: t.description,
        readMoreUrl: t.read_more_url,
        iconColor: t.icon_color,
        glowColor: t.glow_color
      }));
    } catch (e) {
      console.warn('Supabase getTips failed, fallback to local:', e.message);
      return null;
    }
  },

  async addTip(tip) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('tips')
      .insert([{
        title: tip.title,
        category: tip.category,
        tag: tip.tag,
        description: tip.description,
        read_more_url: tip.readMoreUrl || '#',
        icon_color: tip.iconColor || '#00f5ff',
        glow_color: tip.glowColor || 'purple'
      }])
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async updateTip(id, tip) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('tips')
      .update({
        title: tip.title,
        category: tip.category,
        tag: tip.tag,
        description: tip.description,
        read_more_url: tip.readMoreUrl || '#',
        icon_color: tip.iconColor,
        glow_color: tip.glowColor
      })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async deleteTip(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('tips').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ── RESOURCES ──
  async getResources() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('resources')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      return (data || []).map(r => ({
        id: r.id,
        title: r.title,
        type: r.type,
        typeEmoji: r.type_emoji,
        description: r.description,
        downloadUrl: r.download_url,
        iconColor: r.icon_color
      }));
    } catch (e) {
      console.warn('Supabase getResources failed, fallback to local:', e.message);
      return null;
    }
  },

  async addResource(r) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('resources')
      .insert([{
        title: r.title,
        type: r.type,
        type_emoji: r.typeEmoji,
        description: r.description,
        download_url: r.downloadUrl || '#',
        icon_color: r.iconColor || 'purple'
      }])
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async updateResource(id, r) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('resources')
      .update({
        title: r.title,
        type: r.type,
        type_emoji: r.typeEmoji,
        description: r.description,
        download_url: r.downloadUrl || '#',
        icon_color: r.iconColor
      })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data && data[0];
  },

  async deleteResource(id) {
    if (!supabaseClient) return null;
    const { error } = await supabaseClient.from('resources').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ── SETTINGS & SOCIAL ──
  async getSettings() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('settings')
        .select('*')
        .eq('id', 'site_config')
        .single();
      if (error) throw error;
      if (!data) return null;
      return {
        tagline: data.tagline,
        aboutText1: data.about_text1,
        aboutText2: data.about_text2,
        statFollowers: data.stat_followers,
        statApps: data.stat_apps,
        statTips: data.stat_tips,
        social: typeof data.social === 'string' ? JSON.parse(data.social) : (data.social || {}),
        email: data.admin_email || 'collab.ahad@gmail.com',
        password: data.admin_password || 'adiiitech2025'
      };
    } catch (e) {
      console.warn('Supabase getSettings failed, fallback to local:', e.message);
      return null;
    }
  },

  async saveSettings(s) {
    if (!supabaseClient) return null;
    const { data, error } = await supabaseClient
      .from('settings')
      .upsert({
        id: 'site_config',
        tagline: s.tagline,
        about_text1: s.aboutText1,
        about_text2: s.aboutText2,
        stat_followers: s.statFollowers,
        stat_apps: s.statApps,
        stat_tips: s.statTips,
        social: s.social,
        admin_email: s.email,
        admin_password: s.password,
        updated_at: new Date().toISOString()
      })
      .select();
    if (error) throw error;
    return data && data[0];
  }
};

window.SupabaseDB = SupabaseDB;
