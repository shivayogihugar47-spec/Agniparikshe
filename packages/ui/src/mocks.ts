import {
  Finding,
  Scan,
  ScoreHistoryPoint,
} from './types';

export const mockHistory: ScoreHistoryPoint[] = [
  { scanId: 'scan-0915', score: 32, date: '2026-09-15T10:00:00Z' },
  { scanId: 'scan-0922', score: 48, date: '2026-09-22T14:30:00Z' },
  { scanId: 'scan-1001', score: 59, date: '2026-10-01T09:15:00Z' },
  { scanId: 'scan-1010', score: 71, date: '2026-10-10T16:45:00Z' },
  { scanId: 'scan-1018', score: 84, date: '2026-10-18T11:20:00Z' },
  { scanId: 'scan-1025', score: 91, date: '2026-10-25T15:00:00Z' },
];

export const mockFindingsCompleted: Finding[] = [
  {
    id: 'fnd-idor-01',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-AUTH-001',
    title: 'Insecure Direct Object Reference (IDOR) on Order Details Endpoint',
    severity: 'critical',
    status: 'confirmed',
    cwe: 'CWE-639',
    owasp: 'A01:2021-Broken Access Control',
    filePath: 'apps/api/src/routes/orders.ts',
    startLine: 45,
    endLine: 62,
    explanation:
      'The GET /orders/:id route retrieves order records directly by database ID without validating that the authenticated requester owns the corresponding tenant account or order record.',
    whyDangerous:
      'An attacker with any valid low-privilege user session can enumerate sequential order IDs to exfiltrate private billing details, PII, and customer credit card identifiers of arbitrary users.',
    evidenceSnippet:
      'router.get("/orders/:id", authenticateToken, async (req, res) => {\n  const order = await db.order.findUnique({\n    where: { id: req.params.id },\n  });\n  return res.json(order);\n});',
    trace: {
      id: 'trc-idor-01',
      findingId: 'fnd-idor-01',
      exploitSucceeded: true,
      checkerMessage:
        'Exploit confirmed: User A (usr_99182) successfully fetched order 1042 containing User B (usr_77301) PII and order records.',
      createdAt: '2026-10-25T15:02:18Z',
      steps: [
        {
          index: 1,
          description: 'Log in as legitimate User A to obtain authentic authorization bearer token',
          request: {
            method: 'POST',
            url: 'https://sandbox.target.internal/api/auth/login',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'userA@agniparikshe.test',
              password: 'SecretUserPass!123',
            }),
          },
          response: {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: 'eyJh...mockUserAToken',
              userId: 'usr_99182',
              email: 'userA@agniparikshe.test',
            }),
          },
        },
        {
          index: 2,
          description: 'POST /login 200 session verification and confirm User A profile ownership',
          request: {
            method: 'GET',
            url: 'https://sandbox.target.internal/api/auth/me',
            headers: {
              Authorization: 'Bearer eyJh...mockUserAToken',
            },
          },
          response: {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 'usr_99182',
              ownedOrderIds: [201, 202],
            }),
          },
        },
        {
          index: 3,
          description: "GET /orders/1042 with User A's token targeting an unowned order",
          request: {
            method: 'GET',
            url: 'https://sandbox.target.internal/api/orders/1042',
            headers: {
              Authorization: 'Bearer eyJh...mockUserAToken',
              Accept: 'application/json',
            },
          },
          response: {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 1042,
              customerEmail: 'userB@victim-domain.org',
              customerName: 'User B',
              totalCents: 18450,
              items: ['Enterprise Cloud Subscription'],
            }),
          },
        },
        {
          index: 4,
          description: "200 OK received containing User B's data confirming broken authorization boundary",
          request: {
            method: 'GET',
            url: 'https://sandbox.target.internal/api/orders/1042/invoice',
            headers: {
              Authorization: 'Bearer eyJh...mockUserAToken',
            },
          },
          response: {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              invoiceId: 'INV-1042',
              owner: 'userB@victim-domain.org',
              taxNumber: 'US-991204',
              status: 'PAID',
            }),
          },
        },
      ],
    },
    patch: {
      id: 'ptc-idor-01',
      findingId: 'fnd-idor-01',
      filesChanged: ['apps/api/src/routes/orders.ts'],
      verification: 'pending',
      userActions: [
        'Review organization multi-tenancy scoping across all order sub-routes',
        'Verify audit logs for unauthorized access to /orders/:id in the past 30 days',
      ],
      diff: `--- a/apps/api/src/routes/orders.ts
+++ b/apps/api/src/routes/orders.ts
@@ -46,3 +46,7 @@
 router.get("/orders/:id", authenticateToken, async (req, res) => {
-  const order = await db.order.findUnique({
-    where: { id: req.params.id },
+  const order = await db.order.findFirst({
+    where: {
+      id: req.params.id,
+      userId: req.user.id,
+    },
   });
+  if (!order) {
+    return res.status(404).json({ error: "Order not found" });
+  }`,
    },
  },
  {
    id: 'fnd-secret-02',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-SEC-004',
    title: 'Exposed Production Database Connection Key and Credentials',
    severity: 'critical',
    status: 'confirmed',
    cwe: 'CWE-798',
    owasp: 'A07:2021-Identification and Authentication Failures',
    filePath: 'packages/db/src/client.ts',
    startLine: 12,
    endLine: 18,
    explanation:
      'Hardcoded live database connection string with plaintext credentials was detected in source control instead of runtime environment variables.',
    whyDangerous:
      'Anyone with read access to the repository can directly connect to the primary database, dump all customer tables, or modify transactional data.',
    evidenceSnippet:
      'const client = new pg.Pool({\n  connectionString: "post********************************************************",\n  ssl: { rejectUnauthorized: true }\n});',
    patch: {
      id: 'ptc-secret-02',
      findingId: 'fnd-secret-02',
      filesChanged: ['packages/db/src/client.ts', '.env.example'],
      verification: 'pending',
      userActions: [
        'Rotate the leaked key immediately in AWS RDS / Supabase dashboard',
        'Revoke the compromised database user credentials immediately',
        'Verify database audit query logs for suspicious external IP connections',
      ],
      diff: `--- a/packages/db/src/client.ts
+++ b/packages/db/src/client.ts
@@ -12,3 +12,3 @@
 const client = new pg.Pool({
-  connectionString: "post********************************************************",
+  connectionString: process.env.DATABASE_URL,
   ssl: { rejectUnauthorized: true }`,
    },
  },
  {
    id: 'fnd-sqli-03',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-INJ-002',
    title: 'SQL Injection in User Search Filter Repository',
    severity: 'high',
    status: 'fix_verified',
    cwe: 'CWE-89',
    owasp: 'A03:2021-Injection',
    filePath: 'apps/api/src/repositories/user-repo.ts',
    startLine: 41,
    endLine: 54,
    explanation:
      'Search query parameters are concatenated directly into raw SQL template strings without parameterization or sanitization.',
    whyDangerous:
      'Allows an attacker to bypass authentication checks, inject UNION-based extraction payloads, and tamper with database structures.',
    evidenceSnippet:
      'export async function searchUsers(orgId: string, filter: string) {\n  const query = `SELECT * FROM users WHERE org_id = \'${orgId}\' AND name LIKE \'%${filter}%\'`;\n  return db.query(query);\n}',
    patch: {
      id: 'ptc-sqli-03',
      findingId: 'fnd-sqli-03',
      prUrl: 'https://github.com/shivayogihugar47-spec/Agniparikshe/pull/14',
      filesChanged: ['apps/api/src/repositories/user-repo.ts'],
      verification: 'verified',
      userActions: [
        'Merged sandbox patch into main branch',
        'Automated regression attack suite passed cleanly',
      ],
      diff: `--- a/apps/api/src/repositories/user-repo.ts
+++ b/apps/api/src/repositories/user-repo.ts
@@ -41,4 +41,4 @@
 export async function searchUsers(orgId: string, filter: string) {
-  const query = \`SELECT * FROM users WHERE org_id = '\${orgId}' AND name LIKE '%\${filter}%'\`;
-  return db.query(query);
+  const query = "SELECT * FROM users WHERE org_id = $1 AND name ILIKE $2";
+  return db.query(query, [orgId, \`%\${filter}%\`]);
 }`,
    },
  },
  {
    id: 'fnd-pkg-04',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-SUPPLY-009',
    title: 'Potential Hallucinated NPM Package Reference',
    severity: 'medium',
    status: 'unconfirmed',
    cwe: 'CWE-829',
    owasp: 'A06:2021-Vulnerable and Outdated Components',
    filePath: 'package.json',
    startLine: 28,
    endLine: 29,
    explanation:
      'Package "@fast-crypto-utils/next-helpers" was generated in a recent AI code suggestion but does not exist in the public npm registry, creating a typosquatting attack vector.',
    whyDangerous:
      'Malicious actors can register the non-existent package name on public npm and execute arbitrary postinstall scripts on build machines.',
    evidenceSnippet:
      '"dependencies": {\n  "@fast-crypto-utils/next-helpers": "^1.0.4",\n  "zod": "^3.22.4"\n}',
  },
  {
    id: 'fnd-rate-05',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-RATE-011',
    title: 'Missing Rate Limiter on Public Password Reset Endpoint',
    severity: 'low',
    status: 'ignored',
    cwe: 'CWE-307',
    owasp: 'A07:2021-Identification and Authentication Failures',
    filePath: 'apps/api/src/routes/auth.ts',
    startLine: 88,
    endLine: 104,
    explanation:
      'The POST /auth/forgot-password route does not enforce client IP rate limiting.',
    whyDangerous:
      'Could allow an adversary to trigger excessive transactional emails or launch email bomb attacks against target users.',
    evidenceSnippet:
      'router.post("/forgot-password", async (req, res) => {\n  await sendResetEmail(req.body.email);\n  return res.json({ sent: true });\n});',
  },
  {
    id: 'fnd-ssrf-06',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-NET-003',
    title: 'Server-Side Request Forgery (SSRF) in Outgoing Webhook Trigger',
    severity: 'high',
    status: 'confirmed',
    cwe: 'CWE-918',
    owasp: 'A10:2021-Server-Side Request Forgery',
    filePath: 'apps/api/src/services/webhook.ts',
    startLine: 34,
    endLine: 49,
    explanation:
      'User-provided webhook destination URLs are requested without filtering loopback (127.0.0.1) or AWS IMDS metadata endpoints (169.254.169.254).',
    whyDangerous:
      'Allows malicious users to query internal microservices, Redis clusters, and cloud instance IAM metadata tokens.',
    evidenceSnippet:
      'export async function dispatchWebhook(url: string, payload: unknown) {\n  return fetch(url, { method: "POST", body: JSON.stringify(payload) });\n}',
  },
  {
    id: 'fnd-cors-07',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-CORS-008',
    title: 'Insecure Wildcard CORS Policy with Credentials Enabled',
    severity: 'medium',
    status: 'candidate',
    cwe: 'CWE-942',
    owasp: 'A05:2021-Security Misconfiguration',
    filePath: 'apps/api/src/middleware/cors.ts',
    startLine: 8,
    endLine: 15,
    explanation:
      'CORS headers mirror incoming Origin header while Access-Control-Allow-Credentials is set to true.',
    whyDangerous:
      'Third-party websites visited by an authenticated user can read sensitive API responses cross-origin via the browser.',
    evidenceSnippet:
      'res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");\nres.setHeader("Access-Control-Allow-Credentials", "true");',
  },
  {
    id: 'fnd-cook-08',
    scanId: 'scan-completed-01',
    ruleId: 'AGNI-SESS-015',
    title: 'Cookie Missing Secure and SameSite Attributes in Staging',
    severity: 'low',
    status: 'fixed',
    cwe: 'CWE-614',
    owasp: 'A05:2021-Security Misconfiguration',
    filePath: 'apps/api/src/controllers/session.ts',
    startLine: 72,
    endLine: 83,
    explanation:
      'Session authentication cookies lacked strict SameSite and Secure flags during local and preview staging configurations.',
    whyDangerous:
      'Leaves user sessions vulnerable to cross-site request forgery and transmission over unencrypted network proxies.',
    evidenceSnippet:
      'res.cookie("sid", session.token, {\n  httpOnly: true,\n  secure: false,\n  sameSite: "lax"\n});',
    patch: {
      id: 'ptc-cook-08',
      findingId: 'fnd-cook-08',
      filesChanged: ['apps/api/src/controllers/session.ts'],
      verification: 'verified',
      userActions: [
        'Updated session cookie config with secure: true and sameSite: "strict"',
      ],
      diff: `--- a/apps/api/src/controllers/session.ts
+++ b/apps/api/src/controllers/session.ts
@@ -74,2 +74,2 @@
-  secure: false,
-  sameSite: "lax"
+  secure: true,
+  sameSite: "strict"`,
    },
  },
];

