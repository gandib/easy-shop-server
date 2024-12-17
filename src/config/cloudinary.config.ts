import { v2 as cloudinary } from "cloudinary";
import config from ".";

// Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret, // Click 'View Credentials' below to copy your API secret
});

export const cloudinaryUpload = cloudinary;