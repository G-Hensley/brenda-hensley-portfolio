import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the express app
const app = express();
// Define the port
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


