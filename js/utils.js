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
export function dashboardNow(){return previewTime()||new Date()}
export function previewTimeLabel(){const date=previewTime();return date?new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(date):null}
export function localDate(now=dashboardNow()){return new Date(now.getFullYear(),now.getMonth(),now.getDate())}
export function dayForToday(today,start,end,data){if(today<start)return null;if(today>=end)return data.days.length;const key=dateKey(today);return data.days.findIndex(d=>dateKey(new Date(d.dateLabel+" 2026"))===key)+1}
export function progressForToday(today,start,end){const total=end-start;const elapsed=Math.max(0,Math.min(total,today-start));return Math.round((elapsed/total)*100)}
export function timeMinutes(label){const s=String(label||"").toLowerCase(),m=s.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);if(m){let h=Number(m[1])%12;if(m[3]==="pm")h+=12;return h*60+Number(m[2]||0)}if(/late afternoon/.test(s))return 960;if(/morning/.test(s))return 540;if(/midday|\bnoon\b/.test(s))return 720;if(/afternoon/.test(s))return 840;if(/evening/.test(s))return 1080;return null}
export function dayFlow(day,now){const activities=day?.activities||[];if(!activities.length)return {current:null,next:null,later:[]};const minutes=now.getHours()*60+now.getMinutes();let current=-1;activities.forEach((x,i)=>{const t=timeMinutes(x.time);if(t!==null&&t<=minutes)current=i});if(current<0){const first=activities.findIndex(x=>timeMinutes(x.time)!==null);const next=first>=0?first:0;return {current:null,next:activities[next],later:activities.slice(next+1)}}return {current:activities[current],next:activities[current+1]||null,later:activities.slice(current+2)}}
