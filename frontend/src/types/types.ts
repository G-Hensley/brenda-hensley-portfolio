// Skill interface
export interface Skill {
  _id?: string;
  title: string;
}

// Project interface
export interface Project {
  _id?: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

// Certification interface
export interface Certification {
  _id?: string;
  title: string;
  description: string[];
  dateAcquired: string;
  fileUrl: string;
  fileKey: string;
}

// Blog interface
export interface Blog {
  _id?: string;
  title: string;
  content: string;
  dateCreated: string;
  image: string;
}
