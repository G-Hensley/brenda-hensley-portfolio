// Home Page for the portfolio

'use client';

// Import the components
import { HeroSection } from './hero/HeroSection';
import { CertificationSection } from './certifications/CertificationSection';
import { useEffect, useState, useRef } from 'react';
import { CursorGlow } from '@/components/CursorGlow';

export default function Home() {
  // cursor glow color
  const [cursorColor, setCursorColor] = useState('red');

  const redRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  // effect to change the cursor color
  useEffect(() => {
    const redElement = redRef.current;
    const greenElement = greenRef.current;
  
    const observer = new IntersectionObserver(
      (entries) => {
        // Prioritize the one most visible
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  
        if (visibleEntry?.target === greenElement) {
          setCursorColor('green');
        } else if (visibleEntry?.target === redElement) {
          setCursorColor('red');
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) } // finer-grained detection
    );
  
    if (redElement) observer.observe(redElement);
    if (greenElement) observer.observe(greenElement);
  
    return () => {
      if (redElement) observer.unobserve(redElement);
      if (greenElement) observer.unobserve(greenElement);
    };
  }, []);
  

  return (
    <main className='min-h-fit bg-zinc-950 z-0'>
      <CursorGlow color={cursorColor} />
      <HeroSection ref={redRef} />
      <CertificationSection ref={greenRef} />
    </main>
  );
}
