// Skill interface
export interface Skill {
  _id: string;
  skillName: string;
}

// Project interface
export interface Project {
  _id: string;
  projectName: string;
  projectImage: string;
  description: string;
  projectLink: string;
}

// Certification interface
export interface Certification {
  _id: string;
  certName: string;
  certImage: string;
  description: string;
  dateAcquired: string;
}

// Blog interface
export interface Blog {
  _id: string;
  title: string;
  content: string;
  dateCreated: string;
  image: string;
}
