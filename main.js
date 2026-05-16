/* ============================================================
   Perfectly Planned — core interactions (no dependencies)
   Runs regardless of whether the Motion module loads.
   ============================================================ */
(function () {
  'use strict';
  var html = document.documentElement;

  /* footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* nav: solid state on scroll */
  function syncNav() {
    document.body.classList.toggle('scrolled', window.scrollY > 60);
  }
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  /* mobile drawer */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  function closeDrawer() {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* count-up stats */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1700, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(e * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* step accent lines */
  var observers = [];
  if ('IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); statIO.unobserve(e.target); }
      });
    }, { threshold: 0.7 });
    document.querySelectorAll('[data-count]').forEach(function (el) { statIO.observe(el); });

    var stepIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); stepIO.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.step').forEach(function (el) { stepIO.observe(el); });
  } else {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* hero monogram parallax */
  var mono = document.querySelector('[data-parallax]');
  if (mono && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var rate = parseFloat(mono.getAttribute('data-parallax')) || 0.15;
    window.addEventListener('scroll', function () {
      var sy = window.scrollY;
      if (sy < 1100) mono.style.transform = 'translateY(' + (sy * rate) + 'px)';
    }, { passive: true });
  }

  /* inquiry form -> mailto */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = true;
      [['f-name', false], ['f-email', true]].forEach(function (pair) {
        var el = document.getElementById(pair[0]);
        var v = el.value.trim();
        var valid = v !== '' && (!pair[1] || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
        el.classList.toggle('bad', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent = 'Please add your name and a valid email so we can reply.';
        note.classList.remove('ok');
        return;
      }
      var g = function (id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; };
      var body = [
        'Name: ' + g('f-name'),
        "Partner's name: " + (g('f-partner') || '—'),
        'Email: ' + g('f-email'),
        'Phone: ' + (g('f-phone') || '—'),
        'Wedding date: ' + (g('f-date') || '—'),
        'Venue / location: ' + (g('f-venue') || '—'),
        'Service of interest: ' + g('f-service'),
        '', 'About the day:', g('f-message') || '(none provided)'
      ].join('\n');
      window.location.href = 'mailto:info@perfectlyplannedtx.com'
        + '?subject=' + encodeURIComponent('Wedding Inquiry — ' + g('f-name'))
        + '&body=' + encodeURIComponent(body);
      note.textContent = 'Opening your email app — just press send. Prefer to call? 979.255.0762';
      note.classList.add('ok');
      form.reset();
    });
  }

  /* safety net: if the Motion module never marks itself ready,
     un-hide all reveal elements so content is never stuck invisible */
  setTimeout(function () {
    if (!html.classList.contains('motion')) html.classList.remove('js');
  }, 2600);
})();
