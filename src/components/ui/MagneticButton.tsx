"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, strength = 20, className, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
      <motion.button
        className={`relative inline-flex items-center justify-center transition-colors ${className}`}
        ref={(node) => {
          // @ts-ignore
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
