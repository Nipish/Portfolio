'use client';
import type { AppId } from '@/types/window';
import ResumeApp from '@/components/apps/ResumeApp';
import AboutApp from '../apps/AboutApp';
// ── Lazy-import each app so unused apps don't bloat the initial bundle ────────
// Replace placeholder content with real components as you build them.

interface WindowContentProps {
  appId: AppId;
  isMaximized: boolean;
}

const PROJECTS = [
  {
    title: 'Nulume',
    description:
      'A retro desktop-style portfolio with draggable windows and app-like sections.',
    imageSrc: '/Projects/Nulume.png',
  },
  {
    title: 'Project Two',
    description:
      'Replace this with a short summary of your second project and impact.',
    imageSrc: '/icons/about.png',
  },
  {
    title: 'Project Three',
    description:
      'Replace this with one or two lines about what the app does and why it matters.',
    imageSrc: '/icons/contact.png',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
//
// Acts as a router: given an appId, renders the matching app component.
// Add a new case here every time you build a new app.
//
export default function WindowContent({ appId, isMaximized }: WindowContentProps) {
  switch (appId) {
    case 'projects':
      return <ProjectsApp isMaximized={isMaximized} />;
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

function ProjectsApp({ isMaximized }: { isMaximized: boolean }) {
  return (
    <AppShell title="My Projects">
      <div className={`grid gap-3 ${isMaximized ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-3 flex flex-col gap-2"
          >
            <div className="w-full aspect-video bg-[#d4d0c8] border border-[#808080] overflow-hidden">
              <img
                src={project.imageSrc}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-pixel text-[9px] text-[#1a1a1a] uppercase tracking-wide">
              {project.title}
            </h3>
            <p className="font-pixel text-[7px] text-[#333] leading-relaxed">
              {project.description}
            </p>
          </article>
        ))}
      </div>
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
