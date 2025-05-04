import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
});

const Blog = model('Blog', blogSchema);

export default Blog;
