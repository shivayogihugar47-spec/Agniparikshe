import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

export interface CodeSnippetProps {
  code: string;
  startLine?: number;
  highlightLines?: number[];
  filePath?: string;
  className?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  startLine = 1,
  highlightLines = [],
  filePath,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments where clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <div
      className={`rounded-xl border border-stone-200 bg-stone-900 text-stone-100 overflow-hidden text-xs font-mono shadow-sm ${className}`}
    >
      {(filePath || code) && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-stone-950/80 border-b border-stone-800">
          <div className="flex items-center gap-2 text-stone-400 truncate">
            <FileCode className="w-3.5 h-3.5 shrink-0 text-stone-500" aria-hidden="true" />
            <span className="truncate">{filePath || 'snippet'}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-sans font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      <div className="p-3 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const currentLineNumber = startLine + idx;
              const isHighlighted = highlightLines.includes(currentLineNumber);

              return (
                <tr
                  key={idx}
                  className={`leading-relaxed transition-colors ${
                    isHighlighted ? 'bg-amber-500/15 text-amber-200' : 'hover:bg-stone-800/40'
                  }`}
                >
                  <td
                    className={`w-10 select-none text-right pr-4 text-stone-500 ${
                      isHighlighted ? 'text-amber-400 font-bold border-l-2 border-amber-400 pl-1' : 'pl-2'
                    }`}
                    aria-hidden="true"
                  >
                    {currentLineNumber}
                  </td>
                  <td className="whitespace-pre pl-2 font-mono">
                    <code>{line || ' '}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
