'use client';

import { useSession } from 'next-auth/react';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { CertificationCard } from './components/CertificationCard';
import { Skill, Project, Certification } from '@/types/types';
import {
  getSkills,
  getCertifications,
  getProjects,
  addSkill,
  addProject,
  addCertification,
  editSkill,
  editProject,
  editCertification,
  deleteSkill,
  deleteProject,
  deleteCertification,
} from '@/lib/api';
import { useState, useEffect } from 'react';

function AdminContent() {
  const { data: session, status } = useSession();

  // State variables for data from the database
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [certData, setCertData] = useState<Certification[]>([]);

  // Fetch data from the database
  useEffect(() => {
    getSkills().then(setSkillData);
    getProjects().then(setProjectData);
    getCertifications().then(setCertData);
  }, []);

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
          data={skillData}
          addItem={addSkill}
          editItem={editSkill}
          deleteItem={deleteSkill}
        />
        <ProjectCard
          title='Projects'
          data={projectData}
          addItem={addProject}
          editItem={editProject}
          deleteItem={deleteProject}
        />
        <CertificationCard
          title='Certifications'
          data={certData}
          addItem={addCertification}
          editItem={editCertification}
          deleteItem={deleteCertification}
        />
      </div>
    </main>
  );
}

export default function Admin() {
  return <AdminContent />;
}
