"use client";

import * as React from "react";
import Link from "next/link";
import { Play, CheckCircle2, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { LANDING_CONTENT } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface HeroProps {
  readonly onScanClick?: () => void;
}

export function Hero({ onScanClick }: HeroProps) {
  const { hero } = LANDING_CONTENT;
  const [isReplaying, setIsReplaying] = React.useState(false);
  const [replayed, setReplayed] = React.useState(false);

  const handleReplay = () => {
    setIsReplaying(true);
    setTimeout(() => {
      setIsReplaying(false);
      setReplayed(true);
    }, 900);
  };

  return (
    <section className="relative overflow-hidden py-14 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & Actions */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              {hero.headline}
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted sm:text-xl">
              {hero.subtext}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={onScanClick}
                className="h-12 px-6 text-base font-semibold"
              >
                {hero.primaryCta}
              </Button>
              <Link
                href="https://marketplace.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-12 gap-2 px-6 text-base font-semibold"
                >
                  <Terminal className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  {hero.secondaryCta}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Product Preview Card in soft warm tint container */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-brand/15 bg-brand-tint/60 p-3 sm:p-5">
              <Card className="border-border bg-surface shadow-sm">
                {/* Card Header with Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="critical">
                      <ShieldAlert className="h-3 w-3" aria-hidden="true" />
                      {hero.previewCard.criticalBadge}
                    </Badge>
                    <Badge variant="secondary">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {hero.previewCard.confirmedBadge}
                    </Badge>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted">
                    #VULN-809
                  </span>
                </div>

                {/* Finding Title & Plain Language Description */}
                <div className="pt-2">
                  <h3 className="text-base font-semibold text-text">
                    {hero.previewCard.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                    {hero.previewCard.plainLanguageSentence}
                  </p>
                </div>

                {/* Attack Code Block */}
                <div className="rounded-[8px] border border-border bg-[#1C1917] p-3 text-white">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-mono">PROVEN EXPLOIT PAYLOAD</span>
                    <span className="font-mono text-brand">STATUS: CONFIRMED</span>
                  </div>
                  <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-stone-200">
                    <code>{hero.previewCard.attackPayload}</code>
                  </pre>
                </div>

                {/* Replay Button & Verified Fix Block */}
                <div className="flex flex-col gap-3 pt-1">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleReplay}
                      disabled={isReplaying}
                      className="gap-1.5 text-xs"
                      aria-label="Replay attack against sandbox"
                    >
                      <Play
                        className={`h-3.5 w-3.5 text-brand fill-brand/30 ${
                          isReplaying ? "animate-spin" : ""
                        }`}
                        aria-hidden="true"
                      />
                      {isReplaying
                        ? hero.previewCard.replayingButtonText
                        : hero.previewCard.replayButtonText}
                    </Button>
                    <span className="font-mono text-[11px] text-text-muted">
                      Sandbox runtime: 1.4s
                    </span>
                  </div>

                  {/* Green after-fix line */}
                  <div className="flex items-center gap-2 rounded-[8px] border border-success/20 bg-success-tint px-3 py-2 text-xs font-medium text-success">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {replayed
                        ? "Attack replayed: flaw successfully neutralized"
                        : hero.previewCard.fixBlockedText}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
