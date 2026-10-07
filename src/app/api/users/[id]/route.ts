import { updateUserSchema } from "@/lib/validations/user.schema";
import { userService } from "@/services/user.service";

interface RouteContext {
  params: { id: string } | Promise<{ id: string }>;
}

async function getUserIdFromParams(context: RouteContext): Promise<number | null> {
  const { id } = await context.params;
  const userId = Number(id);
  if (isNaN(userId) || userId <= 0) {
    return null;
  }
  return userId;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const userId = await getUserIdFromParams(context);
    if (!userId) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const userId = await getUserIdFromParams(context);
    if (!userId) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const body = await request.json();
    const validationResult = updateUserSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        {
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const updatedUser = await userService.updateUser(userId, validationResult.data);
    return Response.json(updatedUser);
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "P2025") {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (err?.code === "P2002") {
      return Response.json({ message: err.message || "Email is already taken by another user." }, { status: 409 });
    }

    console.error("PUT /api/users/[id] error:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  return PUT(request, context);
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const userId = await getUserIdFromParams(context);
    if (!userId) {
      return Response.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const deletedUser = await userService.deleteUser(userId);
    return Response.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "P2025") {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    console.error("DELETE /api/users/[id] error:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
