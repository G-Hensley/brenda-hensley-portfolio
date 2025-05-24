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
import { SkillsScroll } from '../components/SkillScroll';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const CertificationSection = forwardRef<HTMLDivElement>((props, ref) => {

  // Fetch the certification data from the API
  const { data: certs = [] } = useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  return (
    <section className='text-white p-8 gap-12 h-screen flex flex-col items-center relative'
      ref={ref}
      data-section='green'>
        <div className="absolute inset-0 z-0 bg-dot-fade pointer-events-none" />
          <CursorGlow color='green' />
          <div className={`text-left text-3xl md:text-6xl text-green-600 ${electrolize.className} z-10`}>
            <TypeAnimation
              sequence={['# Certifications', 1000]}
              speed={50}
              cursor={false}
              repeat={0}
            />
            <span className='text-green-500 animate-blink'>_</span>
          </div>

          <div className="flex flex-wrap justify-center w-full gap-8 z-10">
            {certs.map((cert, index) => (
              <CertCard key={cert._id} cert={cert} index={index} />
            ))}
          </div>

          <SkillsScroll />

    </section>
  );
});

CertificationSection.displayName = 'CertificationSection';
