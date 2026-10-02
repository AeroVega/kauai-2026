import {dayRow} from "./today.js";

export function plan(data){
  return '<section class="hero compact"><p class="eyebrow">Itinerary</p><h1>The whole trip.</h1><p>Anchors, breathing room, and enough flexibility for the island to change the plan.</p></section>'
    +'<div class="day-list">'+data.days.map(dayRow).join("")+'</div>';
}
