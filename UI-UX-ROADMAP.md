# UI / UX Roadmap

> Developer-facing working document.  
> This file records interface ideas, design decisions, and deferred improvements so useful ideas are not lost between itinerary revisions.

## Product north star

**Different paths. Same place.**

The dashboard should make the family itinerary easier to understand and use in the moment without becoming a second travel-planning platform.

The design should feel calm, deliberate, and Apple-inspired: strong hierarchy, readable type, restrained controls, generous spacing, and minimal repetition.

---

## Current baseline

### Implemented

- [x] Dashboard identity: **Kauai 2026 Dashboard**
- [x] Mobile-first iPhone/iPad layout
- [x] Four primary destinations: **Today, Plan, Map, More**
- [x] Day-by-day itinerary data rendered from `itinerary.json`
- [x] Individual day detail view
- [x] Activity timelines
- [x] Family-specific context within day details
- [x] Flexible / conditional / decision-status information
- [x] External links to specialized services rather than recreating them
- [x] External navigation handoffs
- [x] Persistent light/dark appearance preference
- [x] Larger general typography for readability
- [x] PWA manifest and service-worker shell
- [x] GitHub Pages deployment
- [x] App-like Home Screen usage on iPhone/iPad

---

## Near-term UX work

These are intentionally **not** commitments to build immediately. They are the next ideas to consider when the itinerary itself becomes more settled.

### 1. True “Today” behavior
**Status:** Implemented in Sprint A; the October 31 completion boundary and local preview clock were refined in the 2026-10-02 design follow-through.

The current dashboard uses the first itinerary day as its default. Eventually the Today view should understand the actual trip date and automatically surface the current day.

Potential behavior:

- Current day shown first
- “Now / Next / Later” structure
- Automatically transition to the next day
- Before the trip, show a useful countdown / upcoming-day state
- After the trip, show a simple completed-trip state

**Design constraint:** Do not turn this into a clock-driven task manager. The vacation should still feel relaxed.

### 2. Better “What’s next?” experience
**Status:** Implemented in Sprint A; event-level pre-trip visibility and cautious “Around now” wording added in the 2026-10-02 design follow-through.

The dashboard should answer the immediate question:

> “What are we doing next?”

without requiring someone to open the full itinerary.

Potential structure:

- Current / next anchor
- Approximate time
- One useful detail
- One relevant external action when appropriate
- Minimal secondary information

**Avoid:** duplicating the same itinerary information in multiple places.

### 3. Activity cards
**Status:** Implemented for important anchors in Sprint B. Continue adding richer fields only when existing itinerary data makes them useful.

Consider richer activity details for important anchors:

- Why we're doing it
- Approximate duration
- Location
- Family relevance
- What to bring / know
- External link
- Reservation state

**Design constraint:** Only important activities deserve richer cards. Do not turn every line of the itinerary into a mini webpage.

### 4. Better branching / “Different paths. Same place.”
**Status:** Partially implemented. Family-specific notes appear in Today and day details; shared anchors and reunion points are not yet presented consistently as a visual structure.

The itinerary already contains family-specific notes and the dedicated geocaching day.

Future UX could make divergent plans visually obvious:

- Shared anchor
- Individual path
- Reunion point

Example:

```
Morning
  ├── Connie → geocaching
  ├── Mom → resort / beach
  └── Brandon → flexible
           ↓
       Reunite
           ↓
       Dinner
```

**Design constraint:** Branching should clarify freedom, not make the trip feel like a project-management diagram.

### 5. Map / route view
**Status:** Partially implemented. The Map view lists locations and hands off to Maps; a visual island overview remains deferred.

Current Map view intentionally avoids recreating a mapping service.

Future possibilities:

- Visual overview of major trip locations
- Day-specific route
- Clustered locations
- One-tap handoff to Apple Maps
- Optional drive-time context

**Do not build:** turn-by-turn navigation, a custom map engine, or a replacement for Apple Maps.

### 6. Reservations as lightweight records
**Status:** Partially implemented

Reservations already appear as links and statuses.

Potential refinement:

- Reservation time
- Confirmation/reference information if useful
- Address
- “Open booking site”
- Calendar handoff where appropriate
- Clear distinction between **booked**, **open**, **verify**, **hold**, and **family decision**

**Design constraint:** The dashboard should remain a view into reservations, not become a booking system.

---

## Apple / iOS-inspired polish

### 7. Replace prototype glyphs with a cohesive icon system
**Status:** Initial cohesive set implemented in the 2026-10-02 design follow-through.

The header now uses the Home Screen icon, and primary navigation uses a small, consistent inline SVG set. Avoid adding decorative icons beyond the navigation and app mark.

The current inline SVG set uses:

