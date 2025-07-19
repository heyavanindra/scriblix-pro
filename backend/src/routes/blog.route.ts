import express from "express";
import { Request, Response } from "express";
import { BlogModel } from "../model/model";
import { authMiddleware } from "../middleware/middleware";

const blogRoute = express.Router();

blogRoute.post(
  "/create",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { title, content, imageUrl } = req.body;
    const author = req.username;
    const userId = req.userId;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title, content, and ImageUrl are required",
        success: false,
      });
    }

    if (!userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false,
      });
    }

    try {
      const newBlog = await BlogModel.create({
        title,
        content,
        author: userId,
        featuredImage: imageUrl,
      });
      await newBlog.save();
      return res.status(201).json({
        message: "Blog created successfully",
        success: true,
        blog: newBlog,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error creating blog",
        success: false,
      });
    }
  }
);

blogRoute.delete(
  "/remove/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const userId = req.userId;

    if (!blogId) {
      return res.status(400).json({
        message: "Blog ID is required",
        success: false,
      });
    }
    if (!userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false,
      });
    }

    try {
      const deleted = await BlogModel.findByIdAndDelete(blogId);

      if (!deleted) {
        return res.status(404).json({
          message: "Blog not found",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Blog deleted successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      return res.status(500).json({
        message: "Error deleting blog",
        success: false,
      });
    }
  }
);

export default blogRoute;
