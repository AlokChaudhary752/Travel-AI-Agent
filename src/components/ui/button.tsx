"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost" | "gold-outline";
  size?: "sm" | "md" | "lg" | "xl";
  isMagnetic?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isMagnetic = false,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isMagnetic && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * 0.22;
        const y = (e.clientY - centerY) * 0.22;
        setOffset({ x, y });
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isMagnetic) {
        setOffset({ x: 0, y: 0 });
      }
      onMouseLeave?.(e);
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs tracking-wider",
      md: "px-6 py-2.5 text-sm tracking-wider",
      lg: "px-8 py-3.5 text-sm tracking-widest uppercase font-medium",
      xl: "px-10 py-4 text-base tracking-widest uppercase font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[#C9A24B] via-[#E6CF8E] to-[#C9A24B] bg-[length:200%_auto] text-bg font-semibold shadow-gold-glow hover:bg-right transition-all duration-500 active:scale-[0.98]",
      secondary:
        "bg-surface border border-gold/30 text-ivory hover:border-gold hover:text-gold transition-all duration-300 shadow-sm active:scale-[0.98]",
      glass:
        "bg-white/[0.04] backdrop-blur-md border border-white/10 text-ivory hover:border-gold/40 hover:bg-white/[0.08] transition-all duration-300 active:scale-[0.98]",
      ghost:
        "bg-transparent text-muted hover:text-ivory transition-colors duration-200",
      "gold-outline":
        "border border-gold text-gold hover:bg-gold hover:text-bg transition-all duration-300 font-medium active:scale-[0.98]",
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isMagnetic && offset.x === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative inline-flex items-center justify-center select-none rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none transition-colors",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
