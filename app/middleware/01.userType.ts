export default defineNuxtRouteMiddleware(async (to, from) => {
  const { profileData, isLoading } = useServerUserProfile();
  const redirectPath =
    from?.fullPath && from.fullPath !== to.fullPath ? from.fullPath : "/";

  // Wait for profile to finish loading if it's in progress.
  if (isLoading?.value) {
    await new Promise((resolve) => {
      const stop = watch(isLoading, (loading) => {
        if (!loading) {
          stop();
          resolve(null);
        }
      });
    });
  }

  // If not loading but profileData is still empty (race on refresh), wait briefly for it.
  if (!profileData.value && !isLoading?.value) {
    await new Promise((resolve) => {
      const stop = watch(profileData, (val) => {
        if (val) {
          stop();
          resolve(null);
        }
      });
      // safety timeout so middleware doesn't hang indefinitely
      setTimeout(() => {
        stop();
        resolve(null);
      }, 1500);
    });
  }

  if (!profileData.value || !profileData.value.profile) {
    if (to.path !== "/") {
      return navigateTo("/");
    }
    return;
  }

  if (
    to.path.includes("pharmacy") &&
    profileData.value.profile?.accountType !== "pharmacy"
  ) {
    return navigateTo(redirectPath);
  }

  if (
    to.path.includes("staff") &&
    profileData.value.profile.accountType !== "locum"
  ) {
    return navigateTo(redirectPath);
  }
});
