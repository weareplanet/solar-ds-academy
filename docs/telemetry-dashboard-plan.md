# Telemetry Dashboard Plan

## Architecture

Static GitHub Pages academy app fires events to a **separate Vercel-deployed Next.js app** (`telemetry/`) in the same repo. MongoDB free tier stores all events.

```
┌─────────────────────────┐         ┌─────────────────────────────┐
│  GitHub Pages (static)  │  POST   │  Vercel (telemetry/)        │
│  solar-ds-academy/      │ ──────> │  /api/events                │
│                         │         │  /api/dashboard/*            │
│  + telemetry client     │         │  / (dashboard UI)            │
│    (sends events)       │         │  MongoDB free tier           │
└─────────────────────────┘         └─────────────────────────────┘
```

## Phase 1 — Telemetry Vercel App Setup

1. **Scaffold `telemetry/` Next.js app** — own `package.json` with `next`, `react`, `mongodb`, `recharts`, `tailwindcss`. No `output: 'export'`.
2. **MongoDB connection utility** (`telemetry/src/lib/mongodb.ts`) — singleton `MongoClient` cached in `globalThis`. Database: `solar-academy-telemetry`. Collections: `events`, `sessions`. Reads `MONGODB_URI` env var.
3. **Event ingestion API** (`telemetry/src/app/api/events/route.ts`) — POST handler. CORS allows `weareplanet.github.io` + `localhost`. Validates required fields, inserts into `events` collection.
   - Event schema: `event`, `userId`, `userName`, `userEmail`, `moduleId?`, `quizScore?`, `quizTotal?`, `quizPassed?`, `badgeLevel?`, `page?`, `sessionId`, `timestamp`.
4. **Heartbeat API** (`telemetry/src/app/api/heartbeat/route.ts`) — POST, upserts into `sessions` to track time-on-page.

## Phase 2 — Telemetry Client in Academy App

5. **Create `src/lib/telemetry.ts`** — fire-and-forget `trackEvent()` using `fetch` (or `sendBeacon` on unload). No-ops if `NEXT_PUBLIC_TELEMETRY_URL` unset. Generates per-session `sessionId` via `sessionStorage`.
6. **Create `src/hooks/useTelemetry.ts`** — React hook that auto-attaches `userId`, `userName`, `userEmail` from `useAuth()`. Includes `useHeartbeat(moduleId)` sending pings every 30s.
7. **Instrument existing components** (minimal `useEffect` additions):
   - `HomePage.tsx` — `page_view`
   - `ModulePage.tsx` — `page_view`, `module_started`, heartbeat
   - `ExercisePage.tsx` — `page_view`, heartbeat
   - `QuizEngine.tsx` — `quiz_started`, `quiz_completed` (with score/total/passed)
   - `ProgressTracker.tsx` — `badge_earned` on level change
   - `AuthGate.tsx` — `login` after successful auth

## Phase 3 — Dashboard UI

8. **Dashboard API routes** in `telemetry/src/app/api/dashboard/`:
   - `stats/` — total users, sessions, DAU/WAU, avg completion rate
   - `modules/` — per-module funnel (started → exercised → quizzed → completed), quiz pass/fail rates
   - `users/` — paginated user progress table (name, email, modules completed, last active, badge)
   - `timeseries/` — daily event counts for past 30 days
   - `leaderboard/` — top performers by completion + quiz scores

9. **Dashboard page** (`telemetry/src/app/page.tsx`) — 6 sections:
   - Summary stat cards (total users, active today, modules completed, avg quiz score)
   - Time-series area chart (DAU + events over time, Recharts)
   - Module completion funnel (horizontal bars)
   - Quiz pass/fail rates (stacked bars per module)
   - Sortable user progress table
   - Leaderboard (top 10)

10. **Dashboard components**: `StatCard`, `TimeSeriesChart`, `ModuleFunnel`, `QuizRatesChart`, `UserTable`, `Leaderboard`

## Phase 4 — Deployment & Config

11. **Vercel setup** — root directory `telemetry/`, add `MONGODB_URI` env var. MongoDB indexes on `events`: `timestamp`, `userId`, `event`, `moduleId`.
12. **Academy env config** — set `NEXT_PUBLIC_TELEMETRY_URL` in GitHub Actions secrets for static build.

## Event Types

| Event | Trigger | Extra Fields |
|-------|---------|-------------|
| `login` | After MSAL auth | — |
| `page_view` | Component mount | `page`, `moduleId?` |
| `module_started` | Module page mount | `moduleId` |
| `quiz_started` | Quiz begin | `moduleId` |
| `quiz_completed` | Quiz submit | `moduleId`, `quizScore`, `quizTotal`, `quizPassed` |
| `badge_earned` | Badge level change | `badgeLevel` |
| `heartbeat` | Every 30s on module/exercise | `moduleId` |

## Phase 5 — Cross-Device Progress Sync

Uses the same Vercel app + MongoDB to persist user progress, enabling cross-device continuity.

### Backend (telemetry/)

- **`progress` collection** in MongoDB — document: `{ userId, userEmail, userName, modules: ProgressData, lastSyncedAt }`. Unique index on `userId`.
- **`telemetry/src/app/api/progress/route.ts`** — GET `?userId=...` returns stored progress; PUT receives `{ userId, userEmail, userName, modules }`, performs per-module merge (newer `updatedAt` wins), upserts.

### Frontend (academy app)

- **`src/lib/progressSync.ts`** (or in `telemetry.ts`) — `fetchRemoteProgress(userId)` and `pushProgress(userId, email, name, modules)`. No-op if `NEXT_PUBLIC_TELEMETRY_URL` unset.
- **Modify `ProgressProvider`** in `src/components/ProgressTracker.tsx`:
  - On mount: load localStorage → fetch remote → merge per-module by `updatedAt` → persist merged to both
  - On every `persist()`: also fire-and-forget `pushProgress()` to API
  - Use `account.homeAccountId` as userId, `account.name`, `account.username` as email
- **Merge algorithm** `mergeProgress(local, remote)`: union moduleIds, keep entry with newer `updatedAt`; on tie prefer `completed` status.

### Key decisions
- No real-time sync (no WebSocket) — syncs on page load + each action
- localStorage remains primary for speed; remote sync is non-blocking
- Server-side merge on PUT prevents concurrent overwrites
- Graceful degradation: if API unreachable, app works from localStorage

## Verification Checklist

- [ ] POST test event to `/api/events` → appears in MongoDB
- [ ] Academy with `NEXT_PUBLIC_TELEMETRY_URL` set → events stored
- [ ] Dashboard renders all 6 sections
- [ ] CORS works from `weareplanet.github.io`
- [ ] Heartbeat: stay on module 60s+ → `sessions` updated
- [ ] Graceful degradation: unset telemetry URL → no errors
- [ ] Both `npm run build` (root) and `cd telemetry && npm run build` succeed
- [ ] Clear localStorage, login → remote progress loads from MongoDB
- [ ] Complete module on device A → open device B → progress appears
- [ ] Different progress on two devices → merge keeps newest per module
- [ ] API returns 500 → app still works from localStorage
