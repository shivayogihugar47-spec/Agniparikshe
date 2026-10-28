import React, { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';

export interface BadgeSnippetProps {
  scanId: string;
  baseUrl: string;
  className?: string;
}

export const BadgeSnippet: React.FC<BadgeSnippetProps> = ({
  scanId,
  baseUrl,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const cleanBase = baseUrl.replace(/\/+$/, '');
  const badgeMarkdown = `[![Agniparikshe Security](${cleanBase}/api/badges/${scanId}.svg)](${cleanBase}/scans/${scanId})`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(badgeMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`rounded-xl border border-stone-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
          <Shield className="w-4 h-4 text-brand" aria-hidden="true" />
          <span>README Security Badge</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Badge markdown copied' : 'Copy badge markdown to clipboard'}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-1"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>
      </div>

      <div className="relative rounded-lg bg-stone-900 p-3 text-stone-200 font-mono text-xs overflow-x-auto">
        <code className="select-all break-all">{badgeMarkdown}</code>
      </div>

      <p className="mt-2 text-[11px] text-stone-500">
        Paste this snippet into your repository <code className="font-mono text-stone-600">README.md</code> to display live verified security score.
      </p>
    </div>
  );
};
