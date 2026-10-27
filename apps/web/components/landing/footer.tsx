import * as React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";

export function Footer() {
  const { footer, brand } = LANDING_CONTENT;

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & College Credit */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-[8px] py-1 text-text transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Flame className="h-5 w-5 text-flame fill-flame/15" aria-hidden="true" />
              <span className="text-base font-bold tracking-tight text-text">
                {brand.name}
              </span>
            </Link>
            <p className="text-xs font-medium text-text-muted">
              {footer.collegeCredit}
            </p>
          </div>

          {/* Nav Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-xs font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[4px] px-1 py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Responsible use notice & copyright */}
        <div
          id="responsible-use"
          className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-text-muted"
        >
          <p>
            Responsible use notice: Agniparikshe runs security exploit verification only
            against repositories and sandboxed containers you explicitly authorize.
          </p>
        </div>
      </div>
    </footer>
  );
}
