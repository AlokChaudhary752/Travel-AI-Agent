import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "elevated" | "outline" | "solid";
  glow?: boolean;
}

export function Card({
  className,
  variant = "glass",
  glow = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    glass: "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]",
    elevated: "bg-surface/80 backdrop-blur-2xl border border-gold/20 shadow-2xl",
    outline: "border border-gold/30 bg-transparent",
    solid: "bg-surface border border-surface-elevated",
  };

  return (
    <div
      className={cn(
        "relative rounded-sm p-6 text-ivory transition-all duration-300",
        variantStyles[variant],
        glow && "shadow-gold-subtle border-gold/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
