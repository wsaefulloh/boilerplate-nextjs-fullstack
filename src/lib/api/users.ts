import type {
  ApiUser,
  CreateUserInput,
  UpdateUserInput,
} from "@/lib/validations/user.schema";

export interface GetUsersOptions {
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch users from API with optional search and pagination.
 */
export async function getUsers(
  options?: GetUsersOptions
): Promise<ApiUser[]> {
  const params = new URLSearchParams();
  if (options?.search) params.set("search", options.search);
  if (options?.page) params.set("page", String(options.page));
  if (options?.limit) params.set("limit", String(options.limit));

  const query = params.toString();
  const url = query ? `/api/users?${query}` : "/api/users";

  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch users");
  }

  const json = await res.json();
  if (Array.isArray(json)) {
    return json as ApiUser[];
  }
  if (json && Array.isArray(json.data)) {
    return json.data as ApiUser[];
  }
  return [];
}

/**
 * Fetch a single user by ID from API.
 */
export async function getUserById(id: number): Promise<ApiUser> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch user #${id}`);
  }
  return res.json() as Promise<ApiUser>;
}

/**
 * Create a new user via POST /api/users.
 */
export async function createUser(data: CreateUserInput): Promise<ApiUser> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create user");
  }
  return res.json() as Promise<ApiUser>;
}

/**
 * Update an existing user via PUT /api/users/[id].
 */
export async function updateUser(
  id: number,
  data: UpdateUserInput
): Promise<ApiUser> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to update user #${id}`);
  }
  return res.json() as Promise<ApiUser>;
}

/**
 * Delete a user via DELETE /api/users/[id].
 */
export async function deleteUser(
  id: number
): Promise<{ message: string; user: ApiUser }> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete user #${id}`);
  }
  return res.json();
}
