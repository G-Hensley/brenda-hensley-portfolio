import { Skill, Project, Certification, Blog } from '@/types/types';
import { getSession } from 'next-auth/react';

const baseUrl = 'http://localhost:4992/api';

// Get all skills from the database
export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${baseUrl}/skills`);
  const data = await response.json();
  return data.skills;
};

// Get all projects from the database
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${baseUrl}/projects`);
  const data = await response.json();
  return data.projects;
};

// Get all certifications from the database
export const getCertifications = async (): Promise<Certification[]> => {
  const response = await fetch(`${baseUrl}/certs`);
  const data = await response.json();
  return data.certs;
};

// Get all blogs from the database
export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${baseUrl}/blogs`);
  const data = await response.json();
  return data.blogs;
};

// Add a new skill to the database
export const addSkill = async (skill: Skill): Promise<Skill> => {
  const session = await getSession();
  const token = session?.user?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${baseUrl}/skills/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skill),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.skill;
};

// Add a new project to the database
export const addProject = async (project: Project): Promise<Project> => {
  const response = await fetch(`${baseUrl}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data.project;
};

// Add a new certification to the database
export const addCertification = async (
  certification: Certification
): Promise<Certification> => {
  const session = await getSession();
  const token = session?.user?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }
  const response = await fetch(`${baseUrl}/certs/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(certification),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.certs;
};

// Edit a skill in the database
export const editSkill = async (skill: Skill): Promise<Skill> => {
  const session = await getSession();
  const token = session?.user?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${baseUrl}/skills/admin/${skill._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skill),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.skill;
};

// Edit a project in the database
export const editProject = async (project: Project): Promise<Project> => {
  const response = await fetch(`${baseUrl}/projects/${project._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data.project;
};

// Edit a certification in the database
export const editCertification = async (
  certification: Certification
): Promise<Certification> => {
  const response = await fetch(`${baseUrl}/certs/${certification._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(certification),
  });
  const data = await response.json();
  return data.certification;
};

// Delete a skill from the database
export const deleteSkill = async (id: string): Promise<void> => {
  const session = await getSession();
  const token = session?.user?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }
  await fetch(`${baseUrl}/skills/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a project from the database
export const deleteProject = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/projects/${id}`, {
    method: 'DELETE',
  });
};

// Delete a certification from the database
export const deleteCertification = async (id: string): Promise<void> => {
  const session = await getSession();
  const token = session?.user?.token;

  if (!token) {
    throw new Error('No authentication token found');
  }

  await fetch(`${baseUrl}/certs/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
