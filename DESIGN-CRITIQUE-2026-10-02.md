# Kauaʻi dashboard design review

Review date: October 2, 2026. This pass builds on remote `main` at `4773b49` and reviews the feature-branch changes locally. The earlier production review and first-event/icon changes are recorded in the roadmap. This review does not certify a production deployment or a physical Apple device.

## Assessment

The four destinations are the right structure. Today provides orientation, Plan holds the full itinerary, Map hands navigation to an existing service, and More keeps secondary tools out of the primary workflow. The warm background, teal accents, generous spacing, and manual dark mode fit a calm family dashboard. The cohesive navigation icons and first-event preview from the preceding pass are useful improvements.

The dashboard needed less repetition and more dependable behavior. Repeating "Kauai 2026 Dashboard" as a large page title consumed phone space without helping someone find the next event. Plan and Map introductions explained what their controls already communicated. Family-path helper text repeated the actual family notes. Meanwhile, reservation rows omitted existing action text, small links were difficult to tap, and selected navigation existed only as a visual state.

The most consequential defect was in Today. Both Day 9 and completion used the same index, so October 30 showed a completed trip. The clock also followed the device timezone, which could switch the itinerary day early when someone retained a mainland timezone. Alternative boat operators could appear as consecutive activities even though no operator had been chosen.

The Map list is adequate for the current data. A custom map or route planner would add maintenance without solving an observed problem. Family paths should continue to show the existing notes until the family supplies explicit shared anchors and reunion points. Keyword-based activity emphasis remains an approximation; an accent must not imply that participation is required.

## Changes implemented

| Finding | Result |
| --- | --- |
| Repeated identity and explanatory copy | Page titles now match Today, Plan, Map, and More. Removed duplicate countdown, unnecessary section labels, family helper copy, and guessed "Anchor" badges. |
| Ad hoc metadata and small targets | Added a compact type scale, stronger light-mode secondary-text contrast, wrapping for narrow layouts, and minimum 44-pixel control heights. Kept readable body text. |
| Incomplete navigation semantics | Selected navigation uses `aria-current`. Focus moves to the new heading. Day detail returns to its originating Today or Plan screen, and adjacent-day navigation resets the phone content scroller. |
| Missing reservation action | More displays each record's existing action, including approval and hold conditions. External links have destination-specific accessible names and consistent SVG handoff icons. Today always offers a reservation handoff when open records exist. |
| Day 9 incorrectly completed | October 30 remains Day 9. Completion starts October 31 in Kauaʻi. Regression tests cover every trip day and the midnight boundary. |
| Device timezone and inferred alternatives | Today uses Pacific/Honolulu, calendar-day arithmetic, and a cautious timeline. Untimed entries and unresolved choices/access checks do not establish a current activity. All entries remain available in Plan. |
| App left open across a boundary | Today refreshes on visibility changes and checks for changed content once a minute, without redrawing an unchanged page or replacing a focused control. |
| Fragile offline errors | The service worker caches successful same-origin responses, falls back to matching cached resources, and reserves the HTML fallback for navigation. It preserves unrelated caches. Registration or decorative-image failure no longer replaces a usable dashboard. Diagnostics remain behind a disclosure. |

The itinerary JSON, planning workbook, manual appearance preference, iPhone viewport safeguards, icon references, and commit-SHA build placeholders remain intact. Feature-branch validation runs the date regressions in four device timezones. Publishing still follows the existing main-branch Pages workflow.

## Remaining work while approval is pending

These checks can proceed with the draft itinerary. They do not require deciding the vacation.

- Test the installed iPhone PWA on the affected iOS 26/WebKit version. Check launch, rotation, dock position, scroll, larger text, and safe areas. Chromium emulation cannot certify the physical-screen viewport safeguard.
- Test iPad portrait, landscape, and Split View in Safari. Confirm the brand and navigation stay usable with larger system text.
- Run VoiceOver and keyboard checks on Apple devices. Review heading navigation, link names, selected destinations, and the appearance switch with a family member.
- Rehearse offline startup and a deployment update on an installed device after merging. Confirm the visible build changes and the itinerary still opens without connectivity. External Maps and booking sites need their own connectivity; the dashboard does not promise they work offline.
- Have the family try finding a day, opening directions, and locating a reservation action using the current draft. Only add further help or controls if these tasks reveal a problem.
- Verify provider and official-source link destinations where network access allows. Recheck them after approval; current operator availability and access conditions are separate from URL validity.

A visual island overview is optional. Keep it deferred unless the location list proves insufficient in family review. Additional activity detail should come from useful confirmed fields, rather than more UI.

## Work that depends on approval or confirmed information

- Explicitly reconcile the approved itinerary into `itinerary.json` and the planning artifact. Preserve the workbook's revision history.
- Confirm Day 3 waterfall availability, the Day 4 access plan, the Day 6 operator choice, the luau and dinner decisions, and departure-day car-return timing. Change booking statuses only when their real state changes.
- Add actual reservation times, confirmed locations, optional-participation fields, and reunion points when supplied. Replace inferred activity emphasis with explicit anchor flags where useful.
- Verify final location and navigation destinations, operator instructions, park/ocean conditions, and all external links close to travel.
- Complete family acceptance testing against the approved plan before calling the app final.

## Validation and limits

Six date/flow regressions passed in UTC, America/Denver, Pacific/Honolulu, and Europe/London. JavaScript syntax and itinerary JSON validation passed. Key metadata, link, and status-chip color pairs exceeded 4.5:1 in both themes. This is not a full accessibility certification.

Local Chromium checks passed at 320×568, 390×844, 844×390, 768×1024, 1024×768, and 600×900. The checks covered all primary views in both themes, 44-pixel control heights, 200% root text scaling, all nine day details, heading focus, return navigation, and phone-scroller resets. Screenshots were reviewed for phone and tablet hierarchy and appearance.

A simulated real-clock test crossed Kauaʻi midnight from Day 9 into completion without reloading. A warm-cache offline test reopened the app, visited all tabs, read cached JSON, and confirmed uncached JavaScript failed instead of receiving HTML. A temporary two-build fixture verified cache replacement, unrelated-cache preservation, the visible build identifier, and offline launch after updating. Registration and image-failure checks retained a usable dashboard.

Physical iPhone/iPad, VoiceOver, actual browser zoom, installed-PWA updates, and production external destinations remain unverified. Root text scaling and Chromium viewport checks are useful approximations, not substitutes for those checks.
