# Kauaʻi 2026 Dashboard

> ## 🌺 [Open the Kauaʻi 2026 Dashboard](https://aerovega.github.io/kauai-2026/)
>
> **https://aerovega.github.io/kauai-2026/**

A mobile-first Progressive Web App (PWA) for the family’s Kauaʻi 2026 vacation. It turns the evolving itinerary into a simple, family-facing dashboard for iPhone and iPad rather than asking everyone to live inside a spreadsheet.

## What this project is

This repository is the version-controlled home for both the **trip-planning artifacts** and the **family-facing web app**.

The web app uses structured itinerary data in `itinerary.json`. It does **not** read the planning spreadsheet directly.

The planning workbook can live alongside the app so Git preserves the evolution of the itinerary without coupling the application to Excel.

### Current app

- **Kauai 2026 Dashboard** as the primary app identity
- Mobile-first layout designed for iPhone and iPad
- Dashboard / Today view
- Full trip / day-by-day itinerary view
- Day detail views with activities, timing, family considerations, flex plans, and reservation information
- Map/location view with handoffs to external navigation
- Reservations and useful external links
- Family-persona context
- Persistent light/dark appearance preference
- PWA manifest and service-worker caching for an app-like Home Screen experience
- GitHub Pages deployment through GitHub Actions
- External services remain external where appropriate, such as Geocaching.com and Maps

### Design direction

The UI is intentionally moving toward an Apple-inspired, iOS-like experience:

- Clear hierarchy
- Larger, readable typography
- Minimal repeated text and controls
- Simple navigation
- Light/dark appearance
- Calm visual language
- Avoid building functionality that established services already handle well

The application's north-star idea remains:

> **Different paths. Same place.**

The dashboard should support three people having different experiences while preserving shared anchors and reunion points.

## Planning vs. app data

The project deliberately has two layers:

```text
Kauaʻi 2026 repository
│
├── planning/
│   └── Beta itinerary workbook
│
└── web app
    ├── itinerary.json
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── manifest.json
    └── service-worker.js
```

The spreadsheet is a **human planning/authoring artifact**.  
`itinerary.json` is the **application data source**.

They do not need to be synchronized automatically.

## Using the dashboard on iPhone or iPad

You do **not** need to install anything from the App Store.

### Add it to the Home Screen

1. Open the dashboard in **Safari**:
   **https://aerovega.github.io/kauai-2026/**
2. Tap the **Share** button.
3. Choose **Add to Home Screen**.
4. Give it the name you want, then tap **Add**.

It will appear on the Home Screen and open in its app-like experience.

> If **Add to Home Screen** is not visible, scroll through the Share Sheet's actions or use **Edit Actions** to add it.

## Development

This is a static web application: HTML, CSS, JavaScript, JSON, and PWA metadata.

No web framework or backend is required.

GitHub Pages hosts the deployed application. The workflow in `.github/workflows/pages.yml` publishes the repository contents to Pages.

For local development, serve the repository through a local HTTP server rather than opening `index.html` directly. This allows `fetch("./itinerary.json")` and the service worker to behave normally.

## Current status

**Beta v0.1 — functional prototype / planning companion**

The core PWA architecture is working and has been tested on an iPad through the GitHub Pages deployment.

The itinerary is still being developed with family feedback. Major itinerary decisions should be reflected in the planning workbook first, then represented in `itinerary.json` when appropriate.

The project is intentionally paused between meaningful itinerary/UX changes rather than being continuously expanded.

## Repository roadmap

- Continue developing the family itinerary outside the app until significant decisions are made.
- Update `itinerary.json` when the application should reflect those decisions.
- Use `UI-UX-ROADMAP.md` to preserve future interface ideas without prematurely building them.
- When the itinerary is finalized, perform a final usability, accessibility, and offline-readiness pass before the trip.

## Important files

| File | Purpose |
| --- | --- |
| `index.html` | Application shell |
| `styles.css` | Visual system and responsive layout |
| `app.js` | UI rendering and interaction logic |
| `itinerary.json` | Structured application itinerary data |
| `manifest.json` | PWA metadata |
| `service-worker.js` | Offline/app-shell caching |
| `.github/workflows/pages.yml` | GitHub Pages deployment |
| `UI-UX-ROADMAP.md` | Developer-facing UX ideas and progress |
| `planning/` | Human-facing itinerary/planning artifacts |

## License

This is a personal vacation project; no public license has been selected.
