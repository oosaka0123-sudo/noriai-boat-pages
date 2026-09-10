(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header show/hide on scroll ---------- */
  var header = document.getElementById('siteHeader');
  var HEADER_THRESHOLD = 90;

  function updateHeader() {
    if (window.scrollY > HEADER_THRESHOLD) {
      header.classList.add('is-visible');
    } else {
      header.classList.remove('is-visible');
    }
  }

  if (header) {
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------- Mobile nav overlay ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var navOverlay = document.getElementById('navOverlay');
  var body = document.body;

  function openMenu() {
    navOverlay.classList.add('is-open');
    navOverlay.removeAttribute('inert');
    navOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
    var firstLink = navOverlay.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu(returnFocus) {
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    navOverlay.setAttribute('inert', '');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    if (returnFocus) menuToggle.focus();
  }

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navOverlay.classList.contains('is-open');
      if (isOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    navOverlay.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeMenu(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navOverlay.classList.contains('is-open')) {
        closeMenu(true);
      }
    });
  }

  /* ---------- Reserve button demo status ---------- */
  var reserveBtn = document.getElementById('reserveDemoBtn');
  var reserveStatus = document.getElementById('reserveStatus');

  if (reserveBtn && reserveStatus) {
    reserveBtn.addEventListener('click', function () {
      reserveStatus.textContent = '現在システム準備中です。公開まで、今しばらくお待ちください。';
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-mask, .reveal-img');

  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Respect reduced motion for background video ---------- */
  if (reduceMotion) {
    document.querySelectorAll('.bg-video').forEach(function (video) {
      video.pause();
      video.removeAttribute('autoplay');
    });
  }
})();
