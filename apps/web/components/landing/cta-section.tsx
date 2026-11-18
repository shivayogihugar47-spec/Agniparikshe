import * as React from "react";
import { ArrowRight, Flame } from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  readonly onScanClick?: () => void;
}

export function CtaSection({ onScanClick }: CtaSectionProps) {
  const { cta } = LANDING_CONTENT;

  return (
    <section className="border-t border-border bg-background-soft py-14 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Flame Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-brand-tint text-flame">
            <Flame className="h-6 w-6 fill-flame/15" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-text text-balance sm:text-4xl lg:text-5xl">
            {cta.headline}
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-xl text-base text-text-muted sm:text-lg">
            {cta.subtext}
          </p>

          {/* Scan a repo Button */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              variant="default"
              size="lg"
              onClick={onScanClick}
              className="h-12 gap-2 px-8 text-base font-semibold"
            >
              <span>{cta.buttonText}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
