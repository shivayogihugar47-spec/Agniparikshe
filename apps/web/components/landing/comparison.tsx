import * as React from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Comparison() {
  const { comparison } = LANDING_CONTENT;

  return (
    <section className="bg-background-soft py-14 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {comparison.title}
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            {comparison.subtitle}
          </p>
        </div>

        {/* Comparison Cards Side-by-Side */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Left Card: Other Scanners (Muted) */}
          <Card className="flex flex-col justify-between border-border bg-surface/80 p-6 text-text-muted">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-text-muted">
                  {comparison.otherScanners.title}
                </h3>
                <Badge variant="outline" className="text-text-muted">
                  {comparison.otherScanners.badge}
                </Badge>
              </div>

              <ul className="mt-6 space-y-4">
                {comparison.otherScanners.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <span className="text-sm leading-relaxed text-text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-[8px] bg-stone-100/70 p-3 text-center text-xs text-text-muted">
              Results in fatigue, ignored warnings, and unfixed vulnerabilities.
            </div>
          </Card>

          {/* Right Card: Agniparikshe (Brand Border) */}
          <Card className="relative flex flex-col justify-between border-2 border-brand bg-surface p-6 shadow-sm">
            <div className="absolute -top-3 right-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-white shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Recommended
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-text">
                  {comparison.agniparikshe.title}
                </h3>
                <Badge variant="secondary" className="font-semibold">
                  {comparison.agniparikshe.badge}
                </Badge>
              </div>

              <ul className="mt-6 space-y-4">
                {comparison.agniparikshe.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-text">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-[8px] border border-brand/20 bg-brand-tint p-3 text-center text-xs font-medium text-brand">
              Zero noise. Every pull request includes a sandbox-validated fix.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
