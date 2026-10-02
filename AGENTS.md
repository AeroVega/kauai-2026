# AGENTS.md

## Purpose

This is the durable operating guidance for coding agents working on the Kauaʻi 2026 Dashboard. The goal is not maximum feature count; it is a calm, quietly useful family travel tool.

> **Different paths. Same place.**

Read this file before making UI or architecture changes.

## 1. Design principles

### Every piece of UI text needs a job

The user's recurring design test is: **“Why is that text there?”** If the answer is not immediately compelling, remove it.

Do not add explanatory/helper copy merely because it is conventional UX practice. Avoid text that repeats what the hierarchy or control already communicates.

### Do not over-design

The UI should feel calm, deliberate, readable, and Apple-inspired without becoming a showcase of components. Before adding UI, ask: What problem does this solve? Is that problem actually occurring? Can less UI solve it?

### Prominence should reflect importance

Secondary features should stay secondary. Dark mode belongs under More → Appearance, not primary navigation.

### Preferences are user-controlled

Appearance is a manual preference. Never infer light/dark mode from time of day, sunrise/sunset, location, or trip state. Persist the explicit user choice in localStorage.

### Family flexibility is a product principle

“Different paths. Same place.” means shared anchors, individual activities, optional participation, flexible separation, and deliberate reunion points. Do not turn family branching into task assignment, project management, mandatory schedules, or individual status tracking.

### The vacation must not become a clock-driven task manager

Today may use Now / Next / Later, but the trip should remain relaxed. Approximate timing is often enough.

## 2. Information architecture

Primary destinations: Today, Plan, Map, More.

On larger screens, primary navigation belongs in the top header alongside the dashboard brand. On smaller screens, use the floating/bottom mobile navigation.

Today answers “What are we doing next?” and supports pre-trip, in-trip, and post-trip states. The trip runs October 22–30, 2026; October 30 is still Day 9 and the completed state begins October 31.

Plan is the full itinerary. Map is a lightweight location/route view with external navigation handoffs. More contains secondary tools, reservations, useful links, family context, Appearance, and the build identifier.

## 3. Source of truth and itinerary discipline

`planning/` is the human planning/authoring artifact. `itinerary.json` is the application data source. They do not need automatic synchronization.

When family itinerary decisions are still under discussion, do not silently change `itinerary.json` just to make the UI look better. UI work can proceed against the existing model. When a decision changes the trip, update the planning artifact as appropriate, then explicitly update `itinerary.json`.

The dashboard is a planning companion, not the authority that decides the vacation.

## 4. Current architecture

- `index.html` — PWA shell and primary navigation.
- `js/app.js` — bootstrap, state, rendering, and event wiring.
- `js/data.js` — itinerary loading and validation.
- `js/utils.js` — shared escaping/date/time helpers.
- `js/views/today.js` — Today dashboard.
- `js/views/plan.js` — itinerary list.
- `js/views/day-detail.js` — individual day detail.
- `js/views/map.js` — location view.
- `js/views/more.js` — secondary tools and appearance.
- `styles.css` — visual system and responsive layout.
- `itinerary.json` — application data.
- `manifest.json` — PWA metadata and app icon declaration.
- `kauai-icon-1024.png` — finalized iOS/PWA Home Screen icon.
- `service-worker.js` — update/offline behavior.
- `UI-UX-ROADMAP.md` — UI/product backlog and decisions.
- `README.md` — project documentation.

Keep the current lightweight direct-rendering architecture. Do not introduce a framework, database, state-management library, or build system unless the current architecture genuinely stops serving the product.

## 5. PWA and caching tribal knowledge

Production URL: https://aerovega.github.io/kauai-2026/

Every completed coding update must deploy with a new cache/build identifier. The project handles this automatically: `js/app.js` and `service-worker.js` contain the `__BUILD_SHA__` placeholder, and the GitHub Pages workflow replaces it with the exact `GITHUB_SHA` of the commit being deployed. The visible build identifier and service-worker cache version therefore derive from the same immutable commit hash. Do not manually replace the placeholder.

The service worker now treats HTML and application JavaScript as **network-first with cached fallback**. This is deliberate: the installed PWA must be able to recover from stale application code instead of getting trapped serving an old broken bundle. Static assets remain cache-first. The application also asks the service worker to update when it boots.

The More tab contains a small build identifier because many UI changes will not be visually obvious enough to prove a device received a new deployment.

The finalized Home Screen icon is the raster `kauai-icon-1024.png`. iOS uses it through the `apple-touch-icon` link in `index.html`; the same PNG is declared by the PWA manifest and precached by the service worker. Keep these references aligned if the icon changes.

