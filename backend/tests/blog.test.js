import mongoose from 'mongoose';
import Blog from '../models/blog';

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

// Test suite for the Blog model
describe('Blog Model', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Clean up after each test
  afterEach(() => {
    
  });

  // Test creating a valid blog with all required fields
  it('should create a new blog with valid data', async () => {
    // Sample data with all required fields
    const blogData = {
      title: 'My First Blog Post',
      content: 'This is the content of my first blog post.',
      image: 'https://example.com/image.jpg',
      dateCreated: new Date('2024-01-01'),
    };

    // Create a new blog instance
    const blog = new Blog(blogData);

    // Validate the blog (should pass since all required fields are present)
    await expect(blog.validate()).resolves.toBeDefined();

    // Verify all fields were set correctly
    expect(blog.title).toBe('My First Blog Post');
    expect(blog.content).toBe('This is the content of my first blog post.');
    expect(blog.image).toBe('https://example.com/image.jpg');
    expect(blog.dateCreated).toEqual(new Date('2024-01-01'));
  });

  // Test creating a blog with missing required fields
  it('should fail to create a new blog with missing required fields', async () => {
    // Sample data missing the required title field
    const blogData = {
      content: 'This is the content of my first blog post.',
      image: 'https://example.com/image.jpg',
      dateCreated: new Date('2024-01-01'),
    };

    // Create a new blog instance
    const blog = new Blog(blogData);
    
    // Validate the blog (should fail because title is missing)
    await expect(blog.validate()).rejects.toThrow('title is required');
  })
})