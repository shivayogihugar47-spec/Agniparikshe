import React from 'react';
import { Check } from 'lucide-react';

export interface ChecklistItemProps {
  text: string;
  done: boolean;
  onToggle?: () => void;
  className?: string;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  text,
  done,
  onToggle,
  className = '',
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === ' ' || event.key === 'Enter') && onToggle) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role={onToggle ? 'checkbox' : undefined}
      aria-checked={onToggle ? done : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`group flex items-start gap-3 p-2.5 rounded-lg border transition-all text-sm ${
        done
          ? 'bg-stone-50 border-stone-200 text-stone-500'
          : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
      } ${
        onToggle
          ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2'
          : ''
      } ${className}`}
    >
      <div
        className={`flex items-center justify-center w-5 h-5 mt-0.5 rounded border transition-colors shrink-0 ${
          done
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : 'border-stone-300 bg-white group-hover:border-stone-400'
        }`}
        aria-hidden="true"
      >
        {done && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
      </div>
      <span
        className={`select-none leading-snug ${
          done ? 'line-through text-stone-400' : 'text-stone-700'
        }`}
      >
        {text}
      </span>
    </div>
  );
};
