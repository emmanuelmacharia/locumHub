export const useServerUserProfile = () => {
  const { data: userProfileData, pending } = useAsyncData(
    "userProfile",
    () => $fetch("/api/auth/getUserProfile"),
    {
      server: true,
    },
  );
  const profileData = computed(() => userProfileData.value);

  return {
    isLoading: pending,
    profileData,
  };
};
