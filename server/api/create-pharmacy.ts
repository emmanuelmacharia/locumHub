import { createPharmacySchema } from "~/utils/types/onboardingPayloads";
import { api } from "~~/convex/_generated/api";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body: unknown) =>
    createPharmacySchema.safeParse(body)
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
    // creates pharmacy and pharmacy location
    const pharmaId = await convex.mutation(
      api.pharmacies.pharmacy.createPharmacy,
      result.data
    );

    return {
      statusCode: 201,
      statusMessage: "Pharmacy successfully created",
      data: {
        pharmaId,
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
