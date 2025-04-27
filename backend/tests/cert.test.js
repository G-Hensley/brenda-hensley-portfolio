import mongoose from 'mongoose';
import Cert from '../models/cert';
import jest from 'jest';

// Mock the mongoose connection
jest.mock('mongoose', () => {

  const mockConnection = { readyState: 1 };
  const mockSchema = jest.fn();
  const mockModel = jest.fn();

  return {
    connect: jest.fn().mockResolvedValue(),
    connection: mockConnection,
    Schema: mockSchema,
    model: mockModel,
    _esModule: true,
  };
});

// Set up the test environment
describe('Cert Model', () => {
  // Clean up the mock connection before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Restore the mock connection after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Create a new cert with all required fields
  it('should create a new cert with valid data', async () => {
    const certData = {
      certName: "CompTIA A+",
      certImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s",
      description: "CompTIA A+ certification is a globally recognized certification that validates the skills and knowledge of IT professionals in the areas of hardware, software, and networking.",
    };
    // Create a new cert
    const cert = new Cert(certData);

    expect(cert.certName).toBe("CompTIA A+");
    expect(cert.certImage).toBe("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s");
    expect(cert.description).toBe("CompTIA A+ certification is a globally recognized certification that validates the skills and knowledge of IT professionals in the areas of hardware, software, and networking.");
  });

  // Create a new cert with missing required fields
  it('should fail to create a new cert with missing required fields', async () => {
    const certData = {
      certName: "CompTIA A+",
      certImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s",
    };

    const cert = new Cert(certData);
    await expect(cert.validate()).rejects.toThrow(/description is required/);
  });
  
})
