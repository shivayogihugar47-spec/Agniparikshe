"use client";

import * as React from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { WorksWith } from "@/components/landing/works-with";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Comparison } from "@/components/landing/comparison";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { ScanModal } from "@/components/landing/scan-modal";

export default function LandingPage() {
  const [scanModalOpen, setScanModalOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-text antialiased selection:bg-brand-tint selection:text-brand">
      <Header onScanClick={() => setScanModalOpen(true)} />
      <main className="flex-1">
        <Hero onScanClick={() => setScanModalOpen(true)} />
        <WorksWith />
        <HowItWorks />
        <Features />
        <Comparison />
        <CtaSection onScanClick={() => setScanModalOpen(true)} />
      </main>
      <Footer />
      <ScanModal
        isOpen={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
      />
    </div>
  );
}
