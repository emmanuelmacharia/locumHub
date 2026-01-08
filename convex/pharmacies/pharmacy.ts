import { v } from "convex/values";
import { appError } from "../lib/errors";
import { mutation } from "../_generated/server";
import { operatingDayHours } from "../schema";
import { api } from "../_generated/api";

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
        q.eq("contactPhone", args.contactPhone)
      )
      .first();

    const pharmaEmail = await ctx.db
      .query("pharmacies")
      .withIndex("by_contact_email", (q) =>
        q.eq("contactEmail", args.contactEmail)
      )
      .first();

    const contactsNotUnique = pharmaEmail ?? pharmaPhone;

    if (contactsNotUnique) {
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage: "Contact Email or Contact Phone must be unique",
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
        statusCode: 400,
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
      locationPayload
    );

    if (locationCreated.statusCode === 201) {
      return created;
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
