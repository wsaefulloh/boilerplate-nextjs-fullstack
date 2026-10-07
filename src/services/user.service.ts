import { prisma } from "@/lib/prisma";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "@/lib/validations/user.schema";

export interface GetUsersQuery {
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch all users with optional search and pagination.
 */
export async function getUsers(query?: GetUsersQuery) {
  const { search, page, limit } = query || {};

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  if (page && limit) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  return prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Fetch a user by ID.
 */
export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Fetch a user by email.
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user.
 */
export async function createUser(data: CreateUserInput) {
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    const error = new Error("A user with this email already exists.");
    (error as Error & { code: string }).code = "P2002";
    throw error;
  }

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
}

/**
 * Update an existing user.
 */
export async function updateUser(id: number, data: UpdateUserInput) {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    const error = new Error("User not found.");
    (error as Error & { code: string }).code = "P2025";
    throw error;
  }

  if (data.email && data.email !== existingUser.email) {
    const emailConflict = await getUserByEmail(data.email);
    if (emailConflict) {
      const error = new Error("Email is already taken by another user.");
      (error as Error & { code: string }).code = "P2002";
      throw error;
    }
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
    },
  });
}

/**
 * Delete a user by ID.
 */
export async function deleteUser(id: number) {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    const error = new Error("User not found.");
    (error as Error & { code: string }).code = "P2025";
    throw error;
  }

  return prisma.user.delete({
    where: { id },
  });
}

export const userService = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
