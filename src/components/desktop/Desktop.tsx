'use client';

import { DESKTOP_ICONS } from '@/lib/constants';
import { useWindowManager } from '@/hooks/useWindowManager';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import WindowManager from '@/components/window/WindowManager';

// ─── Component ────────────────────────────────────────────────────────────────
//
// The full-screen desktop canvas.
//
// Layout:
//   • Background  – tiled pixel-art wallpaper via bg-repeat (no cover zoom)
//   • Left column – vertical list of desktop icons
//   • Overlay     – all open windows are rendered on top via WindowManager
//
export default function Desktop() {
  const wm = useWindowManager();

  return (
    // ── Root canvas ─────────────────────────────────────────────────────────
    // overflow-hidden stops scrollbars; position:relative anchors windows
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        // Tiled wallpaper – bg-repeat + auto size avoids any zoom / stretching.
        // Replace with your own /public/wallpaper.png
        backgroundImage: "url('/wallpaper.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#008080', // fallback teal if image fails
      }}
    >
      {/* ── Desktop icons column ──────────────────────────────────────────── */}
      <nav
        aria-label="Desktop icons"
        className="absolute top-8 left-4 flex flex-col gap-6 z-40"
      >
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.appId}
            {...icon}
            onClick={() => wm.openWindow(icon.appId)}
          />
        ))}
      </nav>

      {/* ── Open windows ──────────────────────────────────────────────────── */}
      {/* WindowManager renders nothing if no windows are open */}
      <WindowManager
        windows={wm.windows}
        onClose={wm.closeWindow}
        onMinimize={wm.minimizeWindow}
        onMaximize={wm.maximizeWindow}
        onFocus={wm.focusWindow}
        onUpdatePosition={wm.updatePosition}
      />
    </div>
  );
}
