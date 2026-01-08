import { api } from "~~/convex/_generated/api";
import { userPayloadSchema } from "../../app/utils/types/onboardingPayloads";
import { getConvexClient } from "../utils/convex";
import { isAppError } from "../utils/convexErrors";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body: unknown) =>
    userPayloadSchema.safeParse(body)
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      data: result.error.issues,
    });
  }

  const convex = getConvexClient();
  try {
    const userId = await convex.mutation(api.users.user.createUser, {
      ...result.data,
      isActive: true,
      phoneNumber: result.data.phoneNumber ?? undefined,
      clerkCreatedAt: new Date(result.data.clerkCreatedAt).getTime(),
      clerkUpdatedAt: new Date(result.data.clerkUpdatedAt).getTime(),
    });

    return {
      statusCode: 201,
      statusMessage: "User successfully created",
      data: {
        userId,
      },
    };
  } catch (error) {
    if (isAppError(error)) {
      const { data } = error;
      throw createError({
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
        data: {
          code: data.code,
        },
      });
    } else {
      // handle other error types
      throw createError({
        statusCode: 500,
        statusMessage: "Something went wrong; Please try again later",
      });
    }
  }
});
