// Hero Section for the home page

'use client';

// Import the components
import { useState, useEffect, forwardRef } from 'react';
import { CursorGlow } from '@/components/CursorGlow';
import { TypeAnimation } from 'react-type-animation';
import { Share_Tech_Mono, Electrolize } from 'next/font/google';
import { motion } from 'framer-motion';
import MatrixBackground from '@/components/MatrixBg';

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  // State to show the "whoami"
  const [showWhoami, setShowWhoami] = useState(true);

  // Effect to hide the "whoami"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWhoami(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className='text-white p-8 gap-8 h-screen flex flex-col items-center justify-center z-10'
      ref={ref}>
      <MatrixBackground />
      <CursorGlow color='red' />

      {showWhoami && (
        <div
          className={`text-left text-3xl md:text-6xl font-mono text-red-500 ${shareTechMono.className}`}>
          <TypeAnimation
            sequence={[
              '> whoami',
              1000,
              '', // delete whoami
            ]}
            wrapper='span'
            speed={50}
            cursor={false}
            repeat={0}
          />
          <span className='text-red-500 animate-blink'>_</span>
        </div>
      )}

      {!showWhoami && (
        <div
          className={`text-left text-3xl md:text-6xl font-mono text-red-500 ${shareTechMono.className}`}>
          <TypeAnimation
            sequence={[
              1000,
              'root@brenda-hensley:~$ Pentester',
              2000,
              'root@brenda-hensley:~$ App Security Engineer',
              4000,
              'root@brenda-hensley:~$ Red Team Operator',
              2500,
            ]}
            wrapper='span'
            speed={50}
            cursor={false}
            repeat={0}
          />
          <span className='text-red-500 animate-blink'>_</span>
        </div>
      )}

      <motion.h2
        className={`mt-4 text-lg md:text-4xl font-mono text-green-600 ${electrolize.className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 5,
          duration: 1,
          ease: 'easeOut',
        }}>
        # I break systems so others can&apos;t.
      </motion.h2>
      
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
