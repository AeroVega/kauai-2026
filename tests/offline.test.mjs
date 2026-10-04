import test from "node:test";
import assert from "node:assert/strict";
import {isOfflineMode,isForcedOffline,setForcedOffline,connectionLabel} from "../js/offline.js";

test("offline mode defaults to automatic browser connectivity",()=>{
  assert.equal(isForcedOffline(),false);
  assert.equal(typeof isOfflineMode(),"boolean");
  assert.match(connectionLabel(),/^(Online|Offline)$/);
});

test("manual offline override can be enabled and cleared",()=>{
  setForcedOffline(true);
  assert.equal(isForcedOffline(),true);
  assert.equal(isOfflineMode(),true);
  assert.equal(connectionLabel(),"Offline mode");
  setForcedOffline(false);
  assert.equal(isForcedOffline(),false);
});