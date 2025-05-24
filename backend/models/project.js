import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileKey: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const Project = model('Project', projectSchema);

export default Project;
