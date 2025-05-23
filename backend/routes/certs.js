// routes/certs.js
import express from 'express';
import Cert from '../models/cert.js';
import authenticate from '../middlewares/auth.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../utils/s3Client.js';

const router = express.Router();

// GET all certs
router.get('/', async (req, res) => {
  try {
    const certs = await Cert.find();
    res.json({ certs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE cert
router.post('/admin', authenticate, async (req, res) => {
  const { title, description, dateAcquired, fileKey, fileUrl } = req.body;
  if (!fileKey || !fileUrl) return res.status(400).json({ error: 'Missing fileKey/fileUrl' });
  try {
    const cert = await Cert.create({ title, description, dateAcquired, fileKey, fileUrl });
    res.status(201).json({ cert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE cert
router.put('/admin/:id', authenticate, async (req, res) => {
  const { title, description, dateAcquired, fileKey, fileUrl } = req.body;
  try {
    const cert = await Cert.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });

    // if image changed, delete old then swap
    if (fileKey && fileKey !== cert.fileKey) {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: cert.fileKey,
      }));
      cert.fileKey = fileKey;
      cert.fileUrl = fileUrl;
    }

    cert.title        = title;
    cert.description  = description;
    cert.dateAcquired = dateAcquired;
    await cert.save();
    res.json({ cert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE cert
router.delete('/admin/:id', authenticate, async (req, res) => {
  try {
    const cert = await Cert.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Not found' });

    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: cert.fileKey,
    }));
    await Cert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
