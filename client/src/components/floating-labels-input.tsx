import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 border-2 rounded-lg transition-all duration-300",
            "bg-white/80 backdrop-blur-sm",
            "border-gray-300 focus:border-primary-500 focus:ring-0 outline-none",
            "text-gray-900 placeholder-transparent",
            error && "border-red-400 focus:border-red-500",
            className
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
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

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };