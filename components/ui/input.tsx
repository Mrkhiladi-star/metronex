import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900",
          "dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-red-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className ?? ""       // ✅ prevents TS error
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
