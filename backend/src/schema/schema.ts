import { string, z } from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});


export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).optional(),
  author: z.string(),
});

