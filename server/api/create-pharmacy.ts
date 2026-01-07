import { createPharmacySchema } from "~/utils/types/onboardingPayloads";
import { api } from "~~/convex/_generated/api";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body: unknown) =>
    createPharmacySchema.safeParse(body)
  );

  if (!result.success) {
    throw createError({
      statusCode: 4000,
      statusMessage: "Validation Error",
      data: result.error.issues,
    });
  }

  const convex = getConvexClient();

  try {
    const { businessName, contactEmail, contactPhone, licenseNumber, userId } =
      result.data;

    // creates pharmacy
    const pharmaId = await convex.mutation(
      api.pharmacies.pharmacy.createPharmacy,
      { businessName, contactEmail, contactPhone, licenseNumber, userId }
    );

    // create pharmacy location before returning response; A pharma cannot run without a location - it's best you add in before responding to the user; the client will navigate away after the response
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
      return createError({
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
        data: {
          code: data.code,
        },
      });
    }
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong; Please try again later",
      data: error,
    });
  }
});
