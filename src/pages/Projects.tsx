import { useRef } from 'react'
import { Eye, FileText, Code2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCursorHover } from '@/hooks/useCursorHover'
import { PROJECTS, type Project } from '@/data/projects'

const STATUS_COLORS: Record<Project['status'], string> = {
  'LIVE DEMO': 'border-foreground text-foreground',
  STABLE: 'border-foreground text-foreground',
  WIP: 'border-muted-foreground text-muted-foreground',
  ARCHIVE: 'border-muted-foreground text-muted-foreground',
}

export function Projects() {
  const totalProjects = PROJECTS.length
  const lastUpdated = '2024.07.12_18:30:00'
  const loadArchivesRef = useRef<HTMLButtonElement>(null)

  useCursorHover(loadArchivesRef)

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-24 pt-28">
      {/* Header */}
      <section className="mb-12 border-l-2 border-foreground pl-6">
        <h1
          className="mb-4 font-mono text-5xl font-bold uppercase tracking-tight text-foreground"
          style={{ letterSpacing: '-0.01em' }}
        >
          Engineered Artifacts
        </h1>
        <p
          className="max-w-[540px] text-[17px] leading-relaxed text-muted-foreground"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          A selection of technical implementations, open-source contributions,
          and algorithmic experiments. Every project is built with a focus on
          performance and minimalist structural integrity.
        </p>
      </section>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* Placeholder card */}
        <div className="flex flex-col items-center justify-center border border-dashed border-border p-8 text-center">
          <Plus className="mb-3 size-8 text-muted-foreground opacity-30" />
          <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground opacity-50">
            INITIALIZING NEW ARTIFACT ...
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground opacity-30">
            AWAITING COMMIT
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            TOTAL PROJECTS:{' '}
            <span className="text-foreground">{String(totalProjects).padStart(3, '0')}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            LAST UPDATED: <span className="text-foreground">{lastUpdated}</span>
          </p>
        </div>
        <button
          ref={loadArchivesRef}
          className="border border-foreground px-5 py-2.5 font-mono text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2"
        >
          LOAD ARCHIVES
        </button>
      </div>
    </main>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)

  useCursorHover(cardRef)

  return (
    <article
      ref={cardRef}
      className="group flex flex-col border border-border p-6 transition-colors hover:bg-card focus-within:bg-card"
    >
      {/* Header row */}
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
          {project.category}
        </span>
        <span
          className={cn(
            'border px-2 py-0.5 font-mono text-xs tracking-widest uppercase',
            STATUS_COLORS[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Title + description */}
      <h2
        className="mb-3 text-xl font-semibold text-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {project.title}
      </h2>
      <p
        className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="mb-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {project.links.source && (
          <ProjectLink href={project.links.source} label={`View source for ${project.title}`}>
            VIEW SOURCE <Code2 className="size-3" />
          </ProjectLink>
        )}
        {project.links.demo && (
          <ProjectLink href={project.links.demo} label={`Live demo for ${project.title}`}>
            LIVE DEMO <Eye className="size-3" />
          </ProjectLink>
        )}
        {project.links.docs && (
          <ProjectLink href={project.links.docs} label={`Documentation for ${project.title}`}>
            DOCUMENTATION <FileText className="size-3" />
          </ProjectLink>
        )}
        {project.links.paper && (
          <ProjectLink href={project.links.paper} label={`Research paper for ${project.title}`}>
            READ PAPER <FileText className="size-3" />
          </ProjectLink>
        )}
      </div>
    </article>
  )
}

function ProjectLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useCursorHover(ref)

  return (
    <a
      ref={ref}
      href={href}
      className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2"
      aria-label={label}
    >
      {children}
    </a>
  )
}
