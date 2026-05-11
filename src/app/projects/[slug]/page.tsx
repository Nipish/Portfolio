import { notFound } from 'next/navigation';

type ProjectPageData = {
  title: string;
  sectionImages: string[];
};

const PROJECT_PAGES: Record<string, ProjectPageData> = {
  nulume: {
    title: 'Nulume',
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
  },
  'project-two': {
    title: 'Pet E-commerce Onboarding Optimization',
    sectionImages: [
      '/Projects/SUP/SUP%201.png',
      '/Projects/SUP/SUP%202.png',
      '/Projects/SUP/SUP%203.png',
      '/Projects/SUP/SUP%204.png',
      '/Projects/SUP/SUP%205.png',
      '/Projects/SUP/SUP%206.png',
      '/Projects/SUP/SUP%207.png',
    ],
  },
  'project-three': {
    title: 'Project Three',
    sectionImages: ['/icons/contact.png'],
  },
};

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECT_PAGES[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="h-screen overflow-y-auto bg-[#ece9d8] py-6">
      <div className="mx-auto w-full max-w-5xl border border-[#808080] bg-white overflow-hidden">
        <div className="px-3 py-2 border-b border-[#aca899] bg-[#ece9d8] font-pixel text-[9px] text-[#1a1a1a] uppercase tracking-wide">
          {project.title}
        </div>
        <div className="flex flex-col w-full">
          {project.sectionImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`${project.title} section ${index + 1}`}
              className="w-full h-auto block border-b border-[#aca899] last:border-b-0"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
