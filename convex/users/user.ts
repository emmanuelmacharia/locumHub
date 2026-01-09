import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";
import { appError } from "../lib/errors";

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
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "The user doesn't exist",
      });
    }

    try {
      // rollback for user creation to removed orphaned users; we can add a mutation that patches this to inactive later.
      await ctx.db.delete(user._id);
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
