import Cert from '../models/cert';

// Mock mongoose to simulate database behavior without actually connecting to MongoDB
jest.mock('mongoose', () => {

  // Simulate a MongoDB connection
  const mockConnection = { readyState: 1 };

  // Store the current schema definition
  // This will hold the schema that defines required fields and validation rules
  let currentSchema = null;

  // Mock the Schema constructor
  // This is called when mongoose.Schema() is used in the Cert model
  const mockSchema = function (schemaDefinition) {

    // Store the schema definition for later use in validation
    currentSchema = schemaDefinition;
    return {
      methods: {},
      statics: {},
      pre: jest.fn(),
      post: jest.fn(),
    };

  };

  // Mock the Model constructor
  // This is called when mongoose.model() is used to create the Cert model
  const mockModel = function (modelName, schema) {

    // Return a class that will be used to create Cert instances
    return class {
      constructor(data) {
        // Copy all properties from the input data to the instance
        Object.assign(this, data);

        // Implement the validate method that mongoose would provide
        this.validate = async () => {
          // Check if we have a schema to validate against
          if (!currentSchema) {
            throw new Error('Schema not found');
          }

          // Check each field in the schema
          for (const [key, value] of Object.entries(currentSchema)) {
            // If the field is required and not present in the instance
            if (value.required && !this[key]) {
              throw new Error(`${key} is required`);
            }
          }
          return this;
        };
      }
    };
  };

  // Return the mocked mongoose object
  return {
    connect: jest.fn().mockResolvedValue(),
    connection: mockConnection,
    Schema: mockSchema,
    model: mockModel,
    _esModule: true,
  };
});

// Test suite for the Cert model
describe('Cert Model', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Clean up after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test creating a valid cert with all required fields
  it('should create a new cert with valid data', async () => {
    // Sample data with all required fields
    const certData = {
      certName: 'CompTIA A+',
      certImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s',
      description:
        [
          'CompTIA A+ certification is a globally recognized certification that validates the skills and knowledge of IT professionals in the areas of hardware, software, and networking.',
          'The exam is divided into two parts: A+ Core and A+ Practical Applications.',
          'The A+ Core exam covers topics such as computer hardware, operating systems, networking fundamentals, and troubleshooting.',
        ],
      dateAcquired: new Date('2024-01-01'),
    };

    // Create a new cert instance
    const cert = new Cert(certData);

    // Validate the cert (should pass since all required fields are present)
    await expect(cert.validate()).resolves.toBeDefined();

    // Verify all fields were set correctly
    expect(cert.certName).toBe('CompTIA A+');
    expect(cert.certImage).toBe(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s'
    );
    expect(cert.description).toEqual(
      [
        'CompTIA A+ certification is a globally recognized certification that validates the skills and knowledge of IT professionals in the areas of hardware, software, and networking.',
        'The exam is divided into two parts: A+ Core and A+ Practical Applications.',
        'The A+ Core exam covers topics such as computer hardware, operating systems, networking fundamentals, and troubleshooting.',
      ]
    );
    expect(cert.dateAcquired).toEqual(new Date('2024-01-01'));
  });

  // Test creating a cert with missing required fields
  it('should fail to create a new cert with missing required fields', async () => {
    // Sample data missing the required description field
    const certData = {
      certName: 'CompTIA A+',
      certImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCWMFged4-Z7jimxPilwoHOEqRFLlj-yTsGA&s',
      dateAcquired: new Date('2024-01-01'),
    };

    // Create a new cert instance
    const cert = new Cert(certData);

    // Validate the cert (should fail because description is missing)
    await expect(cert.validate()).rejects.toThrow(/description is required/);
  });
});