After changes, verify the repository, cache version, deployment workflow, and—when practical—the installed/PWA experience.

## 5a. iOS/WebKit viewport safeguard

iOS 26 can temporarily report an erroneously wide CSS viewport in installed PWAs. On iPhone this can activate the desktop media queries even when the physical device is narrow.

The current implementation intentionally has two safeguards:

- `index.html` contains an early viewport-recovery check that detects an iOS device whose reported `innerWidth` is implausibly wider than `screen.width` and briefly restores the normal `width=device-width` viewport before restoring `viewport-fit=cover`.
- `styles.css` contains a narrow touch-device portrait fallback using hover/pointer capability and aspect ratio. It restores the iPhone bottom navigation and mobile single-column layout after the desktop media queries, without applying that fallback to iPad portrait.

Do not remove or weaken these safeguards without testing the installed iPhone PWA on the affected iOS/WebKit version. Do not replace them by simply removing the desktop breakpoint, because iPad and desktop intentionally use the wider-screen navigation/layout.

## 6. Responsive/UI tribal knowledge

iPhone and iPad are first-class targets.

On iPad/larger screens, the desired header is: **Kauai 2026 Dashboard** on the left and **Today / Plan / Map / More** on the right, in the same row. On mobile, retain the bottom navigation.

Readable, generous typography is intentional. Do not shrink text merely to fit more information. Keep touch targets comfortable.

Dark mode uses the `data-theme="dark"` attribute and persisted `kauai-theme` preference. It is manual only.

## 7. Activity and family-path guidance

Not every activity needs equal visual treatment. Important anchors may receive richer presentation, especially major excursions, scenic anchors, reservation-linked activities, the geocaching expedition, and reunion/shared anchors.

A richer activity treatment should answer something useful: what, approximately when, why it matters, or what external action is available. If it adds no useful information, keep the activity simple.

Family-path UI should communicate freedom, not bureaucracy. It should make optional participation and reunion points clearer without becoming project management.

## 8. External services

Prefer handoffs to specialized services rather than recreating them. Geocaching.com handles cache data/routes; Maps handles navigation; official weather/park sources handle conditions; reservation providers remain the reservation system.

## 9. Reservation/status semantics

Reservation information is lightweight state, not a booking platform. Existing concepts include BOOKED, OPEN, VERIFY, HOLD, MOM CHOICE, and DECISION.

Make the next useful action obvious without adding explanatory paragraphs. Do not invent scores or rankings for these states.

## 10. Coding workflow

Before changing code:
1. Read AGENTS.md.
2. Read the relevant part of UI-UX-ROADMAP.md.
3. Inspect the current implementation rather than relying on memory.
4. Identify whether the change is UI, behavior, itinerary data, or infrastructure.
5. Keep the change narrowly scoped.

After changing code:
1. Re-read the modified sections.
2. Inspect generated HTML/JS strings for malformed markup.
3. Check responsive implications.
4. Check theme behavior if theme/header code changed.
5. Check PWA cache implications. Every completed update must deploy with a new commit-SHA-based cache/build identifier.
6. Verify the deployed app when practical.
7. Update the roadmap/change log when a roadmap item is materially completed.

Important lesson: large HTML strings embedded in JavaScript are easy to corrupt during automated string replacement. Always inspect the resulting source before declaring a change complete.

## 11. Do not “improve” without evidence

Do not add onboarding, helper text, tooltips everywhere, automatic theme detection, notifications, elaborate settings, custom maps, unnecessary animations, metrics, personalization systems, or other conventional app features simply because they are conventional.

## 12. Project context

The trip is Connie, Mom, and Brandon staying at Waipouli Beach Resort near Kapaʻa. Their preferences differ intentionally. The product goal is to give each person room to have their own experience while making shared experiences easy to find and reunite around.

Do not infer new family preferences from old behavior. Use current itinerary/persona data and explicit project decisions.

## 13. Distilled design critique

- If we ask “Why is that text there?” and do not have a compelling answer, remove it.
- Do not add supplemental copy everywhere.
- Do not explain self-explanatory controls.
- Secondary features should remain secondary.
- Dark mode is a manual preference, never an automatic day/night mode.
- Calm beats feature-rich.
- The UI supports the vacation; it should not become another thing the family manages.
- Prefer obvious hierarchy over explanatory prose.
- Preserve whitespace and readability.
- More information is not automatically more useful.
- “Different paths. Same place.” means flexibility is a feature, not a problem to solve.

When in doubt, optimize for **clarity, usefulness, calm, and intentionality**—in that order.
