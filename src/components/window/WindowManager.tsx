import type { WindowState } from '@/types/window';
import Window from './Window';

interface WindowManagerProps {
  windows: WindowState[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdatePosition: (id: string, pos: WindowState['position']) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Renders every open window.  The manager itself has no visual presence –
// it just maps the windows array to individual <Window> components.
//
// All callbacks are partially-applied here so each <Window> only needs
// to call e.g. onClose() with no arguments.
//
export default function WindowManager({
  windows,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
}: WindowManagerProps) {
  return (
    <>
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          onClose={() => onClose(win.id)}
          onMinimize={() => onMinimize(win.id)}
          onMaximize={() => onMaximize(win.id)}
          onFocus={() => onFocus(win.id)}
          onUpdatePosition={(pos) => onUpdatePosition(win.id, pos)}
        />
      ))}
    </>
  );
}
