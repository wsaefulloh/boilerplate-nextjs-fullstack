import { z } from "zod";

/**
 * Zod schema for creating a new post.
 *
 * Usage:
 *   const result = postSchema.safeParse(formData);
 *   if (!result.success) console.log(result.error.flatten());
 */
export const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  body: z
    .string()
    .min(10, { message: "Body must be at least 10 characters." })
    .max(500, { message: "Body must not exceed 500 characters." }),
});

/** TypeScript type inferred automatically from the Zod schema. */
export type PostFormValues = z.infer<typeof postSchema>;

/**
 * Zod schema representing a post returned from the API.
 */
export const apiPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type ApiPost = z.infer<typeof apiPostSchema>;
