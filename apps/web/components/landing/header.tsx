"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, Menu, X } from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface HeaderProps {
  readonly onScanClick?: () => void;
}

export function Header({ onScanClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { header, brand } = LANDING_CONTENT;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-[8px] py-1 text-text transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Flame className="h-6 w-6 text-flame fill-flame/15" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight text-text">
            {brand.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex md:items-center md:gap-7"
        >
          {header.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[6px] px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="https://github.com/shivayogihugar47-spec/Agniparikshe"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button
              variant="secondary"
              size="default"
              className="gap-2"
              aria-label="Sign in with GitHub repository"
            >
              <GithubIcon className="h-4 w-4" />
              {header.signInButtonText}
            </Button>
          </Link>
          <Button
            variant="default"
            size="default"
            onClick={onScanClick}
          >
            {header.scanButtonText}
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-[8px] p-2 text-text hover:bg-background-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-3 pb-6 md:hidden">
          <nav className="flex flex-col gap-2">
            {header.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="rounded-[8px] px-3 py-2 text-base font-medium text-text hover:bg-background-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2.5 border-t border-border pt-4">
              <Link
                href="https://github.com/shivayogihugar47-spec/Agniparikshe"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="w-full"
              >
                <Button
                  variant="secondary"
                  className="w-full justify-center gap-2"
                >
                  <GithubIcon className="h-4 w-4" />
                  {header.signInButtonText}
                </Button>
              </Link>
              <Button
                variant="default"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScanClick?.();
                }}
              >
                {header.scanButtonText}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
