'use client';

import React, { useState, useEffect } from 'react';
import {
  SeverityBadge,
  StatusBadge,
  EmptyState,
  ErrorState,
  Skeleton,
  CodeSnippet,
  ChecklistItem,
  BadgeSnippet,
  Severity,
  FindingStatus,
  mockFindingsCompleted,
  mockScans,
  mockHistory,
  Scan,
} from '@agniparikshe/ui';
import {
  getScan,
  startScan,
  attackFinding,
  fixFinding,
  getHistory,
} from '../../lib/api/client';
import { Button } from '../../components/ui/button';
import { Shield, Sparkles, Terminal, Layers, RefreshCw } from 'lucide-react';

export default function UiDemoPage() {
  const [checklistState, setChecklistState] = useState([
    { id: 1, text: 'Sandbox container built successfully', done: true },
    { id: 2, text: 'Dynamic attack payloads executed against live API', done: true },
    { id: 3, text: 'IDOR exploit verified in isolation', done: true },
    { id: 4, text: 'Rotate leaked database credentials in production', done: false },
    { id: 5, text: 'Merge automated patch PR into main branch', done: false },
  ]);

  const [activeScan, setActiveScan] = useState<Scan | null>(null);
  const [loadingScan, setLoadingScan] = useState<boolean>(true);
  const [apiActionMessage, setApiActionMessage] = useState<string>('');

  useEffect(() => {
    async function loadInitialScan() {
      setLoadingScan(true);
      try {
        const scan = await getScan('scan-completed-01');
        setActiveScan(scan);
      } finally {
        setLoadingScan(false);
      }
    }
    loadInitialScan();
  }, []);

  const toggleChecklist = (id: number) => {
    setChecklistState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleTestAttack = async () => {
    setApiActionMessage('Executing sandbox exploit verification...');
    const trace = await attackFinding('fnd-idor-01');
    setApiActionMessage(`Attack trace returned: ${trace.checkerMessage}`);
  };

  const handleTestFix = async () => {
    setApiActionMessage('Generating patch with LLM verification...');
    const patch = await fixFinding('fnd-sqli-03');
    setApiActionMessage(`Patch created for: ${patch.filesChanged.join(', ')}`);
  };

  const allSeverities: Severity[] = ['critical', 'high', 'medium', 'low'];
  const allStatuses: FindingStatus[] = [
    'candidate',
    'confirmed',
    'unconfirmed',
    'fixed',
    'fix_verified',
    'fix_failed',
    'ignored',
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Banner */}
        <header className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Internal Development Preview</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900">
                Agniparikshe UI Components & Mock System Demo
              </h1>
            </div>
            <div className="text-xs text-stone-500 bg-stone-50 px-3 py-2 rounded-lg border border-stone-200">
              <span className="font-semibold block text-stone-700">Team Notice:</span>
              Internal page for the team. Not linked from the site.
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            Foundational components exported from{' '}
            <code className="text-xs font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">
              @agniparikshe/ui
            </code>{' '}
            and connected to the mock client API{' '}
            <code className="text-xs font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-800">
              apps/web/lib/api/client.ts
            </code>
            .
          </p>
        </header>

        {/* Section 1: Severity Badges */}
        <section
          id="severity-badges"
          aria-labelledby="heading-severity"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <h2 id="heading-severity" className="text-lg font-semibold text-stone-900">
              1. SeverityBadge
            </h2>
            <p className="text-sm text-stone-600">
              Used for security vulnerability levels with high-contrast dots and tint backgrounds.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 p-4 bg-stone-50/70 rounded-lg border border-stone-100">
            {allSeverities.map((sev) => (
              <div key={sev} className="flex flex-col items-center gap-1.5">
                <SeverityBadge severity={sev} />
                <span className="text-[11px] font-mono text-stone-400">{sev}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Status Badges */}
        <section
          id="status-badges"
          aria-labelledby="heading-status"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <h2 id="heading-status" className="text-lg font-semibold text-stone-900">
              2. StatusBadge
            </h2>
            <p className="text-sm text-stone-600">
              Verification lifecycle badges with semantic Lucide icons (lightning, question mark, shield, strikethrough, etc.).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 p-4 bg-stone-50/70 rounded-lg border border-stone-100">
            {allStatuses.map((st) => (
              <div key={st} className="flex flex-col items-center gap-1.5">
                <StatusBadge status={st} />
                <span className="text-[11px] font-mono text-stone-400">{st}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Code Snippet */}
        <section
          id="code-snippet"
          aria-labelledby="heading-code"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <h2 id="heading-code" className="text-lg font-semibold text-stone-900">
              3. CodeSnippet
            </h2>
            <p className="text-sm text-stone-600">
              Monospace font, file path badge, line numbers, highlighted vulnerable lines, and an accessible copy button.
            </p>
          </div>
          <div className="space-y-4">
            <CodeSnippet
              filePath={mockFindingsCompleted[0].filePath}
              startLine={mockFindingsCompleted[0].startLine}
              highlightLines={[47, 48]}
              code={`// GET /orders/:id route vulnerable to Insecure Direct Object Reference (IDOR)
router.get("/orders/:id", authenticateToken, async (req, res) => {
  const order = await db.order.findUnique({
    where: { id: req.params.id }, // Missing req.user.id tenancy filter!
  });
  return res.json(order);
});`}
            />

            <div>
              <p className="text-xs font-semibold text-stone-700 mb-2">Unified Patch Diff Example:</p>
              <CodeSnippet
                filePath="apps/api/src/repositories/user-repo.ts"
                startLine={40}
                highlightLines={[42, 43]}
                code={mockFindingsCompleted[2].patch?.diff || ''}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Checklist Items */}
        <section
          id="checklist-items"
          aria-labelledby="heading-checklist"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 id="heading-checklist" className="text-lg font-semibold text-stone-900">
                4. ChecklistItem
              </h2>
              <p className="text-sm text-stone-600">
                Interactive verification task items with keyboard navigation (Space / Enter) and WCAG AA contrast.
              </p>
            </div>
            <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">
              Interactive (Click to toggle)
            </span>
          </div>
          <div className="space-y-2 p-4 bg-stone-50/70 rounded-lg border border-stone-100">
            {checklistState.map((item) => (
              <ChecklistItem
                key={item.id}
                text={item.text}
                done={item.done}
                onToggle={() => toggleChecklist(item.id)}
              />
            ))}
          </div>
        </section>

        {/* Section 5: Badge Snippet */}
        <section
          id="badge-snippet"
          aria-labelledby="heading-badge-snippet"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <h2 id="heading-badge-snippet" className="text-lg font-semibold text-stone-900">
              5. BadgeSnippet
            </h2>
            <p className="text-sm text-stone-600">
              Copyable README badge snippet with single-click clipboard action and preview.
            </p>
          </div>
          <BadgeSnippet
            scanId="scan-completed-01"
            baseUrl="https://agniparikshe.dev"
          />
        </section>

        {/* Section 6: States (Empty, Error, Skeleton) */}
        <section
          id="system-states"
          aria-labelledby="heading-states"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-6"
        >
          <div>
            <h2 id="heading-states" className="text-lg font-semibold text-stone-900">
              6. State Feedback Components (Empty, Error, Skeleton)
            </h2>
            <p className="text-sm text-stone-600">
              Consistent feedback states for loading, missing data, and recoverable errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                EmptyState (With Action)
              </h3>
              <EmptyState
                title="No Vulnerabilities Confirmed"
                description="Your code passed all sandbox verification attacks without reproducing any exploitable flaw."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert('Triggering test action')}
                  >
                    Run Full Regressive Suite
                  </Button>
                }
              />
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                ErrorState (With Retry)
              </h3>
              <ErrorState
                message="Sandbox container deployment timed out while waiting for Docker daemon healthcheck."
                onRetry={() => alert('Retrying sandbox deployment...')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Skeleton (Soft Pulse)
            </h3>
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-lg" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
                <Skeleton className="h-8 rounded" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Mock API Client Integration */}
        <section
          id="mock-api-integration"
          aria-labelledby="heading-api"
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 id="heading-api" className="text-lg font-semibold text-stone-900">
                7. Mock API Client Verification
              </h2>
              <p className="text-sm text-stone-600">
                Live client exercising <code className="text-xs font-mono bg-stone-100 px-1">apps/web/lib/api/client.ts</code> with realistic 400-800ms delays.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestAttack}
                className="text-xs"
              >
                Test attackFinding()
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestFix}
                className="text-xs"
              >
                Test fixFinding()
              </Button>
            </div>
          </div>

          {apiActionMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-mono">
              {apiActionMessage}
            </div>
          )}

          <div className="p-4 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs overflow-x-auto space-y-2">
            <div className="text-stone-400">
              // Active Scan Data from getScan(&apos;scan-completed-01&apos;):
            </div>
            {loadingScan ? (
              <div className="text-amber-400 animate-pulse">Loading mock scan from client...</div>
            ) : (
              <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-emerald-400">
                {JSON.stringify(
                  {
                    id: activeScan?.id,
                    score: activeScan?.score,
                    status: activeScan?.status,
                    findingsCount: activeScan?.findings.length,
                    counts: activeScan?.counts,
                  },
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
