export const useRefactoredCta = () => {
  const clerk = useClerk();

  const { profileData, pending } = useServerUserProfile();

  const isFullyOnboarded = computed(() => {
    if (pending.value) return;
    if (!profileData.value) return false;
    if (profileData.value.profile) return true;
  });

  const userAccountType = computed(() => {
    if (pending.value) return;
    if (!profileData.value?.profile) return;
    return profileData.value.profile.accountType;
  });

  const user = computed(() => {
    if (pending.value) return;
    if (!profileData.value?.user) return;
    return profileData.value.user;
  });

  const userProfile = computed(() => {
    if (pending.value) return;
    if (!profileData.value?.profile) return;
    return profileData.value.profile;
  });
  const router = useRouter();

  const handleSignUp = (userType?: "pharmacy" | "staff", url?: string) => {
    if (pending.value) {
      return;
    }

    if (isFullyOnboarded.value && userAccountType.value) {
      // User is already authenticated, redirect to dashboard or appropriate page
      const userType = userAccountType.value;
      return goToDashboard(userType === "pharmacy" ? "pharmacy" : "staff");
    }

    if (user.value && !userAccountType.value) {
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
    const dashboardUrl =
      userType === "pharmacy" ? "/dashboard/pharmacy" : "/dashboard/staff";
    router.push(dashboardUrl);
  };

  return {
    handleSignUp,
    goToDashboard,
    pending: computed(() => pending.value),
    isAuthenticated: computed(() => user.value),
    userProfileData: computed(() => userProfile.value),
  };
};
