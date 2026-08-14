/* ADIIITECH_ admin.js syntax repair loader */
(function () {
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
      const originalAddEventListener = document.addEventListener;
      const domReadyAlreadyFired = document.readyState !== 'loading';

      if (domReadyAlreadyFired) {
        document.addEventListener = function (type, listener, options) {
          if (type === 'DOMContentLoaded') {
            listener.call(document, new Event('DOMContentLoaded'));
            return;
          }
          return originalAddEventListener.call(document, type, listener, options);
        };
      }

      try {
        const script = document.createElement('script');
        script.textContent = repaired;
        document.head.appendChild(script);
      } finally {
        if (domReadyAlreadyFired) document.addEventListener = originalAddEventListener;
      }
    })
    .catch(err => console.error('admin-fix failed:', err));
})();
