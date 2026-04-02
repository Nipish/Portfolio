'use client';

// ─── About Me Content ─────────────────────────────────────────────────────────
// Replace the placeholder strings below with your real content.
// Each section is clearly labelled.

const ABOUT = {
  name: 'NIPISH SAINI',
  role: 'PRODUCT DESIGNER | UX/UI DESIGNER',
  location: 'India',
  bio: `I design digital products. Mostly the kind that shouldn’t need explaining. Started out with Computer Science, ended up caring more about why things feel confusing than how they work. Been doing UI/UX for about 4+ years now  mostly in startups where things move fast and you don’t always get clear answers. I like figuring things out. Taking something messy, breaking it down, and making it feel simple again.`,

  skills: [
    'Experience Design',
    'Design Systems',
    'Branding',
    'User Interface',
    'Visual Design',
    'Prototyping',
    'User Research',
    'Microinteractions',
    'Generative AI',
    'Vibecoding',
  ],

  experience: [
    {
      role: 'Product Designer',
      company: 'Hcode Technologies',
      period: 'Jan 2026 – Present',
      description: 'One line about what you did here.',
    },
    {
      role: 'UI/UX Designer',
      company: 'Infinite Locus',
      period: 'May 2023 – Apr 2025',
      description: 'One line about what you did here.',
    },
    {
        role: 'UI/UX Designer',
        company: 'FinAgg Technologies',
        period: 'Jan 2022 – May 2023',
        description: 'One line about what you did here.',
      },
  ],

  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nipish-saini/' },
    { label: 'Behance', url: 'https://www.behance.net/nipishsaini' },
    { label: 'Dribbble',   url: 'https://dribbble.com/Nipish' },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto bg-[#ece9d8] p-4 flex flex-col gap-4">

      {/* ── Header: name + role ───────────────────────────────────────────── */}
      <div className="flex items-start gap-4 pb-3 border-b-2 border-[#aca899]">
        {/* Avatar placeholder – replace src with your own photo in /public */}
        <div className="w-16 h-16 shrink-0 bg-[#d4d0c8] border-2 border-[#808080] flex items-center justify-center">
          <span className="font-pixel text-[18px]">👤</span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-pixel text-[11px] text-[#1a1a1a] uppercase tracking-wide">
            {ABOUT.name}
          </h1>
          <p className="font-pixel text-[8px] text-[#316AC5] uppercase tracking-wide">
            {ABOUT.role}
          </p>
          <p className="font-pixel text-[7px] text-[#666] uppercase">
            📍 {ABOUT.location}
          </p>
        </div>
      </div>

      {/* ── Bio ───────────────────────────────────────────────────────────── */}
      <Section title="About">
        <p className="font-pixel text-[9px] text-[#333] leading-loose whitespace-pre-line">
          {ABOUT.bio}
        </p>
      </Section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {ABOUT.skills.map((skill) => (
            <span
              key={skill}
              className="font-pixel text-[7px] text-[#1a1a1a] uppercase px-2 py-1 bg-[#d4d0c8] border border-[#808080]"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <Section title="Experience">
        <div className="flex flex-col gap-3">
          {ABOUT.experience.map((job) => (
            <div
              key={job.company}
              className="border-l-2 border-[#316AC5] pl-3 flex flex-col gap-0.5"
            >
              <span className="font-pixel text-[8px] text-[#1a1a1a] uppercase">
                {job.role}
              </span>
              <span className="font-pixel text-[7px] text-[#316AC5] uppercase">
                {job.company}
              </span>
              <span className="font-pixel text-[7px] text-[#666] uppercase">
                {job.period}
              </span>
              <p className="font-pixel text-[7px] text-[#444] leading-relaxed mt-1">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Links ────────────────────────────────────────────────────────── */}
      <Section title="Links">
        <div className="flex flex-wrap gap-2">
          {ABOUT.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-[#1a1a1a] uppercase px-3 py-1 bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#d4d0c8] no-underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </Section>

    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-pixel text-[8px] text-[#1a1a1a] uppercase tracking-wider bg-[#d4d0c8] px-2 py-1 border-l-4 border-[#316AC5]">
        {title}
      </h2>
      {children}
    </div>
  );
}