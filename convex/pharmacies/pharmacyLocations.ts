import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { operatingDayHours } from "../schema";
import { appError } from "../lib/errors";
import { getClerkAuthenticatedUser } from "../lib/auth";

export const createPharmacyLocation = mutation({
  args: {
    pharmacyId: v.id("pharmacies"),
    locationName: v.string(),
    address: v.string(),
    country: v.string(),
    postcode: v.string(),
    operatingHours: operatingDayHours,
    services: v.array(v.string()),
    isPrimary: v.boolean(),
    city: v.string(),
  },
  handler: async (ctx, args) => {
    // auth
    // await getClerkAuthenticatedUser(ctx);

    // fetch the pharmacy and validate that it exists
    const pharma = await ctx.db.get(args.pharmacyId);

    if (!pharma) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 400,
        statusMessage: "Cannot create a pharmacy location without a pharmacy",
      });
    }

    const payload = {
      ...args,
      county: undefined,
      latitude: undefined,
      longitude: undefined,
      timezone: undefined,
      locationPhone: pharma.contactPhone,
      locationEmail: pharma.contactEmail,
      wheelchairAccessible: false,
      isActive: true,
      locationCode: undefined,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    try {
      const created = await ctx.db.insert("pharmacyLocations", payload);
      return {
        statusMessage: "Pharmacy location has been created",
        code: "CREATED",
        statusCode: 201,
        data: created,
      };
    } catch (error) {
      return appError({
        code: "CONVEX_ERROR",
        statusCode: 500,
        statusMessage: "Something went wrong while creating pharmacy locations",
        data: error,
      });
    }
  },
});

export const getPharmacyLocationsByPharmacyId = query({
  args: { pharmacyId: v.id("pharmacies") },
  handler: async (ctx, { pharmacyId }) => {
    if (!pharmacyId) return [];

    await getClerkAuthenticatedUser(ctx);

    const locations = await ctx.db
      .query("pharmacyLocations")
      .withIndex("by_pharmacy", (q) => q.eq("pharmacyId", pharmacyId))
      .collect();

    return locations;
  },
});
