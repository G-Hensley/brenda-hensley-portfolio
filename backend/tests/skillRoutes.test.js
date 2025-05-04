import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import getTestToken from '../utils/authHelper.js';

// Set test environment variables
process.env.JWT_SECRET = 'test_secret_key_for_jwt';
process.env.MONGODB_URI = 'mongodb://localhost:27017/portfolio_test';

// Load environment variables
dotenv.config();

// Get a test token
const token = getTestToken();

// Test for the /api/skills route to get all skills
describe('GET /api/skills', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for the /api/skills route when there are skills in the database
  it('should return a list of skills', async () => {
    const response = await request(app).get('/api/skills');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Skills fetched successfully');
  });
});

// Test for the /api/skills/admin route to create a new skill
describe('POST /api/skills/admin', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for the /api/skills/admin route to create a new skill
  it('should create a new skill', async () => {
    const response = await request(app)
      .post('/api/skills/admin')
      .set('Authorization', `Bearer ${token}`)
      .send({
        skillName: 'Test Skill',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Skill created successfully');
  });

  // Test for the /api/skills/admin route to create a new skill with no skill name
  it('should return an error if the skill name is not provided', async () => {
    const response = await request(app)
      .post('/api/skills/admin')
      .set('Authorization', `Bearer ${token}`)
      .send({
        skillName: '',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error creating skill');
  });
});

// Test for the /api/skills/admin route to update a skill
describe('PUT /api/skills/admin/:id', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for the /api/skills/admin route to update a skill
  it('should update a skill', async () => {
    const response = await request(app)
      .put('/api/skills/admin/668596859685968596859685')
      .set('Authorization', `${token}`)
      .send({
        skillName: 'Updated Skill',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Skill updated successfully');
  });
});

// Test for the /api/skills/admin route to delete a skill
describe('DELETE /api/skills/admin/:id', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for the /api/skills/admin route to delete a skill
  it('should delete a skill', async () => {
    const response = await request(app)
      .delete('/api/skills/admin/668596859685968596859685')
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Skill deleted successfully');
  });
});
