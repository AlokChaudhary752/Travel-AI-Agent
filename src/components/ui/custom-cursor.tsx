"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useSpring(-100, { damping: 25, stiffness: 250 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 250 });
  const dotX = useSpring(-100, { damping: 35, stiffness: 400 });
  const dotY = useSpring(-100, { damping: 35, stiffness: 400 });

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible((prev) => (!prev ? true : prev));
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const isInteractive = !!(
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.dataset.cursor === "pointer")
      );

      setIsPointer((prev) => (prev !== isInteractive ? isInteractive : prev));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-gold/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? "rgba(201, 162, 75, 0.08)" : "transparent",
          boxShadow: isPointer ? "0 0 20px rgba(201, 162, 75, 0.3)" : "none",
          transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out",
        }}
      />
      {/* Center Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#C9A24B]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
