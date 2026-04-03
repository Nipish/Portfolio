import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';

// ─── Pixel font ───────────────────────────────────────────────────────────────
// next/font automatically self-hosts the font → zero layout shift, no CLS
const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',   // exposed as a CSS variable
  display: 'swap',
});
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
});
// ─── SEO metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'ARCHITECT_OS v1.0.4',
  description: 'Portfolio — Windows XP pixel-art style desktop',
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${vt323.variable}`}>
      {/*
       * font-[family-name:var(--font-pixel)] sets the pixel font as the
       * default for the whole app. Individual components can override it.
       */}
      <body className="font-[family-name:var(--font-vt323)] antialiased">
        {children}
      </body>
    </html>
  );
}
