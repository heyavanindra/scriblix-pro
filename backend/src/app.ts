import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";
import authRoute from "./routes/auth.route";
import blogRoute from "./routes/blog.route";
import imageUploadRoute from "./routes/imageupload.route";
import cors from "cors";
import articleRoute from "./routes/artical.route";
const app = express();

dotenv.config();
const PORT = process.env.MONGO_URL || 3000;
app.use(cors());
app.use(express.json());

connectDb()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure if database connection fails
  });

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/image", imageUploadRoute);
app.use("/api/v1/article",articleRoute)
app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "hello world",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
