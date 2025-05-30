'use client';

// Import the components
import { CertificationSection } from './certifications/CertificationSection';
// import { useEffect, useState, useRef } from 'react';
// import { CursorGlow } from '@/components/CursorGlow';
import { ProjectsSection } from '@/app/skills/projects/ProjectsSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function SkillsPage() {
  return (
    <main className='min-h-fit bg-zinc-950 z-0'>
      <Navbar />
      <CertificationSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
