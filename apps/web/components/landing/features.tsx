import * as React from "react";
import {
  Search,
  ShieldAlert,
  GitPullRequest,
  Terminal,
  CheckCircle2,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Card } from "@/components/ui/card";

const ICON_MAP: Record<
  "Search" | "ShieldAlert" | "GitPullRequest" | "Terminal" | "CheckCircle2" | "Flame",
  LucideIcon
> = {
  Search,
  ShieldAlert,
  GitPullRequest,
  Terminal,
  CheckCircle2,
  Flame,
};

export function Features() {
  const { features } = LANDING_CONTENT;

  return (
    <section id="features" className="bg-background py-14 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text text-balance sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            {features.subtitle}
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item) => {
            const IconComponent = ICON_MAP[item.iconName];

            return (
              <Card
                key={item.title}
                className="group border-border bg-surface p-6 transition-all hover:border-brand/30 hover:shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-brand/20 bg-brand-tint text-brand transition-colors group-hover:border-brand/40">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
