import {loadItinerary} from "./data.js";
import {today} from "./views/today.js";
import {plan} from "./views/plan.js";
import {openDay} from "./views/day-detail.js";
import {map} from "./views/map.js";
import {more} from "./views/more.js";

const BUILD="__BUILD_SHA__";
const savedTheme=localStorage.getItem("kauai-theme");if(savedTheme==="dark")document.documentElement.dataset.theme="dark";
function syncThemeColor(){const m=document.getElementById("themeColor");if(m)m.content=document.documentElement.dataset.theme==="dark"?"#101311":"#f5f4ef"}
let DATA=null;
const state={view:"today"};

function render(){syncThemeColor();document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===state.view));const a=document.getElementById("app");a.innerHTML=state.view==="today"?today(DATA):state.view==="plan"?plan(DATA):state.view==="map"?map(DATA):more(DATA,BUILD);wire()}
function scrollAppToTop(){window.scrollTo(0,0);document.querySelector(".layout")?.scrollTo(0,0)}
function renderPlan(){state.view="plan";render();scrollAppToTop()}
function wire(){const t=document.getElementById("themeToggle");if(t)t.onclick=()=>{const next=document.documentElement.dataset.theme!=="dark";document.documentElement.dataset.theme=next?"dark":"";localStorage.setItem("kauai-theme",next?"dark":"light");syncThemeColor();render()};document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();scrollAppToTop()});document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{scrollAppToTop();openDay(DATA,b.dataset.day,renderPlan)})}
function showError(error){console.error(error);const a=document.getElementById("app");if(!a)return;const message=error?.message||String(error||"Unknown error"),stack=error?.stack||"No stack trace was provided by the browser.";a.innerHTML='<div class="empty startup-error"><strong>The dashboard could not load.</strong><p>Technical details are below.</p><details open><summary>Error details</summary><pre id="appDiagnostics"></pre></details><button class="action" id="reloadApp">Reload</button></div>';const pre=document.getElementById("appDiagnostics");if(pre)pre.textContent="Message: "+message+"\n\nStack:\n"+stack+"\n\nBuild: "+BUILD+"\nURL: "+location.href+"\nTime: "+new Date().toISOString();document.getElementById("reloadApp")?.addEventListener("click",()=>location.reload())}
async function boot(){try{DATA=await loadItinerary();render();if("serviceWorker"in navigator){const registration=await navigator.serviceWorker.register("./service-worker.js");registration.update().catch(()=>{})}}catch(error){showError(error)}}
window.addEventListener("unhandledrejection",event=>showError(event.reason));
boot();
