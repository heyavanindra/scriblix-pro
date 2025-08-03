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
  content: z.object({
    version: z.string().optional(),
    time: z.number().optional(),
    blocks: z.array(z.any()),
  }),
  des: z.string(),
  tags: z.array(z.string()).min(1, "Select at least one tag").max(5,"Maximum 5 tags are allowed"),
  banner: z.url("Invalid image URL"),
});
