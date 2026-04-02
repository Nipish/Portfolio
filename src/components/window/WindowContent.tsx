'use client';
import type { AppId } from '@/types/window';
import ResumeApp from '@/components/apps/ResumeApp';
import AboutApp from '../apps/AboutApp';
// ── Lazy-import each app so unused apps don't bloat the initial bundle ────────
// Replace placeholder content with real components as you build them.

interface WindowContentProps {
  appId: AppId;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Acts as a router: given an appId, renders the matching app component.
// Add a new case here every time you build a new app.
//
export default function WindowContent({ appId }: WindowContentProps) {
  switch (appId) {
    case 'projects':
      return <ProjectsApp />;
    case 'about':
      return <AboutAppComponent />;
    case 'resume':
      return <ResumeAppComponent />;
    case 'contact':
      return <ContactApp />;
    default:
      return <PlaceholderApp appId={appId} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder apps – replace each with a real component in /src/components/apps/
// ─────────────────────────────────────────────────────────────────────────────

function ProjectsApp() {
  return (
    <AppShell title="My Projects">
      <p className="font-pixel text-[9px] text-[#333] leading-relaxed">
        Replace this with your <strong>ProjectsApp</strong> component.
        <br />
        <br />
        📁 /src/components/apps/ProjectsApp.tsx
      </p>
    </AppShell>
  );
}

function AboutAppComponent() {
  return (
    <AppShell title="About Me">
    <AboutApp />
    </AppShell>
  );
}

function ResumeAppComponent() {
  return (
    <AppShell title="Resume">
  <ResumeApp />
    </AppShell>
  );
}

function ContactApp() {
  return (
    <AppShell title="Contact">
      <p className="font-pixel text-[9px] text-[#333] leading-relaxed">
        Replace this with your <strong>ContactApp</strong> component.
        <br />
        <br />
        📁 /src/components/apps/ContactApp.tsx
      </p>
    </AppShell>
  );
}

// ─── Generic fallback ────────────────────────────────────────────────────────
function PlaceholderApp({ appId }: { appId: string }) {
  return (
    <AppShell title={appId}>
      <p className="font-pixel text-[9px] text-[#333]">
        No app registered for "{appId}".
      </p>
    </AppShell>
  );
}

// ─── Shared inner layout wrapper ─────────────────────────────────────────────
function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 h-full flex flex-col gap-3">
      <h2 className="font-pixel text-[10px] text-[#1a1a1a] uppercase tracking-wider border-b border-[#ccc] pb-2">
        {title}
      </h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}
