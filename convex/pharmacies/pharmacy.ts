import { v } from "convex/values";
import { appError } from "../lib/errors";
import { mutation } from "../_generated/server";
import { operatingDayHours } from "../schema";
import { api } from "../_generated/api";
import { setAccountType } from "../users/userProfile";
import { getClerkAuthenticatedUser } from "../lib/auth";

export const createPharmacy = mutation({
  args: {
    userId: v.string(),
    businessName: v.string(),
    licenseNumber: v.string(), // enforce uniqueness
    contactEmail: v.string(), // enforce uniqueness
    contactPhone: v.string(), // enforce uniqueness
    address: v.string(),
    postcode: v.string(),
    city: v.string(),
    country: v.string(),
    services: v.array(v.string()),
    operatingHours: operatingDayHours,
  },
  handler: async (ctx, args) => {
    // auth
    await getClerkAuthenticatedUser(ctx);
    // first we ensure uniqueness of unique params
    const pharmaLicense = await ctx.db
      .query("pharmacies")
      .withIndex("by_license", (q) => q.eq("licenseNumber", args.licenseNumber))
      .first();

    if (pharmaLicense) {
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage: "Pharmacy with that license number already exists",
      });
    }

    const pharmaPhone = await ctx.db
      .query("pharmacies")
      .withIndex("by_contact_phone", (q) =>
        q.eq("contactPhone", args.contactPhone),
      )
      .first();

    const pharmaEmail = await ctx.db
      .query("pharmacies")
      .withIndex("by_contact_email", (q) =>
        q.eq("contactEmail", args.contactEmail),
      )
      .first();

    if (pharmaEmail) {
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage:
          "Contact Email is already registered to another pharmacy",
      });
    }

    if (pharmaPhone) {
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage:
          "Contact Phone is already registered to another pharmacy",
      });
    }

    // fetch user to get the userid from convex

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "The user creating this pharmacy doesn't exist",
      });
    }
    const payload = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      businessName: args.businessName,
      licenseNumber: args.licenseNumber,
      contactPhone: args.contactPhone,
      contactEmail: args.contactEmail,
      createdBy: user._id,
      isActive: true,
      // optional defaults = we need to pass this over to convex; it doesnt default optional params
      tradingName: undefined,
      companyNumber: undefined,
      logoImageId: undefined,
      description: undefined,
      website: undefined,
      emergencyPhone: undefined,
      primaryLocationId: undefined,
      ratingCount: 0,
      ratingSum: 0,
      isChain: false,
      deactivatedAt: undefined,
      deactivationReason: undefined,
    };

    const created = await ctx.db.insert("pharmacies", payload);

    await setAccountType(ctx, user._id, "pharmacy", created); // set the account type before anything else
    // we create pharma locations from within the convex context, as that avoids many round trips between the nuxt server and convex

    const {
      businessName,
      licenseNumber,
      contactPhone,
      contactEmail,
      userId,
      ...locationPartialPayload
    } = args;

    const locationPayload = {
      locationName: args.businessName,
      pharmacyId: created,
      isPrimary: true,
      ...locationPartialPayload,
    };
    const locationCreated = await ctx.runMutation(
      api.pharmacies.pharmacyLocations.createPharmacyLocation,
      locationPayload,
    );

    if (locationCreated.statusCode === 201) {
      return created;
    }

    try {
      // rollback pharmacy creation to removed orphaned pharmacies; we can add a mutation that patches this to inactive later.
      await ctx.db.delete(created);
    } catch (deleteError) {
      // Log or handle delete failure - pharmacy is now orphaned
      // eslint-disable-next-line no-console
      console.error(
        "Failed to delete orphaned pharmacy:",
        created,
        deleteError,
      );
    }
    return appError({
      code: "CONVEX_ERROR",
      statusCode: 500,
      statusMessage:
        "Something went wrong while creating pharmacies or locations",
    });
  },
});

// export const getPharmacy = query({
//   args: {}, handler: (ctx, args) => {}
// })
