import express from 'express';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../utils/s3Client.js';
import { ListObjectsV2Command, GetObjectCommand,  
  
 } from '@aws-sdk/client-s3';
import multer from 'multer';

// Create the router
const router = express.Router();

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
      contents.map(async (key) => {
        const cmd = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key.Key,
      })
      // Generate a short-lived GET URL for the object
      const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 })
      return { key: key.Key, url }
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

export default router;
