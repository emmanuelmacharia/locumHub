import type { QueryCtx, MutationCtx } from "../_generated/server";
import { appError } from "./errors";

export async function getClerkAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    // be sure to log this request
    return appError({
      code: "UNAUTHORIZED",
      statusCode: 401,
      statusMessage: "Authentication required",
    });
  }

  return {
    userId: identity.userId,
    email: identity.email,
    createdAt: identity.createdAt,
    updatedAt: identity.updatedAt,
    issuer: identity.issuer,
    tokenIdentifier: identity.tokenIdentifier,
    emailVerified: identity.emailVerified,
    phoneNumberVerified: identity.phoneNumberVerified,
    name: identity.name,
    pictureUrl: identity.pictureUrl,
  };
}

export function validateRequestAndClerkUserId(
  clerkUserId: string,
  payloadUserId: string,
) {
  if (clerkUserId !== payloadUserId) {
    return appError({
      code: "FORBIDDEN",
      statusCode: 403,
      statusMessage: "Cannot access another user's profile",
    });
  }
  return true;
}

// in case of roles and perms
// export function requireAuth(ctx: QueryCtx | MutationCtx) {}

// in case of validating source of request
// export function validateOrigin(ctx: QueryCtx | MutationCtx) {}
