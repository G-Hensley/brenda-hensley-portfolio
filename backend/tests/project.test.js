import mongoose from 'mongoose';
import Project from '../models/project';

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

// Test suite for the Project model
describe('Project Model', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Clean up after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });


  // Test creating a valid project with all required fields
  it('should create a new project with valid data', async () => {
    // Sample data with all required fields
    const projectData = {
      projectName: 'My First Project',
      projectImage: 'https://example.com/image.jpg',
      description: 'This is the description of my first project.',
      projectLink: 'https://example.com/project',
    };

    // Create a new project instance
    const project = new Project(projectData);

    // Validate the project (should pass since all required fields are present)
    await expect(project.validate()).resolves.toBeDefined();

    // Verify all fields were set correctly
    expect(project.projectName).toBe('My First Project');
    expect(project.projectImage).toBe('https://example.com/image.jpg');
    expect(project.description).toBe('This is the description of my first project.');
    expect(project.projectLink).toBe('https://example.com/project');
  });

  // Test creating a project with missing required fields
  it('should fail to create a new project with missing required fields', async () => {
    // Sample data missing the required projectName field
    const projectData = {
      projectImage: 'https://example.com/image.jpg',
      description: 'This is the description of my first project.',
      projectLink: 'https://example.com/project',
    };

    // Create a new project instance
    const project = new Project(projectData);

    // Validate the project (should fail because projectName is missing)
    await expect(project.validate()).rejects.toThrow('Project name is required');
  });
});
