import express from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../utils/s3Client.js';

const router = express.Router();

router.get('/s3-url', async (req, res) => {
  const { fileName, fileType } = req.query;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  res.json({ url: signedUrl });
});

export default router;
