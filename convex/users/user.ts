import { mutation } from "../_generated/server";
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
      isActive: true,
    };
    const created = await ctx.db.insert("users", payload);
    return created;
  },
});
