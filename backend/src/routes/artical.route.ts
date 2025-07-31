import express, { Request, Response } from "express";
import { BlogModel } from "../model/model";
import { createPostSchema } from "../schema/schema";
import { authMiddleware } from "../middleware/middleware";

const articleRoute = express.Router();

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

articleRoute.get("/", async (req: Request, res: Response) => {
  try {
    const article = await BlogModel.find({});
    if (!article || article.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }
    res.status(200).json({
      message: article,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

articleRoute.post("/",authMiddleware, async (req: Request, res: Response) => {
  const article = req.body;
  const parsedArticle = createPostSchema.safeParse(article);
  if (!parsedArticle.success) {
    return res.status(400).json({
      message: "Invalid article data",
      errors: parsedArticle.error.message,
    });
  }

  const slug = generateSlug(parsedArticle.data.title);
  const { author, content, tags, featuredImage, title } = parsedArticle.data;
  try {
    const blogCreated = await BlogModel.create({
      title: title,
      content: content,
      tags: tags,
      featuredImage: featuredImage,
      slug: slug,
      author: req.userId,
    });
    if (!blogCreated) {
      return res.status(502).json({
        message: "Error white creating the blog",
      });
    }

    return res.status(201).json({
      blogCreated,
      message: "success",
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

articleRoute.patch("/:id", async (req: Request, res: Response) => {
  const slug = req.params.id;

  const parsedArticle = createPostSchema.safeParse(req.body);
  if (!parsedArticle.success) {
    return res.status(503).json({
      message: "Invalid type",
    });
  }
  try {
    const articleFoundBySlug = await BlogModel.findOne({
      slug: slug,
    });

    if (!articleFoundBySlug) {
      return res.status(403).json({
        message: "Article not found",
      });
    }
    await articleFoundBySlug?.updateOne(parsedArticle.data);

    return res.status(201).json({
      message: "article updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      message: "Error White updating article",
    });
  }
});

articleRoute.delete("/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const DeletedArticle = await BlogModel.findOneAndDelete({
      slug,
    });
    if (!DeletedArticle) {
      return res.status(503).json({
        message: "Article with this slug can't found",
      });
    }
    return res.status(201).json({
      message: "Article deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      message: "Error while deleting article",
    });
  }
});

export default articleRoute;
