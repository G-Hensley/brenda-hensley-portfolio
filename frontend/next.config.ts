import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      process.env.NEXT_PUBLIC_S3_HOSTNAME ?? "brenda-certification-images.s3.us-east-2.amazonaws.com"
    ]
  },
};

export default nextConfig;
