import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sanitize from 'mongo-sanitize';
import routes from './routes.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Create the express app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Basic CORS setup - do this BEFORE any other middleware
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Then add other middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  next();
});

// Use the routes
app.use('/api', routes);

// Define the port
const port = process.env.PORT || 4992;

// Set up the database connection
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Set up /api/health route to check if the server is running
app.get('/api/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ status: 'ok' });
  } else {
    res
      .status(500)
      .json({ status: 'error', message: 'Database not connected' });
  }
});

// Start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
