// Route for skills to get, create, update, and delete skills
import express from 'express';
import Skill from '../models/skill.js';
import authenticate from '../middlewares/auth.js';

// Create a router to handle skill routes
const router = express.Router();

// Get all skills - Public Route
router.get('/', async (req, res) => {
  // Try to get all skills from the database
  try {
    const skills = await Skill.find();
    res.status(200).json({ message: 'Skills fetched successfully', skills });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching skills', error: error.message });
  }
});

// Create a new skill - Admin Route
router.post('/admin', authenticate, async (req, res) => {
  // Get the skill data from the request body
  const { title } = req.body;

  // Try to create a new skill
  try {
    const newSkill = new Skill({ title });
    const savedSkill = await newSkill.save();
    res.status(201).json({ message: 'Skill created successfully', skill: savedSkill });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating skill', error: error.message });
  }
});

// Update a skill by id - Admin Route
router.put('/admin/:id', authenticate, async (req, res) => {
  // Get the skill data from the request body
  const { title } = req.body;

  // Try to update the skill
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.status(200).json({ message: 'Skill updated successfully', skill: updatedSkill });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating skill', error: error.message });
  }
});

// Delete a skill by id - Admin Route
router.delete('/admin/:id', authenticate, async (req, res) => {
  // Get the skill id from the request params
  const { id } = req.params;

  // Try to delete the skill
  try {
    await Skill.findByIdAndDelete(id);
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting skill', error: error.message });
  }
});

// Export the router as a module
export default router;
