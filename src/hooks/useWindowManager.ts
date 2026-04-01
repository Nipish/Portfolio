'use client';

import { useCallback, useState } from 'react';
import { WINDOW_DEFAULTS } from '@/lib/constants';
import type { AppId, WindowState } from '@/types/window';

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState(100);

  // ── Open a new window (or un-minimize if already open) ───────────────────
  const openWindow = useCallback(
    (appId: AppId) => {
      // If already open & minimized → just restore it
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: topZ + 1 }
              : w
          )
        );
        setTopZ((z) => z + 1);
        return;
      }

      const defaults = WINDOW_DEFAULTS[appId];
      const newZ = topZ + 1;

      const newWindow: WindowState = {
        id: `${appId}-${Date.now()}`,
        appId,
        title: defaults.title,
        position: defaults.position,
        size: defaults.size,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
      };

      setWindows((prev) => [...prev, newWindow]);
      setTopZ(newZ);
    },
    [windows, topZ]
  );

  // ── Close ─────────────────────────────────────────────────────────────────
  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // ── Minimise ──────────────────────────────────────────────────────────────
  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  // ── Maximise toggle ───────────────────────────────────────────────────────
  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  // ── Bring to front on click ───────────────────────────────────────────────
  const focusWindow = useCallback(
    (id: string) => {
      const newZ = topZ + 1;
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
      setTopZ(newZ);
    },
    [topZ]
  );

  // ── Update position after drag ────────────────────────────────────────────
  const updatePosition = useCallback(
    (id: string, position: WindowState['position']) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  };
}
