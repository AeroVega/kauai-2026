import {loadItinerary} from "./data.js";
import {today} from "./views/today.js";
import {plan} from "./views/plan.js";
import {openDay} from "./views/day-detail.js";
import {map} from "./views/map.js";
import {more} from "./views/more.js";

const BUILD="__BUILD_SHA__";
const savedTheme=localStorage.getItem("kauai-theme");if(savedTheme==="dark")document.documentElement.dataset.theme="dark";
let DATA=null;
const state={view:"today"};

function render(){document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===state.view));const a=document.getElementById("app");a.innerHTML=state.view==="today"?today(DATA):state.view==="plan"?plan(DATA):state.view==="map"?map(DATA):more(DATA,BUILD);wire()}
function renderPlan(){state.view="plan";render()}
function wire(){const t=document.getElementById("themeToggle");if(t)t.onclick=()=>{const next=document.documentElement.dataset.theme!=="dark";document.documentElement.dataset.theme=next?"dark":"";localStorage.setItem("kauai-theme",next?"dark":"light");render()};document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render();scrollTo(0,0)});document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>openDay(DATA,b.dataset.day,renderPlan))}
function showError(error){console.error(error);const a=document.getElementById("app");if(a)a.innerHTML='<div class="empty"><strong>The dashboard could not load.</strong><p>Please refresh once. If the problem persists, open More → Build to see which version is running.</p></div>'}
async function boot(){try{DATA=await loadItinerary();render();if("serviceWorker"in navigator){const registration=await navigator.serviceWorker.register("./service-worker.js");registration.update().catch(()=>{})}}catch(error){showError(error)}}
window.addEventListener("unhandledrejection",event=>showError(event.reason));
boot();
