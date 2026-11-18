import {
  AttackTrace,
  Finding,
  Patch,
  Scan,
  ScoreHistoryPoint,
  mockFindingsCompleted,
  mockHistory,
  mockScans,
} from '@agniparikshe/ui';

export interface PrResult {
  scanId: string;
  prUrl: string;
  status: string;
}

export interface ReportExport {
  scanId: string;
  format: string;
  filename: string;
  content: string;
}

// NEXT_PUBLIC_USE_MOCK defaults to true
const USE_MOCK: boolean =
  process.env.NEXT_PUBLIC_USE_MOCK === undefined
    ? true
    : process.env.NEXT_PUBLIC_USE_MOCK === 'true' ||
      process.env.NEXT_PUBLIC_USE_MOCK === '1';

/**
 * Simulates network latency between 400ms and 800ms.
 */
function fakeDelay(min = 400, max = 800): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Helper to execute JSON fetch requests when real API endpoints are active.
 */
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Start a new security scan for a given repository URL.
 */
export async function startScan(repoUrl: string): Promise<Scan> {
  if (USE_MOCK) {
    await fakeDelay();
    return {
      id: `scan-${Date.now().toString(36)}`,
      repoUrl,
      commitSha: 'a1b2c3d4e5f67890123456789abcdef012345678',
      status: 'queued',
      score: 0,
      startedAt: new Date().toISOString(),
      counts: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
      findings: [],
    };
  }

  return fetchJson<Scan>('/api/scans', {
    method: 'POST',
    body: JSON.stringify({ repoUrl }),
  });
}

/**
 * Retrieve a scan by ID.
 */
export async function getScan(id: string): Promise<Scan> {
  if (USE_MOCK) {
    await fakeDelay();
    const found = mockScans.find((s) => s.id === id);
    if (found) {
      return found;
    }
    // Fall back to the completed scan if not found
    return {
      ...mockScans[0],
      id,
    };
  }

  return fetchJson<Scan>(`/api/scans/${id}`);
}

/**
 * List all findings for a given scan ID.
 */
export async function listFindings(scanId: string): Promise<Finding[]> {
  if (USE_MOCK) {
    await fakeDelay();
    const scan = mockScans.find((s) => s.id === scanId);
    return scan ? scan.findings : mockFindingsCompleted;
  }

  return fetchJson<Finding[]>(`/api/scans/${scanId}/findings`);
}

/**
 * Execute a verification attack against a running sandbox finding.
 */
export async function attackFinding(id: string): Promise<AttackTrace> {
  if (USE_MOCK) {
    await fakeDelay();
    const finding = mockFindingsCompleted.find((f) => f.id === id);
    if (finding?.trace) {
      return finding.trace;
    }
    return {
      id: `trc-${id}`,
      findingId: id,
      exploitSucceeded: true,
      checkerMessage:
        'Sandbox agent executed exploit verification suite and confirmed vulnerability.',
      createdAt: new Date().toISOString(),
      steps: mockFindingsCompleted[0].trace!.steps,
    };
  }

  return fetchJson<AttackTrace>(`/api/findings/${id}/attack`, {
    method: 'POST',
  });
}

/**
 * Generate a security patch for a verified finding.
 */
export async function fixFinding(id: string): Promise<Patch> {
  if (USE_MOCK) {
    await fakeDelay();
    const finding = mockFindingsCompleted.find((f) => f.id === id);
    if (finding?.patch) {
      return finding.patch;
    }
    return {
      id: `ptc-${id}`,
      findingId: id,
      diff: `--- a/${finding?.filePath || 'src/index.ts'}\n+++ b/${finding?.filePath || 'src/index.ts'}\n@@ -1,3 +1,3 @@\n-  // Unvalidated input\n+  // Validated and sanitized input`,
      filesChanged: [finding?.filePath || 'src/index.ts'],
      verification: 'pending',
      userActions: ['Review and merge generated fix pull request'],
    };
  }

  return fetchJson<Patch>(`/api/findings/${id}/fix`, {
    method: 'POST',
  });
}

/**
 * Open a fix Pull Request for all verified patches in a scan.
 */
export async function openFixPr(scanId: string): Promise<PrResult> {
  if (USE_MOCK) {
    await fakeDelay();
    return {
      scanId,
      prUrl: 'https://github.com/shivayogihugar47-spec/Agniparikshe/pull/15',
      status: 'opened',
    };
  }

  return fetchJson<PrResult>(`/api/scans/${scanId}/pr`, {
    method: 'POST',
  });
}

/**
 * Mark a finding as ignored with an audit reason.
 */
export async function ignoreFinding(
  id: string,
  reason: string
): Promise<Finding> {
  if (USE_MOCK) {
    await fakeDelay();
    const finding =
      mockFindingsCompleted.find((f) => f.id === id) || mockFindingsCompleted[0];
    return {
      ...finding,
      id,
      status: 'ignored',
      explanation: `${finding.explanation} [Ignored by reviewer: ${reason}]`,
    };
  }

  return fetchJson<Finding>(`/api/findings/${id}/ignore`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
}

/**
 * Retrieve the security score history for a repository.
 */
export async function getHistory(repoId: string): Promise<ScoreHistoryPoint[]> {
  if (USE_MOCK) {
    await fakeDelay();
    return mockHistory;
  }

  return fetchJson<ScoreHistoryPoint[]>(`/api/repos/${repoId}/history`);
}

/**
 * Export an audit report for a scan in the desired format (e.g. json, markdown, pdf).
 */
export async function exportReport(
  scanId: string,
  format: string
): Promise<ReportExport> {
  if (USE_MOCK) {
    await fakeDelay();
    return {
      scanId,
      format,
      filename: `agniparikshe-audit-${scanId}.${format}`,
      content: `# Agniparikshe Security Audit Report\nScan ID: ${scanId}\nGenerated: ${new Date().toISOString()}\nTarget: https://github.com/shivayogihugar47-spec/Agniparikshe\nStatus: Verified\n`,
    };
  }

  return fetchJson<ReportExport>(
    `/api/reports/${scanId}?format=${encodeURIComponent(format)}`
  );
}
