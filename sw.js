// Chapa Quente - funciona sem internet depois da 1ª vez (o online precisa de internet)
const V='cq-1793926428';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/ws'))return;
 const page=u.pathname.endsWith('/')||u.pathname.endsWith('.html');
 e.respondWith(caches.open(V).then(async c=>{
  if(page){try{const r=await fetch(e.request);c.put(e.request,r.clone());return r}catch(x){return (await c.match(e.request))||Response.error()}}
  const hit=await c.match(e.request);if(hit)return hit;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}))});
