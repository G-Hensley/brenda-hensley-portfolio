import express from 'express';
import Blog from '../models/blog.js';

// Create a router to handle blog routes
const router = express.Router();

// Get all blogs - Public Route
router.get('/', async (req, res) => {

  // Try to get all blogs from the database
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: 'Blogs fetched successfully', blogs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Create a new blog - Admin Route
router.post('/admin', async (req, res) => {
  // Get the blog data from the request body
  const { title, content, image, dateCreated } = req.body;

  // Try to create a new blog
  try {
    const newBlog = new Blog({ title, content, image, dateCreated });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
});

// Update a blog by id - Admin Route
router.put('/admin/:id', async (req, res) => {
  // Get the blog data from the request body
  const { title, content, image, dateCreated } = req.body;

  // Try to update the blog
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content, image, dateCreated }, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
});

// Delete a blog by id - Admin Route
router.delete('/admin/:id', async (req, res) => {
  // Get the blog id from the request params
  const { id } = req.params;

  // Try to delete the blog
  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
});

// Export the router
export default router;