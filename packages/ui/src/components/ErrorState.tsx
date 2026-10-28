import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center p-6 text-center rounded-xl border border-rose-200 bg-rose-50/60 ${className}`}
    >
      <div className="flex items-center justify-center w-11 h-11 mb-3 rounded-full bg-rose-100 text-rose-600">
        <AlertCircle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-rose-900 mb-1">
        Action Encountered an Error
      </h3>
      <p className="text-sm text-rose-700 max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
