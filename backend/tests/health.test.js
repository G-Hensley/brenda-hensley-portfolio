import app from '../server';
import request from 'supertest';
import mongoose, { connect } from 'mongoose';

// Mock the mongoose connection
jest.mock('mongoose', () => {
  // Set up the mock connection to be returned by the connect method
  const mockConnection = {
    readyState: 1,
  };
  return {
    connect: jest.fn().mockResolvedValue(),
    connection: mockConnection,
    _esModule: true,
  };
});

// Set global timeout
jest.setTimeout(10000);

// Describe the test for the /api/health route
describe('GET /api/health', () => {
  // Clean up the mock connection before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Ensure no open handles
    jest.restoreAllMocks();
  });

  // Test for the /api/health route when MongoDB is connected
  it('should return 200 if MongoDB is connected', async () => {
    mongoose.connection.readyState = 1;

    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  }, 5000);

  // Test for the /api/health route when MongoDB is disconnected
  it('should return 500 if MongoDB is disconnected', async () => {
    mongoose.connection.readyState = 0;

    const response = await request(app).get('/api/health');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Database not connected',
    });
  }, 5000);
});