- Clear selected/unselected states
- Familiar symbols
- Appropriate touch targets
- Consistent optical weight

Avoid expanding the set for decoration; revisit optical weight only if device review identifies a problem.

### 8. Refine typography hierarchy
**Status:** Partially implemented

The page has a clear dominant title and readable body type, but individual sizes remain ad hoc and status/metadata labels are small.

General text was increased for readability.

Future pass should establish a small, intentional type scale rather than continuing to adjust individual elements ad hoc.

Goals:

- One dominant page title
- Clear section titles
- Comfortable body text
- Readable metadata
- Minimal eyebrow/sub-label usage

### 9. Reduce informational noise
**Status:** Ongoing design principle

Continuously ask:

> Does this text help someone make a decision or understand what happens next?

Remove:

- Repeated labels
- Redundant descriptions
- Decorative explanatory copy
- Buttons that duplicate nearby actions

### 10. Native-feeling controls
**Status:** Deferred

Explore iOS-like interaction patterns where they improve usability:

- Segmented controls
- Sheets
- Disclosure groups
- Toggle controls
- Large touch targets
- Appropriate pressed/selected states

Do not imitate iOS merely for appearance. Use patterns when they improve comprehension.

---

## PWA / device experience

### 11. Proper Home Screen icon
**Status:** Implemented

The finalized raster Home Screen icon is `kauai-icon-1024.png`.

- Integrated through `index.html` as the iOS `apple-touch-icon`
- Declared by `manifest.json`
- Precached by `service-worker.js`
- Designed as the trip-dashboard glyph: teal/turquoise glass palm tree + translucent calendar with warm yellow-orange date squares

### 12. Offline readiness
**Status:** Partial

The service worker currently caches the application shell and itinerary data.

Before the final trip release:

- Verify the app opens without connectivity
- Verify previously cached itinerary remains available
- Verify external links fail gracefully when offline
- Decide whether a visible offline indicator is useful
- Confirm service-worker updates do not leave devices stuck on stale itinerary data

### 13. Install / Home Screen guidance
**Status:** Documentation implemented

README contains iPhone/iPad Home Screen instructions.

Future consideration: a subtle in-app installation/help affordance only if testing shows family members need it.

---

## Accessibility / usability pass

### 14. Touch-target audit
**Status:** Final-pass item

Verify controls are comfortable to tap on both iPhone and iPad.

### 15. Contrast and dark-mode audit
**Status:** Final-pass item

Test:

- Light mode
- Dark mode
- Secondary text
- Status chips
- Links
- Disabled/unavailable states

### 16. Dynamic text / zoom behavior
**Status:** Final-pass item

Test larger system text and browser zoom where practical. Avoid layouts that depend on text staying at one exact size.

### 17. Landscape iPad layout
**Status:** Initial responsive support exists; final audit pending

Test the actual iPad in:

- Portrait
- Landscape
- Split-screen / reduced-width situations if relevant

---

## Ideas intentionally not pursued

These ideas have come up conceptually but should **not** become native dashboard features unless a strong need emerges.

- Custom geocaching database
- Custom weather system
- Custom turn-by-turn navigation
- Full restaurant database
- Full reservation/booking engine
- Messaging/chat system
- Expense tracker
- Photo journal
- Packing-list management system
- AI concierge
- Generic travel-recommendation engine

Use links and handoffs to services that already do these jobs well.

---

## Final-trip readiness checklist

Before calling the app “Final”:

- [ ] Final itinerary represented accurately in `itinerary.json`
- [ ] Planning workbook archived in the repository
- [ ] All external links verified
- [ ] Reservation statuses verified
- [ ] Current map/location information verified
- [ ] Day-by-day Today behavior tested
- [ ] Offline behavior tested
- [ ] Service-worker update behavior tested
- [ ] Light mode tested
- [ ] Dark mode tested
- [ ] iPhone portrait tested
- [ ] iPhone landscape tested
- [ ] iPad portrait tested
- [ ] iPad landscape tested
- [ ] Touch targets audited
- [ ] Typography/accessibility pass completed
- [x] Home Screen icon finalized
- [ ] Family QA completed

---

## Sprint B

**Focus:** polish the in-trip experience without adding planning complexity.

- [x] Move appearance control into More
- [x] Keep appearance strictly user-controlled; never infer it from time of day
- [x] Add a quiet build identifier to More
- [x] Refine activity cards around important anchors
- [x] Make family branching visually clearer without turning it into project management

## Design review · 2026-10-02

See [DESIGN-CRITIQUE-2026-10-02.md](DESIGN-CRITIQUE-2026-10-02.md) for the full review of remote `main` and the deployed PWA.

Follow-ups from the review:

