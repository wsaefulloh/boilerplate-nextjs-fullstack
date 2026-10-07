import { createUserSchema } from "@/lib/validations/user.schema";
import { userService } from "@/services/user.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const result = await userService.getUsers({
      search,
      page: page && !isNaN(page) ? page : undefined,
      limit: limit && !isNaN(limit) ? limit : undefined,
    });

    return Response.json(result);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createUserSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        {
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const user = await userService.createUser(validationResult.data);
    return Response.json(user, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "P2002") {
      return Response.json({ message: err.message || "A user with this email already exists." }, { status: 409 });
    }

    console.error("POST /api/users error:", error);
    return Response.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
