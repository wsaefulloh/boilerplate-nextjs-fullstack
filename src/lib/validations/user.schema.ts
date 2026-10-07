import { z } from "zod";

/**
 * Zod schema for creating a new user.
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address." }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

/**
 * Zod schema for updating an existing user.
 */
export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(100, { message: "Name must not exceed 100 characters." })
      .optional(),
    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address." })
      .optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field (name or email) must be provided.",
  });

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Zod schema representing a user returned from the API.
 */
export const apiUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type ApiUser = z.infer<typeof apiUserSchema>;
