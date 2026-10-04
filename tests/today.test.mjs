import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tripDates,dayForToday,dateKey,dashboardNow,localDate,calendarDays,progressForToday,previewTime,timeMinutes,dayFlow} from '../js/utils.js';
import {today} from '../js/views/today.js';
const data=JSON.parse(readFileSync(new URL('../itinerary.json',import.meta.url)));
const {start,end}=tripDates();

test('all nine trip days remain active, including the departure day',()=>{
  assert.equal(dayForToday(new Date(2026,9,21),start,end,data),null);
  for(let day=1;day<=9;day++)assert.equal(dayForToday(new Date(2026,9,21+day),start,end,data),day);
  for(const day of [31,32])assert.equal(dayForToday(new Date(2026,9,day),start,end,data),10);
  assert.equal(progressForToday(new Date(2026,9,30),start,end),89);
  assert.equal(progressForToday(end,start,end),100);
});

test('Kauaʻi date and clock stay consistent regardless of the device timezone',()=>{
  const beforeMidnight=dashboardNow(new Date('2026-10-31T09:59:00Z'));
  assert.equal(dateKey(beforeMidnight),'2026-10-30');
  assert.equal(beforeMidnight.getHours(),23);
  assert.equal(beforeMidnight.getMinutes(),59);
  assert.equal(dayForToday(localDate(beforeMidnight),start,end,data),9);
  const midnight=dashboardNow(new Date('2026-10-31T10:00:00Z'));
  assert.equal(dateKey(midnight),'2026-10-31');
  assert.equal(midnight.getHours(),0);
  assert.equal(dayForToday(localDate(midnight),start,end,data),10);
  assert.equal(calendarDays(new Date(2026,9,2),start),20);
});

test('Today renders every day and the completed state using the local preview clock',()=>{
  try{
    for(let day=22;day<=30;day++){
      globalThis.window={location:{hostname:'localhost',search:`?previewAt=2026-10-${day}T12:00`}};
      const html=today(data);
      assert.match(html,new RegExp(`Today · Day ${day-21}`));
      assert.doesNotMatch(html,/Trip complete/);
    }
    window.location.search='?previewAt=2026-10-31T00:00';
    assert.match(today(data),/Trip complete/);
    window.location.search='?previewAt=2026-10-21T12:00';
    assert.match(today(data),/1 day/);
  }finally{delete globalThis.window}
});

test('preview clock rejects invalid dates and production hosts',()=>{
  try{
    globalThis.window={location:{hostname:'localhost',search:'?previewAt=2026-02-30T09:00'}};
    assert.equal(previewTime(),null);
    window.location.search='?previewAt=2026-10-30T09:00';
    assert.equal(dateKey(previewTime()),'2026-10-30');
    window.location.hostname='aerovega.github.io';
    assert.equal(previewTime(),null);
  }finally{delete globalThis.window}
});

test('untimed and alternative activities do not become scheduled next steps',()=>{
  for(const time of ['Optional','Anytime','TBD','11:00 AM / 1:00 PM'])assert.equal(timeMinutes(time),null);
  assert.equal(timeMinutes('Afternoon'),840);
  assert.equal(timeMinutes('Late morning'),660);
  const beforeArrival=dayFlow(data.days[0],new Date(2026,9,22,8));
  assert.equal(beforeArrival.current,null);
  assert.equal(beforeArrival.next,data.days[0].activities[0]);
  const geocaching=dayFlow(data.days[3],new Date(2026,9,25,12));
  assert.equal(geocaching.current.title,'Geocaching expedition');
  assert.equal(geocaching.next.title,'Reunite');
  assert.deepEqual(dayFlow({activities:[]},new Date()),{current:null,next:null,later:[]});
});

test('conditional days do not claim an activity is happening',()=>{
  const conditional={status:'CONDITIONAL',activities:[{time:'11:00 AM',title:'Potential activity'}]};
  assert.deepEqual(dayFlow(conditional,new Date(2026,9,26,12)),{current:null,next:null,later:[]});
});
