# KIDO

**Small habits. Big kids.** KIDO is a mobile-first family habit-building PWA for parents and children ages 6–12.

The product loop is:

**Habits → Practice → Progress → Independence → Graduation**

## Current status — v0.1.1 Core Stabilization

KIDO is an interactive frontend prototype with real local habit logic. It is still a single-device prototype: there is no cloud account, server sync, subscription, or production child-data backend yet.

### Included now

- Landing and three-step onboarding.
- Starter habits for every onboarding goal.
- Parent and Kid modes.
- Day-of-week schedules.
- Per-habit XP values and derived levels.
- Real daily completion, weekly progress, and streak calculations.
- Optional parent approval per habit.
- 4-digit Parent PIN gate when returning from Kid Mode.
- Habit lifecycle: Learning → Building → Consistent → Ready to Graduate → Graduated.
- Graduation requires at least 30 scheduled opportunities and at least 85% completion over the latest 30.
- “Things I Can Do By Myself” graduation history.
- Browser-local persistence under `kido-state-v2`.
- PWA manifest and service worker that work under the GitHub Pages `/kido/` base path.
- GitHub Actions build checks and Pages deployment.

## Local development

```bash
npm ci
npm test
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Repository map

```text
.github/workflows/deploy-pages.yml       Build validation and GitHub Pages deploy
docs/technical-architecture-v0.1.md      Architecture baseline and v0.1.1 notes
public/                                  PWA manifest, icon, service worker
src/App.jsx                              Screen routing, role switching, Parent PIN gate
src/components/                          Shared UI components
src/data/                                Goal and starter habit data
src/domain/habits.js                     Schedule, streak, level and graduation rules
src/hooks/useKidoStore.js                Local state and habit actions
src/screens/                              Core product screens
src/styles/                               Design tokens and responsive styles
tests/habits.test.js                      Domain rule tests using Node's built-in test runner
```

## Prototype privacy boundary

The current build stores a nickname, age, avatar, habits and progress only in the browser. The Parent PIN is a convenience gate stored on the same device; it is **not cryptographic security**.

Authentication, server-side storage, export/deletion, caregiver sharing, and a formal child-privacy review must be designed before KIDO collects real family data in the cloud.

## GitHub Pages

The Vite production base is `/kido/`. Pushes to `main` are built and deployed by GitHub Actions.

If the repository is still configured to deploy Pages from a branch, change **Settings → Pages → Build and deployment → Source** to **GitHub Actions** once the deployment workflow is merged.
