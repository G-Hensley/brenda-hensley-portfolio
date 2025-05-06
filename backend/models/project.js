import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  projectImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
});

const Project = model('Project', projectSchema);

export default Project;
