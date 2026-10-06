# KIDO

**Small habits. Big kids.** KIDO adalah mobile-first family habit-building PWA untuk membantu anak usia 6–12 tahun membangun kebiasaan, tanggung jawab, dan kemandirian.

Core loop:

**Habits → Practice → Progress → Independence → Graduation**

## Current status — v0.1.2 UX Simplification

KIDO saat ini adalah functional local MVP prototype. Data masih tersimpan di browser dan belum memiliki cloud account/backend.

### Yang sudah berjalan

- Onboarding 3 langkah dengan maksimal 4 starter habits.
- Bahasa Indonesia sebagai UI default.
- Habit Library dengan **Quick Add** dan opsi **Customize**.
- Habit aktif dapat **Edit / Pause / Archive**.
- Pause tidak menghitung hari jeda sebagai kegagalan progress.
- Kid Today dikelompokkan menjadi **Pagi / Sepulang sekolah / Kapan saja / Malam**.
- Typography dan touch target Kid Mode diperbesar.
- Parent Progress dipisahkan dari Kid Journey.
- Parent PIN menjadi langkah terakhir onboarding, lalu langsung membuka Kid Today.
- XP, level, weekly progress, streak, parent approval, dan habit graduation menggunakan data nyata.
- Responsive pass untuk layar kecil dan modal dengan keyboard.
- GitHub Actions menjalankan test, build, dan deploy ke GitHub Pages.

## Local development

```bash
npm install
npm test
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Struktur penting

```text
src/domain/habits.js                 Aturan schedule, pause, streak, level, graduation
src/data/constants.js                Goals, starter habits, Habit Library
src/hooks/useKidoStore.js            State lokal dan habit actions
src/components/HabitLibraryModal.jsx Quick Add flow
src/components/Modal.jsx             Habit editor
src/screens/ParentProgressScreen.jsx Insight khusus orang tua
src/screens/KidTodayScreen.jsx       Daily experience anak
tests/habits.test.js                 Domain tests
```

## Privacy boundary

Versi ini hanya menyimpan nickname, age, avatar, habits, dan progress di browser. Parent PIN adalah convenience gate, bukan keamanan kriptografis.

Sebelum KIDO menyimpan data keluarga di cloud, v0.2 harus menambahkan authentication, server-side authorization, data export/deletion, dan privacy review khusus data anak.
