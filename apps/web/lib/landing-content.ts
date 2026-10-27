export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly external: boolean;
}

export interface StepItem {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
}

export interface FeatureItem {
  readonly iconName: "Search" | "ShieldAlert" | "GitPullRequest" | "Terminal" | "CheckCircle2" | "Flame";
  readonly title: string;
  readonly description: string;
}

export interface ComparisonCard {
  readonly title: string;
  readonly badge: string;
  readonly points: readonly string[];
}

export const LANDING_CONTENT = {
  brand: {
    name: "Agniparikshe",
    tagline: "Free security scanner and automated exploit verifier for AI-generated applications.",
  },
  header: {
    navLinks: [
      { label: "How it works", href: "#how-it-works", external: false },
      { label: "Features", href: "#features", external: false },
      { label: "Docs", href: "https://github.com/shivayogihugar47-spec/Agniparikshe#readme", external: true },
      { label: "GitHub", href: "https://github.com/shivayogihugar47-spec/Agniparikshe", external: true },
    ] as const satisfies readonly NavLink[],
    signInButtonText: "Sign in with GitHub",
    scanButtonText: "Scan a repo",
  },
  hero: {
    badge: "Free and open source",
    headline: "Put your AI-built app through the fire.",
    subtext:
      "Agniparikshe attacks your code the way a hacker would, proves what is broken, fixes it, and tests the fix.",
    primaryCta: "Scan a repo",
    secondaryCta: "Install VS Code extension",
    previewCard: {
      criticalBadge: "Critical",
      confirmedBadge: "Confirmed by attack",
      title: "Anyone can read another user's orders",
      plainLanguageSentence:
        "The endpoint returned sensitive order data for another user because user ID authorization was not verified.",
      attackPayload: "GET /orders/1042 as User A -> 200 OK, returned User B's data",
      replayButtonText: "Replay attack",
      replayingButtonText: "Simulating attack...",
      fixBlockedText: "After fix: exploit blocked",
      fixBlockedCode: "GET /orders/1042 as User A -> 403 Forbidden, unauthorized access blocked",
    },
  },
  worksWith: {
    label: "Works with code from",
    tools: ["Cursor", "Lovable", "Bolt", "v0", "GitHub Copilot", "ChatGPT"] as const,
  },
  howItWorks: {
    title: "How it works",
    subtitle: "From full-codebase scan to verified fix in five automated steps.",
    steps: [
      {
        stepNumber: "1",
        title: "Scan",
        description: "reads your whole repo",
      },
      {
        stepNumber: "2",
        title: "Exploit",
        description: "attacks the running app in a safe sandbox",
      },
      {
        stepNumber: "3",
        title: "Fix",
        description: "opens a pull request",
      },
      {
        stepNumber: "4",
        title: "Verify",
        description: "attacks again to prove it is blocked",
      },
      {
        stepNumber: "5",
        title: "Report",
        description: "score, proof and plain-language steps",
      },
    ] as const satisfies readonly StepItem[],
  },
  features: {
    title: "Designed specifically for apps built with AI",
    subtitle:
      "AI coding assistants build apps rapidly but routinely omit authorization checks, leak secrets, or introduce subtle logic flaws.",
    items: [
      {
        iconName: "Search",
        title: "Whole-repo scan",
        description:
          "Scans your entire codebase to understand relationships across client, server, and database models.",
      },
      {
        iconName: "ShieldAlert",
        title: "Proof by attack",
        description:
          "Spins up your app in an isolated sandbox and executes realistic payloads to prove flaws are exploitable.",
      },
      {
        iconName: "GitPullRequest",
        title: "Auto-fix pull requests",
        description:
          "Generates targeted, production-ready code fixes and opens an automated PR directly on your repository.",
      },
      {
        iconName: "Terminal",
        title: "VS Code extension",
        description:
          "Get instant security feedback and trigger sandbox attacks right inside your editor as you code.",
      },
      {
        iconName: "CheckCircle2",
        title: "GitHub checks on every PR",
        description:
          "Prevent vulnerabilities before merge. Runs automated sandbox verification on every pull request.",
      },
      {
        iconName: "Flame",
        title: "Free and open source",
        description:
          "Transparent, community-driven, and free for all developers. Self-host or inspect every line of code.",
      },
    ] as const satisfies readonly FeatureItem[],
  },
  comparison: {
    title: "Other scanners guess. Agniparikshe proves.",
    subtitle:
      "Static analysis alone floods you with false alarms. Agniparikshe runs the exploit so you know what is actually broken.",
    otherScanners: {
      title: "Other scanners",
      badge: "Guesses",
      points: [
        "line-by-line warnings",
        "many false alarms",
        "no proof",
      ] as const,
    } satisfies ComparisonCard,
    agniparikshe: {
      title: "Agniparikshe",
      badge: "Proves",
      points: [
        "every finding comes with a replayable attack and a re-test of the fix",
      ] as const,
    } satisfies ComparisonCard,
  },
  cta: {
    headline: "Ship your AI-built app with confidence.",
    subtext: "Put your codebase through the fire before your users do. Free and open source.",
    buttonText: "Scan a repo",
  },
  footer: {
    links: [
      { label: "Docs", href: "https://github.com/shivayogihugar47-spec/Agniparikshe#readme", external: true },
      { label: "GitHub", href: "https://github.com/shivayogihugar47-spec/Agniparikshe", external: true },
      { label: "Responsible use", href: "#responsible-use", external: false },
    ] as const satisfies readonly NavLink[],
    collegeCredit: "Built as a college project at KLS GIT.",
    copyrightNotice: "Agniparikshe - Security for AI-built software.",
  },
} as const;
