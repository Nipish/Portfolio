'use client';

import Image from 'next/image';
import type { DesktopIconConfig } from '@/types/window';

interface DesktopIconProps extends DesktopIconConfig {
  onClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// A single desktop icon: pixel-art image + label underneath.
// Hover → slight scale-up (matches original CSS).
// onClick fires openWindow() from the parent Desktop.
//
export default function DesktopIcon({
  label,
  iconSrc,
  onClick,
}: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open ${label}`}
      className={[
        // Reset
        'border-none bg-transparent outline-none cursor-pointer',
        // Layout
        'flex flex-col items-center gap-1 w-24',
        // Hover scale (no cover-zoom issues – pure transform)
        'transition-transform duration-75 hover:scale-105 active:scale-95',
        // Keyboard focus ring (accessibility)
        'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1',
      ].join(' ')}
    >
      {/* Icon image – rendered at exact pixel size, no distortion */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Image
          src={iconSrc}
          alt={label}
          width={80}
          height={80}
          // pixelated keeps crisp edges on pixel-art sprites
          className="object-contain"
          style={{ imageRendering: 'pixelated' }}
          // Unoptimised keeps the exact pixels; remove if using Next image optimisation
          unoptimized
        />
      </div>

      {/* Label */}
      <span
        className={[
          'font-pixel text-white text-center leading-tight',
          'text-[10px] uppercase tracking-wide',
          // Hard drop-shadow for legibility on any background
          '[text-shadow:1px_1px_0_rgba(0,0,0,0.9),_-1px_-1px_0_rgba(0,0,0,0.6)]',
        ].join(' ')}
      >
        {label}
      </span>
    </button>
  );
}
