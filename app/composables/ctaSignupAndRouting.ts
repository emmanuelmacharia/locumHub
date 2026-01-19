export const useCtaSignupAndRouting = () => {
  const clerk = useClerk();
  const { userData, userProfileData, isLoaded, isClerkLoaded, isPending } =
    useAuthenticatedUser();

  const router = useRouter();

  const handleSignUp = (userType: "pharmacy" | "staff") => {
    if (!isLoaded.value || !isClerkLoaded.value || isPending.value) {
      return;
    }

    if (userData.value) {
      // User is already authenticated, redirect to dashboard or appropriate page
      const userType = userProfileData.value?.accountType;
      return goToDashboard(userType === "pharmacy" ? "pharmacy" : "staff");
    }

    if (!clerk.value) return;

    clerk.value.openSignUp({
      fallbackRedirectUrl: `/register/${userType}`,
    });
  };

  const goToDashboard = (userType: "pharmacy" | "staff") => {
    const dashboardUrl =
      userType === "pharmacy" ? "/pharmacy/dashboard" : "/staff/dashboard";
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
