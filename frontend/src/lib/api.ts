import { Skill, Project, Certification, Blog } from '@/types/types';
import { getSession } from 'next-auth/react';

const baseUrl = 'http://localhost:4992/api';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();
  const token = session?.user?.token;

  const hasBody = Boolean(options.body);
  const headers: Record<string, string> = {};
  if (hasBody && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // you can drop this if you switch to pure JWT auth
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${await response.text()}`);
  }
  return response;
};

export const getSkills = async (): Promise<Skill[]> => {
  const res = await fetchWithAuth(`${baseUrl}/skills`);
  const data = await res.json();
  return data.skills;
};

export const getProjects = async (): Promise<Project[]> => {
  const res = await fetchWithAuth(`${baseUrl}/projects`);
  const data = await res.json();
  return data.projects;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetchWithAuth(`${baseUrl}/blogs`);
  const data = await res.json();
  return data.blogs;
};

export const getCertifications = async (): Promise<Certification[]> => {
  const res = await fetchWithAuth(`${baseUrl}/certs`);
  const data = await res.json();
  return data.certs;
};

export const addSkill = async (skill: Skill): Promise<Skill> => {
  const res = await fetchWithAuth(`${baseUrl}/skills/admin`, {
    method: 'POST',
    body: JSON.stringify(skill),
  });
  return (await res.json()).skill;
};

export const editSkill = async (skill: Skill): Promise<Skill> => {
  const res = await fetchWithAuth(`${baseUrl}/skills/admin/${skill._id}`, {
    method: 'PUT',
    body: JSON.stringify(skill),
  });
  return (await res.json()).skill;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await fetchWithAuth(`${baseUrl}/skills/admin/${id}`, {
    method: 'DELETE',
  });
};

export const addProject = async (project: Project): Promise<Project> => {
  const res = await fetchWithAuth(`${baseUrl}/projects/admin`, {
    method: 'POST',
    body: JSON.stringify(project),
  });
  return (await res.json()).project;
};

export const editProject = async (project: Project): Promise<Project> => {
  const res = await fetchWithAuth(`${baseUrl}/projects/admin/${project._id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  });
  return (await res.json()).project;
};

export const deleteProject = async (id: string): Promise<void> => {
  await fetchWithAuth(`${baseUrl}/projects/admin/${id}`, {
    method: 'DELETE',
  });
};

// ————————————————
// NEW: Certification & S3 integration
// ————————————————

// 1) helper to upload the file to S3 and get back key+url
async function uploadCertImage(
  file: File
): Promise<{ key: string; url: string }> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetchWithAuth(`${baseUrl}/s3/certImages`, {
    method: 'POST',
    body: form,
  });

  return res.json();
}

// 2) add a new cert (must include a File on certification.file)
export const addCertification = async (
  certification: Omit<Certification, 'fileKey' | 'fileUrl' | '_id'> & {
    file: File;
  }
): Promise<Certification> => {
  const { key, url } = await uploadCertImage(certification.file);

  const payload = {
    title: certification.title,
    description: certification.description,
    dateAcquired: certification.dateAcquired,
    fileKey: key,
    fileUrl: url,
  };

  const res = await fetchWithAuth(`${baseUrl}/certs/admin`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return (await res.json()).cert;
};

// 4) edit an existing cert (file is optional)
export const editCertification = async (
  certification: Partial<Omit<Certification, 'fileKey' | 'fileUrl'>> & {
    _id: string;
    file?: File;
    fileKey?: string;
    fileUrl?: string;
  }
): Promise<Certification> => {
  const payload: Certification = {
    title: certification.title ?? '',
    description: certification.description ?? [],
    dateAcquired: certification.dateAcquired ?? '',
    fileKey: certification.fileKey ?? '',
    fileUrl: certification.fileUrl ?? '',
  };

  if (certification.file) {
    const { key, url } = await uploadCertImage(certification.file);
    payload.fileKey = key;
    payload.fileUrl = url;
  }

  const res = await fetchWithAuth(
    `${baseUrl}/certs/admin/${certification._id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );

  return (await res.json()).cert;
};

// 5) delete a cert
export const deleteCertification = async (id: string): Promise<void> => {
  await fetchWithAuth(`${baseUrl}/certs/admin/${id}`, {
    method: 'DELETE',
  });
};
