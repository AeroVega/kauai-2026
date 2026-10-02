# Kauaʻi 2026 Dashboard — Design Critique

**Review date:** October 2, 2026  
**Code reviewed:** remote `main`, commit `45e5fc9`  
**Production:** [aerovega.github.io/kauai-2026](https://aerovega.github.io/kauai-2026/)  
**Production build shown in More:** `45e5fc90eaf2c2fa64f236d8fd1e5677d91116c9`

## Summary

The dashboard feels calm and readable. It answers “what is coming up?” quickly at the **day level**, but the pre-trip Today card does not yet answer it at the **activity level**. The overall palette fits the Home Screen icon; the header mark and navigation glyphs do not yet share the icon’s visual language.

## 1. Can someone find the next event in two seconds?

On the review date, the live Today screen showed “Trip starts in 20 days,” “Thu Oct 22 · Day 1,” and **“Arrival · settle in.”** That makes the next itinerary day easy to identify. However, the first activity in Day 1—**Arrive in Līhuʻe at 11:50 AM**—is only visible after opening the day. The pre-trip card therefore passes a “what is the next day?” test more clearly than a “what is the next event?” test.

During the trip, the `Now / Next / Later` structure puts activity titles on the Today screen. Its timing is inferred from the current clock and activity time strings. Since many entries are approximate and durations are not consistently known, “Now” can imply more certainty than the data supports.

**Suggested refinement:** Show the first Day 1 activity and time in the pre-trip card, with the countdown as secondary context. During the trip, keep the next activity prominent and use “Now” only when the schedule supports that claim.

Relevant implementation: [Today view](https://github.com/AeroVega/kauai-2026/blob/main/js/views/today.js) and [time-flow helper](https://github.com/AeroVega/kauai-2026/blob/main/js/utils.js).

## 2. Do the colors and theme fit the app icon?

**Yes, at the palette level.** The icon’s teal, green, amber, and warm ivory are reflected in the dashboard’s teal accents, warm light background, and amber reservation states. Dark mode uses a restrained charcoal and dark-green base with teal accents. The icon can remain more saturated than the interface; its full gradient does not need to be repeated throughout the app.

**The identity graphics are less aligned.** The header uses a pink hibiscus emoji, while the app icon depicts a palm and calendar. Navigation uses several unrelated Unicode glyphs. A cohesive, simple icon set—or a more neutral header mark—would tie the interface to the icon without adding visual noise.

Relevant implementation: [app shell and navigation](https://github.com/AeroVega/kauai-2026/blob/main/index.html) and [theme styles](https://github.com/AeroVega/kauai-2026/blob/main/styles.css).

## 3. Current state of the roadmap areas

| Area | Current state | Remaining design work |
| --- | --- | --- |
| True Today | Date-aware pre-trip, in-trip, and post-trip states are implemented. | No major behavior gap identified in this review. |
| What’s next? | In-trip `Now / Next / Later` is implemented. | Surface the first activity and time in the pre-trip card; calibrate the certainty of “Now.” |
| Activity cards | Important anchors have richer detail, timing, and external links in day details. | Keep the treatment selective; only add fields supported by useful itinerary data. |
| Family paths | Family-specific notes appear in Today and day details. | Make shared anchors and reunion points consistently visible without turning the plan into task management. |
| Map / route view | A location list and external Maps handoffs are present. | A simple spatial overview is still absent; it can be explored without deciding routes. |
| Reservations | Status, time, and links appear in More; Today surfaces selected open actions. | Current lightweight records are adequate for this pass; avoid expanding into a booking system. |
| Icon system | Prototype glyphs remain in navigation, and the header emoji differs from the app icon. | Use a consistent, restrained icon family. |
| Typography and noise | The main title hierarchy is strong, but sizes are still ad hoc. Today also places open items and Watch content near the primary next-event card. | Normalize a small type scale and confirm secondary content stays secondary on phone screens. |
| Accessibility and device readiness | Contrast, touch target, text scaling, landscape iPad, and offline checks remain on the roadmap. | Complete the planned audits on iPhone and iPad, including the installed PWA where practical. |
| Home Screen icon | The finalized PNG is linked by the app shell and manifest. | Complete; the earlier note that it was missing is stale. |

Final itinerary/reservation verification and family QA remain dependent on planning decisions and the family’s review, as indicated by the project scope.

## Review scope

The production page was reviewed in a desktop browser in its persisted dark theme, and the light-theme palette was checked in the current CSS. This was not a physical iPhone/iPad, installed-PWA, dynamic-text, or offline test. The production build identifier matched the reviewed `main` commit.

See [UI-UX-ROADMAP.md](UI-UX-ROADMAP.md) for the recorded follow-ups.
