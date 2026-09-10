(() => {
  const enhancement = document.createElement('link');
  enhancement.rel = 'stylesheet';
  enhancement.href = 'site-enhancements.css';
  document.head.appendChild(enhancement);

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.global-nav');

  if (menuButton && !menuButton.querySelector('.menu-lines')) {
    menuButton.innerHTML = '<span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span><span class="menu-label">MENU</span>';
    menuButton.setAttribute('aria-label', 'メニューを開く');
  }

  if (nav && !nav.querySelector('a[href="catches.html"]')) {
    const catchLink = document.createElement('a');
    catchLink.href = 'catches.html';
    catchLink.textContent = '釣果情報';
    const cta = nav.querySelector('.nav-cta');
    if (cta) nav.insertBefore(catchLink, cta);
    else nav.appendChild(catchLink);
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      header?.classList.toggle('is-menu-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        header?.classList.remove('is-menu-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      header?.classList.remove('is-menu-open');
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const isHome = !!document.querySelector('.hero') && !document.body.classList.contains('reservation-page') && !document.body.classList.contains('catches-page');
  if (!isHome) return;

  const anchor = document.querySelector('#boat') || document.querySelector('#access') || document.querySelector('#reserve');
  if (!anchor) return;

  const section = document.createElement('section');
  section.className = 'latest-catch-home section-shell';
  section.id = 'latest-catch';
  section.innerHTML = `
    <div class="home-catch-head">
      <div><span>LATEST CATCH</span><h2>最新の釣果</h2></div>
      <a href="catches.html">釣果をすべて見る →</a>
    </div>
    <div class="home-catch-card" id="home-catch-card">
      <div class="home-catch-media"></div>
      <div class="home-catch-copy"><small>AZUMAMARU</small><h3>釣果情報を確認中</h3><p>最新の釣果が公開されると、ここへ自動表示されます。</p><div class="home-catch-actions"><a href="catches.html">釣果ページへ</a><a href="reservation.html">予約を見る</a></div></div>
    </div>`;
  anchor.parentNode.insertBefore(section, anchor);

  fetch('api/catches.php?limit=1', { headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const post = Array.isArray(data.posts) ? data.posts[0] : null;
      if (!post) return;
      const card = document.querySelector('#home-catch-card');
      if (!card) return;
      const photo = Array.isArray(post.photos) && post.photos[0] ? post.photos[0].url : '';
      const tags = Array.isArray(post.tags) ? post.tags : [];
      const date = post.published_at ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.published_at)) : '';
      card.innerHTML = `
        <div class="home-catch-media">${photo ? `<img loading="lazy" src="${escapeHtml(photo)}" alt="${escapeHtml(post.title || '東丸の釣果')}">` : ''}</div>
        <div class="home-catch-copy">
          <small>${escapeHtml(date)}</small>
          <h3>${escapeHtml(post.title || '本日の釣果')}</h3>
          <p>${escapeHtml(post.body || '')}</p>
          ${tags.length ? `<div class="home-catch-tags">${tags.map(tag => `<span class="home-catch-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
          <div class="home-catch-actions"><a href="catches.html">詳しい釣果を見る</a><a href="reservation.html">予約・空席を見る</a></div>
        </div>`;
    })
    .catch(() => {});
})();
