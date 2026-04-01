# ARCHITECT_OS — XP Portfolio

A Windows XP-style pixel-art portfolio built with **Next.js 14 (App Router)** + **Tailwind CSS**.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Assets to add

Place these files in `/public/` before running:

| File | Description |
|---|---|
| `public/wallpaper.png` | Desktop background (tiled — any size works) |
| `public/icons/projects.png` | Projects icon (64×64 or 96×96 px recommended) |
| `public/icons/about.png` | About icon |
| `public/icons/resume.png` | Resume icon |
| `public/icons/contact.png` | Contact icon |

> **Tip:** Use 96×96 pixel-art sprites with `image-rendering: pixelated` — they scale perfectly.

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout, loads Press Start 2P font
│   ├── page.tsx            ← Renders <Desktop />
│   └── globals.css         ← Tailwind + CSS tokens
│
├── components/
│   ├── desktop/
│   │   ├── Desktop.tsx     ← Full-screen canvas + icon grid
│   │   └── DesktopIcon.tsx ← Single icon button
│   │
│   └── window/
│       ├── WindowManager.tsx   ← Renders all open windows
│       ├── Window.tsx          ← Draggable frame + title bar
│       ├── WindowTitleBar.tsx  ← Min / Max / Close buttons
│       └── WindowContent.tsx  ← Routes appId → app component
│
├── hooks/
│   └── useWindowManager.ts ← All open/close/focus/drag state
│
├── lib/
│   └── constants.ts        ← Icon list + window size defaults
│
└── types/
    └── window.ts           ← TypeScript types
```

---

## Adding a New App

1. Add its `AppId` to `src/types/window.ts`
2. Add its icon config to `DESKTOP_ICONS` in `src/lib/constants.ts`
3. Add its default window size to `WINDOW_DEFAULTS` in `src/lib/constants.ts`
4. Create `src/components/apps/YourApp.tsx`
5. Add a `case 'yourAppId'` in `src/components/window/WindowContent.tsx`

---

## Deploy to Vercel

```bash
npx vercel
```

Zero config needed — Next.js is detected automatically.
