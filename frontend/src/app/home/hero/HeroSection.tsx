// Hero Section for the home page

'use client';

// Import the components
import { useState, useEffect, forwardRef, useRef } from 'react';
import { CursorGlow } from '@/components/CursorGlow';
import { TypeAnimation } from 'react-type-animation';
import { Share_Tech_Mono, Electrolize } from 'next/font/google';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Effect to hide the "whoami"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWhoami(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={ref}>
      <motion.section
        className='px-8 py-32 gap-8 h-screen flex flex-col items-center z-10 md:py-40 relative'
        id='home'
        ref={sectionRef}
        style={{ y, opacity }}
        whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      >
      <CursorGlow color='red' />

      <motion.div
        className='flex flex-col items-center justify-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 5,
          duration: 1,
          ease: 'easeOut',
        }}>
        <Image src={'/avatar.png'} alt="Brenda Hensley Avatar" width={200} height={200} className='rounded-full opacity-70 flicker' />
      </motion.div>

      {showWhoami && (
        <div
          className={`text-3xl md:text-6xl title-outline text-transparent font-mono text-center ${shareTechMono.className}`}>
          <TypeAnimation
            sequence={[
              '> whoami',
              1000,
              '',
            ]}
            wrapper='span'
            speed={50}
            cursor={false}
            repeat={0}
          />
          <span className='text-red-950 animate-blink'>_</span>
        </div>
      )}

      {!showWhoami && (
        <div
          className={`text-center text-4xl md:text-5xl title-outline text-transparent xl:text-6xl font-mono ${shareTechMono.className}`}>
          <TypeAnimation
            sequence={[
              1000,
              'root@brenda-hensley:~$ OffSec Practitioner',
              3500,
              'root@brenda-hensley:~$ AppSec Engineer',
              3000,
              'root@brenda-hensley:~$ Bridging Offense & AppSec',
              2500,
            ]}
            wrapper='span'
            speed={50}
            cursor={false}
            repeat={0}
          />
          <span className='text-red-950 animate-blink'>_</span>
        </div>
      )}

      <motion.h2
        className={`mt-4 text-lg md:text-2xl lg:text-3xl xl:text-4xl font-mono text-red-600 text-center ${electrolize.className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 5,
          duration: 1,
          ease: 'easeOut',
        }}>
        # Simulating threats. Strengthening defenses.
      </motion.h2>

    </motion.section>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';