// CursorGlow.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorGlowProps {
  color: string;
}

export function CursorGlow({ color }: CursorGlowProps) {
  const [isClient, setIsClient] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsClient(true);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  if (!isClient) return null;

  return (
    <motion.div
      className='fixed -top-10 -left-10 pointer-events-none z-20'
      style={{
        x: smoothX,
        y: smoothY,
      }}>
      <div
        className={`w-20 h-20 rounded-full opacity-20 blur-3xl mix-blend-screen`}
        style={{
          backgroundColor: color,
        }}
      />
    </motion.div>
  );
}
