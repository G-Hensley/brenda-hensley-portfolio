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

// Test for the /api/certs/admin route to add a new cert
describe('POST /api/certs/admin', () => {
  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // Close database connection after tests  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should add a new cert', async () => {
    const response = await request(app).post('/api/certs/admin').send({
      certName: 'Test Cert',
      certImage: 'https://example.com/test-cert.png',
      description: 'This is a test cert',
      dateAcquired: '2021-01-01',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Cert added successfully');
    expect(response.body.cert).toBeInstanceOf(Object);
  });

  // Test for the /api/certs/admin route to add a new cert with invalid data
  it('should return a 500 status code and an error message when adding a new cert with invalid data', async () => {
    const response = await request(app).post('/api/certs/admin').send({
      certImage: 'https://example.com/test-cert.png',
      description: 'This is a test cert',
      dateAcquired: '2021-01-01',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error creating cert');
  })
});
