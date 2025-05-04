import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Helper function to generate a JWT token
const getTestToken = (payload = { userId: 'testUser' }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Export the helper function as default
export default getTestToken;
