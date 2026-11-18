import React from 'react';
import { Severity } from '../types';

export interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig: Record<
  Severity,
  { label: string; bgClass: string; textClass: string; dotClass: string; borderClass: string }
> = {
  critical: {
    label: 'Critical',
    bgClass: 'bg-critical-tint',
    textClass: 'text-critical',
    dotClass: 'bg-critical',
    borderClass: 'border-critical/30',
  },
  high: {
    label: 'High',
    bgClass: 'bg-high-tint',
    textClass: 'text-high',
    dotClass: 'bg-high',
    borderClass: 'border-high/30',
  },
  medium: {
    label: 'Medium',
    bgClass: 'bg-medium-tint',
    textClass: 'text-medium',
    dotClass: 'bg-medium',
    borderClass: 'border-medium/30',
  },
  low: {
    label: 'Low',
    bgClass: 'bg-low-tint',
    textClass: 'text-low',
    dotClass: 'bg-low',
    borderClass: 'border-low/30',
  },
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  className = '',
}) => {
  const config = severityConfig[severity] ?? severityConfig.low;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgClass} ${config.textClass} ${config.borderClass} ${className}`}
      aria-label={`Severity: ${config.label}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
};
