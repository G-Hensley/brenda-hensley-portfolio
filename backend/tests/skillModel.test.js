import mongoose from 'mongoose';
import Skill from '../models/skill';

// Mock mongoose to simulate database behavior without actually connecting to MongoDB
jest.mock('mongoose', () => {
  // Simulate a MongoDB connection
  const mockConnection = { readyState: 1 };

  // Store the current schema definition
  let currentSchema = null;

  // Mock the Schema constructor
  // This is called when mongoose.Schema() is used in the Skill model
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
  // This is called when mongoose.model() is used to create the Skill model
  const mockModel = function (modelName, schema) {
    // Return a class that will be used to create Skill instances
    return class {
      constructor(data) {
        // Copy all properties from the input data to the instance
        Object.assign(this, data);

        // Implement the validate method that mongoose would provide
        this.validate = async () => {
          // Check if there's a schema to validate against
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

// Test suite for the Skill model
describe('Skill Model', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Clean up after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test creating a valid skill with all required fields
  it('should create a new skill with valid data', async () => {
    // Sample data with all required fields
    const skillData = {
      skillName: 'Linux',
    };

    // Create a new skill instance
    const skill = new Skill(skillData);

    // Validate the skill (should pass since all required fields are present)
    await expect(skill.validate()).resolves.toBeDefined();  

    // Verify all fields were set correctly
    expect(skill.skillName).toBe('Linux');
  });

  // Test creating a skill with missing required fields
  it('should fail to create a new skill with missing required fields', async () => {
    // Sample data missing the required skillName field
    const skillData = {};

    // Create a new skill instance
    const skill = new Skill(skillData);

    // Validate the skill (should fail since required field is missing)
    await expect(skill.validate()).rejects.toThrow('skillName is required');
  }); 
});
