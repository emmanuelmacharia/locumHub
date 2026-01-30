import type { Doc } from "~~/convex/_generated/dataModel";

type User = Doc<"users">;
type UserProfile = Doc<"userProfiles">;

export const useServerUserProfile = () => {
  const { data: userProfileData, pending } = useAsyncData<{
    user: User;
    profile: UserProfile;
  } | null>(
    "userProfile",
    async () =>
      await $fetch<{
        user: User;
        profile: UserProfile;
      } | null>("/api/auth/getUserProfile"),
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
