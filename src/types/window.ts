// ─── App IDs ─────────────────────────────────────────────────────────────────
// Add new app IDs here as you build more windows
export type AppId = 'projects' | 'about' | 'resume' | 'contact';

// ─── Window State ─────────────────────────────────────────────────────────────
export interface WindowState {
  /** Unique instance ID (so the same app can open twice if needed) */
  id: string;
  /** Which "app" this window renders */
  appId: AppId;
  /** Title shown in the window title bar */
  title: string;
  /** Position on the desktop */
  position: { x: number; y: number };
  /** Window dimensions */
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  /** Higher = on top */
  zIndex: number;
}

// ─── Desktop Icon Config ──────────────────────────────────────────────────────
export interface DesktopIconConfig {
  appId: AppId;
  label: string;
  /** Path relative to /public, e.g. "/icons/projects.png" */
  iconSrc: string;
}
