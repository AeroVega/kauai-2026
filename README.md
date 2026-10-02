# Kauaʻi 2026 Dashboard

> ## 🌺 [Open the Kauaʻi 2026 Dashboard](https://aerovega.github.io/kauai-2026/)
>
> **https://aerovega.github.io/kauai-2026/**

A mobile-first Progressive Web App (PWA) for the family’s Kauaʻi 2026 vacation. It turns the evolving itinerary into a simple, family-facing dashboard for iPhone and iPad rather than asking everyone to live inside a spreadsheet.

## What this project is

This repository is the version-controlled home for both the **trip-planning artifacts** and the **family-facing web app**.

The web app uses structured itinerary data in `itinerary.json`. It does **not** read the planning spreadsheet directly.

### Current app

- **Kauai 2026 Dashboard**
- Mobile-first iPhone/iPad layout
- Dashboard / Today view
- Full trip / day-by-day itinerary view
- Day detail views with activities, family considerations, flex plans, and reservation information
- Map/location view with handoffs to external navigation
- Reservations and useful external links
- Family-persona context
- Persistent light/dark appearance preference
- PWA manifest, service-worker caching, and finalized iOS Home Screen icon
- GitHub Pages deployment through GitHub Actions
- ES-module JavaScript split by responsibility

## Using the dashboard on iPhone or iPad

You do **not** need to install anything from the App Store.

### Add it to the Home Screen

1. Open the dashboard in **Safari**: **https://aerovega.github.io/kauai-2026/**
2. Tap the **Share** button.
3. Choose **Add to Home Screen**.
4. Give it the name you want, then tap **Add**.

It will appear on the Home Screen and open in its app-like experience.

## Development

This is a static web application: HTML, CSS, JavaScript, JSON, and PWA metadata.

No web framework, backend, or build system is required.

For local development, serve the repository through a local HTTP server rather than opening `index.html` directly. This allows `fetch("./itinerary.json")`, ES modules, and the service worker to behave normally.

The GitHub Pages workflow validates every JavaScript module and the itinerary JSON before deployment.

### Build and cache versioning

Every deployment uses the exact Git commit SHA as the build identifier and service-worker cache namespace. Source files keep the `__BUILD_SHA__` placeholder; the Pages workflow stamps it during deployment. Do not manually replace the placeholder.

## Project structure

```text
Kauaʻi 2026 repository
│
├── planning/                 # human planning artifacts
├── js/
│   ├── app.js                # bootstrap, state, rendering, wiring
│   ├── data.js               # itinerary loading/validation
│   ├── utils.js              # shared escaping/date/time helpers
│   └── views/
│       ├── today.js
│       ├── plan.js
│       ├── day-detail.js
│       ├── map.js
│       └── more.js
├── itinerary.json            # application data source
├── index.html                # PWA shell
├── styles.css                # visual system
├── manifest.json             # PWA metadata
├── kauai-icon-1024.png       # finalized iOS/PWA Home Screen icon
└── service-worker.js         # update/offline behavior
```

## Project principles

> **Different paths. Same place.**

The dashboard should support three people having different experiences while preserving shared anchors and reunion points. Keep the app calm and useful; use specialized external services for navigation, geocaching, reservations, weather, and similar jobs.

## Status

**Beta v0.1 — functional prototype / planning companion**

The itinerary remains under development. Major itinerary decisions belong in the planning artifacts first, then should be reflected in `itinerary.json` when appropriate.

## Important files

| File | Purpose |
| --- | --- |
| `index.html` | Application shell and primary navigation |
| `styles.css` | Visual system and responsive layout |
| `js/app.js` | Bootstrap, state, rendering, and event wiring |
| `js/data.js` | Itinerary loading and validation |
| `js/utils.js` | Shared helpers |
| `js/views/` | Individual UI views |
| `itinerary.json` | Structured application itinerary data |
| `manifest.json` | PWA metadata and app icon declaration |
| `kauai-icon-1024.png` | Finalized iOS/PWA Home Screen icon |
| `service-worker.js` | Offline/cache/update behavior |
| `.github/workflows/pages.yml` | GitHub Pages deployment |
| `UI-UX-ROADMAP.md` | UI/product backlog and decisions |
| `AGENTS.md` | Coding-agent operating guidance |
| `planning/` | Human-facing itinerary/planning artifacts |

## License

This is a personal vacation project; no public license has been selected.
