const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=['index.html','catches.html','reservation.html','plans.html','guide.html','access.html'];
const assets=['media/hero-boat.mp4','media/deck-sea.mp4','media/sunset-return.mp4','media/catch-sample-01.webp','media/catch-sample-02.webp'];
for(const a of assets)assert.ok(fs.existsSync(path.join(root,a)),'Missing media: '+a);
let refs=0;
for(const page of pages){
 const html=read(page);
 assert.match(html, /<meta name="robots" content="noindex,\s*nofollow">/i,'Demo noindex: '+page);
 assert.match(html, /<title>[^<]*東丸/,'Azumamaru title: '+page);
 assert.doesNotMatch(html,/和歌山雑賀クラブ|WAKAYAMA SAIKA CLUB/i,'Club contamination: '+page);
 assert.match(html,/AZUMAMARU/i,'Boat branding: '+page);
 assert.match(html,/href="reservation.html"/,'Booking path: '+page);
 for(const m of html.matchAll(/\b(?:href|src)=["']([^"'#]+)["']/g)){
  const url=m[1]; if(/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(url))continue;
  const target=url.split(/[?#]/)[0];if(!target)continue;
  assert.ok(!target.startsWith('/'),'No hardcoded path: '+page+' -> '+target);
  const resolved=path.normalize(path.join(path.dirname(page),target));
  assert.ok(fs.existsSync(path.join(root,resolved)),'Broken ref: '+page+' -> '+target);
  refs++;
 }
}
for(const p of ['index.html','catches.html','plans.html','guide.html','access.html']){
 const html=read(p);
 for(const dest of ['catches.html','plans.html','guide.html','access.html'])assert.ok(html.includes('href="'+dest+'"'),'Missing link '+p+' -> '+dest);
}
assert.match(read('reservation.html'),/予約受付・空席確保・送信・決済は行われません/);
assert.match(read('catches.html'),/実釣果ではありません/);
assert.match(read('.htaccess'),/X-Robots-Tag "noindex, nofollow"/);
assert.match(read('api/data/.htaccess'),/Require all denied/);
assert.match(read('api/catches.php'),/media\/catches/);
assert.ok(!fs.existsSync(path.join(root,'api/data/catches.json')),'Unverified fishing results must not ship');
console.log('PASS Azumamaru: 6 pages, '+refs+' internal references, no club branding and no fabricated catch posts');
