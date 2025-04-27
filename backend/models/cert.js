import mongoose from 'mongoose';

const certSchema = new mongoose.Schema({
  certName: {
    type: String,
    required: true,
  },
  certImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})

const Cert = mongoose.model('Cert', certSchema);

export default Cert;
