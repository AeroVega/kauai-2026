import {s,chip,isBooked} from "./today.js";

export function more(data,build){
  const dark=document.documentElement.dataset.theme==="dark";

  // Open items first, booked last
  const res=(data.reservations||[]).slice().sort((a,b)=>Number(isBooked(a))-Number(isBooked(b)));
  const resRow=r=>{
    const meta=[r.day!=null?"Day "+r.day:"",r.time].filter(Boolean).map(s).join(" · ");
    return '<div class="link-row"><div><strong>'+s(r.name)+'</strong><br><span>'+meta+'</span></div>'
      +'<div class="row-actions">'+chip(r.status)+(r.url?'<a class="out" href="'+s(r.url)+'" target="_blank" rel="noopener">Open ↗</a>':"")+'</div></div>';
  };
  const linkRow=l=>'<div class="link-row"><div><strong>'+s(l.name)+'</strong><br><span>'+s(l.note)+'</span></div>'
    +(l.url?'<a class="out" href="'+s(l.url)+'" target="_blank" rel="noopener">Open ↗</a>':"")+'</div>';
  const family=Object.entries(data.family||{});

  return '<section class="hero compact"><p class="eyebrow">Trip tools</p><h1>More</h1></section>'
    +'<section class="cards-2"><div class="card info-card"><h3>Reservations</h3>'+res.map(resRow).join("")+'</div>'
    +'<div class="card info-card"><h3>Useful links</h3>'+(data.links||[]).map(linkRow).join("")+'</div></section>'
    +(family.length?'<section class="section"><div class="card info-card"><h3>Family lens</h3>'+family.map(([k,v])=>'<div class="family-item"><strong>'+s(k)+'</strong><p>'+s(v)+'</p></div>').join("")+'</div></section>':"")
    +'<section class="section"><div class="card info-card"><h3>Appearance</h3><div class="link-row"><div><strong>Dark mode</strong></div>'
    +'<button class="theme-toggle" id="themeToggle" aria-label="Dark mode" aria-pressed="'+dark+'"><span class="toggle-knob"></span></button></div></div></section>'
    +'<footer class="build-number">Build '+s(build)+'</footer>';
}
