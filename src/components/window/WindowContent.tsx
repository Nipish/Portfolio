'use client';
import { useState } from 'react';
import type { AppId } from '@/types/window';
import ResumeApp from '@/components/apps/ResumeApp';
import AboutApp from '../apps/AboutApp';
// ── Lazy-import each app so unused apps don't bloat the initial bundle ────────
// Replace placeholder content with real components as you build them.

interface WindowContentProps {
  appId: AppId;
  isMaximized: boolean;
}

/** Ordered section images (top → bottom). First loads eagerly; rest lazy-load on scroll. */
type ProjectEntry = {
  title: string;
  description: string;
  imageSrc: string;
  sectionImages: string[];
  /** Optional new-tab route that renders the same section image stack. */
  openUrl?: string;
};

const PROJECTS: ProjectEntry[] = [
  {
    title: 'Nulume',
    description:
      'Enterprise Workflow & Ticketing System for Oil & Gas',
    imageSrc: '/Projects/Nulume.png',
    sectionImages: [
      '/Projects/Nulume/Nulume-01.png',
      '/Projects/Nulume/Nulume-02.png',
      '/Projects/Nulume/Nulume-03.png',
      '/Projects/Nulume/Nulume-04.png',
      '/Projects/Nulume/Nulume-05.png',
      '/Projects/Nulume/Nulume-06.png',
      '/Projects/Nulume/Nulume-07.png',
      '/Projects/Nulume/Nulume-08.png',
    ],
    openUrl: '/projects/nulume',
  },
  {
    title: 'Pet E-commerce Onboarding Optimization',
    description:
      'Improved onboarding flow for a pet e-commerce experience to reduce friction and increase completion.',
    imageSrc: '/Projects/SUP/SUP%201.png',
    sectionImages: [
      '/Projects/SUP/SUP%201.png',
      '/Projects/SUP/SUP%202.png',
      '/Projects/SUP/SUP%203.png',
      '/Projects/SUP/SUP%204.png',
      '/Projects/SUP/SUP%205.png',
      '/Projects/SUP/SUP%206.png',
      '/Projects/SUP/SUP%207.png',
    ],
    openUrl: '/projects/project-two',
  },
  {
    title: 'Project Three',
    description:
      'Replace this with one or two lines about what the app does and why it matters.',
    imageSrc: '/icons/contact.png',
    sectionImages: ['/icons/contact.png'],
    openUrl: '/projects/project-three',
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

function ProjectSectionStack({
  title,
  sectionImages,
}: {
  title: string;
  sectionImages: string[];
}) {
  if (sectionImages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[120px] p-4 bg-[#ece9d8]">
        <p className="font-pixel text-[8px] text-[#666] uppercase text-center">
          No sections configured for this project.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {sectionImages.map((src, index) => (
        <ProjectSectionImage
          key={`${src}-${index}`}
          src={src}
          alt={`${title} — section ${index + 1}`}
          sectionIndex={index + 1}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

function ProjectSectionImage({
  src,
  alt,
  sectionIndex,
  priority,
}: {
  src: string;
  alt: string;
  sectionIndex: number;
  priority: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full border-b border-[#aca899] last:border-b-0 bg-[#ece9d8] px-4 py-8 flex flex-col items-center justify-center gap-2">
        <span className="font-pixel text-[8px] text-[#1a1a1a] uppercase">
          Section {sectionIndex} failed to load
        </span>
        <span className="font-pixel text-[7px] text-[#666] uppercase break-all text-center max-w-full">
          {src}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-[#aca899] last:border-b-0 bg-white shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block align-top max-w-full"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function ProjectsApp({ isMaximized }: { isMaximized: boolean }) {
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);

  if (activeProject) {
    return (
      <AppShell title="My Projects" showHeader={false}>
        <div className="h-full flex flex-col gap-2 min-h-0">
          <div className="flex items-center gap-2 font-pixel text-[7px] text-[#1a1a1a] uppercase flex-wrap shrink-0">
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="px-2 py-1 bg-[#ece9d8] border border-[#808080] hover:bg-[#d4d0c8]"
            >
              Back
            </button>
            <span className="text-[#666]">Projects</span>
            <span className="text-[#666]">/</span>
            <span>{activeProject.title}</span>
            {activeProject.openUrl ? (
              <>
                <span className="text-[#666] hidden sm:inline">|</span>
                <a
                  href={activeProject.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-2 py-1 bg-[#ece9d8] border border-[#808080] hover:bg-[#d4d0c8] no-underline text-[#1a1a1a]"
                >
                  Open in New Tab
                </a>
              </>
            ) : null}
          </div>

          <div
            className={`flex-1 min-h-0 bg-white border border-[#808080] overflow-y-auto overflow-x-hidden ${
              isMaximized ? '-mx-4' : ''
            }`}
          >
            <ProjectSectionStack
              title={activeProject.title}
              sectionImages={activeProject.sectionImages}
            />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="My Projects" showHeader={false}>
      <div className={`grid gap-3 ${isMaximized ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {PROJECTS.map((project) => (
          <button
            type="button"
            key={project.title}
            onClick={() => setActiveProject(project)}
            className="text-left bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-3 flex flex-col gap-2 hover:bg-[#d4d0c8]"
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
          </button>
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
  showHeader = false,
}: {
  title: string;
  children: React.ReactNode;
  showHeader?: boolean;
}) {
  return (
    <div className="p-4 h-full flex flex-col gap-3">
      {showHeader ? (
        <h2 className="font-pixel text-[10px] text-[#1a1a1a] uppercase tracking-wider border-b border-[#ccc] pb-2">
          {title}
        </h2>
      ) : null}
      <div className="flex-1">{children}</div>
    </div>
  );
}
