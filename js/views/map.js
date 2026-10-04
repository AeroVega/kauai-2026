import {externalIcon,s} from "./today.js";
import {isOfflineMode} from "../offline.js";

export function map(data){
  const locations=(data.locations||[]).filter(l=>Number.isFinite(Number(l.lat))&&Number.isFinite(Number(l.lon)));
  const markers=locations.map((l,i)=>({
    ...l,
    lat:Number(l.lat),
    lon:Number(l.lon),
    number:i+1
  }));

  const rows=markers.map(l=>{
    const inner='<span class="map-row-number">'+l.number+'</span><span class="day-main"><span class="day-title">'+s(l.name)+'</span><span class="day-sub">'+s(l.note)+'</span>'
      +(l.kind?'<span class="row-tags"><span class="row-tag">'+s(l.kind)+'</span></span>':"")
      +'</span>'+(l.maps&&!isOfflineMode()?externalIcon:'');
    return l.maps&&!isOfflineMode()
      ?'<a class="day-row loc-row" aria-label="'+s('Directions to '+l.name)+'" href="'+s(l.maps)+'" target="_blank" rel="noopener">'+inner+'</a>'
      :'<div class="day-row loc-row">'+inner+(l.maps&&isOfflineMode()?'<span class="offline-lock">Offline</span>':"")+'</div>';
  }).join("");

  const markerData=JSON.stringify(markers).replace(/</g,"\\u003c");

  return '<section class="hero compact"><p class="eyebrow">Kauaʻi at a glance</p><h1>Map</h1><p class="map-intro">A simple island overview of the places that matter to this trip. Tap a pin for the location, then use the directions link when you want turn-by-turn navigation.</p></section>'
    +'<section class="map-card card"><div id="tripMap" class="trip-map" aria-label="Interactive map of key Kauaʻi trip locations"></div><div class="map-attribution">Map data © OpenStreetMap contributors</div></section>'
    +'<section class="section"><div class="card info-card"><h2 class="map-section-title">Key locations</h2><div class="map-location-list">'+rows+'</div></div></section>'
    +'<script type="application/json" id="mapLocations">'+markerData+'</script>';
}

let leafletPromise=null;

function loadLeaflet(){
  if(window.L)return Promise.resolve(window.L);
  if(leafletPromise)return leafletPromise;
  const cssHref="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  if(!document.querySelector('link[data-leaflet-css]')){
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href=cssHref;
    link.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin="";
    link.dataset.leafletCss="";
    document.head.appendChild(link);
  }
  leafletPromise=new Promise((resolve,reject)=>{
    const script=document.createElement("script");
    script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin="";
    script.onload=()=>window.L?resolve(window.L):reject(new Error("Leaflet loaded without exposing its API"));
    script.onerror=()=>reject(new Error("Leaflet could not be loaded"));
    document.head.appendChild(script);
  }).catch(error=>{leafletPromise=null;throw error});
  return leafletPromise;
}

export async function initMap(){
  let el=document.getElementById("tripMap");
  const dataEl=document.getElementById("mapLocations");
  if(!el||!dataEl)return;
  if(isOfflineMode()){el.innerHTML='<div class="map-unavailable"><strong>Interactive map unavailable offline</strong><span>The saved location list below is still available.</span></div>';return;}
  try{
    await loadLeaflet();
  }catch(error){
    el=document.getElementById("tripMap");
    if(el)el.innerHTML='<div class="map-unavailable"><strong>Interactive map unavailable</strong><span>The location list below is still available. Connect to the internet to load the map.</span></div>';
    console.warn("Map library unavailable",error);
    return;
  }
  el=document.getElementById("tripMap");
  const currentDataEl=document.getElementById("mapLocations");
  if(!el||!currentDataEl||isOfflineMode())return;
  if(!window.L)return;
  }
  // Give Leaflet a real box before initialization. This avoids iOS PWA viewport
  // quirks causing the map container to collapse to zero height.
  const mapHeight=Math.max(330,Math.min(620,Math.round((window.visualViewport?.height||window.innerHeight||700)*0.54)));
  el.style.height=mapHeight+"px";
  el.style.minHeight="330px";
  if(el.dataset.ready==="true")return;
  el.dataset.ready="true";

  let locations=[];
  try{locations=JSON.parse(dataEl.textContent||"[]")}catch(error){console.warn("Map data could not be parsed",error);return}

  const map=window.L.map(el,{scrollWheelZoom:false,zoomControl:true,attributionControl:false});
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
  }).addTo(map);

  const bounds=[];
  locations.forEach((location,index)=>{
    const color=location.name==="Waipouli Beach Resort"?"home":location.name==="Lava Lava Beach Club"?"food":location.status==="BOOKED"?"booked":"place";
    const icon=window.L.divIcon({
      className:"trip-map-pin-wrap",
      html:'<span class="trip-map-pin '+color+'">'+(index+1)+'</span>',
      iconSize:[32,32],
      iconAnchor:[16,16],
      popupAnchor:[0,-17]
    });
    const marker=window.L.marker([location.lat,location.lon],{icon}).addTo(map);
    const directions=location.maps?'<a class="map-popup-link" href="'+s(location.maps)+'" target="_blank" rel="noopener">Directions '+externalIcon+'</a>':"";
    marker.bindPopup('<strong>'+s(location.name)+'</strong><br><span>'+s(location.note)+'</span>'+directions);
    bounds.push([location.lat,location.lon]);
  });

  if(bounds.length)map.fitBounds(bounds,{padding:[28,28],maxZoom:10});
  requestAnimationFrame(()=>map.invalidateSize());
  window.setTimeout(()=>map.invalidateSize(),150);
}
