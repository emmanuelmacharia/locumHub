import { clerkMiddleware, createRouteMatcher } from "@clerk/nuxt/server";

const isAnonymousRoute = createRouteMatcher([
  "/api/public/(.*)",
  "/api/auth/(.*)",
  "/api/webhooks/(.*)",
]);
export default clerkMiddleware(async (event) => {
  const { isAuthenticated } = await verifyAuth(event);

  if (!event.path.startsWith("/api")) return;

  // eslint-disable-next-line no-console
  console.log(
    "Clerk Middleware: isAuthenticated =",
    isAuthenticated,
    event.context.auth(),
  );

  if (!isAuthenticated && !isAnonymousRoute(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Authentication required",
    });
  }
});
