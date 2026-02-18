import type { Doc } from "~~/convex/_generated/dataModel";

type User = Doc<"users">;
type UserProfile = Doc<"userProfiles">;

export const useServerUserProfile = () => {
  const {
    data: userProfileData,
    pending,
    refresh,
  } = useAsyncData<{
    user: User;
    profile: UserProfile;
  } | null>(
    "userProfile",
    () =>
      $fetch<{
        user: User;
        profile: UserProfile;
      } | null>("/api/auth/getUserProfile"),
    {
      server: true,
      getCachedData: (key, nuxtApp) => {
        // If data already exists in payload, return it and skip the fetch
        return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
      },
    },
  );
  const profileData = computed(() => userProfileData.value);

  return {
    isLoading: pending,
    profileData,
    refresh,
  };
};

/**
 *
 * //TODO: invalidate cache on profile change (e.g. login or logout)
 * const { refresh } = useServerUserProfile();
 * await refresh(); // bypasses getCachedData and re-fetches
 *
 * // On logout — clear it manually
 * clearNuxtData("userProfile");
 * navigateTo("/");
 *
 */
