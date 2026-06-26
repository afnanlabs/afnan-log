import { useRef } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore, type Page } from "@/store/app-store";
import { useCursorHover } from "@/hooks/useCursorHover";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Blog", page: "blog" },
  { label: "Projects", page: "projects" },
  { label: "About", page: "about" },
];

export function Header() {
  const { currentPage, navigate } = useAppStore();
  const logoRef = useRef<HTMLButtonElement>(null);
  const terminalRef = useRef<HTMLButtonElement>(null);

  useCursorHover(logoRef);
  useCursorHover(terminalRef);

  const activePage = currentPage === "blog-post" ? "blog" : currentPage;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-[1100px] items-center justify-between px-6">
        <button
          ref={logoRef}
          onClick={() => navigate("home")}
          className="font-mono text-base font-bold tracking-[0.06em] text-foreground transition-opacity hover:opacity-70 focus-visible:outline-2"
          aria-label="Go home"
        >
          AFNAN.LOG
        </button>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map(({ label, page }) => (
              <li key={page}>
                <NavLink
                  label={label}
                  isActive={activePage === page}
                  onClick={() => navigate(page)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={terminalRef}
          onClick={() => navigate("about")}
          aria-label="Terminal / Contact"
          className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2"
        >
          <Terminal className="size-4" />
        </button>
      </div>
    </header>
  );
}

function NavLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useCursorHover(ref);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "font-mono text-sm transition-colors focus-visible:outline-2",
        isActive
          ? "text-foreground underline underline-offset-4"
          : "text-muted-foreground hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </button>
  );
}
