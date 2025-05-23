import { S3Client } from '@aws-sdk/client-s3';

// Sets up and exports the AWS S3 client using credentials from environment variables
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
