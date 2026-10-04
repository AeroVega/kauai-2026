import test from "node:test";
import assert from "node:assert/strict";
import {flights,flightsOn,flightDateLabel} from "../js/flights.js";
import {more} from "../js/views/more.js";

test("confirmed flight data contains all four legs",()=>{
  assert.equal(flights.length,4);
  assert.deepEqual(flights.map(f=>f.number),["UA 1093","UA 1295","UA 1685","UA 1604"]);
  assert.equal(flightsOn("2026-10-22").length,2);
  assert.equal(flightsOn("2026-10-30").length,1);
  assert.equal(flightsOn("2026-10-31").length,1);
});

test("overnight return flight records its arrival date",()=>{
  const flight=flights.find(f=>f.id==="ua1685");
  assert.equal(flightDateLabel(flight),"2026-10-30 -> 2026-10-31");
});

test("More renders flight numbers, routes, times, and status links",()=>{
  globalThis.document={documentElement:{dataset:{theme:"light"}}};
  const html=more({reservations:[],links:[],family:{}}, "test");
  assert.match(html,/UA 1093/);
  assert.match(html,/DEN to LAX/);
  assert.match(html,/10:59 PM/);
  assert.match(html,/Flight status/);
  delete globalThis.document;
});
