export const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function tripDates(){return {start:new Date(2026,9,22),end:new Date(2026,9,31)}}
export function dateKey(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
export function previewTime(){
  if(typeof window==="undefined"||!["localhost","127.0.0.1","::1","[::1]"].includes(window.location.hostname))return null;
  const value=new URLSearchParams(window.location.search).get("previewAt");
  const match=value&&value.match(/^(\d{4})-(\d{2})-(\d{2})T([01]\d|2[0-3]):([0-5]\d)$/);
  if(!match)return null;
  const [,year,month,day,hour,minute]=match.map(Number);
  const date=new Date(year,month-1,day,hour,minute);
  if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day||date.getHours()!==hour||date.getMinutes()!==minute)return null;
  return date;
}
// These Dates carry Kauaʻi wall-clock fields, not an instant to serialize to UTC.
export function dashboardNow(instant=new Date()){
  const preview=previewTime();
  if(preview)return preview;
  const parts=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"Pacific/Honolulu",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(instant).map(p=>[p.type,p.value]));
  return new Date(Number(parts.year),Number(parts.month)-1,Number(parts.day),Number(parts.hour),Number(parts.minute));
}
export function previewTimeLabel(){const date=previewTime();return date?new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(date):null}
export function localDate(now=dashboardNow()){return new Date(now.getFullYear(),now.getMonth(),now.getDate())}
export function calendarDays(from,to){const ordinal=d=>Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());return (ordinal(to)-ordinal(from))/86400000}
// null is pre-trip, 1..N are trip days, and N+1 is the completed trip.
export function dayForToday(today,start,end,data){if(today<start)return null;if(today>=end)return data.days.length+1;const key=dateKey(today);const index=data.days.findIndex(d=>dateKey(new Date(d.dateLabel+" 2026"))===key);if(index<0)throw new Error("No itinerary day for "+key);return index+1}
export function progressForToday(today,start,end){const total=calendarDays(start,end),elapsed=Math.max(0,Math.min(total,calendarDays(start,today)));return Math.round((elapsed/total)*100)}
export function timeMinutes(label){const s=String(label||"").toLowerCase();if(/optional|anytime|tbd|\//.test(s))return null;const m=s.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);if(m){let h=Number(m[1])%12;if(m[3]==="pm")h+=12;return h*60+Number(m[2]||0)}if(/late afternoon/.test(s))return 960;if(/late morning/.test(s))return 660;if(/morning/.test(s))return 540;if(/midday|\bnoon\b/.test(s))return 720;if(/afternoon/.test(s))return 840;if(/evening/.test(s))return 1080;return null}
export function dayFlow(day,now){
  const empty={current:null,next:null,later:[]};
  // Unresolved alternatives and access-dependent days cannot establish a current activity.
  if([day?.status,day?.reservation?.status].some(s=>/^(DECISION|MOM CHOICE|VERIFY|CONDITIONAL|HOLD)$/i.test(s||"")))return empty;
  const activities=(day?.activities||[]).filter(x=>timeMinutes(x.time)!==null);
  if(!activities.length)return empty;
  const minutes=now.getHours()*60+now.getMinutes();
  let current=-1;
  activities.forEach((x,i)=>{if(timeMinutes(x.time)<=minutes)current=i});
  if(current<0)return {current:null,next:activities[0],later:activities.slice(1)};
  return {current:activities[current],next:activities[current+1]||null,later:activities.slice(current+2)};
}
