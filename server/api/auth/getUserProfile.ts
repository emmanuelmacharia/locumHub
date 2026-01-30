import { api } from "~~/convex/_generated/api";

export default defineEventHandler(async (event) => {
  const { isAuthenticated, userId } = await verifyAuth(event);

  if (!isAuthenticated || !userId) return null;

  const convex = getConvexClient();

  try {
    const userProfile = await convex.query(
      api.users.userProfile.getUserProfileByClerkId,
      { clerkUserId: userId },
    );

    return userProfile || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(typeof error);
    return null;
  }
});
