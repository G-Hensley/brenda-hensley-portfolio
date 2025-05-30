// About Section for the home page

'use client';

// Import the components
import { CursorGlow } from '@/components/CursorGlow';
import { forwardRef } from 'react';
import { Electrolize } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { Certification } from '@/types/types';
import { getCertifications } from '@/lib/api';
import { TypeAnimation } from 'react-type-animation';
import CertCard from './CertCard';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ScrollText } from 'lucide-react';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const CertificationSection = forwardRef<HTMLDivElement>((props, ref) => {
  const typingRef = useRef(null);
  const isInView = useInView(typingRef, { once: true });

  const [startTyping, setStartTyping] = useState(false);

  // Effect to start the typing animation when the section is in view
  useEffect(() => {
    if (isInView) {
      setStartTyping(true);
    }
  }, [isInView]);

  // Fetch the certification data from the API
  const { data: certs = [] } = useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  return (
    <section
      id='certs'
      className='text-white px-8 pt-24 pb-16 gap-20 min-h-screen h-fit flex flex-col items-center relative'
      ref={ref}
      data-section='green'>
      {/* <div className="absolute inset-0 z-0 bg-dot-fade pointer-events-none" /> */}
      <CursorGlow color='green' />
      <div
        ref={typingRef}
        className={`text-center text-3xl md:text-6xl text-green-600 text-glow ${electrolize.className} z-10 flex items-center`}>
        <ScrollText className='text-green-600 icon-glow mr-4' size={56} />
        {startTyping && (
          <>
            <TypeAnimation
              sequence={[800, 'Certifications', 1000]}
              speed={50}
              cursor={false}
              repeat={0}
            />
            <span className='text-green-500 animate-blink text-glow'>_</span>
          </>
        )}
      </div>

      <div className='flex flex-wrap justify-center w-full gap-10 z-10 items-center'>
        {certs.map((cert, index) => (
          <CertCard key={cert._id} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
});

CertificationSection.displayName = 'CertificationSection';
