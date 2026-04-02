import type { AppId, DesktopIconConfig, WindowState } from '@/types/window';

// ─── Desktop Icons ────────────────────────────────────────────────────────────
// Controls what appears on the desktop and in what order (top → bottom).
// Replace iconSrc values with your own /public/icons/*.png files.
export const DESKTOP_ICONS: DesktopIconConfig[] = [
  {
    appId: 'projects',
    label: 'Projects',
    iconSrc: '/icons/projects.png',
  },
  {
    appId: 'about',
    label: 'About',
    iconSrc: '/icons/about.png',
  },
  {
    appId: 'resume',
    label: 'Resume',
    iconSrc: '/icons/resume.png',
  },
  {
    appId: 'contact',
    label: 'Contact',
    iconSrc: '/icons/contact.png',
  },
];

// ─── Window Defaults ──────────────────────────────────────────────────────────
// Initial size & position for each app when its window first opens.
// Positions are intentionally staggered so windows don't perfectly overlap.
export const WINDOW_DEFAULTS: Record<
  AppId,
  Pick<WindowState, 'title' | 'size' | 'position'>
> = {
  projects: {
    title: 'Projects',
    size: { width: 940, height: 480 },
    position: { x: 160, y: 40 },
  },
  about: {
    title: 'About Me',
    size: { width: 640, height: 800 },
    position: { x: 280, y: 40 },
  },
  resume: {
    title: 'Resume',
    size: { width: 640, height: 800 },
    position: { x: 240, y: 20 },
  },
  contact: {
    title: 'Contact',
    size: { width: 520, height: 400 },
    position: { x: 280, y: 30 },
  },
};
