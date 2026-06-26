import { useRef } from "react";
import {
  Code2,
  MessageSquare,
  Mail,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCursorHover } from "@/hooks/useCursorHover";

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "TypeScript", "Tailwind", "Zustand"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "MySQL", "Firebase"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Docker", "VS Code"],
  },
  {
    category: "Core CS Fundamentals",
    items: [
      "Database Management Systems",
      "Object-Oriented Programming",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    category: "Currently Learning",
    items: [
      "System Design",
      "Scalable Backend Architecture",
      "Database Optimization",
      "Cloud Fundamentals",
    ],
  },
];

const TIMELINE = [
  { year: "2024", role: "Principal Systems Architect", org: "Stealth Startup" },
  { year: "2022", role: "Staff Software Engineer", org: "Infrastructure Labs" },
  { year: "2020", role: "Senior Engineer", org: "Distributed Systems Co." },
  { year: "2018", role: "Software Engineer", org: "Systems Research Group" },
];

export function About() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-24 pt-28">
      {/* Hero */}
      <section className="mb-16">
        <h1
          className="mb-6 font-serif text-5xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Afnan Khan.
        </h1>
        <p
          className="mb-4 text-[17px] leading-[1.65] text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          I'm Afnan Khan, an BSC-IT Graduate and Full Stack developer from
          Mumbai, India, with a strong interest in building practical software
          and understanding the systems behind it.
        </p>
        <p
          className="mb-4 text-[17px] leading-[1.65] text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          For me, software development is more than writing code—it's
          understanding the problem, designing a clear solution, and building
          something that is reliable, maintainable, and enjoyable to use. I
          enjoy breaking down complex ideas into simple systems and continuously
          improving my approach with every project.
        </p>
        <p
          className="text-[17px] leading-[1.65] text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          I believe the best way to learn is to build and share. This website is
          where I document that journey—through projects, experiments, technical
          notes, and lessons learned along the way.
        </p>
      </section>

      <Separator className="mb-16" />

      {/* Skills */}
      <section className="mb-16" aria-labelledby="skills-heading">
        <h2
          id="skills-heading"
          className="mb-8 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase"
        >
          Technical Overview
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {SKILLS.map(({ category, items }) => (
            <div key={category}>
              <h3 className="mb-3 font-mono text-xs tracking-[0.06em] text-foreground uppercase">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Timeline */}
      <section className="mb-16" aria-labelledby="timeline-heading">
        <h2
          id="timeline-heading"
          className="mb-8 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase"
        >
          Experience
        </h2>
        <div className="space-y-0">
          {TIMELINE.map((entry, i) => (
            <div
              key={i}
              className="flex gap-8 border-b border-border py-5 last:border-0"
            >
              <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">
                {entry.year}
              </span>
              <div>
                <p className="font-mono text-sm font-medium text-foreground">
                  {entry.role}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {entry.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Contact */}
      <section aria-labelledby="contact-heading">
        <h2
          id="contact-heading"
          className="mb-8 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase"
        >
          Contact
        </h2>
        <div className="flex flex-col gap-4">
          <ContactLink href="mailto:elara@engineer-writer.dev">
            <Mail className="size-4" />
            <span>khanafnan1108@gmail.com</span>
          </ContactLink>
          <ContactLink href="#" aria-label="GitHub profile">
            <Code2 className="size-4" />
            <span>github.com/afnanlabs</span>
          </ContactLink>
          <ContactLink href="#" aria-label="Twitter profile">
            <MessageSquare className="size-4" />
            <span>@elara_vance</span>
          </ContactLink>
          <ContactLink href="#" aria-label="Resume PDF">
            <FileText className="size-4" />
            <span>Resume / CV</span>
          </ContactLink>
        </div>
      </section>
    </main>
  );
}

function ContactLink({
  href,
  "aria-label": ariaLabel,
  children,
}: {
  href: string;
  "aria-label"?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useCursorHover(ref);

  return (
    <a
      ref={ref}
      href={href}
      className="group flex items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
      aria-label={ariaLabel}
    >
      {children}
      <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-60" />
    </a>
  );
}
