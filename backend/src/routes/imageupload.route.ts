import express from "express";
import { Request, Response } from "express";
import { upload } from "../utils/multer";
import uploadImage from "../utils/cloudinary";

const imageUploadRoute = express.Router();

imageUploadRoute.post(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    try {
      const uploadedData = await uploadImage(req.file.path);
      const imageUrl = uploadedData.secure_url;

      return res.status(200).json({
        message: "Image uploaded successfully",
        success: true,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({
        message: "Error uploading image",
        success: false,
      });
    }
  }
);

export default imageUploadRoute;