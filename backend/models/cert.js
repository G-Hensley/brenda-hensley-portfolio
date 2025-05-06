import { Schema, model } from 'mongoose';

const certSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  certImage: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  dateAcquired: {
    type: Date,
    required: true,
  },
});

const Cert = model('Cert', certSchema);

export default Cert;
