import express from 'express';
import Project from '../models/project.js';

// Create a router to handle project routes
const router = express.Router();

// Public route - Get Projects
router.get('/', async (req, res) => {
  // Try to get all projects from the database
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching projects', error: error.message });
  }
});

// Admin Route - Create new project
router.post('/admin', async (req, res) => {
  // Get the project data from the body request
  const { projectName, projectImage, description, projectLink } = req.body;

  // Try to create a new project
  try {
    const newProject = new Project({
      projectName,
      projectImage,
      description,
      projectLink,
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating new project', error: error.message });
  }
});

// Admin Route - Update project by id
router.put('/admin/:id', async (req, res) => {

  // Get the project data from the body request
  const { projectName, projectImage, description, projectLink } = req.body;

  // Try to update the project
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, { projectName, projectImage, description, projectLink }, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating project', error: error.message });
  }
});

// Admin Route - Delete project by id
router.delete('/admin/:id', async (req, res) => {

  // Try to delete the project
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting project', error: error.message });
  }
});


export default router;
