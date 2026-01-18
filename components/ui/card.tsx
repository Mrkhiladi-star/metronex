import * as React from "react";
import { cn } from "@/lib/utils";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className || ""
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
export { Card };
