import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Middleware to authenticate the user
const authenticate = (req, res, next) => {

  // Get the token from the request header
  const authHeader = req.headers.authorization;

  // If the token is not provided, return a 401 error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the token from the Bearer string
  const token = authHeader.split(' ')[1];

  // Try to verify the token
  try {
    const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Export the authenticate middleware
export default authenticate;
