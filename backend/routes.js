import projects from './routes/projects.js';
import skills from './routes/skills.js';
import express from 'express';

// Create a router to handle routes
const routes = express.Router();

// Use the projects and skills routes
routes.use('/projects', projects);
routes.use('/skills', skills);

// Export the router directly
export default routes;
