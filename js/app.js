import {loadItinerary} from "./data.js";
import {today} from "./views/today.js";
import {plan} from "./views/plan.js";
import {openDay} from "./views/day-detail.js";
import {map,initMap} from "./views/map.js";
import {more} from "./views/more.js";

const BUILD="__BUILD_SHA__";
const savedTheme=localStorage.getItem("kauai-theme");if(savedTheme==="dark")document.documentElement.dataset.theme="dark";
function syncThemeColor(){const m=document.getElementById("themeColor");if(m)m.content=document.documentElement.dataset.theme==="dark"?"#101311":"#f5f4ef"}
let DATA=null;
const state={view:"today",day:null};
let lastMarkup="";

function syncNavigation(){
  document.querySelectorAll(".nav-item").forEach(button=>{
    const active=button.dataset.view===state.view;
    button.classList.toggle("active",active);
    if(active)button.setAttribute("aria-current","page");
    else button.removeAttribute("aria-current");
  });
}
function focusHeading(){
  const heading=document.querySelector("#app h1");
  if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
}
function scrollAppToTop(){window.scrollTo(0,0);document.querySelector(".layout")?.scrollTo(0,0)}
function render(focus=false){
  state.day=null;
  syncThemeColor();
  syncNavigation();
  lastMarkup=state.view==="today"?today(DATA):state.view==="plan"?plan(DATA):state.view==="map"?map(DATA):more(DATA,BUILD);
  document.getElementById("app").innerHTML=lastMarkup;
  if(state.view==="map")initMap();
  wire();
  if(focus){scrollAppToTop();focusHeading()}
}
function wire(){
  const toggle=document.getElementById("themeToggle");
  if(toggle)toggle.onclick=()=>{
    const dark=document.documentElement.dataset.theme!=="dark";
    document.documentElement.dataset.theme=dark?"dark":"";
    localStorage.setItem("kauai-theme",dark?"dark":"light");
    toggle.setAttribute("aria-pressed",String(dark));
    syncThemeColor();
  };
  document.querySelectorAll("[data-view]").forEach(button=>button.onclick=()=>{state.view=button.dataset.view;render(true)});
  document.querySelectorAll("[data-day]").forEach(button=>button.onclick=()=>{
    const origin=state.view;
    state.view="plan";
    state.day=button.dataset.day;
    syncNavigation();
    openDay(DATA,state.day,()=>{state.view=origin;render(true)},origin==="today"?"Today":"Plan");
  });
}
function refreshToday(){
  if(!DATA||state.view!=="today"||state.day||document.hidden)return;
  // Avoid replacing a focused control or redrawing an unchanged page every minute.
  if(document.getElementById("app").contains(document.activeElement)&&document.activeElement.matches("button,a,input,select,textarea"))return;
  if(today(DATA)!==lastMarkup)render();
}
window.addEventListener("pageshow",refreshToday);
document.addEventListener("visibilitychange",refreshToday);
setInterval(refreshToday,60000);
function showError(error){console.error(error);const a=document.getElementById("app");if(!a)return;const message=error?.message||String(error||"Unknown error"),stack=error?.stack||"No stack trace was provided by the browser.";a.innerHTML='<div class="empty startup-error" role="alert"><strong>The dashboard could not load.</strong><details><summary>Error details</summary><pre id="appDiagnostics"></pre></details><button class="action" id="reloadApp">Reload</button></div>';const pre=document.getElementById("appDiagnostics");if(pre)pre.textContent="Message: "+message+"\n\nStack:\n"+stack+"\n\nBuild: "+BUILD+"\nURL: "+location.href+"\nTime: "+new Date().toISOString();document.getElementById("reloadApp")?.addEventListener("click",()=>location.reload())}
async function boot(){
  try{DATA=await loadItinerary();render()}catch(error){showError(error);return}
  if("serviceWorker"in navigator){
    navigator.serviceWorker.register("./service-worker.js").then(registration=>registration.update()).catch(error=>console.warn("Offline registration unavailable",error));
  }
}
window.addEventListener("unhandledrejection",event=>showError(event.reason));
boot();
