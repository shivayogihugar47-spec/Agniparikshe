"use client";

import * as React from "react";
import { X, Search, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScanModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const [repoUrl, setRepoUrl] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "scanning" | "completed">("idle");
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    "Cloning repository & analyzing code structure...",
    "Spinning up safe Docker sandbox...",
    "Simulating exploit payloads...",
    "Generating verified pull request patch...",
  ];

  const handleClose = React.useCallback(() => {
    setStatus("idle");
    setCurrentStep(0);
    setRepoUrl("");
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setStatus("scanning");
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setStatus("completed");
          return prev;
        }
      });
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scan-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg rounded-[12px] border border-border bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 rounded-[6px] p-1.5 text-text-muted hover:bg-background-soft hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-brand-tint text-brand">
            <Search className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 id="scan-modal-title" className="text-lg font-bold text-text">
              Scan a repository
            </h3>
            <p className="text-xs text-text-muted">
              Point Agniparikshe at any public or private GitHub repository.
            </p>
          </div>
        </div>

        {status === "idle" && (
          <form onSubmit={handleStartScan} className="mt-5 space-y-4">
            <div>
              <label htmlFor="repo-url-input" className="block text-xs font-medium text-text mb-1.5">
                GitHub Repository URL
              </label>
              <Input
                id="repo-url-input"
                type="text"
                placeholder="https://github.com/owner/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <span>Start sandbox test</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        )}

        {status === "scanning" && (
          <div className="mt-6 space-y-4 py-4 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand" />
            <p className="text-sm font-medium text-text">
              {steps[currentStep]}
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-background-soft border border-border">
              <div
                className="h-full bg-brand transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {status === "completed" && (
          <div className="mt-6 space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-tint text-success">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-base font-semibold text-text">
              Sandbox scan complete
            </h4>
            <p className="text-xs text-text-muted">
              Analyzed {repoUrl}. 0 exploitable vulnerabilities reached in safe sandbox.
            </p>
            <Button variant="default" onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
