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

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const CertificationSection = forwardRef<HTMLDivElement>((props, ref) => {

  const { data: certs = [] } = useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: getCertifications,
  });

  return (
    <section className='text-white p-8 gap-8 h-screen flex flex-col items-center'
      ref={ref}
      data-section='green'>
      <CursorGlow color='green' />
      <div className={`text-left text-3xl md:text-6xl font-mono text-green-500 ${electrolize.className}`}>
        <TypeAnimation
          sequence={['# Certifications', 1000]}
          speed={50}
          cursor={false}
          repeat={0}
        />
        <span className='text-green-500 animate-blink'>_</span>
      </div>

      <div className="flex flex-wrap justify-center w-full gap-8">
        {certs.map((cert, index) => (
          <CertCard key={cert._id} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
});

CertificationSection.displayName = 'CertificationSection';
