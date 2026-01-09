import { createLocumPayloadSchema } from "~/utils/types/onboardingPayloads";
import { api } from "~~/convex/_generated/api";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body: unknown) =>
    createLocumPayloadSchema.safeParse(body)
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      data: result.error.issues,
    });
  }

  const convex = getConvexClient();

  // create locum
  try {
    const locumid = await convex.mutation(
      api.locum.staff.createLocumStaff,
      result.data
    );

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
      throw createError({
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
        data: {
          code: data.code,
        },
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong; Please try again later",
      data: error,
    });
  }
});
