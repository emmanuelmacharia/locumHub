import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { appError } from "../lib/errors";
import { internal } from "../_generated/api";
import { setAccountType } from "../users/userProfile";
import { getClerkAuthenticatedUser } from "../lib/auth";

export const createLocumStaff = mutation({
  args: {
    userId: v.string(), // unique
    registrationNumber: v.string(), // unique
    yearsOfExperience: v.number(),
    qualifications: v.array(v.string()),
    specializations: v.array(v.string()),
    contactEmail: v.string(), // unique
    contactPhone: v.string(), // unique
    city: v.string(),
    country: v.string(),
    address: v.string(),
    baseHourlyRate: v.number(),
    professionalBio: v.string(),
  },
  handler: async (ctx, args) => {
    // auth
    // await getClerkAuthenticatedUser(ctx); -> for some reason, this returns false during registration
    // fetch user
    const { userId, registrationNumber, contactEmail, contactPhone } = args;

    // license check
    const license = await ctx.db
      .query("locumProfiles")
      .withIndex("by_registration_id", (q) =>
        q.eq("registrationNumber", registrationNumber),
      )
      .first();

    if (license) {
      await ctx.runMutation(internal.users.user.deleteOrphanedUser, { userId }); // rollback
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage: "User with that license number already exists",
      });
    }

    // contact check
    const phone = await ctx.db
      .query("locumProfiles")
      .withIndex("by_contact_phone", (q) => q.eq("contactPhone", contactPhone))
      .first();

    if (phone) {
      await ctx.runMutation(internal.users.user.deleteOrphanedUser, { userId });
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage: "Contact Phone is already registered to another user",
      });
    }

    const email = await ctx.db
      .query("locumProfiles")
      .withIndex("by_contact_email", (q) => q.eq("contactEmail", contactEmail))
      .first();

    if (email) {
      await ctx.runMutation(internal.users.user.deleteOrphanedUser, { userId });
      return appError({
        code: "DUPLICATE_ENTRY",
        statusCode: 400,
        statusMessage: "Contact Email is already registered to another user",
      });
    }
    // fetch user
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (!user) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "The user to be mapped to this staff doesnt exist",
      });
    }

    const payload = {
      ...args,
      userId: user._id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      isActive: true,
      travelRadiusKm: 0,
      ratingSum: 0,
      ratingCount: 0,
      isVerified: false,
      totalShiftsCompleted: 0,
      totalHoursWorked: 0,
      profileImageId: undefined,
      headline: undefined,
      county: undefined,
      latitude: undefined,
      longitude: undefined,
      minimumShiftHours: undefined,
      emergencyRateMultiplier: undefined,
      isOnline: undefined,
      lastOnlineAt: undefined,
      deactivatedAt: undefined,
      deactivationReason: undefined,
      verifiedAt: undefined,
      verifiedBy: undefined,
      registrationBody: "",
    };

    try {
      const created = await ctx.db.insert("locumProfiles", payload);
      await setAccountType(ctx, user._id, "locum", created);
      return created;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("failed to create locum profile", error);
      // roll back to prevent orphaned users
      await ctx.runMutation(internal.users.user.deleteOrphanedUser, { userId });
      return appError({
        code: "CONVEX_ERROR",
        statusCode: 500,
        statusMessage: "Something went wrong while creating your profile",
      });
    }
  },
});

export const fetchLocumStaffByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await getClerkAuthenticatedUser(ctx);

    const locumStaff = await ctx.db
      .query("locumProfiles")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!locumStaff) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "User Not found!",
      });
    }

    return locumStaff;
  },
});
