import { v } from "convex/values";
import { appError } from "../lib/errors";
import { mutation } from "../_generated/server";

export const createPharmacy = mutation({
  args: {
    userId: v.string(),
    businessName: v.string(),
    licenseNumber: v.string(), // enforce uniqueness
    contactEmail: v.string(), // enforce uniqueness
    contactPhone: v.string(), // enforce uniqueness
  },
  handler: async (ctx, args) => {
    // first we ensure uniqueness of unique params
    const pharmaLicense = await ctx.db
      .query("pharmacies")
      .withIndex("by_license", (q) => q.eq("licenseNumber", args.licenseNumber))
      .first();

    console.log(pharmaLicense);

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

    console.log(pharmaEmail, pharmaPhone, contactsNotUnique);

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

    console.log(user);

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
    return created;
  },
});
