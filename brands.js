/* ═════════════════════════════════════════════════════════════════════════════
   ADIIITECH_ — brands.js (Brand Portal, WhatsApp Redirect & 2-Way Chat)
   ═════════════════════════════════════════════════════════════════════════════ */

'use strict';

const BRAND_KEYS = {
  activeBrand: 'adt_active_brand',
  brandsList: 'adt_brands_list',
  messages: 'adt_brand_messages_'
};

const CREATOR_CONTACT = {
  phone: '+91 9012786022',
  whatsappNumber: '919012786022',
  email: 'collab.ahad@gmail.com'
};

let currentAttachmentBase64 = null;
let chatPollingInterval = null;

/* ══════════════════════════
   INITIALIZATION
══════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCreatorContact();
  checkExistingBrandSession();

  // Mobile Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }
});

function initCreatorContact() {
  // Try to read custom phone from settings if available
  const s = localStorage.getItem('adt_settings');
  if (s) {
    try {
      const parsed = JSON.parse(s);
      if (parsed.collabPhone) CREATOR_CONTACT.phone = parsed.collabPhone;
      if (parsed.collabWhatsapp) CREATOR_CONTACT.whatsappNumber = parsed.collabWhatsapp.replace(/\D/g, '');
    } catch(e){}
  }

  const phoneEl = document.getElementById('creator-phone-display');
  const waEl = document.getElementById('creator-wa-display');
  const callBtn = document.getElementById('call-action-btn');

  if (phoneEl) phoneEl.textContent = CREATOR_CONTACT.phone;
  if (waEl) waEl.textContent = CREATOR_CONTACT.phone;
  if (callBtn) callBtn.href = `tel:${CREATOR_CONTACT.whatsappNumber}`;
}

/* ══════════════════════════
   BRAND SESSION MANAGEMENT
══════════════════════════ */
function checkExistingBrandSession() {
  const raw = localStorage.getItem(BRAND_KEYS.activeBrand);
  if (raw) {
    try {
      const brand = JSON.parse(raw);
      renderUnlockedState(brand);
      return;
    } catch (e) {
      localStorage.removeItem(BRAND_KEYS.activeBrand);
    }
  }

  // Not logged in: Show modal after 1.2s delay for seamless onboarding
  setTimeout(() => {
    const isModalOpen = !document.getElementById('signup-modal-overlay').classList.contains('hidden');
    const isAlreadyRegistered = !!localStorage.getItem(BRAND_KEYS.activeBrand);
    if (!isModalOpen && !isAlreadyRegistered) {
      openSignupModal();
    }
  }, 1200);
}

function openSignupModal() {
  const modal = document.getElementById('signup-modal-overlay');
  if (modal) modal.classList.remove('hidden');
}

function closeSignupModal() {
  const modal = document.getElementById('signup-modal-overlay');
  if (modal) modal.classList.add('hidden');
}

function openSignupWithFormat(format) {
  openSignupModal();
  const sel = document.getElementById('inp-campaign-type');
  if (sel) {
    for (let opt of sel.options) {
      if (opt.value.includes(format)) {
        sel.value = opt.value;
        break;
      }
    }
  }
}

function handleCollabTypeChange(type) {
  const cardPaid = document.getElementById('card-paid');
  const cardBarter = document.getElementById('card-barter');
  const budgetLabel = document.getElementById('budget-label');
  const budgetInp = document.getElementById('inp-budget');

  if (type === 'Paid') {
    cardPaid.classList.add('active');
    cardBarter.classList.remove('active');
    budgetLabel.textContent = 'Proposed Budget (₹ / $)';
    budgetInp.placeholder = 'e.g. ₹15,000 - ₹30,000';
  } else {
    cardBarter.classList.add('active');
    cardPaid.classList.remove('active');
    budgetLabel.textContent = 'Free Products / Barter Details';
    budgetInp.placeholder = 'e.g. 2x Free Gadgets + 1 Year Pro License';
  }
}

/* ══════════════════════════
   BRAND SIGNUP & WHATSAPP REDIRECT
══════════════════════════ */
async function handleBrandSignup(e) {
  e.preventDefault();

  const brandName = document.getElementById('inp-brand-name').value.trim();
  const contactPerson = document.getElementById('inp-contact-person').value.trim();
  const email = document.getElementById('inp-email').value.trim();
  const phone = document.getElementById('inp-phone').value.trim();
  const website = document.getElementById('inp-website').value.trim() || 'N/A';
  const collabType = document.querySelector('input[name="collab_type"]:checked').value;
  const campaignType = document.getElementById('inp-campaign-type').value;
  const budget = document.getElementById('inp-budget').value.trim() || (collabType === 'Paid' ? 'Negotiable' : 'Barter Gift Pack');
  const initialMessage = document.getElementById('inp-message').value.trim();

  if (!brandName || !contactPerson || !email || !phone || !initialMessage) {
    alert('Kripya saari required details fill karein!');
    return;
  }

  const brandId = 'brand_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  const brandData = {
    id: brandId,
    brandName,
    contactPerson,
    email,
    phone,
    website,
    collabType,
    campaignType,
    budget,
    initialMessage,
    createdAt: new Date().toISOString()
  };

  // 1. Save locally
  localStorage.setItem(BRAND_KEYS.activeBrand, JSON.stringify(brandData));
  saveBrandToLocalList(brandData);

  // 2. Initial Message into Local & Supabase
  const firstMsg = {
    id: Date.now(),
    brandId: brandId,
    sender: 'brand',
    message: initialMessage,
    attachmentUrl: null,
    createdAt: new Date().toISOString()
  };
  saveMessageLocally(brandId, firstMsg);

  // 3. Save to Supabase Cloud
  if (window.SupabaseDB) {
    window.SupabaseDB.registerBrand(brandData);
    window.SupabaseDB.sendBrandMessage({
      brandId: brandId,
      sender: 'brand',
      message: initialMessage
    });
  }

  // 4. Close Modal & Unlock Hub
  closeSignupModal();
  renderUnlockedState(brandData);

  // 5. Build WhatsApp URL with Pre-formatted Proposal
  const waText = 
