import * as React from "react";
import { LANDING_CONTENT } from "@/lib/landing-content";

export function WorksWith() {
  const { worksWith } = LANDING_CONTENT;

  return (
    <section className="border-y border-border bg-background py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <p className="text-xs font-semibold tracking-wider text-text-muted uppercase">
            {worksWith.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {worksWith.tools.map((tool) => (
              <span
                key={tool}
                className="text-sm font-semibold tracking-tight text-text-muted/80 transition-colors hover:text-text sm:text-base"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
