/* ============================================================
   Perfectly Planned — core interactions (no dependencies)
   Runs across every page; safe if the Motion module never loads.
   ============================================================ */
(function () {
  'use strict';
  var html = document.documentElement;

  /* ---- footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- preloader (once per session) ---- */
  var pre = document.getElementById('preloader');
  if (pre) {
    if (html.classList.contains('preloaded')) {
      pre.parentNode.removeChild(pre);
    } else {
      var hidePre = function () {
        pre.classList.add('done');
        sessionStorage.setItem('pp-seen', '1');
        setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 800);
      };
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(hidePre, reduce ? 250 : 1700);
    }
  }

  /* ---- nav: solid on scroll ---- */
  function syncNav() {
    document.body.classList.toggle('scrolled', window.scrollY > 60);
  }
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  /* ---- mobile drawer ---- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  function closeDrawer() {
    if (!burger) return;
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

  /* ---- count-up + step lines ---- */
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

  /* ---- hero monogram parallax ---- */
  var mono = document.querySelector('[data-parallax]');
  if (mono && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var rate = parseFloat(mono.getAttribute('data-parallax')) || 0.15;
    window.addEventListener('scroll', function () {
      var sy = window.scrollY;
      if (sy < 1100) mono.style.transform = 'translateY(' + (sy * rate) + 'px)';
    }, { passive: true });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var panel = item.querySelector('.faq__a');
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq__item.open .faq__a').forEach(function (p) {
      p.style.maxHeight = p.scrollHeight + 'px';
    });
  });

  /* ---- lightbox ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-lb]'));
    var lbImg = lb.querySelector('.lightbox__img');
    var lbCap = lb.querySelector('.lightbox__cap-text');
    var lbCount = lb.querySelector('.lightbox__count');
    var idx = 0;
    function show(i) {
      idx = (i + items.length) % items.length;
      var el = items[idx];
      var src = el.getAttribute('data-lb');
      var cap = el.getAttribute('data-cap') || '';
      lbImg.src = src;
      lbImg.alt = cap;
      if (lbCap) lbCap.textContent = cap;
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(i) {
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    items.forEach(function (el, i) {
      el.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---- inquiry form -> mailto ---- */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = true;
      [['f-name', false], ['f-email', true]].forEach(function (pair) {
        var el = document.getElementById(pair[0]);
        if (!el) return;
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

  /* ---- safety net: never leave reveal content hidden ---- */
  setTimeout(function () {
    if (!html.classList.contains('motion')) html.classList.remove('js');
  }, 2600);
})();
