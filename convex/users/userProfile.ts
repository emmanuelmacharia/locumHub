import type { Id } from "../_generated/dataModel";
import { mutation, query, type MutationCtx } from "../_generated/server";
import { v } from "convex/values";
import { appError } from "../lib/errors";
import { getClerkAuthenticatedUser } from "../lib/auth";

export const createUserProfile = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // await getClerkAuthenticatedUser(ctx);

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
    await getClerkAuthenticatedUser(ctx);
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

export const getUserProfileByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    if (!args.clerkUserId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.clerkUserId))
      .first();

    if (!user) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    return {
      user,
      profile,
    };
  },
});

export const setAccountType = async (
  ctx: MutationCtx,
  userId: Id<"users">,
  type: "locum" | "pharmacy",
  referenceId: Id<"locumProfiles"> | Id<"pharmacies">,
) => {
  // await getClerkAuthenticatedUser(ctx);

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