`🚀 *NEW BRAND COLLABORATION PROPOSAL* 🚀

🏢 *Brand Name:* ${brandName}
👤 *Contact Person:* ${contactPerson}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🌐 *Website/Link:* ${website}

💼 *Collab Model:* ${collabType.toUpperCase()}
💰 *Budget / Offering:* ${budget}
🎯 *Campaign Format:* ${campaignType}

💬 *Campaign Brief & Message:*
"${initialMessage}"

⚡ _Sent via Adiiitech Brand Collaboration Portal_`;

  const waUrl = `https://wa.me/${CREATOR_CONTACT.whatsappNumber}?text=${encodeURIComponent(waText)}`;

  // 6. Update action buttons
  const waBtn = document.getElementById('wa-action-btn');
  if (waBtn) waBtn.href = waUrl;

  // 7. Auto-redirect to WhatsApp
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 400);
}

function saveBrandToLocalList(brand) {
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem(BRAND_KEYS.brandsList) || '[]');
  } catch(e){}
  list.unshift(brand);
  localStorage.setItem(BRAND_KEYS.brandsList, JSON.stringify(list));
}

function saveMessageLocally(brandId, msg) {
  let msgs = [];
  try {
    msgs = JSON.parse(localStorage.getItem(BRAND_KEYS.messages + brandId) || '[]');
  } catch(e){}
  msgs.push(msg);
  localStorage.setItem(BRAND_KEYS.messages + brandId, JSON.stringify(msgs));
}

/* ══════════════════════════
   RENDER UNLOCKED STATE
══════════════════════════ */
function renderUnlockedState(brand) {
  // Show Contact Hub
  const hub = document.getElementById('contact-hub');
  if (hub) hub.classList.remove('hidden');

  const brandDisplay = document.getElementById('brand-display-name');
  if (brandDisplay) brandDisplay.textContent = brand.brandName;

  // Update Nav Button
  const navActionText = document.getElementById('nav-action-text');
  if (navActionText) navActionText.textContent = `${brand.brandName} (Active)`;

  // Update WhatsApp Button URL
  const waBtn = document.getElementById('wa-action-btn');
  if (waBtn) {
    const waText = `Hi Adiiitech! I am ${brand.contactPerson} from ${brand.brandName}. We submitted a ${brand.collabType} collaboration inquiry on your portal.`;
    waBtn.href = `https://wa.me/${CREATOR_CONTACT.whatsappNumber}?text=${encodeURIComponent(waText)}`;
  }

  // Switch Chat Section to Active
  const lockedView = document.getElementById('chat-locked-view');
  const activeView = document.getElementById('chat-active-view');
  if (lockedView) lockedView.classList.add('hidden');
  if (activeView) activeView.classList.remove('hidden');

  const chatBrandTitle = document.getElementById('chat-brand-title');
  if (chatBrandTitle) chatBrandTitle.textContent = brand.brandName;

  const chatTypeBadge = document.getElementById('chat-type-badge');
  if (chatTypeBadge) {
    chatTypeBadge.textContent = brand.collabType.toUpperCase();
    chatTypeBadge.style.color = brand.collabType === 'Paid' ? 'var(--neon-green)' : 'var(--neon-cyan)';
  }

  // Load chat messages
  loadChatMessages(brand.id);

  // Start Realtime Polling
  if (chatPollingInterval) clearInterval(chatPollingInterval);
  chatPollingInterval = setInterval(() => {
    loadChatMessages(brand.id, true);
  }, 3500);
}

function logoutBrand() {
  if (confirm('Kya aap dusre brand se sign up karna chahte hain?')) {
    localStorage.removeItem(BRAND_KEYS.activeBrand);
    if (chatPollingInterval) clearInterval(chatPollingInterval);
    location.reload();
  }
}

