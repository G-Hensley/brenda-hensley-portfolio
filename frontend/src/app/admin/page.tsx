'use client';

import { useSession } from 'next-auth/react';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { CertificationCard } from './components/CertificationCard';
import { Certification } from '@/types/types';
import {
  getCertifications,
  addCertification,
  editCertification,
  deleteCertification,
} from '@/lib/api';
import { useState, useCallback } from 'react';
import { Toaster } from '@/components/ui/sonner';

function AdminContent() {
  const { data: session, status } = useSession();

  // State variables for data from the database
  const [certData, setCertData] = useState<Certification[]>([]);

  // Function to refresh all data
  const refreshData = useCallback(async () => {
    const [certs] = await Promise.all([
      getCertifications(),
    ]);
    setCertData(certs);
  }, []);

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <div>Access Denied</div>;
  }

  // Wrapper functions that refresh data after operations

  const handleAddCertification = async (
    certification: Certification
  ): Promise<Certification> => {
    const result = await addCertification(certification);
    await refreshData();
    return result;
  };

  const handleEditCertification = async (
    certification: Certification
  ): Promise<Certification> => {
    const result = await editCertification(certification);
    await refreshData();
    return result;
  };

  const handleDeleteCertification = async (id: string): Promise<void> => {
    await deleteCertification(id);
    await refreshData();
  };

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
          data={certData}
          addItem={handleAddCertification}
          editItem={handleEditCertification}
          deleteItem={handleDeleteCertification}
        />
      </div>
      <Toaster />
    </main>
  );
}

export default function Admin() {
  return <AdminContent />;
}
