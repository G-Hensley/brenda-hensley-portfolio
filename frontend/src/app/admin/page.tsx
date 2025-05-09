'use client';

import { useSession } from 'next-auth/react';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { CertificationCard } from './components/CertificationCard';
import { Toaster } from '@/components/ui/sonner';

function AdminContent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <main className='flex flex-col items-center h-screen bg-neutral-900 text-white p-8 gap-4'>
      <header className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
        <h2 className='text-2xl'>Welcome {session.user?.name}</h2>
      </header>
      <div className='flex gap-12 flex-wrap justify-center p-8 rounded-lg'>
        <SkillCard
          title='Skills'
        />
        <ProjectCard
          title='Projects'
        />
        <CertificationCard
          title='Certifications'
        />
      </div>
      <Toaster />
    </main>
  );
}

export default function Admin() {
  return <AdminContent />;
}
