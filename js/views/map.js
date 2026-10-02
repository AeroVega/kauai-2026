import {externalIcon,s} from "./today.js";

export function map(data){
  const rows=(data.locations||[]).map(l=>{
    const inner='<span class="day-main"><span class="day-title">'+s(l.name)+'</span><span class="day-sub">'+s(l.note)+'</span>'
      +(l.kind?'<span class="row-tags"><span class="row-tag">'+s(l.kind)+'</span></span>':"")
      +'</span>'+(l.maps?externalIcon:'');
    return l.maps
      ?'<a class="day-row loc-row" aria-label="'+s('Directions to '+l.name)+'" href="'+s(l.maps)+'" target="_blank" rel="noopener">'+inner+'</a>'
      :'<div class="day-row loc-row">'+inner+'</div>';
  }).join("");
  return '<section class="hero compact"><h1>Map</h1></section>'
    +'<div class="day-list">'+rows+'</div>';
}
