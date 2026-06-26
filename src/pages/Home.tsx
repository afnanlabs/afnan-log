import { useRef } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import { useCursorHover } from "@/hooks/useCursorHover";
import { BLOG_POSTS } from "@/data/blog";
import { PROJECTS } from "@/data/projects";

const TECH_STACK = [
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind",
  "Zustand",
  "Node.js",
  "MySQL",
  "Docker",
];
export function Home() {
  const { navigate } = useAppStore();
  const viewAllRef = useRef<HTMLButtonElement>(null);
  const readAllRef = useRef<HTMLButtonElement>(null);

  useCursorHover(viewAllRef);
  useCursorHover(readAllRef);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const recentPosts = [...BLOG_POSTS]
    .sort(
      (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
    )
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-[680px] px-6 py-24 pt-28">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="mb-20">
        <h1
          id="hero-heading"
          className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Building software. Sharing what I learn.
        </h1>
        <p
          className="mb-8 max-w-[540px] text-[17px] leading-[1.65] text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          I build practical software, experiment with new technologies, and
          document everything I learn along the way. This space contains project
          breakdowns, engineering notes, development workflows, and lessons from
          building real applications.
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Selected Projects */}
      <section aria-labelledby="projects-heading" className="mb-20">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            Selected Projects
          </span>
          <button
            ref={viewAllRef}
            onClick={() => navigate("projects")}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
          >
            View All
          </button>
        </div>

        <div className="space-y-0">
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className={`flex gap-8 py-8 ${i < featuredProjects.length - 1 ? "border-b border-border" : ""}`}
            >
              {/* Alternating layout */}
              {i % 2 === 0 ? (
                <>
                  <ProjectPreviewImage project={project} />
                  <div className="flex-1">
                    <ProjectPreviewContent
                      project={project}
                      navigate={navigate}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <ProjectPreviewContent
                      project={project}
                      navigate={navigate}
                    />
                  </div>
                  <ProjectPreviewImage project={project} />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Recent Writing */}
      <section aria-labelledby="writing-heading">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            Writing
          </span>
          <button
            ref={readAllRef}
            onClick={() => navigate("blog")}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
          >
            Read All
          </button>
        </div>

        <div className="space-y-0">
          {recentPosts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              isLast={i === recentPosts.length - 1}
              onClick={() => navigate("blog-post", post.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function PostCard({
  post,
  isLast,
  onClick,
}: {
  post: (typeof BLOG_POSTS)[0];
  isLast: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useCursorHover(ref);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group flex w-full items-start justify-between gap-4 py-6 text-left transition-colors ${
        isLast ? "" : "border-b border-border"
      } hover:bg-transparent focus-visible:outline-2`}
    >
      <div className="flex-1">
        <span className="mb-1.5 block font-mono text-xs tracking-[0.05em] text-muted-foreground">
          {post.date}
        </span>
        <h3
          className="mb-1.5 text-lg font-semibold text-foreground transition-opacity group-hover:opacity-80"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm leading-relaxed text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {post.excerpt}
        </p>
      </div>
      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function ProjectPreviewImage({ project }: { project: (typeof PROJECTS)[0] }) {
  const colors: Record<string, string> = {
    "syntax-shell": "bg-card",
    "monolith-core": "bg-card",
  };
  return (
    <div
      className={`h-36 w-48 shrink-0 border border-border ${colors[project.id] ?? "bg-card"} flex items-center justify-center`}
    >
      <span className="font-mono text-xs text-muted-foreground opacity-40">
        {project.number}
      </span>
    </div>
  );
}

function ProjectPreviewContent({
  project,
  navigate,
}: {
  project: (typeof PROJECTS)[0];
  navigate: (page: import("@/store/app-store").Page, slug?: string) => void;
}) {
  const caseStudyRef = useRef<HTMLButtonElement>(null);
  const sourceRef = useRef<HTMLButtonElement>(null);

  useCursorHover(caseStudyRef);
  useCursorHover(sourceRef);

  return (
    <>
      <span className="mb-2 block font-mono text-xs tracking-[0.08em] text-muted-foreground">
        PROJECT — {project.number}
      </span>
      <h3
        className="mb-3 text-xl font-semibold text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {project.title}
      </h3>
      <p
        className="mb-4 text-sm leading-relaxed text-muted-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {project.description}
      </p>
      <div className="flex gap-2">
        {project.links.demo && (
          <button
            ref={caseStudyRef}
            onClick={() => navigate("projects")}
            className="flex items-center gap-1.5 border border-foreground px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2"
          >
            Case Study
          </button>
        )}
        {project.links.source && (
          <button
            ref={sourceRef}
            onClick={() => navigate("projects")}
            className="flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2"
          >
            <Code2 className="size-3" />
            Source
          </button>
        )}
      </div>
    </>
  );
}
