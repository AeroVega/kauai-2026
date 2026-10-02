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
**Status:** Implemented in Sprint A

The current dashboard uses the first itinerary day as its default. Eventually the Today view should understand the actual trip date and automatically surface the current day.

Potential behavior:

- Current day shown first
- “Now / Next / Later” structure
- Automatically transition to the next day
- Before the trip, show a useful countdown / upcoming-day state
- After the trip, show a simple completed-trip state

**Design constraint:** Do not turn this into a clock-driven task manager. The vacation should still feel relaxed.

### 2. Better “What’s next?” experience
**Status:** Implemented in Sprint A

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
**Status:** Planned

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
**Status:** Partially implemented conceptually

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
**Status:** Deferred

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
**Status:** Deferred

The current navigation uses simple text/glyph icons.

Future version could use a consistent icon set with:

- Clear selected/unselected states
- Familiar symbols
- Appropriate touch targets
- Consistent optical weight

Avoid decorative icon overload.

### 8. Refine typography hierarchy
**Status:** Partially implemented

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
**Status:** Deferred

Create a deliberate app icon rather than relying on a generic/fallback icon.

Consider:

- Kauaʻi visual identity
- Strong silhouette
- Works at small sizes
- Light/dark device contexts

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
- [ ] Home Screen icon finalized
- [ ] Family QA completed

---

## Change log

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
