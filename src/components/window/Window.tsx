'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { WindowState } from '@/types/window';
import WindowTitleBar from './WindowTitleBar';
import WindowContent from './WindowContent';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdatePosition: (pos: WindowState['position']) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// A single draggable window frame.
//
// Drag is handled entirely with mouse events so it works without any
// extra library. Position state lives in the parent (useWindowManager).
//
export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
}: WindowProps) {
  // Track drag delta between mousemove calls
  const dragOffset = useRef<{ x: number; y: number } | null>(null);

  // ── Drag handlers ──────────────────────────────────────────────────────
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return; // can't drag a maximised window
      e.preventDefault();
      onFocus();
      dragOffset.current = {
        x: e.clientX - win.position.x,
        y: e.clientY - win.position.y,
      };
    },
    [win.isMaximized, win.position, onFocus]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragOffset.current) return;
      onUpdatePosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const handleMouseUp = () => {
      dragOffset.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onUpdatePosition]);

  // Close on Escape key when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // ── Derived styles ─────────────────────────────────────────────────────
  const positionStyle = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%' }
    : {
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
      };

  if (win.isMinimized) return null;

  return (
    <div
      role="dialog"
      aria-label={win.title}
      style={{ ...positionStyle, zIndex: win.zIndex }}
      onMouseDown={onFocus}
      className={[
        'absolute flex flex-col overflow-hidden',
        // XP classic border: outer dark, inner light (bevel effect)
        'border-2 border-[#003c7e] outline outline-1 outline-[#6ea3e0]',
        // Window body colour
        'bg-[#ece9d8]',
        // Soft pixel shadow
        '[box-shadow:4px_4px_0_rgba(0,0,0,0.5)]',
      ].join(' ')}
    >
      {/* Title bar – handles drag */}
      <WindowTitleBar
        title={win.title}
        isMaximized={win.isMaximized}
        onDragStart={handleDragStart}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />

      {/* Menu bar placeholder (expand later) */}
      <div className="flex items-center gap-4 px-2 py-0.5 bg-[#ece9d8] border-b border-[#aca899]">
        {['File', 'Edit', 'View', 'Help'].map((item) => (
          <span
            key={item}
            className="font-pixel text-[8px] text-[#1a1a1a] uppercase hover:bg-[#316ac5] hover:text-white px-1 py-0.5 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Content area – each app renders here */}
      <div className="flex-1 overflow-auto bg-white border border-[#aca899] m-1">
        <WindowContent appId={win.appId} />
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-0.5 bg-[#ece9d8] border-t border-[#aca899]">
        <span className="font-pixel text-[7px] text-[#444] uppercase tracking-wide">
          {win.title}
        </span>
      </div>
    </div>
  );
}
