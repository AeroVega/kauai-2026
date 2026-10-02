const CACHE="kauai-dashboard-__BUILD_SHA__";
const CORE=["./","./index.html","./styles.css","./js/app.js","./js/data.js","./js/utils.js","./js/views/today.js","./js/views/plan.js","./js/views/day-detail.js","./js/views/map.js","./js/views/more.js","./manifest.json","./kauai-icon-1024.png","./itinerary.json"];
const NETWORK_FIRST=["/index.html","/js/app.js","/js/data.js","/js/utils.js","/js/views/today.js","/js/views/plan.js","/js/views/day-detail.js","/js/views/map.js","/js/views/more.js","/itinerary.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const path=new URL(e.request.url).pathname;
  const isNetworkFirst=e.request.mode==="navigate"||NETWORK_FIRST.some(s=>path.endsWith(s));
  if(isNetworkFirst){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match("./index.html"))));return}
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy));return r}).catch(()=>caches.match("./index.html"))))
});
