import {s} from "./today.js";

export function map(data){
  const rows=(data.locations||[]).map(l=>{
    const inner='<span class="day-main"><span class="day-title">'+s(l.name)+'</span><span class="day-sub">'+s(l.note)+'</span>'
      +(l.kind?'<span class="row-tags"><span class="row-tag">'+s(l.kind)+'</span></span>':"")
      +'</span><span class="chevron">↗</span>';
    return l.maps
      ?'<a class="day-row loc-row" href="'+s(l.maps)+'" target="_blank" rel="noopener">'+inner+'</a>'
      :'<div class="day-row loc-row">'+inner+'</div>';
  }).join("");
  return '<section class="hero compact"><p class="eyebrow">Locations</p><h1>Where the plan goes.</h1><p>Tap a place to open directions in Maps.</p></section>'
    +'<div class="day-list">'+rows+'</div>';
}
