import {externalIcon,s,chip,isBooked} from "./today.js";
import {flights,UNITED_URL,flightDateLabel} from "../flights.js";
import {connectionLabel,connectionDetail,isForcedOffline,isOfflineMode,setForcedOffline,subscribeConnection} from "../offline.js";

const externalLink=(url,label,aria)=>{
  if(isOfflineMode())return '<span class="out offline-link" title="Unavailable while offline" aria-label="'+s(aria)+' — unavailable while offline"><span class="offline-lock" aria-hidden="true">⌕</span><span>Unavailable</span></span>';
  return '<a class="out" href="'+s(url)+'" aria-label="'+s(aria)+'" target="_blank" rel="noopener">'+s(label)+' '+externalIcon+'</a>';
};

export function more(data,build){
  const dark=document.documentElement.dataset.theme==="dark";
  const res=(data.reservations||[]).slice().sort((a,b)=>Number(isBooked(a))-Number(isBooked(b)));
  const resRow=r=>{
    const meta=[r.day!=null?"Day "+r.day:"",r.time].filter(Boolean).map(s).join(" · ");
    return '<div class="link-row"><div><strong>'+s(r.name)+'</strong><br><span>'+meta+'</span>'+(r.action?'<p class="reservation-action">'+s(r.action)+'</p>':"")+'</div>'
      +'<div class="row-actions">'+chip(r.status)+(r.url?externalLink(r.url,"Open","Open booking site for "+r.name):"")+'</div></div>';
  };
  const linkRow=l=>'<div class="link-row"><div><strong>'+s(l.name)+'</strong><br><span>'+s(l.note)+'</span></div>'
    +(l.url?externalLink(l.url,"Open","Open "+l.name):"")+'</div>';
  const flightRow=f=>'<div class="flight-row"><div class="flight-route"><strong>'+s(f.from)+' to '+s(f.to)+'</strong><span>'+s(f.number)+'</span></div>'
    +'<div class="flight-times"><strong>'+s(f.depart)+'</strong><span>to</span><strong>'+s(f.arrive)+'</strong></div>'
    +'<div class="flight-meta"><span>'+s(flightDateLabel(f))+'</span>'+externalLink(f.statusUrl,"Flight status","Check status for "+f.number)+'</div></div>';
  const family=Object.entries(data.family||{});
  const status=isOfflineMode(), manual=isForcedOffline();

  return '<section class="hero compact"><h1>More</h1></section>'
    +'<section class="section"><div class="connection-banner '+(status?"offline":"online")+'" role="status"><div><strong>'+s(connectionLabel())+'</strong><p>'+s(connectionDetail())+'</p></div></div></section>'
    +'<section class="section"><div class="card info-card"><div class="section-heading-row"><h3>Flights</h3>'+externalLink(UNITED_URL,"United","Open United Airlines")+'</div>'
    +flights.map(flightRow).join("")+'</div></section>'
    +'<section class="cards-2"><div class="card info-card"><h3>Reservations</h3>'+res.map(resRow).join("")+'</div>'
    +'<div class="card info-card"><h3>Useful links</h3>'+(data.links||[]).map(linkRow).join("")+'</div></section>'
    +(family.length?'<section class="section"><div class="card info-card"><h3>Family lens</h3>'+family.map(([k,v])=>'<div class="family-item"><strong>'+s(k)+'</strong><p>'+s(v)+'</p></div>').join("")+'</div></section>':"")
    +'<section class="section"><div class="card info-card"><h3>Offline mode</h3><div class="link-row"><div><strong>Force offline mode</strong><br><span>Pause external links and live services even when connected.</span></div>'
    +'<button class="theme-toggle offline-toggle" id="offlineToggle" aria-label="Force offline mode" aria-pressed="'+manual+'"><span class="toggle-knob"></span></button></div>'
    +'<p class="reservation-action">Automatic offline detection remains on unless you force this mode. Your saved itinerary, day details, flight schedule, and location list remain available. The interactive map itself needs an internet connection.</p></div></section>'
    +'<section class="section"><div class="card info-card"><h3>Appearance</h3><div class="link-row"><div><strong>Dark mode</strong></div>'
    +'<button class="theme-toggle" id="themeToggle" aria-label="Dark mode" aria-pressed="'+dark+'"><span class="toggle-knob"></span></button></div></div></section>'
    +'<footer class="build-number">Build '+s(build)+'</footer>';
}

export function bindOfflineUI(render){
  const toggle=document.getElementById("offlineToggle");
  if(toggle)toggle.onclick=()=>setForcedOffline(!isForcedOffline());
  return subscribeConnection(()=>queueMicrotask(()=>render(false)));
}