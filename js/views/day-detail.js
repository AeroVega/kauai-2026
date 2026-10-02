import {externalIcon,s,chip} from "./today.js";

// Fallback only. Once any activity on a day has "anchor": true/false in the
// JSON, that day uses the flags and this guess is ignored.
const GUESS=/reunite|geocach|napali|waimea|resort|beach|waterfall|zipline/i;

export function openDay(data,id,onBack,backLabel){
  const i=data.days.findIndex(x=>x.id===Number(id));
  if(i<0)return;
  const d=data.days[i];
  const acts=d.activities||[];
  const flagged=acts.some(x=>typeof x.anchor==="boolean");
  const important=x=>flagged?x.anchor===true:(Boolean(x.url)||GUESS.test(x.title||""));

  const activities=acts.map(x=>{
    const a=important(x);
    return '<div class="activity-item'+(a?' activity-anchor':'')+'"><div class="activity-meta"><time>'+s(x.time)+'</time></div>'
      +'<div><h3>'+s(x.title)+'</h3><p>'+s(x.detail)+'</p>'
      +(x.url?'<div class="action-row"><a class="action secondary" href="'+s(x.url)+'" aria-label="'+s('Open '+x.title)+'" target="_blank" rel="noopener">Open link '+externalIcon+'</a></div>':"")
      +'</div></div>';
  }).join("");

  // Family paths, plus reunion (optional d.reunion string) and flex plan (d.flex)
  const family=Object.entries(d.family||{});
  const extras=(d.reunion?'<div class="reunion"><span>Reunite</span><strong>'+s(d.reunion)+'</strong></div>':"")
    +(d.flex?'<div class="reunion"><span>Flex plan</span><strong>If the day shifts</strong><p>'+s(d.flex)+'</p></div>':"");
  let paths="";
  if(family.length>1){
    paths='<div class="path-card"><div class="path-intro"><p class="eyebrow">Different paths. Same place.</p><h2>Family paths</h2></div>'
      +'<div class="path-list">'+family.map(([k,v])=>'<div class="path-item"><strong>'+s(k)+'</strong><p>'+s(v)+'</p></div>').join("")+'</div>'+extras+'</div>';
  }else if(extras){
    paths='<div class="path-card">'+extras+'</div>';
  }

  const r=d.reservation;
  const booking=r?'<div class="card detail-section"><h2>Booking</h2><div class="link-row"><div><strong>'+s(r.name)+'</strong><br><span>'+s(r.detail)+'</span></div>'
    +'<div class="row-actions">'+(r.status?chip(r.status):"")+(r.url?'<a class="out" href="'+s(r.url)+'" aria-label="'+s('Open booking site for '+r.name)+'" target="_blank" rel="noopener">Open '+externalIcon+'</a>':"")+'</div></div></div>':"";

  const prev=data.days[i-1],next=data.days[i+1];
  const nav=(prev||next)?'<div class="day-nav">'
    +(prev?'<button class="action secondary" data-nav-day="'+s(prev.id)+'">← Day '+s(prev.id)+'</button>':"<span></span>")
    +(next?'<button class="action secondary" data-nav-day="'+s(next.id)+'">Day '+s(next.id)+' →</button>':"<span></span>")
    +'</div>':"";

  const app=document.getElementById("app");
  app.innerHTML='<section class="detail"><button class="back" id="back">← '+s(backLabel||"Plan")+'</button>'
    +'<div class="detail-head"><div><p class="eyebrow">Day '+s(d.id)+' · '+s(d.dateLabel)+'</p><h1>'+s(d.title)+'</h1><p class="detail-lede">'+s(d.description)+'</p></div><span class="day-chip">'+s(d.status)+'</span></div>'
    +'<div class="card detail-section"><div class="activity-list">'+activities+'</div></div>'+paths+booking+nav+'</section>';

  document.getElementById("back").onclick=()=>{if(onBack)onBack()};
  app.querySelectorAll("[data-nav-day]").forEach(b=>b.onclick=()=>openDay(data,b.dataset.navDay,onBack,backLabel));
  window.scrollTo(0,0);
  document.querySelector(".layout")?.scrollTo(0,0);
  const heading=app.querySelector("h1");
  heading.tabIndex=-1;
  heading.focus({preventScroll:true});
}
