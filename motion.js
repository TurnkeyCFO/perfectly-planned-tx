/* ============================================================
   Perfectly Planned — Motion enhancement layer
   Loads the Motion library (the engine behind Framer Motion) and
   choreographs entrance + scroll reveals. Fully optional: if the
   CDN is unreachable, the catch block reveals all content.
   ============================================================ */
(async () => {
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = [0.22, 0.61, 0.36, 1];

  let M;
  try {
    M = await import('https://cdn.jsdelivr.net/npm/motion@11/+esm');
  } catch (e) {
    // Motion unavailable — strip .js so CSS stops hiding reveal elements
    html.classList.remove('js');
    console.warn('[PP] Motion CDN unreachable — static fallback engaged.');
    return;
  }

  // The main.js safety net already revealed everything (slow import). Stand down.
  if (!html.classList.contains('js')) return;

  // Signal main.js that Motion owns the reveals.
  html.classList.add('motion');

  const animate = M.animate;

  // Reduced motion: CSS already forces content visible. Do nothing further.
  if (reduce || typeof animate !== 'function') return;

  /* ---- hero entrance ---- */
  document.querySelectorAll('[data-hero]').forEach((el, i) => {
    animate(el, { opacity: [0, 1], y: [30, 0] },
      { duration: 0.9, delay: 0.12 + i * 0.11, ease: EASE });
  });

  /* ---- hero image: slow settle ---- */
  const heroImg = document.querySelector('.hero__media img');
  if (heroImg) {
    animate(heroImg, { scale: [1.14, 1.04] }, { duration: 2.0, ease: EASE });
  }

  /* ---- scroll reveals ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);

      const group = el.closest('[data-stagger]');
      let delay = 0;
      if (group) {
        const sibs = Array.prototype.slice.call(group.querySelectorAll('[data-reveal]'));
        delay = Math.max(0, sibs.indexOf(el)) * 0.08;
      }
      animate(el, { opacity: [0, 1], y: [30, 0] },
        { duration: 0.95, delay, ease: EASE });
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
})();
