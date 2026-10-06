# KIDO

**Small habits. Big kids.** A mobile-first PWA for parents and children ages 6–12 to build everyday habits and independence.

This repository contains the KIDO v0.1 frontend prototype. Its core loop is **Habits → Practice → Progress → Independence → Graduation**.

## Start locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## What’s in this first build

- The agreed eight screens: Landing, Add Child, Choose Goals, Starter Routine, Parent Home, Habits, Kid Today, and Kid Journey.
- Onboarding for a child profile and 1–3 habit goals.
- Parent and child modes, a practice approval loop, XP, progress, habit creation, and habit graduation.
- Install metadata and a small app-shell service worker.
- Browser-local persistence for prototype data.

## Repository map

```text
docs/technical-architecture-v0.1.md  Technical architecture and boundaries
public/                               PWA manifest, icon, service worker
src/App.jsx                           Screen routing and mode selection
src/components/                       Shared UI components
src/data/                             Goal and starter habit data
src/hooks/useKidoStore.js             Local domain state and actions
src/screens/                          The eight core screens
src/styles/tokens.css                 KIDO design tokens
src/styles/global.css                 Layout and responsive component styles
```

## Prototype data

State is stored in this browser under `kido-state-v1`. It is not synced to an account or another device. Use the browser’s site-data controls to reset the prototype.

## GitHub setup

The local repository is initialized on branch `main`. To connect it after creating an empty GitHub repository named `kido` under your account:

```bash
git remote add origin https://github.com/andyandriadoria/kido.git
git push -u origin main
```

If the remote already has a README or license, clone that repository first and copy this project into it before pushing.
