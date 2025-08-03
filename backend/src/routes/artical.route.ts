import express, { Request, Response } from "express";
import { BlogModel } from "../model/blog.model";
import { createPostSchema } from "../schema/schema";
import { authMiddleware } from "../middleware/middleware";
import { UserModel } from "../model/user.model";
import { Error } from "mongoose";
import { success } from "zod";

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

// get blog by slug

articleRoute.post("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const article = req.body;

  const parsedArticle = createPostSchema.safeParse(article);
  if (!parsedArticle.success) {
    return res.status(400).json({
      message: "Invalid article data",
      errors: parsedArticle.error.message,
    });
  }

  const slug = generateSlug(parsedArticle.data.title);
  const { content, tags, banner, title, des } = parsedArticle.data;
  if (!content.blocks.length) {
    return res.status(403).json({
      message: "There must be some blog content to publish it",
    });
  }
  let newTags = tags.map((tag) => tag.toLowerCase());
  try {
    const blogCreated = new BlogModel({
      title: title,
      des: des,
      tags: newTags,
      content: content,
      author: userId,
      featuredImage: banner,
      slug: slug,
      draft: false,
    });
    if (!blogCreated) {
      return res.status(502).json({
        message: "Error white creating the blog",
      });
    }
    const SavedBlog = await blogCreated.save();
    let incrementVal = SavedBlog.draft ? 0 : 1;

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $inc: { "account_info.total_post": incrementVal },
        $push: {
          Blogs: SavedBlog._id,
        },
      }
    );

    return res.status(201).json({
      blogId: SavedBlog.slug,
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
  } catch (e) {
    const error = e as Error;
    console.error(error);
    return res.status(503).json({
      message: error.message || "Error White updating article",
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

articleRoute.get("/latest", async (req: Request, res: Response) => {
  const maxLimit = 5;
  try {
    const blogs = await BlogModel.find({ draft: false })
      .populate("author", "personal_info.avatar personal_info.username -_id")
      .sort({ publishedAt: -1 })
      .select("title des slug featuredImage -_id")
      .limit(maxLimit);

    return res.json({
      message: "success",
      blog: blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error while getting latest blog",
    });
  }
});

articleRoute.get("/top", async (req: Request, res: Response) => {
  const blogs = await BlogModel.find({ draft: false })
    .populate("author", "personal_info.avatar personal_info.username -_id")
    .sort({
      "activity.total_reads": -1,
      "activity.total_likes": -1,
      publishedAt: -1,
    })
    .select("slug title des featuredImage  publishedAt -_id")
    .limit(5);
  res.status(200).json({
    message: success,
    blog: blogs,
  });
});

articleRoute.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const blogSaved = (await BlogModel.findOneAndUpdate(
      { slug },
      { $inc: { "activity.total_reads": 1 } }
    )
      .populate("author", "personal_info.username  -_id")
      .select(
        "title des content featuredImage activity publishedAt slug tags -_id"
      )) as any;

    await UserModel.findOneAndUpdate(
      {
        "personal_info.username": blogSaved?.author.personal_info.username,
      },
      { $inc: { "account_info.total_reads": 1 } }
    );
    return res.status(200).json({
      message: success,
      blog: blogSaved,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Error while getting the blog",
    });
  }
});
export default articleRoute;
