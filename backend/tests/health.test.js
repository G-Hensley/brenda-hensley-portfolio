import app from '../server';
import request from 'supertest';
import mongoose from 'mongoose';
import jest from 'jest';

// Describe the test for the /api/health route
describe('GET /api/health', () => {
  it('should return OK if MongoDB is connected', async () => {

    // Mock the mongoose connection
    jest.spyOn(mongoose.connection, 'readyState', 'get').mockReturnValue(1);

    // Make the request
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toEqual({ status: 'OK', message: 'MongoDB connected'});
  });

  // Test for the /api/health route when MongoDB is disconnected
  it('should return ERROR if MongoDB is disconnected', async () => {

    // Mock the mongoose connection
    jest.spyOn(mongoose.connection, 'readyState', 'get').mockReturnValue(0);

    // Make the request
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(500);
    expect(response.body.status).toEqual({ status: 'ERROR', message: 'MongoDB disconnected'});
  });
});