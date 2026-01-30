export const useCtaSignupAndRouting = () => {
  const clerk = useClerk();
  const {
    userData,
    userProfileData,
    isLoaded,
    isClerkLoaded,
    isPending,
    isFullyOnboarded,
  } = useAuthenticatedUser();

  const router = useRouter();

  const handleSignUp = (userType?: "pharmacy" | "staff", url?: string) => {
    if (!isLoaded.value || !isClerkLoaded.value || isPending.value) {
      return;
    }

    if (isFullyOnboarded.value && userProfileData.value?.accountType) {
      // User is already authenticated, redirect to dashboard or appropriate page
      const userType = userProfileData.value?.accountType;
      return goToDashboard(userType === "pharmacy" ? "pharmacy" : "staff");
    }

    if (userData.value && !userProfileData.value?.accountType) {
      // Authenticated but not fully onboarded
      return router.push(
        url ?? (userType ? `/register/${userType}` : "/register"),
      );
    }

    if (!clerk.value) return;

    const redirectUrl =
      url ?? (userType ? `/register/${userType}` : "/register");

    clerk.value.openSignUp({
      fallbackRedirectUrl: redirectUrl,
    });
  };

  const goToDashboard = (userType: "pharmacy" | "staff") => {
    console.log(
      userData.value,
      userProfileData.value,
      "===================== gotodashboard =======================",
    );
    const dashboardUrl =
      userType === "pharmacy" ? "/dashboard/pharmacy" : "/dashboard/staff";
    router.push(dashboardUrl);
  };

  return {
    handleSignUp,
    goToDashboard,
    isLoaded,
    isLoading: computed(() => !isLoaded.value),
    isAuthenticated: computed(() => !!userData.value),
    userProfileData: computed(() => userProfileData.value),
  };
};
