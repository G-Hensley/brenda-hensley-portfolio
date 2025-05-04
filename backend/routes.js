import projects from './routes/projects.js';
import skills from './routes/skills.js';
import certs from './routes/certs.js';
import blogs from './routes/blogs.js';
import express from 'express';

// Create a router to handle routes
const routes = express.Router();

// Use all of the routes
routes.use('/projects', projects);
routes.use('/skills', skills);
routes.use('/certs', certs);
routes.use('/blogs', blogs);

// Export the router directly
export default routes;
