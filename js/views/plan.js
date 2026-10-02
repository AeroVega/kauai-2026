import {dayRow} from "./today.js";

export function plan(data){
  return '<section class="hero compact"><h1>Plan</h1></section>'
    +'<div class="day-list">'+data.days.map(dayRow).join("")+'</div>';
}
