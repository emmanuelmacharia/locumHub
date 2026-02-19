export default defineNuxtRouteMiddleware(async (to, from) => {
  const { ensureLoaded } = useServerUserProfile();
  const redirectPath =
    from?.fullPath && from.fullPath !== to.fullPath ? from.fullPath : "/";

  const payload = await ensureLoaded();
  if (!payload?.profile) {
    if (to.path !== "/") return navigateTo("/");
    return;
  }

  if (
    to.path.includes("pharmacy") &&
    payload.profile.accountType !== "pharmacy"
  ) {
    return navigateTo(redirectPath);
  }

  if (to.path.includes("staff") && payload.profile.accountType !== "locum") {
    return navigateTo(redirectPath);
  }
});
