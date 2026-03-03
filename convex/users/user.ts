import { internalMutation, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { appError } from "../lib/errors";
import { api } from "../_generated/api";
import { getClerkAuthenticatedUser } from "../lib/auth";

export const createUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    userId: v.string(),
    isActive: v.boolean(),
    phoneNumber: v.optional(v.string()),
    clerkCreatedAt: v.number(),
    clerkUpdatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // first check whether this user exists in db
    const { userId } = args;
    // await getClerkAuthenticatedUser(ctx); // throws an exception

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      return appError({
        code: "USER_EXISTS",
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    const payload = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      clerkCreatedAt: args.clerkCreatedAt,
      clerkUpdatedAt: args.clerkUpdatedAt,
      phoneNumber: args.phoneNumber ?? undefined,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      userId: args.userId,
      isActive: args.isActive,
    };
    const created = await ctx.db.insert("users", payload);
    await ctx.runMutation(api.users.userProfile.createUserProfile, {
      // create user profile
      userId: created,
    });
    return created;
  },
});

// let's work on making this an internal mutation
export const deleteOrphanedUser = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (!user) {
      // User already deleted or doesn't exist - idempotent success
      return {
        statusCode: 200,
        statusMessage: "User already deleted or doesn't exist",
      };
    }

    const userProfile = await ctx.db // get user profile
      .query("userProfiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    try {
      // rollback for user creation to removed orphaned users; we can add a mutation that patches this to inactive later.
      await ctx.db.delete(user._id);
      if (userProfile) {
        await ctx.db.delete(userProfile._id); // also delete the user profile
      }
      return {
        statusCode: 200,
        statusMessage: "User deleted",
      };
    } catch (deleteError) {
      // Log or handle delete failure - user is now orphaned
      // eslint-disable-next-line no-console
      console.error("Failed to delete orphaned user:", deleteError);
      return appError({
        code: "CONVEX_ERROR",
        statusCode: 500,
        statusMessage: "Failed to delete orphaned user",
      });
    }
  },
});

export const fetchUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    const { userId } = args;

    await getClerkAuthenticatedUser(ctx); // no need for return values

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
    if (!user) return null;

    return user;
  },
});
