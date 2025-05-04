// Route for skills to get, create, update, and delete skills
import express from 'express';
import Skill from '../models/skill';

// Create a router to handle skill routes
const router = express.Router();

// Get all skills - Public Route
router.get('/skills', async (req, res) => {

  // Try to get all skills from the database
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  };

});

// Create a new skill - Admin Route
router.post('/admin/skills', async (req, res) => {

  // Get the skill data from the request body
  const { skillName } = req.body;

  // Try to create a new skill
  try {
    const newSkill = await Skill({ skillName }).save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
});

// Update a skill by id - Admin Route
router.put('/admin/skills/:id', async (req, res) => {

  // Get the skill data from the request body
  const { skillName } = req.body;

  // Try to update the skill
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, { skillName }, { new: true });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
});

// Delete a skill by id - Admin Route
router.delete('/admin/skills/:id', async (req, res) => {

  // Try to delete the skill
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
});

// Export the router as a module
export default router;