export const mockScans: Scan[] = [
  {
    id: 'scan-completed-01',
    repoUrl: 'https://github.com/shivayogihugar47-spec/Agniparikshe',
    commitSha: '3bd5168808a5cbfcf7168832a8494f1c9076bc10',
    status: 'completed',
    score: 91,
    startedAt: '2026-10-25T14:48:10Z',
    finishedAt: '2026-10-25T15:05:32Z',
    counts: {
      critical: 2,
      high: 2,
      medium: 2,
      low: 2,
    },
    findings: mockFindingsCompleted,
  },
  {
    id: 'scan-attacking-02',
    repoUrl: 'https://github.com/shivayogihugar47-spec/Agniparikshe',
    commitSha: '9970c109312feecaa9b32e9fae7c992d9d5f7560',
    status: 'attacking',
    score: 64,
    startedAt: '2026-10-28T05:30:00Z',
    counts: {
      critical: 0,
      high: 1,
      medium: 1,
      low: 0,
    },
    findings: [
      {
        id: 'fnd-eval-10',
        scanId: 'scan-attacking-02',
        ruleId: 'AGNI-CODE-001',
        title: 'Untrusted Code Execution via Dynamic eval() in Template Parser',
        severity: 'high',
        status: 'candidate',
        cwe: 'CWE-95',
        owasp: 'A03:2021-Injection',
        filePath: 'apps/api/src/templates/engine.ts',
        startLine: 19,
        endLine: 25,
        explanation:
          'Sandbox agent is currently generating active exploit payloads against running sandbox container.',
        whyDangerous:
          'Allows remote code execution inside the runtime worker environment.',
        evidenceSnippet:
          'const compiled = eval(`(function(ctx) { return ${userTemplate}; })`);',
      },
      {
        id: 'fnd-redir-11',
        scanId: 'scan-attacking-02',
        ruleId: 'AGNI-REDIR-005',
        title: 'Open Redirect on OAuth Callback Endpoint',
        severity: 'medium',
        status: 'candidate',
        cwe: 'CWE-601',
        owasp: 'A01:2021-Broken Access Control',
        filePath: 'apps/api/src/routes/oauth.ts',
        startLine: 50,
        endLine: 58,
        explanation:
          'Redirect target URL parameter is not validated against a known whitelist.',
        whyDangerous:
          'Enables convincing phishing attacks by redirecting users from trusted domains to credential harvest pages.',
        evidenceSnippet:
          'res.redirect(req.query.returnTo || "/dashboard");',
      },
    ],
  },
  {
    id: 'scan-failed-03',
    repoUrl: 'https://github.com/shivayogihugar47-spec/Agniparikshe',
    commitSha: '418a0029b932c0f2095a8813bcfe47d0e9a5a111',
    status: 'failed',
    score: 0,
    startedAt: '2026-10-27T18:10:00Z',
    finishedAt: '2026-10-27T18:12:15Z',
    counts: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    findings: [],
  },
];
