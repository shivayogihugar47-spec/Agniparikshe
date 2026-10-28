import React from 'react';

export interface SkeletonProps {
  className?: string;
  'aria-label'?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  'aria-label': ariaLabel = 'Loading content...',
}) => {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`animate-pulse rounded-md bg-stone-200/80 ${className}`}
    />
  );
};
