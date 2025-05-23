import express from 'express';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../utils/s3Client.js';
import {
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import multer from 'multer';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const getPublicUrl = (key) =>
  `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

// GET files in a folder (e.g., /api/s3/certs or /api/s3/projects)
router.get('/:folder(certs|projects)', async (req, res) => {
  const { folder } = req.params;

  try {
    const listResp = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: `${folder}/`,
      })
    );

    const contents = listResp.Contents || [];

    const files = await Promise.all(
      contents.map(async ({ Key }) => {
        const cmd = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key,
        });
        const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
        return { key: Key, url };
      })
    );

    res.status(200).json(files);
  } catch (error) {
    console.error(`Error fetching files from ${folder}:`, error);
    res.status(500).json({ error: `Error fetching files from ${folder}` });
  }
});

// POST upload to certs or projects
router.post('/:folder(certs|projects)', upload.single('file'), async (req, res) => {
  const { folder } = req.params;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const key = `${folder}/${Date.now()}-${file.originalname}`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    res.status(201).json({ key, url: getPublicUrl(key) });
  } catch (error) {
    console.error(`Error uploading file to ${folder}:`, error);
    res.status(500).json({ error: `Error uploading file to ${folder}` });
  }
});

// PUT update file
router.put('/:folder(certs|projects)/:key(*)', upload.single('file'), async (req, res) => {
  const file = req.file;
  const key = req.params.key;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    res.status(200).json({ message: 'File updated successfully', key, url: getPublicUrl(key) });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ error: 'Error updating file' });
  }
});

// DELETE file
router.delete('/:folder(certs|projects)/:key(*)', async (req, res) => {
  const key = req.params.key;

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    );

    res.status(200).json({ message: 'Deleted', key });
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

export default router;
