<!-- .github/copilot-instructions.md
This file guides AI coding agents working on the UnityGrid Plaza project.
Keep entries short, concrete and tied to real files.
-->

# UnityGrid Plaza — AI Agent Quick Guide

- Project root: `package.json` (scripts), `server/` (Express + Postgres), `client/` (Vite + React).
- Purpose: small full‑stack demo that lists locations and events and serves a Vite React frontend.

Key architecture
- Server: `server/server.js` (Express). Routes live in `server/routes/*` and handlers in `server/controllers/*`.
  - API endpoints:
    - GET /api/locations -> `server/controllers/locations.js` (getAllLocations)
    - GET /api/locations/:slug -> `server/controllers/locations.js` (getLocationAndEventsBySlug)
    - GET /api/events -> `server/controllers/events.js` (getEvents)
  - DB: `server/config/database.js` exports `pool` (pg.Pool) used directly in controllers.
  - Reset/seed: `server/config/reset.js` creates tables and seeds `server/data/Locations.js` and `server/data/Events.js`.

- Client: `client/` is a Vite React app. Entry: `client/src/main.jsx` -> `client/src/App.jsx` -> `client/src/pages/*`.
  - API client: `client/src/services/LocationsAPI` (fetch wrappers). Base URL: `/api/locations`.
  - Routes: React Router configured in `App.jsx`. Note some hardcoded routes (e.g. `/echolounge`) map to `LocationEvents` with index props.

Developer workflows (commands)
- Start dev environment (frontend + backend concurrently):
  - `npm run dev` (uses `concurrently` to run `vite` in `client` and `nodemon server` in `server`).
- Reset DB (drop/create/seed):
  - `npm run reset` runs `server/config/reset.js` (requires `.env` values for Postgres). This is destructive.
- Start production server (after build):
  - `npm run start` runs reset then `node --require dotenv/config server.js` in `server`.
- Build frontend: `npm run build` (runs `vite build` in `client`).

Project-specific conventions and gotchas
- Node ESM: This project uses "type": "module" in `package.json`. Use `import`/`export`. When running node server files, many scripts use `--require dotenv/config` to load `.env`.
- DB config: `server/config/dotenv.js` expects the `.env` file at the repository root (`../.env` relative to `server/config`). Keep env vars: PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE.
- Reset script pathing: `npm run reset` changes directory into `server/config` before running `reset.js`. Be careful with relative paths inside `reset.js` (they assume running from that folder).
- Favicon & static assets: `server/server.js` serves `client/public/party.png` in development and `server/public/party.png` in production. When testing locally, ensure NODE_ENV is set appropriately.
- API <-> Client matching: `client/src/services/LocationsAPI` expects the server endpoints under `/api/locations` and uses slug-based endpoints like `/api/locations/slug/:slug` (see note below).

Concrete code examples to follow when editing
- If adding a new API route, add route file in `server/routes/` and a handler in `server/controllers/` that uses `pool` from `server/config/database.js`.
- When changing DB columns, update `server/config/reset.js` so seeding and table creation remain consistent.
- Frontend API calls: prefer updating `client/src/services/LocationsAPI` so multiple components benefit.

Known inconsistencies (detect and prefer safe fixes)
- `client/src/services/LocationsAPI` currently defines:
  - `getLocationBySlug` which fetches `${BASE_URL}/slug/${slug}` and
  - `getLocationById` which fetches `${BASE_URL}/${id}`.
  But server route for slug is `GET /api/locations/:slug` (see `server/routes/locationsRouter.js`). When implementing feature work, either:
  - update `LocationsAPI.getLocationBySlug` to call `/api/locations/${slug}` or
  - add a server route that specifically matches `/api/locations/slug/:slug`.
  Prefer updating the client call unless there is a reason to keep both forms.

Quick tests & validation
- After edits: run `npm run dev` and open http://localhost:5173 (vite) and http://localhost:3000 (server) if needed. Check console for SQL errors when hitting API endpoints.
- To validate DB: run `npm run reset` then curl or browser GET `/api/locations`.

Files to reference while coding
- server: `server/server.js`, `server/routes/*`, `server/controllers/*`, `server/config/*`, `server/config/reset.js`.
- client: `client/src/services/LocationsAPI`, `client/src/pages/*`, `client/src/App.jsx`.

If you are unsure
- Prefer changing the client service (`client/src/services/LocationsAPI`) for API shape mismatches rather than adding duplicate server routes.
- Keep changes minimal and run `npm run dev` to verify both client and server start cleanly.

Ask the human for:
- Missing env values or a dev Postgres connection string to run `npm run reset` safely.
- Permission before changing the DB schema or reset script.

-- end
