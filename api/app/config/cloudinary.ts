import cloudinary from "cloudinary";

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });
export default cloudinary

// use_filename as public id, 
export const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  };