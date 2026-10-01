import type { ApiPost, PostFormValues } from "@/lib/validations/post.schema";

const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Fetch a paginated list of posts.
 * @param limit  Number of posts to return (default: 10)
 * @param page   Page number for offset pagination (default: 1)
 */
export async function getPosts(
  limit = 10,
  page = 1
): Promise<ApiPost[]> {
  const start = (page - 1) * limit;
  const res = await fetch(
    `${BASE_URL}/posts?_start=${start}&_limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<ApiPost[]>;
}

/**
 * Fetch a single post by ID.
 */
export async function getPostById(id: number): Promise<ApiPost> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch post #${id}`);
  return res.json() as Promise<ApiPost>;
}

/**
 * Create a new post (JSONPlaceholder simulates the response — nothing is
 * actually persisted, but it returns a valid 201 with the new resource).
 */
export async function createPost(
  data: PostFormValues
): Promise<ApiPost> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json() as Promise<ApiPost>;
}