- [x] Make the first Day 1 activity and its time visible in the pre-trip Today card while keeping the trip countdown secondary.
- [x] Change the in-trip label to “Around now” where event durations are unknown, and show “Up next” before the first timed activity.
- [x] Align the brand mark and navigation icons; stop the primary Today card from stretching beside the secondary open-items card.
- When Map work resumes, prototype a simple spatial overview without assuming routes or building custom navigation.
- Continue the typography, accessibility, device-layout, and offline-readiness passes already listed above.

Already implemented in the reviewed build: date-aware Today states, anchor-focused activity details, family-specific notes, reservation status summaries and links, and the finalized Home Screen icon. The Home Screen icon is not outstanding work.

For visual checks, Today accepts the local-only `previewAt` query parameter (for example, `?previewAt=2026-10-26T09:00`). It is ignored outside localhost and is documented in the README.

## Change log

### 2026-10-02 · Design critique follow-through

- Put the first Day 1 activity and time on the pre-trip Today card.
- Made Today’s flow use “Around now” for a time-based event whose duration is unknown, and “Up next” before the first timed event.
- Added a localhost-only preview clock through `?previewAt=YYYY-MM-DDTHH:mm`; the simulated time is visible in the Today eyebrow.
- Replaced the header emoji with the Home Screen icon, unified navigation symbols as inline SVGs, and removed excess height from the primary Today card on wide layouts.
- Made October 31 enter the completed-trip state and corrected the approximate “Afternoon” time parser so it is not mistaken for “Noon.”

### 2026-10-02 · Design review

- Recorded the current Today hierarchy, icon/color alignment, and remaining visual/readiness work in `DESIGN-CRITIQUE-2026-10-02.md`.
- Clarified which roadmap items are already present and which are follow-up polish; final itinerary/reservation verification and family QA remain dependent on planning decisions and family review.

### 2026-10-02 · iOS 26 PWA viewport safeguard

- Added early iOS viewport recovery for the known temporarily-wide standalone/PWA viewport condition.
- Added a physical-screen/touch check before stylesheet loading and a narrow portrait fallback after desktop media-query rules, so a wide erroneous CSS viewport cannot prevent iPhone from receiving the bottom navigation. iPad portrait and desktop retain their top navigation.
- Kept the phone dock outside the sticky header and in normal flex layout flow; the content pane scrolls within a visible-viewport-height app shell instead of relying on iOS fixed-bottom positioning.
- Documented the safeguard and the requirement to test the installed iPhone PWA before removing it.


### 2026-10-02 · PWA polish → Home Screen icon

- Replaced the stale SVG Home Screen icon references with the finalized `kauai-icon-1024.png`.
- Wired the same raster icon through `index.html`, `manifest.json`, and the service-worker precache.
- Kept the icon as a direct raster asset rather than introducing an unnecessary SVG recreation.

### 2026-10-02 · UI polish → More hierarchy + navigation

- Removed explanatory copy from the More header and Appearance card.
- Changed the appearance control to a manual visual switch.
- Aligned primary navigation with the dashboard title on wider screens.

### 2026-10-02 · Sprint B complete → Activity anchors + family paths

- Added richer activity presentation for important itinerary anchors.
- Added a lightweight “Different paths. Same place.” family-path treatment to day details.
- Kept activity data and family decisions sourced directly from `itinerary.json`.

### 2026-10-02 · Sprint B started → More + build visibility

- Moved dark-mode control out of the header and into More.
- Added a small build identifier at the bottom of More.

### 2026-10-02 · Sprint A → Today + appearance

- Added date-aware pre-trip, in-trip, and post-trip Today states.
- Added calculated trip progress.
- Added Now / Next / Later orientation for the current day.
- Promoted light/dark appearance to a persistent header control.
- Bumped the service-worker cache version.

### 2026-10-01 · Beta V0.1 → dashboard prototype

- Established GitHub Pages PWA architecture.
- Moved itinerary content into structured JSON.
- Shifted the app identity from a generic itinerary prototype to **Kauai 2026 Dashboard**.
- Simplified primary navigation.
- Added day-level itinerary views.
- Added family-specific itinerary context.
- Added external-service handoffs.
- Added persistent dark mode.
- Increased general interface typography.
- Established this roadmap for deferred UX work.

### 2026-10-02 · Stability pass → modular app + resilient PWA updates

- Split the monolithic JavaScript entrypoint into focused ES modules for bootstrap/state, data loading, shared utilities, and views.
- Added visible startup fallback content so a failed application boot is no longer a blank screen.
- Made HTML and application JavaScript network-first in the service worker, with cached fallback for offline use.
- Added service-worker update checks during application bootstrap.
- Expanded Pages validation to check every JavaScript module plus the service worker and itinerary JSON.