/* ══════════════════════════
   2-WAY CHAT MESSAGING
══════════════════════════ */
async function loadChatMessages(brandId, isBackgroundSync = false) {
  let messages = [];

  // Try fetching latest messages from Supabase
  if (window.SupabaseDB) {
    const cloudMsgs = await window.SupabaseDB.getBrandMessages(brandId);
    if (cloudMsgs && cloudMsgs.length > 0) {
      messages = cloudMsgs;
      localStorage.setItem(BRAND_KEYS.messages + brandId, JSON.stringify(cloudMsgs));
    }
  }

  // Fallback to local
  if (messages.length === 0) {
    try {
      messages = JSON.parse(localStorage.getItem(BRAND_KEYS.messages + brandId) || '[]');
    } catch(e){}
  }

  renderChatBubbles(messages, isBackgroundSync);
}

function renderChatBubbles(messages, isBackgroundSync) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  if (messages.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;color:var(--text-muted);padding:40px 20px;font-size:0.88rem;">
        No messages yet. Send your campaign pitch or upload a brief below!
      </div>
    `;
    return;
  }

  const html = messages.map(m => {
    const isBrand = m.sender === 'brand';
    const senderName = isBrand ? 'You (Brand)' : 'Adiiitech_ (Creator)';
    const timeStr = m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return `
      <div class="msg-bubble-wrap ${isBrand ? 'brand' : 'admin'}">
        <span class="msg-sender-label">${senderName}</span>
        <div class="msg-bubble">
          ${m.message ? `<div>${escapeHtml(m.message)}</div>` : ''}
          ${m.attachmentUrl ? `
            <div class="msg-attachment">
              <a href="${m.attachmentUrl}" target="_blank" title="Click to view full image">
                <img src="${m.attachmentUrl}" alt="Campaign attachment" />
              </a>
            </div>
          ` : ''}
        </div>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
  }).join('');

  const shouldScroll = !isBackgroundSync || (container.scrollHeight - container.scrollTop <= container.clientHeight + 100);
  container.innerHTML = html;

  if (shouldScroll) {
    container.scrollTop = container.scrollHeight;
  }
}

/* ══════════════════════════
   IMAGE ATTACHMENT HANDLER
══════════════════════════ */
function handleImageAttachment(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Sirf image files (PNG, JPG, WebP) attach ki ja sakti hain.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Image file size 5 MB se kam honi chahiye.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    currentAttachmentBase64 = evt.target.result;
    const previewBar = document.getElementById('attachment-preview-bar');
    const previewImg = document.getElementById('attachment-img-preview');
    const fileNameEl = document.getElementById('attachment-file-name');

    if (previewImg) previewImg.src = currentAttachmentBase64;
    if (fileNameEl) fileNameEl.textContent = file.name;
    if (previewBar) previewBar.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function clearAttachment() {
  currentAttachmentBase64 = null;
  const fileInp = document.getElementById('chat-file-input');
  if (fileInp) fileInp.value = '';
  const previewBar = document.getElementById('attachment-preview-bar');
  if (previewBar) previewBar.classList.add('hidden');
}

/* ══════════════════════════
   SEND CHAT MESSAGE
══════════════════════════ */
async function handleSendChatMessage(e) {
  e.preventDefault();

  const textInp = document.getElementById('chat-input-text');
  const msgText = textInp ? textInp.value.trim() : '';

  if (!msgText && !currentAttachmentBase64) return;

  const raw = localStorage.getItem(BRAND_KEYS.activeBrand);
  if (!raw) {
    openSignupModal();
    return;
  }

  const brand = JSON.parse(raw);

  const newMsg = {
    id: Date.now(),
    brandId: brand.id,
    sender: 'brand',
    message: msgText,
    attachmentUrl: currentAttachmentBase64,
    createdAt: new Date().toISOString()
  };

  // 1. Save locally
  saveMessageLocally(brand.id, newMsg);

  // 2. Clear inputs
  if (textInp) textInp.value = '';
  const attachmentToSend = currentAttachmentBase64;
  clearAttachment();

  // 3. Render immediately
  loadChatMessages(brand.id);

  // 4. Send to Supabase Cloud
  if (window.SupabaseDB) {
    await window.SupabaseDB.sendBrandMessage({
      brandId: brand.id,
      sender: 'brand',
      message: msgText,
      attachmentUrl: attachmentToSend
    });
  }
}

function copyCreatorNumber() {
  navigator.clipboard.writeText(CREATOR_CONTACT.phone).then(() => {
    alert(`Creator number copied: ${CREATOR_CONTACT.phone} ✅`);
  }).catch(() => {
    prompt('Copy creator phone number:', CREATOR_CONTACT.phone);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ══════════════════════════
   CANVAS PARTICLES
══════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.5 ? '#b44dff' : '#00f5ff';
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 40; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

/* Expose global helpers */
window.openSignupModal = openSignupModal;
window.closeSignupModal = closeSignupModal;
window.openSignupWithFormat = openSignupWithFormat;
window.handleCollabTypeChange = handleCollabTypeChange;
window.handleBrandSignup = handleBrandSignup;
window.handleImageAttachment = handleImageAttachment;
window.clearAttachment = clearAttachment;
window.handleSendChatMessage = handleSendChatMessage;
window.copyCreatorNumber = copyCreatorNumber;
window.logoutBrand = logoutBrand;
