import {esc} from "../utils.js";
import {dayRow} from "./today.js";
export function plan(){return '<section class="hero"><p class="eyebrow">Itinerary</p><h1>The whole trip.</h1><p>Anchors, breathing room, and enough flexibility for the island to change the plan.</p></section><div class="day-list">'+window.__KAUAI_DATA.days.map(dayRow).join("")+'</div>'}