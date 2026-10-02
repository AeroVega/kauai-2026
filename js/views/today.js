import {esc,tripDates,localDate,dashboardNow,previewTimeLabel,dayForToday,progressForToday,dayFlow,calendarDays} from "../utils.js";

// Shared helpers (imported by the other views so no new files are needed).
export const s=v=>esc(v==null?"":String(v));
export const externalIcon='<svg class="external-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4 10 14M10 4H4v16h16v-6"/></svg>';
export const isBooked=r=>Boolean(r)&&String(r.status).toUpperCase()==="BOOKED";
export const chip=t=>'<span class="status-chip '+(String(t).toUpperCase()==="BOOKED"?"ok":"todo")+'">'+s(t)+'</span>';

// Edit the trip dates in one place.
const RANGE_SHORT="Oct 22–30, 2026";
const RANGE_LONG="October 22–30, 2026";

export function dayRow(d){
  const tags=[];
  if(d.reservation&&d.reservation.status)tags.push('<span class="row-tag '+(isBooked(d.reservation)?"ok":"todo")+'">'+s(d.reservation.status)+'</span>');
  if(d.flex)tags.push('<span class="row-tag">Flex</span>');
  const sub=[d.dateLabel,d.theme].filter(Boolean).map(s).join(" · ");
  return '<button class="day-row" data-day="'+s(d.id)+'">'
    +'<span class="num">DAY '+String(d.id).padStart(2,"0")+'</span>'
    +'<span class="day-main"><span class="day-title">'+s(d.title)+'</span>'
    +'<span class="day-sub">'+sub+'</span>'
    +(tags.length?'<span class="row-tags">'+tags.join("")+'</span>':"")
    +'</span><span class="chevron">›</span></button>';
}

const openRow=r=>'<div class="link-row"><div><strong>'+s(r.name)+'</strong><br><span>'+s(r.action)+'</span></div>'+chip(r.status)+'</div>';

function flowItem(label,x,cls){
  const meta=[x.time,x.detail].filter(Boolean).join(" · ");
  return '<div class="flow-item'+(cls||"")+'"><span class="flow-label">'+label+'</span><strong>'+s(x.title)+'</strong>'+(meta?'<span class="subtle">'+s(meta)+'</span>':"")+'</div>';
}

export function today(data){
  const currentTime=dashboardNow(),previewLabel=previewTimeLabel(),{start,end}=tripDates(),now=localDate(currentTime);
  const idx=dayForToday(now,start,end,data),pct=progressForToday(now,start,end);
  const total=data.days.length;
  const pre=idx===null,done=!pre&&idx>total;
  const daysTo=pre?calendarDays(now,start):0;
  const toGo=daysTo===1?"1 day":daysTo+" days";
  const cur=(!pre&&!done)?data.days[idx-1]:null;

  // Main card
  let card;
  if(pre){
    const d=data.days[0],first=d.activities?.[0];
    card='<section class="card now-card"><p class="eyebrow">Trip starts in</p><div class="now-row"><div><h2>'+toGo+'</h2><p class="subtle">'+s(d.dateLabel)+' · Day 1</p></div><span class="day-chip">UPCOMING</span></div>'
      +'<div class="next-line"><strong>'+s(first?.title||d.title)+'</strong><span class="subtle">'+s([first?.time,d.theme].filter(Boolean).join(" · "))+'</span></div>'
      +'<div class="action-row"><button class="action" data-day="'+s(d.id)+'">Preview Day 1</button></div></section>';
  }else if(done){
    card='<section class="card now-card"><p class="eyebrow">Trip complete</p><div class="now-row"><div><h2>Kauaʻi 2026</h2><p class="subtle">'+RANGE_LONG+'</p></div><span class="day-chip">COMPLETE</span></div>'
      +'<div class="next-line"><strong>Aloha ʻOe</strong><span class="subtle">The itinerary is complete. The memories are yours.</span></div></section>';
  }else{
    const f=dayFlow(cur,currentTime)||{};
    const flow=(f.current?flowItem("Around now",f.current," current"):"")
      +(f.next?flowItem(f.current?"Next":"Up next",f.next,""):"")
      +(f.later&&f.later.length?'<div class="flow-item"><span class="flow-label">Later</span><strong>'+f.later.map(x=>s(x.title)).join(" · ")+'</strong></div>':"");
    card='<section class="card now-card"><p class="eyebrow">Today · Day '+s(cur.id)+'</p><div class="now-row"><div><h2>'+s(cur.title)+'</h2><p class="subtle">'+s(cur.theme)+'</p></div><span class="day-chip">'+s(cur.status)+'</span></div>'
      +(flow?'<div class="flow-grid">'+flow+'</div>':"")
      +'<div class="action-row"><button class="action" data-day="'+s(cur.id)+'">Open today</button></div></section>';
  }

  // Side card: trip summary + open decisions
  const open=(data.reservations||[]).filter(r=>!isBooked(r));
  const side='<section class="card trip-progress"><div class="progress-top"><div><p class="eyebrow">Trip</p><strong>'+total+' days · '+(total-1)+' nights</strong></div>'
    +'<span class="small">'+(pre?"":done?"Complete":"Day "+idx+" of "+total)+'</span></div>'
    +(pre?"":'<div class="progress"><span style="width:'+pct+'%"></span></div>')
    +'<p class="subtle side-base">'+s(data.trip&&data.trip.base)+'</p>'
    +(open.length?'<div class="side-open"><p class="eyebrow">Still open</p>'+open.slice(0,3).map(openRow).join("")
      +'<button class="text-link" data-view="more">View reservations</button>'+'</div>':"")
    +'</section>';

  // Today's paths (the "different paths, same place" idea)
  let paths="";
  if(cur){
    const fam=Object.entries(cur.family||{});
    if(fam.length>1){
      paths='<div class="path-card"><div class="path-intro"><p class="eyebrow">Different paths. Same place.</p><h2>Today’s paths</h2></div><div class="path-list">'
        +fam.map(([k,v])=>'<div class="path-item"><strong>'+s(k)+'</strong><p>'+s(v)+'</p></div>').join("")+'</div>'
        +(cur.reunion?'<div class="reunion"><span>Reunite</span><strong>'+s(cur.reunion)+'</strong></div>':"")+'</div>';
    }
  }

  // Next days (full list lives in Plan)
  const list=pre?data.days.slice(0,2):(done?[]:data.days.slice(idx,idx+2));
  let upcoming="";
  if(list.length){
    upcoming='<section class="section"><h2 class="section-title">'+(pre?"Coming up":"Up next")+'</h2><div class="day-list">'+list.map(dayRow).join("")+'</div>'
      +'<button class="text-link" data-view="plan">See all '+total+' days</button></section>';
  }else{
    upcoming='<section class="section"><button class="action secondary" data-view="plan">View the whole trip</button></section>';
  }

  const watch=(data.watch&&data.watch.length)
    ?'<section class="section"><div class="card info-card"><h3>Watch</h3>'+data.watch.map(w=>'<div class="link-row"><div><strong>'+s(w.title)+'</strong><br><span>'+s(w.note)+'</span></div><span class="status-chip">'+s(w.level)+'</span></div>').join("")+'</div></section>'
    :"";

  return '<section class="hero"><p class="eyebrow">'+s(previewLabel?"Preview · "+previewLabel:RANGE_SHORT+" · Kauaʻi time")+'</p><h1>Today</h1></section>'
    +'<div class="dashboard-grid">'+card+side+'</div>'+paths+upcoming+watch;
}
