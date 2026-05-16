/* ============================================================
   Perfectly Planned — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- nav: condense on scroll ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile drawer ---- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  function closeDrawer() {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeDrawer);
  });

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- count-up stats ---- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var statEls = document.querySelectorAll('.stat__num[data-count]');
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); sio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    statEls.forEach(function (el) { sio.observe(el); });
  } else {
    statEls.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---- inquiry form -> mailto ---- */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = true;
      ['f-name', 'f-email'].forEach(function (id) {
        var el = document.getElementById(id);
        var valid = el.value.trim() !== '' &&
          (id !== 'f-email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
        el.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent = 'Please add your name and a valid email so we can reply.';
        note.classList.remove('ok');
        return;
      }
      var v = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var lines = [
        'Name: ' + v('f-name'),
        'Partner: ' + (v('f-partner') || '—'),
        'Email: ' + v('f-email'),
        'Phone: ' + (v('f-phone') || '—'),
        'Wedding date: ' + (v('f-date') || '—'),
        'Venue / location: ' + (v('f-venue') || '—'),
        'Service of interest: ' + v('f-service'),
        '',
        'About the day:',
        v('f-message') || '(none provided)'
      ];
      var subject = 'Wedding Inquiry — ' + v('f-name');
      var mailto = 'mailto:info@perfectlyplannedtx.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = mailto;
      note.textContent = 'Opening your email app — just hit send. Prefer to call? 979.255.0762';
      note.classList.add('ok');
      form.reset();
    });
  }

  /* ---- gentle hero parallax on watermark (sway animation left intact) ---- */
  var watermark = document.querySelector('.hero__watermark');
  if (watermark && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 1000) watermark.style.transform = 'translateY(' + (y * 0.08) + 'px)';
    }, { passive: true });
  }
})();
