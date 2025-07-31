import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z.object({
  username: z.string(),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
  author: z.string(),
  featuredImage: z.url("Invalid image URL"),
});
