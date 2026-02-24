import { createLocumPayloadSchema } from "~/utils/types/onboardingPayloads";
import { api } from "~~/convex/_generated/api";

export default defineEventHandler(async (event) => {
  const { isAuthenticated, userId } = await verifyAuth(event);

  if (!isAuthenticated || !userId) {
    setResponseStatus(event, 401);
    return failure(401, "Unauthorized");
  }

  const result = await readValidatedBody(event, (body: unknown) =>
    createLocumPayloadSchema.safeParse(body),
  );

  if (!result.success) {
    setResponseStatus(event, 400);
    return failure(400, {
      message: "Validation Error",
      data: result.error.issues,
    });
  }

  const convex = getConvexClient();

  // create locum
  try {
    const locumid = await convex.mutation(
      api.locum.staff.createLocumStaff,
      result.data,
    );

    setResponseStatus(event, 201);
    return {
      statusCode: 201,
      statusMessage: "Staff successfully created",
      data: {
        locumid,
      },
    };
  } catch (error) {
    if (isAppError(error)) {
      const { data } = error;
      setResponseStatus(event, 400);
      return failure(400, {
        message: data.statusMessage,
        data: {
          code: data.code,
        },
      });
    }
    // eslint-disable-next-line no-console
    console.log(error);
    setResponseStatus(event, 500);
    return failure(500, {
      message: "Something went wrong; Please try again later",
      data: {
        message: "Internal server error",
      },
    });
  }
});
