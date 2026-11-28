const V='pg-shell-202611281944',EXT='pg-ext-1';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-mask-512.png'];
const LIBS=['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
const EXTH=['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(SHELL);
  const x=await caches.open(EXT);await Promise.all(LIBS.map(async u=>{try{if(!(await x.match(u))){const r=await fetch(u,{mode:'cors'});if(r.ok)await x.put(u,r)}}catch(e){}}));
  self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('pg-shell-')&&k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){if(/\.(bin)$|ver\.json$/.test(u.pathname))return;
    if(r.mode==='navigate'||SHELL.some(s=>u.pathname.endsWith(s.replace('./',''))&&s!=='./')){e.respondWith((async()=>{const c=await caches.open(V);
      try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),4000);const n=await fetch(r,{signal:ctl.signal});clearTimeout(t);if(n.ok)c.put(r.mode==='navigate'?'index.html':r,n.clone());return n}
      catch(x){return (await c.match(r.mode==='navigate'?'index.html':r))||(await c.match('index.html'))||Response.error()}})())}
    return}
  if(EXTH.includes(u.hostname)){e.respondWith((async()=>{const c=await caches.open(EXT),m=await c.match(r);
    const net=fetch(r).then(n=>{if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(()=>null);
    return m||(await net)||Response.error()})())}});
