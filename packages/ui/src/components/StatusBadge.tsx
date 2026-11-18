import React from 'react';
import {
  Zap,
  HelpCircle,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Ban,
  Clock,
} from 'lucide-react';
import { FindingStatus } from '../types';

export interface StatusBadgeProps {
  status: FindingStatus;
  className?: string;
}

interface StatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  className: string;
}

const statusConfig: Record<FindingStatus, StatusConfig> = {
  confirmed: {
    label: 'Confirmed',
    icon: Zap,
    className: 'bg-critical-tint text-critical border-critical/30',
  },
  unconfirmed: {
    label: 'Unconfirmed',
    icon: HelpCircle,
    className: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  fixed: {
    label: 'Fixed',
    icon: CheckCircle2,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  fix_verified: {
    label: 'Fix Verified',
    icon: ShieldCheck,
    className: 'bg-success-tint text-success border-success/30 font-medium',
  },
  fix_failed: {
    label: 'Fix Failed',
    icon: AlertTriangle,
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  ignored: {
    label: 'Ignored',
    icon: Ban,
    className: 'bg-stone-100 text-stone-500 border-stone-300 line-through',
  },
  candidate: {
    label: 'Candidate',
    icon: Clock,
    className: 'bg-stone-50 text-stone-700 border-stone-200',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const config = statusConfig[status] ?? statusConfig.candidate;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${config.className} ${className}`}
      aria-label={`Status: ${config.label}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};
