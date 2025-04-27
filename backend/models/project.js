import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
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
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

