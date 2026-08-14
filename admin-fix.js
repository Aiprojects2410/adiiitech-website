/* ADIIITECH_ admin.js syntax repair loader */
(function () {
  const load = () => {
    fetch('admin.js', { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error('admin.js could not be loaded');
        return r.text();
      })
      .then(code => {
        const broken = `    toggleBtn.style.color = isPass ? 'var(--neon-cyan)' : 'var(--text-muted)';\n    });\n  if (loginBtn)`;
        const fixed = `    toggleBtn.style.color = isPass ? 'var(--neon-cyan)' : 'var(--text-muted)';\n    });\n  }\n  if (loginBtn)`;
        if (!code.includes(broken)) {
          console.warn('admin-fix: expected login handler pattern not found.');
          return;
        }
        const repaired = code.replace(broken, fixed);
        const script = document.createElement('script');
        script.textContent = repaired;
        document.head.appendChild(script);
      })
      .catch(err => console.error('admin-fix failed:', err));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load, { once: true });
  } else {
    load();
  }
})();
