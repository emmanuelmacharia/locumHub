export const useCtaSignupAndRouting = () => {
  const clerk = useClerk();
  const { userData, userProfileData, isLoaded, isClerkLoaded, isPending } =
    useAuthenticatedUser();

  const router = useRouter();

  const handleSignUp = (userType?: "pharmacy" | "staff", url?: string) => {
    if (!isLoaded.value || !isClerkLoaded.value || isPending.value) {
      return;
    }

    if (userData.value) {
      // User is already authenticated, redirect to dashboard or appropriate page
      const userType = userProfileData.value?.accountType;
      return goToDashboard(userType === "pharmacy" ? "pharmacy" : "staff");
    }

    if (!clerk.value) return;

    const redirectUrl =
      url ?? (userType ? `/register/${userType}` : "/register");

    clerk.value.openSignUp({
      fallbackRedirectUrl: redirectUrl,
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
