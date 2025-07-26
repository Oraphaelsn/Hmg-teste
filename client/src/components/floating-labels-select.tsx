import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingLabelSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

const FloatingLabelSelect = forwardRef<HTMLSelectElement, FloatingLabelSelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 border-2 rounded-lg transition-all duration-300",
            "bg-white/80 backdrop-blur-sm appearance-none",
            "border-gray-300 focus:border-primary-500 focus:ring-0 outline-none",
            "text-gray-900",
            error && "border-red-400 focus:border-red-500",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none",
            "text-gray-600",
            (isFocused || hasValue || props.value) 
              ? "top-2 text-xs text-primary-600 font-medium" 
              : "top-4 text-base",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600 slide-in-up">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingLabelSelect.displayName = "FloatingLabelSelect";

export { FloatingLabelSelect };