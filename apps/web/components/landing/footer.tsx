import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  GitHub SVG icon (lucide-react v1.61 does not export a GitHub icon) */
/* ------------------------------------------------------------------ */

function GitHubIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
import { LANDING_CONTENT, type NavLink } from "@/lib/landing-content";

/* ------------------------------------------------------------------ */
/*  Small sub-components                                               */
/* ------------------------------------------------------------------ */

interface FooterLinkGroupProps {
  readonly heading: string;
  readonly links: readonly NavLink[];
  readonly ariaLabel: string;
}

function FooterLinkGroup({ heading, links, ariaLabel }: FooterLinkGroupProps) {
  return (
    <nav aria-label={ariaLabel}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
        {heading}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="rounded-[4px] text-sm text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  const { footer, brand } = LANDING_CONTENT;
  const year = footer.copyrightYear;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top grid: brand + 4 link columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand column — spans 2 on desktop */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-[8px] py-1 text-text transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Flame
                className="h-5 w-5 text-flame fill-flame/15"
                aria-hidden="true"
              />
              <span className="text-base font-bold tracking-tight text-text">
                {brand.name}
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              {footer.description}
            </p>

            {/* Open-source pill */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-tint px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              <span>{footer.openSourcePill}</span>
            </div>

            {/* GitHub icon link */}
            <div className="mt-4">
              <Link
                href={footer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agniparikshe on GitHub"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <GitHubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkGroup
            heading={footer.product.heading}
            links={footer.product.links}
            ariaLabel="Product links"
          />
          <FooterLinkGroup
            heading={footer.resources.heading}
            links={footer.resources.links}
            ariaLabel="Resources links"
          />
          <FooterLinkGroup
            heading={footer.openSource.heading}
            links={footer.openSource.links}
            ariaLabel="Open source links"
          />
          <FooterLinkGroup
            heading={footer.legal.heading}
            links={footer.legal.links}
            ariaLabel="Legal links"
          />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/60 pt-6 text-xs text-text-muted sm:flex-row sm:justify-between">
          <p>&copy; {year} Agniparikshe. All rights reserved.</p>

          <nav
            aria-label="Legal footer links"
            className="flex flex-wrap items-center gap-4"
          >
            {footer.bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-[4px] px-1 py-0.5 transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
