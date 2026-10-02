const CACHE="kauai-dashboard-__BUILD_SHA__";
const CORE=["./","./index.html","./styles.css","./js/app.js","./js/data.js","./js/utils.js","./js/views/today.js","./js/views/plan.js","./js/views/day-detail.js","./js/views/map.js","./js/views/more.js","./manifest.json","./kauai-icon-1024.png","./itinerary.json"];
const NETWORK_FIRST=["/index.html","/js/app.js","/js/data.js","/js/utils.js","/js/views/today.js","/js/views/plan.js","/js/views/day-detail.js","/js/views/map.js","/js/views/more.js","/itinerary.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("kauai-dashboard-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;
  const path=new URL(e.request.url).pathname;
  const networkFirst=e.request.mode==="navigate"||NETWORK_FIRST.some(s=>path.endsWith(s));
  const fallback=async()=>{
    const cache=await caches.open(CACHE);
    return await cache.match(e.request)||(e.request.mode==="navigate"?await cache.match("./index.html"):null);
  };
  const fromNetwork=async()=>{
    try{
      const response=await fetch(e.request);
      if(response.ok){
        const copy=response.clone();
        e.waitUntil(caches.open(CACHE).then(cache=>cache.put(e.request,copy)).catch(()=>{}));
        return response;
      }
      return await fallback()||response;
    }catch{return await fallback()||Response.error()}
  };
  e.respondWith(networkFirst?fromNetwork():fallback().then(cached=>cached||fromNetwork()));
});
