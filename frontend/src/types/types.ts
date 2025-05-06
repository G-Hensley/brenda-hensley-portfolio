// Skill interface
export interface Skill {
  _id?: string;
  title: string;
}

// Project interface
export interface Project {
  _id: string;
  title: string;
  projectImage: string;
  description: string;
  projectLink: string;
}

// Certification interface
export interface Certification {
  _id: string;
  title: string;
  certImage: string;
  description: string[];
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
