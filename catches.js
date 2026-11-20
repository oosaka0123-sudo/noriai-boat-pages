(() => {
  'use strict';
  const latest = document.getElementById('latest-catches');
  const archive = document.getElementById('catch-archive');
  const status = document.getElementById('catch-status');
  const chips = [...document.querySelectorAll('.filter-chip')];
  if (!latest || !archive) return;
  let allPosts = [];
  let activeFilter = 'all';
  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' :
      new Intl.DateTimeFormat('ja-JP', {year:'numeric',month:'long',day:'numeric'}).format(date);
  };
  const item = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content !== undefined) node.textContent = String(content);
    return node;
  };
  const photoUrl = (raw) => {
    try {
      const url = new URL(String(raw), document.baseURI);
      if (url.origin !== window.location.origin) return null;
      if (!/^\/media\/catches\/[a-z0-9_-]+\.(?:jpe?g|png|webp)$/i.test(url.pathname)) return null;
      return url.href;
    } catch (_) { return null; }
  };
  const card = (post) => {
    const article = item('article','az-report-card');
    const wrap = item('div','az-report-card__photo');
    const photo = Array.isArray(post.photos) ? post.photos[0] : null;
    const url = photo && photoUrl(photo.url);
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.loading = 'lazy';
      img.alt = String(post.title || '東丸の釣果写真').slice(0,80);
      wrap.append(img);
    } else {
      wrap.style.display='grid';
      wrap.style.placeItems='center';
      wrap.style.color='#d8f3f2';
      wrap.textContent='AZUMAMARU';
    }
    article.append(wrap);
    const body=item('div','az-report-card__text');
    const time=item('time','',formatDate(post.published_at));
    time.dateTime=String(post.published_at || '');
    body.append(time);
    body.append(item('h3','',String(post.title || '釣果情報').slice(0,100)));
    if(post.body) body.append(item('p','',String(post.body).slice(0,500)));
    if (Array.isArray(post.tags) && post.tags.length){
      const tags=item('div','az-report-tags');
      post.tags.slice(0,8).forEach(v=>tags.append(item('span','',String(v).slice(0,30))));
      body.append(tags);
    }
    article.append(body);
    return article;
  };
  const empty = (container,title,message) => {
    const box=item('div','az-empty');
    box.append(item('strong','',title),item('p','',message));
    container.replaceChildren(box);
  };
  const render = () => {
    latest.replaceChildren();
    archive.replaceChildren();
    if (!allPosts.length) {
      empty(latest,'公開済みの釣果はまだありません。','正式な釣果が登録されると、ここに新しい順で表示されます。');
      empty(archive,'アーカイブ準備中','デモ用イメージは実釣果に含めていません。');
      if (status) status.textContent = '釣果データは準備中です。';
      return;
    }
    allPosts.slice(0,3).forEach(p=>latest.append(card(p)));
    const filtered=activeFilter==='all'?allPosts:allPosts.filter(p=>Array.isArray(p.tags)&&p.tags.includes(activeFilter));
    if (!filtered.length) empty(archive,'該当する釣果はありません。','別の魚種を選んでください。');
    else filtered.forEach(p=>archive.append(card(p)));
    if (status) status.textContent = allPosts.length+'件の釣果を掲載中です。';
  };
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    activeFilter=chip.dataset.filter||'all';
    chips.forEach(c=>{
      const current=c===chip;
      c.classList.toggle('is-active',current);
      c.setAttribute('aria-pressed',String(current));
    });
    render();
  }));
  fetch('api/catches.php?limit=24',{headers:{Accept:'application/json'},cache:'no-store'})
    .then(response=>{if (!response.ok) throw new Error('not configured');return response.json()})
    .then(data=>{
      allPosts=Array.isArray(data.posts)?data.posts.filter(p=>p && typeof p==='object'): [];
      render();
    }).catch(()=>render());
})();
