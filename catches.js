(() => {
  const latestContainer = document.querySelector('#latest-catches');
  const archiveContainer = document.querySelector('#catch-archive');
  const updateLabel = document.querySelector('#latest-update-label');
  const chips = [...document.querySelectorAll('.filter-chip')];

  if (!latestContainer || !archiveContainer) return;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const formatDate = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  };

  const renderTags = (tags = []) => tags.map(tag => `<span class="catch-tag">${escapeHtml(tag)}</span>`).join('');

  const renderPhoto = (post) => {
    const photo = Array.isArray(post.photos) && post.photos[0] ? post.photos[0] : null;
    if (!photo) return '<div class="catch-photo-placeholder"><span>AZUMAMARU</span></div>';
    return `<div class="catch-photo"><img loading="lazy" src="${escapeHtml(photo.url)}" alt="${escapeHtml(post.title || '東丸の釣果写真')}"></div>`;
  };

  const renderCard = (post) => {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    return `<article class="catch-card" data-tags="${escapeHtml(tags.join(','))}">
      ${renderPhoto(post)}
      <div class="catch-card-body">
        <small>${escapeHtml(formatDate(post.published_at))}</small>
        <h3>${escapeHtml(post.title || '本日の釣果')}</h3>
        <p>${escapeHtml(post.body || '')}</p>
        ${tags.length ? `<div class="catch-tags">${renderTags(tags)}</div>` : ''}
      </div>
    </article>`;
  };

  const renderEmpty = () => {
    latestContainer.innerHTML = `<article class="catch-card">
      <div class="catch-photo-placeholder"><span>COMING SOON</span></div>
      <div class="catch-card-body"><small>釣果情報</small><h3>最新釣果は準備中です。</h3><p>LINE更新システムが有効になると、公開した釣果がここへ自動表示されます。</p></div>
    </article>`;
    archiveContainer.innerHTML = `<div class="empty-state"><span>ARCHIVE</span><strong>まだ公開済みの釣果はありません。</strong><p>最初の釣果が公開されると自動で蓄積されます。</p></div>`;
    if (updateLabel) updateLabel.textContent = '釣果情報は準備中';
  };

  fetch('api/catches.php?limit=24', { headers: { 'Accept': 'application/json' } })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const posts = Array.isArray(data.posts) ? data.posts : [];
      if (!posts.length) return renderEmpty();

      latestContainer.innerHTML = posts.slice(0, 3).map(renderCard).join('');
      archiveContainer.innerHTML = posts.map(renderCard).join('');
      if (updateLabel) updateLabel.textContent = `${formatDate(posts[0].published_at)} 更新`;
    })
    .catch(() => renderEmpty());

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(item => item.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter || 'all';
      archiveContainer.querySelectorAll('.catch-card').forEach(card => {
        const tags = card.dataset.tags || '';
        card.classList.toggle('is-hidden', filter !== 'all' && !tags.includes(filter));
      });
    });
  });
})();