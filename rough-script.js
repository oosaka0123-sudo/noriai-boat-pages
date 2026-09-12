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

  /* ---------- Catch sample fallback: inline SVG ---------- */
  var sampleSvgs = {
    '01': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img" aria-label="青物を持つ釣果サンプル" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%"><defs><linearGradient id="sky01" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd6df"/><stop offset="1" stop-color="#d9e7df"/></linearGradient><linearGradient id="sea01" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f7f8d"/><stop offset="1" stop-color="#0b2f38"/></linearGradient></defs><rect width="1200" height="1500" fill="#0b1113"/><rect width="1200" height="700" fill="url(#sky01)"/><rect y="700" width="1200" height="800" fill="url(#sea01)"/><g fill="none" stroke="#b8e4e7" stroke-width="8" opacity=".45"><path d="M0 790 Q180 740 360 790 T720 790 T1080 790 T1440 790"/><path d="M0 900 Q160 850 320 900 T640 900 T960 900 T1280 900"/></g><g transform="translate(600 850)"><circle cx="0" cy="-250" r="115" fill="#d3a27d"/><path d="M-170-120 Q0-240 170-120 L210 260 L-210 260Z" fill="#152f35"/><path d="M-300 40 Q-140-40 0 15" stroke="#d3a27d" stroke-width="42" fill="none" stroke-linecap="round"/><path d="M300 40 Q140-40 0 15" stroke="#d3a27d" stroke-width="42" fill="none" stroke-linecap="round"/></g><g transform="translate(600 1010)"><path d="M-310 0 Q-130-120 80-45 Q210-5 320 0 Q180 60 70 50 Q-140 120-310 0Z" fill="#b7c8c6" stroke="#edf4ef" stroke-width="10"/><path d="M320 0 L430-95 L410 85Z" fill="#93aaa8"/><circle cx="160" cy="-20" r="13" fill="#0b1113"/></g><text x="60" y="1410" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#ffffff">AZUMAMARU / CATCH IMAGE</text></svg>',
    '02': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img" aria-label="クーラーボックスの釣果サンプル" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:100%"><defs><linearGradient id="bg02" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#18353c"/><stop offset="1" stop-color="#071013"/></linearGradient></defs><rect width="1200" height="1500" fill="url(#bg02)"/><rect x="120" y="260" width="960" height="880" rx="48" fill="#eef1e8" stroke="#b6c4bf" stroke-width="18"/><rect x="170" y="330" width="860" height="690" rx="28" fill="#cfe7e4"/><g transform="translate(610 520) rotate(-8)"><path d="M-320 0 Q-100-120 120-45 Q250-5 330 0 Q210 70 100 60 Q-120 135-320 0Z" fill="#9fb5b3" stroke="#f8fbf6" stroke-width="12"/><path d="M330 0 L440-100 L420 90Z" fill="#819b98"/><circle cx="170" cy="-18" r="14" fill="#0b1113"/></g><g transform="translate(570 710) rotate(7)"><path d="M-290 0 Q-90-105 110-40 Q220-5 300 0 Q190 60 90 50 Q-110 120-290 0Z" fill="#b8c3bd" stroke="#ffffff" stroke-width="12"/><path d="M300 0 L400-90 L385 80Z" fill="#98aaa3"/><circle cx="155" cy="-18" r="13" fill="#0b1113"/></g><g transform="translate(640 900) rotate(-4)"><path d="M-250 0 Q-70-85 100-35 Q190-5 260 0 Q165 50 80 44 Q-85 100-250 0Z" fill="#a7bbb8" stroke="#ffffff" stroke-width="11"/><path d="M260 0 L345-78 L332 72Z" fill="#8da39f"/><circle cx="135" cy="-15" r="12" fill="#0b1113"/></g><text x="60" y="1410" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#ffffff">AZUMAMARU / CATCH IMAGE</text></svg>'
  };

  document.querySelectorAll('.catch-card__visual img').forEach(function (img) {
    var key = img.getAttribute('src').indexOf('02') !== -1 ? '02' : '01';
    img.outerHTML = sampleSvgs[key];
  });

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
