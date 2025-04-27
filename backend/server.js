import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import sanitize from 'mongo-sanitize';

// Load environment variables
dotenv.config();

// Create the express app
const app = express();
// Define the port
const port = process.env.PORT || 3001;

// Set up Middleware
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(csurf());
app.use((req, res, next) => {
    req.body = sanitize(req.body);
    next();
});

// Set up the database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
    dbConnected = true;
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
  });

// Set up /api/health route to check if the server is running
app.get('/api/health', (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    if (mongoStatus === 'Connected') {
        res.json({ status: 'OK', message: 'MongoDB connected'});
    } else {
        res.status(500).json({ status: 'ERROR', message: 'MongoDB disconnected'});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


