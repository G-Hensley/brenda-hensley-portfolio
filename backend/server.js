import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create the express app
const app = express();
// Define the port
const port = process.env.PORT || 3001;

let dbConnected = false;

// Set up the database connection
const db = mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
    dbConnected = true;
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
  });

// Set up /api/health route to check if the server is running
app.get('/api/health', (req, res) => {
    if (res.statusCode === 200 && dbConnected) {
        res.json({ status: 'OK', "Connection to DB": dbConnected });
    } else {
        res.status(500).json({ status: 'ERROR', "Connection to DB": dbConnected });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


