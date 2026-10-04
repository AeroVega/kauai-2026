const STORAGE_KEY="kauai-offline-mode";

let forced=localStorage.getItem(STORAGE_KEY)==="on";
const listeners=new Set();

export function isOfflineMode(){
  return forced||navigator.onLine===false;
}
export function isForcedOffline(){
  return forced;
}
export function setForcedOffline(value){
  forced=Boolean(value);
  localStorage.setItem(STORAGE_KEY,forced?"on":"off");
  notify();
}
export function connectionLabel(){
  if(forced)return "Offline mode";
  return navigator.onLine===false?"Offline":"Online";
}
export function connectionDetail(){
  if(forced)return "External links and live services are paused. Your saved itinerary still works.";
  return navigator.onLine===false
    ?"Using the saved itinerary. Live services are unavailable until a connection returns."
    :"Live services available when you open them.";
}
export function subscribeConnection(listener){
  listeners.add(listener);
  return ()=>listeners.delete(listener);
}
function notify(){
  listeners.forEach(listener=>listener());
}
window.addEventListener("online",notify);
window.addEventListener("offline",notify);