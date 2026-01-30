export default defineNuxtRouteMiddleware(async (to, from) => {
  const { profileData, isLoading } = useServerUserProfile();
  const redirectPath = from.fullPath === to.fullPath ? "/" : from.fullPath;

  if (isLoading.value) {
    await new Promise((resolve) => {
      const stop = watch(isLoading, (loading) => {
        if (!loading) {
          stop();
          resolve(null);
        }
      });
    });
  }

  if (!profileData.value || !profileData.value.profile) {
    return navigateTo("/");
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
