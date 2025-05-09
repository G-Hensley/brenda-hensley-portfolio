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
import { useState, useEffect, useCallback } from 'react';

function AdminContent() {
  const { data: session, status } = useSession();

  // State variables for data from the database
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [certData, setCertData] = useState<Certification[]>([]);

  // Function to refresh all data
  const refreshData = useCallback(async () => {
    const [skills, projects, certs] = await Promise.all([
      getSkills(),
      getProjects(),
      getCertifications(),
    ]);
    setSkillData(skills);
    setProjectData(projects);
    setCertData(certs);
  }, []);

  // Fetch data from the database
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <div>Access Denied</div>;
  }

  // Wrapper functions that refresh data after operations
  const handleAddSkill = async (skill: Skill): Promise<Skill> => {
    const result = await addSkill(skill);
    await refreshData();
    return result;
  };

  const handleEditSkill = async (skill: Skill): Promise<Skill> => {
    const result = await editSkill(skill);
    await refreshData();
    return result;
  };

  const handleDeleteSkill = async (id: string): Promise<void> => {
    await deleteSkill(id);
    await refreshData();
  };

  const handleAddProject = async (project: Project): Promise<Project> => {
    const result = await addProject(project);
    await refreshData();
    return result;
  };

  const handleEditProject = async (project: Project): Promise<Project> => {
    const result = await editProject(project);
    await refreshData();
    return result;
  };

  const handleDeleteProject = async (id: string): Promise<void> => {
    await deleteProject(id);
    await refreshData();
  };

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
          data={projectData}
          addItem={handleAddProject}
          editItem={handleEditProject}
          deleteItem={handleDeleteProject}
        />
        <CertificationCard
          title='Certifications'
          data={certData}
          addItem={handleAddCertification}
          editItem={handleEditCertification}
          deleteItem={handleDeleteCertification}
        />
      </div>
    </main>
  );
}

export default function Admin() {
  return <AdminContent />;
}
