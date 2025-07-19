import { v2 as cloudinary } from "cloudinary";

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export default uploadImage