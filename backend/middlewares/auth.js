import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Middleware to authenticate the user
const authenticate = (req, res, next) => {

  // Get the token from the request header
  const token = req.headers.authorization;

  // If the token is not provided, return a 401 error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Try to verify the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Export the authenticate middleware
export default authenticate;
