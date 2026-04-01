'use client';

interface WindowTitleBarProps {
  title: string;
  isMaximized: boolean;
  /** Called when the user starts dragging – attach to onMouseDown */
  onDragStart: (e: React.MouseEvent) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Windows-XP-style title bar:
//   gradient background | icon + title | min / max / close buttons
//
export default function WindowTitleBar({
  title,
  isMaximized,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose,
}: WindowTitleBarProps) {
  return (
    <div
      // Attach drag handler – the parent Window handles actual position updates
      onMouseDown={onDragStart}
      onDoubleClick={onMaximize}
      className={[
        'flex items-center justify-between px-1 py-0.5 cursor-move',
        'select-none shrink-0 h-7',
        // XP blue gradient
        'bg-gradient-to-b from-[#2f6fd4] to-[#1a4da8]',
        // Top border highlight (inner bevel)
        'border-t-2 border-[#6ea3e0]',
      ].join(' ')}
    >
      {/* Title */}
      <span className="font-pixel text-white text-[8px] uppercase tracking-wider truncate px-1 [text-shadow:1px_1px_0_rgba(0,0,0,0.8)]">
        {title}
      </span>

      {/* Control buttons */}
      <div className="flex gap-px ml-2 shrink-0">
        {/* Minimise */}
        <TitleBarButton
          label="Minimise"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
        >
          _
        </TitleBarButton>

        {/* Maximise / Restore */}
        <TitleBarButton
          label={isMaximized ? 'Restore' : 'Maximise'}
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
        >
          □
        </TitleBarButton>

        {/* Close */}
        <TitleBarButton
          label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          isClose
        >
          ✕
        </TitleBarButton>
      </div>
    </div>
  );
}

// ─── Sub-component: single title-bar button ───────────────────────────────────
function TitleBarButton({
  label,
  onClick,
  isClose = false,
  children,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  isClose?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={[
        'w-5 h-5 flex items-center justify-center',
        'font-pixel text-white text-[9px] leading-none',
        'border border-[#6ea3e0] cursor-pointer',
        // Close button is red; others are grey-blue
        isClose
          ? 'bg-[#c0392b] hover:bg-[#e74c3c] active:bg-[#96281b]'
          : 'bg-[#3b7ad4] hover:bg-[#5b9ae4] active:bg-[#2a5a9a]',
        '[text-shadow:none]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
