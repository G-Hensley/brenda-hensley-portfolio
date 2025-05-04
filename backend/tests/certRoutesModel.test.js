import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test for the /api/certs route
describe('Get /api/certs', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for the /api/certs route when there are certs in the database
  it('should return a list of certs', async () => {
    const response = await request(app).get('/api/certs');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Certs fetched successfully');
    expect(response.body.certs).toBeInstanceOf(Array);
  });
});
