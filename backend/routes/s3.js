import express from 'express';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../utils/s3Client.js';
import { ListObjectsV2Command, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';

// Create the router
const router = express.Router();

// Set up multer for file uploads/in memory storage
const upload = multer()

// Get /api/s3/certImages
router.get('/certImages', async (req, res) => {

  try {
    // List all objects under certs prefix
    const listResp = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: 'certs/',
    }))

    const contents = listResp.Contents || [];

    // Generate a short-lived GET URL for each key
    const images = await Promise.all(
      contents.map(async ({ Key }) => {
        const cmd = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key,
      })
      // Generate a short-lived GET URL for the object
      const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 })
      return { key: Key, url }
      })
    )

    // Return the images as a JSON response
    res.status(200).json(images)
  } catch (error) {
    // Log the error
    console.error('Error fetching cert images:', error);
    // Return a 500 error
    res.status(500).json({ error: 'Error fetching cert images' })
  }

})

// POST /api/s3/certImages
router.post('/certImages', upload.single('file'), async (req, res) => {

  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const key = `certs/${Date.now()}-${file.originalname}`;

  try {
    // Upload the file to S3
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }))

    // build public URL
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

    // Return the URL as a JSON response
    res.status(201).json({ key, url });
    
  } catch (error) {
    // Log the error
    console.error('Error uploading cert image:', error);
    // Return a 500 error
    res.status(500).json({ error: 'Error uploading cert image' });
  }

});

// Update /api/s3/certImages/:key
router.put('/certImages/:key', upload.single('file'), async (req, res) => {

  const file = req.file;
  const key = req.params.key;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Upload the file to S3
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }))
    return res.status(200).json({ message: 'Cert image updated successfully', key, url });
  } catch (error) {
    // Log the error
    console.error('Error updating cert image:', error);
    // Return a 500 error
    res.status(500).json({ error: 'Error updating cert image' });
  }

});

// DELETE a certImage /api/s3/certImages/:key(*)
router.delete('/certImages/:key(*)', async (req, res) => {
  const key = req.params.key
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    }))
    return res.status(200).json({ message: 'Deleted', key })
  } catch (err) {
    console.error('Error deleting cert image:', err)
    return res.status(500).json({ error: 'Error deleting cert image' })
  }
})


export default router;
