import { api } from "~~/convex/_generated/api";
import { failure } from "~~/server/utils/apiResponse";

export default defineEventHandler(async (event) => {
  const { isAuthenticated, userId } = await verifyAuth(event);

  if (!isAuthenticated || !userId) {
    setResponseStatus(event, 401);
    return failure(401, "Unauthorized");
  }

  const convex = getConvexClient();

  try {
    // const userProfile = await convex.query()
  } catch (error) {}
});
