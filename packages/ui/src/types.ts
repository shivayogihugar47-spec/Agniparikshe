export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type FindingStatus =
  | 'candidate'
  | 'confirmed'
  | 'unconfirmed'
  | 'fixed'
  | 'fix_verified'
  | 'fix_failed'
  | 'ignored';

export type ScanStatus =
  | 'queued'
  | 'scanning'
  | 'building_sandbox'
  | 'attacking'
  | 'fixing'
  | 'verifying'
  | 'completed'
  | 'failed';

export interface TraceStep {
  index: number;
  description: string;
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: string;
  };
  response: {
    status: number;
    headers: Record<string, string>;
    body?: string;
  };
}

export interface AttackTrace {
  id: string;
  findingId: string;
  steps: TraceStep[];
  exploitSucceeded: boolean;
  checkerMessage: string;
  createdAt: string;
}

export interface Patch {
  id: string;
  findingId: string;
  diff: string;
  filesChanged: string[];
  prUrl?: string;
  verification: 'pending' | 'verified' | 'failed';
  userActions: string[];
}

export interface Finding {
  id: string;
  scanId: string;
  ruleId: string;
  title: string;
  severity: Severity;
  status: FindingStatus;
  cwe: string;
  owasp: string;
  filePath: string;
  startLine: number;
  endLine: number;
  explanation: string;
  whyDangerous: string;
  evidenceSnippet: string;
  trace?: AttackTrace;
  patch?: Patch;
}

export interface Scan {
  id: string;
  repoUrl: string;
  commitSha: string;
  status: ScanStatus;
  score: number;
  startedAt: string;
  finishedAt?: string;
  counts: Record<Severity, number>;
  findings: Finding[];
}

export interface ScoreHistoryPoint {
  scanId: string;
  score: number;
  date: string;
}
