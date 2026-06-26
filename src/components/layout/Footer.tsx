import { useRef } from "react";
import { useAppStore } from "@/store/app-store";
import { useCursorHover } from "@/hooks/useCursorHover";

export function Footer() {
  const { navigate } = useAppStore();
  const logoRef = useRef<HTMLButtonElement>(null);

  useCursorHover(logoRef);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-6">
          <button
            ref={logoRef}
            onClick={() => navigate("home")}
            className="font-mono text-sm font-bold tracking-[0.06em] text-foreground transition-opacity hover:opacity-70 focus-visible:outline-2"
          >
            AFNAN.LOG
          </button>
          <span className="font-mono text-xs text-muted-foreground">
            © 2026 Afnan Khan.
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-4">
            {(["GitHub", "LinkedIn", "Email"] as const).map((link) => (
              <li key={link}>
                <FooterLink href="#" aria-label={link}>
                  {link}
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  "aria-label": ariaLabel,
  children,
}: {
  href: string;
  "aria-label": string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useCursorHover(ref);

  return (
    <a
      ref={ref}
      href={href}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
