const FLIGHT_STATUS_URL="https://www.united.com/en/us/flightstatus";
const UNITED_URL="https://www.united.com/";

export const flights=[
  {id:"ua1093",date:"2026-10-22",number:"UA 1093",from:"DEN",to:"LAX",depart:"6:00 AM",arrive:"7:32 AM",statusUrl:FLIGHT_STATUS_URL},
  {id:"ua1295",date:"2026-10-22",number:"UA 1295",from:"LAX",to:"LIH",depart:"8:45 AM",arrive:"11:50 AM",statusUrl:FLIGHT_STATUS_URL},
  {id:"ua1685",date:"2026-10-30",number:"UA 1685",from:"LIH",to:"SFO",depart:"10:59 PM",arrive:"7:13 AM",arriveDate:"2026-10-31",statusUrl:FLIGHT_STATUS_URL},
  {id:"ua1604",date:"2026-10-31",number:"UA 1604",from:"SFO",to:"DEN",depart:"10:45 AM",arrive:"2:24 PM",statusUrl:FLIGHT_STATUS_URL}
];

export {FLIGHT_STATUS_URL,UNITED_URL};
export const flightsOn=date=>flights.filter(f=>f.date===date);
export const flightDateLabel=f=>f.arriveDate&&f.arriveDate!==f.date?f.date+" -> "+f.arriveDate:f.date;
