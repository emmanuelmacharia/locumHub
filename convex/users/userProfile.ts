import type { Id } from "../_generated/dataModel";
import { mutation, query, type MutationCtx } from "../_generated/server";
import { v } from "convex/values";
import { appError } from "../lib/errors";

export const createUserProfile = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (existingProfile) {
      return appError({
        code: "USER_EXISTS",
        statusCode: 400,
        statusMessage: "User already has a profile",
      });
    }

    const newProfile = await ctx.db.insert("userProfiles", {
      userId: args.userId,
      accountType: undefined,
      locumProfileId: undefined,
      pharmacyMemberId: undefined,
      identityVerifiedAt: undefined,
      identityVerifiedBy: undefined,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    return newProfile;
  },
});

export const getUserProfileByUserId = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (!args.userId) return;
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId!))
      .first();

    if (!profile) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "User profile not found",
      });
    }
    return profile;
  },
});

export const setAccountType = async (
  ctx: MutationCtx,
  userId: Id<"users">,
  type: "locum" | "pharmacy",
  referenceId: Id<"locumProfiles"> | Id<"pharmacies">
) => {
  const profile = await ctx.db
    .query("userProfiles")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .first();
  if (!profile) {
    return appError({
      code: "USER_EXISTS",
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  if (profile.accountType) {
    return appError({
      code: "INVALID_PATCH",
      statusCode: 400,
      statusMessage: "Account type already set for this user",
    });
  }

  const updatedProfile = await ctx.db.patch("userProfiles", profile._id, {
    accountType: type,
    locumProfileId:
      type === "locum" ? (referenceId as Id<"locumProfiles">) : undefined,
    pharmacyMemberId:
      type === "pharmacy" ? (referenceId as Id<"pharmacies">) : undefined,
  });

  return updatedProfile;
};
