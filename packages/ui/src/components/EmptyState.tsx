import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label={title}
      className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-stone-300 bg-stone-50/50 ${className}`}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-stone-100 text-stone-500">
        {icon ? (
          icon
        ) : (
          <Inbox className="w-6 h-6 text-stone-400" aria-hidden="true" />
        )}
      </div>
      <h3 className="text-base font-semibold text-stone-900 mb-1">{title}</h3>
      <p className="text-sm text-stone-600 max-w-sm mb-5">{description}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
};
