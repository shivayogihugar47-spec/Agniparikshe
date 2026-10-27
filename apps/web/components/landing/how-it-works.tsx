import * as React from "react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Card } from "@/components/ui/card";

export function HowItWorks() {
  const { howItWorks } = LANDING_CONTENT;

  return (
    <section
      id="how-it-works"
      className="bg-background-soft py-14 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            {howItWorks.subtitle}
          </p>
        </div>

        {/* 5 Steps in a row on desktop, stacked on mobile */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {howItWorks.steps.map((step) => (
            <Card
              key={step.stepNumber}
              className="relative flex flex-col justify-between border-border bg-surface p-5 transition-shadow hover:shadow-xs"
            >
              <div>
                {/* Step Number */}
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand/20 bg-brand-tint font-mono text-xs font-bold text-brand">
                  {step.stepNumber}
                </div>

                {/* Step Title */}
                <h3 className="mt-4 text-lg font-semibold text-text">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-4 border-t border-border/60 pt-3">
                <span className="font-mono text-[11px] text-text-muted">
                  Step {step.stepNumber} of 5
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
