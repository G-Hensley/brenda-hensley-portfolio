import express from 'express';
import Project from '../models/project.js';
import authenticate from '../middlewares/auth.js';

// Create a router to handle project routes
const router = express.Router();

// Public route - Get Projects
router.get('/', async (req, res) => {
  // Try to get all projects from the database
  try {
    const projects = await Project.find();
    res
      .status(200)
      .json({ message: 'Projects fetched successfully', projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching projects', error: error.message });
  }
});

// Admin Route - Create new project
router.post('/admin', authenticate, async (req, res) => {
  // Get the project data from the body request
  const { title, description, link, fileUrl, fileKey, skills } = req.body;

  // Try to create a new project
  try {
    const newProject = new Project({
      title,
      description,
      link,
      fileUrl,
      fileKey,
      skills,
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
router.put('/admin/:id', authenticate, async (req, res) => {
  // Get the project data from the body request
  const { title, description, link, fileUrl, fileKey, skills } = req.body;

  // Try to update the project
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, link, fileUrl, fileKey, skills },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating project', error: error.message });
  }
});

// Admin Route - Delete project by id
router.delete('/admin/:id', authenticate, async (req, res) => {
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
